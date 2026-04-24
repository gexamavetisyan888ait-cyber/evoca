import React, { useState, useEffect, useRef } from "react";
import {
  ref as databaseRef,
  onValue,
  push,
  serverTimestamp,
  onDisconnect,
  set,
  remove,
  update,
  onChildAdded,
  off,
  limitToLast,
  query
} from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../../lib/firebase";
import {
  LogOut, ChevronLeft, Send, Phone, PhoneOff, Video, 
  Circle, UserMinus, Plus, Mic, MicOff, Camera, CameraOff,
  Trash2, Eraser
} from "lucide-react";

const servers = {
  iceServers: [
    { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] }
  ],
  iceCandidatePoolSize: 10,
};

export default function StoneChat() {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");

  const [callStatus, setCallStatus] = useState<'idle' | 'outgoing' | 'incoming' | 'active'>('idle');
  const [activeCall, setActiveCall] = useState<any>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const pc = useRef<RTCPeerConnection | null>(null);
  const iceCandidatesQueue = useRef<any[]>([]);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        const statusRef = databaseRef(db, `db/status/${u.uid}`);
        update(statusRef, { 
          uid: u.uid, 
          displayName: u.displayName || "User", 
          photo: u.photoURL || `https://ui-avatars.com/api/?name=${u.displayName}&background=6610f2&color=fff`, 
          state: "online" 
        });
        onDisconnect(statusRef).update({ state: "offline" });

        onValue(databaseRef(db, "db/status"), (snap) => {
          const users = snap.val() ? Object.values(snap.val()) : [];
          onValue(databaseRef(db, "db/groups"), (gSnap) => {
            const groups = gSnap.val() ? Object.keys(gSnap.val()).map(k => ({ ...gSnap.val()[k], id: k, isGroup: true })) : [];
            setAllUsers([...users, ...groups]);
          });
        });

        onValue(databaseRef(db, 'calls'), (snap) => {
          const data = snap.val();
          if (!data) return;
          Object.keys(data).forEach(id => {
            const call = data[id];
            if (call.targetId === u.uid && call.status === 'offer' && callStatus === 'idle') {
              setActiveCall({ ...call, id });
              setCallStatus('incoming');
            }
            if (call.status === 'ended' && activeCall?.id === id) terminateCallLocally();
          });
        });
      }
    });
    return () => unsubAuth();
  }, [callStatus, activeCall]);

  useEffect(() => {
    if (localVideoRef.current && localStream) localVideoRef.current.srcObject = localStream;
    if (remoteVideoRef.current && remoteStream) remoteVideoRef.current.srcObject = remoteStream;
  }, [localStream, remoteStream]);

  const setupPeer = async (cId: string, isCaller: boolean) => {
    if (pc.current) pc.current.close();
    pc.current = new RTCPeerConnection(servers);
    iceCandidatesQueue.current = [];

    pc.current.ontrack = (e) => { if (e.streams[0]) setRemoteStream(e.streams[0]); };
    pc.current.onicecandidate = (e) => {
      if (e.candidate) {
        const path = isCaller ? 'callerCandidates' : 'targetCandidates';
        set(databaseRef(db, `calls/${cId}/${path}/${push(databaseRef(db)).key}`), e.candidate.toJSON());
      }
    };

    const remotePath = isCaller ? 'targetCandidates' : 'callerCandidates';
    onChildAdded(databaseRef(db, `calls/${cId}/${remotePath}`), (snap) => {
      const candidate = snap.val();
      if (pc.current?.remoteDescription) {
        pc.current.addIceCandidate(new RTCIceCandidate(candidate)).catch(() => {});
      } else {
        iceCandidatesQueue.current.push(candidate);
      }
    });
  };

  const startCall = async (video: boolean) => {
    if (!selectedUser || selectedUser.isGroup) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video });
      setLocalStream(stream);
      setIsVideoOff(!video);
      setCallStatus('outgoing');

      const callId = push(databaseRef(db, 'calls')).key as string;
      await setupPeer(callId, true);
      stream.getTracks().forEach(t => pc.current?.addTrack(t, stream));

      const offer = await pc.current?.createOffer();
      await pc.current?.setLocalDescription(offer);

      const callData = { 
        id: callId, 
        callerId: user.uid, 
        callerName: user.displayName, 
        targetId: selectedUser.uid, 
        status: 'offer', 
        type: video ? 'video' : 'audio', 
        offer: { type: offer?.type, sdp: offer?.sdp } 
      };
      await set(databaseRef(db, `calls/${callId}`), callData);
      setActiveCall(callData);

      onValue(databaseRef(db, `calls/${callId}/answer`), async (snap) => {
        const ans = snap.val();
        if (ans && pc.current && pc.current.signalingState === 'have-local-offer') {
          await pc.current.setRemoteDescription(new RTCSessionDescription(ans));
          iceCandidatesQueue.current.forEach(c => pc.current?.addIceCandidate(new RTCIceCandidate(c)));
          setCallStatus('active');
        }
      });
    } catch (e) { terminateCallLocally(); }
  };

  const acceptCall = async () => {
    if (!activeCall) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: activeCall.type === 'video' });
      setLocalStream(stream);
      await setupPeer(activeCall.id, false);
      stream.getTracks().forEach(t => pc.current?.addTrack(t, stream));
      await pc.current?.setRemoteDescription(new RTCSessionDescription(activeCall.offer));
      iceCandidatesQueue.current.forEach(c => pc.current?.addIceCandidate(new RTCIceCandidate(c)));
      const answer = await pc.current?.createAnswer();
      await pc.current?.setLocalDescription(answer);
      await update(databaseRef(db, `calls/${activeCall.id}`), { 
        answer: { type: answer?.type, sdp: answer?.sdp }, 
        status: 'active' 
      });
      setCallStatus('active');
    } catch (e) { terminateCallLocally(); }
  };

  const terminateCallLocally = () => {
    localStream?.getTracks().forEach(t => t.stop());
    if (pc.current) pc.current.close();
    setLocalStream(null); setRemoteStream(null); setCallStatus('idle'); setActiveCall(null);
  };

  const terminateCall = async () => {
    if (activeCall?.id) {
      await update(databaseRef(db, `calls/${activeCall.id}`), { status: 'ended' });
      setTimeout(() => remove(databaseRef(db, `calls/${activeCall.id}`)), 1000);
    }
    terminateCallLocally();
  };

  const sendMsg = async () => {
    if (!message.trim() || !selectedUser) return;
    const cid = selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_");
    await push(databaseRef(db, `db/chats/${cid}`), { 
      text: message, 
      senderId: user.uid, 
      senderName: user.displayName, 
      timestamp: serverTimestamp() 
    });
    setMessage("");
  };

  useEffect(() => {
    if (!user || !selectedUser) return;
    const cid = selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_");
    const msgRef = query(databaseRef(db, `db/chats/${cid}`), limitToLast(50));
    const unsub = onValue(msgRef, (snap) => {
      const d = snap.val();
      setMessages(d ? Object.keys(d).map(k => ({ id: k, ...d[k] })) : []);
    });
    return () => off(msgRef);
  }, [user, selectedUser]);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans text-[#1a1a1a] overflow-hidden">
      
      {/* CALL UI */}
      {callStatus !== 'idle' && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6">
          {callStatus === 'active' && activeCall?.type === 'video' ? (
            <div className="absolute inset-0 bg-black">
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <video ref={localVideoRef} autoPlay muted playsInline className="absolute top-10 right-10 w-32 h-48 rounded-3xl border-4 border-white/10 object-cover bg-gray-900" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <UserMinus size={48} className="text-gray-300" />
              </div>
              <h2 className="text-2xl font-black uppercase italic">{callStatus === 'incoming' ? activeCall?.callerName : selectedUser?.displayName}</h2>
              <p className="text-[#6610f2] font-bold text-sm mt-4 uppercase animate-pulse">{callStatus === 'active' ? 'Կապի մեջ' : 'Զանգ...'}</p>
            </div>
          )}
          <div className="absolute bottom-12 flex gap-6 items-center bg-white border p-6 rounded-[50px] shadow-2xl z-20">
            <button onClick={() => { const t = localStream?.getAudioTracks()[0]; if(t){ t.enabled = !t.enabled; setIsMicMuted(!t.enabled); }}} className={`p-5 rounded-full ${isMicMuted ? 'bg-red-500 text-white' : 'bg-gray-100'}`}>{isMicMuted ? <MicOff/> : <Mic/>}</button>
            {callStatus === 'incoming' && <button onClick={acceptCall} className="p-8 bg-[#6610f2] text-white rounded-full"><Phone size={32}/></button>}
            <button onClick={terminateCall} className="p-8 bg-red-500 text-white rounded-full"><PhoneOff size={32}/></button>
            {activeCall?.type === 'video' && <button onClick={() => { const t = localStream?.getVideoTracks()[0]; if(t){ t.enabled = !t.enabled; setIsVideoOff(!t.enabled); }}} className={`p-5 rounded-full ${isVideoOff ? 'bg-red-500 text-white' : 'bg-gray-100'}`}>{isVideoOff ? <CameraOff/> : <Camera/>}</button>}
          </div>
        </div>
      )}

      <div className="flex w-full h-full p-4 md:p-10">
        <div className="flex w-full max-w-[1500px] mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden">
          
          <aside className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-[380px] flex-col border-r border-gray-50`}>
            <div className="p-8 flex justify-between items-center border-b">
              <h2 className="text-2xl font-black italic uppercase text-[#6610f2]">Evoca</h2>
              <div className="flex gap-4">
                <Plus size={20} className="cursor-pointer" onClick={() => setShowGroupModal(true)} />
                <LogOut size={20} className="cursor-pointer" onClick={() => signOut(auth)} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {allUsers.filter(u => u.uid !== user.uid).map((u) => (
                <div key={u.uid || u.id} onClick={() => setSelectedUser(u)} className={`flex items-center gap-4 p-4 rounded-3xl cursor-pointer transition-all ${selectedUser?.uid === u.uid || selectedUser?.id === u.id ? 'bg-[#f8f6ff]' : 'hover:bg-gray-50'}`}>
                  <img src={u.photo} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{u.displayName}</p>
                    <p className="text-[10px] text-gray-400 font-black uppercase">{u.isGroup ? 'Group' : u.state}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <section className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 flex-col`}>
            {selectedUser ? (
              <>
                <header className="px-8 py-5 flex items-center justify-between border-b bg-white">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedUser(null)} className="md:hidden"><ChevronLeft/></button>
                    <img src={selectedUser.photo} className="w-10 h-10 rounded-full object-cover" />
                    <h3 className="font-black uppercase italic text-sm">{selectedUser.displayName}</h3>
                  </div>
                  {!selectedUser.isGroup && (
                    <div className="flex items-center gap-6">
                      <Phone className="cursor-pointer text-[#6610f2]" onClick={() => startCall(false)} />
                      <Video className="cursor-pointer text-[#6610f2]" onClick={() => startCall(true)} />
                    </div>
                  )}
                </header>
                
                <main className="flex-1 overflow-y-auto p-8 space-y-4 bg-[#fcfcfd]">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.senderId === user.uid ? 'items-end' : 'items-start'}`}>
                      <div className={`px-6 py-3 rounded-3xl text-sm font-medium ${msg.senderId === user.uid ? 'bg-[#6610f2] text-white rounded-br-none' : 'bg-white border rounded-bl-none shadow-sm'}`}>
                        {selectedUser.isGroup && msg.senderId !== user.uid && <p className="text-[10px] font-black opacity-40 mb-1 uppercase italic">{msg.senderName}</p>}
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </main>

                <footer className="p-8 border-t">
                  <div className="flex items-center gap-4 bg-gray-50 rounded-3xl px-6 py-1">
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMsg()} placeholder="ԳՐԵԼ ՆԱՄԱԿ..." className="flex-1 bg-transparent py-4 text-sm outline-none" />
                    <button onClick={sendMsg} className="p-3 bg-[#6610f2] text-white rounded-full"><Send size={18} /></button>
                  </div>
                </footer>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center opacity-5 select-none pointer-events-none text-[120px] font-black italic uppercase">Evoca</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
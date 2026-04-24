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
  query,
  limitToLast,
  off
} from "firebase/database";
import { onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth, googleProvider } from "../../lib/firebase";
import {
  ChevronLeft, Send, Phone, PhoneOff, Video, 
  Circle, Plus, Mic, MicOff, Camera, CameraOff,
  Trash2, Eraser
} from "lucide-react";

const servers = {
  iceServers: [{ urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"] }],
  iceCandidatePoolSize: 10,
};

export default function StoneChat() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const ringtone = useRef(new Audio("https://assets.mixkit.co/active_storage/sfx/1359/1359-preview.mp3"));

  useEffect(() => {
    ringtone.current.loop = true;
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        const statusRef = databaseRef(db, `db/status/${u.uid}`);
        update(statusRef, { uid: u.uid, displayName: u.displayName || "User", photo: u.photoURL || `https://ui-avatars.com/api/?name=${u.displayName}&background=f3f4f6&color=6610f2`, state: "online" });
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
              ringtone.current.play().catch(() => {});
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
    if (pc.current) { pc.current.close(); pc.current = null; }
    pc.current = new RTCPeerConnection(servers);

    pc.current.ontrack = (event) => {
      if (event.streams && event.streams[0]) setRemoteStream(event.streams[0]);
    };

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        const path = isCaller ? 'callerCandidates' : 'targetCandidates';
        push(databaseRef(db, `calls/${cId}/${path}`), event.candidate.toJSON());
      }
    };

    const remotePath = isCaller ? 'targetCandidates' : 'callerCandidates';
    onChildAdded(databaseRef(db, `calls/${cId}/${remotePath}`), (snap) => {
      if (snap.exists() && pc.current) {
        const candidate = new RTCIceCandidate(snap.val());
        const wait = setInterval(() => {
          if (pc.current?.remoteDescription) {
            pc.current.addIceCandidate(candidate).catch(() => {});
            clearInterval(wait);
          }
        }, 100);
      }
    });
  };

  const startCall = async (video: boolean) => {
    if (!selectedUser) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: video ? { facingMode: "user" } : false });
      setLocalStream(stream);
      setIsVideoOff(!video);
      setCallStatus('outgoing');

      const callId = push(databaseRef(db, 'calls')).key as string;
      await setupPeer(callId, true);
      stream.getTracks().forEach(track => pc.current?.addTrack(track, stream));

      const offer = await pc.current?.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: video });
      await pc.current?.setLocalDescription(offer);

      const callData = { id: callId, callerId: user.uid, callerName: user.displayName, callerPhoto: user.photoURL, targetId: selectedUser.uid, status: 'offer', type: video ? 'video' : 'audio', offer: { type: offer?.type, sdp: offer?.sdp } };
      setActiveCall(callData);
      await set(databaseRef(db, `calls/${callId}`), callData);

      onValue(databaseRef(db, `calls/${callId}/answer`), async (snap) => {
        const ans = snap.val();
        if (ans && pc.current && !pc.current.remoteDescription) {
          await pc.current.setRemoteDescription(new RTCSessionDescription(ans));
          setCallStatus('active');
          ringtone.current.pause();
        }
      });
    } catch (e) { terminateCall(); }
  };

  const acceptCall = async () => {
    if (!activeCall) return;
    try {
      ringtone.current.pause();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: activeCall.type === 'video' ? { facingMode: "user" } : false });
      setLocalStream(stream);
      setIsVideoOff(activeCall.type !== 'video');
      await setupPeer(activeCall.id, false);
      stream.getTracks().forEach(track => pc.current?.addTrack(track, stream));
      await pc.current?.setRemoteDescription(new RTCSessionDescription(activeCall.offer));
      const answer = await pc.current?.createAnswer();
      await pc.current?.setLocalDescription(answer);
      await update(databaseRef(db, `calls/${activeCall.id}`), { answer: { type: answer?.type, sdp: answer?.sdp }, status: 'active' });
      setCallStatus('active');
    } catch (e) { terminateCall(); }
  };

  const terminateCallLocally = () => {
    if (localStream) localStream.getTracks().forEach(t => t.stop());
    if (pc.current) { pc.current.close(); pc.current = null; }
    setLocalStream(null); setRemoteStream(null); setCallStatus('idle'); setActiveCall(null);
    ringtone.current.pause();
  };

  const terminateCall = async () => {
    if (activeCall?.id) {
      await update(databaseRef(db, `calls/${activeCall.id}`), { status: 'ended' });
      setTimeout(() => remove(databaseRef(db, `calls/${activeCall.id}`)), 1000);
    }
    terminateCallLocally();
  };

  useEffect(() => {
    if (!user || !selectedUser) return;
    const cid = selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_");
    const q = query(databaseRef(db, `db/chats/${cid}`), limitToLast(50));
    return onValue(q, (snap) => {
      const d = snap.val();
      setMessages(d ? Object.keys(d).map(k => ({ id: k, ...d[k] })) : []);
    });
  }, [user, selectedUser]);

  const sendMsg = async () => {
    if (!message.trim() || !selectedUser) return;
    const cid = selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_");
    await push(databaseRef(db, `db/chats/${cid}`), { text: message, senderId: user.uid, senderName: user.displayName, timestamp: serverTimestamp() });
    setMessage("");
  };

  if (!user) return (
    <div className="h-screen flex items-center justify-center bg-[#fcfcfd]">
      <div className="w-full max-w-sm p-8 text-center">
        <h2 className="text-2xl font-bold mb-8 text-[#1a1a1a]">Stone Chat</h2>
        <div className="space-y-3">
          <input type="email" placeholder="Email" className="w-full bg-white border border-gray-100 p-4 rounded-3xl outline-none shadow-sm" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full bg-white border border-gray-100 p-4 rounded-3xl outline-none shadow-sm" onChange={e => setPassword(e.target.value)} />
          <button className="w-full bg-[#6610f2] text-white p-4 rounded-3xl font-semibold shadow-lg shadow-[#6610f2]/20" onClick={() => signInWithEmailAndPassword(auth, email, password)}>Մուտք</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8f9fb] text-[#1a1a1a]">
      
      {/* CALL MODAL (NEUTRAL STYLE) */}
      {callStatus !== 'idle' && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
          {callStatus === 'active' && activeCall?.type === 'video' ? (
            <div className="absolute inset-0 bg-gray-50">
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <video ref={localVideoRef} autoPlay muted playsInline className="absolute top-10 right-10 w-32 h-44 rounded-3xl border-4 border-white object-cover shadow-2xl" />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img src={callStatus === 'incoming' ? activeCall?.callerPhoto : selectedUser?.photo} className="w-24 h-24 rounded-full shadow-xl mb-6 object-cover" />
              <h2 className="text-xl font-bold">{callStatus === 'incoming' ? activeCall?.callerName : selectedUser?.displayName}</h2>
              <p className="text-gray-400 mt-2 text-xs font-semibold tracking-widest">{callStatus === 'active' ? 'ԶՐՈՒՅՑ' : 'ՄԻԱՑՈՒՄ...'}</p>
            </div>
          )}
          
          <div className="absolute bottom-16 flex gap-6 items-center bg-white/80 backdrop-blur-md px-8 py-4 rounded-[40px] shadow-2xl border border-white">
            <button onClick={() => { const t = localStream?.getAudioTracks()[0]; if(t) { t.enabled = !t.enabled; setIsMicMuted(!t.enabled); }}} className={`p-4 rounded-full transition-colors ${isMicMuted ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:text-[#6610f2]'}`}>{isMicMuted ? <MicOff size={20}/> : <Mic size={20}/>}</button>
            {callStatus === 'incoming' && <button onClick={acceptCall} className="p-6 bg-green-500 text-white rounded-full shadow-lg shadow-green-200 hover:scale-105 transition-transform"><Phone size={28} /></button>}
            <button onClick={terminateCall} className="p-6 bg-red-500 text-white rounded-full shadow-lg shadow-red-200 hover:scale-105 transition-transform"><PhoneOff size={28} /></button>
            {activeCall?.type === 'video' && <button onClick={() => { const t = localStream?.getVideoTracks()[0]; if(t) { t.enabled = !t.enabled; setIsVideoOff(!t.enabled); }}} className={`p-4 rounded-full transition-colors ${isVideoOff ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:text-[#6610f2]'}`}>{isVideoOff ? <CameraOff size={20}/> : <Camera size={20}/>}</button>}
          </div>
        </div>
      )}

      {/* CHAT INTERFACE */}
      <div className="flex w-full h-full max-w-[1600px] mx-auto overflow-hidden">
        
        {/* Sidebar */}
        <aside className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-[350px] flex-col border-r border-gray-100 bg-white`}>
          <div className="p-6 flex justify-between items-center"><h1 className="font-bold text-lg">Stone</h1><Plus size={20} className="text-[#6610f2] cursor-pointer" onClick={() => setShowGroupModal(true)}/></div>
          <div className="flex-1 overflow-y-auto px-4 space-y-1">
            {allUsers.filter(u => u.uid !== user.uid).map((u) => (
              <div key={u.uid || u.id} onClick={() => setSelectedUser(u)} className={`flex items-center gap-3 p-4 rounded-3xl cursor-pointer transition-all ${selectedUser?.uid === u.uid ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}>
                <div className="relative"><img src={u.photo} className="w-10 h-10 rounded-full object-cover shadow-sm" /><Circle size={8} className={`absolute -bottom-0.5 -right-0.5 fill-current ${u.state === 'online' ? 'text-green-500' : 'text-gray-200'}`} /></div>
                <div className="flex-1 text-sm"><p className="font-bold">{u.displayName}</p><p className="text-[10px] text-gray-400 uppercase font-bold">{u.isGroup ? 'Խումբ' : u.state}</p></div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <section className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-white`}>
          {selectedUser ? (
            <>
              <header className="px-8 py-4 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-3"><button onClick={() => setSelectedUser(null)} className="md:hidden text-gray-400"><ChevronLeft/></button><img src={selectedUser.photo} className="w-9 h-9 rounded-full object-cover" /><h3 className="font-bold text-sm">{selectedUser.displayName}</h3></div>
                <div className="flex gap-5 text-gray-300">
                  {!selectedUser.isGroup && <><Phone size={18} className="cursor-pointer hover:text-[#6610f2]" onClick={() => startCall(false)}/><Video size={20} className="cursor-pointer hover:text-[#6610f2]" onClick={() => startCall(true)}/></>}
                  <Eraser size={18} className="cursor-pointer hover:text-red-400" onClick={() => { if(confirm("Ջնջե՞լ պատմությունը:")) remove(databaseRef(db, `db/chats/${[user.uid, selectedUser.uid].sort().join("_")}`)); }}/>
                </div>
              </header>
              <main className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fcfcfd]">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex group gap-2 ${msg.senderId === user.uid ? 'flex-row-reverse' : ''}`}>
                    <div className={`px-5 py-2.5 rounded-3xl text-sm shadow-sm ${msg.senderId === user.uid ? 'bg-[#6610f2] text-white rounded-br-none' : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'}`}>{msg.text}</div>
                    {msg.senderId === user.uid && <Trash2 size={12} className="text-gray-100 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-red-400 transition-all self-center" onClick={() => remove(databaseRef(db, `db/chats/${[user.uid, selectedUser.uid].sort().join("_")}/${msg.id}`))}/>}
                  </div>
                ))}
              </main>
              <footer className="p-6 bg-white border-t border-gray-50">
                <div className="flex items-center gap-3 bg-gray-50 px-5 py-1 rounded-3xl">
                  <input type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Հաղորդագրություն..." className="flex-1 bg-transparent py-3 outline-none text-sm" />
                  <button onClick={sendMsg} className="p-2.5 bg-[#6610f2] text-white rounded-full shadow-lg shadow-[#6610f2]/20 hover:scale-105 transition-transform"><Send size={16}/></button>
                </div>
              </footer>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center opacity-10 font-bold text-4xl">STONE</div>
          )}
        </section>
      </div>

      {/* Modal New Group */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-gray-900/5 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white p-8 rounded-[40px] w-full max-w-xs shadow-2xl">
            <h3 className="font-bold mb-5">Նոր խումբ</h3>
            <input type="text" placeholder="Անվանումը" className="w-full bg-gray-50 p-4 rounded-2xl mb-4 outline-none border border-gray-100" onChange={(e) => setGroupName(e.target.value)} />
            <div className="flex gap-2">
              <button className="flex-1 bg-[#6610f2] text-white p-3.5 rounded-2xl font-bold text-sm" onClick={async () => { if (!groupName) return; await set(push(databaseRef(db, "db/groups")), { displayName: groupName, photo: `https://ui-avatars.com/api/?name=${groupName}&background=f3f4f6&color=6610f2`, adminId: user.uid }); setShowGroupModal(false); }}>Ստեղծել</button>
              <button className="flex-1 bg-gray-100 p-3.5 rounded-2xl font-bold text-sm" onClick={() => setShowGroupModal(false)}>Փակել</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
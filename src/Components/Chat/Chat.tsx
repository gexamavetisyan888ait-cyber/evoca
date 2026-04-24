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
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { db, auth, googleProvider } from "../../lib/firebase";
import {
  LogOut, ChevronLeft, Send, Phone, PhoneOff, Video, 
  Circle, Users, UserMinus, Plus, Mic, MicOff, Camera, CameraOff,
  Mail, Lock, User as UserIcon, Trash2, 
} from "lucide-react";

const servers = {
  iceServers: [
    { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302", "stun:stun3.l.google.com:19302"] }
  ],
  iceCandidatePoolSize: 10,
};

export default function StoneChat() {
  const [user, setUser] = useState<any>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

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

  const pc = useRef<RTCPeerConnection | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const ringtone = useRef(new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_7306915b2c.mp3"));

  // 1. Optimized Core Listeners
  useEffect(() => {
    ringtone.current.loop = true;
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        const statusRef = databaseRef(db, `db/status/${u.uid}`);
        update(statusRef, { uid: u.uid, displayName: u.displayName || displayName, photo: u.photoURL || `https://ui-avatars.com/api/?name=${u.displayName}&background=6610f2&color=fff`, state: "online" });
        onDisconnect(statusRef).update({ state: "offline" });

        // Optimized User List (Only fetch necessary)
        onValue(databaseRef(db, "db/status"), (snap) => {
          const users = snap.val() ? Object.values(snap.val()) : [];
          onValue(databaseRef(db, "db/groups"), (gSnap) => {
            const groups = gSnap.val() ? Object.keys(gSnap.val()).map(k => ({ ...gSnap.val()[k], id: k, isGroup: true })) : [];
            setAllUsers([...users, ...groups]);
          });
        });

        // Global Call Listener with Auto-Cleanup
        const callsRef = databaseRef(db, 'calls');
        onValue(callsRef, (snap) => {
          const data = snap.val();
          if (!data) return;
          Object.keys(data).forEach(id => {
            const call = data[id];
            // Միայն եթե թիրախը մենք ենք և զանգը նոր է
            if (call.targetId === u.uid && call.status === 'offer' && callStatus === 'idle') {
              setActiveCall({ ...call, id });
              setCallStatus('incoming');
              ringtone.current.play().catch(() => {});
            }
            // Եթե զանգն ավարտվել է մյուս կողմից
            if (call.status === 'ended' && activeCall?.id === id) {
              terminateCallLocally();
            }
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

  // 2. Peer Connection Logic
  const setupPeer = async (cId: string, isCaller: boolean) => {
    if (pc.current) pc.current.close();
    pc.current = new RTCPeerConnection(servers);

    pc.current.onicecandidate = (e) => {
      if (e.candidate) {
        const path = isCaller ? 'callerCandidates' : 'targetCandidates';
        push(databaseRef(db, `calls/${cId}/${path}`), e.candidate.toJSON());
      }
    };

    pc.current.ontrack = (e) => {
      if (e.streams[0]) setRemoteStream(e.streams[0]);
    };

    const remotePath = isCaller ? 'targetCandidates' : 'callerCandidates';
    onChildAdded(databaseRef(db, `calls/${cId}/${remotePath}`), (snap) => {
      if (snap.exists() && pc.current) {
        pc.current.addIceCandidate(new RTCIceCandidate(snap.val())).catch(() => {});
      }
    });
  };

  const startCall = async (video: boolean) => {
    if (!selectedUser || !window.isSecureContext) {
      alert("Զանգն աշխատում է միայն HTTPS միջավայրում:");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video });
      setLocalStream(stream);
      setCallStatus('outgoing');

      const callId = push(databaseRef(db, 'calls')).key as string;
      await setupPeer(callId, true);
      stream.getTracks().forEach(t => pc.current?.addTrack(t, stream));

      const offer = await pc.current?.createOffer();
      await pc.current?.setLocalDescription(offer);

      const callData = {
        id: callId,
        callerId: user.uid,
        callerName: user.displayName || "User",
        callerPhoto: user.photoURL || "",
        targetId: selectedUser.uid,
        status: 'offer',
        type: video ? 'video' : 'audio',
        offer: { type: offer?.type, sdp: offer?.sdp }
      };
      
      setActiveCall(callData);
      await set(databaseRef(db, `calls/${callId}`), callData);

      // Listen for Answer
      const answerRef = databaseRef(db, `calls/${callId}/answer`);
      onValue(answerRef, async (snap) => {
        const ans = snap.val();
        if (ans && pc.current && pc.current.signalingState === 'have-local-offer') {
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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: activeCall.type === 'video' });
      setLocalStream(stream);
      
      await setupPeer(activeCall.id, false);
      stream.getTracks().forEach(t => pc.current?.addTrack(t, stream));

      await pc.current?.setRemoteDescription(new RTCSessionDescription(activeCall.offer));
      const answer = await pc.current?.createAnswer();
      await pc.current?.setLocalDescription(answer);

      await update(databaseRef(db, `calls/${activeCall.id}`), { 
        answer: { type: answer?.type, sdp: answer?.sdp }, 
        status: 'active' 
      });
      setCallStatus('active');
    } catch (e) { terminateCall(); }
  };

  const terminateCallLocally = () => {
    localStream?.getTracks().forEach(t => t.stop());
    if (pc.current) { pc.current.close(); pc.current = null; }
    setLocalStream(null);
    setRemoteStream(null);
    setCallStatus('idle');
    setActiveCall(null);
    ringtone.current.pause();
    ringtone.current.currentTime = 0;
  };

  const terminateCall = async () => {
    if (activeCall?.id) {
      await update(databaseRef(db, `calls/${activeCall.id}`), { status: 'ended' });
      // Մաքրում ենք բազան զանգից հետո 3 վայրկյան անց
      setTimeout(() => remove(databaseRef(db, `calls/${activeCall.id}`)), 3000);
    }
    terminateCallLocally();
  };

  // 3. Optimized Chat Logic
  useEffect(() => {
    if (!user || !selectedUser) return;
    const cid = selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_");
    const msgQuery = query(databaseRef(db, `db/chats/${cid}`), limitToLast(50));
    
    return onValue(msgQuery, (snap) => {
      const d = snap.val();
      setMessages(d ? Object.keys(d).map(k => ({ id: k, ...d[k] })) : []);
    });
  }, [user, selectedUser]);

  const sendMsg = async () => {
    if (!message.trim() || !selectedUser) return;
    const cid = selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_");
    await push(databaseRef(db, `db/chats/${cid}`), { text: message, senderId: user.uid, senderName: user.displayName || "User", timestamp: serverTimestamp() });
    setMessage("");
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (authMode === 'register') {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await set(databaseRef(db, `db/status/${res.user.uid}`), { uid: res.user.uid, displayName, photo: `https://ui-avatars.com/api/?name=${displayName}&background=6610f2&color=fff`, state: "online" });
      } else { await signInWithEmailAndPassword(auth, email, password); }
    } catch (err: any) { alert(err.message); }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await set(databaseRef(db, `db/status/${res.user.uid}`), { uid: res.user.uid, displayName: res.user.displayName, photo: res.user.photoURL, state: "online" });
    } catch (err: any) { alert(err.message); }
  };

  const createGroup = async () => {
    if (!groupName) return;
    const res = push(databaseRef(db, "db/groups"));
    await set(res, { displayName: groupName, photo: `https://ui-avatars.com/api/?name=${groupName}&background=1a1a1a&color=fff`, adminId: user.uid });
    setGroupName(""); setShowGroupModal(false);
  };

  const deleteItem = (path: string) => { if (window.confirm("Ջնջե՞լ:")) remove(databaseRef(db, path)); };

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#6610f2] p-6">
        <div className="bg-white p-10 rounded-[40px] w-full max-w-md shadow-2xl">
          <h2 className="text-4xl font-black italic uppercase mb-8 text-center text-[#1a1a1a]">Evoca Chat</h2>
          <form onSubmit={handleAuth} className="space-y-4">
            {authMode === 'register' && (
              <div className="flex items-center bg-gray-50 p-4 rounded-2xl gap-3">
                <UserIcon size={20} className="text-gray-400" />
                <input type="text" placeholder="Անուն" className="bg-transparent outline-none w-full" onChange={e => setDisplayName(e.target.value)} required />
              </div>
            )}
            <div className="flex items-center bg-gray-50 p-4 rounded-2xl gap-3">
              <Mail size={20} className="text-gray-400" />
              <input type="email" placeholder="Էլ. փոստ" className="bg-transparent outline-none w-full" onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="flex items-center bg-gray-50 p-4 rounded-2xl gap-3">
              <Lock size={20} className="text-gray-400" />
              <input type="password" placeholder="Գաղտնաբառ" className="bg-transparent outline-none w-full" onChange={e => setPassword(e.target.value)} required />
            </div>
            <button className="w-full bg-[#6610f2] text-white p-4 rounded-2xl font-black uppercase hover:opacity-90">
              {authMode === 'login' ? 'Մուտք' : 'Գրանցվել'}
            </button>
          </form>
          <button onClick={handleGoogleLogin} className="w-full mt-4 border-2 p-4 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-gray-50">
          </button>
          <p className="text-center mt-6 text-sm font-bold text-gray-400 cursor-pointer" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
            {authMode === 'login' ? "Չունե՞ք հաշիվ: Գրանցվեք" : "Ունե՞ք հաշիվ: Մուտք գործեք"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8f9fb] font-sans relative overflow-hidden">
      
      {/* CALL UI */}
      {callStatus !== 'idle' && (
        <div className="fixed inset-0 z-[100] bg-[#1a1a1a]/95 backdrop-blur-xl flex flex-col items-center justify-center text-white">
          <div className="relative mb-8">
            <div className={`absolute inset-0 rounded-full bg-blue-500 opacity-20 ${callStatus === 'outgoing' ? 'animate-ping' : ''}`}></div>
            <img src={callStatus === 'incoming' ? activeCall?.callerPhoto : selectedUser?.photo} className="w-32 h-32 rounded-full border-4 border-[#6610f2] relative z-10 object-cover" alt="" />
          </div>
          <h2 className="text-2xl font-black mb-12 uppercase italic">{callStatus === 'incoming' ? activeCall?.callerName : selectedUser?.displayName}</h2>
          
          {callStatus === 'active' && activeCall?.type === 'video' && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <video ref={localVideoRef} autoPlay muted playsInline className="absolute top-8 right-8 w-32 h-48 rounded-2xl border-2 border-white/20 object-cover bg-gray-800" />
            </div>
          )}

          <div className="flex gap-8 relative z-20">
            {callStatus === 'incoming' ? (
              <>
                <button onClick={acceptCall} className="p-6 bg-emerald-500 rounded-full shadow-lg hover:scale-110 transition-all"><Phone size={32} /></button>
                <button onClick={terminateCall} className="p-6 bg-red-500 rounded-full shadow-lg hover:scale-110 transition-all"><PhoneOff size={32} /></button>
              </>
            ) : (
              <div className="flex gap-4 items-center">
                <button onClick={() => { 
                   const track = localStream?.getAudioTracks()[0]; 
                   if(track) { track.enabled = !track.enabled; setIsMicMuted(!track.enabled); }
                }} className={`p-4 rounded-full ${isMicMuted ? 'bg-red-500' : 'bg-white/10'}`}>
                  {isMicMuted ? <MicOff /> : <Mic />}
                </button>
                <button onClick={terminateCall} className="p-6 bg-red-500 rounded-full shadow-lg hover:scale-110 transition-all"><PhoneOff size={32} /></button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex w-full h-full p-4 md:p-10">
        <div className="flex w-full max-w-[1400px] mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden">
          
          <aside className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-[380px] flex-col border-r border-gray-50`}>
            <div className="p-8 flex justify-between items-center bg-white sticky top-0">
              <h2 className="text-2xl font-[1000] italic uppercase text-[#1a1a1a]">Evoca</h2>
              <div className="flex gap-3">
                <Plus size={20} className="cursor-pointer text-[#6610f2]" onClick={() => setShowGroupModal(true)} />
                <LogOut size={20} className="cursor-pointer text-gray-300" onClick={() => signOut(auth)} />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {allUsers.filter(u => u.uid !== user.uid).map((u) => (
                <div key={u.uid || u.id} className={`group flex items-center gap-4 p-4 rounded-[24px] cursor-pointer transition-all ${selectedUser?.uid === u.uid ? 'bg-[#f3ebff]' : 'hover:bg-gray-50'}`}>
                  <div className="relative" onClick={() => setSelectedUser(u)}>
                    <img src={u.photo} className="w-12 h-12 rounded-full object-cover" alt="" />
                    {!u.isGroup && <Circle size={10} className={`absolute bottom-0 right-0 fill-current ${u.state === 'online' ? 'text-green-500' : 'text-red-400'}`} />}
                  </div>
                  <div className="flex-1" onClick={() => setSelectedUser(u)}>
                    <p className="font-bold text-sm text-[#1a1a1a]">{u.displayName}</p>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">{u.isGroup ? 'Group Chat' : u.state}</p>
                  </div>
                  <UserMinus size={16} className="text-gray-200 opacity-0 group-hover:opacity-100 hover:text-red-500" onClick={() => deleteItem(u.isGroup ? `db/groups/${u.id}` : `db/status/${u.uid}`)} />
                </div>
              ))}
            </div>
          </aside>

          <section className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 flex-col`}>
            {selectedUser ? (
              <>
                <header className="px-8 py-5 flex items-center justify-between border-b border-gray-50 bg-white/80 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedUser(null)} className="md:hidden"><ChevronLeft /></button>
                    <img src={selectedUser.photo} className="w-10 h-10 rounded-full object-cover" alt="" />
                    <h3 className="font-black uppercase italic text-sm text-[#1a1a1a]">{selectedUser.displayName}</h3>
                  </div>
                  {!selectedUser.isGroup && (
                    <div className="flex items-center gap-6 text-[#6610f2]">
                      <Phone className="cursor-pointer hover:scale-110" onClick={() => startCall(false)} />
                      <Video className="cursor-pointer hover:scale-110" onClick={() => startCall(true)} />
                    </div>
                  )}
                </header>
                <main className="flex-1 overflow-y-auto p-8 space-y-4 bg-[#fcfcfd]">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col group ${msg.senderId === user.uid ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-2 max-w-[80%]">
                        {msg.senderId === user.uid && <Trash2 size={12} className="text-gray-200 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-red-500" onClick={() => deleteItem(`db/chats/${selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_")}/${msg.id}`)} />}
                        <div className={`px-6 py-3 rounded-[22px] text-sm font-medium ${msg.senderId === user.uid ? 'bg-[#6610f2] text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-50 rounded-bl-none shadow-sm'}`}>
                          {selectedUser.isGroup && msg.senderId !== user.uid && <p className="text-[10px] font-black opacity-50 mb-1 uppercase">{msg.senderName}</p>}
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </main>
                <footer className="p-8 border-t border-gray-50 bg-white">
                  <div className="flex items-center gap-4 bg-[#f2f4f7] rounded-[24px] px-6 py-1 border border-transparent focus-within:border-[#6610f2]/20 transition-all">
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMsg()} placeholder="Գրել հաղորդագրություն..." className="flex-1 bg-transparent py-4 text-sm outline-none text-[#1a1a1a]" />
                    <button onClick={sendMsg} className="p-3 bg-[#6610f2] text-white rounded-full hover:rotate-12 transition-all shadow-lg"><Send size={18} /></button>
                  </div>
                </footer>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center opacity-5 select-none pointer-events-none"><h1 className="text-[120px] font-black italic uppercase">Evoca</h1></div>
            )}
          </section>
        </div>
      </div>

      {showGroupModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white p-8 rounded-[40px] w-full max-w-sm shadow-2xl">
            <h3 className="text-2xl font-black mb-6 uppercase italic text-[#1a1a1a]">Նոր Խումբ</h3>
            <input type="text" placeholder="Անունը" className="w-full bg-gray-50 p-4 rounded-2xl mb-4 outline-none font-bold text-[#1a1a1a]" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            <div className="flex gap-3">
              <button className="flex-1 bg-[#6610f2] text-white p-4 rounded-2xl font-black uppercase" onClick={createGroup}>Ստեղծել</button>
              <button className="flex-1 bg-gray-50 p-4 rounded-2xl font-black uppercase" onClick={() => setShowGroupModal(false)}>Փակել</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
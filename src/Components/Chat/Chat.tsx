import React, { useState, useEffect, useRef } from "react";
import {
  ref as databaseRef, onValue, push, serverTimestamp, onDisconnect, set, remove, update, onChildAdded, limitToLast, query as dbQuery
} from "firebase/database";
import {
  onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { db, auth } from "../../lib/firebase";
import {
  LogOut, ChevronLeft, Send, Phone, PhoneOff, Video,
  Plus, Mic, MicOff, Trash2, X, User
} from "lucide-react";

const iceConfig = {
  iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }]
};

export default function EvocaPerfectChat() {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const [callStatus, setCallStatus] = useState<'idle' | 'outgoing' | 'incoming' | 'active'>('idle');
  const [activeCall, setActiveCall] = useState<any>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);

  const pc = useRef<RTCPeerConnection | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // --- AUTH & GOOGLE LOGIN ---
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        const statusRef = databaseRef(db, `db/status/${u.uid}`);
        update(statusRef, {
          uid: u.uid,
          displayName: u.displayName,
          photo: u.photoURL,
          state: "online",
          lastSeen: serverTimestamp()
        });
        onDisconnect(statusRef).update({ state: "offline", lastSeen: serverTimestamp() });
      } else { setUser(null); }
    });
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try { await signInWithPopup(auth, provider); } catch (e) { console.error(e); }
  };

  // --- USERS & CALLS ---
  useEffect(() => {
    if (!user) return;
    const usersRef = databaseRef(db, "db/status");
    onValue(usersRef, (snap) => {
      const uData = snap.val() ? Object.values(snap.val()) : [];
      onValue(databaseRef(db, "db/groups"), (gSnap) => {
        const gData = gSnap.val() ? Object.keys(gSnap.val()).map(k => ({ ...gSnap.val()[k], id: k, isGroup: true })) : [];
        setAllUsers([...uData, ...gData]);
      });
    });

    const callsRef = databaseRef(db, 'calls');
    onValue(callsRef, (snap) => {
      const data = snap.val();
      if (!data) return;
      Object.keys(data).forEach(id => {
        const call = data[id];
        if (call.targetId === user.uid && call.status === 'offer' && callStatus === 'idle') {
          setActiveCall({ ...call, id });
          setCallStatus('incoming');
        }
        if (call.status === 'ended' && (activeCall?.id === id || activeCall?.callId === id)) terminateCallLocally();
      });
    });
  }, [user, callStatus, activeCall]);

  // --- CHAT LOGIC ---
  useEffect(() => {
    if (!user || !selectedUser) { setMessages([]); return; }
    const chatId = selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_");
    const msgQuery = dbQuery(databaseRef(db, `db/chats/${chatId}`), limitToLast(50));
    return onValue(msgQuery, (snap) => {
      const data = snap.val();
      setMessages(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []);
    });
  }, [selectedUser, user]);

  const sendMsg = async () => {
    if (!message.trim() || !selectedUser) return;
    const chatId = selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_");
    await set(push(databaseRef(db, `db/chats/${chatId}`)), {
      text: message,
      senderId: user.uid,
      senderName: user.displayName,
      timestamp: serverTimestamp()
    });
    setMessage("");
  };

  const deleteUserFromList = (uid: string) => {
    setAllUsers(prev => prev.filter(u => (u.uid || u.id) !== uid));
    if (selectedUser?.uid === uid || selectedUser?.id === uid) setSelectedUser(null);
  };

  // --- WebRTC FIXED ---
  const setupPeer = async (cId: string, isCaller: boolean) => {
    if (pc.current) {
        pc.current.close();
        pc.current = null;
    }
    pc.current = new RTCPeerConnection(iceConfig);
    
    pc.current.ontrack = (e) => {
      if (e.streams && e.streams[0]) {
        setRemoteStream(e.streams[0]);
      }
    };

    pc.current.onicecandidate = (e) => {
      if (e.candidate) {
        const path = isCaller ? 'callerCandidates' : 'targetCandidates';
        push(databaseRef(db, `calls/${cId}/${path}`), e.candidate.toJSON());
      }
    };

    const remotePath = isCaller ? 'targetCandidates' : 'callerCandidates';
    onChildAdded(databaseRef(db, `calls/${cId}/${remotePath}`), (s) => {
      if (s.val() && pc.current && pc.current.remoteDescription) {
        pc.current.addIceCandidate(new RTCIceCandidate(s.val()));
      }
    });
  };

  const startCall = async (video: boolean) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video });
    setLocalStream(stream);
    setCallStatus('outgoing');
    const callId = push(databaseRef(db, 'calls')).key as string;
    await setupPeer(callId, true);
    stream.getTracks().forEach(t => pc.current?.addTrack(t, stream));
    const offer = await pc.current?.createOffer();
    await pc.current?.setLocalDescription(offer);
    const callData = { callId, callerId: user.uid, callerName: user.displayName, targetId: selectedUser.uid, status: 'offer', type: video ? 'video' : 'audio', offer: { type: offer?.type, sdp: offer?.sdp } };
    await set(databaseRef(db, `calls/${callId}`), callData);
    setActiveCall(callData);
    onValue(databaseRef(db, `calls/${callId}/answer`), async (s) => {
      if (s.val() && pc.current?.signalingState === 'have-local-offer') {
        await pc.current.setRemoteDescription(new RTCSessionDescription(s.val()));
        setCallStatus('active');
      }
    });
  };

  const acceptCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: activeCall.type === 'video' });
    setLocalStream(stream);
    await setupPeer(activeCall.id || activeCall.callId, false);
    stream.getTracks().forEach(t => pc.current?.addTrack(t, stream));
    await pc.current?.setRemoteDescription(new RTCSessionDescription(activeCall.offer));
    const answer = await pc.current?.createAnswer();
    await pc.current?.setLocalDescription(answer);
    await update(databaseRef(db, `calls/${activeCall.id || activeCall.callId}`), { answer: { type: answer?.type, sdp: answer?.sdp }, status: 'active' });
    setCallStatus('active');
  };

  const terminateCall = async () => {
    const cId = activeCall?.id || activeCall?.callId;
    if (cId) await update(databaseRef(db, `calls/${cId}`), { status: 'ended' });
    terminateCallLocally();
  };

  const terminateCallLocally = () => {
    if (localStream) localStream.getTracks().forEach(t => t.stop());
    if (pc.current) {
        pc.current.ontrack = null;
        pc.current.onicecandidate = null;
        pc.current.close();
        pc.current = null;
    }
    setLocalStream(null); setRemoteStream(null); setCallStatus('idle'); setActiveCall(null);
  };

  useEffect(() => {
    if (localVideoRef.current && localStream) localVideoRef.current.srcObject = localStream;
    if (remoteVideoRef.current && remoteStream) remoteVideoRef.current.srcObject = remoteStream;
  }, [localStream, remoteStream]);

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white p-6 font-sans">
        <div className="text-center space-y-12 w-full max-w-xs">
          <h1 className="text-4xl font-thin uppercase tracking-[0.4em] text-gray-900">Evoca</h1>
          <button 
            onClick={loginWithGoogle} 
            className="w-full py-4 bg-black text-white rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
          >
             Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900 overflow-hidden justify-center items-center">
      {/* CALL SCREEN */}
      {callStatus !== 'idle' && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center">
          <audio autoPlay ref={(el) => { if (el && remoteStream && activeCall?.type === 'audio') el.srcObject = remoteStream; }} />
          {callStatus === 'active' && activeCall?.type === 'video' ? (
            <div className="w-full h-full bg-black relative">
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <video ref={localVideoRef} autoPlay muted playsInline className="absolute top-10 right-10 w-32 h-48 rounded-2xl border border-white/20 object-cover shadow-2xl" />
            </div>
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full mx-auto mb-8 flex items-center justify-center">
                <User size={40} className="text-gray-200" />
              </div>
              <h2 className="text-xl font-light uppercase tracking-widest">{callStatus === 'incoming' ? activeCall?.callerName : selectedUser?.displayName}</h2>
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] mt-4 animate-pulse">{callStatus === 'incoming' ? 'Incoming...' : callStatus === 'active' ? 'Connected' : 'Calling...'}</p>
            </div>
          )}
          <div className="absolute bottom-20 flex gap-8 items-center px-8 py-4 bg-gray-50/80 backdrop-blur rounded-full border border-gray-100">
            <button onClick={() => { const t = localStream?.getAudioTracks()[0]; if (t) t.enabled = !t.enabled; setIsMicMuted(!t?.enabled); }} className={`p-4 ${isMicMuted ? 'text-red-500' : 'text-gray-400'}`}>
              {isMicMuted ? <MicOff size={22} /> : <Mic size={22} />}
            </button>
            {callStatus === 'incoming' && <button onClick={acceptCall} className="p-5 bg-black text-white rounded-full"><Phone size={24} /></button>}
            <button onClick={terminateCall} className="p-5 bg-red-500 text-white rounded-full"><PhoneOff size={24} /></button>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div className="flex w-full max-w-[1200px] h-[90%] bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm">
        <aside className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-72 flex-col border-r border-gray-50`}>
          <div className="p-8 flex justify-between items-center">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em]">Evoca</h2>
            <button onClick={() => setShowGroupModal(true)} className="text-gray-300 hover:text-black"><Plus size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-4">
            {allUsers.filter(u => (u.uid || u.id) !== user.uid).map((u) => (
              <div key={u.uid || u.id} className="group flex items-center gap-3 p-4 mb-1 rounded-2xl cursor-pointer transition-all hover:bg-gray-50 relative">
                <div className="relative flex-shrink-0" onClick={() => setSelectedUser(u)}>
                  <img src={u.photo} className="w-10 h-10 rounded-full object-cover grayscale-[0.2]" />
                  {!u.isGroup && <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${u.state === 'online' ? 'bg-green-400' : 'bg-gray-200'}`} />}
                </div>
                <div className="flex-1 truncate" onClick={() => setSelectedUser(u)}>
                  <p className="text-[11px] font-medium uppercase tracking-tight truncate">{u.displayName}</p>
                  <p className="text-[9px] text-gray-300 uppercase tracking-widest">{u.isGroup ? 'Group' : u.state}</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteUserFromList(u.uid || u.id); }} 
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-400 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-6">
            <button onClick={() => signOut(auth)} className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-gray-300 hover:text-black transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </aside>

        <section className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-white`}>
          {selectedUser ? (
            <>
              <header className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedUser(null)} className="md:hidden"><ChevronLeft size={20} /></button>
                  <img src={selectedUser.photo} className="w-9 h-9 rounded-full object-cover grayscale-[0.1]" />
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest">{selectedUser.displayName}</h3>
                    <p className="text-[8px] text-green-400 uppercase tracking-widest">{selectedUser.isGroup ? 'Active' : selectedUser.state}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-gray-300">
                  {!selectedUser.isGroup && (
                    <>
                      <button onClick={() => startCall(false)} className="hover:text-black transition-all"><Phone size={18} /></button>
                      <button onClick={() => startCall(true)} className="hover:text-black transition-all"><Video size={18} /></button>
                    </>
                  )}
                  <button onClick={() => remove(databaseRef(db, `db/chats/${selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_")}`))} className="hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                </div>
              </header>

              <main className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === user.uid ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-5 py-3 rounded-[20px] text-[11px] max-w-[75%] shadow-sm ${
                      msg.senderId === user.uid ? 'bg-black text-white rounded-br-none' : 'bg-gray-50 text-gray-700 rounded-bl-none border border-gray-100'
                    }`}>
                      {selectedUser.isGroup && msg.senderId !== user.uid && <p className="text-[7px] font-black opacity-50 mb-1 uppercase tracking-tighter">{msg.senderName}</p>}
                      {msg.text}
                    </div>
                  </div>
                ))}
              </main>

              <footer className="p-8">
                <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-6 border border-gray-100 focus-within:border-gray-200 transition-all">
                  <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMsg()} placeholder="Message..." className="flex-1 bg-transparent py-5 text-[11px] outline-none" />
                  <button onClick={sendMsg} className="text-gray-400 hover:text-black transition-colors"><Send size={18} /></button>
                </div>
              </footer>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-[0.05] select-none">
              <h1 className="text-[80px] font-thin uppercase tracking-[0.3em]">Evoca</h1>
            </div>
          )}
        </section>
      </div>

      {/* GROUP MODAL */}
      {showGroupModal && (
        <div className="fixed inset-0 z-[210] bg-white/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-sm p-12 border border-gray-100 rounded-[30px] relative shadow-2xl">
            <button onClick={() => setShowGroupModal(false)} className="absolute top-8 right-8 text-gray-300 hover:text-black"><X size={20} /></button>
            <h3 className="text-[10px] uppercase tracking-[0.3em] mb-10 text-center font-bold">New Group</h3>
            <input type="text" placeholder="NAME" className="w-full p-5 bg-gray-50 rounded-2xl outline-none mb-8 text-[11px] border border-gray-100" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} />
            <button onClick={async () => {
              if (!newGroupName.trim()) return;
              const gRef = push(databaseRef(db, "db/groups"));
              await set(gRef, { displayName: newGroupName, photo: `https://ui-avatars.com/api/?name=${newGroupName}&background=000&color=fff`, createdBy: user.uid, isGroup: true });
              setNewGroupName(""); setShowGroupModal(false);
            }} className="w-full py-5 bg-black text-white rounded-2xl text-[10px] uppercase tracking-widest font-bold">Create</button>
          </div>
        </div>
      )}
    </div>
  );
}
// import React, { useState, useEffect, useRef } from "react";
// import {
//   ref as databaseRef, onValue, push, serverTimestamp, onDisconnect, set, remove, update, onChildAdded, off, limitToLast, query as dbQuery
// } from "firebase/database";
// import {
//   onAuthStateChanged, signOut, signInWithEmailAndPassword,
//   createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider
// } from "firebase/auth";
// import { db, auth } from "../../lib/firebase";
// import {
//   LogOut, ChevronLeft, Send, Phone, PhoneOff, Video,
//   Plus, Mic, MicOff, Trash2, X, Users, User
// } from "lucide-react";

// const iceConfig = {
//   iceServers: [
//     { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }
//   ]
// };

// export default function EvocaPerfectChat() {
//   const [user, setUser] = useState<any>(null);
//   const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [messages, setMessages] = useState<any[]>([]);
//   const [message, setMessage] = useState("");
//   const [allUsers, setAllUsers] = useState<any[]>([]);
//   const [selectedUser, setSelectedUser] = useState<any | null>(null);
//   const [showGroupModal, setShowGroupModal] = useState(false);
//   const [newGroupName, setNewGroupName] = useState("");

//   const [callStatus, setCallStatus] = useState<'idle' | 'outgoing' | 'incoming' | 'active'>('idle');
//   const [activeCall, setActiveCall] = useState<any>(null);
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
//   const [isMicMuted, setIsMicMuted] = useState(false);

//   const pc = useRef<RTCPeerConnection | null>(null);
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);

//   // --- 1. AUTH & STATUS ---
//   useEffect(() => {
//     return onAuthStateChanged(auth, (u) => {
//       if (u) {
//         setUser(u);
//         const statusRef = databaseRef(db, `db/status/${u.uid}`);
//         update(statusRef, {
//           uid: u.uid,
//           displayName: u.displayName || u.email?.split('@')[0],
//           photo: u.photoURL || `https://ui-avatars.com/api/?name=${u.email}&background=f8f9fb&color=000`,
//           state: "online",
//           lastSeen: serverTimestamp()
//         });
//         onDisconnect(statusRef).update({ state: "offline", lastSeen: serverTimestamp() });
//       } else {
//         setUser(null);
//       }
//     });
//   }, []);

//   // --- 2. USERS & CALLS LISTENER ---
//   useEffect(() => {
//     if (!user) return;
//     const usersRef = databaseRef(db, "db/status");
//     onValue(usersRef, (snap) => {
//       const uData = snap.val() ? Object.values(snap.val()) : [];
//       onValue(databaseRef(db, "db/groups"), (gSnap) => {
//         const gData = gSnap.val() ? Object.keys(gSnap.val()).map(k => ({ ...gSnap.val()[k], id: k, isGroup: true })) : [];
//         setAllUsers([...uData, ...gData]);
//       });
//     });

//     const callsRef = databaseRef(db, 'calls');
//     const unsubCalls = onValue(callsRef, (snap) => {
//       const data = snap.val();
//       if (!data) return;
//       Object.keys(data).forEach(id => {
//         const call = data[id];
//         // Մուտքային զանգի որսում
//         if (call.targetId === user.uid && call.status === 'offer' && callStatus === 'idle') {
//           setActiveCall({ ...call, id });
//           setCallStatus('incoming');
//         }
//         // Եթե մյուս կողմը անջատել է
//         if (call.status === 'ended' && activeCall?.id === id) {
//           terminateCallLocally();
//         }
//       });
//     });

//     return () => {
//       off(usersRef);
//       unsubCalls();
//     };
//   }, [user, callStatus, activeCall]);

//   // --- 3. CHAT LOGIC ---
//   useEffect(() => {
//     if (!user || !selectedUser) { setMessages([]); return; }
//     const chatId = selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_");
//     const msgQuery = dbQuery(databaseRef(db, `db/chats/${chatId}`), limitToLast(50));
//     return onValue(msgQuery, (snap) => {
//       const data = snap.val();
//       setMessages(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []);
//     });
//   }, [selectedUser, user]);

//   const sendMsg = async () => {
//     if (!message.trim() || !selectedUser) return;
//     const chatId = selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_");
//     await set(push(databaseRef(db, `db/chats/${chatId}`)), {
//       text: message,
//       senderId: user.uid,
//       senderName: user.displayName || user.email?.split('@')[0],
//       timestamp: serverTimestamp()
//     });
//     setMessage("");
//   };

//   const deleteFullChat = async () => {
//     if (!selectedUser || !user || !window.confirm("Ջնջե՞լ ամբողջ նամակագրությունը:")) return;
//     const chatId = selectedUser.isGroup ? `group_${selectedUser.id}` : [user.uid, selectedUser.uid].sort().join("_");
//     await remove(databaseRef(db, `db/chats/${chatId}`));
//   };

//   // --- 4. WebRTC LOGIC (FIXED FOR MULTIPLE CALLS) ---
//   const setupPeer = async (cId: string, isCaller: boolean) => {
//     if (pc.current) {
//       pc.current.close();
//       pc.current = null;
//     }
    
//     pc.current = new RTCPeerConnection(iceConfig);

//     pc.current.ontrack = (e) => {
//       if (e.streams[0]) {
//         setRemoteStream(e.streams[0]);
//       }
//     };

//     pc.current.onicecandidate = (e) => {
//       if (e.candidate) {
//         const path = isCaller ? 'callerCandidates' : 'targetCandidates';
//         push(databaseRef(db, `calls/${cId}/${path}`), e.candidate.toJSON());
//       }
//     };

//     const remotePath = isCaller ? 'targetCandidates' : 'callerCandidates';
//     onChildAdded(databaseRef(db, `calls/${cId}/${remotePath}`), (s) => {
//       if (s.val() && pc.current) {
//         pc.current.addIceCandidate(new RTCIceCandidate(s.val())).catch(e => console.error("ICE Error", e));
//       }
//     });
//   };

//   const startCall = async (video: boolean) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video });
//       setLocalStream(stream);
//       setCallStatus('outgoing');

//       const callId = push(databaseRef(db, 'calls')).key as string;
//       await setupPeer(callId, true);

//       stream.getTracks().forEach(t => pc.current?.addTrack(t, stream));

//       const offer = await pc.current?.createOffer();
//       await pc.current?.setLocalDescription(offer);

//       const callData = { 
//         id: callId, 
//         callerId: user.uid, 
//         callerName: user.displayName || user.email, 
//         targetId: selectedUser.uid, 
//         status: 'offer', 
//         type: video ? 'video' : 'audio', 
//         offer: { type: offer?.type, sdp: offer?.sdp } 
//       };

//       await set(databaseRef(db, `calls/${callId}`), callData);
//       setActiveCall(callData);

//       // Լսել պատասխանին
//       onValue(databaseRef(db, `calls/${callId}/answer`), async (s) => {
//         const answer = s.val();
//         if (answer && pc.current && pc.current.signalingState === 'have-local-offer') {
//           await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
//           setCallStatus('active');
//         }
//       });
//     } catch (err) {
//       console.error(err);
//       terminateCallLocally();
//     }
//   };

//   const acceptCall = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         audio: true, 
//         video: activeCall.type === 'video' 
//       });
//       setLocalStream(stream);
      
//       await setupPeer(activeCall.id, false);

//       stream.getTracks().forEach(t => pc.current?.addTrack(t, stream));
      
//       await pc.current?.setRemoteDescription(new RTCSessionDescription(activeCall.offer));
//       const answer = await pc.current?.createAnswer();
//       await pc.current?.setLocalDescription(answer);

//       await update(databaseRef(db, `calls/${activeCall.id}`), { 
//         answer: { type: answer?.type, sdp: answer?.sdp }, 
//         status: 'active' 
//       });
//       setCallStatus('active');
//     } catch (err) {
//       console.error(err);
//       terminateCall();
//     }
//   };

//   const terminateCall = async () => {
//     if (activeCall?.id) {
//       await update(databaseRef(db, `calls/${activeCall.id}`), { status: 'ended' });
//       // Մաքրել տվյալները բազայից մի փոքր ուշացումով
//       setTimeout(() => remove(databaseRef(db, `calls/${activeCall.id}`)), 1000);
//     }
//     terminateCallLocally();
//   };

//   const terminateCallLocally = () => {
//     if (localStream) {
//       localStream.getTracks().forEach(t => t.stop());
//     }
//     if (pc.current) {
//       pc.current.close();
//       pc.current = null;
//     }
//     setLocalStream(null);
//     setRemoteStream(null);
//     setCallStatus('idle');
//     setActiveCall(null);
//     setIsMicMuted(false);
//   };

//   useEffect(() => {
//     if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
//     if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
//   }, [localStream, remoteStream]);

//   async function handleAuth() {
//     try {
//       if (authMode === 'login') await signInWithEmailAndPassword(auth, email, password);
//       else await createUserWithEmailAndPassword(auth, email, password);
//     } catch (e: any) { alert(e.message); }
//   }

//   // --- UI RENDER ---
//   if (!user) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-white p-6 font-sans">
//         <div className="w-full max-w-sm">
//           <h1 className="text-3xl font-light uppercase tracking-[0.3em] mb-12 text-center text-gray-900">Evoca</h1>
//           <div className="space-y-5">
//             <input type="email" placeholder="EMAIL" className="w-full p-4 bg-gray-50 rounded-xl outline-none text-xs tracking-widest border border-gray-100" value={email} onChange={e => setEmail(e.target.value)} />
//             <input type="password" placeholder="PASSWORD" className="w-full p-4 bg-gray-50 rounded-xl outline-none text-xs tracking-widest border border-gray-100" value={password} onChange={e => setPassword(e.target.value)} />
//             <button onClick={handleAuth} className="w-full py-4 bg-black text-white rounded-xl text-xs uppercase tracking-[0.2em]">{authMode === 'login' ? 'Enter' : 'Join'}</button>
//           </div>
//           <p className="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest cursor-pointer" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
//             {authMode === 'login' ? "Create account" : "Back to login"}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-white font-sans text-gray-900 overflow-hidden justify-center items-center">
//       {/* CALL SCREEN */}
//       {callStatus !== 'idle' && (
//         <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center">
//           {/* Ձայնի ապահովում */}
//           <audio autoPlay ref={(el) => { if (el && remoteStream && activeCall?.type === 'audio') el.srcObject = remoteStream; }} />
          
//           {callStatus === 'active' && activeCall?.type === 'video' ? (
//             <div className="w-full h-full bg-black relative">
//               <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
//               <video ref={localVideoRef} autoPlay muted playsInline className="absolute top-10 right-10 w-32 h-48 rounded-2xl border border-white/20 object-cover z-10" />
//             </div>
//           ) : (
//             <div className="text-center">
//               <div className="w-24 h-24 bg-gray-50 rounded-full mx-auto mb-8 flex items-center justify-center">
//                 <User size={40} className="text-gray-200" />
//               </div>
//               <h2 className="text-xl font-light uppercase tracking-widest">
//                 {callStatus === 'incoming' ? activeCall?.callerName : selectedUser?.displayName}
//               </h2>
//               <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] mt-4 animate-pulse">
//                 {callStatus === 'incoming' ? 'Incoming...' : callStatus === 'active' ? 'Connected' : 'Calling...'}
//               </p>
//             </div>
//           )}
          
//           <div className="absolute bottom-20 flex gap-8 items-center px-8 py-4 bg-gray-50 rounded-full border border-gray-100">
//             <button onClick={() => { const t = localStream?.getAudioTracks()[0]; if (t) t.enabled = !t.enabled; setIsMicMuted(!t?.enabled); }} className={`p-4 ${isMicMuted ? 'text-red-500' : 'text-gray-400'}`}>
//               {isMicMuted ? <MicOff size={22} /> : <Mic size={22} />}
//             </button>
//             {callStatus === 'incoming' && <button onClick={acceptCall} className="p-5 bg-green-500 text-white rounded-full transition-transform active:scale-90"><Phone size={24} /></button>}
//             <button onClick={terminateCall} className="p-5 bg-red-500 text-white rounded-full transition-transform active:scale-90"><PhoneOff size={24} /></button>
//           </div>
//         </div>
//       )}

//       {/* MAIN LAYOUT */}
//       <div className="flex w-full max-w-[1500px] h-[80%] bg-white border border-gray-100 rounded-[30px] overflow-hidden shadow-sm">
//         <aside className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-72 flex-col border-r border-gray-50`}>
//           <div className="p-6 flex justify-between items-center border-b border-gray-50">
//             <h2 className="text-xs font-normal uppercase tracking-[0.3em]">Evoca</h2>
//             <button onClick={() => setShowGroupModal(true)} className="text-gray-400 hover:text-black"><Plus size={18} /></button>
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             {allUsers.filter(u => u.uid !== user.uid).map((u) => (
//               <div key={u.uid || u.id} onClick={() => setSelectedUser(u)} className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${selectedUser?.uid === u.uid || selectedUser?.id === u.id ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}>
//                 <div className="relative">
//                   <img src={u.photo} className="w-10 h-10 rounded-full object-cover grayscale-[0.3]" />
//                   {!u.isGroup && <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white ${u.state === 'online' ? 'bg-green-400' : 'bg-gray-200'}`} />}
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-[11px] font-normal uppercase tracking-tight truncate">{u.displayName}</p>
//                   <p className="text-[9px] text-gray-300 uppercase tracking-widest">{u.isGroup ? 'Group' : u.state}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="p-4 border-t border-gray-50">
//             <button onClick={() => signOut(auth)} className="w-full flex items-center justify-center gap-2 text-[9px] font-normal uppercase tracking-widest text-gray-400 hover:text-red-500 p-2">
//               <LogOut size={14} /> Log Out
//             </button>
//           </div>
//         </aside>

//         <section className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-white`}>
//           {selectedUser ? (
//             <>
//               <header className="px-8 py-5 flex items-center justify-between border-b border-gray-50">
//                 <div className="flex items-center gap-4">
//                   <button onClick={() => setSelectedUser(null)} className="md:hidden"><ChevronLeft size={20} /></button>
//                   <img src={selectedUser.photo} className="w-9 h-9 rounded-full object-cover grayscale-[0.2]" />
//                   <h3 className="text-[11px] font-normal uppercase tracking-widest">{selectedUser.displayName}</h3>
//                 </div>
//                 <div className="flex items-center gap-6 text-gray-300">
//                   {!selectedUser.isGroup && (
//                     <>
//                       <button onClick={() => startCall(false)} className="hover:text-black transition-colors"><Phone size={18} /></button>
//                       <button onClick={() => startCall(true)} className="hover:text-black transition-colors"><Video size={18} /></button>
//                     </>
//                   )}
//                   <button onClick={deleteFullChat} className="hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
//                 </div>
//               </header>

//               <main className="flex-1 overflow-y-auto p-8 space-y-4">
//                 {messages.map((msg) => (
//                   <div key={msg.id} className={`flex ${msg.senderId === user.uid ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`px-4 py-2.5 rounded-2xl text-[11px] font-normal max-w-[70%] ${
//                       msg.senderId === user.uid ? 'bg-gray-100 text-gray-800 rounded-tr-none' : 'bg-white border border-gray-50 text-gray-600 rounded-tl-none'
//                     }`}>
//                       {selectedUser.isGroup && msg.senderId !== user.uid && <p className="text-[8px] font-bold text-gray-400 mb-1 uppercase">{msg.senderName}</p>}
//                       {msg.text}
//                     </div>
//                   </div>
//                 ))}
//               </main>

//               <footer className="p-6">
//                 <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-5 border border-gray-100">
//                   <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMsg()} placeholder="Type a message..." className="flex-1 bg-transparent py-4 text-[11px] outline-none" />
//                   <button onClick={sendMsg} className="text-gray-400 hover:text-black transition-colors"><Send size={18} /></button>
//                 </div>
//               </footer>
//             </>
//           ) : (
//             <div className="flex-1 flex flex-col items-center justify-center opacity-[0.03] select-none text-[100px] font-thin uppercase tracking-[0.2em]">Evoca</div>
//           )}
//         </section>
//       </div>
//       {/* Group Modal Logic remains same */}
//     </div>
//   );
// }
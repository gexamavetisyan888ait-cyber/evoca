import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faceImages = [
  "https://www.evoca.am/img/temp/biometric/face1.png",
  "https://www.evoca.am/img/temp/biometric/face2.png",
  "https://www.evoca.am/img/temp/biometric/face3.png",
];

const BiometricSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev === faceImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-24 bg-white overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">

        <div className="relative flex justify-center items-center h-[500px] md:h-[600px]">

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] -z-10 opacity-90">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M50 0L100 86.6L0 86.6L50 0Z" fill="#6610f2" />
            </svg>
          </div>

          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-[#6610f2]/30 rounded-full -z-20"
              style={{
                width: `${400 + i * 80}px`,
                height: `${400 + i * 80}px`,
              }}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360, 
                scale: [1, 1.05, 1], 
              }}
              transition={{
                duration: 15 + i * 5, 
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          <AnimatePresence mode="wait">
            <motion.img
              key={currentIdx}
              src={faceImages[currentIdx]}
              alt="Biometric Face"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute w-full max-w-[420px] object-contain z-10grayscale brightness-110 contrast-110"
              style={{ filter: 'grayscale(100%) brightness(110%) contrast(110%)' }} 
            />
          </AnimatePresence>

          <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-20 opacity-60">
            <svg viewBox="0 0 100 100" className="w-full max-w-[420px] h-auto">
              <defs>
                <mask id="faceMask">
                  <circle cx="50" cy="45" r="30" fill="white" />
                </mask>
              </defs>
              <g mask="url(#faceMask)">
                {[...Array(15)].map((_, i) => (
                  <line key={`v-${i}`} x1={i * 7} y1="10" x2={i * 7} y2="80" stroke="white" strokeWidth="0.2" />
                ))}
                {[...Array(10)].map((_, i) => (
                  <line key={`h-${i}`} x1="10" y1={20 + i * 6} x2="90" y2={20 + i * 6} stroke="white" strokeWidth="0.2" />
                ))}
                <circle cx="50" cy="40" r="0.5" fill="white" />
                <circle cx="40" cy="42" r="0.5" fill="white" />
                <circle cx="60" cy="42" r="0.5" fill="white" />
                <circle cx="50" cy="60" r="0.5" fill="white" />
              </g>
            </svg>
          </div>

          <div className="absolute w-[400px] h-[400px] bg-purple-200 rounded-full filter blur-3xl opacity-20 -z-30"></div>
        </div>

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-[900] text-[#1a1a1a] mb-8 leading-tight italic uppercase tracking-tighter">
            Դարձիր Evocabank-ի հաճախորդ <br /> բիոմետրիկ նույնականացմամբ
          </h2>
          <p className="text-gray-600 text-[16px] md:text-lg mb-12 max-w-lg leading-relaxed font-medium">
            Սկանավորի՛ր QR կոդը, ներբեռնի՛ր EvocaTOUCH հարմարավետ հավելվածը, ստեղծի՛ր քո հաշիվը և ստացի՛ր քարտը
          </p>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative p-4 bg-white border border-gray-100 rounded-2xl shadow-2xl group cursor-pointer">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://evoca.am/biometric`}
                alt="QR Code"
                className="w-[140px] h-[140px]"
              />
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#6610f2] rounded-full border-4 border-white shadow-lg"></div>
            </div>

            <button className="bg-[#6610f2] text-white px-12 py-4 rounded-full font-black text-lg hover:bg-[#520dc2] transition-all transform hover:scale-105 shadow-xl shadow-purple-200 italic uppercase">
              Իմանալ ավելին
            </button>
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full h-[300px] -z-10 bg-gradient-to-t from-[#6610f2]/05 to-transparent">
        <svg width="100%" height="100%" viewBox="0 0 1440 300" fill="none" preserveAspectRatio="none">
          <path d="M0 300H1440V100C1000 200 600 0 0 100V300Z" fill="#6610f2" fillOpacity="0.03" />
        </svg>
      </div>

    </section>
  );
};

export default BiometricSection;
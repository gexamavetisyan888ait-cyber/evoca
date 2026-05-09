import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const faceImages = [
  "https://www.evoca.am/img/temp/biometric/face1.png",
  "https://www.evoca.am/img/temp/biometric/face2.png",
  "https://www.evoca.am/img/temp/biometric/face3.png",
];

const BiometricSection = () => {
  const { t } = useTranslation();
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev === faceImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-20 bg-white overflow-hidden relative font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">

        {/* --- Ձախ հատված. Բիոմետրիկ Անիմացիա --- */}
        <div className="relative flex justify-center items-center h-[500px] md:h-[600px]">
          
          {/* Շրջված Եռանկյուն (Սուր անկյունը ներքև) */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] -z-10"
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
              <path d="M0 15 L100 15 L50 95 Z" fill="#6610f2" />
            </svg>
          </motion.div>

          {/* Պտտվող դեկորատիվ շրջանակներ */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-purple-200/30 rounded-full -z-20"
              style={{ width: `${400 + i * 100}px`, height: `${400 + i * 100}px` }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* Դեմքերի սեկցիա */}
          <div className="relative w-[320px] h-[420px] flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIdx}
                src={faceImages[currentIdx]}
                alt="Biometric"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute w-full h-full object-contain z-10"
              />
            </AnimatePresence>

            {/* Սկանավորող Կետային Ցանց (Dots Grid) */}
            <div className="absolute inset-0 z-20 mix-blend-overlay opacity-50">
              <svg width="100%" height="100%">
                <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dotPattern)" />
              </svg>
            </div>

            {/* Շարժվող Սկաներ (Laser Line) */}
            <motion.div 
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent z-30"
              animate={{ top: ["20%", "80%", "20%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* --- Աջ հատված. Տեքստ և QR --- */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-6 leading-[1.1] italic uppercase tracking-tight">
            {t('biometric.title_part1')} <br /> 
            <span className="text-[#6610f2]">{t('biometric.title_part2')}</span>
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-md font-medium">
            {t('biometric.description')}
          </p>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* QR Code */}
            <div className="bg-white p-4 rounded-3xl shadow-[0_20px_50px_rgba(102,16,242,0.15)] border border-gray-50">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://evoca.am/biometric&color=6610f2`}
                alt="QR"
                className="w-[140px] h-[140px]"
              />
            </div>

            <button className="bg-[#6610f2] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-purple-200 hover:shadow-2xl transition-all uppercase italic">
              {t('biometric.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiometricSection;
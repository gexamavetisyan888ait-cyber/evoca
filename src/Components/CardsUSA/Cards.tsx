import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Firebase ներմուծումներ
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

interface OfferType {
  category: string;
  title: string;
  desc: string;
}

const BestOffers: React.FC = () => {
  const [offers, setOffers] = useState<OfferType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Միանում ենք Firebase-ի 'cardUSA' ճյուղին
    const offersRef = ref(db, 'cardUSA');
    
    const unsubscribe = onValue(offersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Եթե տվյալները Firebase-ում պահված են որպես օբյեկտ, դարձնում ենք զանգված
        const offersList = Array.isArray(data) ? data : Object.values(data);
        setOffers(offersList as OfferType[]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="w-full min-h-screen py-20 bg-[#6610f2] relative overflow-hidden flex items-center font-sans">
      
      {/* --- Background Geometric Decorations --- */}
      
      {/* Dot Pattern */}
      <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] opacity-20 z-0">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <defs>
            <pattern id="dotPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#dotPattern)" />
        </svg>
      </div>

      {/* Blue Triangle */}
      <motion.div 
        animate={{ rotate: [0, 10, 0], y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-32 right-[15%] text-[#4bebfd] text-7xl z-0 opacity-40"
      >
        ▲
      </motion.div>
      
      {/* Yellow Triangle */}
      <motion.div 
        animate={{ rotate: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute bottom-40 right-[8%] text-[#ffcc00] text-7xl z-0 opacity-50"
      >
        ▲
      </motion.div>

      {/* --- Main Content --- */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          {/* --- Left Side: Statue and Text --- */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-[380px] flex items-center justify-center" 
            >
              
              {/* --- Golden Rings (VOSKEGUYN CEPER) --- */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[2px] border-dashed border-[#ffcc00] rounded-full opacity-60"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 md:inset-16 border-[1.5px] border-[#ffcc00]/40 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ 
                      rotate: { duration: 22, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                    className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#ffcc00] rounded-full shadow-[0_0_15px_#ffcc00] z-20"
                  />
                </div>
              </div>

              <img 
                src="https://www.gannett-cdn.com/experiments/usatoday/responsive/2016/10/liberty-graphic/assets/img/liberty.png" 
                alt="Evoca Statue" 
                className="w-full h-auto relative z-20 object-contain drop-shadow-3xl grayscale brightness-110" 
              />
              
              <h2 className="absolute top-[28%] left-[60%] whitespace-nowrap text-white text-[28px] md:text-[48px] font-[1000] italic uppercase leading-[0.85] tracking-tighter z-30 drop-shadow-lg">
                <br /> Evocabank
              </h2>
            </motion.div>
          </div>

          {/* Right Side: Cards from Firebase */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-30">
            {!loading ? offers.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.03,
                  y: -5,
                  boxShadow: "0px 30px 60px rgba(0,0,0,0.25)"
                }}
                className="bg-white rounded-[2.8rem] p-10 flex flex-col justify-center transition-all cursor-pointer group border border-white/5 shadow-xl min-h-[220px]"
              >
                <div className="mb-4">
                  <span className="text-[#6610f2] text-[10px] font-black uppercase tracking-[0.2em] bg-[#f1edff] px-4 py-1.5 rounded-full">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-[23px] font-[1000] text-[#1a1a1a] mb-4 group-hover:text-[#6610f2] transition-colors leading-tight italic uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            )) : (
              // Loading Skeleton
              [1, 2, 3, 4].map(n => (
                <div key={n} className="bg-white/10 rounded-[2.8rem] h-[220px] animate-pulse border border-white/10" />
              ))
            )}
          </div>

        </div>
      </div>

      {/* --- Background Bottom Shape --- */}
      <div className="absolute inset-x-0 bottom-0 z-0 opacity-10">
        <svg width="100%" height="250" viewBox="0 0 1440 250" fill="none" preserveAspectRatio="none">
          <path d="M0 250H1440V120.5C1440 120.5 1300 180.5 720 180.5C140 180.5 0 0 0 0V250Z" fill="white"/>
        </svg>
      </div>
      
    </section>
  );
};

export default BestOffers;
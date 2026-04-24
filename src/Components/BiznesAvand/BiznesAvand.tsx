import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Firebase ներմուծումներ
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; // Համոզվիր, որ սա քո firebase config-ի ճիշտ հասցեն է

interface HeroCard {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

const HeroSection: React.FC = () => {
  const [cards, setCards] = useState<HeroCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Միանում ենք Firebase-ի 'hero_cards' ճյուղին
    const cardsRef = ref(db, 'hero_cards');
    
    const unsubscribe = onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Տվյալների վերափոխում զանգվածի
        const formattedData: HeroCard[] = Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }));
        setCards(formattedData);
      }
      setLoading(false);
    });

    // Clean-up function
    return () => unsubscribe();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* Hero Banner */}
      <div className="relative w-full h-[650px] lg:h-[800px] bg-[#e9e9e9] overflow-hidden">
        <img 
          src="https://www.evoca.am/images-cache/news/1/17367544923272/780x585.png" 
          className="w-full h-full object-cover object-center scale-105"
          alt="Evoca Background"
        />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/5 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-[55px] md:text-[85px] lg:text-[110px] font-[900] italic uppercase leading-[0.8] tracking-[-0.05em]"
          >
            Պարզ, արագ, <br /> ժամանակակից
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white text-lg md:text-2xl font-bold uppercase italic mt-8 tracking-tight"
          >
            Քո թվային բանկը
          </motion.p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative -mt-24 lg:-mt-40 z-20 max-w-[1450px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Բեռնման էֆեկտ (Skeleton լուծում)
            [1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-[50px] p-10 h-[520px] animate-pulse border border-gray-100" />
            ))
          ) : (
            cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7 }}
                className="group relative bg-white rounded-[50px] p-10 h-[520px] flex flex-col shadow-[0_15px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_70px_rgba(102,16,242,0.1)] transition-all duration-500 cursor-pointer overflow-hidden border border-gray-50"
              >
                <div className="mb-4">
                  <span className="text-[#6610f2] text-[11px] font-[900] uppercase tracking-[0.2em] block mb-2">
                    {card.category}
                  </span>
                  <h2 className="text-[40px] font-[900] italic uppercase text-[#1a1a1a] leading-[0.9] tracking-tighter mb-4">
                    {card.title}
                  </h2>
                  <p className="text-gray-400 text-[14px] font-medium leading-relaxed max-w-[240px]">
                    {card.description}
                  </p>
                </div>

                <div className="flex-grow flex items-center justify-center py-6">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="max-w-[80%] max-h-[190px] object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="mt-auto pt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f3ebff] flex items-center justify-center group-hover:bg-[#6610f2] transition-all duration-300">
                    <svg 
                      width="24" height="24" viewBox="0 0 24 24" fill="none" 
                      className="text-[#6610f2] group-hover:text-white transition-colors"
                    >
                      <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  <div className="flex-1 h-[2px] bg-gray-100 relative overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-[#6610f2] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,900;1,900&display=swap');
        .font-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default HeroSection;
import React, { useState, useEffect } from 'react';

// --- Firebase Imports ---
import { db } from '../../lib/firebase'; // Ստուգիր հասցեն ըստ քո ֆայլային կառուցվածքի
import { ref, onValue } from 'firebase/database';
// ------------------------

interface CardType {
  id: number;
  name: string;
  title: string;
  thumb: string;
  mainImg: string;
}

const CardSlider: React.FC = () => {
  const [cardsData, setCardsData] = useState<CardType[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const visibleCount = 3; 

  // Տվյալների ստացում Firebase-ից
  useEffect(() => {
    const cardsRef = ref(db, 'cardslide'); // Ենթադրվում է 'cards' node-ը Firebase-ում
    const unsubscribe = onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Եթե տվյալները պահված են որպես List կամ Object
        const formattedData = Array.isArray(data) ? data : Object.values(data);
        setCardsData(formattedData as CardType[]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const nextSlide = () => {
    if (startIndex + visibleCount < cardsData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleCards = cardsData.slice(startIndex, startIndex + visibleCount);

  // Loading state
  if (loading || cardsData.length === 0) {
    return (
      <div className="w-full py-20 bg-white flex justify-center items-center">
        <div className="animate-pulse text-[#6610f2] font-black italic uppercase">Բեռնվում է...</div>
      </div>
    );
  }

  return (
    <section className="w-full py-20 bg-white select-none">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-12 items-center gap-8">
        
        {/* Left Thumbnails Slider */}
        <div className="col-span-12 md:col-span-3 flex md:flex-col items-center justify-center space-x-4 md:space-x-0 md:space-y-4">
          
          <button 
            onClick={prevSlide}
            disabled={startIndex === 0}
            className={`transition-colors p-2 ${startIndex === 0 ? "text-gray-100" : "text-gray-400 hover:text-[#6610f2]"}`}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="rotate-90 md:rotate-0"><path d="M18 15l-6-6-6 6"/></svg>
          </button>

          <div className="flex md:flex-col gap-4 transition-all duration-500">
            {visibleCards.map((card) => {
              const globalIndex = cardsData.findIndex(c => c.id === card.id);
              return (
                <div 
                  key={card.id}
                  onClick={() => setActiveTab(globalIndex)}
                  className={`cursor-pointer transition-all duration-300 flex flex-col items-center p-2 rounded-xl ${
                    activeTab === globalIndex ? "opacity-100 scale-105 bg-gray-50 shadow-sm" : "opacity-40 scale-95 hover:opacity-70"
                  }`}
                >
                  <img src={card.thumb} alt={card.name} className="w-24 md:w-32 h-auto rounded-md shadow-sm" />
                  <span className="text-[10px] font-bold mt-2 text-gray-500 uppercase tracking-tighter">{card.name}</span>
                </div>
              );
            })}
          </div>

          <button 
            onClick={nextSlide}
            disabled={startIndex + visibleCount >= cardsData.length}
            className={`transition-colors p-2 ${startIndex + visibleCount >= cardsData.length ? "text-gray-100" : "text-gray-400 hover:text-[#6610f2]"}`}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="rotate-90 md:rotate-0"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </div>

        {/* Center Main Card Image */}
        <div className="col-span-12 md:col-span-6 flex justify-center items-center relative h-[300px] md:h-[400px]">
          <div className="absolute inset-0 bg-[#6610f2] rounded-full filter blur-[120px] opacity-10 -z-10"></div>
          <img 
            key={activeTab}
            src={cardsData[activeTab].mainImg} 
            alt="Main Card" 
            className="w-full max-w-[480px] object-contain animate-cardSwap"
          />
        </div>

        {/* Right Info Section */}
        <div className="col-span-12 md:col-span-3 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-8 italic uppercase leading-none tracking-tighter">
            {cardsData[activeTab].title}
          </h2>
          <button className="bg-[#6610f2] text-white px-10 py-4 rounded-full font-black italic uppercase hover:bg-[#520dc2] transition-all shadow-xl active:scale-95 tracking-wide">
            Պատվիրել
          </button>
        </div>

      </div>

      <style>{`
        @keyframes cardSwap {
          0% { opacity: 0; transform: translateX(30px) rotate(5deg); }
          100% { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        .animate-cardSwap {
          animation: cardSwap 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </section>
  );
};

export default CardSlider;
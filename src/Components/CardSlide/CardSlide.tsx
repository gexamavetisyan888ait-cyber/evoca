import React, { useState } from 'react';

const cardsData = [
  { id: 1, name: "Visa Business", title: "Evoca Travel Card", thumb: "https://www.evoca.am/images-cache/cards/1/17479817930565/415x261.jpg", mainImg: "https://www.evoca.am/images-cache/cards/1/17479817930565/415x261.jpg" },
  { id: 2, name: "Evoca Gift", title: "Evoca Gift Card", thumb: "https://www.evoca.am/images-cache/cards/1/17149865646885/415x261.png", mainImg: "https://www.evoca.am/images-cache/cards/1/17149865646885/415x261.png" },
  { id: 3, name: "Digital Gift", title: "Digital Gift Card 1", thumb: "https://www.evoca.am/images-cache/cards/1/17282986912132/415x261.png", mainImg: "https://www.evoca.am/images-cache/cards/1/17282986912132/415x261.png" },
  { id: 4, name: "Digital Gift 2", title: "Digital Gift Card 2", thumb: "https://www.evoca.am/images-cache/cards/1/1772717001933/415x261.png", mainImg: "https://www.evoca.am/images-cache/cards/1/1772717001933/415x261.png" },
  { id: 5, name: "Digital Gift 3", title: "Digital Gift Card 3", thumb: "https://www.evoca.am/images-cache/cards/1/17527569508235/415x261.png", mainImg: "https://www.evoca.am/images-cache/cards/1/17527569508235/415x261.png" },
  { id: 6, name: "Digital Gift 4", title: "Digital Gift Card 4", thumb: "https://www.evoca.am/images-cache/cards/1/17655348192361/415x261.png", mainImg: "https://www.evoca.am/images-cache/cards/1/17655348192361/415x261.png" }
];

const CardSlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3; 

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

  return (
    <section className="w-full py-20 bg-white select-none">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-12 items-center gap-8">
        
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

        <div className="col-span-12 md:col-span-6 flex justify-center items-center relative h-[300px] md:h-[400px]">
          <div className="absolute inset-0 bg-[#6610f2] rounded-full filter blur-[120px] opacity-10 -z-10"></div>
          <img 
            key={activeTab}
            src={cardsData[activeTab].mainImg} 
            alt="Main Card" 
            className="w-full max-w-[480px] object-contain animate-cardSwap"
          />
        </div>

        <div className="col-span-12 md:col-span-3 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-8 italic uppercase leading-none">
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
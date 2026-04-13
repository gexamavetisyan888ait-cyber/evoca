import React, { useState } from 'react';

const cardsData = [
  {
    id: 1,
    name: "Visa Business",
    title: "Evoca Travel Card",
    thumb: "https://www.evoca.am/images-cache/cards/1/17479817930565/415x261.jpg",
    mainImg: "https://www.evoca.am/images-cache/cards/1/17479817930565/415x261.jpg", // Փոխիր իրական հղումով
  },
  {
    id: 2,
    name: "Evoca Gift Card",
    title: "Evoca Gift Card",
    thumb: "https://www.evoca.am/images-cache/cards/1/17149864970842/415x261.png",
    mainImg: "https://www.evoca.am/images-cache/cards/1/17149864970842/415x261.png",
  },
  {
    id: 3,
    name: "Digital Gift Card",
    title: "Digital Gift Card",
    thumb: "https://www.evoca.am/images-cache/cards/1/17282986912132/415x261.png",
    mainImg: "https://www.evoca.am/images-cache/cards/1/17282986912132/415x261.png",
  },
  {
    id: 4,
    name: "Digital Gift Card",
    title: "Digital Gift Card",
    thumb: "https://www.evoca.am/images-cache/cards/1/17282986912132/415x261.png",
    mainImg: "https://www.evoca.am/images-cache/cards/1/17282986912132/415x261.png",
  },  {
    id: 5,
    name: "Digital Gift Card",
    title: "Digital Gift Card",
    thumb: "https://www.evoca.am/images-cache/cards/1/17282986912132/415x261.png",
    mainImg: "https://www.evoca.am/images-cache/cards/1/17282986912132/415x261.png",
  },  {
    id: 6,
    name: "Digital Gift Card",
    title: "Digital Gift Card",
    thumb: "https://www.evoca.am/images-cache/cards/1/17282986912132/415x261.png",
    mainImg: "https://www.evoca.am/images-cache/cards/1/17282986912132/415x261.png",
  }
];

const CardSlider: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-12 items-center gap-8">
        
        {/* Ձախ կողմի ուղղահայաց մենյուն (Thumbs) */}
        <div className="col-span-12 md:col-span-3 flex md:flex-col items-center justify-center space-x-4 md:space-x-0 md:space-y-6">
          <button className="text-gray-300 hover:text-[#6610f2] transition-colors hidden md:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 15l-6-6-6 6"/></svg>
          </button>

          {cardsData.map((card, index) => (
            <div 
              key={card.id}
              onClick={() => setActiveTab(index)}
              className={`cursor-pointer transition-all duration-300 flex flex-col items-center ${
                activeTab === index ? "opacity-100 scale-110" : "opacity-40 scale-90 hover:opacity-70"
              }`}
            >
              <img src={card.thumb} alt={card.name} className="w-24 h-auto shadow-sm rounded-md" />
              <span className="text-[10px] font-bold mt-2 text-gray-500 uppercase">{card.name}</span>
            </div>
          ))}

          <button className="text-gray-300 hover:text-[#6610f2] transition-colors hidden md:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </div>

        {/* Կենտրոնի Մեծ նկարը */}
        <div className="col-span-12 md:col-span-6 flex justify-center items-center relative h-[350px]">
          <div className="absolute inset-0 bg-gray-50 rounded-full filter blur-[100px] opacity-20 -z-10"></div>
          <img 
            key={activeTab} // Սա թույլ է տալիս, որ նկարը վերանկարվի ու անիմացիան աշխատի
            src={cardsData[activeTab].mainImg} 
            alt="Main Card" 
            className="w-full max-w-[450px] object-contain animate-fadeIn"
          />
        </div>

        {/* Աջ կողմի Տեքստը և Կոճակը */}
        <div className="col-span-12 md:col-span-3 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-6">
            {cardsData[activeTab].title}
          </h2>
          <button className="bg-[#6610f2] text-white px-8 py-3 rounded-full font-bold hover:bg-[#520dc2] transition-all shadow-lg active:scale-95">
            Պատվիրել օնլայն
          </button>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default CardSlider;
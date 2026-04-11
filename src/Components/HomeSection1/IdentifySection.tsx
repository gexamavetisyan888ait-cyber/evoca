import React, { useState, useEffect } from 'react';

// 1. Ավելացրու ինչքան նկար ուզում ես այս զանգվածի մեջ
const images = [
  "https://www.evoca.am/img/temp/biometric/face1.png",
  "https://www.evoca.am/img/temp/biometric/face2.png",
  "https://www.evoca.am/img/temp/biometric/face3.png",
];

const IdentifySection: React.FC = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // 2. Կոդը ավտոմատ կհաշվի զանգվածի երկարությունը (length)
      setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-20 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        
        <div className="relative flex justify-center items-center h-[400px] md:h-[500px]">
          {images.map((img, index) => (
            <img 
              key={index}
              // 3. ԿԱՐԵՎՈՐ: src-ն պետք է լինի հենց փոփոխականը (img)
              src={img} 
              alt={`Identify Face ${index}`} 
              className={`absolute w-full max-w-[450px] object-contain transition-opacity duration-1000 ease-in-out ${
                index === currentImg ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute w-[300px] h-[300px] bg-purple-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        </div>

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-6 leading-tight">
            Դարձիր Evocabank-ի հաճախորդ <br /> դիմագծերի նույնականացմամբ
          </h2>
          <p className="text-gray-500 text-lg mb-10 max-w-lg">
            Սկանավորիր QR կոդը, ներբեռնիր EvocaTOUCH համակարգը հաշված վայրկյանների ընթացքում, ստեղծիր քո հաշիվը և ստացիր քարտը
          </p>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative p-3 bg-white border border-gray-100 rounded-2xl shadow-xl">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://evoca.am" 
                alt="QR Code" 
                className="w-[130px] h-[130px]"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#6610f2] rounded-full border-4 border-white"></div>
            </div>
            
            <button className="bg-[#6610f2] text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-[#520dc2] transition-all transform hover:scale-105 shadow-lg shadow-purple-200">
              Բեռնել հավելվածը
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default IdentifySection;
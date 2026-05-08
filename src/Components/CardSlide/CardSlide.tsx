import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 
import { ChevronUp, ChevronDown } from 'lucide-react';

import 'swiper/css';

interface CardType {
  id: number | string;
  name: string;
  title: string;
  thumb: string;
  mainImg: string;
}

const EvocaCardSlider: React.FC = () => {
  const [cardsData, setCardsData] = useState<CardType[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cardsRef = ref(db, 'cardslide'); 
    const unsubscribe = onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Array.isArray(data) 
          ? data 
          : Object.keys(data).map(key => ({ ...data[key], firebaseId: key }));
        setCardsData(formattedData as CardType[]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading || cardsData.length === 0) return null;

  return (
    <section className="w-full py-24 bg-white select-none overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-12 items-center">
        
        {/* --- Ձախ սյունակ (Vertical Swiper) --- */}
        <div className="col-span-3 flex flex-col items-center h-[400px] relative">
          <button className="evoca-prev mb-2 text-[#9b51e0] cursor-pointer hover:opacity-70 transition-opacity">
            <ChevronUp size={24} />
          </button>

          <div className="w-full h-full relative overflow-visible">
            <Swiper
              direction={'vertical'}
              slidesPerView={3}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 2000, // Ամեն 2 վայրկյանը մեկ թերթվում է
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: '.evoca-prev',
                nextEl: '.evoca-next',
              }}
              modules={[Navigation, Autoplay]}
              className="evocaSwiper w-full h-full !overflow-visible"
              onSlideChange={(swiper) => setActiveTab(swiper.realIndex)}
            >
              {cardsData.map((card, index) => (
                <SwiperSlide key={card.id} className="!flex items-center justify-center">
                  <div 
                    onClick={() => setActiveTab(index)}
                    className={`w-full max-w-[180px] cursor-pointer transition-all duration-500 flex flex-col items-center ${
                      activeTab === index 
                      ? "opacity-100 scale-110" 
                      : "opacity-40 scale-90 grayscale"
                    }`}
                  >
                    <div className={`p-1 rounded-[15px] border-2 ${activeTab === index ? "border-[#9b51e0]" : "border-transparent"}`}>
                       <img src={card.thumb} alt="" className="w-full h-auto rounded-[12px]" />
                    </div>
                    <p className={`text-[11px] mt-2 font-medium text-center ${activeTab === index ? "text-black" : "text-gray-400"}`}>
                      {card.name}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button className="evoca-next mt-2 text-[#9b51e0] cursor-pointer hover:opacity-70 transition-opacity">
            <ChevronDown size={24} />
          </button>
        </div>

        {/* --- Կենտրոն (Մեծ քարտը) --- */}
        <div className="col-span-6 flex justify-center items-center h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <img 
                src={cardsData[activeTab].mainImg} 
                className="w-full max-w-[480px] h-auto object-contain drop-shadow-sm" 
                alt=""
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Աջ կողմ (Տեքստ) --- */}
        <div className="col-span-3 pl-8 flex flex-col justify-center items-start">
          <motion.h2 
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[34px] font-bold text-[#1a1a1a] mb-6 leading-tight"
          >
            {cardsData[activeTab].title}
          </motion.h2>
          <button className="bg-[#6610f2] text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-[#520dc2] transition-colors shadow-md">
            Պատվիրել օնլայն
          </button>
        </div>

      </div>

      <style>{`
        .evocaSwiper {
          overflow: visible !important;
        }
        .evocaSwiper .swiper-wrapper {
          height: 100% !important;
        }
        .evocaSwiper .swiper-slide {
          height: 33.33% !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};

export default EvocaCardSlider;
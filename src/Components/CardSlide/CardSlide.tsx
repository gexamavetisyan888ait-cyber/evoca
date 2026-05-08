import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Mousewheel } from 'swiper/modules';
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 
import { ChevronUp, ChevronDown } from 'lucide-react';

// Swiper Styles
interface CardType {
  id: number | string;
  name: string;
  title: string;
  thumb: string;
  mainImg: string;
}

const CardSlider: React.FC = () => {
  const [cardsData, setCardsData] = useState<CardType[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<any>(null);

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

  if (loading || cardsData.length === 0) {
    return (
      <div className="w-full py-20 bg-white flex justify-center items-center">
        <div className="animate-pulse text-[#6610f2] font-black italic uppercase tracking-widest">
          ԲԵՌՆՎՈՒՄ Է...
        </div>
      </div>
    );
  }

  return (
    <section className="w-full py-20 bg-white select-none overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
        
        {/* --- Thumbnails Sidebar (Ձախ կողմ) --- */}
        <div className="col-span-12 lg:col-span-3 flex flex-col items-center relative h-[400px] md:h-[500px]">
          
          {/* Սլաք Վերև */}
          <button className="thumb-prev mb-2 text-gray-300 hover:text-[#6610f2] transition-colors cursor-pointer z-20">
            <ChevronUp size={45} strokeWidth={3} />
          </button>

          <Swiper
            direction={'vertical'}
            slidesPerView={3} // Միաժամանակ ցուցադրվում է 3 քարտ
            spaceBetween={15}
            loop={cardsData.length > 3}
            navigation={{
              prevEl: '.thumb-prev',
              nextEl: '.thumb-next',
            }}
            modules={[Navigation, FreeMode, Mousewheel]}
            className="w-full h-full vertical-swiper"
            onSlideChange={(swiper) => setActiveTab(swiper.realIndex)}
          >
            {cardsData.map((card, index) => (
              <SwiperSlide key={card.id} className="flex justify-center items-center">
                <div 
                  onClick={() => setActiveTab(index)}
                  className={`w-full cursor-pointer transition-all duration-500 flex flex-col items-center p-3 rounded-2xl border-2 ${
                    activeTab === index 
                    ? "bg-gray-50 border-[#6610f2] shadow-md scale-105" 
                    : "border-transparent opacity-40 grayscale hover:opacity-100"
                  }`}
                >
                  <img 
                    src={card.thumb} 
                    alt={card.name} 
                    className="w-[80%] h-auto rounded-lg shadow-sm" 
                  />
                  <span className={`text-[10px] font-black mt-2 uppercase italic ${
                    activeTab === index ? "text-[#6610f2]" : "text-gray-400"
                  }`}>
                    {card.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Սլաք Ներքև */}
          <button className="thumb-next mt-2 text-gray-300 hover:text-[#6610f2] transition-colors cursor-pointer z-20">
            <ChevronDown size={45} strokeWidth={3} />
          </button>
        </div>

        {/* --- Կենտրոնական Մաս (Մեծ նկար) --- */}
        <div className="col-span-12 lg:col-span-6 flex justify-center items-center relative h-[350px] md:h-[450px]">
          <div className="absolute w-[250px] h-[250px] bg-[#6610f2] rounded-full filter blur-[100px] opacity-5 -z-10"></div>
          
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeTab}
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              src={cardsData[activeTab].mainImg} 
              alt={cardsData[activeTab].title} 
              className="w-full max-w-[450px] object-contain drop-shadow-2xl"
            />
          </AnimatePresence>
        </div>

        {/* --- Աջ կողմ (Տեքստ) --- */}
        <div className="col-span-12 lg:col-span-3 text-center lg:text-left">
          <motion.h2 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[36px] md:text-[50px] font-[1000] text-[#1a1a1a] mb-8 italic uppercase leading-[0.95] tracking-tighter"
          >
            {cardsData[activeTab].title}
          </motion.h2>
          <button className="bg-[#6610f2] text-white px-12 py-4 rounded-full font-black italic uppercase hover:bg-[#520dc2] transition-all shadow-lg active:scale-95 text-xs tracking-widest">
            Պատվիրել
          </button>
        </div>

      </div>

      <style>{`
        .vertical-swiper {
          padding: 5px 0;
        }
        .vertical-swiper .swiper-slide {
          height: 33.33% !important; /* Սա ապահովում է, որ միշտ 3 հատ երևա */
        }
      `}</style>
    </section>
  );
};

export default CardSlider;
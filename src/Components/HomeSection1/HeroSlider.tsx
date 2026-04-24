import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

// Firebase imports
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface SlideItem {
  id?: string;
  title: string;
  description: string;
  buttonText: string;
  bg: string;
  textColor: string;
  img: string;
}

const HeroSlider: React.FC = () => {
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slidesRef = ref(db, 'hero_slides');
    const unsubscribe = onValue(slidesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSlides(Object.values(data));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[550px] md:h-[650px] bg-[#f8f9fb] flex justify-center items-center font-black text-[#6610f2] uppercase italic">
        Evoca is Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade" 
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ 
          clickable: true,
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            <div className={`w-full h-full flex items-center transition-all duration-700 ${slide.bg}`}>
              <div className="max-w-[1240px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="z-10 order-2 md:order-1 mt-6 md:mt-0"
                >
                  <h1 className={`text-[38px] md:text-[68px] font-[1000] italic uppercase leading-[1] mb-6 tracking-tighter ${slide.textColor}`}>
                    {slide.title}
                  </h1>
                  <p className={`text-[16px] md:text-[20px] mb-10 opacity-80 max-w-md font-medium italic leading-relaxed ${slide.textColor}`}>
                    {slide.description}
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#6610f2] text-white px-12 py-5 rounded-full font-black text-[12px] uppercase tracking-[0.2em] shadow-2xl shadow-[#6610f2]/30 hover:bg-[#520dc2] transition-all"
                  >
                    {slide.buttonText}
                  </motion.button>
                </motion.div>

                {/* Image Content */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="order-1 md:order-2 flex justify-center items-center h-full relative"
                >
                  <img 
                    src={slide.img} 
                    alt={slide.title} 
                    className="max-h-[300px] md:max-h-[500px] w-auto object-contain drop-shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] animate-float" 
                  />
                </motion.div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <button className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-[#6610f2] transition-all opacity-0 group-hover:opacity-40 hover:!opacity-100 hidden xl:block">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-[#6610f2] transition-all opacity-0 group-hover:opacity-40 hover:!opacity-100 hidden xl:block">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(180 12 12)"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
        
        .swiper-pagination {
          bottom: 40px !important;
          display: flex;
          justify-content: center;
          gap: 12px;
        }
        .swiper-pagination-bullet {
          width: 35px;
          height: 3px;
          background: #ccc !important;
          border-radius: 0;
          opacity: 0.3;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          margin: 0 !important;
        }
        .swiper-pagination-bullet-active {
          background: #6610f2 !important;
          width: 70px;
          opacity: 1;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .relative { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default HeroSlider;
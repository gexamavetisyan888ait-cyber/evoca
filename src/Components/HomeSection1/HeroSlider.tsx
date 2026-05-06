import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { useTranslation } from 'react-i18next';



// --- Firebase Imports ---
import { db } from '../../lib/firebase';
import { ref, onValue } from 'firebase/database';

interface SlideItem {
  title: string;
  description: string;
  buttonText: string;
  bg: string;
  textColor: string;
  img: string;
}

const HeroSlider: React.FC = () => {
  const { t } = useTranslation();
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slidesRef = ref(db, 'heroslider');
    const unsubscribe = onValue(slidesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Array.isArray(data) ? data : Object.values(data);
        setSlides(formattedData as SlideItem[]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="w-full h-[550px] md:h-[650px] bg-gray-50 flex items-center justify-center font-bold text-[#6610f2]">
      {t('common.loading')}
    </div>;
  }

  return (
    <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-white">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }} // Սա թույլ չի տալիս նկարներին իրար վրա մնալ
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ 
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          }
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="overflow-hidden">
            <div className={`w-full h-full flex items-center transition-colors duration-500 ${slide.bg}`}>
              <div className="max-w-[1240px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                
                <div className="z-10 order-2 md:order-1 mt-6 md:mt-0">
                  <h1 className={`text-[40px] md:text-[64px] font-[900] italic uppercase leading-[1.1] mb-6 tracking-tighter ${slide.textColor}`}>
                    {slide.title}
                  </h1>
                  <p className={`text-[16px] md:text-[18px] mb-10 opacity-90 max-w-md font-medium leading-relaxed ${slide.textColor}`}>
                    {slide.description}
                  </p>
                  <button className="bg-[#6610f2] text-white px-10 py-4 rounded-full font-black text-[13px] uppercase tracking-widest hover:bg-[#520dc2] transition-all shadow-xl active:scale-95">
                    {slide.buttonText}
                  </button>
                </div>

                <div className="order-1 md:order-2 flex justify-center items-center h-full relative">
                  <img 
                    src={slide.img} 
                    alt={slide.title} 
                    className="max-h-[320px] md:max-h-[480px] w-auto object-contain drop-shadow-2xl animate-float" 
                  />
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-prev-custom absolute left-8 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-[#6610f2] transition-all opacity-30 hover:opacity-100 hidden xl:block">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="swiper-button-next-custom absolute right-8 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-[#6610f2] transition-all opacity-30 hover:opacity-100 hidden xl:block">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" transform="rotate(180 12 12)"/></svg>
      </button>

      <style>{`
        .swiper-fade .swiper-slide {
          pointer-events: none;
          transition-property: opacity;
        }
        .swiper-fade .swiper-slide-active {
          pointer-events: auto;
        }
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #ccc;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active { 
          background: #6610f2 !important; 
          width: 60px !important; 
          border-radius: 10px;
          opacity: 1; 
        }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default HeroSlider;
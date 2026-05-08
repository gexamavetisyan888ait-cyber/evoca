import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCreative, Parallax } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

// Firebase imports
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
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-[#6610f2] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[550px] md:h-[700px] bg-white group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCreative, Parallax]}
        effect={'creative'}
        speed={1000}
        parallax={true}
        watchSlidesProgress={true}
        grabCursor={true}
        creativeEffect={{
          prev: {
            translate: ['-20%', 0, -1],
            opacity: 0,
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        navigation={{
          nextEl: '.btn-next',
          prevEl: '.btn-prev',
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="overflow-hidden flex items-center">
            <div className={`w-full h-full flex items-center ${slide.bg} transition-colors duration-700`}>
              <div className="max-w-[1280px] mx-auto w-full px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                
                {/* Text Content */}
                <div className="z-20 order-2 md:order-1">
                  <div className="overflow-hidden">
                    <h1 
                      data-swiper-parallax="-500"
                      className={`hero-title text-[38px] md:text-[70px] font-[950] uppercase italic leading-[1.1] tracking-tighter ${slide.textColor}`}
                    >
                      {slide.title}
                    </h1>
                  </div>
                  
                  <div className="overflow-hidden mt-4">
                    <p 
                      data-swiper-parallax="-300"
                      className={`hero-desc text-[16px] md:text-[19px] opacity-80 max-w-lg font-medium leading-relaxed ${slide.textColor}`}
                    >
                      {slide.description}
                    </p>
                  </div>

                  <div className="mt-10" data-swiper-parallax="-100">
                    <button className="bg-[#6610f2] text-white px-10 py-4 rounded-full font-bold text-[14px] uppercase tracking-[2px] hover:bg-black hover:scale-105 transition-all duration-300 shadow-xl active:scale-95">
                      {slide.buttonText}
                    </button>
                  </div>
                </div>

                {/* Image Content */}
                <div 
                  className="order-1 md:order-2 flex justify-center items-center relative"
                  data-swiper-parallax="400"
                >
                  <img 
                    src={slide.img} 
                    alt={slide.title} 
                    className="max-h-[300px] md:max-h-[500px] w-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)] animate-float-img" 
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- Custom Navigation Controls --- */}
      <div className="absolute inset-y-0 left-4 right-4 md:left-10 md:right-10 flex items-center justify-between z-30 pointer-events-none">
        {/* Left Arrow (<) */}
        <button className="btn-prev pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-[#6610f2] hover:border-[#6610f2] transition-all duration-300 group/btn shadow-lg cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Right Arrow (>) */}
        <button className="btn-next pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-[#6610f2] hover:border-[#6610f2] transition-all duration-300 group/btn shadow-lg cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* --- Custom Pagination --- */}
      <div className="custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3"></div>

      <style>{`
        .swiper-slide-active .hero-title {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.6, 0.2, 1) forwards;
        }
        .swiper-slide-active .hero-desc {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.6, 0.2, 1) 0.2s forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float-img {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-img { animation: float-img 5s ease-in-out infinite; }

        .swiper-pagination-bullet {
          width: 12px;
          height: 6px;
          border-radius: 10px;
          background: #000;
          opacity: 0.2;
          transition: all 0.4s ease;
          cursor: pointer;
        }
        .swiper-pagination-bullet-active {
          width: 40px;
          background: #6610f2 !important;
          opacity: 1;
        }

        .swiper-slide {
          opacity: 0 !important;
          transition: opacity 0.5s ease-in-out;
          pointer-events: none;
        }
        .swiper-slide-active {
          opacity: 1 !important;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    title: "Evoca Travel Card",
    description: "Այս քարտին իր բազմաթիվ առավելություններով կդառնա քո ճամփորդության անբաժան մասնիկը",
    buttonText: "Իմանալ ավելին",
    bg: "bg-[#f3f4f6]",
    img: "https://www.evoca.am/images-cache/sliders/1/17480089224912/4012c7541d8db15b5666bb0e4f4bdf7a-576x486.png" // Ogtagortsvats e real nkar
  },
  {
    title: "Կարճ հեռախոսահամար՝ 8444",
    description: "Բարի գալուստ, Evocabank: Մենք սպասում ենք Ձեր զանգին...",
    buttonText: "Իմանալ ավելին",
    bg: "bg-[#1a1a1a]",
    textColor: "text-white",
    img: "https://www.evoca.am/images-cache/sliders/1/17740137222872/7152cafab4609e8483a365f79ecf04cb-577x486.png"
  }
];

const HeroSlider: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`w-full h-full flex items-center px-6 md:px-20 ${slide.bg} ${slide.textColor || 'text-black'}`}>
              <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                <div className="z-10 order-2 md:order-1">
                  <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{slide.title}</h1>
                  <p className="text-lg md:text-xl mb-10 opacity-80 max-w-md">{slide.description}</p>
                  <button className="bg-[#6610f2] text-white px-10 py-4 rounded-full font-bold hover:bg-[#520dc2] transition-all shadow-lg">
                    {slide.buttonText}
                  </button>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                  <img src={slide.img} alt={slide.title} className="max-h-[300px] md:max-h-[450px] object-contain" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-[#6610f2] transition-colors hidden md:block">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-[#6610f2] transition-colors hidden md:block">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <style>{`
        .swiper-pagination-bullet-active { background: #6610f2 !important; }
        .swiper-pagination-bullet { width: 10px; height: 10px; margin: 0 6px !important; }
      `}</style>
    </div>
  );
};

export default HeroSlider;
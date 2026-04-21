import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    title: "Evoca Travel Card",
    description: "Այս քարտն իր բազմաթիվ առավելություններով կդառնա քո ճամփորդության անբաժան մասնիկը",
    buttonText: "Իմանալ ավելին",
    bg: "bg-[#f2f4f7]", // Բաց մոխրագույն
    textColor: "text-[#1a1a1a]",
    img: "https://www.evoca.am/images-cache/sliders/1/17612202124044/b74e87ec0e83aa10cb128d41f0ada026-577x486.png"
  },
  {
    title: "Առցանց ապառիկ 0%",
    description: "Գնիր հիմա, վճարիր հետո: Ձևակերպիր առցանց ապառիկ վայրկյանների ընթացքում 0% կանխավճարով:",
    buttonText: "Իմանալ ավելին",
    bg: "bg-[#1a1a1a]", // Սև ֆոն
    textColor: "text-white",
    img: "https://www.evoca.am/images-cache/sliders/1/17740137222872/7152cafab4609e8483a365f79ecf04cb-577x486.png"
  },
  {
    title: "Անհատական պահատուփեր",
    description: "Քո արժեքավոր իրերի պահպանման ամենաապահով տարբերակը Evocabank-ում:",
    buttonText: "Իմանալ ավելին",
    bg: "bg-[#f8f9fb]", 
    textColor: "text-[#1a1a1a]",
    img: "https://www.evoca.am/images-cache/sliders/1/16856146843579/345dd727d7ee28e2cd6ec180e5d65740-577x486.jpg"
  },
  {
    title: "Visa Infinite",
    description: "Բացառիկ արտոնություններ և անհատական սպասարկում ամբողջ աշխարհում:",
    buttonText: "Պատվիրել քարտ",
    bg: "bg-[#0f0f0f]", 
    textColor: "text-white",
    img: "https://www.evoca.am/images-cache/sliders/1/17480089224912/4012c7541d8db15b5666bb0e4f4bdf7a-576x486.png"
  },
  {
    title: "Evoca Gift Card",
    description: "Լավագույն նվերը նրանց համար, ում սիրում եք: Նվիրիր ընտրության հնարավորություն:",
    buttonText: "Իմանալ ավելին",
    bg: "bg-[#e8ebf0]", 
    textColor: "text-[#1a1a1a]",
    img: "https://www.evoca.am/images-cache/sliders/1/16178037539626/79381d3e68fdf7ec25c5837a19ce5821-577x486.jpg"
  },
  {
    title: "Auto Loan",
    description: "Ձեռք բեր քո երազանքի մեքենան շահավետ պայմաններով և արագ ձևակերպմամբ:",
    buttonText: "Դիմել հիմա",
    bg: "bg-[#1d1d1b]", 
    textColor: "text-white",
    img: "https://www.evoca.am/images-cache/sliders/1/17262130779724/2fee1054871280f57daf5204f901c563-577x486.png"
  }
];

const HeroSlider: React.FC = () => {
  return (
    <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade" // Ավելի սիրուն անցումների համար
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
          <SwiperSlide key={index}>
            <div className={`w-full h-full flex items-center transition-colors duration-500 ${slide.bg}`}>
              <div className="max-w-[1240px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                
                {/* Տեքստային հատված */}
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

                {/* Նկարի հատված */}
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

      {/* Սլաքներ */}
      <button className="swiper-button-prev-custom absolute left-8 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-[#6610f2] transition-all opacity-30 hover:opacity-100 hidden xl:block">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="swiper-button-next-custom absolute right-8 top-1/2 -translate-y-1/2 z-20 text-gray-400 hover:text-[#6610f2] transition-all opacity-30 hover:opacity-100 hidden xl:block">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" transform="rotate(180 12 12)"/></svg>
      </button>

      <style>{`
        /* Ինդիկատորների ոճը */
        .swiper-pagination {
          bottom: 30px !important;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        .swiper-pagination-bullet {
          width: 40px;
          height: 3px;
          background: #ccc !important;
          border-radius: 2px;
          opacity: 0.5;
          transition: all 0.3s ease;
          margin: 0 !important;
        }
        .swiper-pagination-bullet-active {
          background: #6610f2 !important;
          width: 60px;
          opacity: 1;
        }

        /* Նկարի թեթև շարժման անիմացիա */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
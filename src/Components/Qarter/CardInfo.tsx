import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { QARTER_DATA } from './CardsPage'; 

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CardInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const card = useMemo(() => {
    return QARTER_DATA.find((item) => item.id === Number(id));
  }, [id]);

  const otherCards = useMemo(() => {
    return QARTER_DATA.filter((item) => item.id !== Number(id));
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!card) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-white font-sans">
        <p className="text-2xl font-black text-gray-200 uppercase italic">Քարտը չի գտնվել</p>
        <button 
          onClick={() => navigate('/cards')} 
          className="mt-6 text-[#6610f2] font-black underline uppercase italic"
        >
          Հետ գնալ քարտերի բաժին
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="bg-[#6610f2] h-[50px] md:h-[60px] flex items-center shadow-lg">
        <div className="max-w-[1200px] mx-auto w-full px-4">
          <span className="text-white font-black text-[10px] uppercase tracking-[0.4em] truncate block">
            Քարտեր / {card.name}
          </span>
        </div>
      </div>

      <div className="bg-[#f8f9fb]">
        <div className="max-w-[1200px] mx-auto px-4 pt-12 md:pt-20 pb-12 md:pb-16 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-[34px] md:text-[54px] font-black mb-6 md:mb-8 italic uppercase leading-none">
              {card.name}
            </h1>
            <p className="text-gray-500 text-base md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
              {card.description}
            </p>
            <button className="mt-8 md:mt-12 bg-[#6610f2] text-white px-12 md:px-14 py-4 md:py-5 rounded-full font-black text-xs uppercase shadow-xl hover:bg-[#520dc2] transition-all transform hover:-translate-y-1">
              Պատվիրել առցանց
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img 
              src={card.image} 
              alt={card.name} 
              className="w-full max-w-[320px] md:max-w-[480px] drop-shadow-2xl" 
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mt-16 md:mt-24">
        <h2 className="text-2xl md:text-3xl font-black uppercase italic mb-8 md:mb-12">Այլ քարտեր</h2>
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1.2}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500 }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="pb-16"
        >
          {otherCards.map((item) => (
            <SwiperSlide key={item.id}>
              <div 
                onClick={() => navigate(`/card/${item.id}`)}
                className="group cursor-pointer bg-white p-6 md:p-10 rounded-[35px] md:rounded-[45px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all flex flex-col items-center text-center h-full"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full max-w-[160px] md:max-w-[200px] mb-6 transform group-hover:scale-110 transition-transform" 
                />
                <h3 className="text-lg md:text-xl font-black italic mb-2 uppercase group-hover:text-[#6610f2]">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-button-next, .swiper-button-prev { color: #6610f2 !important; transform: scale(0.5); }
        @media (min-width: 768px) { .swiper-button-next, .swiper-button-prev { transform: scale(0.6); } }
        .swiper-pagination-bullet-active { background: #6610f2 !important; }
      `}</style>
    </div>
  );
};

export default CardInfo;
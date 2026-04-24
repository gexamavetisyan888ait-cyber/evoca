import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, CreditCard, ShieldCheck, 
  Zap, ArrowRight, Globe, RefreshCw 
} from 'lucide-react';

// Firebase-ի համար
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 
interface CardDataType {
    id: number;
    name: string;
    description: string;
    image: string;
    filters: FilterType[];
    cashback?: string;
    perks?: { label: string; value: string }[];
}


export type FilterType = 'բոլորը' | 'premium' | 'նվեր քարտեր' | 'թվային քարտեր' | 'arca' | 'visa' | 'mastercard' | 'unionpay';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const CardInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [allCards, setAllCards] = useState<CardDataType[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Բեռնում ենք բոլոր քարտերը Firebase-ից
  useEffect(() => {
    const cardsRef = ref(db, 'cards');
    const unsubscribe = onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cardsList = Array.isArray(data) ? data : Object.values(data);
        setAllCards(cardsList as CardDataType[]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Գտնում ենք ընթացիկ քարտը
  const card = useMemo(() => {
    return allCards.find((item) => item.id === Number(id));
  }, [id, allCards]);

  // 3. Առանձնացնում ենք մնացած քարտերը slider-ի համար
  const otherCards = useMemo(() => {
    return allCards.filter((item) => item.id !== Number(id));
  }, [id, allCards]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <RefreshCw className="animate-spin text-[#6610f2] mb-4" size={40} />
        <p className="font-bold uppercase text-gray-400 italic">Բեռնվում է...</p>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
        <p className="text-2xl font-black text-gray-300 uppercase italic">Քարտը չի գտնվել</p>
        <Link to="/cards" className="mt-6 text-[#6610f2] font-bold underline">Հետ դեպի քարտեր</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans pb-20 overflow-x-hidden">
      {/* Մնացած JSX կոդը նույնն է... */}
      <div className="bg-[#6610f2] h-[50px] md:h-[60px] flex items-center shadow-lg sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center gap-4">
          <button onClick={() => navigate('/cards')} className="text-white/70 hover:text-white">
            <ChevronLeft size={20} />
          </button>
          <span className="text-white font-black text-[10px] uppercase tracking-[0.4em]">
            Քարտեր / {card.name}
          </span>
        </div>
      </div>

      {/* Hero, Perks և Swiper բաժինները մնում են անփոփոխ */}
      {/* ... */}
      
      <div className="max-w-[1200px] mx-auto px-6 mt-20 md:mt-32">
        <h2 className="text-[30px] md:text-[40px] font-black uppercase italic mb-10">Այլ քարտեր</h2>
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1.2}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4000 }}
          className="pb-20"
        >
          {otherCards.map((item) => (
            <SwiperSlide key={item.id}>
              <div 
                onClick={() => navigate(`/card/${item.id}`)}
                className="cursor-pointer bg-[#f8f9fb] p-8 rounded-[50px] text-center group hover:bg-white hover:shadow-2xl transition-all"
              >
                <img src={item.image} alt={item.name} className="w-full max-w-[200px] mx-auto mb-6 group-hover:scale-105 transition-transform" />
                <h3 className="font-black italic uppercase group-hover:text-[#6610f2]">{item.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CardInfo;
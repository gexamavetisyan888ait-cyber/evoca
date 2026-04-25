import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, CreditCard, ShieldCheck, 
  Zap, ArrowRight, Globe, RefreshCw, Loader2 
} from 'lucide-react';

// Firebase
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

export type FilterType = 'բոլորը' | 'premium' | 'նվեր քարտեր' | 'թվային քարտեր' | 'arca' | 'visa' | 'mastercard' | 'unionpay';

export interface CardDataType {
    id: number;
    name: string;
    description: string;
    image: string;
    filters: FilterType[];
    cashback?: string;
    perks?: { label: string; value: string }[];
}

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [allCards, setAllCards] = useState<CardDataType[]>([]);
  const [card, setCard] = useState<CardDataType | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Բեռնում ենք բոլոր քարտերը Firebase-ից (սլայդերի և ընթացիկ քարտի համար)
  useEffect(() => {
    const cardsRef = ref(db, 'qarter'); // Ստուգիր, որ Firebase-ում հասցեն 'qarter' է
    const unsubscribe = onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cardsList = Array.isArray(data) ? data : Object.values(data);
        setAllCards(cardsList as CardDataType[]);
        
        // Գտնում ենք կոնկրետ քարտը ըստ ID-ի
        const foundCard = (cardsList as CardDataType[]).find(item => item.id === Number(id));
        setCard(foundCard || null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  // 2. Առանձնացնում ենք մնացած քարտերը "Այլ քարտեր" սլայդերի համար
  const otherCards = useMemo(() => {
    return allCards.filter((item) => item.id !== Number(id));
  }, [id, allCards]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="animate-spin text-[#6610f2] mb-4" size={40} />
        <p className="font-black uppercase text-gray-400 italic tracking-widest">Բեռնվում է...</p>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 gap-6">
        <p className="text-2xl font-black text-gray-300 uppercase italic">Քարտը չի գտնվել</p>
        <button 
            onClick={() => navigate('/cards')} 
            className="bg-[#6610f2] text-white px-8 py-3 rounded-full font-bold uppercase italic tracking-wider shadow-lg"
        >
            Վերադառնալ քարտերին
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans pb-20 overflow-x-hidden">
      
      {/* Sticky Header */}
      <div className="bg-[#6610f2] h-[50px] md:h-[60px] flex items-center shadow-lg sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white/70 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <span className="text-white font-black text-[10px] md:text-[12px] uppercase tracking-[0.3em] truncate">
            Քարտեր / {card.name}
          </span>
        </div>
      </div>

      {/* Main Info Section */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Card Image */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#f8f9fb] rounded-[50px] p-10 md:p-20 flex items-center justify-center relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-[#6610f2]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
                src={card.image} 
                alt={card.name} 
                className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform duration-700" 
            />
        </motion.div>

        {/* Right: Content */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
        >
            <div className="space-y-4">
                <h1 className="text-[45px] md:text-[70px] font-[1000] italic uppercase leading-[0.9] tracking-tighter text-[#1a1a1a]">
                    {card.name}
                </h1>
                <div className="h-1.5 w-24 bg-[#6610f2] rounded-full" />
            </div>

            <p className="text-gray-500 text-lg md:text-xl leading-relaxed italic font-medium">
                {card.description}
            </p>

            {card.perks && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {card.perks.map((perk, i) => (
                        <div key={i} className="bg-[#f8f9fb] p-6 rounded-[30px] border border-gray-50 hover:border-[#6610f2]/30 transition-colors">
                            <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">{perk.label}</p>
                            <p className="text-xl font-[1000] italic uppercase text-[#1a1a1a]">{perk.value}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="pt-4">
                <button className="w-full md:w-auto bg-[#6610f2] text-white px-16 py-6 rounded-full font-black uppercase italic tracking-[0.1em] shadow-[0_20px_40px_rgba(102,16,242,0.3)] hover:bg-[#520dc2] hover:scale-105 active:scale-95 transition-all">
                    Պատվիրել քարտը
                </button>
            </div>
        </motion.div>
      </section>

      {/* Other Cards Slider */}
      {otherCards.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 mt-24 md:mt-40">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-[30px] md:text-[45px] font-[1000] uppercase italic tracking-tighter">
                    Այլ <span className="text-[#6610f2]">Քարտեր</span>
                </h2>
                <div className="flex gap-3">
                    <button className="other-prev p-3 rounded-full border border-gray-200 hover:bg-[#6610f2] hover:text-white transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="other-next p-3 rounded-full border border-gray-200 hover:bg-[#6610f2] hover:text-white transition-all">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1.2}
                navigation={{ prevEl: '.other-prev', nextEl: '.other-next' }}
                breakpoints={{ 
                    640: { slidesPerView: 2 }, 
                    1024: { slidesPerView: 3.5 } 
                }}
                autoplay={{ delay: 5000 }}
                className="pb-20"
            >
                {otherCards.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div 
                            onClick={() => {
                                navigate(`/card/${item.id}`);
                                window.scrollTo(0, 0);
                            }}
                            className="cursor-pointer bg-[#f8f9fb] p-10 rounded-[50px] text-center group hover:bg-white hover:shadow-[0_40px_80px_rgba(0,0,0,0.05)] transition-all duration-500 border border-transparent hover:border-gray-100"
                        >
                            <div className="h-40 flex items-center justify-center mb-8">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="max-w-full max-h-full drop-shadow-lg group-hover:scale-110 transition-transform duration-500" 
                                />
                            </div>
                            <h3 className="font-black italic uppercase text-lg group-hover:text-[#6610f2] transition-colors">
                                {item.name}
                            </h3>
                            <p className="text-gray-400 text-xs font-bold uppercase mt-2 tracking-widest">
                                {item.cashback ? `${item.cashback} Cashback` : 'Evoca Card'}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
        .font-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default CardDetail;
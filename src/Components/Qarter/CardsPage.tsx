import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, FileText, Download, ChevronLeft } from 'lucide-react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
// --- Firebase Imports ---
import { db } from '../../lib/firebase'; 
import { ref, onValue } from 'firebase/database';

export type TabType = 'qarter' | 'spasarkum' | 'social';
export type FilterType = 'բոլորը' | 'premium' | 'նվեր քարտեր' | 'թվային քարտեր' | 'arca' | 'visa' | 'mastercard' | 'unionpay';

export interface CardDataType {
  id: number;
  name: string;
  description: string;
  image: string;
  filters: FilterType[];
}

export const CardsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('qarter');
  const [activeFilter, setActiveFilter] = useState<FilterType>('բոլորը');
  const [cardsData, setCardsData] = useState<CardDataType[]>([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const cardsRef = ref(db, 'qarter'); 
    const unsubscribe = onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map(key => ({
          ...data[key],
          id: data[key].id || key
        }));
        setCardsData(formattedData);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredCards = useMemo(() => {
    if (activeFilter === 'բոլորը') return cardsData;
    return cardsData.filter(card => card.filters && card.filters.includes(activeFilter));
  }, [activeFilter, cardsData]);

  if (loading) return <div className="py-40 text-center font-black italic text-[#6610f2]">ԲԵՌՆՎՈՒՄ Է...</div>;

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1a1a1a]">
      {/* Տաբեր */}
      <div className="w-full bg-[#6610f2] sticky top-0 md:top-0 z-40 overflow-x-auto shadow-lg">
        <div className="max-w-[1200px] mx-auto flex whitespace-nowrap">
          {[
            { id: 'qarter', label: 'Քարտեր' },
            { id: 'spasarkum', label: 'Քարտերի տրամադրում և սպասարկում' },
            { id: 'social', label: 'Սոցիալական ապահովության վճարային քարտեր' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-6 py-5 text-[11px] md:text-[13px] font-bold uppercase transition-all border-b-4 ${
                activeTab === tab.id ? 'bg-[#520dc2] border-white text-white' : 'border-transparent text-white/70 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
        
        {/* 1. ՔԱՐՏԵՐ (Ձեռք չի տրված) */}
        {activeTab === 'qarter' && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-[28px] md:text-[34px] font-black uppercase mb-8 italic leading-none">Քարտեր</h1>
            <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
              {['բոլորը', 'premium', 'նվեր քարտեր', 'թվային քարտեր', 'arca', 'visa', 'mastercard', 'unionpay'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f as FilterType)}
                  className={`px-4 md:px-5 py-2 rounded-full text-[10px] md:text-[11px] font-black uppercase transition-all border ${
                    activeFilter === f ? 'bg-[#6610f2] border-[#6610f2] text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-[#6610f2]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-12 md:gap-16">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <div key={card.id} className="flex flex-col md:flex-row gap-6 md:gap-10 items-center py-6 md:py-10 border-b border-gray-100 last:border-0 group">
                    <div className="w-full md:w-1/2 overflow-hidden rounded-2xl cursor-pointer" onClick={() => navigate(`/card/${card.id}`)}>
                      <img src={card.image} alt={card.name} className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-4 md:space-y-5">
                      <h2 className="text-2xl md:text-3xl font-black italic uppercase">{card.name}</h2>
                      <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">{card.description}</p>
                      <button onClick={() => navigate(`/card/${card.id}`)} className="flex items-center gap-2 bg-[#f0f0f0] px-8 py-3 rounded-full font-black text-[12px] uppercase hover:bg-[#6610f2] hover:text-white transition-all w-fit">
                        Մանրամասն <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-gray-400 font-bold italic uppercase">Քարտեր չեն գտնվել</div>
              )}
            </div>
          </div>
        )}

        {/* 2. ՍՊԱՍԱՐԿՈՒՄ (Փաստաթղթեր) */}
        {activeTab === 'spasarkum' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-[900px] mx-auto">
            <h1 className="text-[26px] md:text-[32px] font-black uppercase mb-8 text-center">Քարտերի տրամադրում և սպասարկում</h1>
            <h3 className="text-[18px] font-black uppercase mb-6 flex items-center gap-2">
               <FileText className="text-[#6610f2]" /> Փաստաթղթեր
            </h3>
            <div className="space-y-3">
              {[
                "Կենսաթոշակային քարտեր",
                "Evoca Gift քարտեր (Տեղեկատվական ամփոփագիր)",
                "Տեղեկատվական ամփոփագիր (Բանկային հաշիվներ) 19.02.26",
                "Visa Digital քարտեր (Տեղեկատվական ամփոփագիր)",
                "«ԷՎՈԿԱԲԱՆԿ» ՓԲԸ վճարային քարտերի կիրառմամբ EvocaTouch բջջային հավելվածով թվայնացված քարտեր",
                "Visa Infinite քարտեր (Տեղեկատվական ամփոփագիր)",
                "UnionPay Business Platinum քարտեր (Տեղեկատվական ամփոփագիր)",
                "UnionPay UPI Gold քարտեր (Տեղեկատվական ամփոփագիր)",
                "Visa Vision քարտեր (Տեղեկատվական ամփոփագիր)",
                "Mastercard World Digital (Տեղեկատվական ամփոփագիր)"
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-[#f8f9fa] rounded-xl border border-transparent hover:border-purple-200 hover:bg-white hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-[#6610f2] group-hover:text-white transition-colors">
                       <FileText size={20} />
                    </div>
                    <span className="text-[13px] md:text-[14px] font-bold text-gray-700">{doc}</span>
                  </div>
                  <Download size={18} className="text-gray-400 group-hover:text-[#6610f2]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. ՍՈՑԻԱԼԱԿԱՆ (Pension Cards Hero) */}
        {activeTab === 'social' && (
          <div className="animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row items-center gap-10 mb-20 bg-purple-50 rounded-[40px] overflow-hidden p-8 md:p-0">
               <div className="w-full md:w-1/2 p-4 md:p-16 space-y-6">
                  <h1 className="text-[30px] md:text-[42px] font-black uppercase leading-tight">Սոցիալական ապահովության վճարային քարտեր</h1>
                  <p className="text-gray-600 text-[15px] md:text-[17px] leading-relaxed">
                    Կենսաթոշակառուներին առաջարկում ենք ARCA կենսաթոշակային վճարային քարտեր՝ միայն կենսաթոշակների գումարների սպասարկման նպատակով։
                  </p>
                  <button className="bg-[#6610f2] text-white px-10 py-4 rounded-full font-black uppercase text-[12px] hover:bg-[#520dc2] transition-all shadow-lg shadow-purple-200">
                    Պատվիրել քարտ
                  </button>
               </div>
               <div className="w-full md:w-1/2 h-[300px] md:h-[500px] bg-[#d6bcfa] relative">
                  <img 
                    src="https://www.evoca.am/images-cache/menu/1/17218011250749/780x585.jpg" 
                    alt="Social Card" 
                    className="absolute bottom-0 right-0 h-full w-full object-contain"
                    onError={(e) => { e.currentTarget.src = "https://resource.evoca.am/images/cards/arca-classic.png" }}
                  />
               </div>
            </div>

            <div className="max-w-[800px] mx-auto space-y-12">
               <section>
                  <h2 className="text-[22px] font-black uppercase mb-6 border-b-2 border-[#6610f2] w-fit pb-2">Վճարային քարտերով կատարվող գործառնություններ</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Կանխիկացում բանկոմատներից",
                      "Անկանխիկ վճարումներ խանութներում",
                      "Կոմունալ վճարումներ օնլայն",
                      "Քարտից քարտ փոխանցումներ",
                      "Օնլայն գնումներ",
                      "Հաշվի համալրում"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[14px] font-bold text-gray-600">
                        <div className="w-2 h-2 bg-[#6610f2] rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
               </section>

               <section className="bg-gray-50 p-8 rounded-3xl">
                  <h2 className="text-[20px] font-black uppercase mb-4 text-[#6610f2]">Օգտակար տեղեկատվություն</h2>
                  <p className="text-[14px] text-gray-500 italic">
                    * Քարտը տրամադրվում է անվճար։ <br/>
                    * Տարեկան սպասարկման վճար չի գանձվում։
                  </p>
               </section>
            </div>
          </div>
        )}

      </div>

      {/* Footer Branding (Style based on your UI preference) */}

            <div className="w-full bg-[#6610f2] py-24 relative overflow-hidden">
                <motion.div 
                    animate={{ 
                        y: [0, -40, 0],
                        rotate: [0, 10, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-[10%] text-white"
                >
                </motion.div>

                <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
                    <div className="w-full md:w-1/2 relative h-[400px]">
                        <motion.img 
                            initial={{ x: -150, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, type: "spring" }}
                            src="https://www.evoca.am/images-cache/banners/1/16170067683633/485x304.jpg"
                            className="absolute left-0 top-0 w-[80%] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl"
                        />
                        <motion.img 
                            initial={{ y: 150, opacity: 0, scale: 0.5 }}
                            whileInView={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                            src="https://www.evoca.am/images-cache/banners/1/16153622710205/140x300.jpg"
                            className="absolute right-10 bottom-0 w-[30%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20 border-4 border-[#1a1a1a] rounded-[2rem]"
                        />
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="w-full md:w-1/2 text-white text-center md:text-left mt-10 md:mt-0"
                    >
                        <h2 className="text-[36px] md:text-[48px] font-black uppercase italic mb-6 leading-tight">Օնլայն բանկինգ</h2>
                        <p className="text-white/80 mb-8 text-lg">Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է:</p>
                        <motion.button 
                            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(255,255,255,0.5)" }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white text-[#6610f2] px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest"
                        >
                            Դառնալ հաճախորդ
                        </motion.button>
                    </motion.div>
                </div>
            </div>

    </div>
  );
};

export default CardsPage;
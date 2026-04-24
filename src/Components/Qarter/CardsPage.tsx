import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// --- Firebase Imports ---
import { db } from '../../lib/firebase'; 
import { ref, onValue } from 'firebase/database';

export type TabType = 'qarter' | 'spasarkum' | 'social' | 'benefits';
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

export const CardsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('qarter');
  const [activeFilter, setActiveFilter] = useState<FilterType>('բոլորը');
  
  // Դինամիկ տվյալների state
  const [cardsData, setCardsData] = useState<CardDataType[]>([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  // Firebase-ից քարտերի ներբեռնում
  useEffect(() => {
    const cardsRef = ref(db, 'qarter'); // Համոզվիր, որ DB-ում path-ը 'cards' է
    
    const unsubscribe = onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Եթե տվյալները օբյեկտ են, դարձնում ենք զանգված
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
      <div className="w-full bg-[#6610f2] sticky top-0 md:top-20 z-40 overflow-x-auto">
        <div className="max-w-[1200px] mx-auto flex whitespace-nowrap">
          {[
            { id: 'qarter', label: 'Քարտեր' },
            { id: 'spasarkum', label: 'Սպասարկում' },
            { id: 'social', label: 'Սոցիալական' },
            { id: 'benefits', label: 'Evoca Benefits' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-6 py-4 text-[12px] font-bold uppercase transition-all border-b-4 ${activeTab === tab.id ? 'bg-[#520dc2] border-white text-white' : 'border-transparent text-white/70 hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
        {activeTab === 'qarter' && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-[28px] md:text-[34px] font-black uppercase mb-8 italic leading-none">Քարտեր</h1>

            {/* Ֆիլտրեր */}
            <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
              {['բոլորը', 'premium', 'նվեր քարտեր', 'թվային քարտեր', 'arca', 'visa', 'mastercard', 'unionpay'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f as FilterType)}
                  className={`px-4 md:px-5 py-2 rounded-full text-[10px] md:text-[11px] font-black uppercase transition-all border ${activeFilter === f ? 'bg-[#6610f2] border-[#6610f2] text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-[#6610f2]'
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Քարտերի ցուցակ */}
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
                      <button
                        onClick={() => navigate(`/card/${card.id}`)}
                        className="flex items-center gap-2 bg-[#f0f0f0] px-8 py-3 rounded-full font-black text-[12px] uppercase hover:bg-[#6610f2] hover:text-white transition-all w-fit"
                      >
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
      </div>
    </div>
  );
};

export default CardsPage;
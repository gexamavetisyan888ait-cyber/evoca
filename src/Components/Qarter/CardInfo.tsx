import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Loader2 } from 'lucide-react';
// Firebase
import { db } from '../../lib/firebase'; 
import { ref, onValue } from 'firebase/database';
export interface CardDataType {
  id: number;
  name: string;
  description: string;
  image: string;
  filters: FilterType[];
  cashback?: string;
  perks?: { label: string; value: string }[];
}
export type FilterType = 'բոլորը' | 'premium' | 'նվեր քարտեր' | 'թվային քարտեր' | 'arca' | 'visa' | 'mastercard' | 'unionpay';

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<CardDataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Միանում ենք կոնկրետ քարտի հասցեին՝ cards/id
    const cardRef = ref(db, `qarter/${id}`);
    
    const unsubscribe = onValue(cardRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCard(data);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#6610f2]" size={40} />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold italic uppercase">Քարտը չի գտնվել</p>
        <button onClick={() => navigate('/cards')} className="text-[#6610f2] underline">Վերադառնալ</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Back Button */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 font-black uppercase italic text-sm hover:text-[#6610f2] transition-colors"
        >
          <ChevronLeft size={20} /> Հետ դեպի քարտերը
        </button>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="bg-[#f8f9fb] rounded-[40px] p-10 flex items-center justify-center">
          <img src={card.image} alt={card.name} className="w-full h-auto drop-shadow-2xl" />
        </div>

        {/* Info */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-[1000] italic uppercase leading-none tracking-tighter">
            {card.name}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">{card.description}</p>
          
          {card.perks && (
            <div className="grid grid-cols-2 gap-4">
              {card.perks.map((perk, i) => (
                <div key={i} className="bg-[#f8f9fb] p-6 rounded-3xl border border-gray-50">
                  <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{perk.label}</p>
                  <p className="text-xl font-black italic uppercase text-[#1a1a1a]">{perk.value}</p>
                </div>
              ))}
            </div>
          )}

          <button className="w-full md:w-fit bg-[#6610f2] text-white px-12 py-5 rounded-full font-black uppercase italic tracking-widest shadow-xl hover:bg-[#520dc2] transition-all">
            Պատվիրել քարտը
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
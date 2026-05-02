import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Firebase ներմուծումներ
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

export interface DepositType {
  id: number | string;
  title: string;
  description: string;
  minAmount: string;
  amountLabel: string;
  rate: string;
  rateLabel: string;
  image: string;
}

const Avandner: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [deposits, setDeposits] = useState<DepositType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const depositsRef = ref(db, 'avand');
    const unsubscribe = onValue(depositsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const depositsList = Object.keys(data).map(key => ({
          ...data[key],
          id: data[key].id || key
        }));
        setDeposits(depositsList);
      } else {
        setDeposits([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6600cc]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="max-w-[1200px] mx-auto px-4 pt-16">
        <div className="flex border-b-[3px] border-[#6600cc]">
          <div className="bg-[#6600cc] text-white px-8 py-3.5 font-black text-[13px] uppercase tracking-widest rounded-t-xl">
            {t('deposits_page.title')}
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 mt-12 space-y-16">
        {deposits.length > 0 ? (
          deposits.map((item) => (
            <section key={item.id} className="flex flex-col md:flex-row items-center gap-8 lg:gap-20 border-b border-gray-100 pb-16 last:border-0">
              <div className="w-full md:w-[320px] lg:w-[415px] flex-shrink-0">
                <div className="bg-[#f8f9fb] rounded-[40px] p-8 aspect-[415/261] flex justify-center items-center overflow-hidden group cursor-pointer shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-[26px] lg:text-[32px] font-[900] text-[#1a1a1a] mb-5 leading-tight tracking-tight">
                  {item.title}
                </h2>
                <p className="text-[#6c757d] text-[16px] mb-10 leading-relaxed max-w-2xl font-medium">
                  {item.description}
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  <div className="flex flex-col">
                    <span className="text-[#adb5bd] text-[10px] uppercase font-black tracking-widest mb-2">{t('deposits_page.start_from')}</span>
                    <div className="text-[#6610f2] text-[34px] font-[900] leading-none mb-1">{item.minAmount}</div>
                    <span className="text-[#495057] text-[12px] font-bold uppercase">{item.amountLabel}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-transparent text-[10px] mb-2">.</span>
                    <div className="text-[#6610f2] text-[34px] font-[900] leading-none mb-1 tracking-tighter">{item.rate}</div>
                    <span className="text-[#495057] text-[12px] font-bold uppercase leading-tight">{item.rateLabel}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/deposit/${item.id}`)}
                  className="group flex items-center gap-4 px-10 py-4 bg-[#f4f0ff] text-[#6610f2] rounded-full font-black text-[13px] transition-all hover:bg-[#6610f2] hover:text-white uppercase tracking-widest"
                >
                  {t('deposits_page.more')}
                  <span className="text-xl leading-none transition-transform group-hover:translate-x-1.5">›</span>
                </button>
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400 font-bold uppercase italic tracking-widest">
            {t('deposits_page.no_deposits')}
          </div>
        )}
      </main>
    </div>
  );
};

export default Avandner;
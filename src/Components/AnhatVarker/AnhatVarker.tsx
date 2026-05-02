import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

export interface LoanType {
  id: number | string;
  title: string;
  description: string;
  duration: string;
  amount: string;
  rate: string;
  rateLabel: string;
  image: string;
  category: 'business' | 'consumer' | 'mortgage' | 'car';
}

const AnhatVarker: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loans, setLoans] = useState<LoanType[]>([]);
  const [activeFilter, setActiveFilter] = useState('all'); 
  const [loading, setLoading] = useState(true);

  const filters = [
    { label: t('loans_page.filters.all'), value: 'all' },
    { label: t('loans_page.filters.business'), value: 'business' },
    { label: t('loans_page.filters.consumer'), value: 'consumer' },
    { label: t('loans_page.filters.mortgage'), value: 'mortgage' },
    { label: t('loans_page.filters.car'), value: 'car' },
  ];

  useEffect(() => {
    const loansRef = ref(db, 'varker');
    const unsubscribe = onValue(loansRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loansList: LoanType[] = Array.isArray(data)
          ? data.filter(i => i !== null).map((item, index) => ({
              ...item,
              id: item.id || index,
            }))
          : Object.keys(data).map((key) => ({
              ...data[key],
              id: data[key].id || key, 
            }));
        setLoans(loansList);
      } else {
        setLoans([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase error:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredLoans = useMemo(() => {
    if (activeFilter === 'all') return loans;
    return loans.filter(loan => loan.category === activeFilter);
  }, [activeFilter, loans]);

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="max-w-[1200px] mx-auto px-4 pt-16">
        <div className="flex border-b-[3px] border-[#6610f2] mb-10">
          <div className="bg-[#6610f2] text-white px-8 py-3 font-black text-sm uppercase tracking-widest italic rounded-t-lg cursor-default">
            {t('loans_page.title')}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-16">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-7 py-3 rounded-full text-[12px] font-black uppercase tracking-widest transition-all border-2 
                ${activeFilter === f.value 
                  ? "bg-[#6610f2] border-[#6610f2] text-white shadow-xl scale-105" 
                  : "bg-white border-gray-100 text-gray-400 hover:border-[#6610f2] hover:text-[#6610f2]"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 space-y-24">
        {loading ? (
          <div className="text-center py-32">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6610f2] mx-auto mb-4"></div>
             <p className="text-gray-400 font-bold italic uppercase tracking-widest">{t('loans_page.loading')}</p>
          </div>
        ) : filteredLoans.length > 0 ? (
          filteredLoans.map((loan) => (
            <section key={loan.id} className="flex flex-col md:flex-row items-center gap-10 lg:gap-20 border-b border-gray-50 pb-20 last:border-0 group">
              <div className="w-full md:w-[350px] lg:w-[420px] flex-shrink-0">
                <div className="bg-[#f8f9fb] rounded-[50px] p-10 aspect-square flex justify-center items-center overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img src={loan.image} alt={loan.title} className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-[28px] lg:text-[38px] font-[900] italic uppercase text-[#1a1a1a] mb-6 leading-[1.1] tracking-tighter group-hover:text-[#6610f2] transition-colors">
                  {loan.title}
                </h2>
                <p className="text-gray-500 text-[17px] mb-10 leading-relaxed max-w-2xl font-medium">
                  {loan.description}
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  <div className="border-l-2 border-gray-100 pl-4">
                    <span className="text-gray-400 text-[10px] uppercase font-black block mb-2 tracking-widest">{t('loans_page.until')}</span>
                    <div className="text-[#6610f2] text-3xl font-[900] italic">{loan.duration}</div>
                    <span className="text-gray-400 text-[11px] font-bold block mt-1">{t('loans_page.term')}</span>
                  </div>
                  <div className="border-l-2 border-gray-100 pl-4">
                    <span className="text-gray-400 text-[10px] uppercase font-black block mb-2 tracking-widest">{t('loans_page.until')}</span>
                    <div className="text-[#6610f2] text-3xl font-[900] italic tracking-tight">{loan.amount}</div>
                    <span className="text-gray-400 text-[11px] font-bold block mt-1 leading-tight">{t('loans_page.limit')}</span>
                  </div>
                  <div className="col-span-2 lg:col-span-1 border-l-2 border-gray-100 pl-4">
                    <span className="text-gray-400 text-[10px] uppercase font-black block mb-2 tracking-widest">&nbsp;</span>
                    <div className="text-[#6610f2] text-3xl font-[900] italic">{loan.rate}</div>
                    <span className="text-gray-400 text-[11px] font-bold block mt-1">{loan.rateLabel}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/loan/${loan.id}`)}
                  className="inline-flex items-center gap-4 px-12 py-5 bg-[#f3ebff] text-[#6610f2] rounded-full font-[900] uppercase text-[12px] tracking-[0.2em] transition-all hover:bg-[#6610f2] hover:text-white hover:shadow-lg active:scale-95"
                >
                  {t('loans_page.more')}
                  <span className="text-xl transition-transform group-hover:translate-x-2">›</span>
                </button>
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-32">
            <h3 className="text-2xl text-gray-300 font-black italic uppercase tracking-widest">{t('loans_page.no_loans')}</h3>
            <button onClick={() => setActiveFilter('all')} className="mt-4 text-[#6610f2] font-bold underline">
              {t('loans_page.see_all')}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AnhatVarker;
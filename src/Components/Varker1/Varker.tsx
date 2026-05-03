import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next'; //

// Firebase Imports
import { db } from "../../lib/firebase";
import { ref, onValue } from "firebase/database";

export interface LoanType {
  id: number | string;
  title: string;
  description: string;
  duration: string;
  amount: string;
  rate: string;
  rateLabel: string;
  image: string;
}

const Varker: React.FC = () => {
  const { t } = useTranslation(); //
  const navigate = useNavigate();
  const [loans, setLoans] = useState<LoanType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loansRef = ref(db, 'varker');
    
    const unsubscribe = onValue(loansRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loansList: LoanType[] = Array.isArray(data)
          ? data.filter(item => item !== null)
          : Object.keys(data).map(key => ({
              ...data[key],
              id: data[key].id || key
            }));
        setLoans(loansList);
      } else {
        setLoans([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <RefreshCw className="animate-spin text-[#6600cc] mb-4" size={40} />
        <p className="font-bold uppercase text-gray-300 italic tracking-widest">{t('loans.loading')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="max-w-[1200px] mx-auto px-4 pt-16">
        <div className="flex border-b-[3px] border-[#6600cc]">
          <div className="bg-[#6600cc] text-white px-6 py-3 font-bold text-sm uppercase tracking-wide rounded-t-sm">
            {t('loans.business_loans')}
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 mt-12 space-y-16">
        {loans.length > 0 ? (
          loans.map((loan) => (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={loan.id} 
              className="flex flex-col md:flex-row items-center gap-8 lg:gap-16 border-b border-gray-100 pb-16 last:border-0"
            >
              <div className="w-full md:w-[320px] lg:w-[400px] flex-shrink-0">
                <div className="bg-[#f2f4f7] rounded-[32px] p-8 aspect-square flex justify-center items-center">
                  <img
                    src={loan.image}
                    alt={loan.title}
                    className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x400/f2f4f7/6600cc?text=Evoca+Loan'; }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-[#1a1a1a] mb-5 leading-tight">
                  {loan.title}
                </h2>
                <p className="text-gray-500 text-base mb-8 leading-relaxed max-w-2xl">
                  {loan.description}
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">{t('loans.up_to')}</span>
                    <div className="text-[#6600cc] text-3xl font-black">{loan.duration}</div>
                    <span className="text-gray-400 text-[11px] font-medium block mt-1">{t('loans.term_label')}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">{t('loans.up_to')}</span>
                    <div className="text-[#6600cc] text-3xl font-black tracking-tight">{loan.amount}</div>
                    <span className="text-gray-400 text-[11px] font-medium block mt-1 leading-tight">
                      {t('loans.limit_label')}
                    </span>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">&nbsp;</span>
                    <div className="text-[#6600cc] text-3xl font-black">{loan.rate}</div>
                    <span className="text-gray-400 text-[11px] font-medium block mt-1">{loan.rateLabel}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/loan/${loan.id}`)}
                  className="group flex items-center gap-3 px-8 py-3 bg-[#f3ebff] text-[#6600cc] rounded-full font-bold text-sm transition-all hover:bg-[#6600cc] hover:text-white"
                >
                  {t('loans.more_details')}
                  <span className="text-xl transition-transform group-hover:translate-x-1">›</span>
                </button>
              </div>
            </motion.section>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400 font-bold uppercase italic">
            {t('loans.not_found')}
          </div>
        )}
      </main>
    </div>
  );
};

export default Varker;
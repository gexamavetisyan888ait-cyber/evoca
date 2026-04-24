import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// --- Firebase Imports ---
import { db } from '../../lib/firebase'; 
import { ref, onValue } from 'firebase/database';

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

const Varker1: React.FC = () => {
  const navigate = useNavigate();
  
  // State-եր տվյալների և բեռնման կարգավիճակի համար
  const [loansData, setLoansData] = useState<LoanType[]>([]);
  const [loading, setLoading] = useState(true);

  // Տվյալների ստացում Firebase-ից
  useEffect(() => {
    const loansRef = ref(db, 'varker'); // Համոզվիր, որ Firebase-ում հանգույցի անունը 'loans' է
    
    const unsubscribe = onValue(loansRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Փոխակերպում ենք զանգվածի և զտում հնարավոր null արժեքները
        const formattedData: LoanType[] = Array.isArray(data)
          ? data.filter(item => item !== null)
          : Object.keys(data).map(key => ({
              ...data[key],
              id: data[key].id || key
            }));
        setLoansData(formattedData);
      } else {
        setLoansData([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Loading էկրան
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#6600cc]" size={40} />
        <p className="font-bold italic uppercase text-[#6600cc]">Բեռնվում է...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="max-w-[1200px] mx-auto px-4 pt-16">
        <div className="flex border-b-[3px] border-[#6600cc]">
          <div className="bg-[#6600cc] text-white px-6 py-3 font-bold text-sm uppercase tracking-wide rounded-t-sm">
            Բիզնես վարկեր
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 mt-12 space-y-16">
        {loansData.length > 0 ? (
          loansData.map((loan) => (
            <section key={loan.id} className="flex flex-col md:flex-row items-center gap-8 lg:gap-16 border-b border-gray-100 pb-16 last:border-0">
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
                    <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">Մինչև</span>
                    <div className="text-[#6600cc] text-3xl font-black">{loan.duration}</div>
                    <span className="text-gray-400 text-[11px] font-medium block mt-1">ժամկետ</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">Մինչև</span>
                    <div className="text-[#6600cc] text-3xl font-black tracking-tight">{loan.amount}</div>
                    <span className="text-gray-400 text-[11px] font-medium block mt-1 leading-tight">
                      Սահմանաչափ կամ <br /> համժեք արտարժույթ
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
                  Մանրամասն
                  <span className="text-xl transition-transform group-hover:translate-x-1">›</span>
                </button>
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400 font-bold uppercase italic">
            Վարկեր չեն գտնվել
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800;900&display=swap');
        body { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default Varker1;
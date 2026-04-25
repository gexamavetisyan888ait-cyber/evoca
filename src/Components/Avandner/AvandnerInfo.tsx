import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Loader2, Info } from 'lucide-react';
// Firebase ներմուծումներ
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

interface DepositType {
  id: number | string;
  title: string;
  description: string;
  minAmount: string;
  amountLabel: string;
  rate: string;
  rateLabel: string;
  image: string;
}

const AvandnerInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deposit, setDeposit] = useState<DepositType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Միանում ենք Firebase-ի կոնկրետ ավանդի ճյուղին
    const depositRef = ref(db, `avand/${id}`);
    
    const unsubscribe = onValue(depositRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDeposit({
          ...data,
          id: id
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb]">
        <Loader2 className="animate-spin text-[#6610f2]" size={48} />
      </div>
    );
  }

  if (!deposit) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fb]">
        <h2 className="text-xl font-bold mb-4">Ավանդը չի գտնվել</h2>
        <button onClick={() => navigate(-1)} className="text-[#6610f2] font-bold uppercase underline">Վերադառնալ</button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Վերևի հետադարձ կոճակը և վերնագիրը */}
      <div className="max-w-[1200px] mx-auto px-4 pt-10">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-400 hover:text-[#6610f2] transition-colors mb-8 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[12px] font-black uppercase tracking-widest">Վերադառնալ</span>
        </button>

        <div className="flex border-b-[3px] border-[#6610f2] mb-12">
          <div className="bg-[#6610f2] text-white px-8 py-3.5 font-black text-[13px] uppercase tracking-widest rounded-t-xl">
            Ավանդի Մանրամասներ
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Ձախ մաս - Նկարը */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#f8f9fb] rounded-[50px] p-12 aspect-square flex justify-center items-center shadow-sm">
              <img
                src={deposit.image}
                alt={deposit.title}
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Աջ մաս - Ինֆորմացիա */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-[32px] lg:text-[45px] font-[900] text-[#1a1a1a] mb-6 leading-tight tracking-tighter italic">
              {deposit.title}
            </h1>
            
            <p className="text-[#6c757d] text-lg mb-10 leading-relaxed font-medium">
              {deposit.description}
            </p>

            {/* Գլխավոր ցուցանիշները */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8 bg-[#f8f9fb] rounded-[30px] mb-10">
              <div className="flex flex-col">
                <span className="text-[#adb5bd] text-[11px] uppercase font-black tracking-widest mb-2">Նվազագույն գումար</span>
                <div className="text-[#6610f2] text-[38px] font-[900] leading-none mb-1 tracking-tighter">
                  {deposit.minAmount}
                </div>
                <span className="text-[#495057] text-[13px] font-bold uppercase">{deposit.amountLabel}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#adb5bd] text-[11px] uppercase font-black tracking-widest mb-2">Տարեկան տոկոսադրույք</span>
                <div className="text-[#6610f2] text-[38px] font-[900] leading-none mb-1 tracking-tighter">
                  {deposit.rate}
                </div>
                <span className="text-[#495057] text-[13px] font-bold uppercase leading-tight">{deposit.rateLabel}</span>
              </div>
            </div>

            {/* Լրացուցիչ պայմաններ (static բաժին Evoca ոճով) */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 border border-gray-100 rounded-2xl hover:border-purple-200 transition-colors">
                <div className="bg-purple-100 p-2 rounded-full text-[#6610f2]">
                  <Info size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase text-gray-400">Ժամկետ</p>
                  <p className="text-[14px] font-bold text-gray-800">30-ից 1095 օր</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-5 border border-gray-100 rounded-2xl hover:border-purple-200 transition-colors">
                <div className="bg-purple-100 p-2 rounded-full text-[#6610f2]">
                  <Info size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase text-gray-400">Տոկոսների վճարում</p>
                  <p className="text-[14px] font-bold text-gray-800">Ամսական կամ ժամկետի վերջում</p>
                </div>
              </div>
            </div>

            <button className="mt-12 w-full lg:w-max px-12 py-5 bg-[#6610f2] text-white rounded-full font-black text-[14px] uppercase tracking-[0.2em] shadow-xl shadow-purple-200 hover:scale-105 active:scale-95 transition-all">
              Ներդնել Ավանդ
            </button>
          </div>
        </div>
      </main>

      {/* Դեկորատիվ ֆոնային տեքստ */}
      <div className="fixed bottom-10 right-10 opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[150px] font-black italic leading-none">EVOCA</h2>
      </div>
    </div>
  );
};

export default AvandnerInfo;
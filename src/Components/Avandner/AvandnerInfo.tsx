import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deposits } from './Avandner'; 
const AvandnerInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'about' | 'terms'>('about');
  const [currency, setCurrency] = useState<'AMD' | 'USD' | 'EUR'>('AMD');

  const deposit = deposits.find((item) => item.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!deposit) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px]">
        <p className="text-xl font-bold text-gray-400">Ավանդը չի գտնվել</p>
        <button onClick={() => navigate('/deposits')} className="mt-4 text-[#6600cc] font-bold">Հետ վերադառնալ</button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="bg-[#6600cc] h-[60px] flex items-center shadow-lg">
        <div className="max-w-[1200px] mx-auto w-full px-4">
          <span className="text-white font-black text-xs uppercase tracking-[0.3em]">Ավանդներ</span>
        </div>
      </div>

      <div className="bg-[#f8f9fb] relative">
        <div className="max-w-[1200px] mx-auto px-4 pt-16 pb-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-[36px] lg:text-[48px] font-[900] text-[#1a1a1a] mb-8 leading-tight tracking-tight">
                {deposit.title}
              </h1>
              <p className="text-[#6c757d] text-[18px] leading-relaxed max-w-lg font-medium">
                {deposit.description}
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img src={deposit.image} alt={deposit.title} className="w-full max-w-[460px] h-auto object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 py-8 border-t border-gray-100 flex items-center justify-between">
           <div className="flex items-center gap-3 text-[10px] text-[#adb5bd] font-black uppercase tracking-[0.15em]">
             <Link to="/" className="hover:text-[#6600cc]">Գլխավոր</Link> 
             <span className="text-[14px]">›</span>
             <Link to="/deposits" className="hover:text-[#6600cc]">Ավանդներ</Link> 
             <span className="text-[14px]">›</span>
             <span className="text-[#6600cc]">{deposit.title}</span>
           </div>
           <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-[900] uppercase tracking-widest text-[#adb5bd] hover:text-[#6600cc]">
             ← Հետ
           </button>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3">
            <div className="flex gap-12 border-b border-gray-100 mb-10">
              <button onClick={() => setActiveTab('about')} className={`pb-5 font-black text-[13px] uppercase tracking-[0.2em] relative ${activeTab === 'about' ? 'text-[#6600cc] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[3px] after:bg-[#6600cc]' : 'text-[#dee2e6]'}`}>Նկարագրություն</button>
              <button onClick={() => setActiveTab('terms')} className={`pb-5 font-black text-[13px] uppercase tracking-[0.2em] relative ${activeTab === 'terms' ? 'text-[#6600cc] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[3px] after:bg-[#6600cc]' : 'text-[#dee2e6]'}`}>Պայմաններ</button>
            </div>
            <div className="text-[#495057] text-[17px] leading-[1.8] font-medium">
              <p className="mb-8">Evocabank-ի <span className="font-bold text-[#1a1a1a]">{deposit.title}</span>-ը լավագույն լուծումն է Ձեր խնայողությունների համար:</p>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-[45px] border border-gray-50 p-10 shadow-[0_30px_60px_rgba(102,0,204,0.1)] sticky top-10">
              <div className="flex justify-center gap-1 mb-10 bg-[#f8f9fb] p-1.5 rounded-[20px]">
                {['AMD', 'USD', 'EUR'].map((curr) => (
                  <button key={curr} onClick={() => setCurrency(curr as any)} className={`flex-1 py-3.5 rounded-[15px] text-[11px] font-[900] transition-all ${currency === curr ? 'bg-white text-[#6600cc] shadow-md' : 'text-[#adb5bd]'}`}>{curr}</button>
                ))}
              </div>
              <div className="space-y-10 mb-12">
                <div>
                  <span className="text-[10px] text-[#adb5bd] font-[900] uppercase block mb-2 tracking-widest">Սկսած</span>
                  <div className="text-[34px] font-[900] text-[#6600cc] leading-none">{deposit.minAmount}</div>
                  <span className="text-[12px] text-[#495057] font-black uppercase mt-2.5 block tracking-wide">{deposit.amountLabel}</span>
                </div>
                <div className="h-[1px] bg-[#f8f9fb]"></div>
                <div>
                  <span className="text-[10px] text-transparent block mb-2">.</span>
                  <div className="text-[34px] font-[900] text-[#6600cc] leading-none">{deposit.rate}</div>
                  <span className="text-[12px] text-[#495057] font-black uppercase mt-2.5 block tracking-wide">{deposit.rateLabel}</span>
                </div>
              </div>
              <button className="w-full bg-[#6600cc] text-white py-5 rounded-full font-[900] text-[13px] uppercase tracking-[0.2em] shadow-xl shadow-purple-100">Ներդնել առցանց</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AvandnerInfo;
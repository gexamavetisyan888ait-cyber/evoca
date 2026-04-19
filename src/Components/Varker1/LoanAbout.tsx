import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { loans } from './Varker'; 

const LoanAbout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'about' | 'terms'>('about');
  const [currency, setCurrency] = useState<'AMD' | 'USD' | 'EUR'>('AMD');

  const loan = loans.find((item) => item.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!loan) return null;

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. Purple Header Section */}
      <div className="bg-[#6600cc] h-[60px] flex items-center">
        <div className="max-w-[1200px] mx-auto w-full px-4">
          <span className="text-white font-bold text-sm uppercase tracking-wide">Բիզնես վարկեր</span>
        </div>
      </div>

      {/* 2. Hero Section with Image and Breadcrumbs */}
      <div className="bg-[#f2f4f7] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 pt-12 pb-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-1/2">
              <h1 className="text-3xl lg:text-4xl font-black text-[#1a1a1a] mb-6">
                {loan.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                {loan.description}
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img 
                src={loan.image} 
                alt={loan.title} 
                className="w-[350px] lg:w-[450px] h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Breadcrumbs Section */}
        <div className="max-w-[1200px] mx-auto px-4 py-6 border-t border-gray-200 flex items-center gap-4 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
           <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:text-[#6600cc] transition-all">
             ← Վերադառնալ
           </button>
           <div className="flex items-center gap-2">
             <Link to="/" className="hover:text-black">Բիզնես</Link> <span>›</span>
             <Link to="/varker" className="hover:text-black">Վարկեր</Link> <span>›</span>
             <span className="text-gray-300">{loan.title}</span>
           </div>
        </div>
      </div>

      {/* 3. Main Content Section */}
      <main className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Tabs and Info */}
          <div className="lg:w-2/3">
            <div className="flex gap-8 border-b border-gray-100 mb-8">
              <button 
                onClick={() => setActiveTab('about')}
                className={`pb-4 font-bold text-sm uppercase tracking-widest transition-all relative ${activeTab === 'about' ? 'text-[#6600cc] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#6600cc]' : 'text-gray-400'}`}
              >
                Վարկի մասին
              </button>
              <button 
                onClick={() => setActiveTab('terms')}
                className={`pb-4 font-bold text-sm uppercase tracking-widest transition-all relative ${activeTab === 'terms' ? 'text-[#6600cc] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#6600cc]' : 'text-gray-400'}`}
              >
                Պայմաններ
              </button>
            </div>

            <div className="prose max-w-none text-gray-700 leading-loose">
              <p className="mb-6 font-medium text-[#6600cc]">
                Evocabank-ի {loan.title}-ը այն բիզնեսների համար է, որոնք ցանկանում են արագ ներդրումներ՝ առանց ավելորդ փաստաթղթաշրջանառության։
              </p>
              <ul className="space-y-4 list-none p-0">
                {['Շրջանառու միջոցների համալրման,', 'Հիմնական միջոցների ձեռքբերման,', 'Ընթացիկ ծախսերի ֆինանսավորման'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#6600cc] rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Sticky Info Box */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-2xl shadow-gray-200/50 sticky top-10">
              {/* Currency Selector */}
              <div className="flex justify-center gap-2 mb-10 bg-gray-50 p-1.5 rounded-2xl">
                {['AMD', 'USD', 'EUR'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr as any)}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${currency === curr ? 'bg-[#6600cc] text-white' : 'text-gray-400 hover:text-black'}`}
                  >
                    {curr === 'AMD' ? '֏' : curr === 'USD' ? '$' : '€'}
                  </button>
                ))}
              </div>

              {/* Specs */}
              <div className="space-y-8 mb-10">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Մինչև</span>
                  <div className="text-2xl font-black text-[#6600cc]">{loan.duration}</div>
                  <span className="text-xs text-gray-400 font-medium">Ժամկետ</span>
                </div>
                <div className="h-[1px] bg-gray-100"></div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Մինչև</span>
                  <div className="text-2xl font-black text-[#6600cc]">{loan.amount}</div>
                  <span className="text-xs text-gray-400 font-medium">Սահմանաչափ</span>
                </div>
                <div className="h-[1px] bg-gray-100"></div>
                <div>
                  <div className="text-2xl font-black text-[#6600cc]">{loan.rate}</div>
                  <span className="text-xs text-gray-400 font-medium">Տարեկան տոկոսադրույք</span>
                </div>
              </div>

              <button className="w-full bg-[#6600cc] text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#5500aa] transition-all shadow-lg shadow-purple-100 mb-4">
                Դիմել առցանց
              </button>
              <button className="w-full border-2 border-gray-50 py-4 rounded-2xl font-bold text-sm text-gray-600 uppercase tracking-widest hover:border-[#6600cc] hover:text-[#6600cc] transition-all">
                Պատվիրել զանգ
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoanAbout;
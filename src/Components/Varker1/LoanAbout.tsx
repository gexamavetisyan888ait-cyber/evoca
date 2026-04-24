import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, RefreshCw, Phone, CheckCircle2 } from 'lucide-react';

// Firebase Imports
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 
export interface LoanType {
  id: number;
  title: string;
  description: string;
  duration: string;
  amount: string;
  rate: string;
  rateLabel: string;
  image: string;
}

const LoanAbout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'about' | 'terms'>('about');
  const [currency, setCurrency] = useState<'AMD' | 'USD' | 'EUR'>('AMD');
  const [allLoans, setAllLoans] = useState<LoanType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loansRef = ref(db, 'loans');
    const unsubscribe = onValue(loansRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Array.isArray(data) ? data : Object.values(data);
        setAllLoans(list as LoanType[]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loan = useMemo(() => {
    return allLoans.find((item) => item.id === Number(id));
  }, [id, allLoans]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <RefreshCw className="animate-spin text-[#6600cc]" size={40} />
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <p className="text-gray-400 font-bold uppercase italic mb-4">Վարկը չի գտնվել</p>
        <Link to="/varker" className="text-[#6600cc] underline">Վերադառնալ ցուցակին</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Header */}
      <div className="bg-[#6600cc] h-[60px] flex items-center sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto w-full px-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <span className="text-white font-bold text-sm uppercase tracking-wide truncate">
            Բիզնես վարկեր / {loan.title}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#f2f4f7] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 pt-12 pb-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <h1 className="text-3xl lg:text-5xl font-black text-[#1a1a1a] mb-6 leading-[1.1]">
                {loan.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg italic">
                {loan.description}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-1/2 flex justify-center"
            >
              <img 
                src={loan.image} 
                alt={loan.title} 
                className="w-full max-w-[450px] h-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
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

            <div className="text-gray-700 leading-loose">
              <p className="mb-6 font-bold text-[#6600cc] italic text-xl">
                Ինչու՞ ընտրել Evocabank-ի այս վարկատեսակը
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'Արագ որոշման կայացում',
                  'Նվազագույն փաստաթղթեր',
                  'Անհատական մոտեցում',
                  'Ճկուն մարման գրաֆիկ'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                    <CheckCircle2 className="text-[#6600cc]" size={20} />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-2xl shadow-purple-900/5 sticky top-24">
              <div className="flex justify-center gap-2 mb-10 bg-gray-50 p-1.5 rounded-2xl">
                {['AMD', 'USD', 'EUR'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr as any)}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${currency === curr ? 'bg-[#6600cc] text-white' : 'text-gray-400'}`}
                  >
                    {curr === 'AMD' ? '֏' : curr === 'USD' ? '$' : '€'}
                  </button>
                ))}
              </div>

              <div className="space-y-8 mb-10">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Ժամկետ</span>
                  <div className="text-2xl font-black text-[#6600cc]">{loan.duration}</div>
                </div>
                <div className="h-[1px] bg-gray-100"></div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Սահմանաչափ</span>
                  <div className="text-2xl font-black text-[#6600cc]">{loan.amount}</div>
                </div>
                <div className="h-[1px] bg-gray-100"></div>
                <div>
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Տոկոսադրույք</span>
                  <div className="text-2xl font-black text-[#6600cc]">{loan.rate}</div>
                  <span className="text-[10px] text-gray-400 font-medium uppercase">{loan.rateLabel}</span>
                </div>
              </div>

              <button className="w-full bg-[#6600cc] text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-purple-200 mb-4">
                Դիմել հիմա
              </button>
              <button className="w-full border-2 border-gray-100 py-4 rounded-2xl font-bold text-sm text-gray-500 uppercase tracking-widest hover:border-[#6600cc] hover:text-[#6600cc] transition-all flex items-center justify-center gap-2">
                <Phone size={16} /> Պատվիրել զանգ
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoanAbout;
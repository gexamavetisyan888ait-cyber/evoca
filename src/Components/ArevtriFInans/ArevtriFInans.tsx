import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; // Համոզվիր, որ սա քո firebase ֆայլի ճիշտ հասցեն է
import HomeCards from '../../Components/HomeCards/HomeCards';

// Տվյալների տիպը (Type definition)
interface TradeTab {
  id: string;
  title: string;
  description: string;
  sub_title?: string;
  use_cases?: string[];
  highlight?: string;
  advantages?: string[];
  types?: string[];
  extra_info?: string;
}

const TradeFinancing: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<TradeTab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ենթադրում ենք, որ բազայում տվյալները պահված են 'trade_financing' ճյուղի տակ
    const tradeRef = ref(db, 'tabs');
    
    const unsubscribe = onValue(tradeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Վերածում ենք օբյեկտը զանգվածի
        const formattedData: TradeTab[] = Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }));
        setTabs(formattedData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Ֆունկցիա, որը դինամիկ գեներացնում է բովանդակությունը ըստ Firebase-ի դաշտերի
  const renderContent = (tab: TradeTab) => {
    return (
      <div className="space-y-6">
        <p>{tab.description}</p>

        {/* Use Cases (Երաշխիքի համար) */}
        {tab.use_cases && (
          <>
            <p className="font-bold text-[#1a1a1a] italic uppercase text-sm">{tab.sub_title}</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tab.use_cases.map((item, i) => (
                <li key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-2xl text-gray-600 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#6610f2]" />
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Highlight (Ֆակտորինգի համար) */}
        {tab.highlight && (
          <div className="bg-[#f8f9fb] p-6 rounded-[30px] border-l-4 border-[#6610f2]">
            <p className="italic font-medium text-gray-700">{tab.highlight}</p>
          </div>
        )}

        {/* Advantages & Types (Ակրեդիտիվի համար) */}
        {(tab.advantages || tab.types) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {tab.advantages && (
              <div className="p-5 bg-[#f8f9fb] rounded-[30px] border border-gray-100">
                <h5 className="font-black text-[#1a1a1a] mb-2 uppercase italic text-sm">Առավելությունները</h5>
                <ul className="text-sm text-gray-500 space-y-2">
                  {tab.advantages.map((adv, i) => <li key={i}>• {adv}</li>)}
                </ul>
              </div>
            )}
            {tab.types && (
              <div className="p-5 bg-[#f3ebff] rounded-[30px] border border-purple-50">
                <h5 className="font-black text-[#6610f2] mb-2 uppercase italic text-sm">Տեսակները</h5>
                <p className="text-sm text-[#6610f2] font-medium">{tab.types.join(', ')}:</p>
              </div>
            )}
          </div>
        )}

        {/* Extra Info (Ինկասոյի համար) */}
        {tab.extra_info && <p>{tab.extra_info}</p>}
      </div>
    );
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#6610f2]"></div>
    </div>
  );

  if (tabs.length === 0) return null;

  return (
    <div className="w-full bg-white font-sans py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6">
        
        <div className="mb-14">
          <motion.span className="text-[#6610f2] text-[11px] font-[900] uppercase tracking-[0.25em]">Բիզնես</motion.span>
          <motion.h2 className="text-[40px] md:text-[65px] font-[900] italic uppercase text-[#1a1a1a] tracking-tighter leading-none mt-3">
            Առևտրի ֆինանսավորում
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-20">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[400px] flex flex-col">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`group relative text-left py-7 px-8 border-b border-gray-100 transition-all duration-300 ${
                  activeTab === index ? "bg-[#f8f9fb]" : "hover:bg-gray-50"
                }`}
              >
                {activeTab === index && (
                  <motion.div layoutId="activeBorder" className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#6610f2]" />
                )}
                <span className={`text-[12px] font-black uppercase block mb-2 ${activeTab === index ? "text-[#6610f2]" : "text-gray-300"}`}>
                  0{index + 1}
                </span>
                <span className={`text-xl md:text-2xl font-[900] italic uppercase tracking-tighter ${activeTab === index ? "text-[#1a1a1a]" : "text-gray-400 group-hover:text-gray-600"}`}>
                  {tab.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
                className="text-[#4d4d4d] text-lg leading-[1.7] font-medium"
              >
                <h3 className="text-3xl md:text-4xl font-[900] italic uppercase text-[#1a1a1a] mb-10 tracking-tighter">
                  {tabs[activeTab]?.title}
                </h3>
                <div className="max-w-[750px]">
                  {tabs[activeTab] && renderContent(tabs[activeTab])}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full pt-10">
          <HomeCards />
        </div>

      </div>
    
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,900;1,900&display=swap');
        .font-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default TradeFinancing;
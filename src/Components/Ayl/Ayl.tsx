import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Firebase ներմուծումներ
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

// Տիպերի սահմանում (TypeScript interface)
interface ServiceTab {
  id: string;
  title: string;
  description: string;
  image: string;
  sub_title?: string;
  services?: { id: string; name: string }[];
  pricing_table?: {
    columns: string[];
    rows: { size: string; duration: string; price: string }[];
  };
  extra_cards?: {
    title: string;
    text: string;
    theme: 'purple' | 'gray';
  }[];
}

const OtherServicesTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<ServiceTab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Տվյալների ստացում 'other_services' ճյուղից
    const servicesRef = ref(db, 'other_services');
    
    const unsubscribe = onValue(servicesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Եթե տվյալները Firebase-ում պահված են որպես օբյեկտների զանգված
        const formattedData: ServiceTab[] = Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }));
        setTabs(formattedData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Ֆունկցիա, որը գեներացնում է բովանդակությունը ըստ տվյալների կառուցվածքի
  const renderTabContent = (tab: ServiceTab) => {
    return (
      <div className="space-y-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            {tab.sub_title && (
              <h3 className="text-2xl font-black italic uppercase text-[#1a1a1a] mb-4">
                {tab.sub_title}
              </h3>
            )}
            <p className="text-[#4d4d4d] text-lg leading-relaxed">
              {tab.description}
            </p>
          </div>
          <div className="w-full lg:w-[450px] h-[300px] rounded-[40px] overflow-hidden shadow-lg">
             <img src={tab.image} className="w-full h-full object-cover" alt={tab.title} />
          </div>
        </div>

        {/* 01. Եթե կան ծառայության քառակուսի բլոկներ (Remote Banking) */}
        {tab.services && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tab.services.map((s, i) => (
              <div key={i} className="p-8 bg-[#f8f9fb] rounded-[30px] border border-gray-50 flex flex-col justify-between h-[180px]">
                <span className="text-[11px] font-black text-[#6610f2] uppercase">{s.id}</span>
                <h4 className="text-xl font-black italic uppercase text-[#1a1a1a]">{s.name}</h4>
              </div>
            ))}
          </div>
        )}

        {/* 02. Եթե կա աղյուսակ (Պահատուփեր) */}
        {tab.pricing_table && (
          <div className="overflow-hidden rounded-[30px] border border-gray-100 max-w-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fb]">
                  {tab.pricing_table.columns.map((col, i) => (
                    <th key={i} className="p-5 text-[12px] font-black uppercase text-gray-400 italic">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[#1a1a1a] font-bold text-sm">
                {tab.pricing_table.rows.map((row, i) => (
                  <tr key={i} className="border-t border-gray-50">
                    <td className="p-5">{row.size}</td>
                    <td className="p-5">{row.duration}</td>
                    <td className="p-5 text-[#6610f2]">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 03. Եթե կան գունավոր քարտեր (Այլ ծառայություններ) */}
        {tab.extra_cards && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tab.extra_cards.map((card, i) => (
              <div key={i} className={`p-10 rounded-[40px] border ${
                card.theme === 'purple' ? 'bg-[#f3ebff] border-purple-50' : 'bg-[#f8f9fb] border-gray-100'
              }`}>
                <h4 className={`text-xl font-[1000] italic uppercase mb-3 ${
                  card.theme === 'purple' ? 'text-[#6610f2]' : 'text-[#1a1a1a]'
                }`}>{card.title}</h4>
                <p className={`text-sm font-medium tracking-tight ${
                  card.theme === 'purple' ? 'text-purple-900/60' : 'text-gray-400'
                }`}>{card.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return (
    <div className="py-32 text-center text-[#6610f2] font-black">Բեռնվում է...</div>
  );

  return (
    <div className="w-full bg-white font-sans py-20 lg:py-32 overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6">
        
        <div className="mb-16">
          <motion.span className="text-[#6610f2] text-[11px] font-[900] uppercase tracking-[0.3em] block mb-4">Լրացուցիչ</motion.span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[400px] flex flex-col">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`group relative text-left py-8 px-8 border-b border-gray-100 transition-all duration-300 ${
                  activeTab === index ? "bg-[#f8f9fb]" : "hover:bg-gray-50"
                }`}
              >
                {activeTab === index && (
                  <motion.div layoutId="activeInd" className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#6610f2]" />
                )}
                <span className={`text-[12px] font-black uppercase block mb-2 ${activeTab === index ? "text-[#6610f2]" : "text-gray-300"}`}>
                  0{index + 1}
                </span>
                <span className={`text-xl md:text-2xl font-[900] italic uppercase tracking-tighter leading-tight ${activeTab === index ? "text-[#1a1a1a]" : "text-gray-400 group-hover:text-gray-600"}`}>
                  {tab.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content Panel */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl md:text-4xl font-[1000] italic uppercase text-[#1a1a1a] mb-12 tracking-tighter">
                  {tabs[activeTab]?.title}
                </h3>
                {tabs[activeTab] && renderTabContent(tabs[activeTab])}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="w-full bg-[#6610f2] py-24 relative overflow-hidden mt-20">
          <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
              <div className="w-full md:w-1/2 relative h-[400px]">
                  <motion.img 
                      initial={{ x: -150, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1, type: "spring" }}
                      src="https://www.evoca.am/images-cache/banners/1/16170067683633/485x304.jpg"
                      className="absolute left-0 top-0 w-[80%] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl"
                  />
                  <motion.img 
                      initial={{ y: 150, opacity: 0, scale: 0.5 }}
                      whileInView={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                      src="https://www.evoca.am/images-cache/banners/1/16153622710205/140x300.jpg"
                      className="absolute right-10 bottom-0 w-[30%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20 border-4 border-[#1a1a1a] rounded-[2rem]"
                  />
              </div>

              <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="w-full md:w-1/2 text-white text-center md:text-left mt-10 md:mt-0"
              >
                  <h2 className="text-[36px] md:text-[48px] font-black uppercase italic mb-6 leading-tight">Օնլայն բանկինգ</h2>
                  <p className="text-white/80 mb-8 text-lg">Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է:</p>
                  <motion.button 
                      whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(255,255,255,0.5)" }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-[#6610f2] px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest"
                  >
                      Դառնալ հաճախորդ
                  </motion.button>
              </motion.div>
          </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,900;1,900&display=swap');
        .font-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default OtherServicesTabs;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase";
import { useTranslation } from "react-i18next"; // Ավելացված է

interface SecurityTab {
  id: string;
  title: string;
  description: string;
  bullet_points?: string[];
  markets?: { name: string; platform: string }[];
  services_list?: string[];
  benefits_label?: string;
  highlight_text?: string;
  reports?: { label: string }[];
}

const SecuritiesMarket: React.FC = () => {
  const { t } = useTranslation(); // Ավելացված է
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<SecurityTab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securitiesRef = ref(db, 'arjetxtiShuka');
    
    const unsubscribe = onValue(securitiesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData: SecurityTab[] = Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }));
        setTabs(formattedData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderContent = (tab: SecurityTab) => {
    return (
      <div className="space-y-6">
        <p>{tab.description}</p>

        {tab.bullet_points && (
          <ul className="list-none space-y-4">
            {tab.bullet_points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#6610f2] font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        {tab.markets && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {tab.markets.map((m, i) => (
              <div key={i} className="p-4 bg-[#f8f9fb] rounded-2xl border border-gray-100">
                <h5 className="font-bold text-[#1a1a1a] mb-2 uppercase italic">{m.name}</h5>
                <p className="text-sm text-gray-500">{m.platform}</p>
              </div>
            ))}
          </div>
        )}

        {tab.services_list && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tab.services_list.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6610f2]" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {tab.highlight_text && (
          <div className="space-y-4">
            <p className="font-bold text-[#1a1a1a] italic uppercase">{tab.benefits_label}</p>
            <div className="bg-[#f3ebff] p-6 rounded-[30px]">
              <p className="text-[#6610f2] font-medium italic">{tab.highlight_text}</p>
            </div>
          </div>
        )}

        {tab.reports && (
          <div className="space-y-3">
            {tab.reports.map((report, i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <span className="font-bold text-[#1a1a1a]">{report.label}</span>
                <span className="text-[#6610f2] group-hover:translate-x-1 transition-transform">PDF →</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#6610f2]"></div>
    </div>
  );

  if (tabs.length === 0) return null;

  return (
    <div className="w-full bg-white font-sans py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6">
        
        <div className="mb-12">
          <span className="text-[#6610f2] text-xs font-black uppercase tracking-[0.2em]">
            {t("menu.business_label")}
          </span>
          <h2 className="text-[40px] md:text-[60px] font-[900] italic uppercase text-[#1a1a1a] tracking-tighter leading-none mt-2">
            {t("securities_page.title")}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3 flex flex-col border-l border-gray-100">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`group relative text-left py-6 px-8 transition-all duration-300 ${
                  activeTab === index 
                    ? "bg-[#f8f9fb] border-l-4 border-[#6610f2]" 
                    : "hover:bg-gray-50 border-l-4 border-transparent"
                }`}
              >
                <span className={`text-[11px] font-black uppercase tracking-widest block mb-2 transition-colors ${
                  activeTab === index ? "text-[#6610f2]" : "text-gray-300"
                }`}>
                  0{index + 1}
                </span>
                <span className={`text-xl md:text-2xl font-[900] italic uppercase tracking-tighter transition-colors ${
                  activeTab === index ? "text-[#1a1a1a]" : "text-gray-400 group-hover:text-gray-600"
                }`}>
                  {tab.title}
                </span>
              </button>
            ))}
          </div>

          <div className="w-full lg:w-2/3 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="text-[#4d4d4d] text-lg leading-[1.6] font-medium"
              >
                <h3 className="text-3xl font-[900] italic uppercase text-[#1a1a1a] mb-8 tracking-tighter">
                  {tabs[activeTab]?.title}
                </h3>
                {tabs[activeTab] && renderContent(tabs[activeTab])}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,900;1,900&display=swap');
        .font-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default SecuritiesMarket;
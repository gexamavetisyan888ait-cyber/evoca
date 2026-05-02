import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// --- Firebase Imports ---
import { db } from '../../lib/firebase'
import { ref, push, set } from "firebase/database";
// ------------------------

const OtherServicesTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation();

  // Ֆունկցիա՝ Firebase-ում հետաքրքրվածության հայտ գրանցելու համար
  const handleRegisterInterest = async (serviceTitle: string) => {
    try {
      const interestRef = ref(db, 'ayl');
      const newInterestRef = push(interestRef);
      await set(newInterestRef, {
        service: serviceTitle,
        timestamp: Date.now(),
        status: 'new_lead'
      });
      alert(t('other_services.banner.success'));
    } catch (error) {
      console.error("Firebase error:", error);
    }
  };

  const tabs = [
    {
      title: t('other_services.tab1_title'),
      content: (
        <div className="space-y-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <p className="text-[#4d4d4d] text-lg leading-relaxed">
                {t('other_services.tab1_desc')}
              </p>
            </div>
            <div className="w-full lg:w-[450px] h-[300px] rounded-[40px] overflow-hidden">
               <img src="https://www.evoca.am/images-cache/menu/1/16154664725996/780x585.jpg" className="w-full h-full object-cover" alt="Remote Banking" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["EvocaTOUCH", "EvocaONLINE", "Phone Banking", "SMS Banking"].map((s, i) => (
              <div key={i} className="p-8 bg-[#f8f9fb] rounded-[30px] border border-gray-50 flex flex-col justify-between h-[180px]">
                <span className="text-[11px] font-black text-[#6610f2] uppercase">0{i+1}</span>
                <h4 className="text-xl font-black italic uppercase text-[#1a1a1a]">{s}</h4>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: t('other_services.tab2_title'),
      content: (
        <div className="space-y-10">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <p className="text-[#4d4d4d] text-lg leading-relaxed mb-8">
                {t('other_services.tab2_desc')}
              </p>
              <div className="overflow-hidden rounded-[30px] border border-gray-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f8f9fb]">
                      <th className="p-5 text-[12px] font-black uppercase text-gray-400 italic">{t('other_services.table.size')}</th>
                      <th className="p-5 text-[12px] font-black uppercase text-gray-400 italic">{t('other_services.table.term')}</th>
                      <th className="p-5 text-[12px] font-black uppercase text-gray-400 italic">{t('other_services.table.rate')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#1a1a1a] font-bold text-sm">
                    <tr className="border-t border-gray-50">
                      <td className="p-5">{t('other_services.table.small')}</td><td className="p-5">{t('other_services.table.month')}</td><td className="p-5 text-[#6610f2]">{t('other_services.table.price_small')}</td>
                    </tr>
                    <tr className="border-t border-gray-50">
                      <td className="p-5">{t('other_services.table.medium')}</td><td className="p-5">{t('other_services.table.month')}</td><td className="p-5 text-[#6610f2]">{t('other_services.table.price_medium')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full lg:w-[450px] rounded-[40px] overflow-hidden">
               <img src="https://www.evoca.am/images-cache/menu/1/161163847135/780x585.jpg" className="w-full h-full object-cover" alt="Safe" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: t('other_services.tab3_title'),
      content: (
        <div className="space-y-8">
           <div className="flex flex-col lg:flex-row gap-12 items-center mb-10">
            <div className="flex-1">
              <h3 className="text-2xl font-black italic uppercase text-[#1a1a1a] mb-4">{t('other_services.tab3_subtitle')}</h3>
              <p className="text-[#4d4d4d] text-lg leading-relaxed">
                {t('other_services.tab3_desc')}
              </p>
            </div>
            <div className="w-full lg:w-[400px]">
               <img src="https://www.evoca.am/images-cache/menu/1/17387447069114/780x585.png" className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-[40px]" alt="Other Services" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-10 bg-[#f3ebff] rounded-[40px] border border-purple-50">
                <h4 className="text-xl font-[1000] italic uppercase text-[#6610f2] mb-3">{t('other_services.extra.references')}</h4>
                <p className="text-sm text-purple-900/60 font-medium tracking-tight">{t('other_services.extra.references_desc')}</p>
             </div>
             <div className="p-10 bg-[#f8f9fb] rounded-[40px] border border-gray-100">
                <h4 className="text-xl font-[1000] italic uppercase text-[#1a1a1a] mb-3">{t('other_services.extra.safekeeping')}</h4>
                <p className="text-sm text-gray-400 font-medium tracking-tight">{t('other_services.extra.safekeeping_desc')}</p>
             </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full bg-white font-sans py-20 lg:py-32 overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6">
        
        <div className="mb-16">
          <motion.span className="text-[#6610f2] text-[11px] font-[900] uppercase tracking-[0.3em] block mb-4">
            {t('other_services.badge')}
          </motion.span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="w-full lg:w-[400px] flex flex-col">
            {tabs.map((tab, index) => (
              <button
                key={index}
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
                  {tabs[activeTab].title}
                </h3>
                {tabs[activeTab].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Banner Section with Firebase Integration */}
      <div className="w-full bg-[#6610f2] py-24 mt-20 relative overflow-hidden">
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
            <h2 className="text-[36px] md:text-[48px] font-black uppercase italic mb-6 leading-tight">
              {t('other_services.banner.title')}
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              {t('other_services.banner.desc')}
            </p>
            <motion.button 
              onClick={() => handleRegisterInterest("Online Banking Banner")}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#6610f2] px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest transition-all"
            >
              {t('other_services.banner.btn')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OtherServicesTabs;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Firebase Imports ---
import { db } from '../../lib/firebase'
import { ref, push, set } from "firebase/database";
// ------------------------

const OtherServicesTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

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
      alert("Շնորհակալություն հետաքրքրվածության համար:");
    } catch (error) {
      console.error("Firebase error:", error);
    }
  };

  const tabs = [
    {
      title: "Հեռահար բանկային ծառայություններ",
      content: (
        <div className="space-y-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <p className="text-[#4d4d4d] text-lg leading-relaxed">
                Կառավարեք Ձեր հաշիվները աշխարհի ցանկացած կետից՝ շուրջօրյա ռեժիմով: 
                Evoca-ի հեռահար համակարգերը հնարավորություն են տալիս կատարել գործարքներ առանց բանկ այցելելու:
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
      title: "Պահատուփերի վարձակալություն",
      content: (
        <div className="space-y-10">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1">
              <p className="text-[#4d4d4d] text-lg leading-relaxed mb-8">
                Բանկն առաջարկում է անհատական պահատուփերի վարձակալություն Ձեր արժեքավոր իրերի, փաստաթղթերի և դրամական միջոցների անվտանգ պահպանման համար:
              </p>
              <div className="overflow-hidden rounded-[30px] border border-gray-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f8f9fb]">
                      <th className="p-5 text-[12px] font-black uppercase text-gray-400 italic">Չափսեր</th>
                      <th className="p-5 text-[12px] font-black uppercase text-gray-400 italic">Ժամկետ</th>
                      <th className="p-5 text-[12px] font-black uppercase text-gray-400 italic">Սակագին</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#1a1a1a] font-bold text-sm">
                    <tr className="border-t border-gray-50">
                      <td className="p-5">Փոքր</td><td className="p-5">1 ամիս</td><td className="p-5 text-[#6610f2]">10,000 ֏</td>
                    </tr>
                    <tr className="border-t border-gray-50">
                      <td className="p-5">Միջին</td><td className="p-5">1 ամիս</td><td className="p-5 text-[#6610f2]">15,000 ֏</td>
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
      title: "Այլ ծառայություններ",
      content: (
        <div className="space-y-8">
           <div className="flex flex-col lg:flex-row gap-12 items-center mb-10">
            <div className="flex-1">
              <h3 className="text-2xl font-black italic uppercase text-[#1a1a1a] mb-4">Չեկային գրքույկներ և տեղեկանքներ</h3>
              <p className="text-[#4d4d4d] text-lg leading-relaxed">
                Մենք տրամադրում ենք բոլոր անհրաժեշտ փաստաթղթերը, տեղեկանքները և քաղվածքները հաշիվների վերաբերյալ՝ հնարավորինս սեղմ ժամկետներում։
              </p>
            </div>
            <div className="w-full lg:w-[400px]">
               <img src="https://www.evoca.am/images-cache/menu/1/17387447069114/780x585.png" className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-[40px]" alt="Other Services" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-10 bg-[#f3ebff] rounded-[40px] border border-purple-50">
                <h4 className="text-xl font-[1000] italic uppercase text-[#6610f2] mb-3">Տեղեկանքների տրամադրում</h4>
                <p className="text-sm text-purple-900/60 font-medium tracking-tight">Հաշվի մնացորդի, շրջանառության և այլ տվյալների վերաբերյալ:</p>
             </div>
             <div className="p-10 bg-[#f8f9fb] rounded-[40px] border border-gray-100">
                <h4 className="text-xl font-[1000] italic uppercase text-[#1a1a1a] mb-3">Պատասխանատու պահպանություն</h4>
                <p className="text-sm text-gray-400 font-medium tracking-tight">Արժեթղթերի և այլ փաստաթղթերի պահպանում բանկում:</p>
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
          <motion.span className="text-[#6610f2] text-[11px] font-[900] uppercase tracking-[0.3em] block mb-4">Լրացուցիչ</motion.span>
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
            <h2 className="text-[36px] md:text-[48px] font-black uppercase italic mb-6 leading-tight">Օնլայն բանկինգ</h2>
            <p className="text-white/80 mb-8 text-lg">Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է:</p>
            <motion.button 
              onClick={() => handleRegisterInterest("Online Banking Banner")}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#6610f2] px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest transition-all"
            >
              Դառնալ հաճախորդ
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OtherServicesTabs;
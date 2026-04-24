import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Firebase ներմուծումներ (համոզվիր, որ lib/firebase.ts-ում արդեն ունես db-ի արտահանումը)
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

// Տիպերի սահմանում
interface FAQItem {
  id?: string;
  question: string;
  answer: React.ReactNode;
}

const AccordionItem = ({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) => (
  <div className="border-b border-gray-100 last:border-0">
    <button 
      onClick={onClick} 
      className="w-full py-6 flex justify-between items-center text-left group transition-all"
    >
      <span className={`text-[16px] md:text-[18px] font-bold uppercase italic tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#6622CC]' : 'text-[#333]'}`}>
        {item.question}
      </span>
      <motion.div 
        animate={{ rotate: isOpen ? 180 : 0 }}
        className={`p-2 rounded-full ${isOpen ? 'bg-[#6622CC] text-white' : 'bg-gray-50 text-gray-400'}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="pb-6 text-[15px] md:text-[16px] text-gray-500 font-medium italic leading-relaxed">
            {typeof item.answer === 'string' ? (
              <p dangerouslySetInnerHTML={{ __html: item.answer }} />
            ) : (
              item.answer
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const EvocaSALARY: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Բեռնում ենք աշխատավարձային նախագծի FAQ-ն Firebase-ից
    const payrollFaqsRef = ref(db, 'payroll_faqs');
    const unsubscribe = onValue(payrollFaqsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFaqData(Object.values(data));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full bg-white font-sans overflow-x-hidden pb-20">
      {/* Hero Section */}
      <section className="max-w-[1450px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-12 mt-10">
        <div className="flex-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center text-xs font-black uppercase tracking-widest text-gray-300 gap-2"
          >
            <span>Անհատ</span> <span className="text-[8px]">▶</span> <span className="text-[#6622CC]">EvocaSALARY</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[45px] md:text-[75px] font-[1000] text-[#1a1a1a] leading-[0.85] uppercase italic tracking-tighter"
          >
            EVOCA<br />ԱՇԽԱՏԱՎԱՐՁԱՅԻՆ<br />ՆԱԽԱԳԻԾ
          </motion.h1>
          <p className="text-[18px] md:text-[20px] text-gray-500 font-medium italic leading-tight">
            Քո աշխատավարձը կարող է քեզ տալ շատ ավելին:<br />
            Պարզապես պետք է ընտրել Evocabank-ը:
          </p>
        </div>
        <div className="flex-1 relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#6622CC] rounded-[60px] p-10 flex justify-center items-center overflow-hidden shadow-2xl"
            >
                <img 
                    src="https://www.evoca.am/images-cache/menu/1/17738355890361/780x585.png" 
                    alt="Evoca Wallet" 
                    className="w-full h-auto object-contain scale-110"
                />
            </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1100px] mx-auto px-6 py-12">
        <p className="text-[18px] md:text-[22px] text-gray-800 mb-16 text-center font-bold italic leading-snug uppercase">
            Evoca աշխատավարձային նախագիծը մեկնարկել է նրանց համար, ովքեր ցանկանում են ստանալ <span className="text-[#6622CC]">նոր հնարավորություններ ու առավելություններ</span>:
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-[#f8f9fb] p-10 rounded-[45px] border border-gray-100 hover:shadow-xl transition-all">
              <h3 className="text-[#1a1a1a] font-black text-[20px] mb-6 uppercase italic leading-tight">
                  Բեր աշխատավարձդ Evoca, Տար անվճար <span className="text-[#6622CC]">Mastercard Gold</span>
              </h3>
              <ul className="space-y-4">
                  {["Պրեմիում դասի քարտ", "Հասանելի ամբողջ աշխարհում", "Գումարի անվտանգության բարձր մակարդակ", "Դրական մնացորդի նկատմամբ 2% տարեկան տոկոսադրույք"].map((txt, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600 font-semibold italic text-sm">
                          <div className="w-2 h-2 bg-[#6622CC] rounded-full" /> {txt}
                      </li>
                  ))}
              </ul>
          </div>

          <div className="bg-[#f8f9fb] p-10 rounded-[45px] border border-gray-100 hover:shadow-xl transition-all">
              <h3 className="text-[#1a1a1a] font-black text-[20px] mb-6 uppercase italic leading-tight">
                  Բեր աշխատավարձդ Evoca, Տար 50% զեղչով <span className="text-[#6622CC]">Evoca Travel Card</span>
              </h3>
              <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 font-semibold italic text-sm">
                      <div className="w-2 h-2 bg-[#6622CC] rounded-full" /> Մինչև <span className="text-[#6622CC]">1.5% cashback</span> արտասահմանում
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 font-semibold italic text-sm">
                      <div className="w-2 h-2 bg-[#6622CC] rounded-full" /> Անվճար <span className="text-[#6622CC]">6 մուտք</span> Lounge Key
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 font-semibold italic text-sm">
                      <div className="w-2 h-2 bg-[#6622CC] rounded-full" /> Անվճար <span className="text-[#6622CC]">6 անգամ</span> Fast track
                  </li>
              </ul>
          </div>
        </div>

        <div className="mt-10 bg-[#1a1a1a] p-12 rounded-[50px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6622CC] opacity-20 blur-[100px]" />
            <h3 className="text-white font-black text-[24px] mb-10 uppercase italic tracking-tighter">Վարկեր ավելի ցածր տոկոսադրույքով</h3>
            <div className="grid md:grid-cols-2 gap-12">
                <div className="border-l-2 border-[#6622CC] pl-6">
                    <h4 className="font-black text-[#6622CC] uppercase mb-2 italic">Օվերդրաֆտ</h4>
                    <p className="text-gray-400 font-bold italic text-sm uppercase">Մինչև աշխատավարձի 15-ապատիկը</p>
                    <p className="text-gray-400 font-bold italic text-sm uppercase">Մինչև 10 մլն դրամ</p>
                </div>
                <div className="border-l-2 border-[#6622CC] pl-6">
                    <h4 className="font-black text-[#6622CC] uppercase mb-2 italic">Ավտովարկ</h4>
                    <p className="text-gray-400 font-bold italic text-sm uppercase">0.5%-ով ցածր տոկոսադրույք</p>
                    <p className="text-gray-400 font-bold italic text-sm uppercase">Մինչև 50 մլն դրամ</p>
                </div>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-[1100px] mx-auto px-6 py-20 mt-10">
        <h2 className="text-[35px] md:text-[50px] font-[1000] text-[#1a1a1a] mb-12 uppercase italic tracking-tighter">Հաճախ տրվող հարցեր</h2>
        <div className="space-y-2">
          {loading ? (
            <div className="py-10 text-center font-black text-[#6622CC] italic uppercase">Բեռնվում է...</div>
          ) : (
            faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                item={faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))
          )}
        </div>
        <div className="mt-12 text-right text-gray-300 text-[10px] font-black uppercase italic tracking-widest">
            Վերջին թարմացում՝ 2026 / 04 / 24
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
        .font-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default EvocaSALARY;
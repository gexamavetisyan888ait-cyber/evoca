import React, { useState, useEffect } from 'react';
// --- Firebase Imports ---
import { db } from '../../lib/firebase'; // Ստուգիր հասցեն ըստ քո նախագծի
import { ref, onValue } from 'firebase/database';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const AccordionItem = ({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) => (
  <div className="border-b border-gray-200">
    <button onClick={onClick} className="w-full py-5 flex justify-between items-center text-left">
      <span className={`text-[16px] font-semibold ${isOpen ? 'text-[#6622CC]' : 'text-[#333]'}`}>{item.question}</span>
      <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6622CC" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
      <div className="text-[15px] text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">{item.answer}</div>
    </div>
  </div>
);

const EvocaSALARY: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  // --- Dynamic Data State ---
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch Data from Firebase ---
  useEffect(() => {
    const salaryFaqRef = ref(db, 'evocasalary'); // Ենթադրվում է, որ տվյալները այս node-ի տակ են
    const unsubscribe = onValue(salaryFaqRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Ձևափոխում ենք տվյալները, եթե դրանք գալիս են որպես Object
        const formattedFaqs = Object.values(data) as FAQItem[];
        setFaqData(formattedFaqs);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full bg-white font-sans overflow-x-hidden">
      <section className="max-w-[1200px] mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="flex items-center text-sm text-gray-400 gap-2">
            <span>Անհատ</span> <span className="text-[10px]">▶</span> <span>EvocaSALARY</span>
          </div>
          <h1 className="text-[40px] font-black text-[#333] leading-tight uppercase italic">
            EVOCA<br />ԱՇԽԱՏԱՎԱՐՁԱՅԻՆ<br />ՆԱԽԱԳԻԾ
          </h1>
          <p className="text-[18px] text-gray-600">
            Քո աշխատավարձը կարող է քեզ տալ շատ ավելին:<br />
            Պարզապես պետք է ընտրել Evocabank-ը:
          </p>
        </div>
        <div className="flex-1 relative">
            <div className="bg-[#6622CC] rounded-3xl p-8 flex justify-center items-center overflow-hidden">
                <img 
                    src="https://www.evoca.am/images-cache/menu/1/17738355890361/780x585.png" 
                    alt="Evoca Wallet" 
                    className="w-full h-auto object-contain scale-110"
                />
            </div>
        </div>
      </section>

      <section className="max-w-[1000px] mx-auto px-4 py-12">
        <p className="text-[16px] text-gray-700 mb-10 text-center leading-relaxed">
            Evoca աշխատավարձային նախագիծը մեկնարկել է նրանց համար, ովքեր, իրենց աշխատավարձը քարտին ստանալուց բացի, ցանկանում են նաև ստանալ <span className="text-[#6622CC] font-bold">նոր հնարավորություններ ու առավելություններ</span>:
        </p>

        <div className="mb-12">
            <h3 className="text-[#6622CC] font-bold text-[18px] mb-4 border-b-2 border-[#6622CC] inline-block pb-1">
                Բեր աշխատավարձդ Evoca, Տար անվճար Mastercard Gold
            </h3>
            <ul className="space-y-3 mt-4">
                {["Պրեմիում դասի քարտ", "Հասանելի ամբողջ աշխարհում", "Գումարի անվտանգության բարձր մակարդակ", "Դրական մնացորդի նկատմամպ 2% տարեկան տոկոսադրույք"].map((txt, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-[#6622CC] rounded-full" /> {txt}
                    </li>
                ))}
            </ul>
        </div>

        <div className="mb-12">
            <h3 className="text-[#6622CC] font-bold text-[18px] mb-4 border-b-2 border-[#6622CC] inline-block pb-1">
                Բեր աշխատավարձդ Evoca, Տար 50% զեղչով Evoca Travel Card
            </h3>
            <ul className="space-y-3 mt-4">
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-1.5 h-1.5 bg-[#6622CC] rounded-full" /> Մինչև <span className="text-[#6622CC]">1.5% cashback</span> արտասահմանում իրականացված վճարումների համար
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-[#6622CC] rounded-full" /> Անվճար <span className="text-[#6622CC] font-bold">6 մուտք</span> Lounge Key սրահներ քեզ և հյուրերիդ համար
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-[#6622CC] rounded-full" /> Անվճար <span className="text-[#6622CC] font-bold">6 անգամ</span> Fast track-ից օգտվելու հնարավորություն
                </li>
            </ul>
        </div>

        <div className="mb-12 bg-gray-50 p-8 rounded-2xl border-l-4 border-[#6622CC]">
            <h3 className="text-[#6622CC] font-bold text-[18px] mb-6 uppercase">Վարկեր ավելի ցածր տոկոսադրույքով</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="font-bold text-gray-800 underline mb-3 italic">Օվերդրաֆտ</h4>
                    <p className="text-sm text-gray-600">Մինչև աշխատավարձի <span className="text-[#6622CC] font-bold">15-ապատիկի</span> չափով</p>
                    <p className="text-sm text-gray-600">Մինչև <span className="text-[#6622CC] font-bold">10 մլն դրամ</span> գումար</p>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 underline mb-3 italic">Ավտովարկ</h4>
                    <p className="text-sm text-gray-600"><span className="text-[#6622CC] font-bold">0.5%-ով</span> ցածր տոկոսադրույք</p>
                    <p className="text-sm text-gray-600">Մինչև <span className="text-[#6622CC] font-bold">50 մլն դրամ</span></p>
                </div>
            </div>
        </div>
      </section>

      <section className="max-w-[1000px] mx-auto px-4 py-16 border-t border-gray-100">
        <h2 className="text-[30px] font-bold text-[#1A1A1A] mb-8">Հաճախ տրվող հարցեր</h2>
        
        {loading ? (
            <div className="text-[#6622CC] font-bold italic">Բեռնվում է...</div>
        ) : (
            <div className="space-y-2">
            {faqData.map((faq, index) => (
                <AccordionItem
                key={index}
                item={faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
            ))}
            </div>
        )}
        
        <div className="mt-8 text-right text-gray-400 text-[11px] italic">
            Թարմացվել է 20/04/2026 13:05
        </div>
      </section>
    </div>
  );
};

export default EvocaSALARY;
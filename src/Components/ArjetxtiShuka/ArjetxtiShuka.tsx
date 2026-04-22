import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SecuritiesMarket: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Ներդրումային Ծառայություններ",
      content: (
        <div className="space-y-6">
          <p>Արժեթղթերի շուկան ֆինանսական շուկայի մի հատված է, որտեղ իրականացվում է արժեթղթերի թողարկումը և շրջանառությունը:</p>
          <p>Արժեթղթերի շուկայի հիմնական գործառույթը տնտեսության մեջ ազատ դրամական միջոցների վերաբաշխումն է և դրանց ուղղումը դեպի ներդրումային ոլորտ:</p>
          <ul className="list-none space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-[#6610f2] font-bold">•</span>
              <span>Կապիտալի ներգրավում</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#6610f2] font-bold">•</span>
              <span>Ներդրումների իրականացում</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "Պարտատոմսեր",
      content: (
        <div className="space-y-6">
          <p>Բանկը մատուցում է բրոքերային ծառայություններ թե՛ տեղական, թե՛ միջազգային ֆինանսական շուկաներում:</p>
          <p>Մենք հնարավորություն ենք տալիս իրականացնել գործարքներ բաժնետոմսերով, պարտատոմսերով և այլ ֆինանսական գործիքներով հետևյալ հարթակներում.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-[#f8f9fb] rounded-2xl border border-gray-100">
              <h5 className="font-bold text-[#1a1a1a] mb-2 uppercase italic">Հայաստանյան շուկա</h5>
              <p className="text-sm text-gray-500">Հայաստանի ֆոնդային բորսա (AMX)</p>
            </div>
            <div className="p-4 bg-[#f8f9fb] rounded-2xl border border-gray-100">
              <h5 className="font-bold text-[#1a1a1a] mb-2 uppercase italic">Միջազգային շուկաներ</h5>
              <p className="text-sm text-gray-500">NYSE, NASDAQ, LSE և այլն</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "ՀԿԴ ծառայություններ",
      content: (
        <div className="space-y-6">
          <p>Որպես պահառու՝ Բանկն իրականացնում է Ձեր արժեթղթերի անվտանգ պահպանումը և դրանց նկատմամբ իրավունքների հաշվառումը:</p>
          <p>Մեր ծառայությունները ներառում են.</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["Արժեթղթերի հաշվառում", "Գործարքների սպասարկում", "Եկամուտների հավաքագրում", "Կորպորատիվ գործողություններ"].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6610f2]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      title: "Ռեպո/Հակադարձ Ռեպո գործարքներ",
      content: (
        <div className="space-y-6">
          <p>Ներդրումային ֆոնդերը թույլ են տալիս ներդրողներին միավորել իրենց միջոցները պրոֆեսիոնալ կառավարման ներքո:</p>
          <p className="font-bold text-[#1a1a1a] italic uppercase">Առավելությունները.</p>
          <div className="bg-[#f3ebff] p-6 rounded-[30px]">
            <p className="text-[#6610f2] font-medium italic">Դիվերսիֆիկացված պորտֆել, պրոֆեսիոնալ կառավարում և միջոցների բարձր իրացվելիություն:</p>
          </div>
        </div>
      )
    },
    {
      title: "EvocaINVEST",
      content: (
        <div className="space-y-6">
          <p>Համաձայն գործող օրենսդրության՝ Բանկը հրապարակում է բրոքերային և պահառության գործունեության վերաբերյալ պարբերական հաշվետվություններ:</p>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <span className="font-bold text-[#1a1a1a]">Հաշվետվություն 202{i} - Եռամսյակ {i}</span>
                <span className="text-[#6610f2] group-hover:translate-x-1 transition-transform">PDF →</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full bg-white font-sans py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6">
        
        <div className="mb-12">
          <span className="text-[#6610f2] text-xs font-black uppercase tracking-[0.2em]">Բիզնես</span>
          <h2 className="text-[40px] md:text-[60px] font-[900] italic uppercase text-[#1a1a1a] tracking-tighter leading-none mt-2">
            Արժեթղթերի շուկա
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="w-full lg:w-1/3 flex flex-col border-l border-gray-100">
            {tabs.map((tab, index) => (
              <button
                key={index}
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
                  {tabs[activeTab].title}
                </h3>
                {tabs[activeTab].content}
                
        
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
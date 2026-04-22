import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeCards from '../../Components/HomeCards/HomeCards';

const TradeFinancing: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Երաշխիք",
      content: (
        <div className="space-y-6">
          <p>Բանկային երաշխիքը Բանկի գրավոր պարտավորությունն է՝ վճարել բենեֆիցիարին (պահանջատիրոջը) գումար, եթե պրինցիպալը (հաճախորդը) չի կատարում իր պայմանագրային պարտավորությունները:</p>
          <p className="font-bold text-[#1a1a1a] italic uppercase text-sm">Հիմնական կիրառությունները.</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Մրցույթի մասնակցության երաշխիք", "Պայմանագրի կատարման երաշխիք", "Կանխավճարի վերադարձի երաշխիք", "Վճարման երաշխիք"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-2xl text-gray-600 text-sm">
                <div className="w-2 h-2 rounded-full bg-[#6610f2]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      title: "Ֆակտորինգային ֆինանսավորում",
      content: (
        <div className="space-y-6">
          <p>Ֆակտորինգը ֆինանսական ծառայություն է, որը թույլ է տալիս կազմակերպություններին ստանալ վճարում մատակարարված ապրանքների դիմաց՝ առանց սպասելու գնորդի կողմից վճարման հետաձգված ժամկետի ավարտին:</p>
          <div className="bg-[#f8f9fb] p-6 rounded-[30px] border-l-4 border-[#6610f2]">
            <p className="italic font-medium text-gray-700">Այն ապահովում է Ձեր բիզնեսի անընդհատ դրամական հոսքերը և լուծում է դեբիտորական պարտքերի կառավարման խնդիրը:</p>
          </div>
        </div>
      )
    },
    {
      title: "Ակրեդիտիվ",
      content: (
        <div className="space-y-6">
          <p>Ակրեդիտիվը բանկի պարտավորությունն է՝ վճարելու վաճառողին (արտահանողին) ապրանքների կամ ծառայությունների դիմաց, եթե վերջինս ներկայացնում է ակրեդիտիվի պայմաններին համապատասխանող փաստաթղթեր:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="p-5 bg-[#f8f9fb] rounded-[30px] border border-gray-100">
              <h5 className="font-black text-[#1a1a1a] mb-2 uppercase italic text-sm">Առավելությունները</h5>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Վճարման երաշխիք վաճառողի համար</li>
                <li>• Ապրանքների ստացման երաշխիք գնորդի համար</li>
                <li>• Միջազգային առևտրի ռիսկերի նվազեցում</li>
              </ul>
            </div>
            <div className="p-5 bg-[#f3ebff] rounded-[30px] border border-purple-50">
              <h5 className="font-black text-[#6610f2] mb-2 uppercase italic text-sm">Տեսակները</h5>
              <p className="text-sm text-[#6610f2] font-medium">Անվերադարձելի, հաստատված, փոխանցելի, պահուստային:</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ինկասո",
      content: (
        <div className="space-y-6">
          <p>Ինկասոն գործառնություն է, որի ժամանակ բանկը հանդես է գալիս որպես միջնորդ՝ փոխանցելով փաստաթղթերը գնորդին միայն վճարման կամ վճարման պարտավորության դիմաց:</p>
          <p>Սա միջազգային հաշվարկների պարզ և մատչելի ձև է, որն ապահովում է փաստաթղթաշրջանառության վերահսկողությունը:</p>
        </div>
      )
    }
  ];

  return (
    <div className="w-full bg-white font-sans py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-6">
        
        {/* Title */}
        <div className="mb-14">
          <motion.span className="text-[#6610f2] text-[11px] font-[900] uppercase tracking-[0.25em]">Բիզնես</motion.span>
          <motion.h2 className="text-[40px] md:text-[65px] font-[900] italic uppercase text-[#1a1a1a] tracking-tighter leading-none mt-3">
            Առևտրի ֆինանսավորում
          </motion.h2>
        </div>

        {/* Main Flex Container */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-20">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[400px] flex flex-col">
            {tabs.map((tab, index) => (
              <button
                key={index}
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

          {/* Tab Content */}
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
                  {tabs[activeTab].title}
                </h3>
                <div className="max-w-[750px]">
                  {tabs[activeTab].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* HomeCards-ը տեղադրված է այստեղ՝ flex-ից դուրս, որպեսզի լինի ամբողջ լայնությամբ */}
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
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const SecuritiesMarket: React.FC = () => {
  const sections = [
    {
      id: 1,
      title: "Ինչ է արժեթղթերի շուկան",
      content: "Արժեթղթերի շուկան տնտեսության հատված է, որտեղ իրականացվում է արժեթղթերի թողարկումը և շրջանառությունը: Այն հնարավորություն է տալիս ներդրողներին արդյունավետ կերպով կառավարել իրենց խնայողությունները:",
    },
    {
      id: 2,
      title: "Բրոքերային ծառայություններ",
      content: "Evocabank-ն առաջարկում է բրոքերային ծառայությունների լայն ընտրանի տեղական և միջազգային շուկաներում: Մենք ապահովում ենք արագ հասանելիություն բորսայական հարթակներին:",
    },
    {
      id: 3,
      title: "Պահառության ծառայություն",
      content: "Մենք իրականացնում ենք արժեթղթերի հաշվառում և պահպանում՝ երաշխավորելով Ձեր ակտիվների անվտանգությունն ու գործարքների գաղտնիությունը:",
    },
    {
      id: 4,
      title: "Ներդրումային ֆոնդեր",
      content: "Բացահայտեք պրոֆեսիոնալ կառավարվող ներդրումային ֆոնդերի առավելությունները, որոնք թույլ են տալիս դիվերսիֆիկացնել ռիսկերը և ստանալ կայուն եկամուտ:",
    },
    {
      id: 5,
      title: "Հաշվետվություններ",
      content: "Թափանցիկությունը մեր աշխատանքի հիմքն է: Այստեղ կարող եք գտնել բոլոր անհրաժեշտ հաշվետվությունները և շուկայի վերլուծական տվյալները:",
    }
  ];

  return (
    <div className="w-full bg-white font-sans py-20">
      <div className="max-w-[1450px] mx-auto px-6">
        
        {/* Main Title Section */}
        <div className="mb-16">
          <motion.h4 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[#6610f2] text-[12px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Բիզնես
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[45px] md:text-[60px] font-[900] italic uppercase text-[#1a1a1a] leading-none tracking-tighter"
          >
            Արժեթղթերի շուկա
          </motion.h2>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
          {sections.map((section, index) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group border-b border-gray-100 pb-12 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[14px] font-black text-gray-300 group-hover:text-[#6610f2] transition-colors">
                      0{section.id}
                    </span>
                    <h3 className="text-[24px] md:text-[28px] font-[900] italic uppercase text-[#1a1a1a] group-hover:text-[#6610f2] transition-colors tracking-tighter leading-tight">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-[15px] leading-relaxed max-w-[550px] font-medium">
                    {section.content}
                  </p>
                </div>
                
                <div className="mt-2">
                  <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#6610f2] group-hover:border-[#6610f2] transition-all duration-300">
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Special CTA Block (6-րդ հատվածի փոխարեն, եթե կա լրացուցիչ տեղ) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-[#f8f9fb] rounded-[40px] p-10 flex flex-col justify-between border border-gray-50 group hover:shadow-xl transition-all duration-500"
          >
            <div>
              <h3 className="text-[28px] font-[900] italic uppercase text-[#1a1a1a] mb-4 tracking-tighter">
                Հետաքրքրեց՞
              </h3>
              <p className="text-gray-500 text-[15px] font-medium">
                Կապվեք մեր մասնագետների հետ՝ ստանալու անհատական խորհրդատվություն արժեթղթերի վերաբերյալ։
              </p>
            </div>
            <button className="mt-8 bg-[#6610f2] text-white w-full py-4 rounded-full font-black text-[14px] uppercase tracking-widest hover:bg-[#520dc2] transition-all active:scale-95">
              Հետադարձ կապ
            </button>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,900;1,900&display=swap');
        
        .font-sans {
          font-family: 'Montserrat', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </div>
  );
};

export default SecuritiesMarket;
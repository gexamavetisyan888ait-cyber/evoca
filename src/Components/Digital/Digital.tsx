import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { 
  Smartphone, Monitor, Phone, MessageSquare, 
  CreditCard, Globe, ShieldCheck, Zap, 
  RefreshCcw, ChevronRight, FileText, CheckCircle2 
} from 'lucide-react';

// Import HomeCards component - Համոզվեք, որ ֆայլը գոյություն ունի այս հասցեում

const Digital: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Թարմացված tab-երի ցուցակ (առանց հայտի)
  const tabs = [
    { id: 0, title: "V-POS Տերմինալ", icon: <Smartphone size={18} /> },
    { id: 1, title: "POS Տերմինալ", icon: <Monitor size={18} /> },
    { id: 2, title: "Սակագներ", icon: <Phone size={18} /> },
    { id: 4, title: "Evoca Mobile POS` mPOS", icon: <CreditCard size={18} /> }
  ];

  const testimonials = [
    {
      name: 'Սուսաննա Վանյան',
      role: 'Հաճախորդ',
      text: 'Հայաստանի իրականության մեջ բացառիկ հրաշք բանկ։ Միայն այս հնարավորությունը ընձեռելով երիտասարդ ընտանիքներին ՝ նման ցածր տոկոսով բնակարան ձեռք բերել, արժանի է մեծ հարգանքի։ Շնորհակալ ենք, որ Դուք կաք:',
    },
    {
      name: 'Նունե Գևորգյան',
      role: 'Հաճախորդ',
      text: 'Գերազանց սպասարկում, ընտիր ու հավես անձնակազմ Ազատության մասնաճյուղում: Վարկային բաժնից շատ շնորհակալ եմ, վարկս ձևակերպվեց առանց ավելորդ քաշքշուկների` հեշտ, արագ, որակով:',
    },
    {
      name: 'Կամո Թովմասյան',
      role: 'KAMOBLOG մեդիա-հարթակի հիմնադիր',
      text: 'Բանկ, որ իր ռեբրենդինգի շքեղ միջոցառմամբ ու աշխատանքային ձևաչափով բանկային ոլորտում ամրապնդեց որակ և ճաշակ թելադրեց։',
    }
  ];

  const renderTariffTable = (title: string, commission: string, logoUrl: string) => (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-sm border border-gray-100 p-3 flex items-center justify-center overflow-hidden shrink-0">
          <img src={logoUrl} alt={title} className="max-w-full max-h-full object-contain" />
        </div>
        <h4 className="text-2xl md:text-3xl font-[1000] italic uppercase text-[#1a1a1a] tracking-tighter">{title}</h4>
      </div>
      <div className="w-full overflow-hidden rounded-[35px] border border-gray-100 shadow-sm bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1a1a1a] text-white">
              <th className="p-7 text-[11px] font-black uppercase italic tracking-widest">Ծառայության տեսակ</th>
              <th className="p-7 text-[11px] font-black uppercase italic tracking-widest">Սակագին</th>
            </tr>
          </thead>
          <tbody className="text-[#1a1a1a] font-bold italic uppercase text-[13px]">
            <tr className="border-b border-gray-50">
              <td className="p-7 bg-[#f8f9fb]">Գործարքների սպասարկման միջնորդավճար</td>
              <td className="p-7 text-[#6610f2]">{commission}</td>
            </tr>
            <tr>
              <td className="p-7 bg-white">Միացման վճար</td>
              <td className="p-7 text-[#6610f2]">0 ֏</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-400 text-[11px] font-semibold italic uppercase tracking-wider pb-6 border-b border-gray-100">
        * Սակագները կարող են փոփոխվել համաձայն գործընկեր համակարգի պայմանների:
      </p>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // V-POS - Վերականգնված լիարժեք բովանդակություն
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16 pb-20">
            <section className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <h3 className="text-4xl md:text-5xl font-[1000] italic uppercase text-[#1a1a1a] tracking-tighter leading-tight">V-POS Տերմինալ</h3>
                <p className="text-[#4d4d4d] text-lg font-medium leading-relaxed">
                  V-POS (Virtual POS) տերմինալը ժամանակակից լուծում է այն բիզնեսների համար, որոնք ցանկանում են ընդունել անկանխիկ վճարումներ համացանցում՝ կայքերի կամ բջջային հավելվածների միջոցով։ Միացեք արագ, ապահով և ընդլայնեք Ձեր վաճառքի սահմանները։
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                        <CheckCircle2 size={18} className="text-[#6610f2]" />
                        <span className="text-[#1a1a1a] font-bold text-sm uppercase italic">Արագ ինտեգրում</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                        <CheckCircle2 size={18} className="text-[#6610f2]" />
                        <span className="text-[#1a1a1a] font-bold text-sm uppercase italic">24/7 Աջակցություն</span>
                    </div>
                </div>
              </div>
              <div className="w-full lg:w-[500px] h-[350px] rounded-[50px] overflow-hidden shadow-2xl relative shrink-0">
                <img src="https://www.evoca.am/images-cache/menu/1/16158111599306/780x585.jpg" className="w-full h-full object-cover" alt="V-POS" />
              </div>
            </section>
          </motion.div>
        );

      case 1: // POS - Վերականգնված լիարժեք բովանդակություն
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16 pb-20">
            <section className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <h3 className="text-4xl md:text-5xl font-[1000] italic uppercase text-[#1a1a1a] tracking-tighter leading-tight">POS Տերմինալներ</h3>
                <p className="text-[#4d4d4d] text-lg font-medium leading-relaxed">
                  POS տերմինալների միջոցով Ձեր հաճախորդները կարող են կատարել վճարումներ հաշված վայրկյանների ընթացքում՝ օգտագործելով իրենց քարտերը կամ սմարթֆոնները։ Մենք տրամադրում ենք ժամանակակից, NFC տեխնոլոգիայով հագեցած սարքավորումներ։
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                        <CheckCircle2 size={18} className="text-[#6610f2]" />
                        <span className="text-[#1a1a1a] font-bold text-sm uppercase italic">Contactless վճարումներ</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                        <CheckCircle2 size={18} className="text-[#6610f2]" />
                        <span className="text-[#1a1a1a] font-bold text-sm uppercase italic">Բարձր արագություն</span>
                    </div>
                </div>
              </div>
              <div className="w-full lg:w-[500px] h-[350px] rounded-[50px] overflow-hidden shadow-2xl relative shrink-0">
                <img src="https://www.evoca.am/images-cache/menu/1/16158085302978/780x585.jpg" className="w-full h-full object-cover" alt="POS Terminal" />
              </div>
            </section>
          </motion.div>
        );

      case 2: // ՍԱԿԱԳՆԵՐ - Պահպանված լոգոներով և HomeCards-ով
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16 pb-20">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-[1000] italic uppercase text-[#1a1a1a] tracking-tighter">Սակագներ</h3>
              <p className="text-gray-500 font-medium text-lg italic">Գործընկեր համակարգերի սպասարկման պայմաններ</p>
            </div>
            <div className="grid grid-cols-1 gap-16">
              {renderTariffTable("Tellcell", "1.5% - 2.0%", "https://www.evoca.am/file_manager/telcell-evoca-logo.png")}
              {renderTariffTable("UPay", "1.5% - 2.0%", "https://www.evoca.am/file_manager/uPay-evoca.png")}
              {renderTariffTable("ՄոբիԴրամ", "1.5% - 2.0%", "https://www.evoca.am/file_manager/mobidram-evoca.jpg")}
              {renderTariffTable("IDRAM", "1.5% - 2.0%", "https://www.evoca.am/file_manager/idram-evoca.png")}
              {renderTariffTable("EasyPay", "1.5% - 2.0%", "https://www.evoca.am/file_manager/easypay-evoca.png")}
            </div>
          
          </motion.div>
        );

      case 4: // Evoca Mobile POS` mPOS - ՆՈՐ ԱՎԵԼԱՑՎԱԾ ԲԱԺԻՆ
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16 pb-20">
            <section className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <h3 className="text-4xl md:text-5xl font-[1000] italic uppercase text-[#1a1a1a] tracking-tighter leading-tight">Evoca Mobile POS <br/> mPOS</h3>
                <p className="text-[#4d4d4d] text-lg font-medium leading-relaxed">
                  Ձեր սմարթֆոնը դարձրեք POS տերմինալ: mPOS լուծումը թույլ է տալիս անհատ ձեռներեցներին և ընկերություններին ընդունել անհպում քարտային վճարումներ անմիջապես Android սմարթֆոնի միջոցով՝ առանց հավելյալ սարքավորումների։
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                        <CheckCircle2 size={18} className="text-[#6610f2]" />
                        <span className="text-[#1a1a1a] font-bold text-sm uppercase italic">Առանց սարքի ծախսի</span>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                        <CheckCircle2 size={18} className="text-[#6610f2]" />
                        <span className="text-[#1a1a1a] font-bold text-sm uppercase italic">Շարժական լուծում</span>
                    </div>
                </div>
              </div>
              <div className="w-full lg:w-[500px] h-[350px] rounded-[50px] overflow-hidden shadow-2xl relative shrink-0 bg-gray-50 flex items-center justify-center p-6 border border-gray-100">
                <img src="https://www.evoca.am/images-cache/menu/1/16697156723793/780x585.png" className="w-full lg:w-[500px] h-[350px] rounded-[50px] overflow-hidden shadow-2xl relative shrink-0 bg-gray-50 flex items-center justify-center p-6 " alt="Evoca Mobile POS mPOS" />
              </div>
            </section>
          </motion.div>
        );

      default:
        return <div className="py-20 text-center font-black italic text-gray-200 uppercase">Բաժինը գտնվում է մշակման փուլում</div>;
    }
  };

  return (
    <div className="w-full bg-white font-sans py-20 lg:py-32">
      <div className="max-w-[1450px] mx-auto px-6">
        
        <div className="mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[#6610f2] text-[11px] font-[900] uppercase tracking-[0.4em] block mb-4">Բիզնեսի համար</motion.span>
          <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="text-[55px] md:text-[100px] font-[1000] italic uppercase text-[#1a1a1a] tracking-tighter leading-[0.8]">Digital</motion.h2>
        </div>

        {/* Tabs Navigation */}
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 mb-24 overflow-x-auto no-scrollbar">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-4 py-10 px-10 whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id ? "opacity-100 scale-105" : "opacity-20 hover:opacity-40"
                }`}
              >
                <span className="text-[#6610f2]">{tab.icon}</span>
                <span className="text-sm md:text-base font-black italic uppercase tracking-tight text-[#1a1a1a]">{tab.title}</span>
                {activeTab === tab.id && <motion.div layoutId="digitalActiveLine" className="absolute bottom-0 left-0 right-0 h-2 bg-[#6610f2] rounded-t-full" />}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <div key={activeTab}>{renderTabContent()}</div>
          </AnimatePresence>
        </div>
      </div>

      {/* Blue Banner & Testimonials - Թաքցնել, երբ ակտիվ է «Սակագներ» կամ «mPOS» թեբը */}
      {activeTab !== 2 && activeTab !== 4 && (
        <>
          <div className="w-full bg-[#6610f2] py-24 relative overflow-hidden mt-20">
            <motion.div animate={{ y: [0, -40, 0], rotate: [0, 10, 0], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-10 left-[10%] text-white">
              <Monitor size={120} />
            </motion.div>
            <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center relative z-10 text-white">
              <div className="w-full md:w-1/2 relative h-[400px]">
                <motion.img initial={{ x: -150, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} src="https://www.evoca.am/images-cache/banners/1/16170067683633/485x304.jpg" className="absolute left-0 top-0 w-[80%] rounded-xl shadow-2xl" />
                <motion.img initial={{ y: 150, opacity: 0, scale: 0.5 }} whileInView={{ y: 0, opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} src="https://www.evoca.am/images-cache/banners/1/16153622710205/140x300.jpg" className="absolute right-10 bottom-0 w-[30%] z-20 border-4 border-[#1a1a1a] rounded-[2rem]" />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left mt-10 md:mt-0">
                <h2 className="text-[36px] md:text-[48px] font-black uppercase italic mb-6 leading-tight">Օնլայն բանկինգ</h2>
                <p className="text-white/80 mb-8 text-lg">Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է:</p>
                <button className="bg-white text-[#6610f2] px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest">Դառնալ հաճախորդ</button>
              </div>
            </div>
          </div>

          <div className="max-w-[1140px] mx-auto px-4 py-24 bg-[#fcfcfc]">
            <div className="flex justify-center gap-2 mb-12">
              {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-yellow-400 text-4xl">★</span>)}
            </div>
            <Swiper modules={[Pagination, Autoplay, EffectFade]} effect="fade" speed={1000} autoplay={{ delay: 5000 }} pagination={{ clickable: true }} className="pb-20">
              {testimonials.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div className="text-center max-w-3xl mx-auto">
                    <p className="text-[20px] md:text-[26px] font-medium italic leading-relaxed text-gray-700 px-6">"{t.text}"</p>
                    <div className="mt-10">
                      <h4 className="text-[#6610f2] font-black text-xl uppercase">{t.name}</h4>
                      <p className="text-gray-400 text-xs uppercase tracking-[0.3em] mt-2">{t.role}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .swiper-pagination-bullet-active { background: #6610f2 !important; }
      `}</style>
    </div>
  );
};

export default Digital;
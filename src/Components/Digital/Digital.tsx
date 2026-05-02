import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { useTranslation } from 'react-i18next'; // Ավելացված է
import { 
  Smartphone, Monitor, Phone, CreditCard, 
  CheckCircle2 
} from 'lucide-react';

// Firebase ներմուծումներ
import { db } from '../../lib/firebase';
import { ref, onValue } from 'firebase/database';


// Տիպերի սահմանում
interface TabType {
  id: number;
  title: string;
  icon_type: string;
}

interface TestimonialType {
  name: string;
  role: string;
  text: string;
}

interface TariffType {
  title: string;
  commission: string;
  logoUrl: string;
}

const Digital: React.FC = () => {
  const { t } = useTranslation(); // Ավելացված է
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<TabType[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [tariffs, setTariffs] = useState<TariffType[]>([]);
  const [loading, setLoading] = useState(true);

  // Icon-ների քարտեզագրում ըստ տեքստային ID-ների
  const iconMap: Record<string, React.ReactNode> = {
    Smartphone: <Smartphone size={18} />,
    Monitor: <Monitor size={18} />,
    Phone: <Phone size={18} />,
    CreditCard: <CreditCard size={18} />
  };

  useEffect(() => {
    const digitalRef = ref(db, 'digital');
    const unsubscribe = onValue(digitalRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data.tabs) setTabs(Array.isArray(data.tabs) ? data.tabs : Object.values(data.tabs));
        if (data.testimonials) setTestimonials(Array.isArray(data.testimonials) ? data.testimonials : Object.values(data.testimonials));
        if (data.tariffs) setTariffs(Array.isArray(data.tariffs) ? data.tariffs : Object.values(data.tariffs));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const renderTariffTable = (tariff: TariffType) => (
    <div key={tariff.title} className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-sm border border-gray-100 p-3 flex items-center justify-center overflow-hidden shrink-0">
          <img src={tariff.logoUrl} alt={tariff.title} className="max-w-full max-h-full object-contain" />
        </div>
        <h4 className="text-2xl md:text-3xl font-[1000] italic uppercase text-[#1a1a1a] tracking-tighter">{tariff.title}</h4>
      </div>
      <div className="w-full overflow-hidden rounded-[35px] border border-gray-100 shadow-sm bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1a1a1a] text-white">
              <th className="p-7 text-[11px] font-black uppercase italic tracking-widest">{t('securities_page.table.currency')}</th> {/* Փոխված է */}
              <th className="p-7 text-[11px] font-black uppercase italic tracking-widest">{t('securities_page.table.rate')}</th> {/* Փոխված է */}
            </tr>
          </thead>
          <tbody className="text-[#1a1a1a] font-bold italic uppercase text-[13px]">
            <tr className="border-b border-gray-50">
              <td className="p-7 bg-[#f8f9fb]">Գործարքների սպասարկման միջնորդավճար</td>
              <td className="p-7 text-[#6610f2]">{tariff.commission}</td>
            </tr>
            <tr>
              <td className="p-7 bg-white">Միացման վճար</td>
              <td className="p-7 text-[#6610f2]">0 ֏</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-400 text-[11px] font-semibold italic uppercase tracking-wider pb-6 border-b border-gray-100">
        * {t('exchange.disclaimer')} {/* Օգտագործում է disclaimer-ի տեքստը */}
      </p>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
      case 1:
      case 4:
        const isVPOS = activeTab === 0;
        const isMPOS = activeTab === 4;
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16 pb-20">
            <section className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <h3 className="text-4xl md:text-5xl font-[1000] italic uppercase text-[#1a1a1a] tracking-tighter leading-tight">
                  {isVPOS ? "V-POS Տերմինալ" : isMPOS ? "Evoca Mobile POS mPOS" : "POS Տերմինալներ"}
                </h3>
                <p className="text-[#4d4d4d] text-lg font-medium leading-relaxed">
                  {isVPOS 
                    ? "V-POS (Virtual POS) տերմինալը ժամանակակից լուծում է այն բիզնեսների համար, որոնք ցանկանում են ընդունել անկանխիկ վճարումներ համացանցում՝ կայքերի կամ բջջային հավելվածների միջոցով։"
                    : isMPOS 
                    ? "Ձեր սմարթֆոնը դարձրեք POS տերմինալ: mPOS լուծումը թույլ է տալիս ընդունել անհպում քարտային վճարումներ անմիջապես Android սմարթֆոնի միջոցով։"
                    : "POS տերմինալների միջոցով Ձեր հաճախորդները կարող են կատարել վճարումներ հաշված վայրկյանների ընթացքում՝ օգտագործելով իրենց քարտերը կամ սմարթֆոնները։"}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                    <CheckCircle2 size={18} className="text-[#6610f2]" />
                    <span className="text-[#1a1a1a] font-bold text-sm uppercase italic">{t('menu.advantages')}</span> {/* Փոխված է */}
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                    <CheckCircle2 size={18} className="text-[#6610f2]" />
                    <span className="text-[#1a1a1a] font-bold text-sm uppercase italic">{t('common.support')}</span> {/* Փոխված է */}
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-[500px] h-[350px] rounded-[50px] overflow-hidden shadow-2xl relative shrink-0">
                <img 
                  src={isVPOS ? "https://www.evoca.am/images-cache/menu/1/16158111599306/780x585.jpg" : isMPOS ? "https://www.evoca.am/images-cache/menu/1/16697156723793/780x585.png" : "https://www.evoca.am/images-cache/menu/1/16158085302978/780x585.jpg"} 
                  className="w-full h-full object-cover" 
                  alt="Terminal" 
                />
              </div>
            </section>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16 pb-20">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-[1000] italic uppercase text-[#1a1a1a] tracking-tighter">{t('menu.rates')}</h3> {/* Փոխված է */}
              <p className="text-gray-500 font-medium text-lg italic">{t('other_services.extra.references_desc')}</p> {/* Փոխված է */}
            </div>
            <div className="grid grid-cols-1 gap-16">
              {tariffs.map(tariff => renderTariffTable(tariff))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (loading) return <div className="py-40 text-center font-[1000] italic text-[#6610f2] animate-pulse uppercase">{t('menu.loading')}</div>;

  return (
    <div className="w-full bg-white font-sans py-20 lg:py-32">
      <div className="max-w-[1450px] mx-auto px-6">
        <div className="mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[#6610f2] text-[11px] font-[900] uppercase tracking-[0.4em] block mb-4">{t('menu.business_label')}</motion.span>
          <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="text-[55px] md:text-[100px] font-[1000] italic uppercase text-[#1a1a1a] tracking-tighter leading-[0.8]">Digital</motion.h2>
        </div>

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
                <span className="text-[#6610f2]">{iconMap[tab.icon_type]}</span>
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

      {activeTab !== 2 && (
        <>
          <div className="w-full bg-[#6610f2] py-24 relative overflow-hidden mt-20">
            <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center relative z-10 text-white">
              <div className="w-full md:w-1/2 relative h-[400px]">
                <motion.img initial={{ x: -150, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} src="https://www.evoca.am/images-cache/banners/1/16170067683633/485x304.jpg" className="absolute left-0 top-0 w-[80%] rounded-xl shadow-2xl" />
                <motion.img initial={{ y: 150, opacity: 0, scale: 0.5 }} whileInView={{ y: 0, opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} src="https://www.evoca.am/images-cache/banners/1/16153622710205/140x300.jpg" className="absolute right-10 bottom-0 w-[30%] z-20 border-4 border-[#1a1a1a] rounded-[2rem]" />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left mt-10 md:mt-0">
                <h2 className="text-[36px] md:text-[48px] font-black uppercase italic mb-6">{t('other_services.banner.title')}</h2>
                <p className="text-white/80 mb-8 text-lg">{t('other_services.banner.desc')}</p>
                <button className="bg-white text-[#6610f2] px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:bg-gray-100 transition-colors">{t('other_services.banner.btn')}</button>
              </div>
            </div>
          </div>

          <div className="max-w-[1140px] mx-auto px-4 py-24 bg-[#fcfcfc]">
            <div className="flex justify-center gap-2 mb-12">
              {[1, 2, 3, 4, 5].map(s => (
                <motion.span key={s} initial={{ opacity: 0, rotate: -180 }} whileInView={{ opacity: 1, rotate: 0 }} transition={{ delay: s * 0.1 }} className="text-yellow-400 text-4xl">★</motion.span>
              ))}
            </div>

            <Swiper modules={[Pagination, Autoplay, EffectFade]} effect="fade" fadeEffect={{ crossFade: true }} speed={1000} autoplay={{ delay: 5000 }} pagination={{ clickable: true }} className="pb-20">
              {testimonials.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
                    <div className="relative inline-block">
                      <span className="text-[80px] text-[#6610f2]/10 absolute -left-10 -top-10 font-serif">“</span>
                      <p className="text-[20px] md:text-[26px] font-medium italic leading-relaxed text-gray-700 relative z-10 px-6">
                        {t.text}
                      </p>
                      <span className="text-[80px] text-[#6610f2]/10 absolute -right-10 bottom-0 font-serif">”</span>
                    </div>
                    <div className="mt-10">
                      <h4 className="text-[#6610f2] font-black text-xl uppercase tracking-tighter">{t.name}</h4>
                      <p className="text-gray-400 text-xs uppercase tracking-[0.3em] mt-2">{t.role}</p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .swiper-pagination-bullet { width: 40px; height: 4px; border-radius: 2px; transition: all 0.5s !important; }
        .swiper-pagination-bullet-active { background: #6610f2 !important; width: 60px; }
      `}</style>
    </div>
  );
};

export default Digital;
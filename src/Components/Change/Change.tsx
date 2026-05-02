import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

// Firebase
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

interface Currency {
  code: string;
  name: string;
  buy: number;
  sell: number;
  flag: string;
  symbol: string;
}

interface GoldRate {
  purity: number;
  price: string | number;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

const DynamicExchange: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('cash');
  const [amount, setAmount] = useState<string>('1000');
  
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [goldRates, setGoldRates] = useState<GoldRate[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCurrency, setSelectedCurrency] = useState({
    code: 'USD',
    sell: 394.0,
    symbol: '$'
  });

  useEffect(() => {
    const currentLang = i18n.language.includes('hy') ? 'am' : 'en';
    const dataRef = ref(db, `change_${currentLang}`);
    
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const currencyList = Array.isArray(data.currencies) ? data.currencies : Object.values(data.currencies || {});
        setCurrencies(currencyList as Currency[]);
        
        if (data.goldRates) setGoldRates(Object.values(data.goldRates));
        if (data.testimonials) setTestimonials(Object.values(data.testimonials));
        
        const usd = (currencyList as Currency[]).find(c => c.code === 'USD');
        if (usd) setSelectedCurrency({ code: usd.code, sell: usd.sell, symbol: usd.symbol });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [i18n.language]);

  const calculateResult = () => {
    const numAmount = Number(amount.replace(/,/g, ''));
    if (isNaN(numAmount) || numAmount === 0) return "0";
    return (numAmount / selectedCurrency.sell).toFixed(2);
  };

  if (loading) return <div className="py-20 text-center font-black text-[#7d2ae8] uppercase italic animate-pulse">{t('exchange.loading')}</div>;

  return (
    <section className="py-16 px-4 md:px-20 max-w-[1440px] mx-auto bg-white font-sans">
      <div className="flex flex-col lg:flex-row gap-12">
        
        <div className="flex-1">
          <p className="text-[#1a1a1a] text-[13px] font-medium opacity-70 mb-8 max-w-3xl leading-relaxed">
            {t('exchange.disclaimer')}
          </p>

          <div className="bg-[#f9f9fb] rounded-[40px] p-4 md:p-10 border border-gray-100">
            <div className="flex bg-white rounded-2xl p-1.5 mb-10 w-fit shadow-sm">
              {['cash', 'cashless', 'gold'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab ? 'bg-[#7d2ae8] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {t(`exchange.tabs.${tab}`)}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab !== 'gold' ? (
                <motion.div
                  key="currency-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col xl:flex-row gap-10"
                >
                  <div className="flex-1">
                    <div className="grid grid-cols-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-5 px-6">
                      <div>{t('exchange.table.currency')}</div>
                      <div className="text-center">{t('exchange.table.buy')}</div>
                      <div className="text-center">{t('exchange.table.sell')}</div>
                    </div>
                    <div className="space-y-3">
                      {currencies.map((curr) => (
                        <div 
                          key={curr.code} 
                          onClick={() => setSelectedCurrency({ code: curr.code, sell: curr.sell, symbol: curr.symbol })}
                          className={`grid grid-cols-3 items-center p-5 rounded-[24px] border transition-all cursor-pointer group ${
                            selectedCurrency.code === curr.code ? 'bg-white border-[#7d2ae8] shadow-md' : 'bg-white border-transparent hover:border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{curr.flag}</span>
                            <span className="font-bold text-[#1a1a1a]">{curr.code}</span>
                          </div>
                          <div className="text-center font-bold text-[#1a1a1a]">{curr.buy}</div>
                          <div className="text-center font-bold text-[#1a1a1a]">{curr.sell}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full xl:w-80 flex flex-col gap-4 justify-center">
                    <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm focus-within:border-[#7d2ae8] transition-all">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">{t('exchange.calc.have')} (AMD)</label>
                      <div className="flex justify-between items-center">
                        <input 
                          type="text" 
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="bg-transparent font-black text-3xl text-[#1a1a1a] w-full outline-none" 
                        />
                        <span className="text-[#7d2ae8] font-bold text-xl">֏</span>
                      </div>
                    </div>

                    <div className="bg-[#f0e7ff]/30 p-7 rounded-[32px] border border-[#7d2ae8]/10 shadow-inner">
                      <label className="text-[10px] font-black text-[#7d2ae8] uppercase tracking-widest block mb-2">
                        {t('exchange.calc.get')} ({selectedCurrency.code})
                      </label>
                      <div className="flex justify-between items-center">
                        <input 
                          type="text" 
                          readOnly
                          value={calculateResult()}
                          className="bg-transparent font-black text-3xl text-[#1a1a1a] w-full outline-none" 
                        />
                        <span className="text-[#7d2ae8] font-bold text-xl">{selectedCurrency.symbol}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-center text-gray-400 font-medium">
                      {t('exchange.calc.info', { code: selectedCurrency.code, rate: selectedCurrency.sell })}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="gold-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm"
                >
                  <div className="grid grid-cols-2 bg-gray-50/50 p-5 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <div className="pl-4">{t('exchange.gold.purity')}</div>
                    <div>{t('exchange.gold.price')}</div>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {goldRates.map((rate) => (
                      <div key={rate.purity} className="grid grid-cols-2 p-5 hover:bg-[#7d2ae8]/5 transition-colors">
                        <div className="pl-4 font-bold text-[#1a1a1a]">{rate.purity}</div>
                        <div className="font-bold text-[#1a1a1a]">{rate.price} AMD</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full lg:w-[350px]">
          <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">{t('exchange.address.title')}</h3>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">{t('exchange.address.desc')}</p>
          
          <div className="block group relative overflow-hidden rounded-[40px] shadow-lg cursor-pointer">
            <div className="absolute inset-0 bg-[#7d2ae8]/5 group-hover:bg-transparent transition-colors z-10"></div>
            <img 
              src="https://scontent.fevn2-1.fna.fbcdn.net/v/t39.30808-6/486292077_1087632580068124_5141256942071665595_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_ohc=oOv1ZfWOa_QQ7kNvwG4ZDa3&_nc_oc=AdpO7qOX150Ykdk3QhPRNWK5fo4HfiTEBbMquch00TzVIZ5tECFH7plbJM46175PB4zkztdkNNMi_UDcPEEh952q&_nc_zt=23&_nc_ht=scontent.fevn2-1.fna&_nc_gid=f0bhC4q6d5ks-YKgt4JT2Q&_nc_ss=7b289&oh=00_Af0kKdc7SEb4Dj0mK9cpwlAQqt0Uu8mE158NJ_ID5bYv8Q&oe=69F2DBCC" 
              alt="Evoca Map" 
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="bg-[#7d2ae8] p-4 rounded-full shadow-[0_0_30px_rgba(125,42,232,0.4)] text-white animate-bounce">
                <MapPin size={32} fill="currentColor" />
              </div>
            </div>
          </div>
          
          <button className="mt-8 w-full py-4 bg-[#f0e7ff] text-[#7d2ae8] rounded-full font-black text-sm flex items-center justify-center gap-2 hover:bg-[#7d2ae8] hover:text-white transition-all">
            {t('exchange.address.btn')} <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 py-24 bg-[#fcfcfc] mt-16 rounded-[40px]">
        <div className="flex justify-center gap-2 mb-12">
            {[1, 2, 3, 4, 5].map(s => (
                <span key={s} className="text-yellow-400 text-4xl">★</span>
            ))}
        </div>

        <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1000}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            className="pb-20"
        >
            {testimonials.map((t, idx) => (
                <SwiperSlide key={idx}>
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="relative inline-block">
                            <span className="text-[80px] text-[#6610f2]/10 absolute -left-10 -top-10 font-serif">“</span>
                            <p className="text-[20px] md:text-[26px] font-medium italic leading-relaxed text-gray-700 relative z-10 px-6">
                                {t.text}
                            </p>
                            <span className="text-[80px] text-[#6610f2]/10 absolute -right-10 bottom-0 font-serif">”</span>
                        </div>
                        <div className="mt-10">
                            <h4 className="text-[#7d2ae8] font-black text-xl uppercase tracking-tighter">{t.name}</h4>
                            <p className="text-gray-400 text-xs uppercase tracking-[0.3em] mt-2">{t.role}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet { width: 40px; height: 4px; border-radius: 2px; transition: all 0.5s !important; }
        .swiper-pagination-bullet-active { background: #7d2ae8 !important; width: 60px; }
      `}</style>
    </section>
  );
};

export default DynamicExchange;
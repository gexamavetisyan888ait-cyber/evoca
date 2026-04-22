import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin ,FileText, Download, Monitor, Smartphone, } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const DynamicExchange: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cashless');
  const [amount, setAmount] = useState<string>('0');
  const [selectedCurrency, setSelectedCurrency] = useState({
    code: 'USD',
    sell: 394.0,
    symbol: '$'
  });
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

  const currencies = [
    { code: 'USD', name: 'ԱՄՆ դոլար', buy: 388.0, sell: 394.0, flag: '🇺🇸', symbol: '$' },
    { code: 'EUR', name: 'Եվրո', buy: 412.0, sell: 424.0, flag: '🇪🇺', symbol: '€' },
    { code: 'RUB', name: 'Ռուսական ռուբլի', buy: 4.12, sell: 4.35, flag: '🇷🇺', symbol: '₽' },
  ];

  const goldRates = [
    { purity: 375, price: '21,100' },
    { purity: 500, price: '28,200' },
    { purity: 583, price: '32,900' },
    { purity: 750, price: '42,300' },
    { purity: 999, price: '56,400' },
  ];

  const calculateResult = () => {
    const numAmount = Number(amount.replace(/,/g, ''));
    if (isNaN(numAmount) || numAmount === 0) return "0";
    return (numAmount / selectedCurrency.sell).toFixed(2);
  };

  return (
    <section className="py-16 px-4 md:px-20 max-w-[1440px] mx-auto bg-white font-sans">
      <div className="flex flex-col lg:flex-row gap-12">
        
        <div className="flex-1">
          <p className="text-[#1a1a1a] text-[13px] font-medium opacity-70 mb-8 max-w-3xl">
            20,000 ԱՄՆ դոլարից ավել կամ դրան հարժեք այլ արտարժույթի փոխարկման դեպքում գործարքը հաստատվում է Բանկի հայեցողությամբ և Բանկի կողմից որոշված փոխարժեքով:
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
                  {tab === 'cash' ? 'Կանխիկ' : tab === 'cashless' ? 'Անկանխիկ' : 'Ոսկու փոխարժեք'}
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
                      <div>Արժույթ</div>
                      <div className="text-center">Առք</div>
                      <div className="text-center">Վաճառք</div>
                    </div>
                    <div className="space-y-3">
                      {currencies.map((curr) => (
                        <div 
                          key={curr.code} 
                          onClick={() => setSelectedCurrency({ code: curr.code, sell: curr.sell, symbol: curr.symbol })}
                          className={`grid grid-cols-3 items-center p-5 rounded-[24px] border transition-all cursor-pointer group ${
                            selectedCurrency.code === curr.code 
                            ? 'bg-white border-[#7d2ae8] shadow-md' 
                            : 'bg-white border-transparent hover:border-gray-200'
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

                  {/* DYNAMIC CONVERTER */}
                  <div className="w-full xl:w-80 flex flex-col gap-4 justify-center">
                    <div className="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm focus-within:border-[#7d2ae8] transition-all">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Ունեմ (AMD)</label>
                      <div className="flex justify-between items-center">
                        <input 
                          type="text" 
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          onFocus={() => amount === '0' && setAmount('')}
                          onBlur={() => amount === '' && setAmount('0')}
                          className="bg-transparent font-black text-3xl text-[#1a1a1a] w-full outline-none" 
                        />
                        <span className="text-[#7d2ae8] font-bold text-xl">֏</span>
                      </div>
                    </div>

                    <div className="bg-[#f0e7ff]/30 p-7 rounded-[32px] border border-[#7d2ae8]/10 shadow-inner">
                      <label className="text-[10px] font-black text-[#7d2ae8] uppercase tracking-widest block mb-2">
                        Կստանամ ({selectedCurrency.code})
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
                      * Հաշվարկը կատարվում է {selectedCurrency.code} վաճառքի փոխարժեքով ({selectedCurrency.sell})
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
                    <div className="pl-4">Հարգ</div>
                    <div>Արժեքը (1 գրամ)</div>
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
          <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">Մեր հասցեները</h3>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">Բանկի հասցեները, աշխատաժամերը և բանկոմատները:</p>
          
          <a 
            href="https://www.evoca.am/en/branches-and-atms" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block group relative overflow-hidden rounded-[40px] shadow-lg"
          >
            <div className="absolute inset-0 bg-[#7d2ae8]/5 group-hover:bg-transparent transition-colors z-10"></div>
            <img 
              src="https://www.evoca.am/static/media/map-sample.png" 
              alt="Evoca Map" 
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="bg-[#7d2ae8] p-4 rounded-full shadow-[0_0_30px_rgba(125,42,232,0.4)] text-white animate-bounce">
                <MapPin size={32} fill="currentColor" />
              </div>
            </div>
          </a>
          
          <button className="mt-8 w-full py-4 bg-[#f0e7ff] text-[#7d2ae8] rounded-full font-black text-sm flex items-center justify-center gap-2 hover:bg-[#7d2ae8] hover:text-white transition-all">
            ԴԻՏԵԼ ՔԱՐՏԵԶԸ <ChevronRight size={18} />
          </button>
        </div>

      </div>

            <div className="max-w-[1140px] mx-auto px-4 py-24 bg-[#fcfcfc]">
                <div className="flex justify-center gap-2 mb-12">
                    {[1, 2, 3, 4, 5].map(s => (
                        <motion.span 
                            key={s}
                            initial={{ opacity: 0, rotate: -180 }}
                            whileInView={{ opacity: 1, rotate: 0 }}
                            transition={{ delay: s * 0.1 }}
                            className="text-yellow-400 text-4xl"
                        >
                            ★
                        </motion.span>
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
                            <motion.div 
                                // Սա ստիպում է անիմացիային աշխատել ամեն սլայդը փոխելիս
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="text-center max-w-3xl mx-auto"
                            >
                                <div className="relative inline-block">
                                    <span className="text-[80px] text-[#6610f2]/10 absolute -left-10 -top-10 font-serif">“</span>
                                    <p className="text-[20px] md:text-[26px] font-medium italic leading-relaxed text-gray-700 relative z-10 px-6">
                                        {t.text}
                                    </p>
                                    <span className="text-[80px] text-[#6610f2]/10 absolute -right-10 bottom-0 font-serif">”</span>
                                </div>
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-10"
                                >
                                    <h4 className="text-[#6610f2] font-black text-xl uppercase tracking-tighter">{t.name}</h4>
                                    <p className="text-gray-400 text-xs uppercase tracking-[0.3em] mt-2">{t.role}</p>
                                </motion.div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
    </section>
    
  );
};

export default DynamicExchange;
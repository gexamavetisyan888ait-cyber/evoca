import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Ավելացված է

type TabType = 'evoca' | 'special';

interface AccordionProps {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionProps> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border border-purple-200 rounded-xl mb-4 overflow-hidden bg-white shadow-sm transition-all duration-300">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`w-2 h-2 rounded-full shrink-0 ${isOpen ? 'bg-[#6610f2]' : 'bg-gray-300'}`} />
          <span className="font-bold text-[#2d2d2d] text-base md:text-lg uppercase tracking-tight leading-tight">
            {title}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="text-[#6610f2] shrink-0" size={20} />
        ) : (
          <ChevronDown className="text-gray-400 shrink-0" size={20} />
        )}
      </button>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-5 md:p-8 border-t border-purple-50 text-[#4a4a4a] text-sm md:text-base leading-relaxed overflow-x-auto">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Leasing: React.FC = () => {
  const { t } = useTranslation(); // Ավելացված է
  const [activeTab, setActiveTab] = useState<TabType>('evoca');
  const [openSection, setOpenSection] = useState<string | null>('main');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1a1a1a] pb-20">
      
      <div className="w-full bg-[#6610f2] sticky top-0 md:top-20 z-40 overflow-x-auto scrollbar-hide">
        <div className="max-w-[1200px] mx-auto flex whitespace-nowrap">
          {[
            { id: 'evoca', label: t('leasing.tabs.evoca') },
            { id: 'special', label: t('leasing.tabs.special') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-6 md:px-10 py-4 text-[12px] font-bold uppercase transition-all border-b-4 ${
                activeTab === tab.id 
                  ? 'bg-[#520dc2] border-white text-white' 
                  : 'border-transparent text-white/70 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="animate-in fade-in duration-500"
        >
          <h1 className="text-[28px] md:text-[40px] font-black uppercase mb-8 italic leading-none">
            {activeTab === 'evoca' ? t('leasing.tabs.evoca') : t('leasing.tabs.special')}
          </h1>

          <h2 className="text-lg font-bold text-gray-400 mb-8 uppercase tracking-widest">
            {t('leasing.necessary_info')}
          </h2>

          {activeTab === 'evoca' ? (
            <div className="space-y-4">
              <AccordionItem 
                title={t('leasing.tabs.evoca')} 
                isOpen={openSection === 'main'} 
                onClick={() => toggleSection('main')}
              >
                <p className="mb-6">{t('leasing.evoca_main.desc')}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-bold text-[#6610f2] mb-3 uppercase text-xs tracking-wider">{t('leasing.evoca_main.objects_title')}</h4>
                    <ul className="space-y-2">
                      {(t('leasing.evoca_main.objects', { returnObjects: true }) as string[]).map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#6610f2] mb-3 uppercase text-xs tracking-wider">{t('leasing.evoca_main.advantages_title')}</h4>
                    <ul className="space-y-2">
                      {(t('leasing.evoca_main.advantages', { returnObjects: true }) as string[]).map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="overflow-hidden border border-gray-100 rounded-xl shadow-sm">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr><th colSpan={2} className="p-4 font-bold text-[#2d2d2d]">{t('leasing.evoca_main.table_head')}</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        { label: t('leasing.table.currency'), value: t('leasing.table.currency_val') },
                        { label: t('leasing.table.prepayment'), value: t('leasing.table.prepayment_val') },
                        { label: t('leasing.table.term'), value: t('leasing.table.term_val') },
                        { label: t('leasing.table.rate'), value: 'AMD: 10.5% | USD: 8% | EUR: 6%' },
                      ].map((row) => (
                        <tr key={row.label} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 bg-gray-50/50 font-medium text-gray-500 w-1/3">{row.label}</td>
                          <td className="p-4 text-gray-800 font-semibold">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AccordionItem>

              <AccordionItem 
                title={t('leasing.modernization.title')} 
                isOpen={openSection === 'modern'} 
                onClick={() => toggleSection('modern')}
              >
                <div className="bg-purple-50 p-4 rounded-lg mb-4 text-sm text-purple-800 font-bold">
                   {t('leasing.modernization.date')}
                </div>
                <p className="text-gray-600 text-sm">{t('leasing.modernization.desc')}</p>
              </AccordionItem>
            </div>
          ) : (
            <div className="space-y-4">
              <AccordionItem 
                title={t('leasing.special_offers.logiq.title')} 
                isOpen={openSection === 'logiq'} 
                onClick={() => toggleSection('logiq')}
              >
                <p className="mb-6 font-medium text-[#6610f2]">{t('leasing.special_offers.logiq.subtitle')}</p>
                <div className="relative overflow-x-auto border border-purple-100 rounded-xl shadow-md">
                  <table className="w-full text-center border-collapse min-w-[500px]">
                    <thead className="bg-[#6610f2] text-white">
                      <tr>
                        <th className="p-4 border-r border-white/20 text-xs uppercase font-black">AMD</th>
                        <th className="p-4 border-r border-white/20 text-xs uppercase font-black">USD</th>
                        <th className="p-4 border-r border-white/20 text-xs uppercase font-black">EUR</th>
                        <th className="p-4 text-xs uppercase font-black">{t('leasing.table.term_month')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-50">
                      {[
                        { a: "5.0%", u: "0.0%", e: "0.0%", m: "12" },
                        { a: "8.5%", u: "5.0%", e: "4.0%", m: "24" },
                        { a: "10.0%", u: "6.0%", e: "5.0%", m: "36" },
                        { a: "11.5%", u: "7.5%", e: "7.0%", m: "60" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-purple-50 transition-colors">
                          <td className="p-4 border-r border-purple-50 font-bold">{row.a}</td>
                          <td className="p-4 border-r border-purple-50 font-bold">{row.u}</td>
                          <td className="p-4 border-r border-purple-50 font-bold">{row.e}</td>
                          <td className="p-4 font-black text-[#6610f2]">{row.m}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AccordionItem>

              <AccordionItem 
                title={t('leasing.special_offers.auto.title')} 
                isOpen={openSection === 'auto'} 
                onClick={() => toggleSection('auto')}
              >
                <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-purple-300">
                  <h3 className="font-bold text-xl mb-6 text-center">{t('leasing.special_offers.auto.subtitle')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-purple-100 text-center">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">{t('leasing.table.rate_short')}</p>
                      <p className="text-2xl font-black text-[#6610f2]">0.1%</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-purple-100 text-center">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">{t('leasing.table.term_short')}</p>
                      <p className="text-2xl font-black text-[#6610f2]">36 {t('leasing.table.month_short')}</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-purple-100 text-center">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">{t('leasing.table.prepayment_short')}</p>
                      <p className="text-2xl font-black text-[#6610f2]">5%</p>
                    </div>
                  </div>
                </div>
              </AccordionItem>
            </div>
          )}

          <div className="mt-16 flex flex-col md:flex-row justify-between items-center border-t pt-8 gap-6">
             <p className="text-gray-400 text-[11px] tracking-widest uppercase font-bold">
               {t('leasing.last_update')}՝ 14.05.2025 10:01
             </p>
             <button className="flex items-center gap-2 bg-[#f0f0f0] px-8 py-3 rounded-full font-black text-[12px] uppercase hover:bg-[#6610f2] hover:text-white transition-all">
               {t('leasing.details')} <ChevronRight size={16} />
             </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leasing;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, FileText, Download, ExternalLink } from 'lucide-react';

const Securities: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const tabs = [
        "Ներդրումային ծառայություններ",
        "Պարտատոմսեր",
        "ՀԿԾ ծառայություններ",
        "Ռեպո/Հակադարձ Ռեպո",
        "EvocaINVEST"
    ];

    return (
        <div className="w-full bg-white font-sans text-[#1a1a1a]">
            {/* Header / Breadcrumbs */}
            <div className="max-w-[1140px] mx-auto px-4 pt-10">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-8 font-bold">
                    <span>Անհատ</span> <ChevronRight size={10} /> <span className="text-gray-800">Արժեթղթեր</span>
                </div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[36px] md:text-[50px] font-[900] italic uppercase leading-none mb-12 tracking-tighter"
                >
                    Արժեթղթեր
                </motion.h1>

                {/* Main Tabs Navigation */}
                <div className="flex gap-8 border-b border-gray-100 mb-16 overflow-x-auto no-scrollbar">
                    {tabs.map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setActiveTab(idx); setOpenAccordion(null); }}
                            className={`pb-4 text-[13px] font-black uppercase italic tracking-wider whitespace-nowrap relative transition-all ${
                                activeTab === idx ? "text-[#6610f2]" : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            {tab}
                            {activeTab === idx && (
                                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6610f2]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-[1140px] mx-auto px-4 pb-24">
                <AnimatePresence mode="wait">
                    {/* SECTION 1: ՆԵՐԴՐՈՒՄԱՅԻՆ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ */}
                    {activeTab === 0 && (
                        <motion.div key="sec1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                            <div className="relative w-full h-[300px] md:h-[450px] rounded-[50px] overflow-hidden flex items-center px-8 md:px-16">
                                <div className="absolute inset-0 z-0">
                                    <img 
                                        src="https://www.evoca.am/images-cache/menu/1/16783548543339/780x585.jpg" 
                                        className="w-full h-full object-cover" 
                                        alt="Investment Services" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                                </div>
                                <div className="relative z-10 max-w-xl">
                                    <h2 className="text-white text-[32px] md:text-[45px] font-[900] italic uppercase leading-tight">
                                        Ներդրումային <br /> ծառայություններ
                                    </h2>
                                </div>
                            </div>

                            <div className="max-w-4xl space-y-6">
                                <p className="text-[#1a1a1a] text-[18px] font-medium leading-relaxed">
                                    Evocabank-ն առաջարկում է ներդրումային ծառայությունների լայն ընտրանի՝ ապահովելով Ձեր միջոցների արդյունավետ կառավարումը տեղական և միջազգային շուկաներում:
                                </p>
                                <p className="text-gray-500 text-[16px] leading-relaxed">
                                    Մեր մասնագետները կօգնեն Ձեզ կողմնորոշվել արժեթղթերի շուկայում և իրականացնել գործարքներ բաժնետոմսերով, պարտատոմսերով և այլ ֆինանսական գործիքներով:
                                </p>
                            </div>

                            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
                                <AccordionItem 
                                    title="ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ" 
                                    isOpen={openAccordion === 1} 
                                    toggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
                                    docs={["Ներդրումային ծառայությունների սակագներ", "Հաճախորդների դասակարգման քաղաքականություն", "Շահերի բախման կանխարգելման քաղաքականություն"]}
                                />
                                <AccordionItem 
                                    title="ՊԱՅՄԱՆԱԳՐԵՐԻ ՕՐԻՆԱԿԵԼԻ ՁԵՎԵՐ" 
                                    isOpen={openAccordion === 2} 
                                    toggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
                                    docs={["Բրոքերային ծառայությունների մատուցման պայմանագիր", "Պահառության պայմանագիր"]}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* SECTION 2: ՊԱՐՏԱՏՈՄՍԵՐ */}
                    {activeTab === 1 && (
                        <motion.div key="sec2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                            <div className="relative w-full h-[300px] md:h-[450px] rounded-[50px] overflow-hidden flex items-center px-8 md:px-16">
                                <div className="absolute inset-0 z-0">
                                    <img 
                                        src="https://www.evoca.am/images-cache/menu/1/16783548543339/780x585.jpg" 
                                        className="w-full h-full object-cover" 
                                        alt="Bonds" 
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                </div>
                                <div className="relative z-10">
                                    <h2 className="text-white text-[32px] md:text-[45px] font-[900] italic uppercase leading-tight">
                                        Պարտատոմսեր
                                    </h2>
                                </div>
                            </div>

                            <div className="max-w-4xl">
                                <p className="text-[#1a1a1a] text-[18px] font-medium leading-relaxed mb-10">
                                    Ձեռք բերեք Evocabank-ի կողմից թողարկված պարտատոմսեր և ստացեք երաշխավորված եկամուտ:
                                </p>

                                {/* Table Section */}
                                <div className="overflow-x-auto mb-16 shadow-sm rounded-3xl border border-gray-100">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#f8f9fb]">
                                                <th className="p-6 text-[11px] font-black uppercase italic text-gray-400">Տրանշ</th>
                                                <th className="p-6 text-[11px] font-black uppercase italic text-gray-400">Արժույթ</th>
                                                <th className="p-6 text-[11px] font-black uppercase italic text-gray-400">Տոկոսադրույք</th>
                                                <th className="p-6 text-[11px] font-black uppercase italic text-gray-400">Ժամկետ</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            <tr>
                                                <td className="p-6 text-[14px] font-bold">2024-1</td>
                                                <td className="p-6 text-[14px] font-bold text-[#6610f2]">AMD</td>
                                                <td className="p-6 text-[14px] font-bold">11%</td>
                                                <td className="p-6 text-[14px] font-bold text-gray-500">24 ամիս</td>
                                            </tr>
                                            <tr>
                                                <td className="p-6 text-[14px] font-bold">2024-2</td>
                                                <td className="p-6 text-[14px] font-bold text-[#6610f2]">USD</td>
                                                <td className="p-6 text-[14px] font-bold">4.5%</td>
                                                <td className="p-6 text-[14px] font-bold text-gray-500">36 ամիս</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
                                <AccordionItem 
                                    title="ԹՈՂԱՐԿՄԱՆ ՊԱՅՄԱՆՆԵՐ" 
                                    isOpen={openAccordion === 3} 
                                    toggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
                                    docs={["Ծրագրային ազդագիր", "Թողարկման վերջնական պայմաններ (AMD)", "Թողարկման վերջնական պայմաններ (USD)"]}
                                />
                                <AccordionItem 
                                    title="ԱՐԺԵԿՏՐՈՆՆԵՐԻ ՎՃԱՐՈՒՄՆԵՐ" 
                                    isOpen={openAccordion === 4} 
                                    toggle={() => setOpenAccordion(openAccordion === 4 ? null : 4)}
                                    content="Արժեկտրոնների վճարումն իրականացվում է եռամսյակային պարբերականությամբ՝ պարտատոմսերի թողարկման պայմաններով սահմանված օրերին:"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        </div>
    );
};

// Internal Accordion Sub-component
const AccordionItem = ({ title, content, docs, isOpen, toggle }: any) => (
    <div className="py-2">
        <button onClick={toggle} className="w-full py-8 flex items-center justify-between text-left group">
            <span className={`text-[17px] font-black uppercase italic transition-colors ${isOpen ? "text-[#6610f2]" : "text-gray-800"}`}>
                {title}
            </span>
            <motion.div 
                animate={{ rotate: isOpen ? 180 : 0 }} 
                className={`p-2 rounded-full ${isOpen ? "bg-[#6610f2] text-white" : "bg-gray-100 text-gray-400"}`}
            >
                <ChevronDown size={20} />
            </motion.div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="pb-10 space-y-4">
                        {content && <p className="text-gray-500 text-[16px] leading-relaxed max-w-3xl">{content}</p>}
                        {docs && docs.map((doc: string, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-5 bg-[#f8f9fb] rounded-2xl cursor-pointer hover:bg-[#f1edff] transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                        <FileText size={20} className="text-[#6610f2]" />
                                    </div>
                                    <span className="text-[14px] font-bold text-gray-800">{doc}</span>
                                </div>
                                <Download size={20} className="text-gray-300 group-hover:text-[#6610f2] transition-colors" />
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default Securities;
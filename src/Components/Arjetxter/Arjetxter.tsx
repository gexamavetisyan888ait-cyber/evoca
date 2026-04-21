import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, FileText, Download, ExternalLink, ShieldCheck, PieChart, Smartphone } from 'lucide-react';

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
                    {/* SECTION 0: ՆԵՐԴՐՈՒՄԱՅԻՆ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ */}
                    {activeTab === 0 && (
                        <motion.div key="sec0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                            <div className="relative w-full h-[300px] md:h-[450px] rounded-[50px] overflow-hidden flex items-center px-8 md:px-16">
                                <div className="absolute inset-0 z-0">
                                    <img src="https://www.evoca.am/images-cache/menu/1/16783474498811/780x585.jpg" className="w-full h-full object-cover" alt="Investment" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                                </div>
                                <h2 className="relative z-10 text-white text-[32px] md:text-[45px] font-[900] italic uppercase leading-tight">Ներդրումային <br /> ծառայություններ</h2>
                            </div>
                            <div className="max-w-4xl space-y-6">
                                <p className="text-[#1a1a1a] text-[18px] font-medium leading-relaxed">Evocabank-ն առաջարկում է ներդրումային ծառայությունների լայն ընտրանի:</p>
                            </div>
                            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
                                <AccordionItem title="ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ" isOpen={openAccordion === 1} toggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)} docs={["Ներդրումային ծառայությունների սակագներ", "Հաճախորդների դասակարգման քաղաքականություն"]} />
                            </div>
                        </motion.div>
                    )}

                    {/* SECTION 1: ՊԱՐՏԱՏՈՄՍԵՐ */}
                    {activeTab === 1 && (
                        <motion.div key="sec1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                            <div className="relative w-full h-[300px] md:h-[450px] rounded-[50px] overflow-hidden flex items-center px-8 md:px-16">
                                <div className="absolute inset-0 z-0">
                                    <img src="https://www.evoca.am/images-cache/menu/1/16783474498811/780x585.jpg" className="w-full h-full object-cover" alt="Bonds" />
                                    <div className="absolute inset-0 bg-black/40" />
                                </div>
                                <h2 className="relative z-10 text-white text-[32px] md:text-[45px] font-[900] italic uppercase leading-tight">Պարտատոմսեր</h2>
                            </div>
                            <div className="overflow-x-auto shadow-sm rounded-3xl border border-gray-100">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#f8f9fb]">
                                            <th className="p-6 text-[11px] font-black uppercase italic text-gray-400">Տրանշ</th>
                                            <th className="p-6 text-[11px] font-black uppercase italic text-gray-400">Արժույթ</th>
                                            <th className="p-6 text-[11px] font-black uppercase italic text-gray-400">Տոկոսադրույք</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        <tr><td className="p-6 font-bold">2024-1</td><td className="p-6 font-bold text-[#6610f2]">AMD</td><td className="p-6 font-bold">11%</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* SECTION 2: ՀԿԾ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ */}
                    {activeTab === 2 && (
                        <motion.div key="sec2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                            <div className="bg-[#f8f9fb] p-12 rounded-[50px] border border-gray-100">
                                <div className="flex items-center gap-4 mb-6 text-[#6610f2]"><ShieldCheck size={40} /></div>
                                <h2 className="text-[32px] font-[900] italic uppercase mb-6">ՀԿԾ ծառայություններ</h2>
                                <p className="text-gray-600 leading-relaxed max-w-3xl text-[18px]">Բանկն իրականացնում է Հայաստանի Կենտրոնական Դեպոզիտարիայի օպերատորի գործառույթներ՝ ապահովելով ռեեստրի վարում և պահառություն:</p>
                            </div>
                            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
                                <AccordionItem title="ՍԱԿԱԳՆԵՐ ԵՎ ՊԱՅՄԱՆՆԵՐ" isOpen={openAccordion === 5} toggle={() => setOpenAccordion(openAccordion === 5 ? null : 5)} content="Ծառայությունները մատուցվում են համաձայն Կենտրոնական Դեպոզիտարիայի կողմից սահմանված կանոնների:" />
                            </div>
                        </motion.div>
                    )}

                    {/* SECTION 3: ՌԵՊՈ / ՀԱԿԱԴԱՐՁ ՌԵՊՈ */}
                    {activeTab === 3 && (
                        <motion.div key="sec3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                            <div className="bg-[#1a1a1a] p-12 rounded-[50px] text-white">
                                <div className="flex items-center gap-4 mb-6 text-[#6610f2]"><PieChart size={40} /></div>
                                <h2 className="text-[32px] font-[900] italic uppercase mb-6">Ռեպո/Հակադարձ Ռեպո</h2>
                                <p className="text-gray-400 leading-relaxed max-w-3xl text-[18px]">Իրականացրեք կարճաժամկետ դրամական միջոցների ներգրավում կամ տեղաբաշխում՝ որպես գրավ օգտագործելով պետական և կորպորատիվ պարտատոմսեր:</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-8 bg-gray-50 rounded-3xl">
                                    <h3 className="font-black italic uppercase mb-4">Ռեպո</h3>
                                    <p className="text-gray-600">Միջոցների ներգրավում արժեթղթերի գրավադրմամբ:</p>
                                </div>
                                <div className="p-8 bg-gray-50 rounded-3xl">
                                    <h3 className="font-black italic uppercase mb-4">Հակադարձ Ռեպո</h3>
                                    <p className="text-gray-600">Միջոցների տեղաբաշխում արժեթղթերի ձեռքբերմամբ:</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* SECTION 4: EvocaINVEST */}
                    {activeTab === 4 && (
                        <motion.div key="sec4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 text-center">
                            <div className="max-w-2xl mx-auto space-y-8">
                                <div className="inline-flex p-6 bg-[#f1edff] rounded-full text-[#6610f2] mb-4"><Smartphone size={60} /></div>
                                <h2 className="text-[40px] font-[900] italic uppercase leading-none">EvocaINVEST</h2>
                                <p className="text-[18px] text-gray-600">Հարթակ, որը հնարավորություն է տալիս հասանելիություն ունենալ աշխարհի ավելի քան 20 ֆոնդային բորսաներին անմիջապես Ձեր սմարթֆոնից:</p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <button className="bg-[#6610f2] text-white px-10 py-4 rounded-full font-bold italic uppercase hover:bg-[#520dc2] transition-all flex items-center gap-2">
                                        Միանալ հիմա <ExternalLink size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        </div>
    );
};

// Accordion Sub-component
const AccordionItem = ({ title, content, docs, isOpen, toggle }: any) => (
    <div className="py-2">
        <button onClick={toggle} className="w-full py-8 flex items-center justify-between text-left group">
            <span className={`text-[17px] font-black uppercase italic transition-colors ${isOpen ? "text-[#6610f2]" : "text-gray-800"}`}>
                {title}
            </span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className={`p-2 rounded-full ${isOpen ? "bg-[#6610f2] text-white" : "bg-gray-100 text-gray-400"}`}>
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
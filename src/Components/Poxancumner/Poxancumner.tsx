import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, FileText, Download, Monitor, ExternalLink, TrendingUp, ShieldCheck, Globe } from 'lucide-react';
// Համոզվեք, որ այս path-ը ճիշտ է ձեր պրոյեկտում
import HomeCards from '../HomeCards/HomeCards'; 

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
            {/* Header Section */}
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

                {/* Tabs Navigation */}
                <div className="flex gap-8 border-b border-gray-100 mb-16 overflow-x-auto no-scrollbar">
                    {tabs.map((tab, idx) => (
                        <button
                            key={`tab-btn-${idx}`}
                            onClick={() => { 
                                setActiveTab(idx); 
                                setOpenAccordion(null); 
                            }}
                            className={`pb-4 text-[13px] font-black uppercase italic tracking-wider whitespace-nowrap relative transition-all ${
                                activeTab === idx ? "text-[#6610f2]" : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            {tab}
                            {activeTab === idx && (
                                <motion.div 
                                    layoutId="underline" 
                                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6610f2]" 
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-[1140px] mx-auto px-4 pb-24 min-h-[500px]">
                <AnimatePresence mode="wait">
                    
                    {/* 1. ՆԵՐԴՐՈՒՄԱՅԻՆ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ */}
                    {activeTab === 0 && (
                        <motion.div 
                            key="tab-0"
                            initial={{ opacity: 1, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 1, x: -10 }}
                            className="space-y-12"
                        >
                            <div className="relative w-full h-[300px] md:h-[450px] rounded-[50px] overflow-hidden flex items-center px-8 md:px-16">
                                <div className="absolute inset-0 z-0">
                                    <img src="https://www.evoca.am/images-cache/menu/1/1611582806371/1920x530.jpg" className="w-full h-full object-cover" alt="Investment" />
                                    <div className="absolute inset-0 bg-black/40" />
                                </div>
                                <h2 className="relative z-10 text-white text-[32px] md:text-[45px] font-[900] italic uppercase leading-tight">Ներդրումային <br/> ծառայություններ</h2>
                            </div>
                            <div className="max-w-4xl space-y-6">
                                <p className="text-[#1a1a1a] text-[18px] font-medium">Evocabank-ն առաջարկում է ներդրումային ծառայությունների լայն ընտրանի:</p>
                                <AccordionItem 
                                    title="ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ" 
                                    isOpen={openAccordion === 1} 
                                    toggle={() => setOpenAccordion(openAccordion === 1 ? null : 1)} 
                                    docs={["Ներդրումային ծառայությունների սակագներ", "Հաճախորդների դասակարգման քաղաքականություն"]} 
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* 2. ՊԱՐՏԱՏՈՄՍԵՐ */}
                    {activeTab === 1 && (
                        <motion.div 
                            key="tab-1"
                            initial={{ opacity: 1, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 1, x: -10 }}
                            className="space-y-12"
                        >
                            <div className="relative w-full h-[300px] md:h-[400px] rounded-[50px] overflow-hidden flex items-center px-12 bg-[#f8f9fb]">
                                <img src="https://www.evoca.am/images-cache/banners/1/16153628463765/570x370.jpg" className="absolute right-0 top-0 h-full w-1/2 object-cover" alt="Bonds" />
                                <h2 className="relative z-10 text-[#6610f2] text-[45px] font-[900] italic uppercase">Պարտատոմսեր</h2>
                            </div>
                            <div className="overflow-x-auto rounded-[30px] border border-gray-100">
                                <table className="w-full text-left">
                                    <thead className="bg-[#f8f9fb] text-[11px] font-black uppercase text-gray-400">
                                        <tr><th className="p-6">Արժույթ</th><th className="p-6">Տոկոսադրույք</th><th className="p-6">Պարբերականություն</th></tr>
                                    </thead>
                                    <tbody className="text-[15px] font-bold">
                                        <tr className="border-t border-gray-50"><td className="p-6 text-[#6610f2]">AMD</td><td className="p-6">11%</td><td className="p-6">Եռամսյակային</td></tr>
                                        <tr className="border-t border-gray-50"><td className="p-6 text-[#6610f2]">USD</td><td className="p-6">4.5%</td><td className="p-6">Եռամսյակային</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <AccordionItem 
                                title="ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ" 
                                isOpen={openAccordion === 2} 
                                toggle={() => setOpenAccordion(openAccordion === 2 ? null : 2)} 
                                docs={["Ծրագրային ազդագիր", "Թողարկման վերջնական պայմաններ"]} 
                            />
                        </motion.div>
                    )}

                    {/* 3. ՀԿԾ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ */}
                    {activeTab === 2 && (
                        <motion.div 
                            key="tab-2"
                            initial={{ opacity: 1, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 1, x: -10 }}
                            className="space-y-12"
                        >
                            <div className="relative w-full h-[300px] md:h-[450px] rounded-[50px] overflow-hidden flex items-center px-8 md:px-16">
                                <div className="absolute inset-0 z-0">
                                    <img src="https://www.evoca.am/images-cache/menu/1/16115828186177/780x585.jpg" className="w-full h-full object-cover" alt="Depository" />
                                    <div className="absolute inset-0 bg-black/30" />
                                </div>
                                <h2 className="relative z-10 text-white text-[32px] md:text-[45px] font-[900] italic uppercase leading-tight">ՀԿԾ <br/> ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ</h2>
                            </div>
                            <div className="max-w-4xl">
                                <p className="text-[#1a1a1a] text-[18px] font-medium leading-relaxed mb-8">
                                    Բանկը հանդիսանում է Հայաստանի Կենտրոնական Դեպոզիտարիայի անդամ և իրականացնում է արժեթղթերի հաշվառման ու պահառության ծառայություններ:
                                </p>
                                <AccordionItem 
                                    title="ՍԱԿԱԳՆԵՐ ԵՎ ԿԱՆՈՆՆԵՐ" 
                                    isOpen={openAccordion === 3} 
                                    toggle={() => setOpenAccordion(openAccordion === 3 ? null : 3)} 
                                    docs={["ՀԿԾ սակագներ", "Հաշվի օպերատորի կանոններ"]} 
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* 4. ՌԵՊՈ / ՀԱԿԱԴԱՐՁ ՌԵՊՈ */}
                    {activeTab === 3 && (
                        <motion.div 
                            key="tab-3"
                            initial={{ opacity: 1, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 1, x: -10 }}
                            className="space-y-12"
                        >
                            <div className="relative w-full h-[300px] md:h-[450px] rounded-[50px] overflow-hidden flex items-center px-8 md:px-16 bg-[#f0f2f5]">
                                <div className="w-full lg:w-1/2 z-10">
                                    <h2 className="text-[#6610f2] text-[32px] md:text-[45px] font-[900] italic uppercase leading-tight">ՌԵՊՈ ԵՎ ՀԱԿԱԴԱՐՁ <br/> ՌԵՊՈ ԳՈՐԾԱՐՔՆԵՐ</h2>
                                </div>
                                <img src="https://www.evoca.am/images-cache/menu/1/16115827343472/780x585.jpg" className="absolute right-0 h-full w-1/2 object-cover hidden lg:block" alt="Repo" />
                            </div>
                            <div className="max-w-4xl">
                                <p className="text-gray-500 mb-8">Ռեպո գործարքները թույլ են տալիս ստանալ կարճաժամկետ իրացվելիություն՝ որպես գրավ օգտագործելով Ձեր արժեթղթերը:</p>
                                <AccordionItem 
                                    title="ԳՈՐԾԱՐՔՆԵՐԻ ՊԱՅՄԱՆՆԵՐ" 
                                    isOpen={openAccordion === 4} 
                                    toggle={() => setOpenAccordion(openAccordion === 4 ? null : 4)} 
                                    docs={["Ռեպո սակագներ", "Պայմանագրի օրինակելի ձև"]} 
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* 5. EvocaINVEST */}
                    {activeTab === 4 && (
                        <motion.div 
                            key="tab-4"
                            initial={{ opacity: 1, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 1, x: -10 }}
                            className="space-y-16"
                        >
                            <div className="flex flex-col lg:flex-row gap-12 items-center">
                                <div className="w-full lg:w-1/2 space-y-8">
                                    <div className="inline-block px-4 py-2 bg-[#6610f2]/5 rounded-xl">
                                        <img src="https://www.evoca.am/images/evoca_invest_logo.svg" className="h-8" alt="EvocaINVEST" />
                                    </div>
                                    <h2 className="text-[32px] md:text-[45px] font-[900] italic uppercase text-[#6610f2] leading-none">ՆԵՐԴՐՈՒՄՆԵՐԻ <br/> ԱՊԱԳԱՆ ԱՅՍՏԵՂ Է</h2>
                                    <p className="text-gray-500 text-lg">EvocaINVEST հարթակի միջոցով Դուք ստանում եք հասանելիություն աշխարհի խոշորագույն ֆոնդային բորսաներին՝ NYSE, NASDAQ, LSE և այլն:</p>
                                    <button className="bg-[#6610f2] text-white px-12 py-5 rounded-full font-black uppercase text-[12px] tracking-widest hover:shadow-2xl transition-all active:scale-95">ԲԱՑԵԼ ՀԱՇԻՎ</button>
                                </div>
                                <div className="w-full lg:w-1/2 relative">
                                    <img src="https://www.evoca.am/images-cache/menu/1/1611294541215/1920x530.jpg" className="rounded-[40px] shadow-2xl relative z-10" alt="Invest App" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FeatureCard icon={<Globe size={24}/>} title="20+ ՇՈՒԿԱ" desc="Հասանելիություն համաշխարհային բորսաներին" />
                                <FeatureCard icon={<TrendingUp size={24}/>} title="15,000+ ԳՈՐԾԻՔ" desc="Բաժնետոմսեր, ETF-ներ և Օպցիոններ" />
                                <FeatureCard icon={<ShieldCheck size={24}/>} title="ԱՊԱՀՈՎ" desc="Ձեր ներդրումները պաշտպանված են" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Հիմա HomeCards-ը կերևա բոլոր տաբերի տակ */}
            <HomeCards />

            {/* Footer / App Download */}
            <div className="w-full bg-[#1a1a1a] py-20 relative overflow-hidden">
                <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="text-white space-y-4">
                        <h3 className="text-[30px] font-black italic uppercase">Ներբեռնեք EvocaTouch</h3>
                        <p className="text-gray-400">Կառավարեք Ձեր արժեթղթերը հենց հեռախոսից:</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#6610f2] transition-colors cursor-pointer">
                            <Monitor size={20} />
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#6610f2] transition-colors cursor-pointer">
                            <ExternalLink size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        </div>
    );
};

// --- Helper Components ---

const AccordionItem = ({ title, docs, isOpen, toggle }: any) => (
    <div className="py-2 divide-y divide-gray-100 border-t border-b">
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
                <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    className="overflow-hidden pb-8"
                >
                    <div className="space-y-4 pt-4">
                        {docs && docs.map((doc: string, idx: number) => (
                            <div key={`doc-${idx}`} className="flex items-center justify-between p-5 bg-[#f8f9fb] rounded-2xl hover:bg-[#f1edff] transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        <FileText size={18} className="text-[#6610f2]" />
                                    </div>
                                    <span className="text-[14px] font-bold text-gray-800">{doc}</span>
                                </div>
                                <Download size={18} className="text-gray-300 group-hover:text-[#6610f2]" />
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="p-8 bg-[#f8f9fb] rounded-[40px] border border-gray-50 hover:shadow-xl transition-all">
        <div className="text-[#6610f2] mb-6">{icon}</div>
        <div className="text-[18px] font-black italic uppercase text-gray-800 mb-2">{title}</div>
        <div className="text-[14px] text-gray-400 font-medium">{desc}</div>
    </div>
);

export default Securities;
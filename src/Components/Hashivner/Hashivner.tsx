import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, ChevronRight, Plus, Minus } from 'lucide-react';

// Firebase imports
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

// Տիպերի սահմանում
interface AccordionItem {
    id: number;
    title: string;
    content: string;
}

interface Section {
    id?: string;
    title: string;
    img: string;
    desc: string;
    list: string[];
    accordions: AccordionItem[];
}

const Hashivner: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Բեռնում ենք հաշիվների տվյալները Firebase-ից ('hashivner' node-ից)
        const accountsRef = ref(db, 'hashivner');
        const unsubscribe = onValue(accountsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const formattedData = Array.isArray(data) ? data : Object.values(data);
                setSections(formattedData as Section[]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center font-black text-[#6610f2] uppercase italic animate-pulse">
                Բեռնվում է...
            </div>
        );
    }

    return (
        <div className="w-full bg-white font-sans text-[#1a1a1a] overflow-hidden">
            {/* Breadcrumbs & Header */}
            <div className="max-w-[1140px] mx-auto px-4 pt-16">
                <div className="flex items-center gap-2 text-[10px] text-gray-300 uppercase tracking-[0.2em] mb-8 font-black">
                    <span>Անհատ</span> <ChevronRight size={10} /> <span className="text-[#6610f2]">Հաշիվներ</span>
                </div>
                <h1 className="text-[40px] md:text-[65px] font-[1000] italic uppercase leading-none mb-12 tracking-tighter">Հաշիվներ</h1>
                
                {/* Tabs */}
                <div className="flex gap-8 border-b border-gray-100 mb-16 overflow-x-auto no-scrollbar">
                    {sections.map((section, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setActiveTab(idx); setOpenAccordion(null); }}
                            className={`pb-6 text-[13px] font-black uppercase italic tracking-wider whitespace-nowrap relative transition-all duration-300 ${activeTab === idx ? "text-[#6610f2]" : "text-gray-300 hover:text-gray-500"}`}
                        >
                            {section.title}
                            {activeTab === idx && (
                                <motion.div 
                                    layoutId="tabLine" 
                                    className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#6610f2] rounded-t-full" 
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-[1140px] mx-auto px-4 pb-32 min-h-[600px]">
                <AnimatePresence mode="wait">
                    {sections[activeTab] && (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-20"
                        >
                            {/* Left Side: Info */}
                            <div className="space-y-12">
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    className="rounded-[60px] overflow-hidden shadow-2xl bg-gray-50"
                                >
                                    <img src={sections[activeTab].img} className="w-full h-auto object-cover" alt={sections[activeTab].title} />
                                </motion.div>
                                
                                <div className="space-y-8">
                                    <h2 className="text-[30px] font-[1000] italic uppercase text-[#6610f2] leading-tight">
                                        {sections[activeTab].title}
                                    </h2>
                                    <p className="text-gray-500 leading-relaxed text-[18px] font-medium italic">
                                        {sections[activeTab].desc}
                                    </p>
                                    <ul className="space-y-5">
                                        {sections[activeTab].list.map((item, i) => (
                                            <li key={i} className="flex items-center gap-4 font-black uppercase text-[12px] text-gray-700 tracking-tight">
                                                <span className="w-2.5 h-2.5 rounded-full bg-[#6610f2]" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-[#6610f2] text-white px-14 py-6 rounded-full font-[1000] uppercase text-[11px] tracking-[0.2em] shadow-lg shadow-[#6610f2]/30"
                                    >
                                        Դառնալ հաճախորդ
                                    </motion.button>
                                </div>
                            </div>

                            {/* Right Side: Accordions */}
                            <div className="divide-y divide-gray-100 bg-[#fcfcfc] rounded-[50px] p-8 md:p-12 self-start">
                                {sections[activeTab].accordions.map((item) => (
                                    <div key={item.id} className="border-b border-gray-50 last:border-0">
                                        <button 
                                            onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)} 
                                            className="w-full py-8 flex items-center justify-between text-left group"
                                        >
                                            <span className={`text-[15px] font-[1000] uppercase italic tracking-tighter transition-colors ${openAccordion === item.id ? "text-[#6610f2]" : "text-gray-800"}`}>
                                                {item.title}
                                            </span>
                                            <motion.div 
                                                animate={{ rotate: openAccordion === item.id ? 180 : 0 }}
                                                className={`p-1.5 rounded-full flex items-center justify-center transition-colors ${openAccordion === item.id ? "bg-[#6610f2] text-white" : "bg-gray-100 text-gray-400"}`}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                            </motion.div>
                                        </button>
                                        <AnimatePresence>
                                            {openAccordion === item.id && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }} 
                                                    animate={{ height: "auto", opacity: 1 }} 
                                                    exit={{ height: 0, opacity: 0 }} 
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-8 text-gray-400 font-bold italic text-[16px] leading-relaxed">
                                                        {item.content}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Banner Section */}
            <div className="w-full bg-[#6610f2] py-24 relative overflow-hidden">
                <motion.div 
                    animate={{ y: [0, -40, 0], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -top-10 -left-10 text-white"
                >
                    <Monitor size={250} />
                </motion.div>

                <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center relative z-10 gap-16">
                    <div className="w-full md:w-1/2 flex justify-center">
                        <motion.div 
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            className="relative"
                        >
                            <img 
                                src="https://www.evoca.am/images-cache/banners/1/16170067683633/485x304.jpg" 
                                className="w-full max-w-[400px] rounded-[40px] shadow-2xl border-4 border-white/10" 
                                alt="Evoca App"
                            />
                        </motion.div>
                    </div>

                    <div className="w-full md:w-1/2 text-white text-center md:text-left">
                        <h2 className="text-[40px] md:text-[60px] font-[1000] uppercase italic mb-6 leading-[0.9]">
                            Evoca<br/>Online
                        </h2>
                        <p className="text-white/70 mb-10 text-xl font-bold italic">
                            Կառավարի՛ր հաշիվներդ աշխարհի ցանկացած կետից:
                        </p>
                        <button className="bg-white text-[#6610f2] px-14 py-6 rounded-full font-[1000] uppercase text-[11px] tracking-[0.2em] hover:bg-gray-100 transition-colors">
                            Միանալ հիմա
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
                .font-sans { font-family: 'Montserrat', sans-serif; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default Hashivner;
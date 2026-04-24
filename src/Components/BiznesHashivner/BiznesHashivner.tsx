import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Firebase ներմուծումներ
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; // Ստուգիր քո firebase.ts ֆայլի ճիշտ հասցեն

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Տիպերի սահմանում
interface Section {
    id: string;
    title: string;
    img: string;
    desc: string;
    list: string[];
    accordions: { id: number; title: string; content: string }[];
}

interface Testimonial {
    id: string;
    name: string;
    role: string;
    text: string;
}

const Hashivner: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    
    const [sections, setSections] = useState<Section[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Բեռնում ենք Ծառայությունները (Sections)
        const sectionsRef = ref(db, 'services');
        const unsubSections = onValue(sectionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const formatted: Section[] = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key
                }));
                setSections(formatted);
            }
        });

        // 2. Բեռնում ենք Կարծիքները (Testimonials)
        const testimonialsRef = ref(db, 'testimonials');
        const unsubTestimonials = onValue(testimonialsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const formatted: Testimonial[] = Object.keys(data).map(key => ({
                    ...data[key],
                    id: key
                }));
                setTestimonials(formatted);
            }
            setLoading(false);
        });

        return () => {
            unsubSections();
            unsubTestimonials();
        };
    }, []);

    if (loading || sections.length === 0) {
        return <div className="h-screen flex items-center justify-center font-black text-[#6610f2]">Բեռնվում է...</div>;
    }

    return (
        <div className="w-full bg-white font-sans text-[#1a1a1a] overflow-hidden">
            <div className="max-w-[1140px] mx-auto px-4 pt-10">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-8 font-bold">
                    <span>Անհատ</span> <ChevronRight size={10} /> <span className="text-gray-800">Հաշիվներ</span>
                </div>
                <h1 className="text-[36px] md:text-[50px] font-[900] italic uppercase leading-none mb-12 tracking-tighter">Հաշիվներ</h1>
                
                {/* Tabs */}
                <div className="flex gap-8 border-b border-gray-100 mb-16 overflow-x-auto no-scrollbar">
                    {sections.map((section, idx) => (
                        <button
                            key={section.id}
                            onClick={() => { setActiveTab(idx); setOpenAccordion(null); }}
                            className={`pb-4 text-[13px] font-black uppercase italic tracking-wider whitespace-nowrap relative transition-all ${activeTab === idx ? "text-[#6610f2]" : "text-gray-400 hover:text-gray-600"}`}
                        >
                            {section.title}
                            {activeTab === idx && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6610f2]" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-[1140px] mx-auto px-4 pb-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16"
                    >
                        {/* Ձախ կողմ՝ Նկար և Նկարագրություն */}
                        <div className="space-y-10">
                            <div className="rounded-[45px] overflow-hidden shadow-2xl bg-gray-50">
                                <img src={sections[activeTab].img} className="w-full h-auto object-cover" alt={sections[activeTab].title} />
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-[26px] font-black italic uppercase text-[#6610f2]">{sections[activeTab].title}</h2>
                                <p className="text-gray-500 leading-relaxed text-[17px]">{sections[activeTab].desc}</p>
                                <ul className="space-y-4">
                                    {sections[activeTab].list?.map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 font-bold text-[14px]">
                                            <span className="w-2 h-2 rounded-full bg-[#6610f2]" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <button className="bg-[#6610f2] text-white px-12 py-5 rounded-full font-black uppercase text-[12px] tracking-widest hover:bg-[#520dc2] transition-colors">
                                    Դառնալ հաճախորդ
                                </button>
                            </div>
                        </div>

                        {/* Աջ կողմ՝ Ակորդեոններ */}
                        <div className="divide-y divide-gray-100">
                            {sections[activeTab].accordions?.map((item) => (
                                <div key={item.id}>
                                    <button onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)} className="w-full py-7 flex items-center justify-between text-left group">
                                        <span className={`text-[16px] font-black uppercase italic ${openAccordion === item.id ? "text-[#6610f2]" : "text-gray-800"}`}>{item.title}</span>
                                        <motion.div 
                                            animate={{ rotate: openAccordion === item.id ? 180 : 0 }} 
                                            className={`p-1.5 rounded-full ${openAccordion === item.id ? "bg-[#6610f2] text-white" : "bg-gray-100 text-gray-400"}`}
                                        >
                                            <ChevronRight size={16} />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {openAccordion === item.id && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }} 
                                                animate={{ height: "auto", opacity: 1 }} 
                                                exit={{ height: 0, opacity: 0 }} 
                                                className="overflow-hidden pb-8 text-gray-500 text-[16px]"
                                            >
                                                {item.content}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Online Banking Purple Block */}
            <div className="w-full bg-[#6610f2] py-24 relative overflow-hidden">
                <motion.div 
                    animate={{ y: [0, -40, 0], rotate: [0, 10, 0], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-[10%] text-white"
                >
                    <Monitor size={120} />
                </motion.div>

                <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
                    <div className="w-full md:w-1/2 relative h-[400px]">
                        <motion.img 
                            initial={{ x: -150, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, type: "spring" }}
                            src="https://www.evoca.am/images-cache/banners/1/16170067683633/485x304.jpg"
                            className="absolute left-0 top-0 w-[80%] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl"
                        />
                        <motion.img 
                            initial={{ y: 150, opacity: 0, scale: 0.5 }}
                            whileInView={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                            src="https://www.evoca.am/images-cache/banners/1/16153622710205/140x300.jpg"
                            className="absolute right-10 bottom-0 w-[30%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20 border-4 border-[#1a1a1a] rounded-[2rem]"
                        />
                    </div>

                    <div className="w-full md:w-1/2 text-white text-center md:text-left mt-10 md:mt-0">
                        <h2 className="text-[36px] md:text-[48px] font-black uppercase italic mb-6 leading-tight">Օնլայն բանկինգ</h2>
                        <p className="text-white/80 mb-8 text-lg">Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է:</p>
                        <motion.button 
                            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(255,255,255,0.5)" }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white text-[#6610f2] px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest"
                        >
                            Դառնալ հաճախորդ
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Testimonials Slider */}
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

                {testimonials.length > 0 && (
                    <Swiper
                        modules={[Pagination, Autoplay, EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        speed={1000}
                        autoplay={{ delay: 5000 }}
                        pagination={{ clickable: true }}
                        className="pb-20"
                    >
                        {testimonials.map((t) => (
                            <SwiperSlide key={t.id}>
                                <div className="text-center max-w-3xl mx-auto">
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
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .swiper-pagination-bullet { width: 40px; height: 4px; border-radius: 2px; transition: all 0.5s !important; }
                .swiper-pagination-bullet-active { background: #6610f2 !important; width: 60px; }
            `}</style>
        </div>
    );
};

export default Hashivner;
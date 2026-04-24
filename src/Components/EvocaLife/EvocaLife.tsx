import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { UploadCloud, RefreshCw, ChevronDown } from 'lucide-react';

// Swiper ստանդարտ ոճեր
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Firebase կոնֆիգուրացիա (Ստուգիր քո նախագծի ճիշտ հասցեն)
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

// Տիպերի սահմանում
interface Benefit {
  id: string;
  title: string;
  img: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface HiringStep {
  title: string;
  content: string;
}

const EvocaLife: React.FC = () => {
    const [activeTab, setActiveTab] = useState('culture');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    
    // Դինամիկ տվյալների վիճակներ
    const [benefits, setBenefits] = useState<Benefit[]>([]);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);

    const tabs = [
        { id: 'culture', label: 'Մշակույթ' },
        { id: 'benefits', label: 'Առավելություններ' },
        { id: 'faq', label: 'Հաճախ տրվող հարցեր' },
        { id: 'hiring', label: 'Ինչպես ընդունվել աշխատանքի' },
    ];

    useEffect(() => {
        // Բեռնում ենք արտոնությունները
        const benefitsRef = ref(db, 'career_benefits');
        const unsubBenefits = onValue(benefitsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setBenefits(Object.values(data));
        });

        // Բեռնում ենք հարց ու պատասխանը
        const faqsRef = ref(db, 'career_faqs');
        const unsubFaqs = onValue(faqsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setFaqs(Object.values(data));
            setLoading(false);
        });

        return () => {
            unsubBenefits();
            unsubFaqs();
        };
    }, []);

    const ApplicationForm = () => (
        <section className="max-w-[1450px] mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-[#f8f9fb] rounded-[60px] p-12 md:p-16 border border-gray-100 shadow-inner">
                <h3 className="text-4xl md:text-5xl font-[1000] italic uppercase text-center text-[#6610f2] mb-12 tracking-tighter">Դառնալ թիմի անդամ</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2"><label className="text-xs font-black uppercase text-gray-400">Անուն *</label><input type="text" className="w-full bg-white border border-gray-100 p-4 rounded-xl text-sm outline-none focus:border-[#6610f2]" placeholder="Մուտքագրեք Ձեր անունը" /></div>
                    <div className="space-y-2"><label className="text-xs font-black uppercase text-gray-400">Ազգանուն *</label><input type="text" className="w-full bg-white border border-gray-100 p-4 rounded-xl text-sm outline-none focus:border-[#6610f2]" placeholder="Մուտքագրեք Ձեր ազգանունը" /></div>
                    <div className="space-y-2 md:col-span-2 relative">
                        <label className="text-xs font-black uppercase text-gray-400">Հեռախոսահամար *</label>
                        <div className="flex bg-white border border-gray-100 rounded-xl overflow-hidden"><div className="px-4 py-4 border-r text-sm text-gray-500 flex items-center gap-1">+374</div><input type="tel" className="flex-1 p-4 text-sm outline-none" placeholder="99 999999" /></div>
                    </div>
                    <div className="space-y-2 md:col-span-2"><label className="text-xs font-black uppercase text-gray-400">Էլ. Հասցե *</label><input type="email" className="w-full bg-white border border-gray-100 p-4 rounded-xl text-sm outline-none focus:border-[#6610f2]" placeholder="example@mail.com" /></div>
                    <div className="md:col-span-2">
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center bg-white hover:border-[#6610f2] cursor-pointer group transition-colors">
                            <UploadCloud size={32} className="mx-auto text-gray-300 group-hover:text-[#6610f2] mb-2" />
                            <p className="text-sm text-gray-400 group-hover:text-[#6610f2]">Կցել ինքնակենսագրականը (CV)</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
                        <input type="text" className="w-24 border p-2 rounded text-center outline-none" placeholder="Կոդը" /><div className="bg-gray-100 px-4 py-2 rounded font-bold italic tracking-widest select-none">NfE8e</div><button type="button" className="text-gray-400"><RefreshCw size={18} /></button>
                    </div>
                    <div className="md:col-span-2 text-center mt-6">
                        <button className="bg-[#6610f2] text-white px-12 py-4 rounded-full font-black uppercase italic text-sm tracking-widest shadow-xl hover:bg-[#520dc2] transition-colors">Ուղարկել հայտը</button>
                    </div>
                </form>
            </div>
        </section>
    );

    if (loading) return <div className="py-20 text-center font-black text-[#6610f2] uppercase italic">Բեռնվում է...</div>;

    return (
        <div className="bg-white min-h-screen font-sans overflow-x-hidden pb-20">
            <div className="max-w-[1450px] mx-auto px-6">
                <div className="flex border-b border-gray-100 mb-12 relative mt-16">
                    <div className="flex gap-x-10 pt-4 pb-6 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setOpenFaq(null); }}
                                className={`relative whitespace-nowrap py-2 text-[14px] font-[1000] uppercase italic tracking-wider transition-all
                                ${activeTab === tab.id ? "text-black" : "text-gray-300 hover:text-gray-400"}`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div layoutId="activeTabLine" className="absolute -bottom-[25px] left-0 right-0 h-[3px] bg-[#6610f2]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'culture' && (
                    <motion.div key="culture" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-20 pb-20">
                        {/* Մշակույթի բովանդակություն... (Նույնը ինչ քո կոդում) */}
                        <section className="w-full h-[500px] md:h-[650px] relative overflow-hidden px-6">
                            <div className="w-full h-full rounded-[60px] overflow-hidden relative">
                                <img src="https://www.evoca.am/images-cache/menu/1/16207355620213/1200x630.png" className="w-full h-full object-cover" alt="Culture" />
                            </div>
                        </section>
                        <section className="max-w-[1450px] mx-auto px-6 text-center">
                            <p className="max-w-4xl mx-auto text-[20px] md:text-[26px] text-[#1a1a1a] font-[900] italic leading-tight uppercase">
                                Մենք ստեղծում ենք միջավայր, որտեղ յուրաքանչյուրը կարող է ինքնաարտահայտվել, զարգանալ և դառնալ լավագույնը իր ոլորտում:
                            </p>
                        </section>
                        {/* Swiper և այլն */}
                    </motion.div>
                )}

                {activeTab === 'benefits' && (
                    <motion.div key="benefits" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full space-y-24">
                        <section className="w-full h-[500px] md:h-[600px] bg-[#6610f2] relative overflow-hidden px-6">
                            <img src="https://www.evoca.am/images-cache/menu/1/1620994896414/1200x630.png" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Benefits Bg" />
                            <div className="max-w-[1450px] mx-auto h-full relative flex items-center">
                                <div className="bg-white rounded-[50px] p-12 md:p-16 shadow-2xl max-w-2xl">
                                    <h2 className="text-[40px] md:text-[50px] font-[1000] italic uppercase text-[#1a1a1a] leading-none mb-6">Առավելություններ</h2>
                                    <p className="text-[#4d4d4d] text-lg font-medium italic">Միացիր թիմին, որի ամենամեծ ակտիվը ներգրավված և երջանիկ աշխատակիցներն են։</p>
                                </div>
                            </div>
                        </section>

                        <section className="max-w-[1450px] mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                                {benefits.map((benefit, idx) => (
                                    <div key={benefit.id || idx} className="flex flex-col items-center text-center group">
                                        <div className="w-32 h-32 mb-8 transform transition-transform group-hover:scale-110">
                                            <img src={benefit.img} className="w-full h-full object-contain" alt={benefit.title} />
                                        </div>
                                        <p className="text-gray-500 font-semibold italic text-[16px] max-w-xs">{benefit.title}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <ApplicationForm />
                    </motion.div>
                )}

                {activeTab === 'faq' && (
                    <motion.div key="faq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-24">
                        <section className="max-w-[1000px] mx-auto px-6 space-y-4 pt-10">
                            {faqs.map((faq, idx) => (
                                <div key={faq.id || idx} className="border-b border-gray-100 last:border-0">
                                    <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between py-8 text-left group">
                                        <span className={`text-xl md:text-2xl font-[1000] italic uppercase transition-colors ${openFaq === idx ? 'text-[#6610f2]' : 'text-[#1a1a1a]'}`}>{faq.question}</span>
                                        <motion.div animate={{ rotate: openFaq === idx ? 180 : 0 }} className="bg-[#f8f9fb] p-3 rounded-full transition-colors"><ChevronDown size={24} /></motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === idx && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                <p className="pb-8 text-gray-500 text-lg font-medium italic leading-relaxed">{faq.answer}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </section>
                        <ApplicationForm />
                    </motion.div>
                )}

                {activeTab === 'hiring' && (
                    <motion.div key="hiring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-24">
                        {/* Ինչպես ընդունվել աշխատանքի... (Նույնը ինչ քո կոդում) */}
                        <section className="max-w-[1100px] mx-auto px-6 space-y-6 pt-10">
                            <h3 className="text-3xl md:text-4xl font-[1000] italic uppercase text-[#1a1a1a] mb-10 text-center tracking-tighter">Ընտրության փուլերը</h3>
                            {/* Steps list... */}
                        </section>
                        <ApplicationForm />
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,800;0,900;1,900&display=swap');
                body { font-family: 'Montserrat', sans-serif; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .swiper-pagination-bullet-active { background: #6610f2 !important; }
            `}</style>
        </div>
    );
};

export default EvocaLife;
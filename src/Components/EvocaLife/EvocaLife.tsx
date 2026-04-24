import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { UploadCloud, RefreshCw, ChevronDown } from 'lucide-react';

// --- Firebase Imports ---
import { db } from '../../lib/firebase'; 
import { ref, onValue } from 'firebase/database';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Տիպերի սահմանում
interface BenefitType {
  title: string;
  img: string;
}

interface FaqType {
  question: string;
  answer: string;
}

const EvocaLife: React.FC = () => {
    // ՈՒՂՂՈՒՄ: Սկզբնական արժեքը դրված է 'culture', որպեսզի էջը դատարկ չլինի
    const [activeTab, setActiveTab] = useState('culture');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    
    // Դինամիկ տվյալների state-եր
    const [benefitIcons, setBenefitIcons] = useState<BenefitType[]>([]);
    const [faqs, setFaqs] = useState<FaqType[]>([]);
    const [loading, setLoading] = useState(true);

    const tabs = [
        { id: 'culture', label: 'Մշակույթ' },
        { id: 'benefits', label: 'Առավելություններ' },
        { id: 'faq', label: 'Հաճախ տրվող հարցեր' },
        { id: 'hiring', label: 'Ինչպես ընդունվել աշխատանքի' },
    ];

    // Firebase-ից տվյալների ստացում
    useEffect(() => {
        const careerRef = ref(db, 'career_page');
        
        const unsubscribe = onValue(careerRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                if (data.benefits) setBenefitIcons(data.benefits);
                if (data.faqs) setFaqs(data.faqs);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Հայտի ձևի կոմպոնենտ
    const ApplicationForm = () => (
        <section className="max-w-[1450px] mx-auto px-6 mt-20">
            <div className="max-w-4xl mx-auto bg-[#f8f9fb] rounded-[60px] p-12 md:p-16 border border-gray-100 shadow-inner">
                <h3 className="text-4xl md:text-5xl font-[1000] italic uppercase text-center text-[#6610f2] mb-12 tracking-tighter">Դառնալ թիմի անդամ</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

    if (loading) return <div className="py-40 text-center font-[1000] italic text-[#6610f2]">ԲԵՌՆՎՈՒՄ Է...</div>;

    return (
        <div className="bg-white min-h-screen font-sans overflow-x-hidden pb-20">
            {/* 1. HEADER TABS */}
            <div className="max-w-[1450px] mx-auto px-6">
                <div className="flex border-b border-gray-100 mb-12 relative mt-16">
                    <div className="flex gap-x-10 pt-4 pb-6 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
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
                        <section className="w-full h-[500px] md:h-[650px] relative overflow-hidden px-6">
                            <div className="w-full h-full rounded-[60px] overflow-hidden relative">
                                <img src="https://www.evoca.am/images-cache/menu/1/16207355620213/1200x630.png" className="w-full h-full object-cover" alt="Banner" />
                            </div>
                        </section>
                        <section className="max-w-[1450px] mx-auto px-6 text-center">
                            <p className="max-w-4xl mx-auto text-[20px] md:text-[26px] text-[#1a1a1a] font-[900] italic leading-tight uppercase">
                                Մենք ստեղծում ենք միջավայր, որտեղ յուրաքանչյուրը կարող է ինքնաարտահայտվել, զարգանալ և դառնալ լավագույնը իր ոլորտում:
                            </p>
                        </section>
                        <section className="max-w-[1450px] mx-auto px-6">
                            <div className="w-full h-[500px] md:h-[700px] rounded-[60px] overflow-hidden">
                                <img src="https://www.evoca.am/file_manager/Career/evoca-girl.jpg" className="w-full h-full object-cover shadow-2xl" alt="Team member" />
                            </div>
                        </section>
                        <section className="max-w-[1450px] mx-auto px-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-auto md:h-[600px]">
                                <div className="w-full md:w-[25%] h-[350px] md:h-[75%] rounded-[50px] overflow-hidden border border-gray-100 p-2 bg-white shadow-lg">
                                    <img src="https://www.evoca.am/images-cache/news/1/16902075440877/780x585.png" className="w-full h-full object-cover rounded-[40px]" alt="1" />
                                </div>
                                <div className="w-full md:w-[45%] h-[450px] md:h-full rounded-[60px] overflow-hidden shadow-2xl border-4 border-white">
                                    <img src="https://braind.ca/images_list/626fb354143b3/626fb354143bcEvoca-1%20(1).jpg" className="w-full h-full object-cover rounded-[55px]" alt="2" />
                                </div>
                                <div className="w-full md:w-[25%] h-[350px] md:h-[75%] rounded-[50px] overflow-hidden border border-gray-100 p-2 bg-white shadow-lg">
                                    <img src="https://www.evoca.am/images-cache/news/1/17304683213703/780x585.jpg" className="w-full h-full object-cover rounded-[40px]" alt="3" />
                                </div>
                            </div>
                        </section>

                        <section className="max-w-[1450px] mx-auto px-6 py-10">
                            <Swiper
                                modules={[Navigation, Autoplay, Pagination]}
                                spaceBetween={25}
                                slidesPerView={1.2}
                                pagination={{ clickable: true, dynamicBullets: true }}
                                autoplay={{ delay: 5000 }}
                                breakpoints={{ 768: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
                                className="pb-16 overflow-visible"
                            >
                                {[
                                    { title: "ԴՐԱԿԱՆ ՄԻՋԱՎԱՅՐ", desc: "Մենք ստեղծում ենք առողջ և մոտիվացնող մթնոլորտ:" },
                                    { title: "ԹԻՄԱՅԻՆ ՈԳԻ", desc: "Միասին մենք հասնում ենք անհնարինին:" },
                                    { title: "ՆՈՐԱՐԱՐՈՒԹՅՈՒՆ", desc: "Մենք միշտ քայլում ենք տեխնոլոգիաներին համընթաց:" },
                                    { title: "ՄԱՍՆԱԳԻՏԱԿԱՆ ԱՃ", desc: "Մենք խրախուսում ենք շարունակական կրթությունը:" },
                                    { title: "ԱԶԱՏՈՒԹՅՈՒՆ", desc: "Ստեղծագործական մտքի համար սահմաններ չկան:" }
                                ].map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="bg-[#f8f9fb] p-10 md:p-14 rounded-[55px] h-[480px] md:h-[550px] flex flex-col justify-between transition-all duration-300 group border border-gray-100 hover:bg-[#6610f2] hover:shadow-2xl">
                                            <div className="text-[70px] md:text-[90px] font-[1000] italic leading-none text-white transition-colors group-hover:text-white/20" style={{ WebkitTextStroke: '2px #dee2e6' }}>0{i + 1}</div>
                                            <div className="space-y-4">
                                                <h4 className="text-2xl md:text-3xl font-[1000] italic uppercase text-[#1a1a1a] transition-colors group-hover:text-white leading-none">{item.title}</h4>
                                                <p className="text-gray-500 font-medium italic text-[16px] md:text-[18px] transition-colors group-hover:text-white/90">{item.desc}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>
                    </motion.div>
                )}

                {activeTab === 'benefits' && (
                    <motion.div key="benefits" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full space-y-24">
                        <section className="w-full h-[500px] md:h-[600px] bg-[#6610f2] relative overflow-hidden px-6">
                            <img src="https://www.evoca.am/images-cache/menu/1/1620994896414/1200x630.png" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Bg" />
                            <div className="max-w-[1450px] mx-auto h-full relative flex items-center">
                                <div className="bg-white rounded-[50px] p-12 md:p-16 shadow-2xl max-w-2xl">
                                    <h2 className="text-[40px] md:text-[50px] font-[1000] italic uppercase text-[#1a1a1a] leading-none mb-6">Առավելություններ</h2>
                                    <p className="text-[#4d4d4d] text-lg font-medium italic">Միացիր թիմին, որի ամենամեց ակտիվը ներգրավված և երջանիկ աշխատակիցներն են։</p>
                                </div>
                            </div>
                        </section>
                        <section className="max-w-[1450px] mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                                {benefitIcons.map((icon, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center group">
                                        <div className="w-32 h-32 mb-8 transform transition-transform group-hover:scale-110"><img src={icon.img} className="w-full h-full object-contain" alt={icon.title} /></div>
                                        <p className="text-gray-500 font-semibold italic text-[16px] max-w-xs">{icon.title}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <ApplicationForm />
                    </motion.div>
                )}

                {activeTab === 'faq' && (
                    <motion.div key="faq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-24">
                        <section className="w-full h-[500px] md:h-[600px] relative overflow-hidden px-6">
                            <div className="w-full h-full rounded-[60px] overflow-hidden relative">
                                <img src="https://www.evoca.am/images-cache/menu/1/16207303701295/1200x630.jpg" className="w-full h-full object-cover" alt="FAQ" />
                                <div className="absolute inset-0 bg-black/10 flex items-center px-12">
                                    <div className="bg-white rounded-[50px] p-12 md:p-16 shadow-2xl max-w-2xl">
                                        <h2 className="text-[40px] md:text-[50px] font-[1000] italic uppercase text-[#1a1a1a] mb-6">Հաճախ տրվող հարցեր</h2>
                                        <p className="text-[#4d4d4d] text-lg font-medium italic">Այստեղ կգտնեք Evocabank-ում աշխատանքի անցնելու վերաբերյալ ամենից հաճախ տրվող հարցերի պատասխանները։</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="max-w-[1000px] mx-auto px-6 space-y-4">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="border-b border-gray-100 last:border-0">
                                    <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between py-8 text-left group">
                                        <span className={`text-xl md:text-2xl font-[1000] italic uppercase transition-colors ${openFaq === idx ? 'text-[#6610f2]' : 'text-[#1a1a1a]'}`}>{faq.question}</span>
                                        <motion.div animate={{ rotate: openFaq === idx ? 180 : 0 }} className="bg-[#f8f9fb] p-3 rounded-full group-hover:bg-[#6610f2] group-hover:text-white transition-colors"><ChevronDown size={24} /></motion.div>
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
                        <section className="w-full h-[500px] md:h-[650px] relative overflow-hidden px-6">
                            <div className="w-full h-full rounded-[60px] overflow-hidden relative">
                                <img src="https://www.evoca.am/images-cache/menu/1/16200303976398/1200x630.jpg" className="w-full h-full object-cover" alt="Hiring Process" />
                                <div className="absolute inset-0 bg-black/20 flex items-center px-12">
                                    <div className="bg-white rounded-[50px] p-12 md:p-16 shadow-2xl max-w-2xl">
                                        <h2 className="text-[40px] md:text-[50px] font-[1000] italic uppercase text-[#1a1a1a] leading-none mb-6">Ինչպես ընդունվել աշխատանքի</h2>
                                        <p className="text-[#4d4d4d] text-lg font-medium italic">Մենք փնտրում ենք տաղանդավոր և մոտիվացված անհատների, ովքեր պատրաստ են կերտել թվային բանկինգի ապագան մեզ հետ միասին։</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="max-w-[1100px] mx-auto px-6 space-y-6">
                            {[
                                { title: "Առաջին փուլ ` Դիմում", content: "Evocabank-ում աշխատանքի դիմելիս թեկնածուի ճանապարհը սկսվում է հայտի ներկայացումից..." },
                                { title: "Երկրորդ փուլ ` Հարցազրույցներ", content: "Եթե ինքնակենսագրականում նշված Ձեր փորձը համապատասխանել է պահանջներին..." },
                                { title: "Երրորդ փուլ ` Թեստավորում և ամփոփում", content: "Թեստավորումից և հարցազրույցների ավարտից հետո..." },
                                { title: "Չորրորդ փուլ ` Ստուգումներ", content: "Աշխատանքի պայմանական առաջարկ կատարելուց հետո..." },
                                { title: "Հինգերորդ փուլ ` Աշխատանքի առաջարկ", content: "Ստուգումների դրական արդյունքներ ստանալուց հետո..." }
                            ].map((step, idx) => (
                                <div key={idx} className="bg-[#f8f9fb] rounded-[35px] overflow-hidden border border-gray-100">
                                    <button onClick={() => setOpenFaq(openFaq === idx + 10 ? null : idx + 10)} className="w-full flex items-center justify-between p-8 md:p-10 text-left group">
                                        <span className={`text-xl md:text-2xl font-[1000] italic uppercase transition-colors ${openFaq === idx + 10 ? 'text-[#6610f2]' : 'text-[#1a1a1a]'}`}>{step.title}</span>
                                        <motion.div animate={{ rotate: openFaq === idx + 10 ? 180 : 0 }} className={`p-3 rounded-full transition-colors ${openFaq === idx + 10 ? 'bg-[#6610f2] text-white' : 'bg-white text-[#1a1a1a]'}`}><ChevronDown size={24} /></motion.div>
                                    </button>
                                    <AnimatePresence>{openFaq === idx + 10 && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="px-10 pb-10 text-gray-500 text-lg font-medium italic leading-relaxed">{step.content}</p></motion.div>)}</AnimatePresence>
                                </div>
                            ))}
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
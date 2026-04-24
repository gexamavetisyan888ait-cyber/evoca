import React, { useState, useEffect } from 'react';
import { FileText, Download, Monitor, Smartphone, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

// --- Firebase Imports ---
import { db } from '../../lib/firebase'; // Ստուգեք հասցեն ըստ Ձեր նախագծի
import { ref, onValue } from 'firebase/database';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Տիպերի սահմանում կարծիքների համար
interface Testimonial {
    name: string;
    role: string;
    text: string;
}

const EvocaTOUCH: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    const documents = [
        { name: 'Համալիր բանկային ծառայությունների մատուցման պայմաններ 16.05.2025', lang: 'ARM' },
        { name: 'SWIFT Transfers', lang: 'ENG' },
        { name: 'SWIFT переводы в РФ', lang: 'RUS' },
    ];

    // Firebase-ից տվյալների ստացում
    useEffect(() => {
        const testimonialsRef = ref(db, 'evocatouch'); // Ենթադրվում է, որ JSON-ը տեղադրել եք testimonials node-ի տակ
        const unsubscribe = onValue(testimonialsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Եթե տվյալները գալիս են որպես օբյեկտ, դարձնում ենք զանգված
                const formattedData = Array.isArray(data) ? data : Object.values(data);
                setTestimonials(formattedData);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="w-full bg-white font-sans text-[#1a1a1a] overflow-hidden">
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="max-w-[1140px] mx-auto px-4 pt-8"
            >
                <motion.div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest mb-8">
                    <span>Անհատ</span> <ChevronRight size={10} /> <span className="text-gray-600">EvocaTOUCH</span>
                </motion.div>
                <motion.h1 className="text-[34px] md:text-[50px] font-[900] italic uppercase leading-none mb-10 tracking-tighter">
                    EvocaTOUCH
                </motion.h1>
            </motion.div>

            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="max-w-[1140px] mx-auto px-4 space-y-6 text-[16px] text-gray-600 leading-relaxed"
            >
                <motion.p>Շատերին թվում է՝ դժվար ու անիրական է ֆինանսական ոլորտում լինել կրեատիվ, սակայն Evocabank-ին հաջողվում է գտնել out of box լուծումներ:</motion.p>
                
                <ul className="list-none space-y-4 py-4">
                    {[
                        'Բացել բանկային հաշիվներ', 'Պատվիրել քարտ վայրկյանների ընթացքում', 'Ստանալ վարկ', 'Ներդնել ավանդ'
                    ].map((item, idx) => (
                        <motion.li 
                            key={idx} 
                            variants={{
                                hidden: { opacity: 0, x: -30 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            className="flex items-center gap-4 group cursor-default"
                        >
                            <motion.span 
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ repeat: Infinity, duration: 2, delay: idx * 0.5 }}
                                className="w-2 h-2 rounded-full bg-[#6610f2]" 
                            />
                            <span className="group-hover:text-[#6610f2] transition-colors font-medium">{item}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            <div className="max-w-[1140px] mx-auto px-4 py-16">
                <motion.h2 initial={{opacity: 0}} whileInView={{opacity: 1}} className="text-[24px] font-black uppercase italic mb-8">Փաստաթղթեր</motion.h2>
                <div className="grid gap-4">
                    {documents.map((doc, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02, backgroundColor: "#6610f2" }}
                            className="flex items-center justify-between bg-[#f8f9fb] p-5 rounded-2xl group transition-all cursor-pointer shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <FileText className="text-[#6610f2] group-hover:text-white transition-colors" size={28} />
                                <span className="text-[14px] font-bold group-hover:text-white transition-colors">{doc.name}</span>
                            </div>
                            <Download className="text-gray-300 group-hover:text-white" size={20} />
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="w-full bg-[#6610f2] py-24 relative overflow-hidden">
                <motion.div 
                    animate={{ 
                        y: [0, -40, 0],
                        rotate: [0, 10, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
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

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="w-full md:w-1/2 text-white text-center md:text-left mt-10 md:mt-0"
                    >
                        <h2 className="text-[36px] md:text-[48px] font-black uppercase italic mb-6 leading-tight">Օնլայն բանկինգ</h2>
                        <p className="text-white/80 mb-8 text-lg">Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է:</p>
                        <motion.button 
                            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(255,255,255,0.5)" }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-white text-[#6610f2] px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest"
                        >
                            Դառնալ հաճախորդ
                        </motion.button>
                    </motion.div>
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

                {!loading && testimonials.length > 0 && (
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
                )}
                {loading && <div className="text-center py-10 font-bold text-[#6610f2]">ԲԵՌՆՎՈՒՄ Է...</div>}
            </div>

            <style>{`
                .swiper-pagination-bullet { width: 40px; height: 4px; border-radius: 2px; transition: all 0.5s !important; }
                .swiper-pagination-bullet-active { background: #6610f2 !important; width: 60px; }
            `}</style>
        </div>
    );
};

export default EvocaTOUCH;
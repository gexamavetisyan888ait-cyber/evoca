import React, { useState, useEffect } from 'react';
import { FileText, Download, Monitor, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

// Firebase imports
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Testimonial {
    id?: string;
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

    useEffect(() => {
        // Բեռնում ենք կարծիքները Firebase-ից
        const testimonialsRef = ref(db, 'testimonials');
        const unsubscribe = onValue(testimonialsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setTestimonials(Object.values(data));
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
            {/* Breadcrumbs & Title */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="max-w-[1140px] mx-auto px-4 pt-16"
            >
                <div className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest mb-8">
                    <span>Անհատ</span> <ChevronRight size={10} /> <span className="text-[#6610f2] font-bold">EvocaTOUCH</span>
                </div>
                <h1 className="text-[40px] md:text-[60px] font-[1000] italic uppercase leading-none mb-10 tracking-tighter">
                    EvocaTOUCH
                </h1>
            </motion.div>

            {/* Introduction */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="max-w-[1140px] mx-auto px-4 space-y-6 text-[18px] text-gray-500 font-medium italic leading-relaxed"
            >
                <motion.p>Շատերին թվում է՝ դժվար ու անիրական է ֆինանսական ոլորտում լինել կրեատիվ, սակայն Evocabank-ին հաջողվում է գտնել out of box լուծումներ:</motion.p>
                
                <ul className="list-none space-y-4 py-4">
                    {[
                        'Բացել բանկային հաշիվներ', 'Պատվիրել քարտ վայրկյանների ընթացքում', 'Ստանալ վարկ', 'Ներդնել ավանդ'
                    ].map((item, idx) => (
                        <motion.li 
                            key={idx} 
                            variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
                            className="flex items-center gap-4 group cursor-default"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#6610f2]" />
                            <span className="group-hover:text-[#6610f2] transition-colors font-bold uppercase text-sm tracking-tight">{item}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            {/* Documents Section */}
            <div className="max-w-[1140px] mx-auto px-4 py-16">
                <h2 className="text-[24px] font-[1000] uppercase italic mb-8 tracking-tighter">Փաստաթղթեր</h2>
                <div className="grid gap-4">
                    {documents.map((doc, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ x: 10, backgroundColor: "#f8f9fb" }}
                            className="flex items-center justify-between border-b border-gray-100 p-5 group transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <FileText className="text-[#6610f2]" size={24} />
                                <span className="text-[14px] font-bold text-gray-700">{doc.name}</span>
                            </div>
                            <Download className="text-gray-300 group-hover:text-[#6610f2] transition-colors" size={20} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Banner Section */}
            <div className="w-full bg-[#6610f2] py-24 relative overflow-hidden">
                <div className="max-w-[1140px] mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
                    <div className="w-full md:w-1/2 relative h-[350px] mb-12 md:mb-0">
                        <motion.img 
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            src="https://www.evoca.am/images-cache/banners/1/16170067683633/485x304.jpg"
                            className="absolute left-0 top-0 w-[85%] rounded-[40px] shadow-2xl"
                        />
                    </div>
                    <div className="w-full md:w-1/2 text-white">
                        <h2 className="text-[40px] md:text-[55px] font-[1000] uppercase italic mb-6 leading-[0.9]">Օնլայն բանկինգ</h2>
                        <p className="text-white/70 mb-8 text-lg font-medium italic">Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է:</p>
                        <button className="bg-white text-[#6610f2] px-10 py-4 rounded-full font-[1000] uppercase text-xs tracking-widest shadow-xl hover:scale-105 transition-transform">
                            Դառնալ հաճախորդ
                        </button>
                    </div>
                </div>
            </div>

            {/* Testimonials Swiper */}
            <div className="max-w-[1140px] mx-auto px-4 py-24">
                <div className="flex justify-center gap-2 mb-12 text-yellow-400 text-3xl">
                    {Array(5).fill("★").map((s, i) => <span key={i}>{s}</span>)}
                </div>

                {loading ? (
                    <div className="text-center font-black text-[#6610f2] italic uppercase">Բեռնվում է...</div>
                ) : (
                    <Swiper
                        modules={[Pagination, Autoplay, EffectFade]}
                        effect="fade"
                        speed={1000}
                        autoplay={{ delay: 5000 }}
                        pagination={{ clickable: true }}
                        className="pb-20"
                    >
                        {testimonials.map((t, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="text-center max-w-3xl mx-auto px-6">
                                    <p className="text-[20px] md:text-[24px] font-bold italic leading-relaxed text-gray-700">
                                        "{t.text}"
                                    </p>
                                    <div className="mt-10">
                                        <h4 className="text-[#6610f2] font-[1000] text-xl uppercase italic tracking-tighter">{t.name}</h4>
                                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2">{t.role}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
                .font-sans { font-family: 'Montserrat', sans-serif; }
                .swiper-pagination-bullet { width: 30px; height: 3px; border-radius: 0; background: #dee2e6; opacity: 1; }
                .swiper-pagination-bullet-active { background: #6610f2 !important; width: 50px; }
            `}</style>
        </div>
    );
};

export default EvocaTOUCH;
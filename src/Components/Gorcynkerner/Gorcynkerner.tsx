import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Firebase imports
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 


interface Partner {
    id?: string;
    name: string;
    logo: string;
}

const EvocaPartners: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Բեռնում ենք գործընկերների տվյալները Firebase-ից (օգտագործում ենք 'partners' node-ը)
        const partnersRef = ref(db, 'partners');
        const unsubscribe = onValue(partnersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const formattedData = Array.isArray(data) ? data : Object.values(data);
                setPartners(formattedData);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="w-full bg-white overflow-hidden">
            
            {/* --- Hero / Video Banner Section --- */}
            <section className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-16">
                <div className="w-full lg:w-1/2 space-y-8">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[40px] md:text-[60px] font-[1000] text-[#1a1a1a] leading-none uppercase italic tracking-tighter"
                    >
                        Թվային <br /> <span className="text-[#6610f2]">Ապագան</span> Այստեղ է
                    </motion.h1>
                    <p className="text-gray-500 text-lg font-medium italic max-w-xl">
                        Evocabank-ը շարունակում է զարմացնել իր նորարար լուծումներով: Միացեք մեր տեխնոլոգիական աշխարհին:
                    </p>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full lg:w-1/2 flex justify-center lg:justify-end"
                >
                    <div className="relative w-full max-w-[500px] md:max-w-[650px] lg:max-w-none">
                        {/* Laptop/Desktop Frame Simulation */}
                        <div className="relative aspect-video bg-black rounded-t-2xl md:rounded-t-3xl border-[4px] md:border-[8px] border-[#222] shadow-2xl overflow-hidden">
                            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                <source src="https://www.evoca.am/static/video/evoca_touch.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="h-2 md:h-4 w-full bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-2xl mx-auto"></div>

                        {/* Floating Mobile Image */}
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                            className="absolute -right-2 -bottom-6 md:-right-8 md:-bottom-12 w-28 sm:w-36 md:w-44 lg:w-52 aspect-[9/19] bg-[#1a1a1a] rounded-[24px] md:rounded-[40px] border-[3px] md:border-[5px] border-[#222] shadow-2xl overflow-hidden z-20"
                        >
                            <img src="https://www.evoca.am/images-cache/banners/1/16153622710205/140x300.jpg" alt="Mobile App" className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* --- Partners Slider Section --- */}
            <section className="py-20 md:py-32 px-6 max-w-[1440px] mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    <div className="w-full lg:w-1/3 text-center lg:text-left">
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-6 uppercase italic tracking-tighter"
                        >
                            Մեր <span className="text-[#6610f2]">Գործընկերները</span>
                        </motion.h2>
                        <p className="text-gray-500 font-medium leading-relaxed mb-10 text-sm md:text-base italic">
                            Դարձե՛ք Evocabank-ի Գործընկեր և եկե՛ք միասին գնանք դեպի գունեղ նոր իրականություն:
                        </p>
                        <button className="group inline-flex items-center gap-3 text-[#6610f2] font-bold text-lg uppercase italic">
                            Բոլոր գործընկերները 
                            <span className="bg-gray-50 p-2 rounded-full group-hover:bg-[#6610f2] group-hover:text-white transition-all transform group-hover:translate-x-2">
                                <ChevronRight size={20} />
                            </span>
                        </button>
                    </div>

                    <div className="w-full lg:w-2/3 relative">
                        {/* Decorative Hand Element (Hidden on small screens) */}
                        <div className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 hidden xl:block pointer-events-none">
                            <img src="https://lightscamerasocial.com/images/footer-rock.png" alt="Hand" className="w-32 h-auto rotate-12 relative z-20" />
                            <div className="absolute inset-0 flex items-center justify-center -left-6 -top-6">
                                <div className="absolute border border-dashed border-yellow-400/30 rounded-full w-44 h-44 animate-spin-slow"></div>
                                <div className="absolute border border-dotted border-[#6610f2]/20 rounded-full w-60 h-60 animate-spin-medium"></div>
                            </div>
                        </div>

                        <div className="bg-[#f9f9fb] rounded-[32px] md:rounded-[50px] p-6 md:p-12 relative">
                            {loading ? (
                                <div className="flex justify-center items-center h-32 text-[#6610f2] font-black italic uppercase">Բեռնվում է...</div>
                            ) : (
                                <Swiper
                                    modules={[Autoplay, Navigation, FreeMode]}
                                    spaceBetween={20}
                                    slidesPerView={2}
                                    loop={true}
                                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                                    navigation={{ prevEl: '.nav-prev', nextEl: '.nav-next' }}
                                    breakpoints={{
                                        480: { slidesPerView: 2, spaceBetween: 20 },
                                        768: { slidesPerView: 3, spaceBetween: 30 },
                                        1024: { slidesPerView: 3, spaceBetween: 30 },
                                    }}
                                    className="partners-swiper"
                                >
                                    {partners.map((partner, idx) => (
                                        <SwiperSlide key={idx}>
                                            <div className="h-24 md:h-32 flex items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-transparent hover:border-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                                                <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}

                            {/* Custom Navigation Buttons */}
                            <div className="flex justify-center lg:justify-start gap-4 mt-8 lg:absolute lg:top-1/2 lg:-right-6 lg:flex-col lg:mt-0 lg:-translate-y-1/2">
                                <button className="nav-prev bg-white p-3 rounded-full shadow-md text-gray-400 hover:text-[#6610f2] transition-colors z-20">
                                    <ChevronLeft size={24} />
                                </button>
                                <button className="nav-next bg-white p-3 rounded-full shadow-md text-gray-400 hover:text-[#6610f2] transition-colors z-20">
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
                .font-sans { font-family: 'Montserrat', sans-serif; }
                
                @keyframes spin-right { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-spin-slow { animation: spin-right 15s linear infinite; }
                .animate-spin-medium { animation: spin-right 10s linear infinite; }
                
                .partners-swiper .swiper-wrapper {
                    transition-timing-function: ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default EvocaPartners;
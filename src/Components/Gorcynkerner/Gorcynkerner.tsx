import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// Firebase imports
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

// Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

interface Partner {
    id: string;
    name: string;
    logo: string;
}

const EvocaPartners: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Բեռնում ենք գործընկերների տվյալները Firebase-ից
        const partnersRef = ref(db, 'partners');
        const unsubscribe = onValue(partnersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setPartners(Object.values(data));
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <section className="w-full py-20 bg-white overflow-hidden">
            <div className="max-w-[1450px] mx-auto px-6 mb-12">
                <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-[30px] md:text-[45px] font-[1000] uppercase italic tracking-tighter text-[#1a1a1a]"
                >
                    Մեր <span className="text-[#6610f2]">Գործընկերները</span>
                </motion.h2>
            </div>

            {loading ? (
                <div className="text-center py-10 font-black text-[#6610f2] uppercase italic">Բեռնվում է...</div>
            ) : (
                <div className="w-full">
                    <Swiper
                        modules={[Autoplay, FreeMode]}
                        spaceBetween={40}
                        slidesPerView={2}
                        loop={true}
                        freeMode={true}
                        speed={3000}
                        autoplay={{
                            delay: 1,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 5 },
                            1440: { slidesPerView: 6 },
                        }}
                        className="partners-swiper"
                    >
                        {partners.map((partner) => (
                            <SwiperSlide key={partner.id}>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center justify-center p-6 h-32 grayscale hover:grayscale-0 transition-all duration-500 bg-[#f8f9fb] rounded-3xl border border-transparent hover:border-gray-100"
                                >
                                    <img 
                                        src={partner.logo} 
                                        alt={partner.name} 
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            <style>{`
                .partners-swiper .swiper-wrapper {
                    transition-timing-function: linear !important;
                }
            `}</style>
        </section>
    );
};

export default EvocaPartners;
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Firebase imports
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase";

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface Partner {
    id?: string;
    name: string;
    logo: string;
}

const EvocaPartners: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const partnersRef = ref(db, 'gorcynkerner');
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
        <section className="w-full bg-white py-24 overflow-hidden font-sans">
            <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* --- Ձախ մաս. Տեքստային բլոկ --- */}
                <div className="lg:col-span-4 z-10">
                    <h2 className="text-[40px] font-black text-[#333] leading-tight mb-6 uppercase italic tracking-tighter">
                        Գործընկերներ
                    </h2>
                    <p className="text-gray-500 text-[16px] leading-relaxed mb-8 font-medium">
                        Դարձե՛ք Evocabank-ի Գործընկեր և եկե՛ք միասին գնանք դեպի գունեղ նոր իրականություն: Դառնալով Evoca ընտանիքի անդամ՝ Դուք մուտք կգործեք ժամանակակից և յուրահատուկ աշխարհ:
                    </p>
                    <Link
                        to="/about/about"
                        className="text-[#6610f2] font-bold text-[14px] uppercase flex items-center gap-2 group transition-all"
                    >
                        Բոլոր գործընկերները
                        <span className="bg-[#f0f0f5] p-2 rounded-full group-hover:bg-[#6610f2] group-hover:text-white transition-colors">
                            <ChevronRight size={16} strokeWidth={3} />
                        </span>
                    </Link>
                </div>

                {/* --- Աջ մաս. Սլայդեր բլոկ --- */}
                <div className="lg:col-span-8 relative">

                    {/* Դեկորատիվ Օղակներ և Ձեռք */}
                    <div className="absolute -left-24 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden sm:block">
                        <div className="relative flex items-center justify-center">
                            <img
                                src="https://lightscamerasocial.com/images/footer-rock.png"
                                alt="Evoca hand"
                                className="w-36 h-auto relative z-30"
                            />
                            {/* Animated Circles */}
                            <div className="absolute w-[180px] h-[180px] border-[3px] border-dotted border-yellow-500 rounded-full animate-[spin_0s_linear_infinite]"></div>
                            <div className="absolute w-[210px] h-[210px] border-[3px] border-dashed border-yellow-500 rounded-full animate-[spin_20s_linear_infinite] reverse"></div>
                            <div className="absolute w-[240px] h-[240px] border-[3px] border-dotted  border-yellow-500 rounded-full animate-[spin_30s_linear_infinite]"></div>
                            <div className="absolute w-[270px] h-[270px] border-[3px] border-dashed border-yellow-500 rounded-full animate-[spin_20s_linear_infinite] reverse   "></div>
                            <div className="absolute w-[300px] h-[300px] border-[3px] border-dotted  border-yellow-500 rounded-full animate-[spin_30s_linear_infinite]"></div>
                        </div>
                    </div>

                    {/* Մոխրագույն Կոնտեյներ */}
                    <div className="bg-[#f2f2f7] rounded-l-[100px] py-20 pl-32 pr-12 relative min-h-[220px]">
                        {loading ? (
                            <div className="w-full flex justify-center py-10 text-gray-400 italic font-bold">ԲԵՌՆՎՈՒՄ Է...</div>
                        ) : (
                            <div className="relative group/swiper">
                                <Swiper
                                    key={partners.length} // Ստիպում է վերակառուցել Swiper-ը տվյալները ստանալիս
                                    modules={[Autoplay, Navigation]}
                                    slidesPerView={4}
                                    spaceBetween={0}
                                    loop={partners.length >= 4}
                                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                                    navigation={{
                                        prevEl: '.partner-prev',
                                        nextEl: '.partner-next'
                                    }}
                                    observer={true}
                                    observeParents={true}
                                    watchSlidesProgress={true}
                                    breakpoints={{
                                        0: { slidesPerView: 1 },
                                        640: { slidesPerView: 2 },
                                        1024: { slidesPerView: 4 }
                                    }}
                                    className="partners-swiper"
                                >
                                    {partners.map((partner, idx) => (
                                        <SwiperSlide key={idx}>
                                            <div className="flex items-center justify-center h-20 px-4 relative group/item">
                                                <img
                                                    src={partner.logo}
                                                    alt={partner.name}
                                                    className="max-h-full max-w-[120px] object-contain grayscale opacity-70 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-500"
                                                />
                                                {/* Բաժանարար գիծ */}
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-gray-300 group-last:hidden"></div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Նավիգացիոն սլաքներ */}
                                <button className="partner-prev absolute left-[-50px] top-1/2 -translate-y-1/2 text-[#6610f2] z-50 transition-all hover:scale-125 opacity-0 group-hover/swiper:opacity-100">
                                    <ChevronLeft size={36} strokeWidth={2} />
                                </button>
                                <button className="partner-next absolute right-[-20px] top-1/2 -translate-y-1/2 text-[#6610f2] z-50 transition-all hover:scale-125 opacity-0 group-hover/swiper:opacity-100">
                                    <ChevronRight size={36} strokeWidth={2} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <style>{`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    .reverse {
                        animation-direction: reverse !important;
                    }
                    
                    /* Ստիպում ենք Swiper-ին պահպանել 4 սլայդի տրամաբանությունը */
                    .partners-swiper {
                        overflow: hidden;
                        width: 100%;
                    }
                    
                    .partners-swiper .swiper-wrapper {
                        display: flex !important;
                        align-items: center !important;
                    }

                    .partners-swiper .swiper-slide {
                        display: flex !important;
                        justify-content: center !important;
                        flex-shrink: 0 !important;
                        width: 25% !important; /* 100/4 = 25% */
                    }

                    @media (max-width: 1024px) {
                        .partners-swiper .swiper-slide { width: 50% !important; }
                    }
                    @media (max-width: 640px) {
                        .partners-swiper .swiper-slide { width: 100% !important; }
                    }
                `}</style>
        </section>
    );
};

export default EvocaPartners;
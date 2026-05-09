// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation } from 'swiper/modules';
// import { ChevronRight, ChevronLeft } from 'lucide-react';
// import { Link } from 'react-router-dom';

// // Firebase imports
// import { ref, onValue } from "firebase/database";
// import { db } from "../../lib/firebase";

// // Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';

// interface Partner {
//     id?: string;
//     name: string;
//     logo: string;
// }

// const EvocaPartners: React.FC = () => {
//     const [partners, setPartners] = useState<Partner[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const partnersRef = ref(db, 'gorcynkerner');
//         const unsubscribe = onValue(partnersRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const formattedData = Array.isArray(data) ? data : Object.values(data);
//                 setPartners(formattedData);
//             }
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, []);

//     return (
//         <section className="w-full bg-white py-24 overflow-hidden font-sans">
//             <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

//                 {/* --- Ձախ մաս --- */}
//                 <div className="lg:col-span-4 z-10">
//                     <h2 className="text-[40px] font-black text-[#333] leading-tight mb-6 uppercase italic tracking-tighter">
//                         Գործընկերներ
//                     </h2>
//                     <p className="text-gray-500 text-[16px] leading-relaxed mb-8 font-medium">
//                         Դարձե՛ք Evocabank-ի Գործընկեր և եկե՛ք միասին գնանք դեպի գունեղ նոր իրականություն:
//                     </p>
//                     <Link
//                         to="/about/about"
//                         className="text-[#6610f2] font-bold text-[14px] uppercase flex items-center gap-2 group transition-all"
//                     >
//                         Բոլոր գործընկերները
//                         <span className="bg-[#f0f0f5] p-2 rounded-full group-hover:bg-[#6610f2] group-hover:text-white transition-colors">
//                             <ChevronRight size={16} strokeWidth={3} />
//                         </span>
//                     </Link>
//                 </div>

//                 {/* --- Աջ մաս --- */}
//                 <div className="lg:col-span-8 relative">
//                     {/* Ձեռք և Օղակներ */}
//                     <div className="absolute -left-24 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden sm:block">
//                         <div className="relative flex items-center justify-center">
//                             <img
//                                 src="https://lightscamerasocial.com/images/footer-rock.png"
//                                 alt="Evoca hand"
//                                 className="w-36 h-auto relative z-30"
//                             />
//                             {[180, 210, 240, 270, 300].map((size, i) => (
//                                 <div
//                                     key={i}
//                                     style={{ width: size, height: size }}
//                                     className={`absolute border-[3px] border-dotted border-yellow-400 rounded-full animate-spin-slow ${i % 2 === 0 ? 'reverse-spin' : ''}`}
//                                 ></div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Մոխրագույն Կոնտեյներ */}
//                     <div className="bg-[#f2f2f7] rounded-l-[100px] py-20 pl-32 pr-12 relative min-h-[220px]">
//                         {loading ? (
//                             <div className="w-full flex justify-center py-10 text-gray-400 italic font-bold">ԲԵՌՆՎՈՒՄ Է...</div>
//                         ) : (
//                             <div className="relative group/swiper">
//                                 <Swiper
//                                     modules={[Autoplay, Navigation]}
//                                     /* Հիմնական կարգավորումը՝ 4 սլայդ */
//                                     slidesPerView={4}
//                                     spaceBetween={0}
//                                     loop={partners.length >= 4}
//                                     autoplay={{ delay: 3000, disableOnInteraction: false }}
//                                     navigation={{
//                                         prevEl: '.partner-prev',
//                                         nextEl: '.partner-next'
//                                     }}
//                                     /* Responsive կարգավորումներ տարբեր էկրանների համար */
//                                     breakpoints={{
//                                         0: { slidesPerView: 1 },
//                                         640: { slidesPerView: 2 },
//                                         1024: { slidesPerView: 4 }
//                                     }}
//                                     className="partners-swiper !w-full"
//                                 >
//                                     {partners.map((partner, idx) => (
//                                         <SwiperSlide key={idx} className="!flex items-center justify-center">
//                                             <div className="flex items-center justify-center h-20 px-4 relative w-full group">
//                                                 <img
//                                                     src={partner.logo}
//                                                     alt={partner.name}
//                                                     /* Լոգոները միանգամից վառ և գունավոր */
//                                                     className="max-h-full max-w-[120px] object-contain transition-transform duration-300 group-hover:scale-110"
//                                                 />

//                                                 {/* Բաժանարար գիծը կերևա միայն սլայդների արանքում */}
//                                                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-gray-200 hidden lg:block"></div>
//                                             </div>
//                                         </SwiperSlide>
//                                     ))}
//                                 </Swiper>
//                                 {/* Նավիգացիա */}
//                                 <button className="partner-prev absolute left-4 top-1/2 -translate-y-1/2 text-[#6610f2] z-50 transition-all hover:scale-110 opacity-0 group-hover/swiper:opacity-100">
//                                     <ChevronLeft size={36} strokeWidth={2} />
//                                 </button>
//                                 <button className="partner-next absolute right-[-20px] top-1/2 -translate-y-1/2 text-[#6610f2] z-50 transition-all hover:scale-110 opacity-0 group-hover/swiper:opacity-100">
//                                     <ChevronRight size={36} strokeWidth={2} />
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             <style>{`
//                 @keyframes spin-slow {
//                     from { transform: rotate(0deg); }
//                     to { transform: rotate(360deg); }
//                 }
//                 .animate-spin-slow {
//                     animation: spin-slow 15s linear infinite;
//                 }
//                 .reverse-spin {
//                     animation-direction: reverse;
//                 }
//                 .partners-swiper .swiper-wrapper {
//                     align-items: center;
//                 }
//                 /* Հեռացրել ենք width: 25% !important-ը, որ Swiper-ը ինքը հաշվարկի */
//             `}</style>
//         </section>
//     );
// };

// export default EvocaPartners;
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        const partnersRef = ref(db, 'gorcynkerner');
        const unsubscribe = onValue(partnersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const formattedData = Array.isArray(data) ? data : Object.values(data);
                // Վերցնում ենք միայն առաջին 4 գործընկերոջը, եթե ուզում ես հենց 4-ը երևա
                setPartners(formattedData.slice(0, 4));
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
                        Դարձե՛ք Evocabank-ի Գործընկեր և եկե՛ք միասին գնանք դեպի գունեղ նոր իրականություն:
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

                {/* --- Աջ մաս. Քարտերի բլոկ (Առանց Swiper-ի) --- */}
                <div className="lg:col-span-8 relative">
                    
                    {/* Դեկորատիվ Օղակներ և Ձեռք */}
                    <div className="absolute -left-24 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden sm:block">
                        <div className="relative flex items-center justify-center">
                            <img
                                src="https://lightscamerasocial.com/images/footer-rock.png"
                                alt="Evoca hand"
                                className="w-36 h-auto relative z-30"
                            />
                            {[180, 210, 240, 270, 300].map((size, i) => (
                                <div
                                    key={i}
                                    style={{ width: size, height: size }}
                                    className={`absolute border-[3px] border-dotted border-yellow-400 rounded-full animate-spin-slow ${i % 2 === 0 ? 'reverse-spin' : ''}`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Մոխրագույն Կոնտեյներ և Grid */}
                    <div className="bg-[#f2f2f7] rounded-l-[100px] py-20 pl-32 pr-12 relative min-h-[220px]">
                        {loading ? (
                            <div className="w-full flex justify-center py-10 text-gray-400 italic font-bold uppercase">Բեռնվում է...</div>
                        ) : (
                            /* Grid համակարգ՝ 4 հավասար սյունակների համար */
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full items-center">
                                {partners.map((partner, idx) => (
                                    <div key={idx} className="flex items-center justify-center h-20 relative group">
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="max-h-full max-w-[120px] object-contain transition-transform duration-300 group-hover:scale-110"
                                        />
                                        
                                        {/* Բաժանարար գիծը (չի երևում վերջին քարտի աջ կողմում) */}
                                        {idx !== partners.length - 1 && (
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-gray-300 hidden md:block"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 15s linear infinite;
                }
                .reverse-spin {
                    animation-direction: reverse;
                }
            `}</style>
        </section>
    );
};

export default EvocaPartners;
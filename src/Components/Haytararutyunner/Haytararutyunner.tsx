import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Ավելացված է

// Swiper Bundle CSS
import 'swiper/swiper-bundle.css';

// --- INTERFACES ---
interface Announcement {
    id: number;
    title: string;
    date: string;
    content: string;
}

const Announcements: React.FC = () => {
    const { t } = useTranslation(); // Հուկի սահմանում
    const [openId, setOpenId] = useState<number | null>(null);

    // --- DATA ---
    const page1Data: Announcement[] = [
        { id: 1, title: "«ԷՎՈԿԱԲԱՆԿ» ՓԲԸ-ի Բաժնետերերի տարեկան ընդհանուր ժողով", date: "04.06.2025", content: "«Էվոկաբանկ» ՓԲԸ խորհուրդը տեղեկացնում է բաժնետերերի տարեկան ընդհանուր ժողովի գումարման մասին..." },
        { id: 2, title: "«ԷՎՈԿԱԲԱՆԿ» ՓԲԸ Բաժնետերերի արտահերթ ընդհանուր ժողով", date: "28.03.2025", content: "Հայտարարվում է արտահերթ ժողովի անցկացման մասին՝ օրակարգում ներառված հարցերի քննարկման նպատակով:" },
        { id: 3, title: "Արտաքին աուդիտի մրցույթի հայտարարություն", date: "30.12.2024", content: "Բանկը հայտարարում է մրցույթ արտաքին աուդիտ իրականացնող կազմակերպության ընտրության համար:" },
        { id: 4, title: "Բանկի ներսում նույն արժույթով քարտերի միջև փոխանցման սակագինը սահմանվել է 0%", date: "12.11.2024", content: "Տեղեկացնում ենք, որ այսուհետ բանկի ներսում քարտային փոխանցումների համար միջնորդավճար չի գանձվի:" },
        { id: 5, title: "МИР քարտերի սպասարկման դադարեցում", date: "13.06.2024", content: "Տեխնիկական փոփոխություններով պայմանավորված՝ МИР քարտերի սպասարկումը ժամանակավորապես կասեցված է:" },
        { id: 6, title: "Հեռահար սպասարկման պայմանների փոփոխություն", date: "25.04.2024", content: "Բանկը վերանայել է հեռահար բանկային ծառայությունների մատուցման անվտանգության պայմանները:" },
        { id: 7, title: "Նոր ավանդատեսակների ներդրման մասին հայտարարություն", date: "10.02.2024", content: "Ներդրվել են նոր խնայողական ավանդներ՝ բարելավված տոկոսադրույքներով:" },
        { id: 8, title: "Բանկային հաշիվների սակագների փոփոխություն", date: "15.01.2024", content: "Ուժի մեջ են մտել բանկային հաշիվների սպասարկման նոր սակագները:" },
        { id: 9, title: "EvocaTouch հավելվածի թարմացում", date: "05.01.2024", content: "Հավելվածի նոր տարբերակում ավելացվել են վարկային գծերի կառավարման նոր գործիքներ:" },
        { id: 10, title: "Տոնական օրերի աշխատանքային ժամանակացույց", date: "28.12.2023", content: "Տեղեկացնում ենք Ամանորյա տոների կապակցությամբ մասնաճյուղերի աշխատանքային ժամերի մասին:" }
    ];

    const page2Data: Announcement[] = [
        { id: 11, title: "Վիզա քարտապանների համար նոր խաղարկություն", date: "15.11.2023", content: "Կատարեք վճարումներ Visa քարտով և շահեք ուղևորություն դեպի Դուբայ:" },
        { id: 12, title: "SWIFT փոխանցումների համակարգի բարելավում", date: "02.11.2023", content: "Այսուհետ միջազգային փոխանցումները կատարվում են ավելի արագ և ցածր միջնորդավճարներով:" },
        { id: 13, title: "Գործընկերների ցանցի ընդլայնում Cashback-ի համար", date: "20.10.2023", content: "Ավելացել են 20-ից ավել նոր խանութներ, որտեղ գործում է մինչև 10% Cashback:" },
        { id: 14, title: "Բիզնես վարկերի տոկոսադրույքների նվազեցում", date: "05.10.2023", content: "Աջակցություն փոքր և միջին բիզնեսին՝ արտոնյալ պայմաններով վարկավորում:" },
        { id: 15, title: "Անվտանգության կանոնների հիշեցում", date: "20.09.2023", content: "Երբեք մի հայտնեք ձեր քարտի CVV կոդը կամ PIN-ը երրորդ անձանց:" },
        { id: 16, title: "Նոր մասնաճյուղի բացում Գյումրիում", date: "10.09.2023", content: "Սպասարկման նոր կենտրոնը պատրաստ է ընդունել հաճախորդներին ժամանակակից տեխնիկայով:" },
        { id: 17, title: "Ուսանողական քարտերի հատուկ առաջարկ", date: "01.09.2023", content: "Անվճար սպասարկում և զեղչեր ուսանողների համար նախատեսված քարտերին:" },
        { id: 18, title: "Հիփոթեքային վարկերի վերաֆինանսավորում", date: "15.08.2023", content: "Տեղափոխեք ձեր հիփոթեքը Evocabank և ստացեք ավելի ցածր տոկոսադրույք:" },
        { id: 19, title: "Անհատական պահատուփերի վարձակալություն", date: "01.08.2023", content: "Ապահովեք ձեր արժեքավոր իրերի պահպանությունը մեր ժամանակակից պահոցներում:" },
        { id: 20, title: "Կապիտալի ավելացման մասին հաշվետվություն", date: "20.07.2023", content: "Բանկը հրապարակում է երկրորդ եռամսյակի ֆինանսական ցուցանիշները:" }
    ];

    const page3Data: Announcement[] = [
        { id: 21, title: "Mastercard-ի հետ համատեղ արշավ", date: "10.06.2023", content: "Օգտվեք Mastercard-ից և ստացեք զեղչեր կինոթատրոններում և ռեստորաններում:" },
        { id: 22, title: "Ավտովարկավորման նոր պայմաններ", date: "25.05.2023", content: "Ձեռք բերեք ձեր երազանքի մեքենան 0% կանխավճարով որոշ մոդելների համար:" },
        { id: 23, title: "Կրիպտոարժույթների հետ կապված ռիսկերի մասին", date: "15.05.2023", content: "Կարևոր տեղեկատվություն հաճախորդների համար՝ թվային ակտիվների վերաբերյալ:" },
        { id: 24, title: "Բանկոմատների ցանցի թարմացում", date: "01.05.2023", content: "Տեղադրվել են նոր NFC տեխնոլոգիայով աշխատող բանկոմատներ ամբողջ քաղաքում:" },
        { id: 25, title: "Կանաչ էներգիայի վարկավորում", date: "20.04.2023", content: "Արևային պանելների տեղադրման համար նախատեսված հատուկ վարկեր:" },
        { id: 26, title: "Գյուղատնտեսական վարկերի մեկնարկ", date: "10.04.2023", content: "Գարնանային գյուղատնտեսական աշխատանքների համար աջակցության ծրագիր:" },
        { id: 27, title: "Արտարժույթի փոխանակման նոր հարթակ", date: "01.04.2023", content: "Փոխանակեք արտարժույթը լավագույն կուրսերով հենց հավելվածի մեջ:" },
        { id: 28, title: "Բարեգործական նախաձեռնություն", date: "20.03.2023", content: "Evocabank-ը աջակցում է կրթական ծրագրերին սահմանամերձ գյուղերում:" },
        { id: 29, title: "Թափուր աշխատատեղերի հայտարարություն", date: "10.03.2023", content: "Միացեք մեր թիմին։ Փնտրում ենք փորձառու ծրագրավորողներ և մենեջերներ:" },
        { id: 30, title: "Տարեկան աուդիտի եզրակացության հրապարակում", date: "01.03.2023", content: "Բանկը հաջողությամբ անցել է միջազգային աուդիտը և հաստատել իր կայունությունը:" }
    ];

    const allSlides = [page1Data, page2Data, page3Data];

    const toggleAccordion = (id: number): void => {
        setOpenId(openId === id ? null : id);
    };

    // --- ANIMATIONS ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    const shapes = [
        { color: "#FFD700", size: 15, top: "20%", left: "10%", delay: 0 },
        { color: "#6c1cd3", size: 10, top: "50%", left: "5%", delay: 1 },
        { color: "#00E5FF", size: 12, top: "80%", left: "8%", delay: 2 },
        { color: "#FF4081", size: 8, top: "30%", left: "15%", delay: 1.5 },
        { color: "#76FF03", size: 14, top: "60%", left: "12%", delay: 0.5 },
    ];

    return (
        <div className="relative w-full min-h-screen bg-[#fcfaff] py-20 px-4 overflow-hidden font-sans">
            
            {/* --- BG IMAGE TOP LEFT --- */}
            <div className="absolute top-20 left-0 z-0 hidden xl:block pointer-events-none w-[500px] h-[500px]">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`ring-${i}`}
                        className="absolute rounded-full border-2 border-[#D4AF37] opacity-40"
                        style={{ width: 350 + i * 30, height: 350 + i * 30, left: 50 - i * 15, top: 50 - i * 15 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                    />
                ))}
                <motion.div 
                    className="absolute top-20 left-0 z-10 opacity-70"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 0.7, y: [0, -20, 0], rotate: [0, 2, 0] }}
                    transition={{ x: { duration: 1 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
                >
                    <img src="https://mdpocket.com/image/catalog/Clipboards/Flat_Clipboards/Petite/Aluminum/Lilac/Memo-Aluminum-NoWatermark_lilac.jpg" alt="bg" className="w-[350px] relative z-10" />
                </motion.div>
                {shapes.map((shape, i) => (
                    <motion.div key={`shape-${i}`} className="absolute z-20" style={{ width: shape.size, height: shape.size, backgroundColor: shape.color, top: shape.top, left: shape.left, borderRadius: i % 2 === 0 ? "50%" : "0%" }} animate={{ y: [0, -100, 0], x: [0, 50, 0], rotate: [0, 360, 0], opacity: [0.7, 1, 0.7] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: shape.delay }} />
                ))}
            </div>

            {/* --- BG IMAGE BOTTOM RIGHT --- */}
            <motion.div 
                className="absolute bottom-[-50px] right-[-50px] z-0 opacity-40 hidden xl:block pointer-events-none"
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
                <img src="https://mdpocket.com/image/catalog/Clipboards/Flat_Clipboards/Petite/Aluminum/Lilac/Memo-Aluminum-NoWatermark_lilac.jpg" alt="bg-bottom" className="w-[450px] rotate-[-15deg]" />
            </motion.div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl md:text-4xl font-black italic uppercase text-gray-900 tracking-tighter">
                        {t('announcements_page.title')}
                    </motion.h1>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                        <Calendar size={18} className="text-gray-300" />
                        <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                            {t('announcements_page.filter_from')} <span className="mx-2 text-gray-200">|</span> {t('announcements_page.filter_to')}
                        </div>
                    </motion.div>
                </div>

                {/* Swiper */}
                <Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ 
                        clickable: true,
                        renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`
                    }}
                    onSlideChange={() => setOpenId(null)}
                    className="announcements-swiper pb-20"
                >
                    {allSlides.map((slideItems, slideIdx) => (
                        <SwiperSlide key={slideIdx}>
                            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                                {slideItems.map((item) => (
                                    <motion.div key={item.id} variants={itemVariants} className="bg-white rounded-[30px] border border-gray-100 shadow-sm overflow-hidden" whileHover={{ scale: 1.005 }}>
                                        <div onClick={() => toggleAccordion(item.id)} className="flex justify-between items-center p-7 md:p-8 cursor-pointer group">
                                            <div className="flex flex-col gap-2 relative z-10">
                                                <h3 className={`text-sm md:text-[15px] font-bold transition-colors duration-300 ${openId === item.id ? 'text-[#6c1cd3]' : 'text-gray-800 group-hover:text-[#6c1cd3]'}`}>
                                                    {item.title}
                                                </h3>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.date}</p>
                                            </div>
                                            <motion.div animate={{ rotate: openId === item.id ? 180 : 0, backgroundColor: openId === item.id ? "#6c1cd3" : "#f9fafb", color: openId === item.id ? "#ffffff" : "#6c1cd3" }} className="p-2 rounded-full transition-colors relative z-10">
                                                <ChevronDown size={20} />
                                            </motion.div>
                                        </div>
                                        <AnimatePresence>
                                            {openId === item.id && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
                                                    <div className="px-8 pb-8 pt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                                                        <div className="pt-6">{item.content}</div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{t('announcements_page.updated_at')} 05/06/2025 10:58</p>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .announcements-swiper .swiper-pagination-bullet {
                    width: 32px;
                    height: 32px;
                    background: white;
                    border: 1px solid #f3f4f6;
                    opacity: 1;
                    color: #9ca3af;
                    font-weight: 800;
                    font-size: 11px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    margin: 0 6px !important;
                    cursor: pointer;
                }
                .announcements-swiper .swiper-pagination-bullet-active {
                    background: #6c1cd3 !important;
                    color: white !important;
                    border-color: #6c1cd3;
                    box-shadow: 0 4px 15px rgba(108, 28, 211, 0.3);
                }
                .announcements-swiper .swiper-button-next,
                .announcements-swiper .swiper-button-prev {
                    color: #6c1cd3;
                    top: auto;
                    bottom: 10px;
                }
                .announcements-swiper .swiper-button-next:after, .announcements-swiper .swiper-button-prev:after {
                    font-size: 18px;
                    font-weight: bold;
                }
            ` }} />
        </div>
    );
};

export default Announcements;
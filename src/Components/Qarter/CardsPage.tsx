import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronRight, RefreshCw, Filter, 
    CreditCard, LayoutGrid, Layers,
    FileText, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Firebase Imports
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

// --- Types ---
export type TabType = 'qarter' | 'spasarkum' | 'social';
export type FilterType = 'բոլորը' | 'premium' | 'նվեր քարտեր' | 'թվային քարտեր' | 'arca' | 'visa' | 'mastercard' | 'unionpay';

export interface CardDataType {
    id: number;
    name: string;
    description: string;
    image: string;
    filters: FilterType[];
    cashback?: string;
    perks?: { label: string; value: string }[];
}

export const CardsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('qarter');
    const [activeFilter, setActiveFilter] = useState<FilterType>('բոլորը');
    const [cards, setCards] = useState<CardDataType[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Տվյալների ստացում Firebase-ից
    useEffect(() => {
        const cardsRef = ref(db, 'qarter'); // Օգտագործում ենք 'qarter' node-ը
        const unsubscribe = onValue(cardsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const cardsList = Array.isArray(data) ? data : Object.values(data);
                // Համոզվում ենք, որ ID-ն ճիշտ է փոխանցվում
                const formattedData = cardsList.map((item: any, index: number) => ({
                    ...item,
                    id: item.id || index
                }));
                setCards(formattedData as CardDataType[]);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Ֆիլտրացիայի տրամաբանություն
    const filteredCards = useMemo(() => {
        if (activeFilter === 'բոլորը') return cards;
        return cards.filter(card => card.filters && card.filters.includes(activeFilter));
    }, [activeFilter, cards]);

    const filters: FilterType[] = ['բոլորը', 'premium', 'նվեր քարտեր', 'թվային քարտեր', 'arca', 'visa', 'mastercard', 'unionpay'];

    return (
        <div className="w-full min-h-screen bg-white font-sans text-[#1a1a1a] overflow-x-hidden">
            
            {/* Sticky Navigation Header */}
            <div className="w-full bg-[#6610f2] sticky top-0 md:top-20 z-40 overflow-x-auto no-scrollbar shadow-lg">
                <div className="max-w-[1200px] mx-auto flex whitespace-nowrap">
                    {[
                        { id: 'qarter', label: 'Քարտեր', icon: <CreditCard size={14} /> },
                        { id: 'spasarkum', label: 'Սպասարկում', icon: <LayoutGrid size={14} /> },
                        { id: 'social', label: 'Սոցիալական', icon: <Layers size={14} /> },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`px-6 md:px-8 py-5 text-[11px] md:text-[13px] font-black uppercase tracking-widest transition-all border-b-4 flex items-center gap-2 ${
                                activeTab === tab.id ? 'bg-[#520dc2] border-white text-white' : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
                <AnimatePresence mode="wait">
                    
                    {/* --- SECTION 1: CARDS --- */}
                    {activeTab === 'qarter' && (
                        <motion.div 
                            key="qarter"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        >
                            <h1 className="text-[40px] md:text-[50px] font-black uppercase mb-10 italic leading-none tracking-tighter">Քարտեր</h1>

                            <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
                                {filters.map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setActiveFilter(f)}
                                        className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                                            activeFilter === f 
                                            ? 'bg-[#6610f2] border-[#6610f2] text-white shadow-md' 
                                            : 'bg-white border-gray-200 text-gray-400 hover:border-[#6610f2] hover:text-[#6610f2]'
                                        }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                                    <RefreshCw className="animate-spin text-[#6610f2]" size={40} />
                                    <p className="font-black italic uppercase text-gray-300">Բեռնվում է...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-16 md:gap-24">
                                    {filteredCards.length > 0 ? (
                                        filteredCards.map((card) => (
                                            <motion.div layout key={card.id} className="flex flex-col md:flex-row gap-10 md:gap-16 items-center group">
                                                <div className="w-full md:w-1/2 relative overflow-hidden rounded-[40px] cursor-pointer bg-[#f8f9fa] p-4 md:p-8" onClick={() => navigate(`/card/${card.id}`)}>
                                                    <motion.img 
                                                        whileHover={{ scale: 1.05, rotate: -2 }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                        src={card.image} alt={card.name} className="w-full h-auto drop-shadow-2xl" 
                                                    />
                                                </div>
                                                <div className="w-full md:w-1/2 space-y-6">
                                                    <h2 className="text-3xl md:text-4xl font-black italic uppercase leading-none text-[#1a1a1a]">{card.name}</h2>
                                                    <p className="text-gray-500 text-base md:text-lg italic font-medium leading-relaxed max-w-lg">{card.description}</p>
                                                    <button onClick={() => navigate(`/card/${card.id}`)} className="flex items-center gap-3 bg-[#1a1a1a] text-white px-10 py-4 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-[#6610f2] transition-all duration-300 w-fit">
                                                        Մանրամասն <ChevronRight size={18} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                                            <Filter className="mx-auto text-gray-200 mb-4" size={48} />
                                            <p className="text-gray-400 font-black italic uppercase">Այս ֆիլտրով քարտեր չեն գտնվել</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* --- SECTION 2: SPASARKUM --- */}
                    {activeTab === 'spasarkum' && (
                        <motion.div 
                            key="spasarkum"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                            className="max-w-[900px] mx-auto"
                        >
                            <h1 className="text-[30px] md:text-[40px] font-black uppercase mb-12 italic text-center leading-tight">Քարտերի տրամադրում և սպասարկում</h1>
                            <div className="space-y-4">
                                {[
                                    "Կենսաթոշակային քարտեր",
                                    "Evoca Gift քարտեր (Տեղեկատվական ամփոփագիր)",
                                    "Տեղեկատվական ամփոփագիր (Բանկային հաշիվներ)",
                                    "Visa Digital քարտեր (Տեղեկատվական ամփոփագիր)",
                                    "Visa Infinite քարտեր (Տեղեկատվական ամփոփագիր)",
                                    "UnionPay Business Platinum քարտեր",
                                    "Mastercard World Digital (Տեղեկատվական ամփոփագիր)"
                                ].map((doc, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-6 bg-[#f8f9fa] rounded-[25px] hover:bg-white hover:shadow-xl transition-all group cursor-pointer border border-transparent hover:border-purple-100">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-purple-50 rounded-xl text-[#6610f2] group-hover:bg-[#6610f2] group-hover:text-white transition-colors">
                                                <FileText size={20} />
                                            </div>
                                            <span className="text-[14px] md:text-[16px] font-bold text-gray-700">{doc}</span>
                                        </div>
                                        <Download size={20} className="text-gray-300 group-hover:text-[#6610f2] transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* --- SECTION 3: SOCIAL --- */}
                    {activeTab === 'social' && (
                        <motion.div 
                            key="social"
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <div className="flex flex-col md:flex-row items-center gap-10 mb-20 bg-purple-50 rounded-[50px] overflow-hidden p-8 md:p-16">
                                <div className="w-full md:w-1/2 space-y-6">
                                    <h1 className="text-[32px] md:text-[45px] font-black uppercase leading-tight italic">Սոցիալական ապահովության քարտեր</h1>
                                    <p className="text-gray-600 text-lg leading-relaxed italic">Կենսաթոշակառուներին առաջարկում ենք ARCA կենսաթոշակային վճարային քարտեր՝ հատուկ պայմաններով:</p>
                                    <button className="bg-[#6610f2] text-white px-12 py-5 rounded-full font-black uppercase text-[12px] hover:bg-[#520dc2] transition-all shadow-xl shadow-purple-200">
                                        Պատվիրել քարտ
                                    </button>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <img src="https://www.evoca.am/images-cache/menu/1/17218011250749/780x585.jpg" alt="Social" className="w-full h-auto drop-shadow-2xl rounded-3xl" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Branding */}
            <div className="w-full bg-[#6610f2] py-24 relative overflow-hidden mt-20">
                <div className="max-w-[1140px] mx-auto px-6 flex flex-col md:flex-row items-center relative z-10">
                    <div className="w-full md:w-1/2 relative h-[350px] md:h-[400px]">
                        <motion.img 
                            initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
                            src="https://www.evoca.am/images-cache/banners/1/16170067683633/485x304.jpg"
                            className="absolute left-0 top-0 w-[85%] drop-shadow-2xl rounded-2xl"
                        />
                    </div>
                    <div className="w-full md:w-1/2 text-white text-center md:text-left">
                        <h2 className="text-[40px] md:text-[55px] font-black uppercase italic mb-6 leading-none">Օնլայն բանկինգ</h2>
                        <p className="text-white/80 mb-10 text-xl italic font-medium">Կառավարիր քո ֆինանսները ցանկացած վայրից:</p>
                        <button className="bg-white text-[#6610f2] px-14 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform">
                            Միանալ հիմա
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;0,900;1,700;1,900&display=swap');
                body { font-family: 'Montserrat', sans-serif; }
            `}</style>
        </div>
    );
};

export default CardsPage;
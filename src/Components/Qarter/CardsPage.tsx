import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronRight, RefreshCw, Filter, 
    CreditCard, LayoutGrid, Layers 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Firebase Imports
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; // Ստուգիր քո ֆայլի ճանապարհը

// --- Types ---
export type TabType = 'qarter' | 'spasarkum' | 'social' | 'benefits';
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
        const cardsRef = ref(db, 'cards');
        const unsubscribe = onValue(cardsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const cardsList = Array.isArray(data) ? data : Object.values(data);
                setCards(cardsList as CardDataType[]);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Ֆիլտրացիայի տրամաբանություն
    const filteredCards = useMemo(() => {
        if (activeFilter === 'բոլորը') return cards;
        return cards.filter(card => card.filters.includes(activeFilter));
    }, [activeFilter, cards]);

    const filters: FilterType[] = ['բոլորը', 'premium', 'նվեր քարտեր', 'թվային քարտեր', 'arca', 'visa', 'mastercard', 'unionpay'];

    return (
        <div className="w-full min-h-screen bg-white font-sans text-[#1a1a1a]">
            {/* Sticky Navigation Header */}
            <div className="w-full bg-[#6610f2] sticky top-0 md:top-20 z-40 overflow-x-auto no-scrollbar shadow-lg">
                <div className="max-w-[1200px] mx-auto flex whitespace-nowrap">
                    {[
                        { id: 'qarter', label: 'Քարտեր', icon: <CreditCard size={14} /> },
                        { id: 'spasarkum', label: 'Սպասարկում', icon: <LayoutGrid size={14} /> },
                        { id: 'social', label: 'Սոցիալական', icon: <Layers size={14} /> },
                        { id: 'benefits', label: 'Evoca Benefits', icon: <ChevronRight size={14} /> },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`px-8 py-5 text-[11px] font-black uppercase tracking-widest transition-all border-b-4 flex items-center gap-2 ${
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
                    {activeTab === 'qarter' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <h1 className="text-[40px] md:text-[50px] font-black uppercase mb-10 italic leading-none tracking-tighter">
                                Քարտեր
                            </h1>

                            {/* Filter Chips */}
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

                            {/* Cards Grid */}
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                                    <RefreshCw className="animate-spin text-[#6610f2]" size={40} />
                                    <p className="font-black italic uppercase text-gray-300">Բեռնվում է...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-16 md:gap-24">
                                    {filteredCards.length > 0 ? (
                                        filteredCards.map((card) => (
                                            <motion.div 
                                                layout
                                                key={card.id} 
                                                className="flex flex-col md:flex-row gap-10 md:gap-16 items-center group"
                                            >
                                                {/* Card Image Wrapper */}
                                                <div 
                                                    className="w-full md:w-1/2 relative overflow-hidden rounded-[40px] cursor-pointer bg-[#f8f9fa] p-4 md:p-8"
                                                    onClick={() => navigate(`/card/${card.id}`)}
                                                >
                                                    <motion.img 
                                                        whileHover={{ scale: 1.05, rotate: -2 }}
                                                        transition={{ type: "spring", stiffness: 300 }}
                                                        src={card.image} 
                                                        alt={card.name} 
                                                        className="w-full h-auto drop-shadow-2xl" 
                                                    />
                                                </div>

                                                {/* Card Content */}
                                                <div className="w-full md:w-1/2 space-y-6">
                                                    <div className="space-y-3">
                                                        <div className="flex gap-2">
                                                            {card.filters.map(f => (
                                                                <span key={f} className="text-[9px] font-black text-[#6610f2] uppercase tracking-widest bg-[#6610f2]/5 px-2 py-1 rounded">
                                                                    {f}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <h2 className="text-3xl md:text-4xl font-black italic uppercase leading-none text-[#1a1a1a]">
                                                            {card.name}
                                                        </h2>
                                                    </div>
                                                    
                                                    <p className="text-gray-500 text-base md:text-lg italic font-medium leading-relaxed max-w-lg">
                                                        {card.description}
                                                    </p>

                                                    {/* Quick Stats/Perks */}
                                                    {card.perks && (
                                                        <div className="flex gap-8 py-2">
                                                            {card.perks.map((perk, i) => (
                                                                <div key={i} className="flex flex-col">
                                                                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">{perk.label}</span>
                                                                    <span className="text-sm font-bold italic text-[#6610f2]">{perk.value}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <button
                                                        onClick={() => navigate(`/card/${card.id}`)}
                                                        className="flex items-center gap-3 bg-[#1a1a1a] text-white px-10 py-4 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-[#6610f2] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-fit"
                                                    >
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
                    {activeTab !== 'qarter' && (
                        <div className="py-40 text-center font-black italic uppercase text-gray-200 text-4xl">
                            Coming Soon
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,900;1,900&display=swap');
                body { font-family: 'Montserrat', sans-serif; overflow-x: hidden; }
            `}</style>
        </div>
    );
};

export default CardsPage;
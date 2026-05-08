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
                // Վերցնում ենք միայն առաջին 4 գործընկերոջը, որպեսզի դասավորությունը լինի իդեալական
                setPartners(formattedData.slice(0, 4));
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <section className="w-full bg-white py-24 overflow-hidden font-sans">
            <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* --- Ձախ մաս. Տեքստ --- */}
                <div className="lg:col-span-4 z-10">
                    <h2 className="text-[40px] font-black text-[#333] leading-tight mb-6 uppercase italic tracking-tighter">
                        Գործընկերներ
                    </h2>
                    <p className="text-gray-500 text-[16px] leading-relaxed mb-8 font-medium italic">
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

                {/* --- Աջ մաս. 4 քարտ իրար կողք --- */}
                <div className="lg:col-span-8 relative">
                    
                    {/* Դեկորատիվ էլեմենտներ (Ձեռք և Օղակներ) */}
                    <div className="absolute -left-24 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden xl:block">
                        <div className="relative flex items-center justify-center">
                            <img 
                                src="https://lightscamerasocial.com/images/footer-rock.png" 
                                alt="hand" 
                                className="w-36 h-auto relative z-30" 
                            />
                                <div className="absolute w-[180px] h-[180px] border-[3px] border-dotted border-yellow-500 rounded-full animate-[spin_30s_linear_infinite]"></div>
                                <div className="absolute w-[210px] h-[210px] border-[3px] border-dashed border-yellow-500 rounded-full animate-[spin_20s_linear_infinite] reverse"></div>
                                <div className="absolute w-[240px] h-[240px] border-[3px] border-dotted  border-yellow-500 rounded-full animate-[spin_30s_linear_infinite]"></div>
                                <div className="absolute w-[270px] h-[270px] border-[3px] border-dashed border-yellow-500 rounded-full animate-[spin_20s_linear_infinite] reverse   "></div>
                                <div className="absolute w-[300px] h-[300px] border-[3px] border-dotted  border-yellow-500 rounded-full animate-[spin_30s_linear_infinite]"></div>
                        </div>
                    </div>

                    {/* Մոխրագույն բլոկ Grid-ով */}
                    <div className="bg-[#f2f2f7] rounded-l-[100px] py-20 pl-32 pr-12 relative min-h-[220px] flex items-center">
                        {loading ? (
                            <div className="w-full text-center text-gray-400 font-bold italic animate-pulse">ԲԵՌՆՎՈՒՄ Է...</div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 w-full divide-x divide-gray-300">
                                {partners.map((partner, idx) => (
                                    <div 
                                        key={idx} 
                                        className="flex items-center justify-center px-4 h-16 transition-all duration-500 hover:scale-105"
                                    >
                                        <img 
                                            src={partner.logo} 
                                            alt={partner.name} 
                                            className="max-h-[55px] max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
                                        />
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
                    animation: spin-slow 20s linear infinite;
                }
                
                /* Հեռացնում ենք առաջին էլեմենտի ձախ գիծը, որը Divide-ը ավտոմատ դնում է */
                .divide-x > :first-child {
                    border-left-width: 0px;
                }
            `}</style>
        </section>
    );
};

export default EvocaPartners;
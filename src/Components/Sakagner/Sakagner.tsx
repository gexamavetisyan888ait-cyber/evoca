import React, { useState } from 'react';
import { ChevronDown, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const TariffsComponent = () => {
    const [subTab, setSubTab] = useState("personal_loans");

    const subMenuItems = [
        { id: "personal_loans", label: "Վարկեր ֆիզիկական անձանց" },
        { id: "business_loans", label: "Վարկեր իրավաբանական անձանց" },
        { id: "cards", label: "Միջնորդավճարների սակագներ" },
        { id: "deposits", label: "Ավանդների սակագներ" },
        { id: "archive", label: "Արխիվ" },
    ];

    // --- ՏՎՅԱԼՆԵՐԻ ԲԱԺԻՆՆԵՐ ---

    const dataIndividual = [
        { id: 1, feature: "Վարկի տեսակ", value: "Անհատական վարկեր / EvocaHOME" },
        { id: 2, feature: "Տրամադրման նպատակ", value: "Բնակարանի վերանորոգման, կահավորման, կենցաղային տեխնիկայի և այլ անձնական կարիքների համար" },
        { id: 3, feature: "Վարկառուի տարիք", value: "21-65 տարեկան ՀՀ ռեզիդենտ ֆիզիկական անձինք" },
        { id: 4, feature: "Վարկի գումար", value: "500,000 - 10,000,000 ՀՀ դրամ" },
        { id: 5, feature: "Տարեկան տոկոսադրույք", value: "17% - 21% (կախված վարկունակության գնահատումից)" },
        { id: 6, feature: "Ժամկետ", value: "Մինչև 60 ամիս" },
        { id: 7, feature: "Արժույթ", value: "ՀՀ դրամ" },
        { id: 8, feature: "Ապահովվածություն", value: "Երաշխավորություն կամ գույքի գրավ" },
        { id: 9, feature: "Մարման եղանակ", value: "Անուիտետային (հավասարաչափ)" },
        { id: 10, feature: "Վարկի սպասարկման վճար", value: "0.1% - 0.3% ամսական" }
    ];

    const dataBusiness = [
        { id: 1, feature: "Բիզնես վարկի տեսակ", value: "Փոքր և միջին բիզնեսի վարկավորում" },
        { id: 2, feature: "Նպատակ", value: "Շրջանառու միջոցների համալրում, հիմնական միջոցների ձեռքբերում" },
        { id: 3, feature: "Գումարի չափ", value: "Սկսած 5,000,000 ՀՀ դրամից" },
        { id: 4, feature: "Արժույթ", value: "ՀՀ դրամ, ԱՄՆ դոլար, Եվրո" },
        { id: 5, feature: "Տոկոսադրույք", value: "Սկսած 12% տարեկան (կախված արժույթից)" },
        { id: 6, feature: "Ժամկետ", value: "Մինչև 120 ամիս" },
        { id: 7, feature: "Գրավի առարկա", value: "Անշարժ գույք, տրանսպորտային միջոց, սարքավորումներ" },
        { id: 8, feature: "Վարկունակություն", value: "Ֆինանսական վերլուծության հիման վրա" }
    ];

    const dataCards = [
        { id: 1, feature: "Քարտի տեսակ", value: "Visa Classic / MasterCard Standard" },
        { id: 2, feature: "Քարտի սպասարկման վճար", value: "0 - 5,000 ՀՀ դրամ տարեկան" },
        { id: 3, feature: "Կանխիկացման միջնորդավճար", value: "Բանկի բանկոմատներում՝ 0.2%, այլ բանկերում՝ 1%" },
        { id: 4, feature: "Քարտից քարտ փոխանցում", value: "0.5% (Evoca բանկի քարտերին)" },
        { id: 5, feature: "Արտարժույթի փոխարկում", value: "Բանկի սահմանած փոխարժեքով + 1%" },
        { id: 6, feature: "SMS տեղեկացում", value: "Անվճար կամ 200 դրամ (ըստ փաթեթի)" }
    ];

    const dataDeposits = [
        { id: 1, feature: "Ավանդի տեսակ", value: "Դասական ավանդ" },
        { id: 2, feature: "Արժույթ", value: "ՀՀ դրամ" },
        { id: 3, feature: "Նվազագույն գումար", value: "100,000 ՀՀ դրամ" },
        { id: 4, feature: "Տոկոսադրույք (365 օր)", value: "9.5% - 10.5%" },
        { id: 5, feature: "Տոկոսների վճարում", value: "Ամսական կամ ժամկետի վերջում" },
        { id: 6, feature: "Ավանդի համալրում", value: "Թույլատրվում է (ըստ պայմանագրի)" },
        { id: 7, feature: "Վաղաժամկետ դադարեցում", value: "Տոկոսների վերահաշվարկ 0.1%-ով" }
    ];

    const renderTable = (title, data) => (
        <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="w-full md:w-[90%] mx-auto py-12 px-4"
        >
            <h2 className="text-xl md:text-2xl font-black italic mb-8 text-[#1d1d1f] uppercase border-l-4 border-[#6c1cd3] pl-4">
                {title}
            </h2>
            <div className="bg-white border border-gray-100 rounded-[35px] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100">
                                <th className="p-6 text-[10px] font-black uppercase text-gray-400 w-16 text-center">#</th>
                                <th className="p-6 text-[10px] font-black uppercase text-gray-400">Պայմանների անվանում</th>
                                <th className="p-6 text-[10px] font-black uppercase text-[#6c1cd3]">Սակագին / Պայման</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {data.map((row) => (
                                <tr key={row.id} className="hover:bg-purple-50/10 transition-colors">
                                    <td className="p-6 text-xs font-bold text-gray-300 text-center">{row.id}.</td>
                                    <td className="p-6 text-sm font-bold text-gray-600">{row.feature}</td>
                                    <td className="p-6 text-sm font-medium text-gray-700 leading-relaxed">{row.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );

    const renderArchive = () => (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="w-full md:w-[85%] mx-auto py-12 px-6"
        >
            <h2 className="text-3xl font-black italic uppercase text-[#1d1d1f] mb-12">Արխիվ</h2>
            
            <div className="space-y-6">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Անհրաժեշտ տեղեկատվություն</p>
                {[
                    "Կանխիկ մուտքի համար Բանկի կողմից սահմանված դրույքաչափեր",
                    "Համալիր բանկային ծառայությունների մատուցման պայմաններ",
                    "Վարկավորման պայմաններ և սակագներ",
                    "Ավանդների ներգրավման պայմաններ և սակագներ",
                    "Վճարային քարտերի տրամադրման և օգտագործման պայմաններ"
                ].map((text, idx) => (
                    <details key={idx} className="group bg-white border border-gray-100 rounded-[25px] overflow-hidden shadow-sm transition-all hover:shadow-md">
                        <summary className="p-6 flex justify-between items-center cursor-pointer list-none">
                            <span className="font-bold text-gray-700 text-sm">{text}</span>
                            <ChevronDown className="group-open:rotate-180 transition-transform text-[#6c1cd3]" size={20} />
                        </summary>
                        <div className="p-8 border-t border-gray-50 bg-[#fcfaff] space-y-4">
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-black italic text-[#6c1cd3] opacity-20">2024</span>
                                <a href="#" className="text-[#6c1cd3] font-bold text-sm underline decoration-2 underline-offset-4">
                                    Ներբեռնել արխիվային փաթեթը (PDF)
                                </a>
                            </div>
                        </div>
                    </details>
                ))}
            </div>

            <div className="mt-20">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-6">Փաստաթղթեր</p>
                <div className="bg-[#fcfaff] p-8 rounded-[40px] border border-dashed border-purple-200 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="bg-[#6c1cd3] p-4 rounded-2xl text-white shadow-lg shadow-purple-200">
                            <FileText size={28} />
                        </div>
                        <div>
                            <p className="font-black text-gray-800">Տեղեկատվական ամփոփագիր</p>
                            <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-tighter">Թարմացված է՝ 07.04.2026</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-xs font-black uppercase text-[#6c1cd3] border border-purple-100 hover:bg-[#6c1cd3] hover:text-white transition-all shadow-sm">
                        <Download size={16} />
                        Ներբեռնել
                    </button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="w-full bg-white">
            <div className="bg-[#6c1cd3] sticky top-[68px] z-50 overflow-x-auto no-scrollbar shadow-xl">
                <div className="max-w-7xl mx-auto flex">
                    {subMenuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSubTab(item.id)}
                            className={`py-5 px-6 text-[10px] md:text-[11px] font-black uppercase tracking-tighter whitespace-nowrap transition-all border-b-4 ${
                                subTab === item.id ? "border-white text-white bg-white/10" : "border-transparent text-white/50 hover:text-white"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="min-h-screen pb-20">
                {subTab === "personal_loans" && renderTable("Ֆիզիկական անձանց վարկեր", dataIndividual)}
                {subTab === "business_loans" && renderTable("Վարկեր իրավաբանական անձանց", dataBusiness)}
                {subTab === "cards" && renderTable("Միջնորդավճարների սակագներ", dataCards)}
                {subTab === "deposits" && renderTable("Ավանդների սակագներ", dataDeposits)}
                {subTab === "archive" && renderArchive()}
            </div>
        </div>
    );
};

export default TariffsComponent;
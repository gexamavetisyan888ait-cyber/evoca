import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, ArrowUpRight, Calendar, Clock, Share2 } from 'lucide-react';

// =============================================================
// --- ԱՄԲՈՂՋԱԿԱՆ ՏՎՅԱԼՆԵՐԻ ԲԱԶԱ (28 ՆՈՐՈՒԹՅՈՒՆ) ---
// =============================================================
interface NewsItem {
    id: number;
    category: string;
    image: string;
    title: string;
    description: string;
    fullText: string[];
    date: string;
}

const NEW_DATABASE: NewsItem[] = [
    { id: 1, category: "Բիզնես", image: "https://www.evoca.am/images-cache/news/1/17386587462914/438x328.png", title: "Evocabank-ը՝ Լավագույն Թվային Բանկ 2026", description: "Global Finance-ը բարձր է գնահատել բանկի նորարարությունները:", fullText: ["Evocabank-ը հերթական անգամ հաստատեց իր առաջատար դիրքը:", "Մրցանակը շնորհվել է թվային լուծումների համար:"], date: "26.04.2026" },
    { id: 2, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/news/1/17382449387143/450x295.png", title: "Mastercard-ի հատուկ խաղարկություն", description: "Շահիր էլեկտրական մեքենա քո Evoca քարտով:", fullText: ["Մասնակցիր խաղարկությանը՝ կատարելով անկանխիկ գնումներ:", "Մեծ մրցանակներ՝ ձեր սպասումներից ավելին:"], date: "25.04.2026" },
    { id: 3, category: "Ներդրւմներ", image: "https://www.evoca.am/images-cache/news/1/17339403687437/450x295.jpg", title: "AI-ն արդեն EvocaTouch հավելվածում", description: "Նոր չաթ-բոտը կօգնի ձեզ կատարել գործարքները:", fullText: ["Արհեստական բանականությունը ծառայում է ձեզ:", "Արագացրեք ձեր բանկային գործարքները մեր նոր գործիքով:"], date: "24.04.2026" },
    { id: 4, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/news/1/17373763573222/450x295.jpg", title: "Career City Fest 2026-ի արդյունքները", description: "500+ երիտասարդներ ծանոթացան բանկի աշխատանքին:", fullText: ["Հաջողված օր՝ լի նոր ծանոթություններով:", "Մենք աջակցում ենք կարիերայի զարգացմանը:"], date: "23.04.2026" },
    { id: 5, category: "Բիզնես", image: "https://www.evoca.am/images-cache/blogs/1/17683779856926/510x383.png", title: "Ապագայի կրթություն. նոր ծրագիր", description: "Evocabank-ը ֆինանսավորում է IT լաբորատորիաներ:", fullText: ["Կրթությունը մեր առաջնահերթությունն է:", "Ներդրումներ ապագա սերնդի համար:"], date: "22.04.2026" },
    { id: 6, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/blogs/1/17683792444137/510x383.png", title: "Տարվա նորարարական պրոդուկտ", description: "Մեր նոր վճարային օղակը ստացել է մրցանակ:", fullText: ["Մրցանակը՝ որպես աշխատանքի գնահատական:", "Մենք ստեղծում ենք հարմարավետություն:"], date: "21.04.2026" },
    { id: 7, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/blogs/1/17658933558475/510x383.png", title: "Աշխատանքային ժամերի փոփոխություն", description: "Տեղեկացեք տոնական օրերի գրաֆիկին:", fullText: ["Խնդրում ենք նախապես պլանավորել այցերը:", "Մեր աջակցման կենտրոնը հասանելի է 24/7:"], date: "20.04.2026" },
    { id: 8, category: "ներդումներ", image: "https://www.evoca.am/images-cache/blogs/1/17639790235101/510x383.png", title: "Թվային բանկինգի ապագան", description: "Ինչպես է տեխնոլոգիան փոխում մեր առօրյան:", fullText: ["Թվային տրանսֆորմացիան հաջողությամբ շարունակվում է:", "Շնորհակալություն վստահության համար:"], date: "19.04.2026" },
    { id: 9, category: "Բիզնես", image: "https://www.evoca.am/images-cache/blogs/1/17404671397799/510x383.png", title: "Նոր քարտային հնարավորություններ", description: "Բացահայտեք Evoca-ի նոր պրոդուկտները:", fullText: ["Ամեն ամիս՝ նոր հնարավորություններ:", "Միացեք խաղարկությանը հիմա:"], date: "18.04.2026" },
    { id: 10, category: "Ներդրումներ", image: "https://www.evoca.am/images-cache/blogs/1/17327967150177/510x383.png", title: "Սմարթ գործարքներ", description: "Կառավարեք ձեր ֆինանսները մեկ հպումով:", fullText: ["Հարցեր ունե՞ք, AI-ն կպատասխանի:", "Հեշտացնում ենք բանկային առօրյան:"], date: "17.04.2026" },
    { id: 11, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/blogs/1/17296851097593/510x383.png", title: "Երիտասարդական նախաձեռնություններ", description: "Evoca-ն աջակցում է ստեղծարար մտքին:", fullText: ["Միջոցառումը անցավ շատ բարձր մակարդակով:", "Սպասում ենք ձեզ մեր թիմում:"], date: "16.04.2026" },
    { id: 12, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/blogs/1/16339589553963/510x383.png", title: "Կայուն զարգացման ծրագրեր", description: "Մեր պատասխանատվությունը շրջակա միջավայրի նկատմամբ:", fullText: ["Հմտությունները՝ հաջողության գրավական:", "Մեր նախագիծը ընդլայնվում է:"], date: "15.04.2026" },
    { id: 13, category: "Բիզնես", image: "https://www.evoca.am/images-cache/blogs/1/17216331113919/510x383.png", title: "Լավագույն սպասարկման որակ", description: "Հաճախորդների գնահատականը մեր ամենամեծ մրցանակն է:", fullText: ["Ոճային և հարմարավետ լուծում:", "Սա միայն սկիզբն է:"], date: "14.04.2026" },
    { id: 14, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/blogs/1/17186317173483/510x383.jpg", title: "Մասնաճյուղերի թարմացված ցանկ", description: "Գտեք ձեզ ամենամոտ Evoca-ն:", fullText: ["Փոփոխությունների մասին տեղեկացեք կայքում:", "Մենք հասանելի ենք օնլայն:"], date: "13.04.2026" },
    { id: 15, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/blogs/1/17128187874533/510x383.jpg", title: "Ապահով բանկինգ", description: "Ինչպես պաշտպանվել զեղծարարներից:", fullText: ["Շարունակում ենք զարգացման ուղին:", "Ձեր հարմարավետությունը մեր նպատակն է:"], date: "12.04.2026" },
    { id: 16, category: "Ներդումներ", image: "https://www.evoca.am/images-cache/blogs/1/17038544649688/510x383.png", title: "Անհատական վարկեր", description: "Ձեր երազանքները իրականացնելու ժամանակն է:", fullText: ["Մրցանակները սպասում են իրենց հերոսներին:", "Շտապեք մասնակցել:"], date: "11.04.2026" },
    { id: 17, category: "Բիզնես", image: "https://www.evoca.am/images-cache/blogs/1/1703767719255/510x383.png", title: "Open Banking հնարավորություններ", description: "Կապակցեք ձեր բոլոր հաշիվները մեկ վայրում:", fullText: ["Նորարարություն՝ ձեր հեռախոսում:", "Այն հասկանում է ձեր յուրաքանչյուր խոսքը:"], date: "10.04.2026" },
    { id: 18, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/blogs/1/16679076091685/510x383.jpg", title: "Ամառային փառատոն Evoca-ի հետ", description: "Երաժշտություն և լավ տրամադրություն:", fullText: ["Հարուստ օրակարգ և նոր գիտելիքներ:", "Մենք հպարտ ենք մեր մասնակցությամբ:"], date: "09.04.2026" },
    { id: 19, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/blogs/1/1684499196192/510x383.png", title: "Կանաչ էներգիայի աջակցություն", description: "Էկոլոգիապես մաքուր տեխնոլոգիաների ֆինանսավորում:", fullText: ["Կրթության որակը՝ առաջնահերթություն:", "Միասին կառուցում ենք վառ ապագա:"], date: "08.04.2026" },
    { id: 20, category: "Ներդրումներ", image: "https://www.evoca.am/images-cache/blogs/1/16691870758279/510x383.jpg", title: "Տարվա լավագույն դիզայն", description: "Մեր քարտերի դիզայնը ճանաչվել է լավագույնը:", fullText: ["Նորարարական մոտեցում յուրաքանչյուր մանրուքի մեջ:", "Սա հաջողության հիմքն է:"], date: "07.04.2026" },
    { id: 21, category: "Բիզնեսլ", image: "https://www.evoca.am/images-cache/blogs/1/1703162335976/510x383.png", title: "Հաճախ տրվող հարցեր", description: "Ամեն ինչ Evoca-ի ծառայությունների մասին:", fullText: ["Տեղեկացված եղեք փոփոխություններին:", "Մենք միշտ ձեզ հետ ենք:"], date: "06.04.2026" },
    { id: 22, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/blogs/1/16430963363528/510x383.png", title: "Վարկային գիծ վայրկյանների ընթացքում", description: "Ստացեք գումարը հենց հավելվածում:", fullText: ["Միջազգային ճանաչում՝ հայկական բանկին:", "Սա մեր բոլորի հաջողությունն է:"], date: "05.04.2026" },
    { id: 23, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/blogs/1/16329119822114/510x383.jpg", title: "Կուտակային ավանդներ", description: "Աճեցրեք ձեր խնայողությունները մեզ հետ:", fullText: ["Մի հապաղեք, խաղարկեք ձեր հնարավորությունը:", "Մեքենան սպասում է իր տիրոջը:"], date: "04.04.2026" },
    { id: 24, category: "Ներդրումներ", image: "https://www.evoca.am/images-cache/blogs/1/16329990024208/510x383.png", title: "Անհպում վճարումներ", description: "Վճարեք ձեր ժամացույցով կամ մատանիով:", fullText: ["Խելացի լուծումներ հասարակ խնդիրների համար:", "Արդյունավետությունը մեր գլխավոր նպատակն է:"], date: "03.04.2026" },
    { id: 25, category: "Բիզնես", image: "https://www.evoca.am/images-cache/blogs/1/16329967423394/510x383.png", title: "Բիզնես նախաճաշ Evoca-ի հետ", description: "Փորձի փոխանակում գործընկերների միջև:", fullText: ["Կարիերայի սկիզբը մեր հետ է:", "Շատ հետաքրքիր հարցուպատասխաններ:"], date: "02.04.2026" },
    { id: 26, category: "CSRԿենսակերպ", image: "https://www.evoca.am/images-cache/blogs/1/16335957379/510x383.png", title: "Մշակութային աջակցություն", description: "Հայկական արվեստի զարգացման ծրագիր:", fullText: ["Նորարարություններ կրթության մեջ:", "Մենք աջակցում ենք տաղանդներին:"], date: "01.04.2026" },
    { id: 27, category: "Կենսակերպ", image: "https://www.evoca.am/images-cache/blogs/1/17639790235101/510x383.png", title: "Տարվա վստահելի գործընկեր", description: "Շնորհակալ ենք մեր հաճախորդներին:", fullText: ["Մեր պրոդուկտները՝ ձեր ծառայության մեջ:", "Շնորհակալ ենք գնահատանքի համար:"], date: "31.03.2026" },
    { id: 28, category: "Ներդրումներ", image: "https://www.evoca.am/images-cache/blogs/1/16336898810327/510x383.png", title: "Անվտանգության նոր կանոններ", description: "Ինչպես ապահովել ձեր տվյալների գաղտնիությունը:", fullText: ["Միշտ տեղեկացված մնացեք:", "Բարի տոներ ձեզ:"], date: "30.03.2026" },
];

const InfoPage = ({ news, onBack }: { news: NewsItem, onBack: () => void }) => {
    const repetitiveText = [...(news.fullText || []), ...(news.fullText || []), ...(news.fullText || [])];
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-[1450px] mx-auto px-6 py-12">
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black mb-10 transition-colors">
                <ArrowLeft size={18} /> Վերադառնալ
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="bg-[#6610f2] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{news.category}</span>
                        <div className="flex items-center gap-2 text-gray-400 text-sm"><Calendar size={14} /> {news.date}</div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm"><Clock size={14} /> 8 րոպե ընթերցում</div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight italic uppercase tracking-tighter">{news.title}</h1>
                    <div className="space-y-6 text-gray-600 leading-relaxed text-lg italic">
                        {repetitiveText.map((p, i) => (
                            <p key={i} className={i % 2 === 0 ? "opacity-100" : "opacity-80"}>{p}</p>
                        ))}
                    </div>
                    <div className="pt-10 border-t border-gray-100 flex items-center gap-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Կիսվել՝</span>
                        <Share2 size={18} className="text-gray-400 hover:text-[#6610f2] cursor-pointer transition-colors" />
                    </div>
                </div>
                <div className="sticky top-10">
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl rotate-1">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const NewsPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'main' | 'all'>('main');
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [activeTab, setActiveTab] = useState<string>("Բոլորը");

    const categories = ["Բոլորը", "Բիզնես","Կենսակերպ","Ներդրումներ"];
    const filteredNews = activeTab === "Բոլորը" ? NEW_DATABASE : NEW_DATABASE.filter(n => n.category === activeTab);

    const handleNewsClick = (id: number) => {
        const item = NEW_DATABASE.find(n => n.id === id);
        if (item) setSelectedNews(item);
    };

    return (
        <div className="min-h-screen bg-white text-[#1a1a1a] font-sans overflow-x-hidden">
            <AnimatePresence mode="wait">
                {selectedNews ? (
                    <InfoPage news={selectedNews} onBack={() => setSelectedNews(null)} />
                ) : (
                    <>
                        {viewMode === 'main' ? (
                            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-[1450px] mx-auto px-6 py-12">

                                {/* --- 1. HEADER SECTION --- */}
                                <div className="flex justify-between items-end mb-16">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 bg-[#6610f2] rounded-full"></div>
                                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Blog</span>
                                        </div>
                                        <h1 className="text-[58px] md:text-[92px] font-black italic uppercase tracking-tighter leading-[0.82] py-2">
                                            Monthly <br /> Recap
                                        </h1>
                                    </div>
                                    <button
                                        onClick={() => setViewMode('all')}
                                        className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] border-b-[3px] border-black pb-1 hover:text-[#6610f2] hover:border-[#6610f2] transition-all mb-4"
                                    >
                                        See all <ArrowUpRight size={20} />
                                    </button>
                                </div>

                                {/* --- 2. MAIN CONTENT GRID (8+4) --- */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                                    {/* LEFT COLUMN: Main Articles */}
                                    <div className="lg:col-span-8 space-y-24">

                                        {/* Big Hero 1 */}
                                        <div className="space-y-10 group cursor-pointer" onClick={() => handleNewsClick(1)}>
                                            <div className="overflow-hidden rounded-[3rem] shadow-sm bg-gray-50">
                                                <img
                                                    src="https://www.evoca.am/images-cache/news/1/1776423301974/780x585.png"
                                                    className="w-full h-auto object-cover aspect-[16/9] group-hover:scale-105 transition-transform duration-700"
                                                    alt="Main Hero"
                                                />
                                            </div>
                                            <div className="max-w-3xl">
                                                <p className="text-[22px] md:text-[28px] text-gray-500 font-medium italic leading-[1.35]">
                                                    Monthly Recap-ն օգնում է ամփոփել ամիսը, հասկանալ ձեռքբերումները, բաց թողածները և փոքր քայլերով կատարել մեծ ու արդյունավետ փոփոխություներ։
                                                </p>
                                            </div>
                                        </div>

                                        {/* Big Hero 2 */}
                                        <div className="space-y-10 group cursor-pointer" onClick={() => handleNewsClick(4)}>
                                            <div className="overflow-hidden rounded-[3rem] shadow-sm bg-gray-50">
                                                <img
                                                    src="https://www.evoca.am/images-cache/news/1/17545729507567/616x462.png"
                                                    className="w-full h-auto object-cover aspect-[16/9] group-hover:scale-105 transition-transform duration-700"
                                                    alt="Lifestyle"
                                                />
                                            </div>
                                            <h2 className="text-[46px] md:text-[64px] font-black italic uppercase tracking-tighter leading-[0.88]">
                                                Բացահայտիր Նոր <br /> Կենսակերպ Evoca-ի հետ
                                            </h2>
                                        </div>
                                    </div>

                                    {/* RIGHT COLUMN: Small Feed Items */}
                                    <div className="lg:col-span-4 flex flex-col gap-12">
                                        {[2, 3, 5].map((id) => {
                                            const news = NEW_DATABASE.find(n => n.id === id);
                                            return (
                                                <div
                                                    key={id}
                                                    onClick={() => handleNewsClick(id)}
                                                    className="group cursor-pointer flex flex-col gap-5 border-b border-gray-100 pb-10 last:border-0"
                                                >
                                                    <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/3] shadow-md bg-gray-50">
                                                        <img src={news?.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                                        <div className="absolute top-5 left-5">
                                                            <span className="bg-white/95 backdrop-blur-sm text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight shadow-sm">
                                                                {news?.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-start gap-4 px-2">
                                                        <h3 className="text-[21px] font-black italic uppercase tracking-tighter leading-[1.1] group-hover:text-[#6610f2] transition-colors">
                                                            {news?.title}
                                                        </h3>
                                                        <div className="mt-1 min-w-[40px] h-[40px] rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                                                            <ChevronRight size={22} />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* --- 3. BOTTOM HORIZONTAL GRID --- */}
                                <div className="mt-32 pt-24 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-16">
                                    {[8, 9, 10].map((id) => {
                                        const news = NEW_DATABASE.find(n => n.id === id);
                                        return (
                                            <div key={id} className="group cursor-pointer space-y-7" onClick={() => handleNewsClick(id)}>
                                                <div className="overflow-hidden rounded-[2.8rem] aspect-[4/3] shadow-sm bg-gray-50">
                                                    <img src={news?.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                                                </div>
                                                <div className="space-y-3">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">{news?.date}</span>
                                                    <h3 className="text-[25px] font-black italic uppercase tracking-tighter leading-tight group-hover:text-[#6610f2] transition-colors">
                                                        {news?.title}
                                                    </h3>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* --- 4. SOCIAL MEDIA GRID (Instagram/TikTok style) --- */}
                                <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[11, 12, 13, 14].map((id) => {
                                        const news = NEW_DATABASE.find(n => n.id === id);
                                        return (
                                            <div key={id} className="relative aspect-square overflow-hidden rounded-[2rem] group cursor-pointer">
                                                <img
                                                    src={news?.image}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    alt=""
                                                />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                                            <ArrowUpRight size={24} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>


                                {/* --- 5. PRE-FOOTER / BOTTOM CARDS --- */}
                                <div className="mt-32 mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[15, 16].map((id) => {
                                        const news = NEW_DATABASE.find(n => n.id === id);
                                        return (
                                            <div
                                                key={id}
                                                onClick={() => handleNewsClick(id)}
                                                className="group cursor-pointer relative h-[400px] rounded-[3.5rem] overflow-hidden"
                                            >
                                                <img
                                                    src={news?.image}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                                    alt=""
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-12 flex flex-col justify-end">
                                                    <span className="text-[#6610f2] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Featured</span>
                                                    <h3 className="text-white text-[32px] font-black italic uppercase tracking-tighter leading-none mb-6">
                                                        {news?.title}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-white/60 text-[11px] font-bold uppercase tracking-widest">
                                                        <span>Read More</span>
                                                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                                            <ChevronRight size={16} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                            </motion.div>
                        ) : (
                            <motion.div key="all" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-[1450px] mx-auto px-6 py-12">
                                <div className="flex flex-col gap-6 mb-12 text-center lg:text-left">
                                    <div className="flex items-center gap-2 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                                        <span className="cursor-pointer" onClick={() => setViewMode('main')}>Նորություններ</span> <span className="text-gray-300">/</span> <span className="text-black">Արխիվ</span>
                                    </div>
                                    <h1 className="text-6xl font-black italic uppercase tracking-tighter">Արխիվ</h1>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-16 justify-center lg:justify-start">
                                    {categories.map(cat => (
                                        <button key={cat} onClick={() => setActiveTab(cat)} className={`px-7 py-2.5 rounded-full text-[11px] font-bold transition-all ${activeTab === cat ? "bg-[#6610f2] text-white shadow-lg" : "bg-[#f3f4f6] text-gray-500 hover:bg-gray-200"}`}>
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                                    {filteredNews.map((news) => (
                                        <motion.div layout key={news.id} onClick={() => setSelectedNews(news)} className="group cursor-pointer">
                                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-5 shadow-sm">
                                                <img src={news.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" alt="" />
                                            </div>
                                            <div className="space-y-3">
                                                <h3 className="text-[17px] font-black leading-snug uppercase italic group-hover:text-[#6610f2] transition-colors">{news.title}</h3>
                                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{news.date}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NewsPage;
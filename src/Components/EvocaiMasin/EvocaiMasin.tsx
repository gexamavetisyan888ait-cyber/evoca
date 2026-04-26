import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination,Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, CheckCircle2, Users, Building2, Globe, Award, Quote } from 'lucide-react';
import { initializeApp } from "firebase/app";
// Ավելացրու այս տողը Realtime Database-ի համար
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "ՔՈ_API_KEY",
  authDomain: "ՔՈ_PROJECT_ID.firebaseapp.com",
  // Realtime Database-ի համար սա կարևոր է
  databaseURL: "https://ՔՈ_PROJECT_ID-default-rtdb.firebaseio.com", 
  projectId: "ՔՈ_PROJECT_ID",
  storageBucket: "ՔՈ_PROJECT_ID.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Ստեղծում և էքսպորտ ենք անում db-ն
export const db = getDatabase(app);


// --- DATA ---
const historyData = [
    { year: "2025", text: "Բանկը փոխեց իր կազմակերպաիրավական ձևը՝ ՓԲԸ-ից ԲԲԸ-ի: Evoca-ն և EBRD-ն ստորագրեցին համագործակցության համաձայնագիր։", image: "https://www.evoca.am/images-cache/histories/1/17574211752061/450x330.png" },
    { year: "2024", text: "Evocabank-ը ձեռք է բերել նոր միջազգային գործընկերներ, այդ թվում՝ EIB Global-ը։", image: "https://www.evoca.am/images-cache/histories/1/17240707281875/450x330.png" },
    { year: "2023", text: "Evocabank-ը թողարկել է նոր, գերժամանակակից EvocaTOUCH 2 և EvocaINVEST հավելվածները։", image: "https://www.evoca.am/images-cache/histories/1/17001230844576/450x330.jpg" },
    { year: "2022", text: "Evoca-ն համալրել է կանոնադրական կապիտալը 3 մլրդ դրամով: Գործարկել է Evoca mobile POS-ը։", image: "https://www.evoca.am/images-cache/histories/1/16542512333235/450x330.png" },
    { year: "2021", text: "Evoca-ի նոր կայքը Awwwards թիմի կողմից արժանացել է 2 մրցանակի:", image: "https://www.evoca.am/images-cache/histories/1/16448252170155/450x330.png" },
    { year: "2020", text: "Evocabank-ը յուրահատուկ կերպով նշեց իր 30-ամյակը՝ կազմակերպելով լուսային դրոն շոու:", image: "https://www.evoca.am/images-cache/histories/1/16328279547034/450x330.png" }
];

const coreValues = [
    { title: "Ազնվություն", desc: "Մենք ազնիվ ենք գործում բոլոր հարաբերություններում:" },
    { title: "Նորարարություն", desc: "Մենք շարունակաբար ներդնում և կիրառում ենք նորարարություններ:" },
    { title: "Հուսալիություն", desc: "Մենք կայուն ենք և հուսալի թե' հաճախորդների համար:" },
    { title: "Թափանցիկություն", desc: "Մենք բաց ենք և թափանցիկ հանրության առջև:" },
    { title: "Հաճախորդների վստահություն", desc: "Հաճախորդները մեր գործունեության կենտրոնում են:" },
    { title: "Հարմարավետություն", desc: "Մենք ձգտում ենք բարելավել հաճախորդների կենսակերպը:" },
    { title: "Գործարար հեղինակություն", desc: "Բարի համբավը մեր ամենաթանկ ակտիվն է:" },
    { title: "Թիմային ոգի", desc: "Մենք համախմբված ենք լավագույն թիմում:" }
];


const EvocaAboutPage = () => {
    const [currentTab, setCurrentTab] = useState("info");
    const [historyIdx, setHistoryIdx] = useState(0);

    const menuItems = [
        { id: "info", label: "Ընդհանուր" },
        { id: "structure", label: "Կառուցվածք" },
        { id: "shareholders", label: "Բաժնետերեր" },
        { id: "management", label: "Ղեկավարություն" },
        { id: "partners", label: "Գործընկերներ" },
        { id: "reviews", label: "Կարծիքներ" },
        { id: "csr", label: "CSR" }
    ];
    const partnersList1 = [
    { name: "ChipStore", img: "https://www.evoca.am/images-cache/partners/1/17104032198171/348x150_grayscale.png" },
    { name: "Mastercard", img: "https://www.evoca.am/images-cache/partners/1/17077436606929/348x150_grayscale.png" },
    { name: "ArCa", img: "https://www.evoca.am/images-cache/partners/1/17107493820339/348x150_grayscale.png" },
    { name: "EBRD", img: "https://www.evoca.am/images-cache/partners/1/17072192942611/348x150_grayscale.png" },
    { name: "FMO", img: "https://www.evoca.am/images-cache/partners/1/17072192635138/348x150_grayscale.png" },
    { name: "EIB", img: "https://www.evoca.am/images-cache/partners/1/17072192435541/348x150_grayscale.png" },
    { name: "Symbiotics", img: "https://www.evoca.am/images-cache/partners/1/16104577054001/348x150_grayscale.png" },
    { name: "BlueOrchard", img: "https://www.evoca.am/images-cache/partners/1/16104583322099/348x150_grayscale.png" },
    { name: "ResponsAbility", img: "https://www.evoca.am/images-cache/partners/1/17689930369925/348x150_grayscale.png" },
];

const partnersList2 = [
    { name: "J.P. Morgan", img: "https://www.evoca.am/images-cache/partners/1/16104594273635/348x150_grayscale.png" },
    { name: "Commerzbank", img: "https://www.evoca.am/images-cache/partners/1/1610459808737/348x150_grayscale.png" },
    { name: "Raiffeisen", img: "https://www.evoca.am/images-cache/partners/1/16104599802947/348x150_grayscale.png" },
    { name: "Bank of Georgia", img: "https://www.evoca.am/images-cache/partners/1/16104603665095/348x150_grayscale.png" },
    { name: "MoneyGram", img: "https://www.evoca.am/images-cache/partners/1/16104604109064/348x150_grayscale.png" },
    { name: "UniStream", img: "https://www.evoca.am/images-cache/partners/1/16104604382658/348x150_grayscale.pnghttps://www.evoca.am/images-cache/partners/1/16099241471714/150x80.png" },
];

const reviewsData = [
    { 
        id: 1, 
        author: "Գարիկ Պապոյան", 
        role: "Հաղորդավար, երաժիշտ", 
        text: "Evocabank-ը ոչ միայն բանկ է, այլև ապրելակերպ։ Թվային լուծումները և արագությունը զարմացնում են ամեն օր։ Սա հենց այն է, ինչ պետք է ժամանակակից մարդուն։", 
        img: "https://yt3.googleusercontent.com/o9nkNU6-YgBnfBPef0Tg6EuH7l4G8j6gewNzXspXUyQ-M7MYBZmoTZmILmoqWmNz_y9pbQudJQ=s900-c-k-c0x00ffffff-no-rj" 
    },
    { 
        id: 2, 
        author: "Իվետա Մուկուչյան", 
        role: "Երգչուհի", 
        text: "Ինձ համար կարևոր է հարմարավետությունը և էսթետիկան։ Evoca-ն համատեղում է այս երկուսը։ Touch հավելվածը պարզապես լավագույնն է շուկայում։", 
        img: "https://www.evoca.am/images-cache/news/1/16184040636341/780x585.png" 
    },
    { 
        id: 3, 
        author: "Արամ MP3", 
        role: "Երգիչ, հաղորդավար", 
        text: "Առաջադեմ տեխնոլոգիաներ և պրոֆեսիոնալ թիմ։ Evoca-ի հետ ամեն ինչ պարզ է ու հասանելի։ Միշտ քայլ առաջ են բոլորից։", 
        img: "https://www.1tv.am/images/video/5/22400/02.jpeg" 
    }
];

    const renderContent = () => {
        switch (currentTab) {
            case "info":
                return (
                    <div className="animate-in fade-in duration-500">
                        {/* 1. ԸՆԴՀԱՆՈՒՐ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ (Original UI) */}
                        <section className="py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                            <div className="md:w-1/2 space-y-6">
                                <h1 className="text-4xl font-black italic">Ընդհանուր տեղեկատվություն</h1>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    <span className="text-[#6c1cd3] font-bold">Evocabank</span>-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է, որն առանձնանում է տեղեկատվական նորագույն տեխնոլոգիաների ակտիվ կիրառմամբ: Մենք աշխատում ենք <b>mobile-first</b> ֆորմատով:
                                </p>
                            </div>
                            <div className="md:w-1/2">
                                <img src="https://www.evoca.am/images-cache/about_pages/1/16201288751575/780x570.png" alt="Evoca" className="rounded-3xl shadow-xl w-full" />
                            </div>
                        </section>

                        {/* 2. ՄԵՐ ՏԵՍԼԱԿԱՆԸ (Original UI) */}
                        <section className="bg-[#6c1cd3] text-white py-24 px-6 relative overflow-hidden">
                            <div className="max-w-7xl mx-auto relative z-10">
                                <h2 className="text-3xl font-black uppercase italic mb-10 border-b-2 border-white w-fit pb-2">Մեր տեսլականը</h2>
                                <p className="text-2xl md:text-4xl font-medium leading-tight max-w-4xl">
                                    Լինել ամենանորարար և առաջադեմ բանկային ծառայություններ մատուցող ֆինանսական հաստատությունը Հայաստանում, որի բոլոր ծառայություններից հնարավոր կլինի օգտվել առանց բանկ այցելելու:
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 opacity-10 uppercase font-black italic text-[200px] translate-x-1/4">Vision</div>
                        </section>

                        {/* 3. ՄԵՐ ԱՌԱՔԵԼՈՒԹՅՈՒՆԸ (Original UI) */}
                        <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                            <div className="md:w-1/2 relative">
                                <img src="https://www.evoca.am/images-cache/about_pages/1/160992374514/946x430.jpg" className="rounded-[40px] shadow-xl" alt="Mission" />
                                <div className="absolute -bottom-10 -right-5 bg-white p-8 rounded-[30px] shadow-2xl border border-gray-100 max-w-sm">
                                    <p className="text-gray-700 font-medium">Նորագույն տեխնոլոգիաների ակտիվ կիրառմամբ մատուցել ֆինանսական ծառայությունները պարզ, արագ և հարմարավետ:</p>
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <p className="text-xl text-gray-500 italic">Մենք մշտապես կատարելագործում ենք մեր ծառայությունները՝ դարձնելով մարդկանց կյանքն ավելի հարմարավետ:</p>
                            </div>
                        </section>

                        {/* 4. ԲԱՆԿԻ ՊԱՏՄՈՒԹՅՈՒՆԸ (Original UI with Swiper) */}
                        <section className="py-24 px-6 max-w-7xl mx-auto">
                            <h2 className="text-3xl font-black uppercase italic mb-12">Բանկի պատմությունը</h2>
                            <div className="relative mb-12 border-b border-gray-100 pb-10">
                                <Swiper modules={[Navigation]} slidesPerView={3} centeredSlides onSlideChange={(s) => setHistoryIdx(s.activeIndex)} navigation={{ nextEl: '.n-btn', prevEl: '.p-btn' }} breakpoints={{ 1024: { slidesPerView: 5 } }}>
                                    {historyData.map((h, i) => (
                                        <SwiperSlide key={i} className="text-center font-black text-2xl cursor-pointer transition-all">
                                            <span className={i === historyIdx ? 'text-[#6c1cd3] scale-125' : 'text-gray-300'}>{h.year}</span>
                                            {i === historyIdx && <div className="w-3 h-3 bg-[#6c1cd3] rounded-full mx-auto mt-4"></div>}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <button className="p-btn absolute left-0 top-2 z-10 text-[#6c1cd3]"><ChevronLeft size={32} /></button>
                                <button className="n-btn absolute right-0 top-2 z-10 text-[#6c1cd3]"><ChevronRight size={32} /></button>
                            </div>
                            <div className="flex flex-col md:flex-row gap-12 items-center bg-[#fcfaff] p-10 rounded-[50px] border border-purple-50">
                                <p className="md:w-1/2 text-xl leading-relaxed text-gray-700">{historyData[historyIdx]?.text}</p>
                                <img src={historyData[historyIdx]?.image} className="md:w-1/2 rounded-[40px] animate-in zoom-in-95 duration-500" alt="History" />
                            </div>
                        </section>

                        {/* 5. ՀԻՄՆԱԿԱՆ ԱՐԺԵՔՆԵՐԸ (Original UI) */}
                        <section className="py-24 bg-gray-50 px-6">
                            <div className="max-w-7xl mx-auto">
                                <h2 className="text-3xl font-black uppercase italic mb-16">Հիմնական արժեքները</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12">
                                    {coreValues.map((val, i) => (
                                        <div key={i} className="group border-l-2 border-gray-200 pl-6 hover:border-[#6c1cd3] transition-all">
                                            <h3 className="text-[#6c1cd3] text-xl font-black uppercase mb-4 italic">{val.title}</h3>
                                            <p className="text-gray-500 leading-snug">{val.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* 6. ԼՈԳՈ ԵՎ ԳՈՒՅՆԵՐ (Original UI) */}
                        <section className="py-24 px-6 max-w-7xl mx-auto">
                            <h2 className="text-3xl font-black uppercase italic mb-12">Բանկի լոգոտիպը</h2>
                            <div className="py-16 bg-gray-50 rounded-[50px] mb-12 flex justify-center">
                                <img src="https://www.evoca.am/file_manager/icons/logo.png" alt="Logo" className="h-24" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {[
                                    { color: "bg-white border-gray-200", title: "ՍՊԻՏԱԿ", text: "Խորհրանշում է նորը" },
                                    { color: "bg-gray-500", title: "ՄՈԽՐԱԳՈՒՅՆ", text: "Տեխնոլոգիաների կիրառում" },
                                    { color: "bg-[#6c1cd3]", title: "ՄԱՆՈՒՇԱԿԱԳՈՒՅՆ", text: "Երիտասարդություն և նորարարություն" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-[40px]">
                                        <div className={`w-16 h-16 rounded-full mb-4 border ${item.color}`} />
                                        <h4 className="font-black text-[#6c1cd3] mb-1">{item.title}</h4>
                                        <p className="text-xs font-bold text-gray-500">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                );

            case "structure":
                return (

                    <img src="https://www.evoca.am/file_manager/structure/Organizational%20Structure-arm.png" alt="" className="py-20 px-6 max-w-7xl mx-auto animate-in slide-in-from-bottom-10 duration-700" />
                );


            case "shareholders":
                return (
                    <section className="py-20 px-6 max-w-7xl mx-auto animate-in fade-in duration-700">
                        <h2 className="text-3xl font-black italic uppercase mb-12 border-b-2 border-[#6c1cd3] w-fit pb-2">
                            Բաժնետերեր
                        </h2>

                        <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
                            {/* Բաժնետիրոջ նկարը */}
                            <div className="lg:w-1/3 w-full">
                                <img
                                    src="https://www.evoca.am/file_manager/Shareholders/Mareta%20Gevorkyan%20Evocabank.png"
                                    alt="Մարետա Գևորգյան"
                                    className="rounded-[40px] shadow-2xl w-full object-cover"
                                />
                            </div>

                            {/* Տեղեկատվություն */}
                            <div className="lg:w-2/3 w-full space-y-6">
                                <h3 className="text-3xl font-black text-[#6c1cd3] italic uppercase">
                                    Մարետա Գևորգյան
                                </h3>
                                <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                                    <p>
                                        Մարետա Գևորգյանը միանձնյա տիրապետում է Evocabank-ի բաժնետոմսերի <span className="font-bold text-[#6c1cd3]">100%-ին</span>:
                                    </p>
                                    <p>
                                        Նա ծնվել է Դիլիջանում, ավարտել Դիլիջանի միջնակարգ դպրոցը, այնուհետև՝ Երևանի պետական մանկավարժական ակադեմիան:
                                    </p>
                                    <p>
                                        2008 թվականից բնակվելով Շվեյցարիայում՝ նա ակտիվորեն ներգրավված է բանկային, տարածքային զարգացման և սոցիալական նախաձեռնություններում՝ նպաստելով Հայաստանի կայուն զարգացմանը:
                                    </p>
                                    <p className="text-sm font-bold mt-8 p-4 bg-gray-50 rounded-2xl border-l-4 border-[#6c1cd3]">
                                        Նշում. Բանկն անուղղակի նշանակալից մասնակից չունի:
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Անհրաժեշտ տեղեկատվություն (Accordion-style headers) */}
                        <div className="space-y-4">
                            <h4 className="text-xl font-black italic uppercase mb-6">Անհրաժեշտ տեղեկատվություն</h4>
                            {[
                                "Ուշադրություն.",
                                "Տեղեկատվություն մեր կանոնադրական կապիտալի փոփոխության վերաբերյալ",
                                "Տեղեկատվություն շահաբաժինների բաշխման վերաբերյալ"
                            ].map((title, idx) => (
                                <div key={idx} className="p-6 bg-white border border-gray-100 rounded-[25px] shadow-sm flex justify-between items-center group hover:border-[#6c1cd3] cursor-pointer transition-all">
                                    <span className="font-bold text-gray-800">{title}</span>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#6c1cd3] group-hover:text-white transition-all">
                                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Փաստաթղթեր */}
                        <div className="mt-16 space-y-4">
                            <h4 className="text-xl font-black italic uppercase mb-6">Փաստաթղթեր</h4>
                            {[
                                "Կանոնադրություն",
                                "Բանկային գործունեության լիցենզիա",
                                "Բանկի Գրանցման Վկայականը"
                            ].map((doc, idx) => (
                                <div key={idx} className="p-5 bg-[#fcfaff] rounded-2xl flex items-center gap-4 hover:bg-[#6c1cd3]/5 cursor-pointer transition-all border border-transparent hover:border-[#6c1cd3]/20">
                                    <div className="bg-[#6c1cd3] p-3 rounded-xl text-white">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                                        </svg>
                                    </div>
                                    <span className="font-bold text-gray-700">{doc}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                );

            case "management":
                return (
                    <section className="py-20 px-6 max-w-7xl mx-auto animate-in fade-in duration-700">
                        <h2 className="text-3xl font-black italic uppercase mb-12 border-b-2 border-[#6c1cd3] w-fit pb-2">
                            Ղեկավարություն
                        </h2>

                        {/* --- ԲԱՆԿԻ ԽՈՐՀՈՒՐԴ --- */}
                        <div className="mb-20">
                            <h3 className="text-2xl font-black italic uppercase mb-10 text-gray-800">Բանկի խորհուրդ</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
                                {[

                                    { name: "ԿԱՐԵՆ ԵՂԻԱԶԱՐՅԱՆ, MBA, PhD", pos: "Վարչության նախագահ", img: "https://www.evoca.am/images-cache/team_members/1/16776012013335/230x230.png" },
                                    { name: "ԱՐՄԵՆ ՀԱԿՈԲՅԱՆ, PhD", pos: "Վարչության նախագահի առաջին տեղակալ", img: "https://www.evoca.am/images-cache/team_members/1/17544805530896/230x230.png" },
                                    { name: "ՏԱԹԵՎԻԿ ԽԱՉԱՏՐՅԱՆ, MBA, PMP", pos: "Վարչության նախագահի տեղակալ", img: "https://www.evoca.am/images-cache/team_members/1/17550915579199/230x230.png" },
                                    { name: "ՀԱՅԿ ՊԵՏՐՈՍՅԱՆ", pos: "Վարչության նախագահի տեղակալ", img: "https://www.evoca.am/images-cache/team_members/1/17544805642771/230x230.png" },
                                    { name: "ԼԻԼԻԹ ԳԱԲՈՅԱՆ, MBA", pos: "Վարչության նախագահի տեղակալ ֆինանսական գծով", img: "https://www.evoca.am/images-cache/team_members/1/1675080847328/230x230.png" },
                                    { name: "ԷՄՄԱ ԶԱՆՈՅԱՆ, MBA, PhD, FCCA", pos: "Վարչության անդամ, Գլխավոր հաշվապահ", img: "https://www.evoca.am/images-cache/team_members/1/16602030046225/230x230.png" },
                                    { name: "ՍՄԲԱՏ ՄԱՐՏԻՐՈՍՅԱՆ", pos: "Վարչության անդամ, Իրավաբանական վարչության պետ", img: "https://www.evoca.am/images-cache/team_members/1/17544805424545/230x230.png" },
                                ].map((m, i) => (
                                    <div key={i} className="flex flex-col items-center text-center group">
                                        <div className="w-full aspect-[4/5] overflow-hidden mb-5 relative" style={{ borderRadius: '60px 60px 0 0' }}>
                                            <img src={m.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={m.name} />
                                        </div>
                                        <h4 className="text-[13px] font-black italic uppercase leading-tight text-gray-800 px-2">{m.name}</h4>
                                        <p className="text-gray-500 text-[11px] mt-2 leading-snug px-2">{m.pos}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* --- ԲԱՆԿԻ ՎԱՐՉՈՒԹՅՈՒՆ --- */}
                        <div className="mb-20">
                            <h3 className="text-2xl font-black italic uppercase mb-10 text-gray-800">Բանկի վարչություն</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
                                {[{ name: "ՄՀԵՐ ՍԱՀԱԿՅԱՆ", pos: "Վարչության անդամ, Ծրագրավորման և գործառնական համակարգերի վարչության պետ", img: "https://www.evoca.am/images-cache/team_members/1/1660202833495/230x230.png" },
                                { name: "ՎԱՐՈՒԺԱՆ ԱՎԵՏԻՔՅԱՆ, LL.M., MPA", pos: "Խորհրդի նախագահ", img: "https://www.evoca.am/images-cache/team_members/1/16602027630068/230x230.png" },
                                { name: "ՄԱՐՏԱ ԷԶԱՐԻ", pos: "Խորհրդի անդամ, Աուդիտի կոմիտեի անդամ, Ռազմավարության կոմիտեի անդամ", img: "https://www.evoca.am/images-cache/team_members/1/16602030244095/230x230.png" },
                                { name: "ՎԱԶԳԵՆ ԳԵՎՈՐԿՅԱՆ, MBA, PhD", pos: "Խորհրդի անդամ, Ռազմավարության կոմիտեի նախագահ", img: "https://www.evoca.am/images-cache/team_members/1/16602028118681/230x230.png" },
                                { name: "ՄԱՐԻԱՆԱ ԲՈՒԿԻ, MBA", pos: "Խորհրդի անդամ, Աուդիտի կոմիտեի նախագահ, Ռազմավարության կոմիտեի անդամ", img: "https://www.evoca.am/images-cache/team_members/1/16602028538342/230x230.png" },
                                { name: "ԽՈՒՍԵ ՄԱՐԻԱ ՄՈՐԵՆՈ ԴԵ ԲԱՐՐԵԴԱ, LL.M., MBA, PhD", pos: "Խորհրդի անդամ, Ռիսկերի և Համապատասխանության կոմիտեի նախագահ, Ռազմավարության կոմիտեի անդամ", img: "https://www.evoca.am/images-cache/team_members/1/16602027917723/230x230.png" },
                                { name: "ՏԱԹԵՎԻԿ ԶԱՆՈՅԱՆ, MBA", pos: "Խորհրդի անդամ, Աուդիտի կոմիտեի անդամ, Ռիսկերի և Համապատասխանության կոմիտեի անդամ", img: "https://www.evoca.am/images-cache/team_members/1/16602029763987/230x230.png" },
                                { name: "ՊԻԵՐ ԿԱԶԻԴՅԱԿ, MBA", pos: "Խորհրդի անդամ, Ռիսկերի և Համապատասխանության կոմիտեի անդամ, Ռազմավարության կոմիտեի անդամ", img: "https://www.evoca.am/images-cache/team_members/1/16602028738374/230x230.png" }
                                ].map((m, i) => (
                                    <div key={i} className="flex flex-col items-center text-center group">
                                        <div className="w-full aspect-[4/5] overflow-hidden mb-5 relative" style={{ borderRadius: '60px 60px 0 0' }}>
                                            <img src={m.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={m.name} />
                                        </div>
                                        <h4 className="text-[13px] font-black italic uppercase leading-tight text-gray-800 px-2">{m.name}</h4>
                                        <p className="text-gray-500 text-[11px] mt-2 leading-snug px-2">{m.pos}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* --- ԲԱՆԿԻ ՆԵՐՔԻՆ ԱՈՒԴԻՏ --- */}
                        <div>
                            <h3 className="text-2xl font-black italic uppercase mb-10 text-gray-800">Բանկի ներքին աուդիտ</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
                                {[
                                    { name: "ՆԱԶԵԼԻ ԵՂՈՅԱՆ", pos: "Ներքին աուդիտի ստորաբաժանման ղեկավար", img: "https://www.evoca.am/images-cache/team_members/1/16282549740688/230x230.png" }
                                ].map((m, i) => (
                                    <div key={i} className="flex flex-col items-center text-center group">
                                        <div className="w-full aspect-[4/5] overflow-hidden mb-5 relative" style={{ borderRadius: '60px 60px 0 0' }}>
                                            <img src={m.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={m.name} />
                                        </div>
                                        <h4 className="text-[13px] font-black italic uppercase leading-tight text-gray-800 px-2">{m.name}</h4>
                                        <p className="text-gray-500 text-[11px] mt-2 leading-snug px-2">{m.pos}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
         case "partners":
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto animate-in fade-in duration-1000">
            <h2 className="text-3xl font-black italic uppercase mb-12 border-b-2 border-[#6c1cd3] w-fit pb-2">
                Գործընկերներ
            </h2>

            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="pb-16 partners-swiper"
            >
                {/* SLIDE 1 (9 Blocks) */}
                <SwiperSlide>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {partnersList1.map((p, i) => (
                            <div key={i} className={`h-40 bg-gray-50 rounded-[40px] flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500 border border-transparent hover:border-purple-200 hover:bg-white hover:shadow-xl group`}>
                                <img src={p.img} alt={p.name} className="max-h-12 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                    </div>
                </SwiperSlide>

                {/* SLIDE 2 (8 Blocks + Center Animation) */}
                <SwiperSlide>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative">
                        {partnersList2.map((p, i) => {
                            // Ստեղծում ենք բաց տարածք մեջտեղի բլոկի համար (4-րդ ինդեքսը դատարկ ենք թողնում)
                            if (i === 4) return (
                                <div key="anim" className="h-40 flex items-center justify-center relative overflow-hidden">
                                    {/* Պտտվող շղթաներ/օղակներ */}
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute w-32 h-32 border-2 border-dashed border-[#6c1cd3]/30 rounded-full"
                                    />
                                    <motion.div 
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute w-24 h-24 border border-dashed border-purple-400/20 rounded-full"
                                    />
                                    
                                    {/* Սեղմվող ձեռքերը (Handshake Icon) */}
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="z-10 bg-white p-4 rounded-full shadow-lg"
                                    >
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6c1cd3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5" />
                                            <path d="M18 19h4" /><path d="M20 17v4" />
                                            <path d="M7 11h.01" /><path d="M11 11h.01" /><path d="M15 11h.01" />
                                        </svg>
                                    </motion.div>
                                </div>
                            );
                            
                            return (
                                <div key={i} className="h-40 bg-gray-50 rounded-[40px] flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500 border border-transparent hover:border-purple-200 hover:bg-white hover:shadow-xl group">
                                    <img src={p.img} alt={p.name} className="max-h-12 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                                </div>
                            );
                        })}
                    </div>
                </SwiperSlide>
            </Swiper>

            <style dangerouslySetInnerHTML={{ __html: `
                .partners-swiper .swiper-pagination-bullet-active {
                    background: #6c1cd3 !important;
                    width: 25px;
                    border-radius: 5px;
                }
                .partners-swiper .swiper-pagination {
                    bottom: 0 !important;
                }
            `}} />
        </section>
    );

            default:
                return <div className="py-40 text-center font-black italic text-gray-200 text-4xl uppercase">Շուտով...</div>;
       
    case "reviews":
            return (
                <section className="py-20 px-6 max-w-5xl mx-auto">
                    <div className="mb-16 text-center space-y-4">
                        <h2 className="text-4xl font-black italic uppercase text-[#6c1cd3]">Կարծիքներ</h2>
                        <div className="h-1.5 w-24 bg-[#6c1cd3] mx-auto rounded-full" />
                    </div>
                    
                    <div className="flex flex-col gap-10">
                        {reviewsData.map((review, index) => (
                            <motion.div 
                                key={review.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className="flex flex-col md:flex-row items-center gap-10 bg-white p-10 rounded-[50px] shadow-[0_20px_50px_rgba(108,28,211,0.06)] border border-gray-50 hover:shadow-[0_30px_70px_rgba(108,28,211,0.12)] transition-all duration-500 group"
                            >
                                <div className="relative flex-shrink-0">
                                    <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
                                        <img 
                                            src={review.img} 
                                            alt={review.author} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-[#6c1cd3] p-4 rounded-full text-white z-20 shadow-xl">
                                        <Quote size={24} fill="currentColor" />
                                    </div>
                                    <div className="absolute inset-0 bg-[#6c1cd3] rounded-full blur-3xl opacity-5 group-hover:opacity-15 transition-opacity" />
                                </div>

                                <div className="flex-1 space-y-6 text-center md:text-left">
                                    <p className="text-xl md:text-2xl text-gray-700 font-medium italic leading-relaxed">
                                        «{review.text}»
                                    </p>
                                    <div>
                                        <h4 className="text-2xl font-black italic text-[#6c1cd3] uppercase tracking-tight">
                                            {review.author}
                                        </h4>
                                        <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] mt-1">
                                            {review.role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            );
case "csr":
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto animate-in fade-in duration-700">
            {/* Hero Section: Text + 3D Image */}
            <div className="flex flex-col md:flex-row items-center gap-12 bg-gray-50 rounded-[60px] overflow-hidden mb-20 p-10 md:p-20">
                <div className="md:w-1/2 space-y-8">
                    <h2 className="text-4xl md:text-5xl font-black italic uppercase leading-tight">
                        Կորպորատիվ <br />
                        Սոցիալական <br />
                        Պատասխանատվություն
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-md">
                        Մենք մեծ կարևորություն ենք տալիս CSR-ին՝ ապահովելով մեր գործունեության դրական ազդեցությունը թե՛ հասարակության, թե՛ շրջակա միջավայրի վրա:
                    </p>
                </div>
                <div className="md:w-1/2 flex justify-center">
                    <motion.div 
                        animate={{ y: [0, -20, 0] }} 
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-full max-w-sm"
                    >
                        {/* Օգտագործում ենք սքրինշոթի նկարի նմանակը */}
                        <img 
                            src="https://www.evoca.am/images-cache/menu/1/17108330711252/780x585.png" 
                            alt="CSR Hand" 
                            className="w-full h-auto drop-shadow-2xl rounded-2xl"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Description and List */}
            <div className="max-w-4xl mx-auto space-y-10">
                <p className="text-lg text-gray-700 leading-relaxed">
                    <span className="text-[#6c1cd3] font-bold">Evocabank</span>-ում Կորպորատիվ սոցիալական պատասխանատվությունը կարևորագույն արժեք է, որն արտացոլվում է Բանկի գրեթե բոլոր նախաձեռնություններում: Բանկը շարունակաբար աջակցություն է ցուցաբերում հանրության տարբեր խմբերին և հասարակական նախաձեռնություններին հետևյալ ոլորտներում՝
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        "Նորագույն տեխնոլոգիաների զարգացում",
                        "Երիտասարդության կրթական, գիտական և մշակութային նախաձեռնություններ",
                        "Հասարակական կարևոր նշանակություն ունեցող նախաձեռնություններ",
                        "Հասարակության առավել խոցելի խմբեր, մասնավորապես՝ ծնողազուրկ կամ հատուկ խնամքի տակ գտնվող երեխաներ"
                    ].map((item, idx) => (
                        <motion.li 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-4 bg-[#fcfaff] p-6 rounded-3xl border border-purple-50"
                        >
                            <div className="w-2 h-2 rounded-full bg-[#6c1cd3] mt-2.5 flex-shrink-0" />
                            <span className="font-medium text-gray-700">{item}</span>
                        </motion.li>
                    ))}
                </ul>

                <div className="pt-10 border-t border-gray-100 italic text-gray-500 text-center">
                    Մեր բոլորի կողմից Կորպորատիվ սոցիալական պատասխանատվությանն ուղղված յուրաքանչյուր փոքրիկ քայլ վկայում է աշխարհն ավելի լուսավոր ու գեղեցիկ դարձնելու կարևորության մասին:
                </div>
            </div>
        </section>
    );
            return <div className="py-40 text-center font-black italic text-gray-200 text-4xl uppercase">Շուտով...</div>;
}; }

    return (
        <div className="w-full bg-white font-sans text-[#1d1d1f]">
            {/* STICKY TAB MENU */}
            <nav className="bg-[#6c1cd3] text-white sticky top-0 z-[100] overflow-x-auto no-scrollbar shadow-2xl">
                <div className="max-w-7xl mx-auto flex whitespace-nowrap px-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentTab(item.id)}
                            className={`py-6 px-6 text-[11px] md:text-[13px] font-black uppercase italic tracking-widest transition-all border-b-4 ${currentTab === item.id ? "border-white opacity-100 bg-white/10" : "border-transparent opacity-50 hover:opacity-100"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="min-h-[80vh]">
                {renderContent()}
            </main>

            <footer className="py-24 text-center opacity-[0.03] select-none pointer-events-none overflow-hidden">
                <p className="text-[120px] md:text-[220px] font-black italic leading-none">EVOCABANK</p>
            </footer>
        </div>
    );
};

export default EvocaAboutPage;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, ArrowDown } from 'lucide-react';

interface NewsItem {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  date: string;
  image: string;
  content: string;
  moreDetails: string;
}

const NewsPage: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const heroData = {
    image: "https://www.evoca.am/images-cache/news/1/1776423301974/780x585.png",
    title: "Մնա իրադարձությունների կենտրոնում",
    subtitle: "Բացահայտիր Evocabank-ի վերջին նորությունները, մրցանակները և բացառիկ առաջարկները մեկ հարթակում:"
  };

  const gridData: NewsItem[] = [
    {
      id: 201,
      category: "Պրոդուկտներ",
      categoryColor: "#E64980",
      title: "Վճարիր Evoca Mastercard-ով և շահիր մեքենա",
      description: "Կատարիր անկանխիկ վճարումներ Evoca Mastercard-ով և շահիր IM LS6 RWD էլեկտրական մեքենա:",
      date: "01.04.2025",
      image: "https://www.evoca.am/images-cache/news/1/17382449387143/450x295.png",
      content: "Mastercard խաղարկության մանրամասն պայմանները ներկայացված են ստորև։",
      moreDetails: "Յուրաքանչյուր 5,000 դրամի գործարքը տալիս է մեկ հնարավորություն։"
    },
    {
      id: 202,
      category: "Կենսակերպ",
      categoryColor: "#82C91E",
      title: "Evoca-ն CCF 2026-ի գլխավոր գործընկեր",
      description: "Միացիր մեզ Career City Fest-ի շրջանակներում և գտիր քո երազանքի աշխատանքը:",
      date: "15.04.2026",
      image: "https://www.evoca.am/images-cache/news/1/17373763573222/450x295.jpg",
      content: "Career City Fest-ը Հայաստանի ամենամեծ կարիերայի միջոցառումներից մեկն է։",
      moreDetails: "Մեր տաղավարում դուք կարող եք ծանոթանալ թափուր հաստիքներին:"
    },
    {
      id: 203,
      category: "Նորարարություն",
      categoryColor: "#4dabf7",
      title: "Նոր թարմացում EvocaTouch հավելվածում",
      description: "Այժմ էլ ավելի արագ և հարմարավետ գործարքներ ձեր հեռախոսով:",
      date: "10.04.2026",
      image: "https://www.evoca.am/images-cache/news/1/17339403687437/450x295.jpg",
      content: "EvocaTouch-ի նոր տարբերակը ներառում է մի շարք տեխնիկական բարելավումներ։",
      moreDetails: "Այժմ կարող եք կատարել միջազգային փոխանցումներ ընդամենը մի քանի հպումով։"
    },
    {
      id: 204,
      category: "CSR",
      categoryColor: "#fab005",
      title: "Աջակցություն կրթական ծրագրերին",
      description: "Evocabank-ը շարունակում է ներդրումներ կատարել ապագայի և կրթության մեջ:",
      date: "05.04.2026",
      image: "https://www.evoca.am/images-cache/news/1/17067716894602/450x295.png",
      content: "Սոցիալական պատասխանատվությունը Evocabank-ի գործունեության առանցքային մասն է։",
      moreDetails: "Այս տարի մենք ընդլայնում ենք մեր կրթաթոշակային ծրագրերը:"
    }
  ];

  const gridMainImage = "https://www.evoca.am/images-cache/news/1/17545729507567/616x462.png";

  const bottomNews: NewsItem[] = [
    {
      id: 301,
      category: "Մրցանակներ",
      categoryColor: "#FAB005",
      title: "Լավագույն թվային բանկ Հայաստանում 2026",
      description: "Evocabank-ը կրկին արժանացել է բարձրագույն գնահատականի միջազգային հարթակում:",
      date: "30.01.2025",
      image: "https://www.evoca.am/images-cache/news/1/17386587462914/438x328.png",
      content: "Global Business & Finance ամսագիրը Evocabank-ին ճանաչել է որպես լավագույն թվային բանկ։",
      moreDetails: "Շնորհակալ ենք մեր հաճախորդներին վստահության համար։"
    },
    {
      id: 302,
      category: "Պրոդուկտներ",
      categoryColor: "#E64980",
      title: "Հիփոթեքային վարկեր 12%-ով",
      description: "Ձեռք բեր բնակարան երկրորդային շուկայից բացառիկ ցածր տոկոսադրույքով:",
      date: "26.03.2025",
      image: "https://www.evoca.am/images-cache/news/1/17371104329802/438x328.jpg",
      content: "Evocabank-ը մեկնարկում է նոր հիփոթեքային ակցիա:",
      moreDetails: "Ակցիան գործում է սահմանափակ ժամանակով։"
    },
    {
      id: 303,
      category: "Այլ",
      categoryColor: "#adb5bd",
      title: "Աշխատանքային ժամերի փոփոխություն",
      description: "Տեղեկացեք տոնական օրերին մասնաճյուղերի աշխատանքային գրաֆիկին:",
      date: "20.03.2025",
      image: "https://www.evoca.am/images-cache/news/1/17304388351704/438x328.png",
      content: "Հարգելի հաճախորդներ, խնդրում ենք նախապես ծանոթանալ մեր գրաֆիկին։",
      moreDetails: "EvocaTouch-ը կշարունակի գործել 24/7 ռեժիմով։"
    }
  ];

  const importantMainImage = "https://www.evoca.am/images-cache/news/1/17429755745448/780x585.png";

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] pb-20 font-sans overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!selectedNews ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            
            {/* --- SECTION 1: HERO --- */}
            <section className="max-w-[1450px] mx-auto px-6 pt-10 mb-20 relative">
              <h1 className="text-[120px] font-black italic uppercase leading-none tracking-tighter opacity-5 select-none absolute top-0 left-6 z-0">News</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#6610f2] rounded-none"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Թարմ նորություններ</span>
                  </div>
                  <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-[0.9]">
                    {heroData.title.split(' ').slice(0, -1).join(' ')} <br /> 
                    <span className="text-[#6610f2]">{heroData.title.split(' ').pop()}</span>
                  </h2>
                  <p className="text-gray-500 text-lg max-w-md italic">{heroData.subtitle}</p>
                  <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center animate-bounce">
                    <ArrowDown size={24} />
                  </div>
                </div>
                <div className="rounded-none overflow-hidden shadow-2xl rotate-2">
                  <img src={heroData.image} className="w-full h-full object-cover" alt="Hero" />
                </div>
              </div>
            </section>

            {/* --- SECTION 2: «ԲԱՑ ՉԹՈՂՆԵԼ» --- */}
            <section className="relative max-w-[1450px] mx-auto px-6 mb-44 pt-20">
              <div className="absolute top-0 right-0 text-[180px] md:text-[230px] font-black text-[#f8f9fa] select-none pointer-events-none italic leading-none z-0">
                Բաց չթողնել
              </div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Ձախ կողմ - Մեծ նկար (Տեքստը նկարի տակ) */}
                <div className="lg:col-span-7 group cursor-pointer">
                  <div className="relative rounded-none overflow-hidden shadow-lg aspect-[16/10] mb-6">
                    <img 
                      src={gridMainImage} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt="Grid Main" 
                    />
                  </div>
                  <div className="space-y-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#6610f2] rounded-none"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Evoca Lifestyle</span>
                    </div>
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-tight group-hover:text-[#6610f2] transition-colors">
                      Բացահայտիր Նոր <br /> Կենսակերպ Evoca-ի հետ
                    </h3>
                    <p className="text-gray-500 text-sm italic max-w-lg">
                      Միացեք մեր ամենամյա միջոցառումներին և դարձեք լավագույն նախագծերի մի մասնիկը:
                    </p>
                  </div>
                </div>

                {/* Աջ կողմ - 4 փոքր դիվեր նկարներով */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                  {gridData.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedNews(item)}
                      className="relative bg-black rounded-none aspect-square group cursor-pointer overflow-hidden shadow-sm"
                    >
                      <img 
                        src={item.image} 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500" 
                        alt={item.title} 
                      />
                      <div className="relative h-full p-5 flex flex-col justify-between z-10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-black leading-tight text-white line-clamp-3">
                          {item.title}
                        </h4>
                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white">
                          <ChevronRight size={14} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* --- SECTION 3: «ԿԱՐԵՎՈՐ Է» --- */}
            <section className="relative max-w-[1450px] mx-auto px-6 mb-20">
              <div className="absolute top-[-50px] left-0 text-[180px] md:text-[230px] font-black text-[#f8f9fa] select-none pointer-events-none italic leading-none z-0">
                Կարևոր է
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                <div className="lg:col-span-7 rounded-none overflow-hidden shadow-2xl h-[450px]">
                  <img src={importantMainImage} className="w-full h-full object-cover" alt="Important Main" />
                </div>
                <div className="lg:col-span-5 space-y-6">
                  <h2 className="text-5xl font-black italic tracking-tighter leading-tight uppercase">Միջազգային <br/> ճանաչում</h2>
                  <p className="text-gray-500 text-lg leading-relaxed">Մենք շարունակում ենք կատարելագործել մեր թվային ծառայությունները:</p>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {bottomNews.map((item) => (
                  <div key={item.id} className="group cursor-pointer" onClick={() => setSelectedNews(item)}>
                    <div className="rounded-none overflow-hidden mb-6 aspect-[4/3] shadow-lg">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title} />
                    </div>
                    <div className="px-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-none" style={{backgroundColor: item.categoryColor}}></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.category}</span>
                      </div>
                      <h3 className="text-xl font-black leading-tight group-hover:text-[#6610f2] transition-colors line-clamp-2">{item.title}</h3>
                      <span className="text-[11px] text-gray-400 font-bold">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </motion.div>
        ) : (
          /* --- DETAILS PAGE --- */
          <motion.div 
            key="details" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -30 }} 
            className="max-w-[1100px] mx-auto px-6 pt-20"
          >
            <button 
              onClick={() => setSelectedNews(null)}
              className="flex items-center gap-2 text-gray-400 font-black uppercase text-[11px] mb-10 hover:text-[#6610f2] transition-colors"
            >
              <ArrowLeft size={16} /> Վերադառնալ նորություններին
            </button>
            
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-full md:w-2/5 flex-shrink-0 rounded-none overflow-hidden shadow-xl">
                <img src={selectedNews.image} className="w-full h-auto object-cover" alt={selectedNews.title} />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 rounded-none" style={{backgroundColor: selectedNews.categoryColor}}></div>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">{selectedNews.category}</span>
                </div>
                <h1 className="text-4xl font-black italic tracking-tighter mb-4 leading-tight">{selectedNews.title}</h1>
                <p className="text-gray-400 font-bold mb-8 text-sm">{selectedNews.date}</p>
                
                <div className="text-lg text-gray-600 leading-relaxed space-y-6">
                  <p className="font-bold text-[#1a1a1a] border-l-4 border-[#6610f2] pl-4 italic">
                    {selectedNews.description}
                  </p>
                  <p>{selectedNews.content}</p>
                  <p>{selectedNews.moreDetails}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsPage;
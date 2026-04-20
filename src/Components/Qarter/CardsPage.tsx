import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Download, ChevronRight,
  Info, CheckCircle2, AlertTriangle
} from 'lucide-react';

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

// --- Տվյալների զանգվածը (Export const) ---
export const QARTER_DATA: CardDataType[] = [
  {
    id: 1,
    name: "Evoca Travel Card",
    description: "Լավագույն ընկերը ճամփորդությունների ընթացքում՝ բարձր cashback-ով:",
    image: "https://www.evoca.am/images-cache/cards/1/17479817930565/415x261.jpg",
    filters: ['premium', 'mastercard'],
    cashback: "1.5%",
    perks: [{ label: "Lounge Key", value: "6 մուտք" }, { label: "Fast Track", value: "Անվճար" }]
  },
  {
    id: 2,
    name: "Evoca Gift Card",
    description: "Գնիր Evoca Gift Card, և լավագույն նվերը կլինի քոնը:",
    image: "https://www.evoca.am/images-cache/cards/1/17149864970842/415x261.png",
    filters: ['նվեր քարտեր', 'arca'],
    cashback: "1.0%",
    perks: [{ label: "Ապահովագրություն", value: "1մլն $" }]
  },
  {
    id: 3,
    name: "Digital Gift Card",
    description: "Սիրելի մարդկանց համար նվեր ընտրելը պատասխանատու ու հաճելի գործ է, բայց նաև ժամանակատար ու նյարդայնացնող, հատկապես երբ չգիտես՝ կհավանի՞, թե՞ ոչ։ Մենք առաջարկում ենք իդեալական նվերի տարբերակ։",
    image: "https://www.evoca.am/images-cache/cards/1/17282986912132/415x261.png",
    filters: ['նվեր քարտեր', 'mastercard'],
    perks: [{ label: "Սպասարկում", value: "0 ֏" }]
  },
  {
    id: 4,
    name: "Visa Infinite",
    description: "Տվեք ընտրության հնարավորություն Ձեր մտերիմներին:",
    image: "https://www.evoca.am/images-cache/cards/1/1772717001933/415x261.png",
    filters: ['նվեր քարտեր', 'visa'],
  },
  {
    id: 5,
    name: "Visa Vision",
    description: "Ակնթարթային քարտ՝ առանց պլաստիկի, օնլայն գնումների համար:",
    image: "https://www.evoca.am/images-cache/cards/1/1714986482757/415x261.png",
    filters: ['թվային քարտեր', 'visa'],
    perks: [{ label: "Թողարկում", value: "1 րոպե" }]
  },
  {
    id: 6,
    name: "Mastercard World Digital",
    description: "Ոսկե միջինը Ձեր ֆինանսների կառավարման համար:",
    image: "https://www.evoca.am/images-cache/cards/1/17639683196125/415x261.png",
    filters: ['premium', 'mastercard'],
    cashback: "0.5%",
  },
  {
    id: 7,
    name: "UnionPay Business Platinum",
    description: "Միջազգային քարտ՝ հարմար հատկապես ասիական երկրներում:",
    image: "https://www.evoca.am/images-cache/cards/1/17249401821904/415x261.png",
    filters: ['unionpay'],
  },
  {
    id: 8,
    name: "Homplex Gift card",
    description: "Էլեգանտություն և հարմարավետություն յուրաքանչյուր քայլափոխի:",
    image: "https://www.evoca.am/images-cache/cards/1/17527569508235/415x261.png",
    filters: ['premium', 'visa'],
  },
  {
    id: 9,
    name: "MyLer Gift Card",
    description: "Դասական քարտ ամենօրյա գնումների համար:",
    image: "https://www.evoca.am/images-cache/cards/1/17655348192361/415x261.png",
    filters: ['mastercard'],
  },
  {
    id: 10,
    name: "UnionPay Gold",
    description: "Բարձրակարգ սպասարկում UnionPay համակարգում:",
    image: "https://www.evoca.am/images-cache/cards/1/17262129422977/415x261.png",
    filters: ['premium', 'unionpay'],
  },
  {
    id: 11,
    name: "4U.am Gift card",
    description: "Լավագույն ընկերը ճամփորդությունների ընթացքում՝ բարձր cashback-ով:",
    image: "https://www.evoca.am/images-cache/cards/1/17485032554482/415x261.png",
    filters: ['premium', 'mastercard'],
    cashback: "1.5%",
    perks: [{ label: "Lounge Key", value: "6 մուտք" }, { label: "Fast Track", value: "Անվճար" }]
  },
  {
    id: 12,
    name: "Mastercard Gold",
    description: "Անսահմանափակ հնարավորություններ և անհատական սպասարկում:",
    image: "https://www.evoca.am/images-cache/cards/1/17149865321136/415x261.png",
    filters: ['premium', 'visa'],
    cashback: "1.0%",
    perks: [{ label: "Ապահովագրություն", value: "1մլն $" }]
  },
  {
    id: 13,
    name: "Mastercard Standard",
    description: "Պարզ և հարմար լուծում Հայաստանի տարածքում գործարքների համար:",
    image: "https://www.evoca.am/images-cache/cards/1/17149866652788/415x261.png",
    filters: ['mastercard'],
    perks: [{ label: "Սպասարկում", value: "0 ֏" }]
  },
  {
    id: 14,
    name: "Visa Classic",
    description: "Տվեք ընտրության հնարավորություն Ձեր մտերիմներին:",
    image: "https://www.evoca.am/images-cache/cards/1/1714986642953/415x261.png",
    filters: ['նվեր քարտեր', 'arca'],
  },
  {
    id: 15,
    name: "Arca Classic",
    description: "https://www.evoca.am/images-cache/cards/1/17404717644263/415x261.png",
    image: "https://www.evoca.am/images-cache/cards/1/1714986482757/415x261.png",
    filters: ['թվային քարտեր', 'visa'],
    perks: [{ label: "Թողարկում", value: "1 րոպե" }]
  },
  {
    id: 16,
    name: "Visa Business",
    description: "Ոսկե միջինը Ձեր ֆինանսների կառավարման համար:",
    image: "https://www.evoca.am/images-cache/cards/1/17149865475676/415x261.png",
    filters: ['premium', 'mastercard'],
    cashback: "0.5%",
  },
  {
    id: 17,
    name: "Dalma Gift Card",
    description: "Միջազգային քարտ՝ հարմար հատկապես ասիական երկրներում:",
    image: "https://www.evoca.am/images-cache/cards/1/17404717113297/415x261.png",
    filters: ['unionpay'],
  },
  {
    id: 18,
    name: "Rio Gift Card",
    description: "Էլեգանտություն և հարմարավետություն յուրաքանչյուր քայլափոխի:",
    image: "https://www.evoca.am/images-cache/cards/1/17404717289057/415x261.png",
    filters: ['premium', 'visa'],
  },
  {
    id: 19,
    name: "Garage Masters' Mall Gift Card",
    description: "Դասական քարտ ամենօրյա գնումների համար:",
    image: "https://www.evoca.am/images-cache/cards/1/17404717481136/415x261.png",
    filters: ['mastercard'],
  },
  {
    id: 20,
    name: "Visa Gold",
    description: "Բարձրակարգ սպասարկում UnionPay համակարգում:",
    image: "https://www.evoca.am/images-cache/cards/1/17149865646885/415x261.png",
    filters: ['premium', 'unionpay'],
  },
];

export const CardsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('qarter');
  const [activeFilter, setActiveFilter] = useState<FilterType>('բոլորը');
  const navigate = useNavigate();

  const filteredCards = useMemo(() => {
    if (activeFilter === 'բոլորը') return QARTER_DATA;
    return QARTER_DATA.filter(card => card.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="w-full min-h-screen bg-white font-sans text-[#1a1a1a]">
      {/* Sticky Tabs */}
      <div className="w-full bg-[#6610f2] sticky top-0 md:top-20 z-40 overflow-x-auto">
        <div className="max-w-[1200px] mx-auto flex whitespace-nowrap">
          {[
            { id: 'qarter', label: 'Քարտեր' },
            { id: 'spasarkum', label: 'Սպասարկում' },
            { id: 'social', label: 'Սոցիալական' },
            { id: 'benefits', label: 'Evoca Benefits' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-6 py-4 text-[12px] font-bold uppercase transition-all border-b-4 ${activeTab === tab.id ? 'bg-[#520dc2] border-white text-white' : 'border-transparent text-white/70 hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
        {activeTab === 'qarter' && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-[28px] md:text-[34px] font-black uppercase mb-8 italic leading-none">Քարտեր</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
              {['բոլորը', 'premium', 'նվեր քարտեր', 'թվային քարտեր', 'arca', 'visa', 'mastercard', 'unionpay'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f as FilterType)}
                  className={`px-4 md:px-5 py-2 rounded-full text-[10px] md:text-[11px] font-black uppercase transition-all border ${activeFilter === f ? 'bg-[#6610f2] border-[#6610f2] text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-[#6610f2]'
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-12 md:gap-16">
              {filteredCards.map((card) => (
                <div key={card.id} className="flex flex-col md:flex-row gap-6 md:gap-10 items-center py-6 md:py-10 border-b border-gray-100 last:border-0 group">
                  <div className="w-full md:w-1/2 overflow-hidden rounded-2xl cursor-pointer" onClick={() => navigate(`/card/${card.id}`)}>
                    <img src={card.image} alt={card.name} className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="w-full md:w-1/2 space-y-4 md:space-y-5">
                    <h2 className="text-2xl md:text-3xl font-black italic uppercase">{card.name}</h2>
                    <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">{card.description}</p>
                    <button
                      onClick={() => navigate(`/card/${card.id}`)}
                      className="flex items-center gap-2 bg-[#f0f0f0] px-8 py-3 rounded-full font-black text-[12px] uppercase hover:bg-[#6610f2] hover:text-white transition-all w-fit"
                    >
                      Մանրամասն <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsPage;
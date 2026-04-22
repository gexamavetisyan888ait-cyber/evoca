import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export interface LoanType {
  id: number;
  title: string;
  description: string;
  duration: string;
  amount: string;
  rate: string;
  rateLabel: string;
  image: string;
  category: 'business' | 'consumer' | 'mortgage' | 'car';
}

export const loans: LoanType[] = [
  { id: 1, category: 'business', title: "Արագ բիզնես վարկ/վարկային գիծ", description: "Արագ ֆինանսավորում Ձեր բիզնեսի զարգացման համար միայն երաշխավորությամբ և ցածր տոկոսադրույքով:", duration: "60 ամիս", amount: "30 մլն ֏", rate: "8.5-14.5%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/17721008940374/415x261.png" },
  { id: 2, category: 'business', title: "Տեքստիլ ոլորտում հումքի ներմուծմանն ուղղված վարկ", description: "Evocabank-ը տրամադրում է բիզնես վարկ՝ տեքստիլ հումքի ներմուծման համար: Զարգացրեք Ձեր բիզնեսը և դարձեք մրցունակ:", duration: "36 ամիս", amount: "500 մլն ֏", rate: "8%", rateLabel: "Տոկոսադրույքի սուբսիդավորում", image: "https://www.evoca.am/images-cache/loans/1/17749381045652/415x261.png" },
  { id: 3, category: 'business', title: "Գյուղատնտեսական վարկեր", description: "Աջակցություն գյուղատնտեսությամբ զբաղվող տնտեսվարողներին՝ արտադրության ընդլայնման նպատակով:", duration: "84 ամիս", amount: "100 մլն ֏", rate: "2-5%", rateLabel: "Արտոնյալ տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148637167789/415x261.jpg" },
  { id: 4, category: 'business', title: "Առևտրային վարկեր", description: "Շրջանառու միջոցների համալրման և առևտրային գործունեության ընդլայնման համար նախատեսված վարկեր:", duration: "48 ամիս", amount: "200 մլն ֏", rate: "12-16%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148653401062/415x261.jpg" },
  { id: 5, category: 'business', title: "ՓՄՁ զարգացման վարկ", description: "Փոքր և միջին ձեռնարկությունների համար նախատեսված ճկուն ֆինանսավորման պայմաններ:", duration: "60 ամիս", amount: "80 մլն ֏", rate: "13%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16507186179774/415x261.png" },
  { id: 6, category: 'business', title: "Էներգաարդյունավետ վարկեր", description: "Ներդրեք էներգախնայող տեխնոլոգիաներ Ձեր բիզնեսում և նվազեցրեք ծախսերը պետական աջակցությամբ:", duration: "60 ամիս", amount: "150 մլն ֏", rate: "10%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148661034998/415x261.jpg" },
  { id: 7, category: 'business', title: "ՏՏ ոլորտի աջակցման վարկ", description: "Հատուկ պայմաններ տեղեկատվական տեխնոլոգիաների ոլորտում գործող ստարտափների և ընկերությունների համար:", duration: "36 ամիս", amount: "50 մլն ֏", rate: "9%", rateLabel: "Հատուկ սակագին", image: "https://www.evoca.am/images-cache/loans/1/1614870243661/415x261.jpg" },
  { id: 8, category: 'business', title: "Արտահանման ֆինանսավորում", description: "Արտահանման ծավալների մեծացման և միջազգային շուկաներ դուրս գալու համար նախատեսված գործիքներ:", duration: "24 ամիս", amount: "300 մլն ֏", rate: "7-11%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148681592638/415x261.jpg" },
  { id: 9, category: 'business', title: "Լիզինգ", description: "Ձեռք բերեք նոր սարքավորումներ, տեխնիկա կամ տրանսպորտային միջոցներ շահավետ լիզինգային պայմաններով:", duration: "60 ամիս", amount: "Անսահմանափակ", rate: "11-13%", rateLabel: "Լիզինգի տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148706367372/415x261.jpg" },
  { id: 10, category: 'consumer', title: "Բիզնես քարտեր (Overdraft)", description: "Կարճաժամկետ ֆինանսական խնդիրների արագ լուծում Ձեր բիզնես հաշվին կցված վարկային գծի միջոցով:", duration: "12 ամիս", amount: "10 մլն ֏", rate: "15%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/1614869229831/415x261.jpg" },
  { id: 11, category: 'business', title: "Կանանց ձեռներեցության աջակցություն", description: "Հատուկ վարկային ծրագրեր կին ձեռներեցների կողմից ղեկավարվող բիզնեսների զարգացման համար:", duration: "48 ամիս", amount: "40 մլն ֏", rate: "10.5%", rateLabel: "Արտոնյալ պայմաններ", image: "https://www.evoca.am/images-cache/loans/1/16148678149192/415x261.jpg" },
  { id: 12, category: 'business', title: "Արտադրական հզորությունների թարմացում", description: "Վարկեր արտադրական գծերի արդիականացման և նոր տեխնոլոգիաների ներդրման համար:", duration: "72 ամիս", amount: "400 մլն ֏", rate: "11%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148665659945/415x261.jpg" },
  { id: 13, category: 'business', title: "Վերականգնվող էներգետիկայի վարկ", description: "Ֆինանսավորում արևային կայանների և այլընտրանքային էներգիայի աղբյուրների տեղադրման համար:", duration: "120 ամիս", amount: "250 մլն ֏", rate: "9-12%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148696068365/415x261.jpg" },
  { id: 14, category: 'mortgage', title: "Բիզնես հիփոթեք", description: "Վարկեր բիզնես տարածքների, գրասենյակների կամ պահեստների ձեռքբերման և վերանորոգման համար:", duration: "180 ամիս", amount: "600 մլն ֏", rate: "11.5%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16394873850552/415x261.png" },
];

const filters = [
  { label: 'Բոլորը', value: 'all' },
  { label: 'Բիզնես վարկեր', value: 'business' },
  { label: 'Սպառողական', value: 'consumer' },
  { label: 'Հիփոթեք', value: 'mortgage' },
  { label: 'Ավտովարկ', value: 'car' },
];

const AnhatVarker: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredLoans = useMemo(() => {
    if (activeFilter === 'all') return loans;
    return loans.filter(loan => loan.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="max-w-[1200px] mx-auto px-4 pt-16">
        <div className="flex border-b-[3px] border-[#6610f2] mb-10">
          <div className="bg-[#6610f2] text-white px-8 py-3 font-black text-sm uppercase tracking-widest italic rounded-t-lg cursor-default">
            Անհատ վարկեր
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-16">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-7 py-3 rounded-full text-[12px] font-black uppercase tracking-widest transition-all border-2 
                ${activeFilter === f.value 
                  ? "bg-[#6610f2] border-[#6610f2] text-white shadow-xl scale-105" 
                  : "bg-white border-gray-100 text-gray-400 hover:border-[#6610f2] hover:text-[#6610f2]"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 space-y-24">
        {filteredLoans.length > 0 ? (
          filteredLoans.map((loan) => (
            <section key={loan.id} className="flex flex-col md:flex-row items-center gap-10 lg:gap-20 border-b border-gray-50 pb-20 last:border-0 group">
              
              <div className="w-full md:w-[350px] lg:w-[420px] flex-shrink-0">
                <div className="bg-[#f8f9fb] rounded-[50px] p-10 aspect-square flex justify-center items-center overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img
                    src={loan.image}
                    alt={loan.title}
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x400/f2f4f7/6600cc?text=Evoca+Loan'; }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-[28px] lg:text-[38px] font-[900] italic uppercase text-[#1a1a1a] mb-6 leading-[1.1] tracking-tighter group-hover:text-[#6610f2] transition-colors">
                  {loan.title}
                </h2>
                <p className="text-gray-500 text-[17px] mb-10 leading-relaxed max-w-2xl font-medium">
                  {loan.description}
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  <div className="border-l-2 border-gray-100 pl-4">
                    <span className="text-gray-400 text-[10px] uppercase font-black block mb-2 tracking-widest">Մինչև</span>
                    <div className="text-[#6610f2] text-3xl font-[900] italic">{loan.duration}</div>
                    <span className="text-gray-400 text-[11px] font-bold block mt-1">ժամկետ</span>
                  </div>
                  <div className="border-l-2 border-gray-100 pl-4">
                    <span className="text-gray-400 text-[10px] uppercase font-black block mb-2 tracking-widest">Մինչև</span>
                    <div className="text-[#6610f2] text-3xl font-[900] italic tracking-tight">{loan.amount}</div>
                    <span className="text-gray-400 text-[11px] font-bold block mt-1 leading-tight">
                      Սահմանաչափ կամ <br /> համժեք արտարժույթ
                    </span>
                  </div>
                  <div className="col-span-2 lg:col-span-1 border-l-2 border-gray-100 pl-4">
                    <span className="text-gray-400 text-[10px] uppercase font-black block mb-2 tracking-widest">&nbsp;</span>
                    <div className="text-[#6610f2] text-3xl font-[900] italic">{loan.rate}</div>
                    <span className="text-gray-400 text-[11px] font-bold block mt-1">{loan.rateLabel}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/loan/${loan.id}`)}
                  className="inline-flex items-center gap-4 px-12 py-5 bg-[#f3ebff] text-[#6610f2] rounded-full font-[900] uppercase text-[12px] tracking-[0.2em] transition-all hover:bg-[#6610f2] hover:text-white hover:shadow-lg active:scale-95"
                >
                  Մանրամասն
                  <span className="text-xl transition-transform group-hover:translate-x-2">›</span>
                </button>
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-32">
            <h3 className="text-2xl text-gray-300 font-black italic uppercase tracking-widest">Այս կատեգորիայում վարկեր չկան</h3>
          </div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,800;0,900;1,900&display=swap');
        body { font-family: 'Montserrat', sans-serif; scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default AnhatVarker;
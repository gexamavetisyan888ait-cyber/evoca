import React from 'react';
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
}

export const loans: LoanType[] = [
  { id: 1, title: "Արագ բիզնես վարկ/վարկային գիծ", description: "Արագ ֆինանսավորում Ձեր բիզնեսի զարգացման համար միայն երաշխավորությամբ և ցածր տոկոսադրույքով:", duration: "60 ամիս", amount: "30 մլն ֏", rate: "8.5-14.5%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/17721008940374/415x261.png" },
  { id: 2, title: "Տեքստիլ ոլորտում հումքի ներմուծմանն ուղղված վարկ", description: "Evocabank-ը տրամադրում է բիզնես վարկ՝ տեքստիլ հումքի ներմուծման համար: Զարգացրեք Ձեր բիզնեսը և դարձեք մրցունակ:", duration: "36 ամիս", amount: "500 մլն ֏", rate: "8%", rateLabel: "Տոկոսադրույքի սուբսիդավորում", image: "https://www.evoca.am/images-cache/loans/1/17749381045652/415x261.png" },
  { id: 3, title: "Գյուղատնտեսական վարկեր", description: "Աջակցություն գյուղատնտեսությամբ զբաղվող տնտեսվարողներին՝ արտադրության ընդլայնման նպատակով:", duration: "84 ամիս", amount: "100 մլն ֏", rate: "2-5%", rateLabel: "Արտոնյալ տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148637167789/415x261.jpg" },
  { id: 4, title: "Առևտրային վարկեր", description: "Շրջանառու միջոցների համալրման և առևտրային գործունեության ընդլայնման համար նախատեսված վարկեր:", duration: "48 ամիս", amount: "200 մլն ֏", rate: "12-16%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148653401062/415x261.jpg" },
  { id: 5, title: "ՓՄՁ զարգացման վարկ", description: "Փոքր և միջին ձեռնարկությունների համար նախատեսված ճկուն ֆինանսավորման պայմաններ:", duration: "60 ամիս", amount: "80 մլն ֏", rate: "13%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16507186179774/415x261.png" },
  { id: 6, title: "Էներգաարդյունավետ վարկեր", description: "Ներդրեք էներգախնայող տեխնոլոգիաներ Ձեր բիզնեսում և նվազեցրեք ծախսերը պետական աջակցությամբ:", duration: "60 ամիս", amount: "150 մլն ֏", rate: "10%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148661034998/415x261.jpg" },
  { id: 7, title: "ՏՏ ոլորտի աջակցման վարկ", description: "Հատուկ պայմաններ տեղեկատվական տեխնոլոգիաների ոլորտում գործող ստարտափների և ընկերությունների համար:", duration: "36 ամիս", amount: "50 մլն ֏", rate: "9%", rateLabel: "Հատուկ սակագին", image: "https://www.evoca.am/images-cache/loans/1/1614870243661/415x261.jpg" },
  { id: 8, title: "Արտահանման ֆինանսավորում", description: "Արտահանման ծավալների մեծացման և միջազգային շուկաներ դուրս գալու համար նախատեսված գործիքներ:", duration: "24 ամիս", amount: "300 մլն ֏", rate: "7-11%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148681592638/415x261.jpg" },
  { id: 9, title: "Լիզինգ", description: "Ձեռք բերեք նոր սարքավորումներ, տեխնիկա կամ տրանսպորտային միջոցներ շահավետ լիզինգային պայմաններով:", duration: "60 ամիս", amount: "Անսահմանափակ", rate: "11-13%", rateLabel: "Լիզինգի տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148706367372/415x261.jpg" },
  { id: 10, title: "Բիզնես քարտեր (Overdraft)", description: "Կարճաժամկետ ֆինանսական խնդիրների արագ լուծում Ձեր բիզնես հաշվին կցված վարկային գծի միջոցով:", duration: "12 ամիս", amount: "10 մլն ֏", rate: "15%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/1614869229831/415x261.jpg" },
  { id: 11, title: "Կանանց ձեռներեցության աջակցություն", description: "Հատուկ վարկային ծրագրեր կին ձեռներեցների կողմից ղեկավարվող բիզնեսների զարգացման համար:", duration: "48 ամիս", amount: "40 մլն ֏", rate: "10.5%", rateLabel: "Արտոնյալ պայմաններ", image: "https://www.evoca.am/images-cache/loans/1/16148678149192/415x261.jpg" },
  { id: 12, title: "Արտադրական հզորությունների թարմացում", description: "Վարկեր արտադրական գծերի արդիականացման և նոր տեխնոլոգիաների ներդրման համար:", duration: "72 ամիս", amount: "400 մլն ֏", rate: "11%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148665659945/415x261.jpg" },
  { id: 13, title: "Վերականգնվող էներգետիկայի վարկ", description: "Ֆինանսավորում արևային կայանների և այլընտրանքային էներգիայի աղբյուրների տեղադրման համար:", duration: "120 ամիս", amount: "250 մլն ֏", rate: "9-12%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16148696068365/415x261.jpg" },
  { id: 14, title: "Բիզնես հիփոթեք", description: "Վարկեր բիզնես տարածքների, գրասենյակների կամ պահեստների ձեռքբերման և վերանորոգման համար:", duration: "180 ամիս", amount: "600 մլն ֏", rate: "11.5%", rateLabel: "Տարեկան տոկոսադրույք", image: "https://www.evoca.am/images-cache/loans/1/16394873850552/415x261.png" }
];

const Varker1: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="max-w-[1200px] mx-auto px-4 pt-16">
        <div className="flex border-b-[3px] border-[#6600cc]">
          <div className="bg-[#6600cc] text-white px-6 py-3 font-bold text-sm uppercase tracking-wide rounded-t-sm">
            Բիզնես վարկեր
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 mt-12 space-y-16">
        {loans.map((loan) => (
          <section key={loan.id} className="flex flex-col md:flex-row items-center gap-8 lg:gap-16 border-b border-gray-100 pb-16 last:border-0">
            <div className="w-full md:w-[320px] lg:w-[400px] flex-shrink-0">
              <div className="bg-[#f2f4f7] rounded-[32px] p-8 aspect-square flex justify-center items-center">
                <img
                  src={loan.image}
                  alt={loan.title}
                  className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x400/f2f4f7/6600cc?text=Evoca+Loan'; }}
                />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#1a1a1a] mb-5 leading-tight">
                {loan.title}
              </h2>
              <p className="text-gray-500 text-base mb-8 leading-relaxed max-w-2xl">
                {loan.description}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">Մինչև</span>
                  <div className="text-[#6600cc] text-3xl font-black">{loan.duration}</div>
                  <span className="text-gray-400 text-[11px] font-medium block mt-1">ժամկետ</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">Մինչև</span>
                  <div className="text-[#6600cc] text-3xl font-black tracking-tight">{loan.amount}</div>
                  <span className="text-gray-400 text-[11px] font-medium block mt-1 leading-tight">
                    Սահմանաչափ կամ <br /> համժեք արտարժույթ
                  </span>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">&nbsp;</span>
                  <div className="text-[#6600cc] text-3xl font-black">{loan.rate}</div>
                  <span className="text-gray-400 text-[11px] font-medium block mt-1">{loan.rateLabel}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/loan/${loan.id}`)}
                className="group flex items-center gap-3 px-8 py-3 bg-[#f3ebff] text-[#6600cc] rounded-full font-bold text-sm transition-all hover:bg-[#6600cc] hover:text-white"
              >
                Մանրամասն
                <span className="text-xl transition-transform group-hover:translate-x-1">›</span>
              </button>
            </div>
          </section>
        ))}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800;900&display=swap');
        body { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
};

export default Varker1;
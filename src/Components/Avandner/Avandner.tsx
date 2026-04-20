import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface DepositType {
  id: number;
  title: string;
  description: string;
  minAmount: string;
  amountLabel: string;
  rate: string;
  rateLabel: string;
  image: string;
}

export const deposits: DepositType[] = [
  { 
    id: 1, 
    title: "Դասական ավանդ", 
    description: "Ձեր անհոգ ապագայի համար առաջարկում ենք ավելացնել Ձեր խնայողությունները՝ ներդնելով Դասական ավանդ՝ կայուն և բարձր եկամտաբերությամբ:", 
    minAmount: "100,000 ֏", 
    amountLabel: "Նվազագույն գումար", 
    rate: "Մինչև 11%", 
    rateLabel: "Տարեկան տոկոսադրույք", 
    image: "https://www.evoca.am/images-cache/deposits/1/1613390220029/415x261.jpg" 
  },
  { 
    id: 2, 
    title: "Կուտակային ավանդ", 
    description: "Այս ավանդատեսակը հնարավորություն է տալիս պարբերաբար ավելացնել ավանդի գումարը և կուտակել միջոցներ ապագա նպատակների համար:", 
    minAmount: "50,000 ֏", 
    amountLabel: "Նվազագույն գումար", 
    rate: "Մինչև 10.5%", 
    rateLabel: "Տարեկան տոկոսադրույք", 
    image: "https://www.evoca.am/images-cache/deposits/1/16133900414285/415x261.jpg" 
  },
  { 
    id: 3, 
    title: "Կուտակային ավանդ", 
    description: "Այս ավանդատեսակը հնարավորություն է տալիս պարբերաբար ավելացնել ավանդի գումարը և կուտակել միջոցներ ապագա նպատակների համար:", 
    minAmount: "50,000 ֏", 
    amountLabel: "Նվազագույն գումար", 
    rate: "Մինչև 10.5%", 
    rateLabel: "Տարեկան տոկոսադրույք", 
    image: "https://www.evoca.am/images-cache/deposits/1/16133900122121/415x261.jpg" 
  },
];

const Avandner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="max-w-[1200px] mx-auto px-4 pt-16">
        <div className="flex border-b-[3px] border-[#6600cc]">
          <div className="bg-[#6600cc] text-white px-8 py-3.5 font-black text-[13px] uppercase tracking-widest rounded-t-xl">
            Ավանդներ
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 mt-12 space-y-16">
        {deposits.map((item) => (
          <section key={item.id} className="flex flex-col md:flex-row items-center gap-8 lg:gap-20 border-b border-gray-100 pb-16 last:border-0">
            <div className="w-full md:w-[320px] lg:w-[415px] flex-shrink-0">
              <div className="bg-[#f8f9fb] rounded-[40px] p-8 aspect-[415/261] flex justify-center items-center overflow-hidden group cursor-pointer shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-[26px] lg:text-[32px] font-[900] text-[#1a1a1a] mb-5 leading-tight tracking-tight">
                {item.title}
              </h2>
              <p className="text-[#6c757d] text-[16px] mb-10 leading-relaxed max-w-2xl font-medium">
                {item.description}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="flex flex-col">
                  <span className="text-[#adb5bd] text-[10px] uppercase font-black tracking-widest mb-2">Սկսած</span>
                  <div className="text-[#6610f2] text-[34px] font-[900] leading-none mb-1">{item.minAmount}</div>
                  <span className="text-[#495057] text-[12px] font-bold uppercase">{item.amountLabel}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-transparent text-[10px] mb-2">.</span>
                  <div className="text-[#6610f2] text-[34px] font-[900] leading-none mb-1 tracking-tighter">{item.rate}</div>
                  <span className="text-[#495057] text-[12px] font-bold uppercase leading-tight">{item.rateLabel}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/deposit/${item.id}`)}
                className="group flex items-center gap-4 px-10 py-4 bg-[#f4f0ff] text-[#6610f2] rounded-full font-black text-[13px] transition-all hover:bg-[#6610f2] hover:text-white uppercase tracking-widest"
              >
                Մանրամասն
                <span className="text-xl leading-none transition-transform group-hover:translate-x-1.5">›</span>
              </button>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Avandner;
import React from 'react';

const offers = [
  {
    category: "Թվային քարտեր",
    title: "Evoca Digital քարտ",
    desc: "Evoca Digital քարտն առաջին հայացքից EvocaTOUCH հավելվածում սմարթֆոնիդ մեջ հենց և լիարժեք քո վիրտուալ հաշիվը:",
    img: "https://www.evoca.am/images-cache/news/1/16868326578274/780x585.png" 
  },
  {
    category: "Նվեր քարտեր",
    title: "Evoca Gift Card",
    desc: "Գնիր Evoca Gift Card և լավագույն նվերը կլինի քոնը՝ ծախսելով ցանկացած 1 բոլոր առևտրի կետերում:",
    img: "https://www.evoca.am/images-cache/cards/1/17149864970842/415x261.png"
  },
  {
    category: "Նոր հավելված",
    title: "EvocaTOUCH 2",
    desc: "EvocaTOUCH-ը սովորական բանկային հավելված չէ, այն թարմ է, արագ և հարմար՝ հագեցած նոր լուծումներով:",
    img: "https://www.evoca.am/images-cache/news/1/16848286806716/780x585.png"
  },
  {
    category: "Արագ վճարումներ",
    title: "Արագ օնլայն վճարումներ",
    desc: "Կատարիր քո բոլոր վճարումները վայրկյանների մեջ օնլայն եղանակով՝ մոռանալով հերթերի ու ավելորդ ժամանակի մասին:",
    img: "https://www.evoca.am/images-cache/news/1/17758068998241/439x320.png"
  }
];

const BestOffers: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#6610f2] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rotate-12"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full border-4 border-white"></div>
      </div>

      <div data-aos="fade-up" className="max-w-[1440px] mx-auto px-6 md:px-20 relative">
        <h2 className="text-white text-3xl md:text-5xl font-black mb-16">Լավագույնը Evocabank-ից</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="flex-1 text-center md:text-left">
                <span className="text-[#6610f2] text-xs font-bold uppercase tracking-widest">{item.category}</span>
                <h3 className="text-2xl font-black text-[#1a1a1a] mt-2 mb-4 group-hover:text-[#6610f2] transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[250px] mx-auto md:mx-0">
                  {item.desc}
                </p>
              </div>
              <div className="flex-1 mt-8 md:mt-0 relative">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full max-w-[200px] object-contain transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestOffers;
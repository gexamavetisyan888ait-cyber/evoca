import React from 'react';
import { motion } from 'framer-motion';

const offers = [
  {
    category: "Թվային քարտեր",
    title: "Evoca Digital քարտ",
    desc: "Evoca Digital քարտն արդեն հասանելի է EvocaTOUCH հավելվածում։ Ակտիվացրու այն հիմա և ընտրիր քո սիրելի դիզայնը։",
  },
  {
    category: "Նվեր քարտեր",
    title: "Evoca Gift Card",
    desc: "Գնիր Evoca Gift Card, և լավագույն նվերը կլինի քոնը։ Քարտը հարմար է բոլոր առիթների համար։",
  },
  {
    category: "Նոր հավելված",
    title: "EvocaTOUCH 2",
    desc: "EvocaTOUCH-ը պարզապես բանկային հավելված չէ, վստահ ենք՝ այն քեզ համար դառնալու է ապրելակերպ։",
  },
  {
    category: "Օնլայն վճարումներ",
    title: "Արագ online վճարումներ",
    desc: "Կատարիր քո ընթացիկ վճարումները Evocabank-ի online տերմինալի միջոցով՝ պարզ և արագ։",
  }
];

const BestOffers: React.FC = () => {
  return (
    <section className="w-full min-h-screen py-20 bg-[#6610f2] relative overflow-hidden flex items-center">
      
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-[50%] text-white/10 text-6xl z-0"
      >
        ▲
      </motion.div>
      
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-[5%] text-white/05 text-8xl font-black z-0"
      >
        +
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-[700px]" 
            >
           
              <div className="absolute top-[10%] left-[30%] w-[180px] h-[180px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60 z-10">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-[1px] border-dashed border-white rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border-[1px] border-white/30 rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                />
              </div>

              <img 
                src="https://framerusercontent.com/images/1ZtehxKaB95hCfqOHdJsrNNRs.png?lossless=1" 
                alt="Evoca Statue" 
                className="w-full h-auto relative z-20 object-contain drop-shadow-2xl grayscale brightness-110" 
              />
              
              <h2 className="absolute top-[25%] left-[55%] whitespace-nowrap text-white text-[36px] md:text-[60px] font-[900] italic uppercase leading-[0.85] tracking-tighter z-30 drop-shadow-lg">
                Լավագույնը <br /> Evocabank-ից
              </h2>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-30">
            {offers.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0px 25px 50px rgba(0,0,0,0.25)"
                }}
                className="bg-white rounded-[2.5rem] p-10 flex flex-col justify-center transition-all cursor-pointer group border border-white/10"
              >
                <div className="mb-4">
                  <span className="text-[#6610f2] text-[10px] font-black uppercase tracking-[0.2em] bg-[#f1edff] px-4 py-1.5 rounded-full">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-[24px] font-[900] text-[#1a1a1a] mb-4 group-hover:text-[#6610f2] transition-colors leading-tight italic uppercase">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <div className="absolute inset-0 z-0 opacity-15">
        <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
          <path d="M-100 800C200 600 400 900 1440 500V800H-100Z" fill="white" />
        </svg>
      </div>
      
    </section>
  );
};

export default BestOffers;
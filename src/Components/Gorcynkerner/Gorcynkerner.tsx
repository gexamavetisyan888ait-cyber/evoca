import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';

const EvocaFullLanding: React.FC = () => {
  
  const partners = [
    { name: 'Factory', logo: 'https://www.evoca.am/images-cache/partners/1/17689930369925/348x150_grayscale.png' },
    { name: 'Indigo', logo: 'https://www.evoca.am/images-cache/partners/1/16104594273635/348x150_grayscale.png' },
    { name: 'Futuris Home', logo: 'https://www.evoca.am/images-cache/partners/1/1610459808737/348x150_grayscale.png' },
    { name: 'Adelie & the Stone', logo: 'https://www.evoca.am/images-cache/partners/1/16104599802947/348x150_grayscale.png' },
    { name: 'EarlyOne', logo: 'https://www.evoca.am/images-cache/partners/1/16104603665095/348x150_grayscale.png' },
    { name: 'EasyPay', logo: 'https://www.evoca.am/images-cache/partners/1/16104604109064/348x150_grayscale.png' },
    { name: 'Telcell', logo: 'https://www.evoca.am/images-cache/partners/1/16104604382658/348x150_grayscale.png' },
  ];

  return (
    <div className="overflow-x-hidden bg-white">
      
      <section className="relative min-h-[auto] lg:min-h-[700px] bg-[#7d2ae8] pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-8 md:px-12 lg:px-20 rounded-b-[40px] md:rounded-b-[80px] lg:rounded-b-[120px] flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10 text-white w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
            Օնլայն և մոբայլ բանկինգ
          </h1>
          <p className="text-base sm:text-lg opacity-90 mb-8 max-w-lg leading-relaxed font-medium">
            Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է, որն առանձնանում է տեղեկատվական նորագույն տեխնոլոգիաների ակտիվ կիրառմամբ:
          </p>
          
          <button className="w-full sm:w-auto bg-white text-[#7d2ae8] px-10 py-4 rounded-2xl font-extrabold text-lg hover:bg-gray-50 transition-all shadow-2xl active:scale-95 mb-10 md:mb-14">
            Դառնալ հաճախորդ
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/10 p-5 rounded-[24px] backdrop-blur-sm border border-white/10">
             <div className="bg-white p-2 rounded-xl hidden sm:block">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://evoca.am" alt="QR" className="w-16 h-16 lg:w-20 lg:h-20" />
             </div>
             <div className="flex flex-col items-center sm:items-start">
                <p className="text-[10px] md:text-xs font-bold mb-3 uppercase tracking-widest opacity-80">Ներբեռնել հավելվածները</p>
                <div className="flex gap-3 sm:gap-4">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="AppStore" className="h-8 md:h-9 cursor-pointer hover:opacity-80" />
                   <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="PlayStore" className="h-8 md:h-9 cursor-pointer hover:opacity-80" />
                </div>
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full lg:w-1/2 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[500px] md:max-w-[650px] lg:max-w-none">
            <div className="relative aspect-video bg-black rounded-t-2xl md:rounded-t-3xl border-[4px] md:border-[8px] border-[#222] shadow-2xl overflow-hidden">
               <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                 <source src="YOUR_VIDEO_URL.mp4" type="video/mp4" />
               </video>
            </div>
            <div className="h-2 md:h-4 w-full bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-2xl mx-auto"></div>

            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -right-2 -bottom-6 md:-right-8 md:-bottom-12 w-28 sm:w-36 md:w-44 lg:w-52 aspect-[9/19] bg-[#1a1a1a] rounded-[24px] md:rounded-[40px] border-[3px] md:border-[5px] border-[#222] shadow-2xl overflow-hidden z-20"
            >
               <img src="https://www.evoca.am/images-cache/banners/1/16153622710205/140x300.jpg" alt="Mobile" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-6">Գործընկերներ</h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-10 text-sm md:text-base">
              Դարձե՛ք Evocabank-ի Գործընկեր և եկե՛ք միասին գնանք դեպի գունեղ նոր իրականություն:
            </p>
            <button className="group inline-flex items-center gap-3 text-[#7d2ae8] font-bold text-lg">
              Բոլոր գործընկերները 
              <span className="bg-gray-100 p-2 rounded-full group-hover:bg-[#7d2ae8] group-hover:text-white transition-all transform group-hover:translate-x-2">
                <ChevronRight size={20} />
              </span>
            </button>
          </div>

          <div className="w-full lg:w-2/3 relative">
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 hidden xl:block pointer-events-none">
               <img src="https://lightscamerasocial.com/images/footer-rock.png" alt="Hand" className="w-32 h-auto rotate-12 relative z-20" />
               <div className="absolute inset-0 flex items-center justify-center -left-6 -top-6">
                  <div className="absolute border border-dashed border-yellow-400/60 rounded-full w-44 h-44 animate-spin-slow"></div>
                  <div className="absolute border border-dashed border-yellow-400/40 rounded-full w-52 h-52 animate-spin-left"></div>
                  <div className="absolute border border-dotted border-yellow-500/30 rounded-full w-60 h-60 animate-spin-medium"></div>
                  <div className="absolute border border-dashed border-yellow-300/20 rounded-full w-[260px] h-[260px] animate-spin-left-medium"></div>
                  <div className="absolute border border-dotted border-yellow-200/10 rounded-full w-[300px] h-[300px] animate-spin-very-slow"></div>
               </div>
            </div>

            <div className="bg-[#f9f9fb] rounded-[32px] md:rounded-[50px] p-6 md:p-12 lg:p-16 relative">
              <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                  480: { slidesPerView: 2, spaceBetween: 20 },
                  768: { slidesPerView: 3, spaceBetween: 30 },
                  1024: { slidesPerView: 3, spaceBetween: 40 },
                }}
                autoplay={{ delay: 3000 }}
                navigation={{ prevEl: '.nav-prev', nextEl: '.nav-next' }}
              >
                {partners.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="h-24 md:h-32 flex items-center justify-center p-6 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 grayscale hover:grayscale-0 transition-all duration-500">
                      <img src={item.logo} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="flex justify-center lg:justify-start gap-4 mt-8 lg:absolute lg:top-1/2 lg:-right-6 lg:flex-col lg:mt-0 lg:-translate-y-1/2">
                <button className="nav-prev bg-white p-3 rounded-full shadow-md text-gray-400 hover:text-[#7d2ae8] transition-colors z-20">
                  <ChevronLeft size={24} />
                </button>
                <button className="nav-next bg-white p-3 rounded-full shadow-md text-gray-400 hover:text-[#7d2ae8] transition-colors z-20">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin-right { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-left { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-slow { animation: spin-right 15s linear infinite; }
        .animate-spin-left { animation: spin-left 20s linear infinite; }
        .animate-spin-medium { animation: spin-right 10s linear infinite; }
        .animate-spin-left-medium { animation: spin-left 12s linear infinite; }
        .animate-spin-very-slow { animation: spin-right 30s linear infinite; }
      `}</style>
    </div>
  );
};

export default EvocaFullLanding;
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const LatestNews: React.FC = () => {
  const news = [
    {
      title: "Կարեն Եղիազարյանը` IMF և WBG Spring Meetings 2026-ին",
      date: "13.04.2026",
      category: "Բանկային",
      image: "https://www.evoca.am/images-cache/news/1/1776162446379/439x320.png",
      color: "#7d2ae8" 
    },
    {
      title: "Evoca-ն մասնակցում է Leasing Expo 2026-ին",
      date: "09.04.2026",
      category: "Կենսակերպ",
      image: "https://www.evoca.am/images-cache/news/1/17758068998241/439x320.png",
      color: "#a3ff00" 
    },
    {
      title: "ESG կառավարման համակարգը Evocabank-ում",
      date: "31.03.2026",
      category: "Բանկային",
      image: "https://www.evoca.am/images-cache/news/1/17757342882486/439x320.png",
      color: "#7d2ae8"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-20 max-w-[1440px] mx-auto bg-[#f4f6f9]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
          Վերջին նորությունները
        </h2>
        <button className="hidden sm:flex items-center gap-2 bg-[#e9e9f2] text-[#555] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#7d2ae8] hover:text-white transition-all group">
          Բոլոր նորությունները 
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -12 }}
            className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-[0_30px_60px_rgba(125,42,232,0.15)] transition-all duration-500 cursor-pointer group"
          >
            <div className="h-60 overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span 
                  className="w-[3px] h-4 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  {item.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#1a1a1a] mb-6 leading-tight h-[52px] line-clamp-2">
                {item.title}
              </h3>

              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm font-medium">
                  {item.date}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 sm:hidden flex justify-center">
        <button className="bg-[#e9e9f2] text-[#555] px-8 py-3 rounded-full font-bold text-sm">
          Բոլոր նորությունները
        </button>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default LatestNews;
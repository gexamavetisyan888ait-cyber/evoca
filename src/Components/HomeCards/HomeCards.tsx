import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// Firebase imports
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase"; 

interface NewsItem {
  id?: string;
  title: string;
  date: string;
  category: string;
  image: string;
  color: string;
}

const LatestNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Բեռնում ենք նորությունները Firebase-ից (օգտագործում ենք 'homecards' կամ 'latest_news' ըստ քո բազայի)
    const newsRef = ref(db, 'homecards'); 
    const unsubscribe = onValue(newsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Array.isArray(data) ? data : Object.values(data);
        setNews(formattedData as NewsItem[]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 px-4 md:px-20 max-w-[1440px] mx-auto bg-[#f8f9fb]">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-2">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[11px] font-black uppercase tracking-[0.3em] text-[#7d2ae8]"
          >
            Media Center
          </motion.span>
          <h2 className="text-[35px] md:text-[50px] font-[1000] text-[#1a1a1a] uppercase italic tracking-tighter leading-none">
            Վերջին <br className="md:hidden" /> նորությունները
          </h2>
        </div>
        
        <motion.button 
          whileHover={{ x: 5 }}
          className="hidden sm:flex items-center gap-3 bg-white text-[#1a1a1a] px-8 py-4 rounded-full font-black text-[12px] uppercase tracking-widest shadow-sm hover:shadow-md transition-all group border border-gray-100"
        >
          Տեսնել բոլորը 
          <ChevronRight size={18} className="text-[#7d2ae8] group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {loading ? (
        <div className="py-20 text-center font-black text-[#7d2ae8] uppercase italic tracking-widest animate-pulse">
          Բեռնվում է...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((item, idx) => (
            <motion.div 
              key={item.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15 }}
              className="bg-white rounded-[45px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(125,42,232,0.12)] transition-all duration-500 cursor-pointer group border border-gray-50"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                />
                <div className="absolute top-6 left-6">
                  <span 
                    className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
                    style={{ backgroundColor: item.color || '#7d2ae8' }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-10">
                <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] mb-4">
                  {item.date}
                </p>

                <h3 className="text-[20px] font-[1000] text-[#1a1a1a] mb-8 leading-tight italic uppercase tracking-tighter h-[56px] line-clamp-2 group-hover:text-[#7d2ae8] transition-colors">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-[#7d2ae8] font-black text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Կարդալ ավելին <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-12 sm:hidden flex justify-center">
        <button className="bg-white border border-gray-100 text-[#1a1a1a] px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-sm">
          Բոլոր նորությունները
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        section {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default LatestNews;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// --- Firebase Imports ---
import { db } from '../../lib/firebase'; // Ստուգիր հասցեն ըստ քո նախագծի
import { ref, onValue } from 'firebase/database';

interface NewsItem {
  title: string;
  date: string;
  category: string;
  image: string;
  color: string;
}

const LatestNews: React.FC = () => {
  // --- Dynamic News State ---
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch News from Firebase ---
  useEffect(() => {
    const newsRef = ref(db, 'homecards'); // Ենթադրվում է, որ JSON-ը տեղադրել ես news_data node-ի տակ
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

      {loading ? (
        <div className="flex justify-center items-center py-20 text-[#7d2ae8] font-bold">
          Բեռնվում է...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
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
      )}

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
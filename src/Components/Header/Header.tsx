import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Globe, Search, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };

  const topNavLinks = [
    { name: "Անհատ", path: "/" },
    { name: "Բիզնես", path: "/business" },
    { name: "Ակնթարթային վճարումներ", path: "/instant-payments" },
    { name: "Մեր մասին", path: "/about" },
    { name: "Նորություններ", path: "/news" },
    { name: "Բլոգ", path: "/blog" },
    { name: "Կարիերա", path: "/career" },
  ];

  // Ընդլայնված ենթամենյուներ բոլոր բաժինների համար
  const secondaryMenus: Record<string, { name: string, path: string }[]> = {
    "/": [
      { name: "Վարկեր", path: "/personal-loans" },
      { name: "Քարտեր", path: "/cards" },
      { name: "Ավանդներ", path: "/deposits" },
      { name: "Հաշիվներ", path: "/accounts" },
      { name: "Փոխանցումներ", path: "/transfers" },
      { name: "Արժեթղթեր", path: "/securities" },
      { name: "EvocaSALARY", path: "/evoca-salary" },
      { name: "EvocaTOUCH", path: "/touch" }
    ],
    "/business": [
      { name: "Վարկեր", path: "/business/loans" },
      { name: "Լիզինգ", path: "/business/leasing" },
      { name: "Հաշիվներ", path: "/business/accounts" },
      { name: "Ավանդներ", path: "/business/deposits" },
      { name: "Արժեթղթի շուկա", path: "/business/securities" },
      { name: "Առևտրի ֆինանսավորում", path: "/business/trade-finance" },
      { name: "Դիջիթալ", path: "/business/digital" }
    ],
    "/instant-payments": [
      { name: "Վճարային տերմինալներ", path: "/instant-payments/terminals" },
      { name: "Էլեկտրոնային դրամապանակներ", path: "/instant-payments/wallets" },
      { name: "Օնլայն վճարումներ", path: "/instant-payments/online" },
    ],
   "/about": [
      { name: "Evoca-ի մասին", path: "/about/about" },
      { name: "Սակագներ", path: "/about/sakagin" },
      { name: "Հայտարարություններ", path: "/about/hayter" },
    ],
    "/career": [
      { name: "Evoca լայֆ", path: "/career/EvocaLife" },
      { name: "Աշխատանք և պրակտիկա", path: "/career/work" },
    ],
  };

  const getCurrentTopPath = () => {
    const path = location.pathname;
    if (path.startsWith("/business")) return "/business";
    if (path.startsWith("/career")) return "/career";
    if (path.startsWith("/about")) return "/about";
    if (path.startsWith("/instant-payments")) return "/instant-payments";
    if (path.startsWith("/news")) return "/news";
    if (path.startsWith("/blog")) return "/blog";
    return "/";
  };

  const currentTopPath = getCurrentTopPath();
  const currentSecondaryMenu = secondaryMenus[currentTopPath] || [];

  return (
    <header className="w-full flex flex-col bg-white sticky top-0 z-[100] font-sans">
      {/* Top Nav (Desktop) */}
      <div className="hidden xl:flex w-full h-10 border-b border-gray-100 bg-[#f8f9fb] justify-center">
        <div className="w-full max-w-[1450px] px-6 flex items-center justify-between">
          <div className="flex items-center h-full space-x-6">
            {topNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-black transition-all h-full flex items-center relative uppercase tracking-tighter ${currentTopPath === link.path ? "text-[#6610f2]" : "text-gray-400 hover:text-[#6610f2]"}`}
              >
                {link.name}
                {currentTopPath === link.path && (
                  <motion.div layoutId="navLine" className="absolute top-0 left-0 w-full h-[3px] bg-[#6610f2]" />
                )}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 border-r pr-4 border-gray-200 text-gray-400">
              <Search size={15} className="hover:text-[#6610f2] cursor-pointer transition-colors" />
              <MapPin size={15} className="hover:text-[#6610f2] cursor-pointer transition-colors" />
              <Globe size={15} className="hover:text-[#6610f2] cursor-pointer transition-colors" />
            </div>
            <span className="text-[#6610f2] text-[11px] font-black uppercase tracking-widest cursor-pointer">EvocaONLINE</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="w-full h-16 lg:h-20 bg-white relative z-[110] flex justify-center shadow-sm">
        <div className="w-full max-w-[1450px] px-6 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link to="/">
              <img className="w-[90px] lg:w-[170px]" src="https://www.meridianexpo.am/wp-content/uploads/2019/03/logo_gray.png" alt="Logo" />
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              {currentSecondaryMenu.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-[13px] uppercase tracking-tight font-black transition-colors ${location.pathname === item.path ? 'text-[#6610f2]' : 'text-gray-400 hover:text-[#6610f2]'}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block bg-[#6610f2] text-white px-7 py-2 rounded-full font-black text-[12px] uppercase shadow-lg shadow-purple-200 hover:scale-105 transition-all">
              Մուտք
            </button>
            <button onClick={toggleMenu} className="p-2 text-[#1a1a1a] hover:bg-gray-50 rounded-full transition-colors">
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Burger Menu (Original Evoca Style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-[#6610f2] z-[105] flex"
          >
            {/* Background Davids Head (Optional overlay style) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img src="https://www.evoca.am/images/head.png" className="h-full object-cover" alt="" />
            </div>

            <div className="max-w-[1450px] mx-auto w-full flex flex-col md:flex-row px-6 md:px-20 pt-32 md:pt-40 relative z-10">
              
              {/* Left Side: Main Navigation */}
              <div className="w-full md:w-1/3 flex flex-col space-y-4 border-b md:border-b-0 md:border-r border-white/10 pb-10 md:pb-0">
                {topNavLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link 
                      to={link.path} 
                      className={`text-2xl md:text-3xl font-black italic uppercase tracking-tighter transition-all hover:pl-4 ${currentTopPath === link.path ? 'text-white' : 'text-white/40 hover:text-white'}`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Right Side: Submenus (Dynamic) */}
              <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:pl-20 pt-10 md:pt-0 overflow-y-auto no-scrollbar">
                {currentSecondaryMenu.length > 0 ? (
                    currentSecondaryMenu.map((sub, i) => (
                        <motion.div
                            key={sub.name}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + (i * 0.05) }}
                        >
                            <Link to={sub.path} className="group flex flex-col">
                                <span className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-1 group-hover:text-white transition-colors">Բաժին</span>
                                <span className="text-white text-lg md:text-xl font-black italic uppercase tracking-tighter group-hover:underline decoration-2 underline-offset-4">
                                    {sub.name}
                                </span>
                            </Link>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-white/20 text-4xl font-black uppercase italic tracking-tighter">
                        Evocabank
                    </div>
                )}
              </div>
            </div>

            {/* Close Button UI (Extra for style) */}
            <button 
                onClick={toggleMenu}
                className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
            >
                <X size={40} strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
        header { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </header>
  );
};

export default Header;
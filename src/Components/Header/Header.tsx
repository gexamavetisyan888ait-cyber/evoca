import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Globe, Search, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Փակել մենյուն էջը փոխելիս
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
      { name: "Digital", path: "/business/digital" },
      { name: "Այլ", path: "/business/other" }
    ]
  };

  const getCurrentTopPath = () => {
    const path = location.pathname;
    const personalPaths = ["/personal-loans", "/deposits", "/cards", "/accounts", "/deposit"];
    if (path === "/" || personalPaths.some(p => path.startsWith(p))) return "/";
    if (path.startsWith("/business") || path.startsWith("/loan")) return "/business";
    const found = topNavLinks.find(link => link.path !== "/" && path.startsWith(link.path));
    return found ? found.path : "/";
  };

  const currentTopPath = getCurrentTopPath();
  const currentSecondaryMenu = secondaryMenus[currentTopPath] || [];

  return (
    <header className="w-full flex flex-col bg-white sticky top-0 z-[100] shadow-sm font-sans">
      {/* 1. Upper Bar (Desktop) */}
      <div className="hidden xl:flex w-full h-10 border-b border-gray-100 px-20 items-center justify-between bg-[#f8f9fb]">
        <div className="flex items-center h-full space-x-6">
          {topNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] font-[800] transition-all h-full flex items-center relative uppercase tracking-tighter ${
                currentTopPath === link.path ? "text-[#6610f2]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {link.name}
              {currentTopPath === link.path && <motion.div layoutId="navLine" className="absolute top-0 left-0 w-full h-[3px] bg-[#6610f2]" />}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-6 text-gray-400">
          <div className="flex items-center space-x-4 border-r pr-4 border-gray-200">
            <MapPin size={16} className="hover:text-[#6610f2] cursor-pointer" /> 
            <Globe size={16} className="hover:text-[#6610f2] cursor-pointer" /> 
            <Search size={16} className="hover:text-[#6610f2] cursor-pointer" />
          </div>
          <span className="text-[#6610f2] text-[11px] font-black uppercase tracking-widest cursor-pointer">EvocaONLINE</span>
        </div>
      </div>

      {/* 2. Main Bar */}
      <div className="w-full h-16 lg:h-20 px-4 xl:px-20 flex items-center justify-between bg-white relative z-[110]">
        <div className="flex items-center space-x-12">
          <Link to="/" className="text-[28px] lg:text-[34px] font-[900] tracking-tighter text-[#4d4d4d]">evoca</Link>
          <nav className="hidden lg:flex items-center space-x-8">
            {currentSecondaryMenu.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-[14px] font-[900] uppercase transition-colors ${
                  location.pathname === item.path ? 'text-[#6610f2]' : 'text-[#1a1a1a] hover:text-[#6610f2]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block bg-[#6610f2] text-white px-8 py-2.5 rounded-full font-black text-[13px] hover:bg-[#520dc2] transition-all uppercase">
            EvocaOnline
          </button>
          {/* Burger Icon */}
          <button onClick={toggleMenu} className="lg:hidden p-2 text-[#1a1a1a]">
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* 3. Mobile Burger Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-[105] pt-24 px-6 flex flex-col"
          >
            <div className="flex gap-4 mb-10 overflow-x-auto no-scrollbar">
              {topNavLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-6 py-2 rounded-full text-[12px] font-black uppercase border transition-all ${
                    currentTopPath === link.path ? "bg-[#6610f2] text-white border-[#6610f2]" : "text-gray-400 border-gray-200"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col space-y-6">
              {currentSecondaryMenu.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={item.name}
                >
                  <Link to={item.path} className="flex justify-between items-center group">
                    <span className="text-2xl font-[900] italic uppercase tracking-tighter text-[#1a1a1a] group-hover:text-[#6610f2]">
                      {item.name}
                    </span>
                    <ChevronRight size={24} className="text-gray-300" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pb-10 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-4 border-t pt-8">
                {topNavLinks.slice(2).map(link => (
                  <Link key={link.name} to={link.path} className="text-[12px] font-bold text-gray-400 uppercase">{link.name}</Link>
                ))}
              </div>
              <div className="flex items-center justify-between bg-[#f8f9fb] p-4 rounded-2xl">
                <div className="flex gap-4 text-[#6610f2]">
                  <MapPin size={22} /> <Globe size={22} /> <Search size={22} />
                </div>
                <span className="font-black text-[#6610f2] text-[13px] uppercase">EvocaOnline</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
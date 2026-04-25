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
    { name: "Ակնթարդային վճարումներ", path: "/instant-payments" },
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
      { name: "Դիջիթալ", path: "/business/digital" },
      { name: "Այլ", path: "/business/other" }
    ],
    "/career": [
      { name: "Evoca լայֆ", path: "/career/EvocaLife" },
      { name: "Աշխատանք և պրակտիկա", path: "/career/work" },
    ],
    "/about": [
      { name: "Evoca-ի մասին", path: "/about/about" },
      { name: "Սակագներ", path: "/about/sakagin" },
      { name: "Հայտարարություններ", path: "/about/hayter" },
    ]
  };

  const getCurrentTopPath = () => {
    const path = location.pathname;
    if (path.startsWith("/business")) return "/business";
    if (path.startsWith("/career")) return "/career";
    if (path.startsWith("/about")) return "/about";
    if (path.startsWith("/news")) return "/news";
    if (path.startsWith("/blog")) return "/blog";
    if (path.startsWith("/instant-payments")) return "/instant-payments";

    const personalPaths = ["/personal-loans", "/deposits", "/cards", "/accounts", "/transfers", "/securities", "/evoca-salary", "/touch"];
    if (path === "/" || personalPaths.some(p => path.startsWith(p))) return "/";

    return "/";
  };

  const currentTopPath = getCurrentTopPath();
  const currentSecondaryMenu = secondaryMenus[currentTopPath] || [];

  return (
    <header className="w-full flex flex-col bg-white sticky top-0 z-[100] shadow-sm font-sans">
      {/* Top Nav (Grey Bar) */}
      <div className="hidden xl:flex w-full h-10 border-b border-gray-100 bg-[#f8f9fb] justify-center">
        <div className="w-full max-w-[1450px] px-6 flex items-center justify-between">
          <div className="flex items-center h-full space-x-6">
            {topNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path === "/career" ? "/career/EvocaLife" : link.path}
                className={`text-[11px] font-[700] transition-all h-full flex items-center relative uppercase tracking-tighter ${currentTopPath === link.path
                    ? "text-[#6610f2]"
                    : "text-gray-400 hover:text-[#6610f2]"
                  }`}
              >
                {link.name}
                {currentTopPath === link.path && (
                  <motion.div layoutId="navLine" className="absolute top-0 left-0 w-full h-[3px] bg-[#6610f2]" />
                )}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-4 border-r pr-4 border-gray-200">
              <Search size={15} className="hover:text-[#6610f2] cursor-pointer transition-colors" />
              <MapPin size={15} className="hover:text-[#6610f2] cursor-pointer transition-colors" />
              <Globe size={15} className="hover:text-[#6610f2] cursor-pointer transition-colors" />
            </div>
            <span className="text-gray-400 hover:text-[#6610f2] text-[11px] font-black uppercase tracking-widest cursor-pointer transition-colors">
              EvocaONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav (White Bar) */}
      <div className="w-full h-16 lg:h-20 bg-white relative z-[110] flex justify-center">
        <div className="w-full max-w-[1450px] px-6 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center">
              <img 
                className="w-[100px]  object-contain" 
                src="https://www.meridianexpo.am/wp-content/uploads/2019/03/logo_gray.png" 
                alt="Evocabank Logo" 
              />
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {currentSecondaryMenu.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-[13px] uppercase transition-all tracking-tight font-semibold ${location.pathname === item.path
                      ? 'text-[#6610f2] font-black'
                      : 'text-gray-400 hover:text-[#6610f2]'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block bg-[#6610f2] text-white px-7 py-2 rounded-full font-black text-[12px] hover:bg-[#520dc2] transition-all uppercase shadow-md active:scale-95">
              EvocaOnline
            </button>
            <button onClick={toggleMenu} className="lg:hidden p-2 text-[#1a1a1a]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-[105] pt-24 px-6 flex flex-col"
          >
            <div className="flex gap-4 mb-10 overflow-x-auto no-scrollbar pb-2">
              {topNavLinks.filter(l => ["Անհատ", "Բիզնես", "Կարիերա"].includes(l.name)).map((link) => (
                <Link
                  key={link.name}
                  to={link.path === "/career" ? "/career/EvocaLife" : link.path}
                  className={`px-6 py-2 rounded-full text-[12px] font-black uppercase border transition-all shrink-0 ${currentTopPath === link.path ? "bg-[#6610f2] text-white border-[#6610f2]" : "text-gray-400 border-gray-200"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col space-y-6 overflow-y-auto pb-10">
              {currentSecondaryMenu.length > 0 ? (
                currentSecondaryMenu.map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={item.name}
                  >
                    <Link to={item.path} className="flex justify-between items-center group">
                      <span className={`text-2xl font-[700] italic uppercase tracking-tighter transition-colors ${location.pathname === item.path ? 'text-[#6610f2]' : 'text-gray-400 group-hover:text-[#6610f2]'
                        }`}>
                        {item.name}
                      </span>
                      <ChevronRight size={24} className={location.pathname === item.path ? 'text-[#6610f2]' : 'text-gray-300'} />
                    </Link>
                  </motion.div>
                ))
              ) : (
                <Link to={currentTopPath} className="text-2xl font-[700] italic uppercase tracking-tighter text-[#6610f2]">
                  {topNavLinks.find(l => l.path === currentTopPath)?.name}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
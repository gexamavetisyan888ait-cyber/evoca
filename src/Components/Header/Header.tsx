import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Globe, Search, Menu, X, MessageCircle } from 'lucide-react';
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

  // Burger-ի աջ հատվածի բոլոր հավաքված բաժինները
  const burgerSections = [
    {
      title: "Վարկեր",
      items: [
        { name: "Անհատական վարկեր", path: "/personal-loans" },
        { name: "Բիզնես վարկեր", path: "/business/loans" },
        { name: "Լիզինգ", path: "/business/leasing" }
      ]
    },
    {
      title: "Ավանդներ",
      items: [
        { name: "Անհատական ավանդներ", path: "/deposits" },
        { name: "Բիզնես ավանդներ", path: "/business/deposits" }
      ]
    },
    {
      title: "Քարտեր & Հաշիվներ",
      items: [
        { name: "Քարտեր", path: "/cards" },
        { name: "Հաշիվներ", path: "/accounts" },
        { name: "Evoca Benefits", path: "/benefits" }
      ]
    },
    {
      title: "Կարիերա",
      items: [
        { name: "Evoca լայֆ", path: "/career/EvocaLife" },
        { name: "Աշխատանք և պրակտիկա", path: "/career/work" }
      ]
    },
    {
      title: "Մեր մասին",
      items: [
        { name: "Evoca-ի մասին", path: "/about/about" },
        { name: "Սակագներ", path: "/about/sakagin" },
        { name: "Հայտարարություններ", path: "/about/hayter" }
      ]
    }
  ];

  const getCurrentTopPath = () => {
    const path = location.pathname;
    if (path.startsWith("/business")) return "/business";
    if (path.startsWith("/career")) return "/career";
    if (path.startsWith("/about")) return "/about";
    const personalPaths = ["/personal-loans", "/deposits", "/cards", "/accounts", "/transfers", "/securities", "/evoca-salary", "/touch"];
    if (path === "/" || personalPaths.some(p => path.startsWith(p))) return "/";
    return "/";
  };

  const currentTopPath = getCurrentTopPath();
  const currentSecondaryMenu = secondaryMenus[currentTopPath] || [];

  return (
    <header className="w-full flex flex-col bg-white sticky top-0 z-[100] shadow-sm font-sans">
      {/* --- ՀԻՆ TOP NAV (Չփոփոխված) --- */}
      <div className="hidden xl:flex w-full h-10 border-b border-gray-100 bg-[#f8f9fb] justify-center">
        <div className="w-full max-w-[1450px] px-6 flex items-center justify-between">
          <div className="flex items-center h-full space-x-6">
            {topNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path === "/career" ? "/career/EvocaLife" : link.path}
                className={`text-[11px] font-[700] transition-all h-full flex items-center relative uppercase tracking-tighter ${
                  currentTopPath === link.path ? "text-[#6610f2]" : "text-gray-400 hover:text-[#6610f2]"
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

      {/* --- ՀԻՆ MAIN NAV (Չփոփոխված) --- */}
      <div className="w-full h-16 lg:h-20 bg-white relative z-[120] flex justify-center">
        <div className="w-full max-w-[1450px] px-6 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link to="/" className={`transition-all ${isOpen ? 'brightness-0 invert' : ''}`}>
              <img 
                className="w-[100px] object-contain" 
                src="https://www.meridianexpo.am/wp-content/uploads/2019/03/logo_gray.png" 
                alt="Logo" 
              />
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              {currentSecondaryMenu.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-[13px] uppercase transition-all tracking-tight font-semibold ${
                    location.pathname === item.path ? 'text-[#6610f2] font-black' : 'text-gray-400 hover:text-[#6610f2]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className={`hidden sm:block px-7 py-2 rounded-full font-black text-[12px] uppercase shadow-md transition-all ${
              isOpen ? 'bg-white text-[#6610f2]' : 'bg-[#6610f2] text-white hover:bg-[#520dc2]'
            }`}>
              Մուտք
            </button>
            <button onClick={toggleMenu} className={`p-2 transition-colors ${isOpen ? 'text-white' : 'text-[#1a1a1a]'}`}>
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- ՆՈՐ ՀԶՈՐ BURGER MENU (Ավելացված բաժիններով) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-[#6610f2] z-[110] flex"
          >
            {/* Ձախ սյունակ */}
            <div className="hidden lg:flex w-[350px] h-full bg-[#1a1a1a] flex-col justify-center px-12 space-y-8">
               {topNavLinks.slice(0, 7).map((link, i) => (
                 <motion.div
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: i * 0.08 }}
                   key={link.name}
                 >
                   <Link 
                     to={link.path === "/career" ? "/career/EvocaLife" : link.path} 
                     className="text-white text-2xl font-black italic hover:text-[#6610f2] transition-colors uppercase tracking-tighter"
                   >
                     {link.name}
                   </Link>
                 </motion.div>
               ))}
            </div>

            {/* Աջ սյունակ (Բոլոր հավաքված բաժինները) */}
            <div className="flex-1 h-full overflow-y-auto pt-32 pb-12 px-8 lg:px-20 custom-scrollbar">
              <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                {burgerSections.map((section, idx) => (
                  <motion.div 
                    key={section.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <h3 className="text-white text-2xl font-black mb-4 uppercase italic tracking-tighter">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item.name}>
                          <Link to={item.path} className="text-white/70 hover:text-white text-sm font-bold transition-colors">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap gap-10">
                <div className="flex items-center gap-4 text-white">
                    <MessageCircle size={24} />
                    <span className="font-bold">Շուրջօրյա աջակցություն: 8444</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-[-50px] right-[-50px] opacity-[0.04] pointer-events-none select-none">
                <h1 className="text-[300px] font-black italic text-white leading-none">EVOCA</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
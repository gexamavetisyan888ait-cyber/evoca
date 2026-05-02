import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Globe, Search, Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Բոլոր տեքստերը վերցնում ենք i18n-ից
  const topNavLinks = [
    { name: t('nav.personal'), path: "/" },
    { name: t('nav.business'), path: "/business/loans" },
    { name: t('nav.instant_payments'), path: "/instant-payments" },
    { name: t('nav.about'), path: "/about/about" },
    { name: t('nav.news'), path: "/news" },
    { name: t('nav.blog'), path: "/blog" },
    { name: t('nav.career'), path: "/career/EvocaLife" },
  ];

  const secondaryMenus: Record<string, { name: string, path: string }[]> = {
    "/": [
      { name: t('menu.loans'), path: "/personal-loans" },
      { name: t('menu.cards'), path: "/cards" },
      { name: t('menu.deposits'), path: "/deposits" },
      { name: t('menu.accounts'), path: "/accounts" },
      { name: t('menu.transfers'), path: "/transfers" },
      { name: t('menu.securities'), path: "/securities" },
      { name: t('menu.salary'), path: "/evoca-salary" },
      { name: t('menu.touch'), path: "/touch" }
    ],
    "/business": [
      { name: t('menu.loans'), path: "/business/loans" },
      { name: t('menu.leasing'), path: "/business/leasing" },
      { name: t('menu.accounts'), path: "/business/accounts" },
      { name: t('menu.deposits'), path: "/business/deposits" },
      { name: t('menu.securities'), path: "/business/securities" },
      { name: t('menu.trade_finance'), path: "/business/trade-finance" },
      { name: t('menu.digital'), path: "/business/digital" },
      { name: t('menu.other'), path: "/business/other" }
    ],
    "/career": [
      { name: t('menu.life'), path: "/career/EvocaLife" },
      { name: t('menu.work'), path: "/career/work" },
    ],
    "/about": [
      { name: t('menu.about_evoca'), path: "/about/about" },
      { name: t('menu.rates'), path: "/about/sakagin" },
      { name: t('menu.announcements'), path: "/about/hayter" },
    ],
  };

  const burgerSections = [
    {
      title: t('menu.loans'),
      items: [
        { name: t('burger.personal_loans'), path: "/personal-loans" },
        { name: t('burger.business_loans'), path: "/business/loans" },
        { name: t('menu.leasing'), path: "/business/leasing" }
      ]
    },
    {
      title: t('menu.deposits'),
      items: [
        { name: t('burger.personal_deposits'), path: "/deposits" },
        { name: t('burger.business_deposits'), path: "/business/deposits" }
      ]
    },
    {
      title: t('burger.cards_accounts'),
      items: [
        { name: t('menu.cards'), path: "/cards" },
        { name: t('menu.accounts'), path: "/accounts" },
        { name: t('burger.benefits'), path: "/benefits" }
      ]
    }
  ];

  const getActiveTopPath = () => {
    const path = location.pathname;
    if (path.startsWith("/business")) return "/business/loans";
    if (path.startsWith("/career")) return "/career/EvocaLife";
    if (path.startsWith("/about")) return "/about/about";
    if (path.startsWith("/news")) return "/news";
    if (path.startsWith("/blog")) return "/blog";
    if (path.startsWith("/instant-payments")) return "/instant-payments";
    return "/";
  };

  const activeTopPath = getActiveTopPath();

  const getBaseFolder = () => {
    const path = location.pathname;
    if (path.startsWith("/business")) return "/business";
    if (path.startsWith("/career")) return "/career";
    if (path.startsWith("/about")) return "/about";
    return "/";
  };

  const shouldShowSecondaryMenu = () => {
    const path = location.pathname;
    if (path.startsWith("/news") || path.startsWith("/blog") || path.startsWith("/instant-payments")) return false;
    return true;
  };

  const currentSecondaryMenu = shouldShowSecondaryMenu() ? (secondaryMenus[getBaseFolder()] || []) : [];

  return (
    <header className="w-full flex flex-col bg-white sticky top-0 z-[100] shadow-sm font-sans">
      {/* --- TOP NAV --- */}
      <div className="hidden xl:flex w-full h-10 border-b border-gray-100 bg-[#f8f9fb] justify-center">
        <div className="w-full max-w-[1450px] px-6 flex items-center justify-between">
          <div className="flex items-center h-full space-x-6">
            {topNavLinks.map((link) => {
              const isActive = activeTopPath === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[11px] font-[700] transition-all h-full flex items-center relative uppercase tracking-tighter ${
                    isActive ? "text-[#6610f2]" : "text-gray-400 hover:text-[#6610f2]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div layoutId="navLine" className="absolute top-0 left-0 w-full h-[3px] bg-[#6610f2]" />
                  )}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-4 border-r pr-4 border-gray-200">
              <Search size={15} className="hover:text-[#6610f2] cursor-pointer transition-colors" />
              <MapPin size={15} className="hover:text-[#6610f2] cursor-pointer transition-colors" />
              
              {/* Language Switcher Dropdown/Buttons */}
              <div className="flex items-center gap-2 ml-2">
                {['AM', 'EN', 'RU'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang.toLowerCase())}
                    className={`text-[10px] font-bold hover:text-[#6610f2] transition-colors ${
                      i18n.language === lang.toLowerCase() ? 'text-[#6610f2]' : 'text-gray-400'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-gray-400 hover:text-[#6610f2] text-[11px] font-black uppercase tracking-widest cursor-pointer transition-colors">
              EvocaONLINE
            </span>
          </div>
        </div>
      </div>

      {/* --- MAIN NAV --- */}
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
              {t('common.login')}
            </button>
            <button onClick={toggleMenu} className={`p-2 transition-colors ${isOpen ? 'text-white' : 'text-[#1a1a1a]'}`}>
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- BURGER MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-[#6610f2] z-[110] flex"
          >
            <div className="hidden lg:flex w-[350px] h-full bg-[#1a1a1a] flex-col justify-center px-12 space-y-8">
               {topNavLinks.map((link, i) => (
                 <motion.div
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: i * 0.08 }}
                   key={link.name}
                 >
                   <Link 
                     to={link.path} 
                     className="text-white text-2xl font-black italic hover:text-[#6610f2] transition-colors uppercase tracking-tighter"
                   >
                     {link.name}
                   </Link>
                 </motion.div>
               ))}
            </div>

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
                    <span className="font-bold">{t('common.support')}: 8444</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
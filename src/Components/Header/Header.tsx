import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("/"); 
  const location = useLocation();

  const getBaseFolder = () => {
    const path = location.pathname;
    if (path.startsWith("/business")) return "/business";
    if (path.startsWith("/career")) return "/career";
    if (path.startsWith("/about")) return "/about";
    if (path.startsWith("/norutyunner")) return "/norutyunner";
    if (path.startsWith("/blog")) return "/blog";
    if (path.startsWith("/instant-payments")) return "/instant-payments";
    return "/";
  };

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
    setActiveTab(getBaseFolder());
  }, [location.pathname]);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : 'unset';
    if (nextState) setActiveTab(getBaseFolder());
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const topNavLinks = [
    { name: t('nav.personal'), path: "/personal-loans" }, // Default: Անհատական վարկեր
    { name: t('nav.business'), path: "/business/loans" }, // Default: Բիզնես վարկեր
    { name: t('nav.instant_payments'), path: "/instant-payments" },
    { name: t('nav.about'), path: "/about/about" }, // Default: Մեր մասին
    { name: t('nav.news'), path: "/norutyunner" },
    { name: t('nav.blog'), path: "/blog" },
    { name: t('nav.career'), path: "/career/EvocaLife" }, // Default: EvocaLife
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

  const burgerContent: Record<string, any[]> = {
    "/": [
      { title: "Վարկեր", items: [{ name: "Վարկեր", path: "/personal-loans" }, { name: "Վարկային պատմություն", path: "/score" }] },
      { title: "Քարտեր", items: [{ name: "Քարտեր", path: "/cards" }, { name: "Evoca Benefits", path: "/benefits" }] }
    ],
    "/business": [
      { title: "Վարկեր", items: [{ name: "Վարկեր բիզնեսին", path: "/business/loans" }, { name: "Լիզինգ", path: "/business/leasing" }] }
    ],
    "/about": [
      { title: "Բանկի մասին", items: [{ name: "Մեր մասին", path: "/about/about" }, { name: "Սակագներ", path: "/about/sakagin" }] }
    ],
    "/career": [
      { title: "Կարիերա", items: [{ name: "EvocaLife", path: "/career/EvocaLife" }, { name: "Աշխատանք", path: "/career/work" }] }
    ]
  };

  const currentSecondaryMenu = secondaryMenus[getBaseFolder()] || [];
  // Ստուգում ենք՝ արդյոք պետք է ցուցադրել երկրորդական մենյուն (Նորությունների և Բլոգի դեպքում՝ ոչ)
  const showSecondaryNav = currentSecondaryMenu.length > 0;

  return (
    <header className="w-full flex flex-col bg-white sticky top-0 z-[100] shadow-sm antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap');
        header, .burger-menu { font-family: 'Montserrat', sans-serif; }
      `}</style>

      {/* --- TOP NAV --- */}
      <div className="hidden xl:flex w-full h-10 border-b border-gray-100 bg-[#f8f9fb] justify-center">
        <div className="w-full max-w-[1450px] px-6 flex items-center justify-between">
          <div className="flex items-center h-full space-x-6">
            {topNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-semibold transition-all h-full flex items-center relative uppercase tracking-wider ${
                  getBaseFolder() === (link.path.includes("/") ? "/" + link.path.split("/")[1] : link.path) 
                  ? "text-[#6610f2]" : "text-gray-400 hover:text-[#6610f2]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
             {['AM', 'EN', 'RU'].map((lang) => (
                <button key={lang} onClick={() => changeLanguage(lang.toLowerCase())} className={`text-[10px] font-bold ${i18n.language === lang.toLowerCase() ? 'text-[#6610f2]' : 'text-gray-400'}`}>
                  {lang}
                </button>
             ))}
          </div>
        </div>
      </div>

      {/* --- MAIN NAV --- */}
      <div className={`w-full bg-white relative z-[120] flex flex-col items-center ${!showSecondaryNav ? 'h-20 justify-center' : ''}`}>
        <div className="w-full max-w-[1450px] h-16 lg:h-20 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link to="/">
              <img className="w-[100px]" src="https://www.meridianexpo.am/wp-content/uploads/2019/03/logo_gray.png" alt="Logo" />
            </Link>
            {showSecondaryNav && (
              <nav className="hidden lg:flex items-center space-x-8">
                {currentSecondaryMenu.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-[13px] uppercase transition-all tracking-tight font-semibold ${
                      location.pathname === item.path ? 'text-[#6610f2]' : 'text-gray-400 hover:text-[#6610f2]'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleMenu} className={`p-2 z-[130] transition-colors ${isOpen ? 'text-white' : 'text-[#1a1a1a]'}`}>
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- BURGER MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-[#6610f2] z-[110] flex overflow-hidden burger-menu"
          >
            <div className="relative hidden lg:flex w-[400px] h-full bg-[#1a1a1a] flex-col justify-center px-16 space-y-6">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src="https://evoca.am/static/media/statue.7e974e1e.png" className="h-full object-cover grayscale" alt="" />
                </div>
                {topNavLinks.map((link) => (
                    <div key={link.name} onMouseEnter={() => setActiveTab(link.path.includes("/") ? "/" + link.path.split("/")[1] : link.path)} className="relative cursor-pointer group">
                        <span className={`text-2xl font-semibold transition-all uppercase tracking-tighter ${activeTab === (link.path.includes("/") ? "/" + link.path.split("/")[1] : link.path) ? "text-[#6610f2]" : "text-white/80 group-hover:text-white"}`}>
                            {link.name}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex-1 h-full overflow-y-auto pt-32 pb-12 px-12 lg:px-24">
                <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                    {burgerContent[activeTab]?.map((section, idx) => (
                        <motion.div key={section.title + activeTab} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                            <h3 className="text-white text-xl font-semibold mb-4 uppercase tracking-tighter border-b border-white/20 pb-2">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.items.map((item: any) => (
                                    <li key={item.name}>
                                        <Link to={item.path} className="text-white/70 hover:text-white text-[15px] font-medium block transition-colors uppercase">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                    {(activeTab === "/norutyunner" || activeTab === "/blog" || activeTab === "/instant-payments") && (
                        <div className="col-span-full">
                            <h3 className="text-white text-4xl font-semibold uppercase italic">
                                {topNavLinks.find(l => l.path.includes(activeTab))?.name}
                            </h3>
                        </div>
                    )}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
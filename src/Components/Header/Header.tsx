import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Search, Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("/"); 
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
    if (!isOpen) setActiveTab(getBaseFolder());
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getBaseFolder = () => {
    const path = location.pathname;
    if (path.startsWith("/business")) return "/business";
    if (path.startsWith("/career")) return "/career";
    if (path.startsWith("/about")) return "/about";
    return "/";
  };

  const topNavLinks = [
    { name: t('nav.personal'), path: "/" },
    { name: t('nav.business'), path: "/business" },
    { name: t('nav.instant_payments'), path: "/instant-payments" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.news'), path: "/news" },
    { name: t('nav.blog'), path: "/blog" },
    { name: t('nav.career'), path: "/career" },
  ];

  // HEADER-Ի ՀԻՄՆԱԿԱՆ ԲԱԺԻՆՆԵՐԸ (HIN TESQY)
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

  // BURGER MENU-Ի ԼՐԱՑՎԱԾ ՏՎՅԱԼՆԵՐԸ (NUYN DZEV INCHPES NKARUM)
  const burgerContent: Record<string, any[]> = {
    "/": [
      {
        title: "Վարկեր",
        items: [
          { name: "Վարկեր", path: "/personal-loans" },
          { name: "Վարկային պատմություն և սքոր", path: "/score" },
          { name: "Կարևոր տեղեկատվություն", path: "/info" }
        ]
      },
      {
        title: "Քարտեր",
        items: [
          { name: "Քարտեր", path: "/cards" },
          { name: "Քարտերի տրամադրում և սպասարկում", path: "/cards-service" },
          { name: "Սոցիալական փաթեթի քարտեր", path: "/soc-cards" },
          { name: "Evoca Benefits", path: "/benefits" }
        ]
      },
      {
        title: "Ավանդներ",
        items: [
          { name: "Ավանդներ", path: "/deposits" },
          { name: "Կարևոր տեղեկատվություն", path: "/dep-info" }
        ]
      },
      {
        title: "Հաշիվներ",
        items: [
          { name: "Հաշիվների բացում և սպասարկում", path: "/accounts" },
          { name: "Առարկայազուրկ մետաղական հաշիվներ", path: "/gold" },
          { name: "Ոչ ռեզիդենտների սպասարկում", path: "/non-resident" }
        ]
      },
      {
        title: "Արժեթղթեր",
        items: [
          { name: "Ներդրումային ծառայություններ", path: "/invest" },
          { name: "Պարտատոմսեր", path: "/bonds" },
          { name: "EvocaINVEST", path: "/evocainvest" }
        ]
      },
      {
        title: "Փոխանցումներ",
        items: [
          { name: "Դրամական փոխանցումներ", path: "/transfers" },
          { name: "Վճարային համակարգեր", path: "/payment-systems" }
        ]
      }
    ],
    "/business": [
      {
        title: "Վարկեր",
        items: [
          { name: "Վարկեր բիզնեսին", path: "/business/loans" },
          { name: "Լիզինգ", path: "/business/leasing" },
          { name: "Գյուղատնտեսական վարկեր", path: "/business/agri" }
        ]
      },
      {
        title: "Հաշիվներ",
        items: [
          { name: "Հաշիվների բացում և սպասարկում", path: "/business/accounts" },
          { name: "Առևտրային ֆինանսավորում", path: "/business/trade" }
        ]
      },
      {
        title: "Թվային բիզնես",
        items: [
          { name: "vPOS", path: "/business/vpos" },
          { name: "Evoca Business հավելված", path: "/business/app" }
        ]
      }
    ],
    "/about": [
      {
        title: "Բանկի մասին",
        items: [
          { name: "Մեր մասին", path: "/about/about" },
          { name: "Սակագներ", path: "/about/sakagin" },
          { name: "Հայտարարություններ", path: "/about/hayter" }
        ]
      }
    ],
    "/career": [
      {
        title: "Կարիերա",
        items: [
          { name: "EvocaLife", path: "/career/EvocaLife" },
          { name: "Աշխատանք", path: "/career/work" }
        ]
      }
    ]
  };

  const currentSecondaryMenu = secondaryMenus[getBaseFolder()] || [];

  return (
    <header className="w-full flex flex-col bg-white sticky top-0 z-[100] shadow-sm font-sans">
      {/* --- TOP NAV --- */}
      <div className="hidden xl:flex w-full h-10 border-b border-gray-100 bg-[#f8f9fb] justify-center">
        <div className="w-full max-w-[1450px] px-6 flex items-center justify-between">
          <div className="flex items-center h-full space-x-6">
            {topNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-[700] transition-all h-full flex items-center relative uppercase tracking-tighter ${
                  getBaseFolder() === link.path ? "text-[#6610f2]" : "text-gray-400 hover:text-[#6610f2]"
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
      <div className="w-full h-16 lg:h-20 bg-white relative z-[120] flex justify-center">
        <div className="w-full max-w-[1450px] px-6 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link to="/">
              <img className="w-[100px]" src="https://www.meridianexpo.am/wp-content/uploads/2019/03/logo_gray.png" alt="Logo" />
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
            <button className="hidden sm:block px-7 py-2 rounded-full font-black text-[12px] uppercase bg-[#6610f2] text-white">
              {t('common.login')}
            </button>
            <button onClick={toggleMenu} className={`p-2 z-[130] transition-colors ${isOpen ? 'text-white' : 'text-[#1a1a1a]'}`}>
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- BURGER MENU (Screenshot 2026-05-03 at 03.53.45.jpg-i nman) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-[#6610f2] z-[110] flex overflow-hidden"
          >
            {/* Left Sidebar */}
            <div className="relative hidden lg:flex w-[400px] h-full bg-[#1a1a1a] flex-col justify-center px-16 space-y-6">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src="https://evoca.am/static/media/statue.7e974e1e.png" className="h-full object-cover grayscale" alt="" />
                </div>
                {topNavLinks.map((link) => (
                    <div 
                      key={link.name} 
                      onMouseEnter={() => setActiveTab(link.path)}
                      className="relative cursor-pointer group"
                    >
                        <span className={`text-2xl font-black transition-all uppercase italic tracking-tighter ${activeTab === link.path ? "text-[#6610f2]" : "text-white/80 group-hover:text-white"}`}>
                            {link.name}
                        </span>
                        {activeTab === link.path && (
                            <motion.div layoutId="activeArrow" className="absolute -right-16 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[15px] border-y-transparent border-r-[20px] border-r-[#6610f2]" />
                        )}
                    </div>
                ))}
            </div>

            {/* Right Panel */}
            <div className="flex-1 h-full overflow-y-auto pt-32 pb-12 px-12 lg:px-24">
                <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                    {burgerContent[activeTab]?.map((section, idx) => (
                        <motion.div key={section.title + activeTab} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                            <h3 className="text-white text-2xl font-black mb-4 uppercase italic tracking-tighter border-b border-white/20 pb-2">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.items.map((item: any) => (
                                    <li key={item.name}>
                                        <Link to={item.path} className="text-white/70 hover:text-white text-[15px] font-bold block transition-colors">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
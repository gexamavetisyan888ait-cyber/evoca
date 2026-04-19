import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Globe, Search, Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // 1. Ամենավերևի անփոփոխ տողը (Tabs)
  const topNavLinks = [
    { name: "Անհատ", path: "/" },
    { name: "Բիզնես", path: "/business" },
    { name: "Ակնթարթային վճարումներ", path: "/instant-payments" },
    { name: "Մեր մասին", path: "/about" },
    { name: "Նորություններ", path: "/news" },
    { name: "Բլոգ", path: "/blog" },
    { name: "Կարիերա", path: "/career" },
  ];

  // 2. Տվյալների բազա 2-րդ տողի համար՝ կախված վերևի ընտրությունից
  const secondaryMenus: Record<string, { name: string, path: string }[]> = {
    "/": [ // Անհատ
      { name: "Վարկեր", path: "/loans" },
      { name: "Քարտեր", path: "/cards" },
      { name: "Ավանդներ", path: "/deposits" },
      { name: "Հաշիվներ", path: "/accounts" },
      { name: "Փոխանցումներ", path: "/transfers" },
      { name: "Արժեթղթեր", path: "/securities" },
      { name: "EvocaSALARY", path: "/salary" },
      { name: "EvocaTOUCH", path: "/touch" }
    ],
    "/business": [ // Բիզնես
      { name: "Վարկեր", path: "/business/loans" },
      { name: "Լիզինգ", path: "/business/leasing" },
      { name: "Հաշիվներ", path: "/business/accounts" },
      { name: "Ավանդներ", path: "/business/deposits" },
      { name: "Արժեթղթի շուկա", path: "/business/securities" },
      { name: "Առևտրի ֆինանսավորում", path: "/business/trade-finance" },
      { name: "Digital", path: "/business/digital" },
      { name: "Այլ", path: "/business/other" }
    ],
    "/about": [ // Մեր մասին
      { name: "Evoca-ի մասին", path: "/about/info" },
      { name: "Սակագներ", path: "/about/tariffs" },
      { name: "Հաշվետվություն", path: "/about/reports" },
      { name: "Հայտարարություններ", path: "/about/announcements" }
    ],
    "/career": [ // Կարիերա
      { name: "EvocaLife", path: "/career/life" },
      { name: "Աշխատանք և պրակտիկա", path: "/career/jobs" }
    ],
    // Նորություններ և Բլոգ բաժինների համար դատարկ ենք թողնում կամ հատուկ տարբերակ
    "/news": [],
    "/blog": [],
    "/instant-payments": []
  };

  // Որոշում ենք, թե որ ճյուղի մեջ է օգտատերը հիմա
  const currentTopPath = topNavLinks.find(link => 
    link.path === "/" ? location.pathname === "/" : location.pathname.startsWith(link.path)
  )?.path || "/";

  const currentSecondaryMenu = secondaryMenus[currentTopPath] || [];

  return (
    <header className="w-full flex flex-col bg-white sticky top-0 z-50 shadow-sm font-sans">
      
      {/* --- 1. TOP NAVIGATION (Անփոփոխ տող) --- */}
      <div className="hidden xl:flex w-full h-10 border-b border-gray-100 px-4 xl:px-20 items-center justify-between bg-[#f8f9fb]">
        <div className="flex items-center h-full space-x-6">
          {topNavLinks.map((link) => {
            const isActive = currentTopPath === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[12px] font-bold transition-all h-full flex items-center relative whitespace-nowrap uppercase tracking-tight ${
                  isActive ? "text-[#6610f2]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {link.name}
                {isActive && (
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-[#6610f2]" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-6 text-gray-400">
          <div className="flex items-center space-x-4 border-r pr-4 border-gray-200 text-[12px] font-bold">
            <MapPin size={16} className="cursor-pointer hover:text-[#6610f2]" />
            <Globe size={16} className="cursor-pointer hover:text-[#6610f2]" />
            <Search size={16} className="cursor-pointer hover:text-[#6610f2]" />
          </div>
          <span className="text-[#6610f2] text-[12px] font-black cursor-pointer uppercase tracking-widest">EvocaONLINE</span>
        </div>
      </div>

      {/* --- 2. MAIN NAVIGATION (Այս տողը փոխվում է ամբողջությամբ) --- */}
      <div className="w-full h-20 px-4 xl:px-20 flex items-center justify-between bg-white relative z-50">
        <div className="flex items-center space-x-4 lg:space-x-12 h-full">
          <Link to="/" className="flex items-center">
            <span className="text-[28px] lg:text-[34px] font-black tracking-tighter text-[#4d4d4d]">
              evoca
            </span>
          </Link>

          {/* Desktop - Դինամիկ փոխվող մենյու */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8 h-full">
            {currentSecondaryMenu.length > 0 ? (
              currentSecondaryMenu.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`text-[13px] xl:text-[14px] font-black transition-colors uppercase whitespace-nowrap ${
                    location.pathname === item.path ? 'text-[#6610f2]' : 'text-[#1a1a1a] hover:text-[#6610f2]'
                  }`}
                >
                  {item.name}
                </Link>
              ))
            ) : (
              // Եթե Բլոգ կամ Նորություններ բաժնում ենք և երկրորդ տող չկա
              <div className="text-gray-300 text-[13px] font-bold uppercase tracking-widest">
                {currentTopPath === "/news" ? "Նորություններ" : currentTopPath === "/blog" ? "Բլոգ" : ""}
              </div>
            )}
          </nav>
        </div>

        <div className="flex items-center">
          <button className="bg-[#6610f2] hover:bg-[#520dc2] text-white px-8 py-2.5 rounded-full font-black text-[13px] transition-all shadow-lg shadow-purple-100 uppercase tracking-wider">
            Մուտք
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
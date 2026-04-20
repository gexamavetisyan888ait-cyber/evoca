import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Globe, Search } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

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
      { name: "EvocaSALARY", path: "/salary" },
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
    
    // Եթե հասցեն սկսվում է սրանցով, ուրեմն մենք "Անհատ" (/) բաժնում ենք
    const personalPaths = ["/personal-loans", "/deposits", "/cards", "/accounts", "/deposit"];
    if (path === "/" || personalPaths.some(p => path.startsWith(p))) return "/";
    
    // Եթե սկսվում է business-ով կամ loan-ով, ուրեմն "Բիզնես" բաժնում ենք
    if (path.startsWith("/business") || path.startsWith("/loan")) return "/business";
    
    const found = topNavLinks.find(link => link.path !== "/" && path.startsWith(link.path));
    return found ? found.path : "/";
  };

  const currentTopPath = getCurrentTopPath();
  const currentSecondaryMenu = secondaryMenus[currentTopPath] || [];

  return (
    <header className="w-full flex flex-col bg-white sticky top-0 z-50 shadow-sm font-sans">
      {/* Upper Bar */}
      <div className="hidden xl:flex w-full h-10 border-b border-gray-100 px-20 items-center justify-between bg-[#f8f9fb]">
        <div className="flex items-center h-full space-x-6">
          {topNavLinks.map((link) => {
            const isActive = currentTopPath === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-[800] transition-all h-full flex items-center relative uppercase tracking-tighter ${
                  isActive ? "text-[#6610f2]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {link.name}
                {isActive && <div className="absolute top-0 left-0 w-full h-[3px] bg-[#6610f2]" />}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center space-x-6 text-gray-400">
          <div className="flex items-center space-x-4 border-r pr-4 border-gray-200">
            <MapPin size={16} /> <Globe size={16} /> <Search size={16} />
          </div>
          <span className="text-[#6610f2] text-[11px] font-black uppercase tracking-widest">EvocaONLINE</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="w-full h-20 px-4 xl:px-20 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-12 h-full">
          <Link to="/" className="text-[34px] font-[900] tracking-tighter text-[#4d4d4d]">evoca</Link>
          <nav className="hidden lg:flex items-center space-x-8 h-full">
            {currentSecondaryMenu.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-[14px] font-[900] transition-colors uppercase whitespace-nowrap ${
                  location.pathname === item.path ? 'text-[#6610f2]' : 'text-[#1a1a1a] hover:text-[#6610f2]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <button className="bg-[#6610f2] text-white px-8 py-2.5 rounded-full font-black text-[13px] hover:bg-[#520dc2] transition-all uppercase">
          Մուտք
        </button>
      </div>
    </header>
  );
};

export default Header;
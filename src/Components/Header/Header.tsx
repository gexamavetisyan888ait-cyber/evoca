import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, HelpCircle, Globe, Search, Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const mainCategories = [
    "Վարկեր", "Քարտեր", "Ավանդներ", "Հաշիվներ", 
    "Փոխանցումներ", "Արժեթղթեր", "EvocaSALARY", "EvocaTOUCH"
  ];

  return (
    <header className="w-full flex flex-col bg-white sticky top-0 z-50 shadow-sm font-sans">
      
      {/* --- TOP NAVIGATION (Hidden on Mobile/Tablet) --- */}
      <div className="hidden xl:flex w-full h-10 border-b border-gray-100 px-4 xl:px-20 items-center justify-between">
        <div className="flex items-center h-full space-x-6">
          {topNavLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[12px] font-medium transition-all h-full flex items-center relative whitespace-nowrap ${
                  isActive 
                  ? "text-[#6610f2] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-[3px] after:bg-[#6610f2]" 
                  : "text-gray-500 hover:text-[#6610f2]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-6 text-gray-500">
          <div className="flex items-center cursor-pointer hover:text-[#6610f2] text-[12px] font-medium group">
            <span className="text-[#6610f2]">Առցանց հայտեր</span>
            <ChevronDown size={14} className="ml-1 text-[#6610f2] group-hover:rotate-180 transition-transform" />
          </div>
          <div className="flex items-center cursor-pointer text-[#6610f2] text-[12px] font-bold group">
            <span>Հետադարձ կապ</span>
            <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform" />
          </div>
          
          <div className="flex items-center space-x-4 border-l pl-4 border-gray-200 ml-2">
            <MapPin size={16} className="cursor-pointer hover:text-[#6610f2]" />
            <HelpCircle size={16} className="cursor-pointer hover:text-[#6610f2]" />
            <Globe size={16} className="cursor-pointer hover:text-[#6610f2]" />
            <Search size={16} className="cursor-pointer hover:text-[#6610f2]" />
          </div>
        </div>
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <div className="w-full h-16 lg:h-20 px-4 xl:px-20 flex items-center justify-between bg-white relative z-50">
        <div className="flex items-center space-x-4 lg:space-x-12">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-[28px] lg:text-[34px] font-black tracking-tighter text-[#4d4d4d]">
              evoca
            </span>
          </Link>

          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {mainCategories.map((cat) => (
              <a 
                key={cat} 
                href="#" 
                className="text-[13px] xl:text-[14px] font-bold text-[#1a1a1a] hover:text-[#6610f2] transition-colors whitespace-nowrap"
              >
                {cat}
              </a>
            ))}
          </nav>
        </div>

        {/* Action Button & Search (Search visible on mobile) */}
        <div className="flex items-center space-x-4">
          <Search size={20} className="lg:hidden text-gray-600 cursor-pointer" />
          <button className="bg-[#6610f2] hover:bg-[#520dc2] text-white px-5 lg:px-8 py-2 lg:py-2.5 rounded-full font-bold text-[13px] lg:text-[14px] transition-all shadow-md whitespace-nowrap">
            <span className="hidden sm:inline">EvocaONLINE</span>
            <span className="sm:hidden">ONLINE</span>
          </button>
        </div>
      </div>

      {/* --- MOBILE OVERLAY MENU --- */}
      <div className={`fixed inset-0 bg-white z-40 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden pt-20 overflow-y-auto`}>
        <div className="px-6 py-4 flex flex-col space-y-6">
          {/* Top Links inside mobile menu */}
          <div className="grid grid-cols-2 gap-4 border-b pb-6 border-gray-100">
            {topNavLinks.slice(0, 2).map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-center py-2 rounded-lg font-bold ${location.pathname === link.path ? 'bg-[#6610f2] text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Main Categories Mobile */}
          <nav className="flex flex-col space-y-5">
            {mainCategories.map((cat) => (
              <a 
                key={cat} 
                href="#" 
                className="text-lg font-bold text-[#1a1a1a] hover:text-[#6610f2] flex justify-between items-center"
              >
                {cat}
                <ChevronDown size={18} className="-rotate-90 text-gray-400" />
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-gray-100 flex flex-col space-y-4 text-gray-600 font-medium">
            <a href="#" className="flex items-center space-x-3"><MapPin size={20}/> <span>Մասնաճյուղեր և բանկոմատներ</span></a>
            <a href="#" className="flex items-center space-x-3"><Globe size={20}/> <span>Հայերեն</span></a>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
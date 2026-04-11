import React from 'react';
import { MapPin, HelpCircle, Globe, Search, Menu, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  // Verevi menyui tvyalnery
  const topNavLinks = [
    { name: "Անհատ", active: false },
    { name: "Բիզնես", active: true },
    { name: "Ակնթարթային վճարումներ", active: false },
    { name: "Մեր մասին", active: false },
    { name: "Նորություններ", active: false },
    { name: "Բլոգ", active: false },
    { name: "Կարիերա", active: false },
  ];

  // Glxavor menyui tvyalnery
  const mainCategories = [
    "Վարկեր", "Լիզինգ", "Հաշիվներ", "Ավանդներ", 
    "Արժեթղթերի շուկա", "Առևտրի ֆինանսավորում", "Դիջիթալ", "Այլ"
  ];

  return (
    <header className="w-full flex flex-col bg-white font-sans">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <div className="w-full h-11 border-b border-gray-100 px-4 md:px-10 flex items-center justify-between">
        <div className="flex items-center h-full space-x-6">
          {topNavLinks.map((link) => (
            <a
              key={link.name}
              href="#"
              className={`text-[13px] font-medium transition-all h-full flex items-center relative ${
                link.active 
                ? "text-[#6610f2] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-[2px] after:bg-[#6610f2]" 
                : "text-gray-600 hover:text-[#6610f2]"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-5 text-gray-600">
          <div className="flex items-center cursor-pointer hover:text-[#6610f2] text-[13px] font-medium group">
            <span>Առցանց հայտեր</span>
            <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform" />
          </div>
          <div className="flex items-center cursor-pointer text-[#6610f2] text-[13px] font-bold group">
            <span>Հետադարձ կապ</span>
            <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform" />
          </div>
          
          <div className="flex items-center space-x-4 border-l pl-4 border-gray-200">
            <MapPin size={18} className="cursor-pointer hover:text-[#6610f2]" />
            <HelpCircle size={18} className="cursor-pointer hover:text-[#6610f2]" />
            <Globe size={18} className="cursor-pointer hover:text-[#6610f2]" />
            <Search size={18} className="cursor-pointer hover:text-[#6610f2]" />
            <Menu size={18} className="cursor-pointer hover:text-[#6610f2]" />
          </div>
        </div>
      </div>

      {/* --- MAIN NAVIGATION BAR --- */}
      <div className="w-full h-20 px-4 md:px-10 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center space-x-10">
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer">
            <span className="text-[32px] font-black tracking-tighter text-[#4d4d4d]">
              evoca
            </span>
            {/* Ete loxon nkarov es dnelu, ogtagortsir սա՝ <img src="/logo.svg" className="h-8" alt="Evoca" /> */}
          </div>

          {/* Categories */}
          <nav className="hidden xl:flex items-center space-x-7">
            {mainCategories.map((cat) => (
              <a 
                key={cat} 
                href="#" 
                className={`text-[15px] font-bold transition-colors whitespace-nowrap ${
                  cat === "Այլ" ? "text-[#6610f2]" : "text-[#1a1a1a] hover:text-[#6610f2]"
                }`}
              >
                {cat}
              </a>
            ))}
          </nav>
        </div>

        {/* Action Button */}
        <div className="flex items-center">
          <button className="bg-[#6610f2] hover:bg-[#520dc2] text-white px-9 py-2.5 rounded-full font-bold text-[15px] transition-all shadow-[0_4px_15px_rgba(102,16,242,0.3)] active:scale-95">
            EvocaONLINE
          </button>
        </div>
      </div>

    </header>
  );
};

export default Header;
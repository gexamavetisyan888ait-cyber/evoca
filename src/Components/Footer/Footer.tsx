import React from 'react';
import {  Send } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f8f9fa] pt-20 pb-10 px-6 lg:px-12 font-sans border-t border-gray-100">
      <div className="max-w-[1450px] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          <div className="lg:col-span-3">
            <div className="mb-8 flex items-baseline">
              <span className="text-[32px] font-[1000] tracking-tighter text-[#1a1a1a] italic uppercase">evoca</span>
              <span className="text-[11px] font-black text-gray-400 ml-1 uppercase tracking-[0.2em]">bank</span>
            </div>
            <div className="text-[14px] text-[#4d4d4d] leading-relaxed font-medium space-y-1">
              <p>ք. Երևան, 0010,</p>
              <p>Հանրապետության 44/2</p>
              <div className="pt-8">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                  1990 - {currentYear} © ԲՈԼՈՐ ԻՐԱՎՈՒՆՔՆԵՐԸ ՊԱՇՏՊԱՆՎԱԾ ԵՆ
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-[900] italic uppercase text-[#1a1a1a] text-[14px] mb-8 tracking-tighter">Բանկի մասին</h4>
            <ul className="space-y-4 text-[14px] text-gray-500 font-medium">
              <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Մեր մասին</li>
              <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Ղեկավարություն</li>
              <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Սակագներ</li>
              <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Թափուր աշխատատեղեր</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-[900] italic uppercase text-[#1a1a1a] text-[14px] mb-8 tracking-tighter">Օգտակար հղումներ</h4>
            <ul className="space-y-4 text-[14px] text-gray-500 font-medium">
              <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Կարգավորում</li>
              <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Գաղտնիություն</li>
              <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Անվտանգություն</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-[900] italic uppercase text-[#1a1a1a] text-[14px] mb-8 tracking-tighter">Այլ հղումներ</h4>
            <ul className="space-y-4 text-[14px] text-gray-500 font-medium">
              <li className="hover:text-[#6610f2] cursor-pointer transition-colors">EvocaTOUCH</li>
              <li className="hover:text-[#6610f2] cursor-pointer transition-colors">EvocaONLINE</li>
              <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Հետադարձ կապ</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-[#6610f2] font-black text-[12px] uppercase tracking-widest mb-1">Կապ մեզ հետ</span>
                <a href="tel:+37410605555" className="text-[20px] font-black text-[#1a1a1a] hover:text-[#6610f2] transition-colors">+374 10 605555</a>
                <a href="tel:8444" className="text-[32px] font-[1000] text-[#1a1a1a] leading-none mt-1 italic tracking-tighter">8444</a>
              </div>

              <div className="flex gap-3 pt-4">
                <div className="h-10 w-28 bg-black rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                  <span className="text-white text-[10px] font-bold">App Store</span>
                </div>
                <div className="h-10 w-28 bg-black rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                  <span className="text-white text-[10px] font-bold">Google Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <Send size={20} strokeWidth={1.5} />
          <div className="flex items-center gap-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-4 opacity-40 grayscale hover:grayscale-0 transition-all"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-6 opacity-40 grayscale hover:grayscale-0 transition-all"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b2/ArCa_logo.svg"
              alt="ArCa"
              className="h-5 opacity-40 grayscale hover:grayscale-0 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-[100]">
        <button className="bg-[#6610f2] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(102,16,242,0.4)] hover:scale-110 transition-transform active:scale-95">
          <Send size={24} className="rotate-[-20deg] mr-1" />
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,900;1,900&display=swap');
        .font-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </footer>
  );
};

export default Footer;
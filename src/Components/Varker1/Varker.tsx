import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, ChevronRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Բանկի մասին",
      links: [
        { name: "Մեր մասին", path: "/about" },
        { name: "Կարիերա", path: "/career" },
        { name: "Նորություններ", path: "/news" },
        { name: "Հետադարձ կապ", path: "/contact" }
      ]
    },
    {
      title: "Ծառայություններ",
      links: [
        { name: "Վարկեր", path: "/personal-loans" },
        { name: "Քարտեր", path: "/cards" },
        { name: "Ավանդներ", path: "/deposits" },
        { name: "Փոխանցումներ", path: "/transfers" }
      ]
    },
    {
      title: "Իրավական",
      links: [
        { name: "Սակագներ", path: "/tariffs" },
        { name: "Պայմաններ", path: "/terms" },
        { name: "Գաղտնիություն", path: "/privacy" },
        { name: "Անվտանգություն", path: "/security" }
      ]
    }
  ];


  return (
    <footer className="w-full bg-[#f8f9fb] pt-20 pb-10 font-sans text-[#1a1a1a]">
      <div className="max-w-[1450px] mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/">
              <img 
                src="https://www.meridianexpo.am/wp-content/uploads/2019/03/logo_gray.png" 
                alt="Logo" 
                className="w-[180px] opacity-80"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm italic font-medium">
              Evocabank-ը մատուցում է արագ, պարզ և նորարարական ծառայություններ և աշխատում է mobile-first ձևաչափով:
            </p>
            <div className="flex gap-4">
         
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#1a1a1a]">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-[#6610f2] text-[13px] font-bold transition-colors flex items-center group uppercase tracking-tighter italic"
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-t border-b border-gray-200/60 mb-10">
          <div className="flex items-center gap-4 text-gray-400 group cursor-pointer">
            <div className="p-3 rounded-2xl bg-white border border-gray-100 group-hover:text-[#6610f2] transition-colors">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest">Զանգահարեք մեզ</p>
              <p className="text-sm font-black text-[#1a1a1a] tracking-tight">+374 10 271111</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400 group cursor-pointer">
            <div className="p-3 rounded-2xl bg-white border border-gray-100 group-hover:text-[#6610f2] transition-colors">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest">Էլ. հասցե</p>
              <p className="text-sm font-black text-[#1a1a1a] tracking-tight">info@evocabank.am</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400 group cursor-pointer">
            <div className="p-3 rounded-2xl bg-white border border-gray-100 group-hover:text-[#6610f2] transition-colors">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest">Գլխամասային գրասենյակ</p>
              <p className="text-sm font-black text-[#1a1a1a] tracking-tight">Հանրապետության 44/2, Երևան</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:row justify-between items-center gap-6 text-gray-400 text-[11px] font-bold uppercase tracking-widest">
          <p>© {currentYear} «ԷՎՈԿԱԲԱՆԿ» ՓԲԸ: Բոլոր իրավունքները պաշտպանված են:</p>
          <div className="flex gap-8">
            <span className="hover:text-[#6610f2] cursor-pointer transition-colors">Կայքի քարտեզ</span>
            <span className="hover:text-[#6610f2] cursor-pointer transition-colors">Անվտանգություն</span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;0,900;1,700;1,900&display=swap');
        footer { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </footer>
  );
};

export default Footer;
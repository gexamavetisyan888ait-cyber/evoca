// import React from 'react';
// // Srpaneri importy misht amenavereum
// import { Facebook, Instagram, Youtube, Linkedin, Twitter, MessageCircle } from 'lucide-react';

// const Footer: React.FC = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="w-full bg-[#f8f9fa] pt-16 pb-8 px-4 xl:px-20 font-sans border-t border-gray-200 mt-auto">
//       <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
//         {/* Loxon ev Hasce-n */}
//         <div className="lg:col-span-1">
//           <div className="mb-6 flex items-baseline">
//             <span className="text-[28px] font-black tracking-tighter text-[#4d4d4d]">evoca</span>
//             <span className="text-[12px] font-bold text-gray-400 ml-1 uppercase tracking-widest">Bank</span>
//           </div>
//           <div className="text-[14px] text-gray-600 space-y-4 font-medium">
//             <p>ք. Երևան, 0010,<br />Հանրապետության 44/2</p>
//             <p className="text-[12px] text-gray-400">
//               1990 - {currentYear}, © ԲՈԼՈՐ ԻՐԱՎՈՒՆՔՆԵՐԸ ՊԱՇՏՊԱՆՎԱԾ ԵՆ
//             </p>
//           </div>
//         </div>

//         {/* Syun 2: Banaki masin */}
//         <div>
//           <h4 className="font-bold text-[#1a1a1a] text-[15px] mb-6">Բանկի մասին</h4>
//           <ul className="space-y-3 text-[14px] text-gray-500">
//             <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Մեր մասին</li>
//             <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Ղեկավարություն</li>
//             <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Սակագներ</li>
//           </ul>
//         </div>

//         {/* Syun 3: Oktaqar hxumner */}
//         <div>
//           <h4 className="font-bold text-[#1a1a1a] text-[15px] mb-6">Օգտակար հղումներ</h4>
//           <ul className="space-y-3 text-[14px] text-gray-500">
//             <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Կարգավորում</li>
//             <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Գաղտնիություն</li>
//           </ul>
//         </div>

//         {/* Syun 4: Ayl hxumner */}
//         <div>
//           <h4 className="font-bold text-[#1a1a1a] text-[15px] mb-6">Այլ հղումներ</h4>
//           <ul className="space-y-3 text-[14px] text-gray-500">
//             <li className="hover:text-[#6610f2] cursor-pointer transition-colors">EvocaONLINE</li>
//             <li className="hover:text-[#6610f2] cursor-pointer transition-colors">Հետադարձ կապ</li>
//           </ul>
//         </div>

//         {/* Syun 5: Sots. cancer u Kap */}
//         <div className="flex flex-col space-y-6">
//           <div className="flex space-x-4 text-gray-400">
//             <Facebook size={20} className="hover:text-[#6610f2] cursor-pointer transition-colors" />
//             <Instagram size={20} className="hover:text-[#6610f2] cursor-pointer transition-colors" />
//             <Linkedin size={20} className="hover:text-[#6610f2] cursor-pointer transition-colors" />
//             <Youtube size={20} className="hover:text-[#6610f2] cursor-pointer transition-colors" />
//           </div>
//           <div className="pt-4 space-y-2 text-[#6610f2] font-bold">
//             <p className="text-[14px] hover:underline cursor-pointer">Կապ մեզ հետ</p>
//             <p className="text-[#1a1a1a] text-[18px]">+374 10 605555</p>
//             <p className="text-[24px] font-black cursor-pointer">8444</p>
//           </div>
//         </div>
//       </div>

//       {/* Chat Icon-y misht verevum */}
//       <div className="fixed bottom-6 right-6 bg-[#6610f2] p-4 rounded-full text-white shadow-2xl cursor-pointer hover:scale-110 transition-transform z-50">
//         <MessageCircle size={28} />
//       </div>
//     </footer>
//   );
// };

// export default Footer;
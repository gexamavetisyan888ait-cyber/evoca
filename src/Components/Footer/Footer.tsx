import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Floating Chat Button */}
      <a
        href="/chat"
        className="fixed bottom-8 right-8 z-[100] bg-[#662d91] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center"
      >
        <MessageCircle size={28} fill="currentColor" className="opacity-90" />
        <span className="absolute right-full mr-3 bg-white text-[#662d91] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md pointer-events-none">
          {t('footer.chat')}
        </span>
      </a>

      <footer className="bg-white pt-16 pb-8 px-4 md:px-8 border-t border-gray-100 font-sans text-[#1d1d1f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            {/* Logo and Address Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tighter italic">evoca<span className="font-light">BANK</span></h2>
              </div>
              <div className="text-[13px] leading-relaxed text-gray-500 space-y-4">
                <p>{t('footer.address')}</p>
                <p className="mt-6 italic">
                  {t('footer.central_bank_note')}
                </p>
                <p className="text-[11px] mt-4">1990 - 2026 © {t('footer.all_rights_reserved')}</p>
              </div>
            </div>

            {/* Links Column 1 */}
            <div>
              <h4 className="text-[15px] font-bold mb-6">{t('footer.about_bank.title')}</h4>
              <ul className="text-[13px] space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-black">{t('footer.about_bank.about_us')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.about_bank.management')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.about_bank.shareholders')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.about_bank.jobs')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.about_bank.legal_acts')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.about_bank.tariffs')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.about_bank.property')}</a></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4 className="text-[15px] font-bold mb-6">{t('footer.useful_links.title')}</h4>
              <ul className="text-[13px] space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-black">{t('footer.useful_links.customer_rights')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.useful_links.complaint_standards')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.useful_links.regulation')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.useful_links.privacy_policy')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.useful_links.fin_mediator')}</a></li>
              </ul>
            </div>

            {/* Links Column 3 */}
            <div>
              <h4 className="text-[15px] font-bold mb-6">{t('footer.other_links.title')}</h4>
              <ul className="text-[13px] space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-black">{t('footer.other_links.online')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.other_links.safes')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.other_links.faq')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.other_links.announcements')}</a></li>
                <li><a href="#" className="hover:text-black">{t('footer.other_links.library')}</a></li>
              </ul>
            </div>

            {/* Contact & Social Section */}
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-8" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-8" />
                </div>
                
                <div className="mt-4">
                  <a href="#" className="text-[13px] text-purple-600 font-medium hover:underline">{t('footer.contact.branches')}</a>
                </div>
                
                <div className="mt-2 text-[15px] font-bold text-purple-700">
                  <a href="tel:+37410605555" className="flex items-center gap-2">
                    <Phone size={16} /> +374 10 605555
                  </a>
                  <p className="text-[18px] mt-1">8444</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Partner Logos */}
          <div className="pt-8 border-t border-gray-50 flex flex-wrap justify-center md:justify-between items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="https://www.evoca.am/img/temp/partners/partner-6.png" alt="FinInfo" className="h-6" />
            <img src="https://www.evoca.am/img/temp/partners/partner-3.png" alt="ABC Finance" className="h-6" />
            <img src="https://www.evoca.am/img/temp/partners/partner-5-new.png" alt="ArCa" className="h-6" />
            <img src="https://www.evoca.am/img/temp/partners/partner-7.png" alt="Visa" className="h-4" />
            <img src="https://www.evoca.am/img/temp/partners/partner-1.png" alt="Mastercard" className="h-6" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
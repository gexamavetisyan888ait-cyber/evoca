import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ավելացրու սա
import { Send } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate(); // Հուքի սահմանում

  return (
    <footer className="w-full bg-[#f8f9fa] pt-20 pb-10 px-6 lg:px-12 font-sans border-t border-gray-100">
      {/* ... Մնացած կոդը նույնն է ... */}
      <div className="max-w-[1450px] mx-auto">
        {/* Footer-ի հիմնական բովանդակությունը */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
           {/* Բանկի մասին, Հղումներ և այլն */}
        </div>

        {/* Լոգոների բաժին */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            {/* Visa, Mastercard և այլն */}
          </div>
        </div>
      </div>

      {/* Փոփոխված լողացող կոճակը */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <button 
          onClick={() => navigate('/chat')} // Անցում չատի էջին
          className="bg-[#6610f2] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(102,16,242,0.4)] hover:scale-110 transition-transform active:scale-95 group"
          title="Բացել չատը"
        >
          <Send size={24} className="rotate-[-20deg] mr-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,900;1,900&display=swap');
        .font-sans { font-family: 'Montserrat', sans-serif; }
      `}`</style>
    </footer>
  );
};

export default Footer;
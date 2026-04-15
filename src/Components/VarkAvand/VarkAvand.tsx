import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CalculationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(30333);
  const [rate, setRate] = useState<number>(3);
  const [months, setMonths] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateLoan = () => {
    const monthlyRate = rate / 100 / 12;
    const payment = monthlyRate === 0 
      ? amount / months 
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalAmount = payment * months;
    const totalInterest = totalAmount - amount;

    setResult({
      monthlyPayment: payment,
      totalInterest: totalInterest,
      totalAmount: totalAmount
    });
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 bg-white flex flex-col items-center px-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-10">Հաշվիչներ</h2>
      
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div className="flex border-b mb-8">
          <button className="pb-2 px-6 border-b-2 border-purple-600 text-purple-600 font-medium">Վարկ</button>
          <button className="pb-2 px-6 text-gray-400 font-medium">Ավանդ</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Գումար */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">Վարկի գումար</label>
            <div className="relative">
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full border-b-2 border-gray-200 py-2 text-xl font-bold focus:border-purple-600 outline-none transition-colors"
              />
              <span className="absolute right-0 bottom-2 font-bold text-xl">֏</span>
            </div>
            <input 
              type="range" min="100000" max="50000000" step="100000"
              value={amount} onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 mt-4"
            />
          </div>

          {/* Ժամկետ */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">Ժամկետ</label>
            <div className="relative">
              <input 
                type="number" 
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full border-b-2 border-gray-200 py-2 text-xl font-bold focus:border-purple-600 outline-none transition-colors"
              />
              <span className="absolute right-0 bottom-2 font-bold">ամիս</span>
            </div>
            <input 
              type="range" min="1" max="120" 
              value={months} onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 mt-4"
            />
          </div>

          {/* Տոկոսադրույք */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">Տարեկան տոկոսադրույք</label>
            <div className="relative">
              <input 
                type="number" 
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full border-b-2 border-gray-200 py-2 text-xl font-bold focus:border-purple-600 outline-none transition-colors"
              />
              <span className="absolute right-0 bottom-2 font-bold">%</span>
            </div>
            <input 
              type="range" min="1" max="36" step="0.1"
              value={rate} onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 mt-4"
            />
          </div>

          {/* Մարման ձև */}
          <div className="flex flex-col justify-end">
             <label className="block text-sm text-gray-500 mb-2">Մարման ձև</label>
             <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" className="accent-purple-600 w-4 h-4" /> Զսպանակաձև
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="type" defaultChecked className="accent-purple-600 w-4 h-4" /> Անուիտետ
                </label>
             </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400 italic max-w-md">
            Բոլոր հաշվարկները կրում են մոտավոր բնույթ և չեն հանդիսանում հրապարակային առաջարկ:
          </p>
          <button 
            onClick={calculateLoan}
            className="bg-[#7d2ae8] text-white px-12 py-3 rounded-xl font-bold text-lg hover:bg-[#6a22c7] transition-all shadow-lg shadow-purple-200"
          >
            Հաշվել
          </button>
        </div>
      </div>

      {/* MODAL SECTION */}
      <AnimatePresence>
        {isModalOpen && result && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                <X size={24} />
              </button>

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Վարկային հաշվիչի արդյունքներ</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl mb-8">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Գումար</p>
                    <p className="font-bold">{amount.toLocaleString()} ֏</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Տոկոսադրույք</p>
                    <p className="font-bold">{rate}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Ժամկետ</p>
                    <p className="font-bold">{months} ամիս</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase text-purple-600">Ընդհանուր գումար</p>
                    <p className="font-bold text-purple-600">{result.totalAmount.toLocaleString(undefined, {maximumFractionDigits: 0})} ֏</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-xs text-gray-400 border-b">
                        <th className="pb-4 font-medium">Ամիս</th>
                        <th className="pb-4 font-medium">Վճարվելիք տոկոսագումար</th>
                        <th className="pb-4 font-medium">Վարկի մասնակի մարում</th>
                        <th className="pb-4 font-medium">Վարկի ամսական վճար</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="py-4">1</td>
                        <td className="py-4">{(result.totalInterest / months).toLocaleString(undefined, {maximumFractionDigits: 2})} ֏</td>
                        <td className="py-4">{(amount / months).toLocaleString(undefined, {maximumFractionDigits: 0})} ֏</td>
                        <td className="py-4 font-bold">{result.monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 2})} ֏</td>
                      </tr>
                      <tr className="bg-gray-50 font-bold">
                        <td className="py-4 italic">Ընդամենը</td>
                        <td className="py-4">{result.totalInterest.toLocaleString(undefined, {maximumFractionDigits: 2})} ֏</td>
                        <td className="py-4">{amount.toLocaleString()} ֏</td>
                        <td className="py-4 text-purple-600">{result.totalAmount.toLocaleString(undefined, {maximumFractionDigits: 2})} ֏</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LoanCalculator;
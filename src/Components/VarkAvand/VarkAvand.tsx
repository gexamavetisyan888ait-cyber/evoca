import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';

type Tab = 'loan' | 'deposit';

interface CalculationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

const EvocaCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('loan');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [amount, setAmount] = useState<number>(30333);
  const [rate, setRate] = useState<number>(3);
  const [term, setTerm] = useState<number>(1); 

  const [depositResults, setDepositResults] = useState({
    daily: 0,
    totalGross: 0,
    totalNet: 0
  });

  const [loanResult, setLoanResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    if (activeTab === 'deposit') {
      const dailyRate = rate / 100 / 365;
      const totalGross = amount * dailyRate * term;
      const tax = totalGross * 0.10; 
      const totalNet = totalGross - tax;

      setDepositResults({
        daily: amount * dailyRate,
        totalGross: totalGross,
        totalNet: totalNet
      });
    }
  }, [amount, rate, term, activeTab]);

  const handleCalculateLoan = () => {
    const monthlyRate = rate / 100 / 12;
    const payment = monthlyRate === 0 
      ? amount / term 
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    
    const totalAmount = payment * term;
    const totalInterest = totalAmount - amount;

    setLoanResult({
      monthlyPayment: payment,
      totalInterest: totalInterest,
      totalAmount: totalAmount
    });
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-white flex flex-col items-center px-4 font-sans">
      <h2 className="text-4xl font-extrabold text-[#1a1a1a] mb-12">Հաշվիչներ</h2>
      
      <div className="w-full max-w-5xl bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 md:p-12 border border-gray-50">
        
        <div className="flex mb-12 bg-gray-100 p-1.5 rounded-2xl w-fit">
          <button 
            onClick={() => { setActiveTab('loan'); setTerm(1); setAmount(30333); }}
            className={`px-12 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'loan' ? 'bg-white shadow-sm text-[#7d2ae8]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Վարկ
          </button>
          <button 
            onClick={() => { setActiveTab('deposit'); setTerm(91); setAmount(500000); }}
            className={`px-12 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'deposit' ? 'bg-white shadow-sm text-[#7d2ae8]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Ավանդ
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="space-y-12">
            <div className="group">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2 block">
                {activeTab === 'loan' ? 'Վարկի գումար' : 'Ներդրվող գումար'}
              </label>
              <div className="flex items-center border-b-2 border-gray-100 group-focus-within:border-[#7d2ae8] py-2 transition-all">
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full text-3xl font-bold outline-none bg-transparent"
                />
                <span className="text-2xl font-bold text-gray-800 ml-2">֏</span>
              </div>
              <input 
                type="range" min="10000" max="50000000" step="10000" value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full mt-6 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#7d2ae8]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold">
                <span>0</span>
                <span>50 000 000</span>
              </div>
            </div>

            <div className="group">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2 block">Տարեկան տոկոսադրույք</label>
              <div className="flex items-center border-b-2 border-gray-100 group-focus-within:border-[#7d2ae8] py-2 transition-all">
                <input 
                  type="number" 
                  value={rate} 
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full text-3xl font-bold outline-none bg-transparent"
                />
                <span className="text-2xl font-bold text-gray-800 ml-2">%</span>
              </div>
              <input 
                type="range" min="1" max="36" step="0.1" value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full mt-6 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#7d2ae8]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold">
                <span>1 %</span>
                <span>36 %</span>
              </div>
            </div>

            <div className="group">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2 block">
                {activeTab === 'loan' ? 'Ժամկետ' : 'Ավանդի ժամկետ'}
              </label>
              <div className="flex items-center border-b-2 border-gray-100 group-focus-within:border-[#7d2ae8] py-2 transition-all">
                <input 
                  type="number" 
                  value={term} 
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full text-3xl font-bold outline-none bg-transparent"
                />
                <span className="text-2xl font-bold text-gray-800 ml-2">{activeTab === 'loan' ? 'ամիս' : 'օր'}</span>
              </div>
              <input 
                type="range" 
                min={activeTab === 'loan' ? 1 : 91} 
                max={activeTab === 'loan' ? 120 : 1095} 
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full mt-6 h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#7d2ae8]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold">
                <span>{activeTab === 'loan' ? '1 ամիս' : '91 օր'}</span>
                <span>{activeTab === 'loan' ? '120 ամիս' : '1095 օր'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            {activeTab === 'deposit' ? (
              <div className="bg-[#fafafa] p-10 rounded-[32px] border border-gray-50 space-y-10">
                <div className="flex justify-between items-start border-b border-gray-200 pb-6">
                  <p className="text-sm text-gray-500 font-medium max-w-[180px]">Օրական կտրվածքով հաշվարկվող տոկոսագումար *</p>
                  <p className="text-2xl font-bold">{depositResults.daily.toLocaleString(undefined, {maximumFractionDigits: 0})} ֏</p>
                </div>
                <div className="flex justify-between items-start border-b border-gray-200 pb-6">
                  <p className="text-sm text-gray-500 font-medium max-w-[200px]">Ավանդային պայմանագրի գործողության ընթացքում հաշվարկվող ընդհանուր տոկոսային եկամուտ</p>
                  <p className="text-2xl font-bold">{depositResults.totalGross.toLocaleString(undefined, {maximumFractionDigits: 0})} ֏</p>
                </div>
                <div className="flex justify-between items-start text-[#7d2ae8]">
                  <p className="text-sm font-bold max-w-[200px]">Ավանդային պայմանագրի գործողության ընթացքում հաշվարկվող փաստացի վճարվող զուտ տոկոսային եկամուտ</p>
                  <p className="text-3xl font-black">{depositResults.totalNet.toLocaleString(undefined, {maximumFractionDigits: 0})} ֏</p>
                </div>
                <div className="flex items-start gap-3 pt-2">
                   <div className="bg-gray-200 rounded-full p-1 mt-1"><Info size={12} className="text-gray-500" /></div>
                   <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                     Ներդրված ավանդի դիմաց ստացվող տոկոսագումարները հաշվվում են 10% եկամտային հարկի չափով:
                   </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-between py-6">
                <div className="space-y-8">
                   <label className="text-xs uppercase tracking-wider text-gray-400 font-bold block">Մարման ձև</label>
                   <div className="flex gap-12">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input type="radio" name="repayment" className="peer appearance-none w-6 h-6 border-2 border-gray-200 rounded-full checked:border-[#7d2ae8] transition-all" />
                            <div className="absolute w-3 h-3 bg-[#7d2ae8] rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                        </div>
                        <span className="text-gray-700 font-bold">Զսպանակաձև</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input type="radio" name="repayment" defaultChecked className="peer appearance-none w-6 h-6 border-2 border-gray-200 rounded-full checked:border-[#7d2ae8] transition-all" />
                            <div className="absolute w-3 h-3 bg-[#7d2ae8] rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                        </div>
                        <span className="text-gray-700 font-bold">Անուիտետ</span>
                      </label>
                   </div>
                </div>
                <button 
                  onClick={handleCalculateLoan}
                  className="mt-16 bg-[#7d2ae8] text-white w-full py-5 rounded-2xl font-black text-xl hover:bg-[#6a22c7] transition-all shadow-2xl shadow-purple-200 active:scale-[0.98]"
                >
                  Հաշվել
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="mt-12 text-[11px] text-gray-400 italic font-medium">
          Բոլոր հաշվարկները կրում են մոտավոր բնույթ և չեն հանդիսանում հրապարակային առաջարկ:
        </p>
      </div>

      <AnimatePresence>
        {isModalOpen && loanResult && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden relative z-10"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
                <X size={28} />
              </button>

              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-8 text-gray-800">Վարկային հաշվիչի արդյունքներ</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 p-6 rounded-2xl mb-10">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Գումար</p>
                    <p className="font-bold text-gray-800">{amount.toLocaleString()} ֏</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Տոկոսադրույք</p>
                    <p className="font-bold text-gray-800">{rate}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Ժամկետ</p>
                    <p className="font-bold text-gray-800">{term} ամիս</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#7d2ae8] uppercase font-bold mb-1">Ընդհանուր</p>
                    <p className="font-bold text-[#7d2ae8]">{loanResult.totalAmount.toLocaleString(undefined, {maximumFractionDigits: 0})} ֏</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[11px] text-gray-400 border-b border-gray-100 uppercase font-bold">
                        <th className="pb-4">Ամիս</th>
                        <th className="pb-4">Տոկոսագումար</th>
                        <th className="pb-4">Մասնակի մարում</th>
                        <th className="pb-4 text-right">Ամսական վճար</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-bold text-gray-700">
                      <tr className="border-b border-gray-50">
                        <td className="py-5">1</td>
                        <td className="py-5">{(loanResult.totalInterest / term).toLocaleString(undefined, {maximumFractionDigits: 2})} ֏</td>
                        <td className="py-5">{(amount / term).toLocaleString(undefined, {maximumFractionDigits: 0})} ֏</td>
                        <td className="py-5 text-right font-black">{(loanResult.monthlyPayment).toLocaleString(undefined, {maximumFractionDigits: 2})} ֏</td>
                      </tr>
                      <tr className="bg-gray-50/50">
                        <td className="py-5 px-2 italic text-gray-400">Ընդամենը</td>
                        <td className="py-5">{(loanResult.totalInterest).toLocaleString(undefined, {maximumFractionDigits: 2})} ֏</td>
                        <td className="py-5">{amount.toLocaleString()} ֏</td>
                        <td className="py-5 text-right text-[#7d2ae8] font-black">{(loanResult.totalAmount).toLocaleString(undefined, {maximumFractionDigits: 2})} ֏</td>
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

export default EvocaCalculator;
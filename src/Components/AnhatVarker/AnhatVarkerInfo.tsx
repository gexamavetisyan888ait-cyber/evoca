import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { ref, get , child} from "firebase/database";
import { db } from "../../lib/firebase";



// Մոդելը
interface LoanType {
  id: number | string;
  title: string;
  description: string;
  duration: string;
  amount: string;
  rate: string;
  rateLabel: string;
  image: string;
  category: string;
}

const AnhatVarkerInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loan, setLoan] = useState<LoanType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'about' | 'terms'>('about');
  const [currency, setCurrency] = useState<'AMD' | 'USD' | 'EUR'>('AMD');

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchLoanDetail = async () => {
      setLoading(true);
      try {
        const dbRef = ref(db);
        // Ստանում ենք բոլոր վարկերը և գտնում համապատասխանը ըստ ID-ի
        const snapshot = await get(child(dbRef, 'loans'));
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          const items: LoanType[] = Object.keys(data).map(key => ({
            ...data[key],
            id: data[key].id || key
          }));
          
          const foundLoan = items.find(item => String(item.id) === String(id));
          setLoan(foundLoan || null);
        }
      } catch (error) {
        console.error("Error fetching loan detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6610f2]"></div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans">
        <h2 className="text-2xl font-black text-gray-300 uppercase italic mb-6">Վարկը չի գտնվել</h2>
        <button onClick={() => navigate(-1)} className="text-[#6610f2] font-bold uppercase tracking-widest border-b-2 border-[#6610f2]">Հետ վերադառնալ</button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Top Header Section */}
      <div className="bg-[#6610f2] h-[60px] flex items-center">
        <div className="max-w-[1200px] mx-auto w-full px-4">
          <span className="text-white font-bold text-sm uppercase tracking-widest italic">Evocabank / Loans</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#f8f9fb] relative overflow-hidden border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 pt-16 pb-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-3/5 text-center lg:text-left">
              <div className="inline-block bg-[#6610f2] text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full mb-6 tracking-[0.2em]">
                {loan.category}
              </div>
              <h1 className="text-4xl lg:text-6xl font-[900] text-[#1a1a1a] mb-8 italic uppercase leading-[1.1] tracking-tighter">
                {loan.title}
              </h1>
              <p className="text-gray-500 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
                {loan.description}
              </p>
            </div>
            <div className="lg:w-2/5 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#6610f2]/5 rounded-full blur-3xl"></div>
                <img 
                  src={loan.image} 
                  alt={loan.title} 
                  className="w-[300px] lg:w-[450px] h-auto object-contain relative z-10"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/500x500/f2f4f7/6600cc?text=Loan+Image'; }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="max-w-[1200px] mx-auto px-4 py-6 border-t border-gray-200/50 flex items-center gap-6 text-[10px] text-gray-400 font-black uppercase tracking-[0.15em]">
           <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#6610f2] transition-all hover:translate-x-[-5px]">
             ← Վերադառնալ
           </button>
           <div className="flex items-center gap-2">
             <Link to="/" className="hover:text-black">Գլխավոր</Link> <span>/</span>
             <Link to="/varker" className="hover:text-black">Վարկեր</Link> <span>/</span>
             <span className="text-gray-300">{loan.title}</span>
           </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Tabs Content */}
          <div className="lg:w-2/3">
            <div className="flex gap-10 border-b-2 border-gray-50 mb-12">
              <button 
                onClick={() => setActiveTab('about')}
                className={`pb-5 font-black text-[12px] uppercase tracking-[0.2em] transition-all relative ${activeTab === 'about' ? 'text-[#6610f2] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[3px] after:bg-[#6610f2]' : 'text-gray-300 hover:text-gray-500'}`}
              >
                Վարկի մասին
              </button>
              <button 
                onClick={() => setActiveTab('terms')}
                className={`pb-5 font-black text-[12px] uppercase tracking-[0.2em] transition-all relative ${activeTab === 'terms' ? 'text-[#6610f2] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[3px] after:bg-[#6610f2]' : 'text-gray-300 hover:text-gray-500'}`}
              >
                Պայմաններ
              </button>
            </div>

            <div className="animate-fadeIn">
              {activeTab === 'about' ? (
                <div className="space-y-8">
                  <h3 className="text-2xl font-black italic uppercase text-[#1a1a1a]">Ինչու՞ ընտրել այս վարկը</h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium italic">
                    Մենք առաջարկում ենք ճկուն լուծումներ Ձեր բիզնեսի թռիչքային զարգացման համար։ {loan.title}-ը նախատեսված է արագ արդյունք սիրողների համար։
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { t: 'Արագ հաստատում', d: 'Պատասխանը ստանում եք հաշված ժամերի ընթացքում:' },
                      { t: 'Նվազագույն փաստաթղթեր', d: 'Մոռացեք բյուրոկրատիայի և հերթերի մասին:' },
                      { t: 'Անհատական մոտեցում', d: 'Մենք հարմարվում ենք Ձեր բիզնեսի շրջանառությանը:' },
                      { t: 'Թափանցիկ պայմաններ', d: 'Ոչ մի թաքնված վճար կամ հավելյալ տոկոս:' }
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-[#6610f2]/20 transition-all">
                        <div className="w-8 h-8 bg-[#6610f2] rounded-full flex items-center justify-center text-white font-bold mb-4">✓</div>
                        <h4 className="font-black text-sm uppercase mb-2">{item.t}</h4>
                        <p className="text-gray-400 text-sm">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-[#6610f2]/5 p-10 rounded-[40px] space-y-6 border border-[#6610f2]/10">
                  <h3 className="text-xl font-black uppercase italic text-[#6610f2]">Հիմնական Պայմաններ</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-4 border-b border-[#6610f2]/10">
                      <span className="text-gray-500 font-bold uppercase text-[11px] tracking-widest">Տարեկան տոկոսադրույք</span>
                      <span className="text-[#1a1a1a] font-black italic">{loan.rate}</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-[#6610f2]/10">
                      <span className="text-gray-500 font-bold uppercase text-[11px] tracking-widest">Առավելագույն ժամկետ</span>
                      <span className="text-[#1a1a1a] font-black italic">{loan.duration}</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-[#6610f2]/10">
                      <span className="text-gray-500 font-bold uppercase text-[11px] tracking-widest">Վարկի գումար</span>
                      <span className="text-[#1a1a1a] font-black italic">{loan.amount}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Side Card */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-2xl shadow-gray-200/50 sticky top-10">
              <div className="flex justify-center gap-3 mb-10 bg-gray-50 p-2 rounded-[20px]">
                {['AMD', 'USD', 'EUR'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr as any)}
                    className={`flex-1 py-3 rounded-[15px] text-[10px] font-black transition-all ${currency === curr ? 'bg-[#6610f2] text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
                  >
                    {curr === 'AMD' ? '֏' : curr === 'USD' ? '$' : '€'}
                  </button>
                ))}
              </div>

              <div className="space-y-10 mb-12">
                <div className="text-center">
                  <span className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em] block mb-3">Ժամկետ</span>
                  <div className="text-3xl font-[900] italic text-[#6610f2]">{loan.duration}</div>
                </div>
                <div className="h-[1px] bg-gray-50"></div>
                <div className="text-center">
                  <span className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em] block mb-3">Սահմանաչափ</span>
                  <div className="text-3xl font-[900] italic text-[#6610f2]">{loan.amount}</div>
                </div>
                <div className="h-[1px] bg-gray-50"></div>
                <div className="text-center">
                  <span className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em] block mb-3">{loan.rateLabel}</span>
                  <div className="text-3xl font-[900] italic text-[#6610f2]">{loan.rate}</div>
                </div>
              </div>

              <button className="w-full bg-[#6610f2] text-white py-6 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] hover:bg-[#520dc2] transition-all shadow-xl shadow-purple-100 mb-4 active:scale-95">
                Դիմել հիմա
              </button>
              <button className="w-full bg-white border-2 border-gray-100 text-gray-400 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:border-[#6610f2] hover:text-[#6610f2] transition-all active:scale-95">
                Հետադարձ զանգ
              </button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AnhatVarkerInfo;
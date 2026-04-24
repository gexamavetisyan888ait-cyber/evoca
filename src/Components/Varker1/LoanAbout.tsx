import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { db } from '../../lib/firebase';
import { ref, onValue } from 'firebase/database';

const LoanAbout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loan, setLoan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Միանում ենք բազայի 'loans' հանգույցին
    const loansRef = ref(db, 'varker');
    
    const unsubscribe = onValue(loansRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loansArray = Array.isArray(data) ? data : Object.values(data);
        // Փնտրում ենք համապատասխան վարկը ըստ ID-ի
        const found = loansArray.find((item: any) => item && String(item.id) === String(id));
        setLoan(found);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) return <div className="h-screen flex justify-center items-center"><Loader2 className="animate-spin" /></div>;
  if (!loan) return <div className="h-screen flex justify-center items-center">Վարկը չի գտնվել</div>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-8 font-bold">
        <ChevronLeft size={20} /> Հետ
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img src={loan.image} alt={loan.title} className="w-full rounded-3xl" />
        <div>
          <h1 className="text-3xl font-black mb-4">{loan.title}</h1>
          <p className="text-gray-500 mb-6">{loan.description}</p>
          <div className="bg-gray-50 p-6 rounded-2xl">
            <p>Տոկոսադրույք: <strong>{loan.rate}</strong></p>
            <p>Ժամկետ: <strong>{loan.duration}</strong></p>
            <p>Գումար: <strong>{loan.amount}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanAbout;
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// Firebase-ի ներմուծումները
import { db } from "../../lib/firebase"; 
import { ref, push, set, onValue, serverTimestamp } from "firebase/database";

export default function Akyntard() {
    const { t } = useTranslation();
    const [categories, setCategories] = useState<any[]>([]);
    const [step, setStep] = useState<'categories' | 'sub' | 'input'>('categories');
    const [selectedCat, setSelectedCat] = useState<any>(null);
    const [selectedSub, setSelectedSub] = useState<any>(null);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // Տվյալները քաշում ենք Firebase-ից
    useEffect(() => {
        const categoriesRef = ref(db, 'akyntard');
        const unsubscribe = onValue(categoriesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const categoriesList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setCategories(categoriesList);
            }
            setFetching(false);
        });

        return () => unsubscribe();
    }, []);

    const handleBack = () => {
        if (step === 'input') setStep('sub');
        else if (step === 'sub') setStep('categories');
    };

    const handlePayment = async () => {
        if (!inputValue.trim()) return alert(t('payments.enter_data_alert'));

        setLoading(true);
        try {
            const paymentsRef = ref(db, 'db/payments');
            const newPaymentRef = push(paymentsRef);
            
            await set(newPaymentRef, {
                category: selectedCat.name,
                service: selectedSub.name,
                account: inputValue,
                status: "pending",
                timestamp: serverTimestamp()
            });

            alert(t('payments.success_alert'));
            setInputValue("");
            setStep('categories');
        } catch (error) {
            console.error("Error:", error);
            alert(t('payments.error_alert'));
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb]">
                <Loader2 className="animate-spin text-purple-600" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fb] p-4 md:p-8 font-sans text-[#1d1d1f]">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        {step !== 'categories' && (
                            <button onClick={handleBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-all">
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        <h1 className="text-2xl font-bold tracking-tight uppercase italic">
                            evoca<span className="font-light italic text-purple-600">PAY</span>
                        </h1>
                    </div>
                    <div className="text-sm font-bold text-purple-700">8444 / +374 10 605555</div>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">
                        {step === 'categories' ? t('payments.main_title') : selectedCat?.name}
                    </h2>
                    <div className="h-1 w-12 bg-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* Categories Grid */}
                {step === 'categories' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                onClick={() => { setSelectedCat(cat); setStep('sub'); }}
                                className="bg-white p-6 rounded-[35px] shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col items-center justify-center text-center group h-64 border border-transparent hover:border-purple-100"
                            >
                                <div className="mb-6 w-24 h-24 flex items-center justify-center overflow-hidden">
                                    <img src={cat.img} alt={cat.name} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <p className="text-[13px] font-bold uppercase tracking-wider leading-tight text-gray-700">
                                    {cat.name}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Sub Categories Grid */}
                {step === 'sub' && (
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                        {selectedCat?.subCategories && Object.values(selectedCat.subCategories).map((sub: any, index: number) => (
                            <div
                                key={index}
                                onClick={() => { setSelectedSub(sub); setStep('input'); }}
                                className="bg-white p-8 rounded-[30px] shadow-sm hover:shadow-lg cursor-pointer transition-all border border-gray-50 flex flex-col items-center gap-4"
                            >
                                <div className="w-16 h-16 overflow-hidden">
                                    <img src={sub.img} alt={sub.name} className="w-full h-full object-contain" />
                                </div>
                                <p className="font-bold text-xs uppercase tracking-widest text-center">{sub.name}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Input Form */}
                {step === 'input' && (
                    <div className="max-w-md mx-auto bg-white p-10 rounded-[40px] shadow-2xl border border-gray-50 animate-in fade-in zoom-in duration-300">
                        <div className="flex flex-col items-center mb-8">
                            <img src={selectedSub?.img} className="w-20 h-20 object-contain mb-4" />
                            <h3 className="text-lg font-bold uppercase">{selectedSub?.name}</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="relative">
                                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-purple-400 block mb-2 ml-4">
                                    {t('payments.input_label')}
                                </label>
                                <input
                                    autoFocus
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={t('payments.placeholder')}
                                    className="w-full p-5 bg-gray-50 rounded-3xl outline-none border-2 border-transparent focus:border-purple-100 text-center font-bold text-xl transition-all"
                                />
                            </div>
                            <button 
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full py-5 bg-[#1d1d1f] text-white rounded-3xl font-black uppercase tracking-[0.3em] hover:bg-purple-700 shadow-lg transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? t('payments.processing') : t('payments.pay_btn')}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="fixed bottom-8 left-0 right-0 text-center opacity-20 select-none pointer-events-none uppercase tracking-[1em] text-[10px]">
                Evocabank Digital System
            </div>
        </div>
    );
}
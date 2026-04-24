import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, Clock, MapPin, Calendar,
    Briefcase, Share2, Link as LinkIcon, ChevronDown,
    UploadCloud, RefreshCw
} from 'lucide-react';

// --- Firebase Imports ---
import { db } from '../../lib/firebase'; // Ստուգիր այս path-ը քո project-ում
import { ref, onValue } from 'firebase/database';

// --- Types ---
interface Job {
    id: number;
    title: string;
    category: string;
    location: string;
    deadline: string;
    type: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
}

const WorkAtEvoca: React.FC = () => {
    // Փոփոխված է 'work', որպեսզի առաջինը բացվի աշխատանքների էջը
    const [activeTab, setActiveTab] = useState('work'); 
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [openStep, setOpenStep] = useState<number | null>(1);
    
    // --- Firebase Data States ---
    const [jobsData, setJobsData] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    // --- Fetch Data from Firebase ---
    useEffect(() => {
        const vacanciesRef = ref(db, 'praktika');
        const unsubscribe = onValue(vacanciesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const formattedData = Array.isArray(data) ? data : Object.values(data);
                setJobsData(formattedData as Job[]);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedJob, activeTab]);

    // --- Sub-Components ---

    const ApplicationHeader = () => (
        <div className="max-w-[1450px] mx-auto px-6 mt-10">
            <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar gap-x-10">
                {[
                    { id: 'work', label: 'Աշխատանք Evoca-ում' },
                    { id: 'internship', label: 'Ուսումնական պրակտիկա' },
                    { id: 'bridge', label: 'EvocaBridge' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => { 
                            setActiveTab(tab.id); 
                            setSelectedJob(null); // Մաքրում ենք ընտրված աշխատանքը տաբը փոխելիս
                        }}
                        className={`pb-6 text-[14px] font-[1000] uppercase italic tracking-wider transition-all relative whitespace-nowrap
                        ${activeTab === tab.id ? "text-black" : "text-gray-300 hover:text-gray-400"}`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6610f2]" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );

    const JobList = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16 pb-20">
            <section className="w-full h-[400px] md:h-[550px] relative px-6 mt-10">
                <div className="w-full h-full rounded-[60px] overflow-hidden relative">
                    <img
                        src="https://www.evoca.am/images-cache/vacancies/1/1758008762777/1200x630.jpg"
                        className="w-full h-full object-cover"
                        alt="Evoca Work"
                    />
                    <div className="absolute inset-0 bg-black/10 flex items-center px-12">
                        <div className="bg-white rounded-[50px] p-10 md:p-14 shadow-2xl max-w-xl">
                            <h2 className="text-[35px] md:text-[45px] font-[1000] italic uppercase text-[#1a1a1a] leading-none mb-4">Աշխատանք Evoca-ում</h2>
                            <p className="text-gray-500 font-medium italic">Միացիր մեր նորարար թիմին և սկսիր քո կարիերայի հաջողության պատմությունը մեզ հետ:</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-[1450px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { label: "Մոտիվացված", img: "https://www.evoca.am/images-cache/applicant_features/1/16194199747856/120x120.png" },
                    { label: "Նպատակասլաց", img: "https://www.evoca.am/images-cache/applicant_features/1/16194205883017/120x120.png" },
                    { label: "Արագ և ճկուն ", img: "https://www.evoca.am/images-cache/applicant_features/1/16194206332591/120x120.png" },
                    { label: "Իր աշխատանքը շա~տ սիրող", img: "https://www.evoca.am/images-cache/applicant_features/1/16194207496218/120x120.png" },
                    { label: "Նորարարական և կրեատիվ լուծումներ գտնող", img: "https://www.evoca.am/images-cache/applicant_features/1/16194208269015/120x120.png" },
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center group cursor-default">
                        <div className="w-24 h-24 mb-4 transition-transform group-hover:scale-110">
                            <img src={item.img} alt={item.label} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[14px] font-bold italic uppercase text-[#4d4d4d]">{item.label}</span>
                    </div>
                ))}
            </section>

            <section className="max-w-[1450px] mx-auto px-6 space-y-6">
                <h3 className="text-2xl font-[1000] italic uppercase text-[#1a1a1a]">Բաց մի թող քո նոր հնարավորությունը</h3>
                {loading ? (
                   <div className="text-center py-20 text-[#6610f2] font-black italic uppercase">Բեռնվում է...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobsData.map((job) => (
                            <div key={job.id} className="bg-[#f8f9fb] rounded-[45px] p-10 border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-shadow">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-2xl font-[1000] italic uppercase text-[#1a1a1a] leading-tight max-w-[80%]">{job.title}</h4>
                                        <div className="bg-white p-3 rounded-2xl shadow-sm text-[#6610f2]"><Briefcase size={24} /></div>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <div className="flex items-center gap-2 text-gray-400 text-sm font-bold italic"><MapPin size={16} /> {job.location}</div>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm font-bold italic"><Clock size={16} /> {job.type}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedJob(job)}
                                    className="w-full bg-[#6610f2] text-white py-5 rounded-full font-[1000] italic uppercase text-sm tracking-widest hover:bg-[#520dc2] transition-colors flex items-center justify-center gap-2"
                                >
                                    Մանրամասն <ChevronRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </motion.div>
    );

    const JobDetail = ({ job }: { job: Job }) => (
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="max-w-[1450px] mx-auto px-6 py-10 pb-24">
            <button onClick={() => setSelectedJob(null)} className="flex items-center gap-2 text-[#6610f2] font-black italic uppercase text-sm mb-10 group">
                <div className="bg-[#f8f9fb] p-2 rounded-full group-hover:bg-[#6610f2] group-hover:text-white transition-colors"><ChevronLeft size={20} /></div>
                Հետ դեպի ցուցակ
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-12">
                    <h1 className="text-4xl md:text-5xl font-[1000] italic uppercase text-[#1a1a1a] leading-none">{job.title}</h1>
                    <div className="space-y-6">
                        <h5 className="text-xl font-[1000] italic uppercase text-[#6610f2]">Նկարագրություն</h5>
                        <p className="text-gray-500 text-lg font-medium italic leading-relaxed">{job.description}</p>
                    </div>
                    <div className="space-y-6">
                        <h5 className="text-xl font-[1000] italic uppercase text-[#6610f2]">Պարտականություններ</h5>
                        <ul className="space-y-4">
                            {job.responsibilities.map((item, i) => (
                                <li key={i} className="flex gap-4 text-gray-500 font-medium italic">
                                    <span className="text-[#6610f2] font-black">•</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h5 className="text-xl font-[1000] italic uppercase text-[#6610f2]">Պահանջներ</h5>
                        <ul className="space-y-4">
                            {job.requirements.map((item, i) => (
                                <li key={i} className="flex gap-4 text-gray-500 font-medium italic">
                                    <span className="text-[#6610f2] font-black">•</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-[#f8f9fb] rounded-[50px] p-10 border border-gray-100 sticky top-32">
                        <h6 className="text-lg font-[1000] italic uppercase text-[#1a1a1a] mb-8">Աշխատանքի մասին</h6>
                        <div className="space-y-8 mb-10">
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-2xl shadow-sm text-[#6610f2]"><MapPin size={20} /></div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400">Վայրը</p>
                                    <p className="text-sm font-bold italic text-[#1a1a1a]">{job.location}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-2xl shadow-sm text-[#6610f2]"><Calendar size={20} /></div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400">Վերջնաժամկետ</p>
                                    <p className="text-sm font-bold italic text-[#1a1a1a]">{job.deadline}</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full bg-[#6610f2] text-white py-5 rounded-full font-[1000] italic uppercase text-sm tracking-widest hover:bg-[#520dc2] shadow-xl transition-all mb-6">
                            Դիմել հիմա
                        </button>
                        <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-200">
                            <Share2 size={18} className="text-gray-300" />
                            <LinkIcon size={18} className="text-gray-400 hover:text-[#6610f2] cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const InternshipSection = () => {
        const universities = [
            { name: "Երևանի պետական համալսարան", logo: "https://www.evoca.am/images-cache/partner_universities/1/16192503158745/120x120.jpg" },
            { name: "Հայաստանի ամերիկյան համալսարան", logo: "https://www.evoca.am/images-cache/partner_universities/1/16192501535211/120x120.jpg" },
            { name: "Հայաստանի պետական տնտեսագիտական համալսարան", logo: "https://www.evoca.am/images-cache/partner_universities/1/16192504505443/120x120.jpg" },
            { name: "Հայ-Ռուսական Համալսարան", logo: "https://www.evoca.am/images-cache/partner_universities/1/16192505629164/120x120.jpg" }
        ];

        const steps = [
            { id: 1, title: "Առաջին փուլ` Համագործակցություն", content: "Բարձրագույն ուսումնական հաստատության և Evocabank-ի միջև կնքվում է ուսումնական պրակտիկայի վերաբերյալ պայմանագիր` համաձայն ուսումնական պլանի:" },
            { id: 2, title: "Երկրորդ փուլ` Դիմում-Հայտ", content: "Ուսանողը, ով ցանկանում է անցնել պրակտիկա, պետք է լրացնի դիմում-հայտ՝ կցելով ինքնակենսագրականը:" },
            { id: 3, title: "Երրորդ փուլ` Թեստավորում", content: "Դիմորդներն անցնում են թեստավորում, որն իրականացվում է երկու փուլով..." },
            { id: 4, title: "Չորրորդ փուլ` Ուսումնական պրակտիկա", content: "Նախորդ փուլում լավագույն արդյունք ցուցաբերած դիմորդներն սկսում են պրակտիկան..." },
            { id: 5, title: "Հինգերորդ փուլ` Աշխատանքի առաջարկ", content: "Ստուգումների դրական արդյունքներ ստանալուց հետո մեր թիմը կապ կհաստատի Ձեզ հետ..." }
        ];

        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full space-y-20 pb-20">
                <section className="w-full h-[450px] md:h-[550px] relative overflow-hidden px-6 mt-10">
                    <div className="w-full h-full rounded-[60px] overflow-hidden relative flex items-center">
                        <img src="https://www.evoca.am/images-cache/loans/1/16142449060958/1920x527.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Banner" />
                        <div className="relative max-w-[1450px] mx-auto w-full px-10 z-10">
                            <div className="bg-white rounded-[50px] p-10 md:p-14 shadow-2xl max-w-xl">
                                <h2 className="text-[35px] md:text-[45px] font-[1000] italic uppercase text-[#1a1a1a] leading-none mb-4">Ուսումնական պրակտիկա</h2>
                                <p className="text-gray-500 font-medium italic">Evocabank-ը պարբերաբար կազմակերպում է ուսումնական պրակտիկաներ՝ համագործակցելով հայաստանյան առաջատար բուհերի հետ:</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-[1450px] mx-auto px-6">
                    <h3 className="text-2xl font-[1000] italic uppercase text-[#1a1a1a] mb-12 max-w-2xl">Մենք համագործակցում ենք հետևյալ Բուհերի հետ՝</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {universities.map((uni, i) => (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="w-24 h-24 mb-4 transform transition-transform group-hover:scale-110">
                                    <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                                </div>
                                <span className="text-[13px] font-bold italic uppercase text-[#4d4d4d]">{uni.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="max-w-[1100px] mx-auto px-6">
                    <h3 className="text-3xl font-[1000] italic uppercase text-[#1a1a1a] mb-12 text-center">Պրակտիկայի փուլեր</h3>
                    <div className="space-y-4">
                        {steps.map((step) => (
                            <div key={step.id} className="bg-[#f8f9fb] rounded-[35px] overflow-hidden border border-gray-100">
                                <button onClick={() => setOpenStep(openStep === step.id ? null : step.id)} className="w-full flex items-center justify-between p-8 md:p-10 text-left">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl transition-colors ${openStep === step.id ? 'bg-[#6610f2] text-white' : 'bg-gray-100 text-[#6610f2]'}`}>{step.id}</div>
                                        <span className={`text-xl md:text-2xl font-[1000] italic uppercase transition-colors ${openStep === step.id ? 'text-[#6610f2]' : 'text-[#1a1a1a]'}`}>{step.title}</span>
                                    </div>
                                    <motion.div animate={{ rotate: openStep === step.id ? 180 : 0 }} className={openStep === step.id ? 'text-[#6610f2]' : 'text-gray-300'}><ChevronDown size={24} /></motion.div>
                                </button>
                                <AnimatePresence>
                                    {openStep === step.id && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                            <p className="px-10 pb-10 ml-20 text-gray-500 text-lg font-medium italic leading-relaxed">{step.content}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>
                
                <section className="max-w-[1450px] mx-auto px-6 mt-24">
                    <div className="max-w-4xl mx-auto bg-[#f8f9fb] rounded-[60px] p-12 md:p-16 border border-gray-100 shadow-inner">
                        <h3 className="text-4xl md:text-5xl font-[1000] italic uppercase text-center text-[#6610f2] mb-12">Դիմում-հայտ</h3>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <input type="text" className="w-full bg-white border border-gray-100 p-4 rounded-xl outline-none focus:border-[#6610f2]" placeholder="Անուն *" />
                            <input type="text" className="w-full bg-white border border-gray-100 p-4 rounded-xl outline-none focus:border-[#6610f2]" placeholder="Ազգանուն *" />
                            <div className="md:col-span-2 flex bg-white border border-gray-100 rounded-xl overflow-hidden">
                                <div className="px-4 py-4 border-r text-gray-500 text-sm flex items-center">+374</div>
                                <input type="tel" className="flex-1 p-4 outline-none" placeholder="Հեռախոս *" />
                            </div>
                            <input type="email" className="md:col-span-2 w-full bg-white border border-gray-100 p-4 rounded-xl outline-none focus:border-[#6610f2]" placeholder="Էլ. Հասցե *" />
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400">Կցել CV *</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center bg-white hover:border-[#6610f2] cursor-pointer group transition-colors">
                                    <UploadCloud size={32} className="mx-auto text-gray-300 group-hover:text-[#6610f2] mb-2" />
                                    <p className="text-sm text-gray-400 group-hover:text-[#6610f2]">Սեղմեք ֆայլը վերբեռնելու համար</p>
                                </div>
                            </div>
                            <div className="md:col-span-2 flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
                                <input type="text" className="w-24 border border-gray-100 p-3 rounded-lg text-sm outline-none" placeholder="Կոդը" />
                                <div className="bg-gray-100 px-5 py-3 rounded-lg font-bold italic text-lg select-none">NfE8e</div>
                                <button type="button" className="text-gray-300 hover:text-black"><RefreshCw size={20} /></button>
                            </div>
                            <div className="md:col-span-2 text-center mt-6">
                                <button type="submit" className="bg-[#6610f2] text-white px-16 py-4 rounded-full font-[1000] uppercase italic tracking-wider shadow-lg hover:bg-[#520dc2] transition-all">Ուղարկել</button>
                            </div>
                        </form>
                    </div>
                </section>
            </motion.div>
        );
    };

    const EvocaBridgeSection = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full pb-20">
            <section className="w-full px-6 mt-10">
                <div className="w-full h-[400px] md:h-[600px] rounded-[60px] overflow-hidden relative">
                    <img src="https://www.evoca.am/images-cache/menu/1/16207300767001/1200x630.png" className="w-full h-full object-cover" alt="Evoca Bridge" />
                </div>
            </section>
            <section className="max-w-[1450px] mx-auto px-6 mt-16 space-y-12">
                <div className="max-w-4xl">
                    <h2 className="text-[35px] md:text-[45px] font-[1000] italic uppercase text-[#1a1a1a] leading-tight mb-8">Evoca Bridge</h2>
                    <div className="space-y-8 text-gray-500 text-lg font-medium italic leading-relaxed">
                        <p>Evocabank-ն իրականացնում է հատուկ կրթական ծրագիր՝ Evoca Bridge, որի նպատակն է կամրջել կրթությունն ու աշխատաշուկան:</p>
                        <p>Մենք հավատում ենք, որ կրթությունը հաջողության հիմքն է, և Evoca Bridge-ը հենց այն հարթակն է, որտեղ սկսվում է Ձեր մասնագիտական վերելքը:</p>
                    </div>
                </div>
            </section>
        </motion.div>
    );

    return (
        <div className="bg-white min-h-screen font-sans">
            <ApplicationHeader />
            <AnimatePresence mode="wait">
                {selectedJob ? (
                    <JobDetail job={selectedJob} key="detail" />
                ) : (
                    <>
                        {activeTab === 'work' && <JobList key="work-list" />}
                        {activeTab === 'internship' && <InternshipSection key="internship-section" />}
                        {activeTab === 'bridge' && <EvocaBridgeSection key="bridge-section" />}
                    </>
                )}
            </AnimatePresence>
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;0,900;1,900&display=swap');
                body { font-family: 'Montserrat', sans-serif; }
            `}</style>
        </div>
    );
};

export default WorkAtEvoca;
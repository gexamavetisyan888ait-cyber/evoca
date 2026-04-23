import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import HeroSlider from './Components/HomeSection1/HeroSlider';
import IdentifySection from './Components/HomeSection1/IdentifySection';
import BestOffers from './Components/CardsUSA/Cards';
import CardSlide from './Components/CardSlide/CardSlide';
import VarkAvand from './Components/VarkAvand/VarkAvand';
import Gorcynkerner from './Components/Gorcynkerner/Gorcynkerner';
import HomeCards from './Components/HomeCards/HomeCards';
import Change from './Components/Change/Change';
import Varker1 from './Components/Varker1/Varker';
import LoanAbout from './Components/Varker1/LoanAbout';
import Avandner from './Components/Avandner/Avandner';
import AvandnerInfo from './Components/Avandner/AvandnerInfo';
import AnhatVarker from './Components/AnhatVarker/AnhatVarker';
import CardInfo from './Components/Qarter/CardInfo';
import CardsPage from './Components/Qarter/CardsPage';
import EvocaSALARY from './Components/EvocaSALARY/EvocaSALARY';
import EvocaTOUCH from './Components/EvocaTOUCH/EvocaTOUCH';
import Hashivner from './Components/Hashivner/Hashivner';
import Poxancumner from './Components/Poxancumner/Poxancumner'
import Arjetxter from './Components/Arjetxter/Arjetxter'
import Lizing from './Components/Lizing/Lizing'
import BiznesHashivner from './Components/BiznesHashivner/BiznesHashivner'
import BiznesAvand from './Components/BiznesAvand/BiznesAvand'
import ArjetxtiShuka from './Components/ArjetxtiShuka/ArjetxtiShuka'
import ArevtriFinans from './Components/ArevtriFInans/ArevtriFInans'
import Ayl from './Components/Ayl/Ayl'
import Digital from './Components/Digital/Digital'
import EvocaLife from './Components/EvocaLife/EvocaLife'
import Praktika from './Components/Praktika/Praktika'
const SalaryProject = () => (
  <div className="bg-white">
    <div className="max-w-[1140px] mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 uppercase">Evoca Աշխատավարձային Նախագիծ</h1>
    </div>
    <EvocaSALARY />
    <HomeCards />
  </div>
);

const Home = () => (
  <>
    <HeroSlider />
    <IdentifySection />
    <BestOffers />
    <CardSlide />
    <VarkAvand />
    <Gorcynkerner />
    <HomeCards />
    <Change />
  </>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personal-loans" element={<AnhatVarker />} />
            <Route path="/deposits" element={<Avandner />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/card/:id" element={<CardInfo />} />
            <Route path="/evoca-salary" element={<SalaryProject />} />
            <Route path="/deposit/:id" element={<AvandnerInfo />} />
            <Route path="/business" element={<Varker1 />} />
            <Route path="/business/loans" element={<Varker1 />} />
            <Route path="/loan/:id" element={<LoanAbout />} />
            <Route path="/touch" element={<EvocaTOUCH />} />
            <Route path="/accounts" element={<Hashivner />} />
            <Route path="/transfers" element={<Poxancumner />} />
            <Route path="/securities" element={<Arjetxter />} />
            <Route path="/business/leasing" element={<Lizing />} />
            <Route path="/business/accounts" element={<BiznesHashivner />} />
            <Route path="/business/deposits" element={<BiznesAvand />} />
            <Route path="/business/securities" element={<ArjetxtiShuka />} />
            <Route path="/business/trade-finance" element={<ArevtriFinans />} />
            <Route path="/business/other" element={<Ayl />} />
            <Route path="/business/digital" element={<Digital />} />
            <Route path="/career/EvocaLife" element={<EvocaLife />} />
            <Route path="/career/work" element={<Praktika />} />
            <Route path="*" element={
              <div className="flex items-center justify-center h-[500px] text-2xl font-black text-[#6600cc] uppercase tracking-widest">
                404 - Էջը չի գտնվել
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
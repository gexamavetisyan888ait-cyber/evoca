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

// Էջերի ներմուծում (Imports)
import Varker1 from './Components/Varker1/Varker'; 
import LoanAbout from './Components/Varker1/LoanAbout'; 
import Avandner from './Components/Avandner/Avandner';
import AvandnerInfo from './Components/Avandner/AvandnerInfo';
import AnhatVarker from './Components/AnhatVarker/AnhatVarker';

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
            {/* Գլխավոր էջ */}
            <Route path="/" element={<Home />} />
            
            {/* Անհատական բաժին */}
            <Route path="/personal-loans" element={<AnhatVarker />} />
            <Route path="/deposits" element={<Avandner />} />
            {/* Ավանդի մանրամասն էջ */}
            <Route path="/deposit/:id" element={<AvandnerInfo />} />

            {/* Բիզնես բաժին */}
            <Route path="/business" element={<Varker1 />} /> 
            <Route path="/business/loans" element={<Varker1 />} />
            {/* Վարկի մանրամասն էջ */}
            <Route path="/loan/:id" element={<LoanAbout />} />

            {/* 404 էջ */}
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
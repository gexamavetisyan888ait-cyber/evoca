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
import Varker1 from './Components/Varker1/Varker'; // կամ ճիշտ ուղին
import LoanAbout from './Components/Varker1/LoanAbout';
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

            {/* Բիզնես և Վարկեր բաժինները տանում են նույն տեղը */}
            <Route path="/business" element={<Varker1 />} />
            <Route path="/business-loans" element={<Varker1 />} />
           <Route path="/loan/:id" element={<LoanAbout />} />
            {/* 404 Էջ */}
            <Route path="*" element={
              <div className="flex items-center justify-center h-[500px] text-2xl font-bold text-red-500">
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
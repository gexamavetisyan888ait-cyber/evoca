import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import HeroSlider from './Components/HomeSection1/HeroSlider';
import IdentifySection from './Components/HomeSection1/IdentifySection';
import BestOffers from './Components/CardsUSA/Cards';
import CardSlide from './Components/CardSlide/CardSlide'; // Ավելացրինք նոր սեկցիան
import VarkAvand from './Components/VarkAvand/VarkAvand'; // Նոր կոմպոնենտը
import Gorcynkerner from './Components/Gorcynkerner/Gorcynkerner'
import HomeCards from './Components/HomeCards/HomeCards'
import Change from './Components/Change/Change'
const Home = () => (
  <>
    <HeroSlider />
    <IdentifySection />
    <BestOffers />
    <CardSlide />
    <VarkAvand />
    <Gorcynkerner />
    <HomeCards />
    <Change/>
    <div className="p-10 text-2xl font-bold text-center text-gray-800">
      Bari galust Evocabank
    </div>
  </>
);

const Business = () => (
  <div className="p-10 text-2xl font-bold min-h-[400px] flex items-center justify-center">
    Biznes Ej (Այստեղ կավելացվեն բիզնեսի հետ կապված կոմպոնենտները)
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navigaciayi hatvatsy */}
        <Header />

        {/* Ejeri parunakutyuny */}
        <main className="flex-grow">
          <Routes>
            {/* Glxavor ejy */}
            <Route path="/" element={<Home />} />

            {/* Biznes ejy */}
            <Route path="/business" element={<Business />} />

            {/* 404 Ej - Ete ejy chi gtnvum */}
            <Route path="*" element={
              <div className="flex items-center justify-center h-[500px] text-2xl font-bold text-red-500">
                404 - Էջը չի գտնվել
              </div>
            } />
          </Routes>
        </main>

        {/* Footer-y bacvats e amboxjakan tesqi hamar */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
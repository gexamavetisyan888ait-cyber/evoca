import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
// import Footer from './Components/Footer/Footer';
import HeroSlider from './Components/HomeSection1/HeroSlider';
import IdentifySection from './Components/HomeSection1/IdentifySection';
import BestOffers from './Components/CardsUSA/Cards';

// Glxavor ejy, vortegh gtnvum en bolor glxavor section-nery
const Home = () => (
  <>
    <HeroSlider />
    <IdentifySection />
    <BestOffers /> {/* Ավելացված է IdentifySection-ից հետո */}
    <div className="p-10 text-2xl font-bold text-center">
      Bari galust Evocabank
    </div>
  </>
);

const Business = () => (
  <div className="p-10 text-2xl font-bold min-h-[400px]">
    Biznes Ej (Aystegh karogh eq avelacnel biznes-in bnorosh komponentner)
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            {/* Glxavor ejy (Individual) */}
            <Route path="/" element={<Home />} />
            
            {/* Biznes ejy */}
            <Route path="/business" element={<Business />} />
            
            {/* 404 Ej */}
            <Route path="*" element={
              <div className="flex items-center justify-center h-[400px] text-2xl font-bold">
                404 - Ejy chi gtnvel
              </div>
            } />
          </Routes>
        </main>

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
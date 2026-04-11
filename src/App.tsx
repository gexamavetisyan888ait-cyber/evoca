import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
const Home = () => <div className="p-10 text-2xl font-bold">Glxavor Ej (Անհատ)</div>;
const Business = () => <div className="p-10 text-2xl font-bold">Biznes Ej</div>;

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<Business />} />
          <Route path="*" element={<div>404 - Ejy chi gtnvel</div>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
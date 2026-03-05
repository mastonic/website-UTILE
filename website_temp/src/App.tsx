import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Payment from './pages/Payment';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalBackground from './components/GlobalBackground';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <GlobalBackground />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paiement" element={<Payment />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

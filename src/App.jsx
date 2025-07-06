import { useState, useEffect } from 'react';
import './styles.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import QuoteGenerator from './components/QuoteGenerator';
import About from './components/About';

const App = () => {
  const [page, setPage] = useState(window.location.hash.slice(2) || '');

  useEffect(() => {
    const handleHashChange = () => setPage(window.location.hash.slice(2) || '');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div>
      <Navbar />
      {page === '' && <Home />}
      {page === 'generate' && <QuoteGenerator />}
      {page === 'about' && <About />}
    </div>
  );
};

export default App;
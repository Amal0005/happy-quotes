
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>Happy Quotes</h1>
        <div className="hamburger-button" onClick={toggleMenu}>
          <span>{isOpen ? '×' : '☰'}</span>
        </div>
        <div className="nav-links">
          <a href="#/" onClick={closeMenu}>Home</a>
          <a href="#/generate" onClick={closeMenu}>Generate Quote</a>
          <a href="#/about" onClick={closeMenu}>About</a>
        </div>
      </div>
      <div className={`hamburger-menu ${isOpen ? 'active' : ''}`}>
        <a href="#/" onClick={closeMenu}>Home</a>
        <a href="#/generate" onClick={closeMenu}>Generate Quote</a>
        <a href="#/about" onClick={closeMenu}>About</a>
      </div>
    </nav>
  );
};

export default Navbar;
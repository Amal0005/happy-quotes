
const Navbar = () => (
  <nav className="navbar" style={{ 
    backgroundColor: 'transparent',
    background: 'none',
    border: 'none'
  }}>
    <div className="navbar-content">
      <h1>Happy Quotes</h1>
      <div className="nav-links">
        <a href="#/">Home</a>
        <a href="#/generate">Generate Quote</a>
        <a href="#/about">About</a>
      </div>
    </div>
  </nav>
);

export default Navbar;
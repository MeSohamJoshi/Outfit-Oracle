import './navbar.css';

const Navbar = () => {
    return (
  
  <nav className="navbar">
    <div className="navbar-left">
      <a href="/" className="logo">
        OutfitOracle
      </a>
    </div>
    <div className="navbar-center">
      <ul className="nav-links">
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
          <a href="/about">About Us</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </div>
  </nav>
  );
  };
  
  export default Navbar;
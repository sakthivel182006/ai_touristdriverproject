import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, logout }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🤖</span>
          <span className="logo-text">Agentic AI</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            <span className="link-icon">🏠</span>
            Home
          </Link>
          <Link to="/tripping" className="nav-link">
            <span className="link-icon">✈️</span>
            Book Trip
          </Link>

          {!isAuthenticated ? (
            <Link to="/login" className="nav-link login-btn">
              <span className="link-icon">🔑</span>
              Login
            </Link>
          ) : (
            <>
              <Link to="/profile" className="nav-link">
                <span className="link-icon">👤</span>
                Profile
              </Link>
              <button onClick={logout} className="nav-link logout-btn">
                <span className="link-icon">🚪</span>
                Logout
              </button>
            </>
          )}
        </div>

        <div className="mobile-menu-btn" id="mobile-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
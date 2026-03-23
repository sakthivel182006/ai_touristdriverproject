import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, logout }) => {
  return (
    <nav style={styles.nav}>
      <h3>Agentic AI</h3>

      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/tripping">Book Trip</Link>
       

        {!isAuthenticated ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/profile">👤 Profile</Link>
         
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#222",
    color: "#fff"
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center"
  }
};

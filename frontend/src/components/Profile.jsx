import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  if (!user) {
    return <h3>User data not found</h3>;
  }

  return (
    <div style={styles.container}>
      <h2>User Profile</h2>

      <div style={styles.card}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>

        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

/* -------- STYLES -------- */

const styles = {
  container: {
    padding: "40px",
    textAlign: "center"
  },
  card: {
    display: "inline-block",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "left",
    minWidth: "300px"
  },
  logoutBtn: {
    marginTop: "20px",
    padding: "8px 16px",
    cursor: "pointer"
  }
};

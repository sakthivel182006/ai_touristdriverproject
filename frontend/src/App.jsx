import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Authentication from "./components/Authentication";
import Profile from "./components/Profile";

import { authFetch } from "./utils/authFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trip from "./components/tripdetails/Trip";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await authFetch("https://ai-touristdriverprojectbackend.onrender.com/api/auth/check");
        if (res.ok) setIsAuthenticated(true);
        else logout(true);
      } catch {
        logout(true);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const logout = (expired = false) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);

    if (expired) {
      toast.warning("Session expired. You have been logged out.");
    } else {
      toast.info("Logged out successfully");
    }
  };

  if (loading) return <h3>Checking session...</h3>;

  return (
    <>
      <ToastContainer position="top-right" autoClose={30000} />
      <Navbar isAuthenticated={isAuthenticated} logout={logout} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/tripping" element={<Trip />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth routes */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Authentication onLoginSuccess={() => setIsAuthenticated(true)} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Protected route */}
        <Route
          path="/profile"
          element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
};

export default App;

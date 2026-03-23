import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Authentication.css";

const Authentication = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!isLogin && !form.name) {
      toast.error("Please enter your name");
      return;
    }

    setLoading(true);
    
    const url = isLogin
      ? "https://ai-touristdriverprojectbackend.onrender.com/api/users/login"
      : "https://ai-touristdriverprojectbackend.onrender.com/api/users/register";

    const body = isLogin
      ? {
          email: form.email,
          password: form.password
        }
      : {
          name: form.name,
          email: form.email,
          password: form.password
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful! Welcome back! 🎉");
        onLoginSuccess();
      } else {
        toast.success(
          "Registration successful! Verification email sent. Please check your inbox and verify your email."
        );
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      toast.error("Server not reachable. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Left Side - Brand Section */}
        <div className="auth-brand">
          <div className="brand-content">
            <div className="brand-icon">✈️</div>
            <h1>Trip Organizer</h1>
            <p>Your intelligent travel companion powered by Agentic AI</p>
            <div className="brand-features">
              <div className="feature-item">
                <span>🤖</span>
                <span>AI-Powered Planning</span>
              </div>
              <div className="feature-item">
                <span>⚡</span>
                <span>Real-time Adaptation</span>
              </div>
              <div className="feature-item">
                <span>💰</span>
                <span>Budget Optimization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="auth-form-container">
          <div className="auth-form-card">
            <div className="form-header">
              <h2>{isLogin ? "Welcome Back!" : "Create Account"}</h2>
              <p>
                {isLogin
                  ? "Sign in to continue your journey"
                  : "Join us and start planning your dream trips"}
              </p>
            </div>

            <div className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-icon">
                    <span className="icon">👤</span>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-icon">
                  <span className="icon">📧</span>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-icon">
                  <span className="icon">🔒</span>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              {isLogin && (
                <div className="forgot-password">
                  <a href="#">Forgot Password?</a>
                </div>
              )}

              <button
                className="auth-submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>{isLogin ? "Sign In" : "Create Account"}</>
                )}
              </button>

              <div className="auth-divider">
                <span>or</span>
              </div>

              <div className="social-login">
                <button className="social-btn google">
                  <span>G</span>
                  Continue with Google
                </button>
                <button className="social-btn facebook">
                  <span>f</span>
                  Continue with Facebook
                </button>
              </div>

              <div className="auth-switch">
                <p>
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button
                    className="switch-btn"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setForm({ name: "", email: "", password: "" });
                    }}
                    disabled={loading}
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
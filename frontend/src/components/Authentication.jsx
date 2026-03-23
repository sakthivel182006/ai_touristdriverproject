import React, { useState } from "react";
import { toast } from "react-toastify";

const Authentication = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = isLogin
      ? "http://localhost:5000/api/users/login"
      : "http://localhost:5000/api/users/register";

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
        return;
      }

      // 🔐 LOGIN FLOW
      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success("Login successful");
        onLoginSuccess();
      }
      // 📧 REGISTER FLOW (EMAIL VERIFICATION)
      else {
        toast.info(
          "Verification email sent. Please check your inbox and verify."
        );

        // switch to login screen
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
      }

    } catch (err) {
      toast.error("Server not reachable");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {!isLogin && (
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
      )}

      <br />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <br />

      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p
        style={{ cursor: "pointer", marginTop: "10px", color: "blue" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "New user? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default Authentication;

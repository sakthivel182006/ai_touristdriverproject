import React, { useState } from "react";
import { toast } from "react-toastify";

const About = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const checkEmailStatus = async () => {
    if (!email) {
      toast.error("Please enter email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/test/send-test-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Email Verification Status</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginRight: "10px"
        }}
      />

      <button onClick={checkEmailStatus} disabled={loading}>
        {loading ? "Checking..." : "Check"}
      </button>
    </div>
  );
};

export default About;

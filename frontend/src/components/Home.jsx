import React, { useState } from "react";
import { authFetch } from "../utils/authFetch.js";
import "./Home.css"; // We'll define styles in this CSS file

// Stable Unsplash image helper
const getImage = (query) =>
  `https://source.unsplash.com/featured/800x500/?${encodeURIComponent(query)}`;

const Home = () => {
  const [form, setForm] = useState({
    from: "",
    to: "",
    days: "",
    budget: ""
  });
  const [aiPlan, setAiPlan] = useState("");
  const [tripRequestId, setTripRequestId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  // These will be shown as images (demo-safe)
  const places = ["Agra", "Jaipur", "Hyderabad", "Bangalore", "Salem"];
  const hotels = [
    "OYO Rooms",
    "Treebo Hotels",
    "Lemon Tree Hotel",
    "Taj Hotel",
    "The Oberoi"
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // CREATE TRIP & GET AI PLAN
  const generatePlan = async () => {
    setLoading(true);
    try {
      const res = await authFetch("http://localhost:5000/api/trip/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: form.from,
          to: form.to,
          days: Number(form.days),
          budget: Number(form.budget)
        })
      });

      const data = await res.json();
      setAiPlan(data.aiPlan);
      setTripRequestId(data.tripRequestId);
      setShowPlan(true);
    } catch (err) {
      alert("Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  // CONFIRM FINAL PLAN
  const confirmPlan = async () => {
    await authFetch("http://localhost:5000/api/trip/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tripRequestId,
        finalPlan: aiPlan
      })
    });
    alert("✅ Trip saved successfully");
  };

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Trip Organizer – Agentic AI</h1>
          <p>
            Your intelligent travel assistant that plans, optimizes, and manages
            trips autonomously based on your preferences.
          </p>
          <button className="primary-btn" onClick={() => document.getElementById('plan-form').scrollIntoView({ behavior: 'smooth' })}>
            Plan My Trip
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about">
        <div className="container">
          <h2>What Does Our AI Do?</h2>
          <p>
            Our Agentic AI acts like a personal travel manager. It understands your
            goals, breaks them into tasks, makes decisions, and adapts plans in
            real-time.
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <div className="container">
          <h2>Key Capabilities</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🧭</div>
              <h3>Autonomous Trip Planning</h3>
              <p>
                AI generates complete itineraries including transport, stay, and
                activities without manual input.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Smart Scheduling</h3>
              <p>
                Automatically allocates time for travel, rest, sightseeing, and
                meals based on real-world constraints.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💸</div>
              <h3>Budget Optimization</h3>
              <p>
                Plans trips within your budget by comparing prices and selecting
                cost-effective options.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌦️</div>
              <h3>Real-Time Adaptation</h3>
              <p>
                Adjusts plans dynamically based on weather, delays, or user
                preference changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRIP PLANNER FORM */}
      <section id="plan-form" className="plan-form-section">
        <div className="container">
          <h2>Start Your Journey</h2>
          <div className="form-card">
            <div className="form-group">
              <input
                name="from"
                placeholder="From (City)"
                value={form.from}
                onChange={handleChange}
              />
              <input
                name="to"
                placeholder="To (Destination)"
                value={form.to}
                onChange={handleChange}
              />
              <input
                name="days"
                type="number"
                placeholder="Number of Days"
                value={form.days}
                onChange={handleChange}
              />
              <input
                name="budget"
                type="number"
                placeholder="Budget (₹)"
                value={form.budget}
                onChange={handleChange}
              />
              <button className="primary-btn" onClick={generatePlan} disabled={loading}>
                {loading ? "Planning..." : "Generate Travel Plan"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI PLAN OUTPUT */}
      {showPlan && aiPlan && (
        <section className="ai-plan-section">
          <div className="container">
            <div className="plan-header">
              <h2>🧠 AI Generated Travel Plan</h2>
              <button className="confirm-btn" onClick={confirmPlan}>
                ✅ Confirm & Save Trip
              </button>
            </div>
            <div className="ai-plan-content">
              <pre>{aiPlan}</pre>
            </div>

            {/* PLACES IMAGES */}
            <div className="media-section">
              <h3>📍 Famous Places</h3>
              <div className="image-grid">
                {places.map((place) => (
                  <div key={place} className="image-card">
                    <h4>{place}</h4>
                    <img
                      src={getImage(`${place} India tourism`)}
                      alt={place}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/800x500?text=Image+Unavailable";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* HOTEL IMAGES */}
            <div className="media-section">
              <h3>🏨 Hotel Brands</h3>
              <div className="image-grid">
                {hotels.map((hotel) => (
                  <div key={hotel} className="image-card">
                    <h4>{hotel}</h4>
                    <img
                      src={getImage(`${hotel} India hotel`)}
                      alt={hotel}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/800x500?text=Image+Unavailable";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Travel Smarter?</h2>
          <p>Let the AI handle planning while you enjoy the journey.</p>
          <button className="secondary-btn" onClick={() => document.getElementById('plan-form').scrollIntoView({ behavior: 'smooth' })}>
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
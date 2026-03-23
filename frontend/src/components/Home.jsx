import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      
      {/* HERO SECTION */}
      <section className="hero">
        <h1>Trip Organizer – Agentic AI</h1>
        <p>
          Your intelligent travel assistant that plans, optimizes, and manages
          trips autonomously based on your preferences.
        </p>
        <button className="primary-btn">Plan My Trip</button>
      </section>

      {/* ABOUT SECTION */}
      <section className="about">
        <h2>What Does Our AI Do?</h2>
        <p>
          Our Agentic AI acts like a personal travel manager. It understands your
          goals, breaks them into tasks, makes decisions, and adapts plans in
          real-time.
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Key Capabilities</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🧭 Autonomous Trip Planning</h3>
            <p>
              AI generates complete itineraries including transport, stay, and
              activities without manual input.
            </p>
          </div>

          <div className="feature-card">
            <h3>📅 Smart Scheduling</h3>
            <p>
              Automatically allocates time for travel, rest, sightseeing, and
              meals based on real-world constraints.
            </p>
          </div>

          <div className="feature-card">
            <h3>💸 Budget Optimization</h3>
            <p>
              Plans trips within your budget by comparing prices and selecting
              cost-effective options.
            </p>
          </div>

          <div className="feature-card">
            <h3>🌦️ Real-Time Adaptation</h3>
            <p>
              Adjusts plans dynamically based on weather, delays, or user
              preference changes.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="workflow">
        <h2>How It Works</h2>
        <ol>
          <li>User enters destination, budget, and dates</li>
          <li>AI understands intent and defines goals</li>
          <li>Agent breaks goals into tasks</li>
          <li>AI executes, evaluates, and refines the plan</li>
          <li>User receives a complete travel itinerary</li>
        </ol>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <h2>Ready to Travel Smarter?</h2>
        <p>Let the AI handle planning while you enjoy the journey.</p>
        <button className="secondary-btn">Get Started</button>
      </section>

    </div>
  );
};

export default Home;

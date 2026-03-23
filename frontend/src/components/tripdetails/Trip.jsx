import { useState } from "react";
import { authFetch } from "../../utils/authFetch.js";
import "./Trip.css";

// Stable Unsplash image helper
const getImage = (query) =>
  `https://source.unsplash.com/featured/800x500/?${encodeURIComponent(query)}`;

function Trip() {
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
      const res = await authFetch("https://ai-touristdriverprojectbackend.onrender.com/api/trip/create", {
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
      alert("Backend not reachable. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // CONFIRM FINAL PLAN
  const confirmPlan = async () => {
    try {
      await authFetch("https://ai-touristdriverprojectbackend.onrender.com/api/trip/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripRequestId,
          finalPlan: aiPlan
        })
      });
      alert("✅ Trip saved successfully!");
    } catch (err) {
      alert("Failed to save trip. Please try again.");
    }
  };

  return (
    <div className="trip-page">
      <div className="trip-container">
        {/* Header Section */}
        <div className="trip-header">
          <h1>🧳 Autonomous Trip Planning Agent</h1>
          <p>Let AI plan your perfect journey with intelligent recommendations</p>
        </div>

        {/* Input Form Section */}
        <div className="form-section">
          <div className="form-card">
            <h2>Tell us about your trip</h2>
            <div className="input-group">
              <div className="input-field">
                <label>📍 From</label>
                <input
                  name="from"
                  placeholder="Enter departure city"
                  value={form.from}
                  onChange={handleChange}
                />
              </div>
              <div className="input-field">
                <label>🎯 To</label>
                <input
                  name="to"
                  placeholder="Enter destination"
                  value={form.to}
                  onChange={handleChange}
                />
              </div>
              <div className="input-field">
                <label>📅 Days</label>
                <input
                  name="days"
                  type="number"
                  placeholder="Number of days"
                  value={form.days}
                  onChange={handleChange}
                />
              </div>
              <div className="input-field">
                <label>💰 Budget (₹)</label>
                <input
                  name="budget"
                  type="number"
                  placeholder="Your budget"
                  value={form.budget}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button 
              className="generate-btn" 
              onClick={generatePlan} 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Planning...
                </>
              ) : (
                "✨ Generate Travel Plan"
              )}
            </button>
          </div>
        </div>

        {/* AI Plan Display */}
        {showPlan && aiPlan && (
          <>
            <div className="plan-section">
              <div className="plan-header">
                <h2>🧠 AI Generated Travel Plan</h2>
                <button className="confirm-btn" onClick={confirmPlan}>
                  ✅ Confirm & Save Trip
                </button>
              </div>
              <div className="plan-content">
                <pre>{aiPlan}</pre>
              </div>
            </div>

            {/* Famous Places Section */}
            <div className="media-section">
              <h2>📍 Popular Destinations</h2>
              <div className="image-grid">
                {places.map((place) => (
                  <div key={place} className="place-card">
                    <div className="card-image">
                      <img
                        src={getImage(`${place} India tourism landmark`)}
                        alt={place}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/800x500?text=Image+Unavailable";
                        }}
                      />
                    </div>
                    <div className="card-content">
                      <h3>{place}</h3>
                      <p>Must-visit destination in India</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Brands Section */}
            <div className="media-section">
              <h2>🏨 Recommended Stays</h2>
              <div className="image-grid">
                {hotels.map((hotel) => (
                  <div key={hotel} className="hotel-card">
                    <div className="card-image">
                      <img
                        src={getImage(`${hotel} India hotel luxury`)}
                        alt={hotel}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/800x500?text=Image+Unavailable";
                        }}
                      />
                    </div>
                    <div className="card-content">
                      <h3>{hotel}</h3>
                      <p>Comfortable stay option</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Trip;
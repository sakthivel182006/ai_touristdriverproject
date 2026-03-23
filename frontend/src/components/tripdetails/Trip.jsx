import { useState } from "react";
import { authFetch } from "../../utils/authFetch.js";

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
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>🧳 Autonomous Trip Planning Agent</h2>

      {/* INPUT FORM */}
      <input name="from" placeholder="From" onChange={handleChange} />
      <br /><br />
      <input name="to" placeholder="To" onChange={handleChange} />
      <br /><br />
      <input
        name="days"
        type="number"
        placeholder="Number of Days"
        onChange={handleChange}
      />
      <br /><br />
      <input
        name="budget"
        type="number"
        placeholder="Budget (₹)"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={generatePlan}>
        {loading ? "Planning..." : "Generate Travel Plan"}
      </button>

      {/* AI RESPONSE */}
      {aiPlan && (
        <>
          <h3>🧠 AI Generated Travel Plan</h3>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#f5f5f5",
              padding: "15px",
              borderRadius: "8px"
            }}
          >
            {aiPlan}
          </pre>

          {/* PLACES IMAGES */}
          <h3>📍 Famous Places</h3>
          {places.map((place) => (
            <div key={place} style={{ marginBottom: "20px" }}>
              <h4>{place}</h4>
              <img
                src={getImage(`${place} India tourism`)}
                alt={place}
                loading="lazy"
                style={{ width: "100%", borderRadius: "8px" }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x500?text=Image+Unavailable";
                }}
              />
            </div>
          ))}

          {/* HOTEL IMAGES */}
          <h3>🏨 Hotel Brands</h3>
          {hotels.map((hotel) => (
            <div key={hotel} style={{ marginBottom: "20px" }}>
              <h4>{hotel}</h4>
              <img
                src={getImage(`${hotel} India hotel`)}
                alt={hotel}
                loading="lazy"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div>
          ))}

          <button onClick={confirmPlan}>
            ✅ Confirm & Save Trip
          </button>
        </>
      )}
    </div>
  );
}

export default Trip;

import { useState } from "react";

function userform() {
  // Form inputs
  const [form, setForm] = useState({
    from: "",
    to: "",
    days: "",
    budget: ""
  });

  // Agent response
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Send data to backend (initial + updates)
  const submitTrip = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/trip/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: form.from,
          to: form.to,
          days: Number(form.days),
          budget: Number(form.budget)
        })
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      alert("Backend not reachable");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🧳 Autonomous Trip Planning Agent</h2>

      {/* INPUT FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          name="from"
          placeholder="From"
          value={form.from}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="to"
          placeholder="To"
          value={form.to}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="days"
          type="number"
          placeholder="Number of days"
          value={form.days}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="budget"
          type="number"
          placeholder="Budget"
          value={form.budget}
          onChange={handleChange}
        />
        <br /><br />

        <button onClick={submitTrip}>
          {loading ? "Planning..." : "Generate / Update Plan"}
        </button>
      </div>

      {response && (
        <div>
          <h3>🧠 Agent Decision</h3>

          {response.prev && (
            <>
              <h4>Previous Plan</h4>
              <pre>{JSON.stringify(response.prev, null, 2)}</pre>
            </>
          )}

          <h4>Current Plan</h4>
          <pre>{JSON.stringify(response.current, null, 2)}</pre>

          <h4>Agent Explanation (Gemini)</h4>
          <p>{response.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default userform;

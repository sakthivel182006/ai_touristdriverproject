import React, { useState } from "react";
import axios from "axios";

const CrashPage = () => {
  const [values, setValues] = useState([]);

  const fetchValues = async () => {
    const res = await axios.get("http://localhost:5000/api/crash/generate");
    setValues(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Crash Game 1000 Rounds</h2>

      <button onClick={fetchValues}>Generate 1000 Values</button>

      <div style={{ marginTop: "20px", maxHeight: "400px", overflowY: "scroll" }}>
        {values.map((item) => (
          <div key={item._id}>
            Round {item.round} → {item.multiplier}x
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrashPage;

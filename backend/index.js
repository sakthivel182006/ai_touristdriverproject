import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tripRoutes from "./routes/tripRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import authCheckRoutes from "./routes/authCheckRoutes.js";

import crashRoutes from "./routes/crashRoutes.js";



dotenv.config();

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/trip", tripRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authCheckRoutes);

app.use("/api/crash", crashRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Hello Backend");
});

// ✅ START THE SERVER (THIS WAS MISSING)
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

connectDB();

import mongoose from "mongoose";

const crashSchema = new mongoose.Schema({
  round: Number,
  multiplier: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Crash", crashSchema);

import mongoose from "mongoose";

const TripRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    from: String,
    to: String,
    days: Number,
    budget: Number,
    status: { type: String, default: "DRAFT" }
  },
  { timestamps: true }
);

export default mongoose.model("TripRequest", TripRequestSchema);

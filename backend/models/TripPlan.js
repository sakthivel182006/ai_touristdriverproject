import mongoose from "mongoose";

const TripPlanSchema = new mongoose.Schema(
  {
    tripRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TripRequest",
      required: true
    },
    aiResponse: String,
    finalPlan: String
  },
  { timestamps: true }
);

export default mongoose.model("TripPlan", TripPlanSchema);

import TripRequest from "../models/TripRequest.js";
import TripPlan from "../models/TripPlan.js";
import { explainChange } from "../services/nvidiaPlanner.js";

export const createTrip = async (req, res) => {
  try {
    const { from, to, days, budget } = req.body;
    const userId = req.userId;

    const trip = await TripRequest.create({
      user: userId,
      from,
      to,
      days,
      budget
    });

    const aiPlan = await explainChange(null, { from, to, days, budget });

    await TripPlan.create({
      tripRequest: trip._id,
      aiResponse: aiPlan
    });

    res.json({ tripRequestId: trip._id, aiPlan });
  } catch {
    res.status(500).json({ message: "Trip generation failed" });
  }
};

export const confirmTrip = async (req, res) => {
  try {
    const { tripRequestId, finalPlan } = req.body;

    await TripRequest.findByIdAndUpdate(tripRequestId, {
      status: "CONFIRMED"
    });

    await TripPlan.findOneAndUpdate(
      { tripRequest: tripRequestId },
      { finalPlan }
    );

    res.json({ message: "Trip saved successfully" });
  } catch {
    res.status(500).json({ message: "Trip confirmation failed" });
  }
};

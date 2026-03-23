import express from "express";
import { createTrip, confirmTrip } from "../controllers/tripController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createTrip);
router.post("/confirm", authMiddleware, confirmTrip);

export default router;

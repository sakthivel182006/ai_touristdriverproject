import express from "express";
import { generateCrashValues } from "../controllers/crashController.js";

const router = express.Router();

router.get("/generate", generateCrashValues);

export default router;

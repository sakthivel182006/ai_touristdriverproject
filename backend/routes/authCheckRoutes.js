import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check", authMiddleware, (req, res) => {
  res.json({
    valid: true,
    userId: req.userId
  });
});

export default router;

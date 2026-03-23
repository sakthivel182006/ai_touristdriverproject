import crypto from "crypto";
import Crash from "../models/Crash.js";

export const generateCrashValues = async (req, res) => {
  try {
    const serverSeed = "myServerSecret";
    const clientSeed = "myClientSeed";

    const results = [];

    for (let i = 1; i <= 100; i++) {
      const hash = crypto
        .createHash("sha512")
        .update(serverSeed + clientSeed + i)
        .digest("hex");

      const hex = hash.substring(0, 13);
      const decimal = parseInt(hex, 16);
      const max = Math.pow(2, 52);
      const random = decimal / max;

      const multiplier = (1 / (1 - random)).toFixed(2);

      const crashData = await Crash.create({
        round: i,
        multiplier
      });

      results.push(crashData);
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

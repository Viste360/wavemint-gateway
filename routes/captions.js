import express from "express";
import { forward } from "../utils/forward.js";

const router = express.Router();
const CAP_URL = process.env.CAPTIONS_WORKER_URL;

router.post("/generate", async (req, res) => {
  try {
    const result = await forward(`${CAP_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    res.json(result);

  } catch (err) {
    console.error("Captions error:", err);
    res.status(500).json({ error: "captions_failed" });
  }
});

export default router;

import express from "express";
import { forward } from "../utils/forward.js";

const router = express.Router();

const FF_URL = process.env.FFMPEG_WORKER_URL;

router.post("/video", async (req, res) => {
  try {
    const response = await forward(`${FF_URL}/slice/video`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    res.json(response);
  } catch (err) {
    console.error("Slice error:", err);
    res.status(500).json({ error: "slice_failed" });
  }
});

export default router;

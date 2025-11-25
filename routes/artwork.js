import express from "express";
import { forward } from "../utils/forward.js";

const router = express.Router();
const AI_URL = process.env.AI_BACKEND_URL;

router.post("/generate", async (req, res) => {
  try {
    const output = await forward(`${AI_URL}/artwork/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    res.json(output);
  } catch (err) {
    res.status(500).json({ error: "artwork_failed" });
  }
});

export default router;

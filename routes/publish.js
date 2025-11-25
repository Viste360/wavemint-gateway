import express from "express";
import { forward } from "../utils/forward.js";

const router = express.Router();
const AI_URL = process.env.AI_BACKEND_URL;

router.post("/:platform", async (req, res) => {
  try {
    const result = await forward(`${AI_URL}/publish/${req.params.platform}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "publish_failed" });
  }
});

export default router;

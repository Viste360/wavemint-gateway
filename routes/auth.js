import express from "express";
import axios from "axios";

const router = express.Router();

// Forward login request to backend
router.post("/login", async (req, res) => {
  try {
    const backendUrl = process.env.BACKEND_URL + "/auth/login";

    const response = await axios.post(backendUrl, req.body, {
      headers: { "Content-Type": "application/json" },
    });

    return res.json(response.data);
  } catch (err) {
    console.error("AUTH ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Auth failed", details: err.message });
  }
});

export default router;

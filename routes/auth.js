import express from "express";
import axios from "axios";

const router = express.Router();

const BACKEND_URL = process.env.BACKEND_URL;

router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/login`,
      req.body,
      { headers: { "Content-Type": "application/json" } }
    );

    res.json(response.data);
  } catch (err) {
    console.log("❌ Gateway Login Error:", err.response?.data || err.message);
    res.status(400).json({
      error: "Login failed",
      detail: err.response?.data || err.message,
    });
  }
});

export default router;

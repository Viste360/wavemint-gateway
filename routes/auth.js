import express from "express";
import axios from "axios";

const router = express.Router();
const BACKEND_URL = process.env.BACKEND_URL;

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await axios.post(`${BACKEND_URL}/auth/login`, {
      email,
      password
    });

    return res.json(response.data);
  } catch (err) {
    console.error("Login error:", err?.response?.data || err.message);
    return res
      .status(err?.response?.status || 500)
      .json(err?.response?.data || { error: "Login failed" });
  }
});

export default router;

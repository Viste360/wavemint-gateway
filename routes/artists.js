import express from "express";
const router = express.Router();

router.post("/settings", async (req, res) => {
  res.json({ status: "Artist settings saved (placeholder)" });
});

router.get("/settings/:slug", async (req, res) => {
  res.json({ tokens: {} });
});

export default router;

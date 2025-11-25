import express from "express";
const router = express.Router();

router.post("/generate", async (req, res) => {
  res.json({ status: "Captions placeholder" });
});

export default router;

import express from "express";
const router = express.Router();

router.post("/generate", async (req, res) => {
  res.json({ status: "AI artwork placeholder" });
});

export default router;

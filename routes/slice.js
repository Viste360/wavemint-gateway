import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  res.json({ status: "Slice placeholder" });
});

export default router;

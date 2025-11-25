import express from "express";
const router = express.Router();

router.post("/:platform", async (req, res) => {
  res.json({ status: "Publish placeholder" });
});

router.get("/status/:clipId", async (req, res) => {
  res.json({ statuses: {} });
});

export default router;

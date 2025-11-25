import express from "express";
import cors from "cors";
import artistsRoute from "./routes/artists.js";
import artworkRoute from "./routes/artwork.js";
import captionsRoute from "./routes/captions.js";
import sliceRoute from "./routes/slice.js";
import publishRoute from "./routes/publish.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

// ───────────────────────────────────────
// Logging (helps A LOT during deployment)
// ───────────────────────────────────────

app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.url}`);
  next();
});

// ───────────────────────────────────────
// Routes
// ───────────────────────────────────────

app.use("/artists", artistsRoute);
app.use("/artwork", artworkRoute);
app.use("/captions", captionsRoute);
app.use("/slice", sliceRoute);
app.use("/publish", publishRoute);

// ───────────────────────────────────────
// Health check (Railway uses this)
// ───────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "Gateway OK" });
});

// ───────────────────────────────────────
// Start server
// ───────────────────────────────────────
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🌐 Wavemint Gateway running on port ${PORT}`);
});

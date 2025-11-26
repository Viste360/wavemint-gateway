import express from "express";
import cors from "cors";
import axios from "axios";

// Routes
import authRoute from "./routes/auth.js";
import artistsRoute from "./routes/artists.js";
import artworkRoute from "./routes/artwork.js";
import captionsRoute from "./routes/captions.js";
import sliceRoute from "./routes/slice.js";
import publishRoute from "./routes/publish.js";

const app = express();

// ───────────────────────────────────────
// CORS CONFIG (Vercel → Railway)
// ───────────────────────────────────────

const allowedOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(",")
  : ["*"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server
      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ CORS BLOCKED:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

// ───────────────────────────────────────
// Request Logging
// ───────────────────────────────────────
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.url}`);
  next();
});

// ───────────────────────────────────────
// API ROUTES
// ───────────────────────────────────────
app.use("/auth", authRoute);
app.use("/artists", artistsRoute);
app.use("/artwork", artworkRoute);
app.use("/captions", captionsRoute);
app.use("/slice", sliceRoute);
app.use("/publish", publishRoute);

// ───────────────────────────────────────
// HEALTH CHECK (Railway uses this)
// ───────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "Gateway OK" });
});

// ───────────────────────────────────────
// START SERVER
// ───────────────────────────────────────
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🌐 Wavemint Gateway running on port ${PORT}`);
});

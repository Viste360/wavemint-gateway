import express from "express";
import cors from "cors";

import authRoute from "./routes/auth.js";
import artistsRoute from "./routes/artists.js";
import artworkRoute from "./routes/artwork.js";
import captionsRoute from "./routes/captions.js";
import sliceRoute from "./routes/slice.js";
import publishRoute from "./routes/publish.js";

const app = express();

// ───────────────────────────────────────
// CORS — FINAL WORKING VERSION
// ───────────────────────────────────────

const allowedOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(",")
  : [];

console.log("Allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server + mobile apps

      console.log("Incoming Origin:", origin);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ BLOCKED BY CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Allow preflight (OPTIONS)
app.options("*", cors());

// ───────────────────────────────────────
// Body Parsing
// ───────────────────────────────────────

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

// Log every request
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.url}`);
  next();
});

// ───────────────────────────────────────
// ROUTES
// ───────────────────────────────────────

app.use("/auth", authRoute);
app.use("/artists", artistsRoute);
app.use("/artwork", artworkRoute);
app.use("/captions", captionsRoute);
app.use("/slice", sliceRoute);
app.use("/publish", publishRoute);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Gateway OK" });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🌐 Wavemint Gateway running on port ${PORT}`);
});


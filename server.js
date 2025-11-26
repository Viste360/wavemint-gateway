import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.js";
import artworkRoute from "./routes/artwork.js";
import captionsRoute from "./routes/captions.js";
import publishRoute from "./routes/publish.js";
import sliceRoute from "./routes/slice.js";

const app = express();

// =========================
//  FIXED CORS CONFIG
// =========================
const allowedOrigins = (process.env.ALLOWED_ORIGIN || "").split(",");

console.log("🚀 Allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

// Parse JSON
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/auth", authRoute);
app.use("/artwork", artworkRoute);
app.use("/captions", captionsRoute);
app.use("/publish", publishRoute);
app.use("/slice", sliceRoute);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Gateway OK" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🌐 Gateway running on port ${PORT}`));


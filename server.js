import express from "express";
import cors from "cors";

import authRoute from "./routes/auth.js";
import artworkRoute from "./routes/artwork.js";
import captionsRoute from "./routes/captions.js";
import publishRoute from "./routes/publish.js";
import sliceRoute from "./routes/slice.js";

const app = express();

// CORS
const allowedOrigin = process.env.ALLOWED_ORIGIN?.trim();
console.log("🚀 Allowed origin:", allowedOrigin);

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// Body parser
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

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🌐 Gateway running on ${PORT}`));

import express from "express";
import cors from "cors";

import uploadRoute from "./routes/upload.js";
import sliceRoute from "./routes/slice.js";
import captionsRoute from "./routes/captions.js";
import artworkRoute from "./routes/artwork.js";
import publishRoute from "./routes/publish.js";
import artistRoute from "./routes/artists.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/upload", uploadRoute);
app.use("/slice", sliceRoute);
app.use("/captions", captionsRoute);
app.use("/artwork", artworkRoute);
app.use("/publish", publishRoute);
app.use("/artists", artistRoute);

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log("Gateway running on port", PORT);
});

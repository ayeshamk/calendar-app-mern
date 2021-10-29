import express from "express";
import config from "dotenv";
config.config();
import mongoose from "mongoose";
import Cors from "cors";
import morgan from "morgan";

import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const connection_url = process.env.MONGO_URL || "";
const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(Cors());
app.use(morgan("dev"));

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("==== DATABASE CONNECTED ====");
  })
  .catch((err) => {
    throw err;
  });

app.use("/events/", eventRoutes);
app.use("/user/", userRoutes);
app.use("/auth/", authRoutes);
app.use("/rooms/", roomRoutes);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

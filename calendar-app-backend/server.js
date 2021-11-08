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
import orderRoutes from './routes/orderRoutes.js'

import Room from "./models/room.js";
import User from "./models/user.js";
import Order from "./models/order.js";

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

// (async () => {
//   let room = await Room.findById("61850aad6af1c2ae37b6f9e0");
//   let user = await User.findById("6179cbadbf9f184f0e0650f4");
//   const order1 = new Order({
//     room: room,
//     orderedBy: user,
//     orderAmount: room.price,
//     bookingStart: new Date("2014-03-23"),
//     bookingEnd: new Date("2014-03-26"),
//   });
//   try {
//     order1.save().catch((err) => {
//       console.log(err);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// })();

app.use("/events/", eventRoutes);
app.use("/user/", userRoutes);
app.use("/auth/", authRoutes);
app.use("/rooms/", roomRoutes);
app.use("/orders/", orderRoutes);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

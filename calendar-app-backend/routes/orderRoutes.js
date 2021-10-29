import express from "express";
import formidable from "express-formidable";
const Order = require("../models/Order");
const router = express.Router();

// middleware
import { requireSignin } from "../middlewares/index.js";
// controllers
import {
  userRoomBookings,
  isAlreadyBooked,
  newOrder,
  getOrder,
} from "../controllers/order.js";

router.post("", requireSignin, formidable(), newOrder);
router.get("/:id", requireSignin, getOrder);
router.get("/user-room-bookings", requireSignin, userRoomBookings);

export default router;

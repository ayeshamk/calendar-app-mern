import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// middleware
import { requireSignin } from "../middlewares/index.js";
// controllers
import {
  userRoomBookings,
  roomOrders,
  newOrder,
  getOrder,
  updateOrder
} from "../controllers/order.js";

router.post("/", requireSignin, newOrder);
router.get("/:id", requireSignin, getOrder);
router.patch("/:id", requireSignin, updateOrder);
router.get("/:id/room-orders", requireSignin, roomOrders);
router.get("/user-room-bookings", requireSignin, userRoomBookings);

export default router;

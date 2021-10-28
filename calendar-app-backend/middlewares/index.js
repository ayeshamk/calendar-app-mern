import expressJwt from "express-jwt";
import Room from "../models/room.js";
import config from 'dotenv'
config.config()

// req.user
export const requireSignin = expressJwt({
  // secret, expiryDate
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const roomOwner = async (req, res, next) => {
  let room = await Room.findById(req.params.roomId).exec();
  let owner = room.postedBy._id.toString() === req.user._id.toString();
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};

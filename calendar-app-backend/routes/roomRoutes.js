import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middleware
import { requireSignin, roomOwner } from "../middlewares/index.js";
// controllers
import {
  create,
  rooms,
  image,
  remove,
  read,
  update,
  isAlreadyBooked,
  searchListings,
} from "../controllers/room.js";

router.post("", requireSignin, formidable(), create);
router.get("", rooms);
router.get("/:roomId/image", image);
router.delete("/:roomId", requireSignin, roomOwner, remove);
router.get("/:roomId", read);
router.put(
  "/:roomId",
  requireSignin,
  roomOwner,
  formidable(),
  update
);
router.post("/search-listings", searchListings);
router.get("/is-already-booked/:roomId", requireSignin, isAlreadyBooked);


router.post("/comment/:id", requireSignin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
    comentor: req.user.name,
    comentorPic: req.user.image,
  };

  Rooms.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name  ")
    .populate("postedBy", "_id name ")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.post("/review/:id", requireSignin, (req, res) => {
  const review = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Rooms.findByIdAndUpdate(
    req.params.id,
    {
      $push: { reviews: review },
    },
    {
      new: true,
    }
  )
    .populate("reviews.postedBy", "_id name ")
    .populate("postedBy", "_id name ")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

export default router;

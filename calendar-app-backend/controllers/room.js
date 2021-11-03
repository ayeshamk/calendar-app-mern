import Room from "../models/room.js";
import fs from "fs";

export const create = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let room = new Room(fields);
    room.postedBy = req.user._id;
    // handle image
    if (files.image) {
      room.image.data = fs.readFileSync(files.image.path);
      room.image.contentType = files.image.type;
    }
    room.save((err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const rooms = async (req, res) => {
  // let all = await Room.find({ from: { $gte: new Date() } })
  let all = await Room.find({})
    .limit(25)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  // console.log(all);
  res.json(all);
};

export const image = async (req, res) => {
  let room = await Room.findById(req.params.roomId).exec();
  if (room && room.image && room.image.data !== null) {
    res.set("Content-Type", room.image.contentType);
    return res.send(room.image.data);
  }
};

export const isAlreadyBooked = async (req, res) => {
  const { roomId } = req.params;
  // find orders of the currently logged in user
  const userOrders = await Order.find({ orderedBy: req.user._id })
    .select("room")
    .exec();
  // check if room id is found in userOrders array
  let ids = [];
  for (let i = 0; i < userOrders.length; i++) {
    ids.push(userOrders[i].room.toString());
  }
  res.json({
    ok: ids.includes(roomId),
  });
};

export const remove = async (req, res) => {
  let removed = await Room.findByIdAndDelete(req.params.roomId)
    .select("-image.data")
    .exec();
  res.json(removed);
};

export const read = async (req, res) => {
  let room = await Room.findById(req.params.roomId)
    .populate("postedBy", "_id name")
    .select("-image.data")
    .exec();
  // console.log("SINGLE HOTEL", room);
  res.json(room);
};

export const update = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }

    let updated = await Room.findByIdAndUpdate(req.params.roomId, data, {
      new: true,
    }).select("-image.data");

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Room update failed. Try again.");
  }
};

export const searchListings = async (req, res) => {
  const { location, date, bed } = req.body;
  // console.log(location, date, bed);
  // console.log(date);
  const fromDate = date.split(",");
  // console.log(fromDate[0]);
  let result = await Room.find({
    from: { $gte: new Date(fromDate[0]) },
    location,
  })
    .select("-image.data")
    .exec();
  // console.log("SEARCH LISTINGS", result);
  res.json(result);
};

/**
 * if you want to be more specific
 let result = await Listing.find({
  from: { $gte: new Date() },
  to: { $lte: to },
  location,
  bed,
})
 */

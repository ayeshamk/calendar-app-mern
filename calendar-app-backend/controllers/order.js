import Order from "../models/order.js";

export const userRoomBookings = async (req, res) => {
  const all = await Order.find({ orderedBy: req.user._id })
    .select("session")
    .populate("room", "-image.data")
    .populate("orderedBy", "_id name")
    .exec();
  
  res.json(all);
};

export const roomOrders = async (req, res) => {
  const roomId = parseInt(req.params.id);
  console.log("----", roomId);
  const all = await Order.find({ orderedBy: req.user._id })
  .populate('room').exec();
  res.json(all);
};

export const getOrder = async (req, res) => {
  Order.find({ hostelId: req.params.id })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const newOrder = async (req, res) => {
  const { amount, roomId } = req.body;
  try {
    const newOrder = new Order({
      room: roomId,
      orderedBy: req.user._id,
      orderAmount: amount,
    });
    console.log(newOrder);
    newOrder.save();
    res.send("payment done");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

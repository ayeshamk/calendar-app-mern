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
  const roomId = req.params.id;
  console.log("----", roomId);
  const all = await Order.find({ room: roomId }).exec();
  res.status(200).json(all);
};

export const getOrder = async (req, res) => {
  Order.findById(req.params.id)
    .populate("orderedBy")
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const newOrder = async (req, res) => {
  const { title, start, end, amount, roomId, firstName, lastName } = req.body;
  try {
    const newOrder = await Order.create({
      title: title,
      firstName: firstName,
      lastName: lastName,
      room: roomId,
      orderedBy: req.user._id,
      orderAmount: amount,
      start: start,
      end: end,
    });
    res.send(newOrder);
  } catch (err) {
    console.log("-----err", err);
    return res.status(400).json(err);
  }
};

export const updateOrder = async (req, res) => {
  const { title, start, end, firstName, lastName, phoneNumber } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber
      },
      {
        runValidators: true
      }
    );

    res.send(order);
  } catch (err) {
    console.log("-----err", err);
    return res.status(400).json(err);
  }
};

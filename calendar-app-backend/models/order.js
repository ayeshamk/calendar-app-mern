import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    room: {
      type: ObjectId,
      ref: "Room",
    },
    session: {},
    orderedBy: { type: ObjectId, ref: "User" },
    orderAmount
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

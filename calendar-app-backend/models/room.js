import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
import Order from './order.js'

const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    content: {
      type: String,
      required: "Content is required",
      maxlength: 10000,
    },
    location: {
      type: String,
    },
    price: {
      type: Number,
      required: "Price is required",
      trim: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    comments: [
      {
        text: String,
        comentor: String,
        comentorPic: String,
        createdAt: { type: Date, default: Date.now },
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
    image: {
      data: Buffer,
      contentType: String,
    },
    bed: {
      type: Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);

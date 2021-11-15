import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
import Room from "./room.js";
import moment from "moment";

const orderSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "Firstname is required",
    },
    lastName: {
      type: String,
      required: "Lastname is required",
    },
    title: {
      type: String,
      required: "Title is required",
    },
    room: {
      type: ObjectId,
      ref: "Room",
    },
    orderedBy: { type: ObjectId, ref: "User" },
    orderAmount: Number,
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    allDay: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Validation to ensure a room cannot be double-booked
orderSchema.path("start").validate(function (value) {
  // Extract the Room Id from the query object
  const room = this.room;
  // Convert booking Date objects into a number value
  let newBookingStart = value.getTime();
  let newBookingEnd = this.end.getTime();
  if (newBookingStart > newBookingEnd) {
    throw new Error(
      `There is a clash with an existing booking from ${moment(
        newBookingStart
      ).format("LL")} to ${moment(newBookingEnd).format("LL")}`
    );
  }

  // Function to check for booking clash
  let clashesWithExisting = (
    existingBookingStart,
    existingBookingEnd,
    newBookingStart,
    newBookingEnd
  ) => {
    if (
      (newBookingStart >= existingBookingStart &&
        newBookingStart < existingBookingEnd) ||
      (existingBookingStart >= newBookingStart &&
        existingBookingStart < newBookingEnd)
    ) {
      throw new Error(
        `Booking could not be saved. There is a clash with an existing booking from ${moment(
          existingBookingStart
        ).format("HH:mm")} to ${moment(existingBookingEnd).format(
          "HH:mm on LL"
        )}`
      );
    }
    return false;
  };

  return mongoose.connection
    .model("Order")
    .find({ room: room })
    .then((orders) => {
      return orders.every((order) => {
        let existingBookingStart = new Date(order.start).getTime();
        let existingBookingEnd = new Date(order.end).getTime();
        // Check whether there is a clash between the new booking and the existing booking
        return !clashesWithExisting(
          existingBookingStart,
          existingBookingEnd,
          newBookingStart,
          newBookingEnd
        );
      });
    });
}, `{REASON}`);

export default mongoose.model("Order", orderSchema);

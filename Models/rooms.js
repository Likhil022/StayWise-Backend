import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    enum: ["single", "double", "suite"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: String,
    enum: ["available", "booked", "Maintenance"],
    default: "available",
  },
  ac: {
    type: Boolean,
    default: false,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  checkInDate: {
    type: Date,
  },
  checkOutDate: {
    type: Date,
  },
  totalPrice: {
    type: Number,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  bookingStatus: {
    type: String,
    enum: ["booked", "completed", "cancelled"],
    default: "booked",
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;

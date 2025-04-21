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
});

const Room = mongoose.model("Room", roomSchema);

export default Room;

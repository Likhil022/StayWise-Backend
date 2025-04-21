import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
  amenities: {
    type: [String],
    enum: [
      "free_wifi",
      "parking",
      "pool",
      "gym",
      "spa",
      "restaurant",
      "bar",
      "room_service",
      "laundry",
      "pet_friendly",
    ],
  },
});

export const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;

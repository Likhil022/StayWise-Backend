import { Booking } from "../Models/booking.js";
import { Room } from "../models/Room.js";
import { User } from "../Models/users.js";

export const createBooking = async (req, res) => {
  const { userId, roomId, checkInDate, checkOutDate } = req.body;
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    if (room.isAvailable !== "available") {
      return res.status(400).json({ message: "Room is not available" });
    }
    const booking = new Booking({
      userId,
      roomId,
      checkInDate,
      checkOutDate,
      totalPrice:
        (room.price * (new Date(checkOutDate) - new Date(checkInDate))) /
        (1000 * 60 * 60 * 24),
      status: "booked",
    });
    await booking.save();
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

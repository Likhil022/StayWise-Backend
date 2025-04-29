import Booking from "../Models/booking.js";
import Room from "../models/rooms.js";

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

export const getBooking = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.find({ userId }).populate("roomId");
    if (!bookings) {
      return res.status(404).json({ message: "No bookings found" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId").populate("roomId");
    if (!bookings) {
      return res.status(404).json({ message: "No bookings found" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get all bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = status;
    await booking.save();
    res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    console.error("Update booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await booking.remove();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getBookingById = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findById(bookingId)
      .populate("userId")
      .populate("roomId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Get booking by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRoomBookings = async (req, res) => {
  const { roomId } = req.params;
  try {
    const bookings = await Booking.find({ roomId }).populate("userId");
    if (!bookings) {
      return res.status(404).json({ message: "No bookings found" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get room bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

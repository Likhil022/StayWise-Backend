import express from "express";
import {
  createBooking,
  getBooking,
  getAllBookings,
  getBookingById,
  getRoomBookings,
  updateBooking,
  deleteBooking,
} from "../Controllers/booking.Controller.js";

import {
  isAuthenticated,
  isAdmin,
  isUser,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new booking (Receptionist/User)
router.post("/", isAuthenticated, isUser, createBooking);

// Get bookings of a specific user
router.get("/user/:userId", isAuthenticated, isUser, getBooking);

// Get all bookings (Admin)
router.get("/", isAuthenticated, isAdmin, getAllBookings);

// Get booking by ID
router.get("/:bookingId", isAuthenticated, getBookingById);

// Get all bookings for a specific room
router.get("/room/:roomId", isAuthenticated, isAdmin, getRoomBookings);

// Update booking status (Admin/Receptionist)
router.put("/:bookingId", isAuthenticated, isAdmin, updateBooking);

// Delete a booking (Admin/Receptionist)
router.delete("/:bookingId", isAuthenticated, isAdmin, deleteBooking);

export default router;

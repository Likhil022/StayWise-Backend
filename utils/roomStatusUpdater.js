import mongoose from "mongoose";
import Room from "../Models/room.js";
import Booking from "../Models/booking.js";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const today = new Date();

try {
  const expiredBookings = await Booking.find({
    checkOutDate: { $lt: today },
    status: "booked",
  });

  for (const booking of expiredBookings) {
    // 2. Mark booking as completed
    booking.status = "completed";
    await booking.save();

    const room = await Room.findById(booking.roomId);

    // Add one day for maintenance
    const nextDay = new Date(booking.checkOutDate);
    nextDay.setDate(nextDay.getDate() + 1);

    if (today < nextDay) {
      // Still in maintenance period
      room.status = "maintenance";
    } else {
      // Maintenance day passed, mark as available
      room.status = "available";
    }

    await room.save();
  }
  console.log(`✅ Processed ${expiredBookings.length} bookings`);
  process.exit();
} catch (error) {
  console.error("❌ Room status update failed:", error);
  process.exit(1);
}

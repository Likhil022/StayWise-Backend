import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//files imported
import connectDB from "./utils/db.js";
import authRoute from "./Routes/auth.routes.js";
import hotelRoute from "./Routes/hotel.routes.js";
import bookingRoute from "./Routes/booking.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5001;

//DB connection
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoute);
app.use("/api/hotel", hotelRoute);
app.use("/api/booking", bookingRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

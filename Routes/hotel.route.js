import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
} from "../Controllers/hotel.controller.js";

import {
  isAuthenticated,
  isAdmin,
  isUser,
} from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create", isAuthenticated, isAdmin, createHotel);

router.put("/update/:id", isAuthenticated, isAdmin, updateHotel);

router.delete("/delete/:id", isAuthenticated, isAdmin, deleteHotel);

router.get("/all", isAuthenticated, getAllHotels);

export default router;

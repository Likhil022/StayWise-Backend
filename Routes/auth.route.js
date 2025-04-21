import express from "express";
import dotenv from "dotenv";
dotenv.config();

import {
  regiterUser,
  loginUser,
  logoutUser,
} from "../Controllers/auth.controller.js";
import e from "express";

const router = express.Router();

// ✅ REGISTER
router.post("/register", regiterUser);

//login route
router.post("/login", loginUser);

//logout route
router.post("/logout", logoutUser);

export default router;

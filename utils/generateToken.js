import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const generateToken = (userId, role) => {
  dotenv.config();
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export default generateToken;

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const generateToken = (userId) => {
  dotenv.config();
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export default generateToken;

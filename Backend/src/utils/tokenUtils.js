import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (id) => {
  const payload = {
    user: {
      id: id,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

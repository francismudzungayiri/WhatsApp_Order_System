import pool from "../config/db.js";

import express from "express";
import { requireStrongPassword } from "../middleware/requireStrongPassword.js";

const router = express.Router();

router.post(
  "/register",
  requireStrongPassword({
    field: "password",
    getUserInputs: (req) => [req.body.email, req.body.username],
  }),
  async (req, res) => {
    // At this point:
    // - password is long enough
    // - password is not guessable
    // - password is not similar to user data

    res.json({ message: "User registered" });
  }
);

//login user

//register user
export const registerUser = async (req, res) => {
  const { name, email, confirm_password, password } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if ((!name && name.length >= 4) || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 10) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
};

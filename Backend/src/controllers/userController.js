import pool from "../config/db.js";
import bcrypt from "bcrypt";

//password hashing function
const hashPassword = async (password) => {
  const saltRoounds = 10; // Higher rounds = more secure but slower. 10 is standard.

  const hashedPassword = await bcrypt.hash(password, saltRoounds); // Generates salt and hashes in one go

  return hashedPassword;
};

// add a user
export const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

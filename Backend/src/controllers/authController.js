import bcrypt from "bcrypt";
import User from "../models/user.js";
import { generateToken } from "../utils/tokenUtils.js";

const SALT_ROUNDS = 12;

// REGISTER
export async function register(req, res) {
  const { name, email, password } = req.body;

  // 1. Validate input presence
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // 2. Check for existing user
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  // 3. Hash password
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // 4. Persist user
  const user = await User.createNewUser({
    name,
    email,
    passwordHash,
  });

  // 5. Respond with token
  const token = generateToken(user.id);
  return res.json({ token, message: "Login successful" });

  // // 5. Respond (NO token)
  // return res.status(201).json({
  //   message: "User registered successfully",
  //   user: {
  //     id: user.id,
  //     name: user.name,
  //     email: user.email,
  //   },
  // });
}

// LOGIN
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = await User.findByEmail(email);

  // Prevent user enumeration
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  // 5. Respond with token
  const token = generateToken(user.id);
  return res.json({ token, message: "Login successful" });

  // Auth success, but no session/token yet
  // return res.json({
  //   message: "Login successful",
  //   user: {
  //     id: user.id,
  //     email: user.email,
  //   },
  // });
}

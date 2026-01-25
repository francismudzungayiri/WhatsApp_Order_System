import express from "express";
import { requireStrongPassword } from "../middleware/requireStrongPassword.js";
import { register, login } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  requireStrongPassword({
    field: "password",
    getUserInputs: (req) => [req.body.email, req.body.username],
  }),
  register
);

authRouter.post("/login", login);

export default authRouter;

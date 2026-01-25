import { login, register } from "../controllers/authController.js";
import express from "express";

const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);

export default userRouter;

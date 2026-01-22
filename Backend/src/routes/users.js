import { addUser } from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();
userRouter.post("/", addUser);

export default userRouter;

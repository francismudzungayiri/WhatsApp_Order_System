import express from "express";
import {
  getAllOrders,
  addOrders,
  updateOrder,
  deleteOrder,
  getSingleOrder,
} from "../controllers/ordersController.js";

const router = express.Router();

router.get("/", getAllOrders);
router.post("/", addOrders);
router.get("/:id", getSingleOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;

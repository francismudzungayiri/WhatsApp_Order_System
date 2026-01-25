import express from "express";
import {
  getAllOrders,
  addOrders,
  updateOrder,
  deleteOrder,
  getSingleOrder,
} from "../controllers/ordersController.js";
import authorization from "../middleware/authorization.js";

const router = express.Router();

router.get("/", authorization, getAllOrders);
router.post("/", authorization, addOrders);
router.get("/:id", getSingleOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;

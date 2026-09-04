import express from "express";
import { protect } from "../middleware/auth.js";
import { authorize } from "../middleware/rolemiddleware.js";
import { placeOrder, getMyOrders, getOrderById, updateOrderStatus, getSellerOrders, getAllOrders, createRazorpayOrder, verifyPayment } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-razorpay-order", protect, authorize("user"), createRazorpayOrder);
router.post("/verify-payment", protect, authorize("user"), verifyPayment);
router.post("/", protect, authorize("user"), placeOrder);
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllOrders
);
router.get(
  "/seller",
  protect,
  authorize("seller"),
  getSellerOrders
);
router.get(
  "/my-orders",
  protect,
  authorize("user"),
  getMyOrders
);
router.get(
  "/:id",
  protect,
  getOrderById
);
router.put(
  "/:id/status",
  protect,
  authorize("seller"),
  updateOrderStatus
);


export default router;
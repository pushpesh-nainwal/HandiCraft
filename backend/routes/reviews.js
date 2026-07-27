import express from "express";
import { createReview,getProductReviews , updateReview,deleteReview} from "../controllers/reviewController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Create Review
// POST /api/reviews/:productId
router.post("/:productId", protect, createReview);
router.get("/:productId",getProductReviews);
router.put("/:reviewId", protect, updateReview);
router.delete("/:reviewId", protect, deleteReview);
export default router;
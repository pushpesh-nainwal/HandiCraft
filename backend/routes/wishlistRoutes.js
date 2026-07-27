import express from "express";
import { protect } from "../middleware/auth.js";
import { toggleWishlist ,getWishlist,removeFromWishlist} from "../controllers/wishlistController.js";

const router = express.Router();

router.post(
  "/:productId",
  protect,
  toggleWishlist
);
router.get(
    "/",
    protect,
    getWishlist
);
router.delete(
    "/:productId",
    protect,
    removeFromWishlist
);
export default router;
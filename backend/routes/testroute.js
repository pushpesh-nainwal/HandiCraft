import express from 'express';
import { protect } from "../middleware/auth.js";
import { authorize } from "../middleware/rolemiddleware.js";
const router = express.Router();
router.get("/admin-test", protect, authorize, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin",
        user: req.user
    });
});

export default router;
import express from 'express';
import { body, validationResult } from 'express-validator';
import { register, login, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      });
    }
    next();
  }
];

const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      });
    }
    next();
  }
];

// Routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', protect, getProfile);

export default router;

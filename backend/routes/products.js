import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware for creating/updating products
const validateProduct = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').isIn(['Home Decor', 'Jewelry', 'Clothing', 'Accessories', 'Art', 'Kitchen', 'Personal Care', 'Other'])
    .withMessage('Invalid category'),
  body('images').isArray({ min: 1 }).withMessage('At least one image is required'),
  body('ecoBadge').isIn(['Handmade', 'Organic', 'Recycled', 'Sustainable', 'Natural', 'Upcycled'])
    .withMessage('Invalid eco badge'),
  body('sellerName').trim().notEmpty().withMessage('Seller name is required'),
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
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);
router.post('/', protect, validateProduct, createProduct);
router.put('/:id', protect, validateProduct, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;

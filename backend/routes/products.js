import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getMyProducts
} from '../controllers/productController.js';
import { getUsers } from '../controllers/productController.js';
import { protect} from '../middleware/auth.js';
import { authorize } from '../middleware/rolemiddleware.js';
const router = express.Router();

// Validation middleware for creating/updating products
const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("section")
    .trim()
    .notEmpty()
    .withMessage("Section is required"),

  body("item")
    .trim()
    .notEmpty()
    .withMessage("Item is required"),

  body("categoryName")
    .trim()
    .notEmpty()
    .withMessage("Category name is required"),

  body("sectionName")
    .trim()
    .notEmpty()
    .withMessage("Section name is required"),

  body("itemName")
    .trim()
    .notEmpty()
    .withMessage("Item name is required"),

  body("images")
    .isArray({ min: 1 })
    .withMessage("At least one image is required"),

  body("images.*.url")
    .isURL()
    .withMessage("Invalid image URL"),

   body("images.*.fileId")
    .notEmpty()
    .withMessage("Image file ID is required"),

  body("ecoBadges")
    .isArray({ min: 1 })
    .withMessage("Select at least one eco badge"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be 0 or greater"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    next();
  },
];

// Routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get("/my-products",protect,authorize("seller"), getMyProducts);
router.get('/:id', getProductById);
router.post('/', protect,  authorize("seller", "admin"),validateProduct, createProduct);
router.put('/:id', protect,  authorize("seller", "admin"),validateProduct, updateProduct);
router.delete('/:id', protect,  authorize("seller", "admin"),deleteProduct);
router.get("/users",protect,authorize("admin"),getUsers);
export default router;

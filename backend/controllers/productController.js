import Product from '../models/Product.js';
import { errorHandler } from '../middleware/errorHandler.js';
import Category from "../models/Category.js";

// @desc    Get all products with filtering and search
// @route   GET /api/products
// @access  Public
// @desc    Get all products with filtering and search
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      section,
      item,
      ecoBadge,
    } = req.query;

    let query = {
      isActive: true,
    };

    // Search by product name
    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Category slug
    if (category) {
      query.category = category;
    }

    // Section slug
    if (section) {
      query.section = section;
    }

    // Item slug
    if (item) {
      query.item = item;
    }

    // Eco Badge
    if (ecoBadge) {
      query.ecoBadges = ecoBadge;
    }

   const products = await Product.find(query)
  .populate("seller", "name")
  .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
   const product = await Product.findById(req.params.id)
  .populate("seller", "name email");
    
    if (!product) {
      return errorHandler(404, 'Product not found');
    }
    
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (for now, will be admin only later)
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (for now, will be admin only later)
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return errorHandler(404, 'Product not found');
    }
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (for now, will be admin only later)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return errorHandler(404, 'Product not found');
    }
    
    await product.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories
// @route   GET /api/products/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1 });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

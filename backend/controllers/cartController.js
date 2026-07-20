import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { errorHandler } from "../middleware/errorHandler.js";

// POST /api/cart
export const addToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    // Check product exists
   const product = await Product.findOne({
  _id: productId,
  isActive: true,
});

if (!product) {
  return errorHandler(404, "Product not found");
}

if (product.stock <= 0) {
  return errorHandler(400, "Product is out of stock");
}
    // Find user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    // If cart doesn't exist
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      });
    } else {
      // Product already exists?
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({
          product: productId,
          quantity: 1,
        });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (err) {
    next(err);
  }
};
export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate({
  path: "items.product",
  match: { isActive: true },
  select: "name price images stock seller",
});

    res.status(200).json({
      success: true,
      cart: cart || { items: [] },
    });
  } catch (err) {
    next(err);
  }
};


export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    if (quantity < 1) {
      return errorHandler(400, "Quantity must be at least 1");
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return errorHandler(404, "Cart not found");
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return errorHandler(404, "Product not found in cart");
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });

  } catch (err) {
    next(err);
  }
};
export const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return errorHandler(404, "Cart not found");
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });

  } catch (err) {
    next(err);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return errorHandler(404, "Cart not found");
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });

  } catch (err) {
    next(err);
  }
};
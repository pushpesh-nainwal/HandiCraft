// controllers/orderController.js

import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { errorHandler } from "../middleware/errorHandler.js";

// =======================
// Customer - Place Order
// =======================

export const placeOrder = async (req, res, next) => {
  try {
    // Step 1 - Get User Cart
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    // Step 2 - Empty Cart Check
    if (!cart || cart.items.length === 0) {
      return next(errorHandler(400, "Cart is empty"));
    }

    const orderItems = [];
    let totalAmount = 0;

    // Step 3 - Prepare Order Items
    for (const item of cart.items) {
      const product = item.product;

      if (!product) {
        return next(errorHandler(404, "Product not found"));
      }

      if (!product.isActive) {
        return next(
          errorHandler(400, `${product.name} is unavailable`)
        );
      }

      if (product.stock < item.quantity) {
        return next(
          errorHandler(
            400,
            `Only ${product.stock} ${product.name} available`
          )
        );
      }

      orderItems.push({
        product: product._id,
        seller: product.seller,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;
    }

    // Step 4 - Create Order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
    });

    // Step 5 - Update Product Stock and Sold Count
    for (const item of cart.items) {
      const product = item.product;

      product.stock -= item.quantity;
      product.sold += item.quantity;

      await product.save();
    }

    // Step 6 - Clear Cart
    cart.items = [];
    await cart.save();

    // Populate response
    await order.populate([
      {
        path: "items.product",
        select: "name images",
      },
      {
        path: "user",
        select: "name email",
      },
    ]);

    // Step 7 - Response
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// =======================
// Customer - My Orders
// =======================

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.product", "name images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    next(err);
  }
};

// =======================
// Customer - Get Order
// =======================

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product")
      .populate("user", "name email");

    if (!order) {
      return next(errorHandler(404, "Order not found"));
    }

    // Normal user can only see their own orders
    if (
      req.user.role === "user" &&
      order.user._id.toString() !== req.user._id.toString()
    ) {
      return next(errorHandler(403, "Access denied"));
    }

    // Seller can only access an order containing their products
    if (req.user.role === "seller") {
      const isSellerInOrder = order.items.some(
        (item) =>
          item.seller.toString() === req.user._id.toString()
      );

      if (!isSellerInOrder) {
        return next(errorHandler(403, "Access denied"));
      }
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};

// =======================
// Seller - Update Order Status
// =======================

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(errorHandler(404, "Order not found"));
    }

    // Check whether this seller has a product in the order
    const isSellerInOrder = order.items.some(
      (item) =>
        item.seller.toString() === req.user._id.toString()
    );

    if (!isSellerInOrder) {
      return next(
        errorHandler(
          403,
          "You are not authorized to update this order"
        )
      );
    }

    const currentStatus = order.status;

    // Prevent invalid status transitions
    const allowedTransitions = {
      Pending: ["Processing", "Cancelled"],
      Processing: ["Shipped", "Cancelled"],
      Shipped: ["Delivered"],
      Delivered: [],
      Cancelled: [],
    };

    if (
      !allowedTransitions[currentStatus] ||
      !allowedTransitions[currentStatus].includes(status)
    ) {
      return next(
        errorHandler(
          400,
          `Cannot change order from ${currentStatus} to ${status}`
        )
      );
    }

    // ==============================
    // Handle Cancellation
    // ==============================

    if (status === "Cancelled") {
      /*
       * Only reverse the products belonging
       * to the seller making the cancellation.
       *
       * This is important because an order can
       * contain products from multiple sellers.
       */

      for (const item of order.items) {
        if (
          item.seller.toString() !== req.user._id.toString()
        ) {
          continue;
        }

        const product = await Product.findById(item.product);

        if (!product) {
          continue;
        }

        // Restore stock
        product.stock += item.quantity;

        // Reverse sold count safely
        product.sold = Math.max(
          0,
          product.sold - item.quantity
        );

        await product.save();
      }
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (err) {
    next(err);
  }
};

// =======================
// Seller - Get Orders
// =======================

export const getSellerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      "items.seller": req.user._id,
    })
      .populate("user", "name email")
      .populate("items.product", "name images")
      .sort({ createdAt: -1 });

    const sellerOrders = orders.map((order) => {
      const sellerItems = order.items.filter(
        (item) =>
          item.seller.toString() === req.user._id.toString()
      );

      return {
        _id: order._id,
        customer: order.user,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        items: sellerItems,
      };
    });

    res.status(200).json({
      success: true,
      count: sellerOrders.length,
      orders: sellerOrders,
    });
  } catch (err) {
    next(err);
  }
};

// =======================
// Admin - Get All Orders
// =======================

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name images")
      .populate("items.seller", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    next(err);
  }
};
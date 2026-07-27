// controllers/orderController.js

import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { errorHandler } from "../middleware/errorHandler.js";

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
                    errorHandler(
                        400,
                        `${product.name} is unavailable`
                    )
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

        // Step 5 - Update Product Stock
        for (const item of cart.items) {
            const product = item.product;

            product.stock -= item.quantity;
            product.sold += item.quantity;

            await product.save();
        }

        // Step 6 - Clear Cart
        cart.items = [];

        await cart.save();
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
export const getOrderById = async (req, res, next) => {

  try {

    const order = await Order.findById(req.params.id)
      .populate("items.product")
      .populate("user","name email");

    if (!order) {
      return errorHandler(404,"Order not found");
    }

    if (
      req.user.role === "user" &&
      order.user._id.toString() !== req.user._id.toString()
    ) {
      return errorHandler(403,"Access denied");
    }

    res.status(200).json({
      success:true,
      order,
    });

  } catch(err){
      next(err);
  }

};
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    
    if (!order) {
      return errorHandler(404, "Order not found");
    }
    const isSellerInOrder = order.items.some(
  (item) => item.seller.toString() === req.user._id.toString()
);

if (!isSellerInOrder) {
  return errorHandler(
    403,
    "You are not authorized to update this order"
  );
}
    
    const currentStatus = order.status;

    const allowedTransitions = {
      Pending: ["Processing", "Cancelled"],
      Processing: ["Shipped"],
      Shipped: ["Delivered"],
      Delivered: [],
      Cancelled: [],
    };

    if (!allowedTransitions[currentStatus].includes(status)) {
      return errorHandler(
        400,
        `Cannot change order from ${currentStatus} to ${status}`
      );
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

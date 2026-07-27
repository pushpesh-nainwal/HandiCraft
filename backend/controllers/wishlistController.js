import Wishlist from "../models/Wishlist.js";
export const toggleWishlist = async (req, res, next) => {
  try {

    const { productId } = req.params;

    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    const exists = wishlist.products.some(
      (id) => id.toString() === productId
    );

    if (exists) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
    } else {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    res.status(200).json({
      success: true,
      wishlisted: !exists,
      wishlist,
    });

  } catch (err) {
    next(err);
  }
};

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.user._id,
    }).populate({
      path: "products",
      populate: {
        path: "seller",
        select: "name",
      },
    });

    res.status(200).json({
      success: true,
      products: wishlist ? wishlist.products : [],
    });

  } catch (err) {
    next(err);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {

    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });

  } catch (err) {
    next(err);
  }
};
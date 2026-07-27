import Review from "../models/Review.js";
import Product from "../models/Product.js";

// Helper function to update product rating
const updateProductRating = async (productId) => {
    const reviews = await Review.find({
        product: productId,
    });

    const numReviews = reviews.length;

    const averageRating =
        numReviews === 0
            ? 0
            : reviews.reduce(
                  (sum, review) => sum + review.rating,
                  0
              ) / numReviews;

    await Product.findByIdAndUpdate(productId, {
        averageRating,
        numReviews,
    });
};

// Create Review
export const createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const productId = req.params.productId;

        const alreadyReviewed = await Review.findOne({
            user: req.user.id,
            product: productId,
        });

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product.",
            });
        }

        const review = await Review.create({
            user: req.user.id,
            product: productId,
            rating,
            comment,
        });

        await updateProductRating(productId);

        res.status(201).json({
            success: true,
            review,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();

    await updateProductRating(review.product);

    res.status(200).json({
      success: true,
      review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const productId = review.product;

    await review.deleteOne();

    await updateProductRating(productId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
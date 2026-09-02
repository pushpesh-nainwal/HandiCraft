import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../../services/reviewService";

import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

const ReviewSection = ({ product }) => {
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [editingReview, setEditingReview] = useState(null);

  // Fetch reviews whenever the product changes
  useEffect(() => {
    if (product?._id) {
      fetchReviews();
    }
  }, [product?._id]);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const data = await getReviews(product._id);

      setReviews(data.reviews);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create or update review
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingReview) {
        await updateReview(editingReview._id, {
          rating,
          comment,
        });
      } else {
        await createReview(product._id, {
          rating,
          comment,
        });
      }

      setRating(5);
      setComment("");
      setEditingReview(null);

      fetchReviews();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // Load review into the form for editing
  const handleEdit = (review) => {
    setEditingReview(review);

    setRating(review.rating);
    setComment(review.comment);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  // Delete review
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await deleteReview(reviewId);

      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8 text-[#2E2016]">
        Customer Reviews
      </h2>

      <div className="bg-white rounded-lg shadow p-6 mb-8 border border-[#E6DBC8]">
        <h3 className="text-2xl font-bold text-[#2E2016]">
          ⭐ {product.averageRating.toFixed(1)}
        </h3>

        <p className="text-[#7A6A58] mt-2">{product.numReviews} Reviews</p>
      </div>

      {user && (
        <ReviewForm
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          editing={editingReview}
          onSubmit={handleSubmit}
        />
      )}

      <div className="mt-8 space-y-5">
        {loading ? (
          <p className="text-[#7A6A58]">Loading Reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-[#7A6A58]">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              currentUser={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;

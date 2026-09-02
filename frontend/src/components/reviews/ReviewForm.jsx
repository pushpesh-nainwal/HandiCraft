import { Star } from "lucide-react";

const ReviewForm = ({
  rating,
  setRating,
  comment,
  setComment,
  editing,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-lg shadow p-6 border border-[#E6DBC8]"
    >
      <h2 className="text-xl font-semibold mb-4 text-[#2E2016]">
        {editing ? "Edit Review" : "Write a Review"}
      </h2>

      <div className="flex gap-1 mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={28}
            onClick={() => setRating(star)}
            className={`cursor-pointer ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <textarea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border border-[#E6DBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
        placeholder="Share your experience..."
      />

      <button className="mt-5 bg-[#A8572E] text-white px-6 py-2 rounded-lg hover:bg-[#8E4525] transition-colors">
        {editing ? "Update Review" : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;

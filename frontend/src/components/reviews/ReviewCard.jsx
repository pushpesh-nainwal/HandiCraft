import { Star } from "lucide-react";

const ReviewCard = ({ review, currentUser, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{review.user.name}</h3>

          <div className="flex mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className={
                  star <= review.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>

        <span className="text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="mt-4 text-gray-700">{review.comment}</p>

      {currentUser && currentUser.id === review.user._id && (
        <div className="flex gap-3 mt-4">
          <button onClick={() => onEdit(review)} className="text-blue-600">
            Edit
          </button>

          <button onClick={() => onDelete(review._id)} className="text-red-600">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;

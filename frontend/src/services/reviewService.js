import api from "../utils/api";

export const getReviews = async (productId) => {
  const response = await api.get(`/reviews/${productId}`);
  return response.data;
};

export const createReview = async (productId, reviewData) => {
  const response = await api.post(
    `/reviews/${productId}`,
    reviewData
  );
  return response.data;
};

export const updateReview = async (reviewId, reviewData) => {
  const response = await api.put(
    `/reviews/${reviewId}`,
    reviewData
  );
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await api.delete(
    `/reviews/${reviewId}`
  );
  return response.data;
};
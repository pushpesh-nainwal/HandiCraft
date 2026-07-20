import api from "../utils/api";

// Get Cart
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// Add Product
export const addToCart = async (productId) => {
  const response = await api.post("/cart", { productId });
  return response.data;
};

// Update Quantity
export const updateCart = async (productId, quantity) => {
  const response = await api.put(`/cart/${productId}`, {
    quantity,
  });

  return response.data;
};

// Remove Item
export const removeFromCart = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data;
};

// Clear Cart
export const clearCart = async () => {
  const response = await api.delete("/cart");
  return response.data;
};
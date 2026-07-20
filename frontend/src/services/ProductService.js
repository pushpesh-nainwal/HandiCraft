import api from "../utils/api";

// =========================
// Seller APIs
// =========================

export const getMyProducts = async () => {
  const response = await api.get("/products/my-products");
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// =========================
// Public APIs
// =========================

export const getCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
import api from "../utils/api";

// =======================
// Customer APIs
// =======================

export const createRazorpayOrder = async () => {
  const response = await api.post("/orders/create-razorpay-order");
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post("/orders/verify-payment", paymentData);
  return response.data;
};

export const placeOrder = async () => {
  const response = await api.post("/orders");
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// =======================
// Seller APIs
// =======================

export const getSellerOrders = async () => {
  const response = await api.get("/orders/seller");
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}/status`, {
    status,
  });

  return response.data;
};

// =======================
// Admin APIs
// =======================

export const getAllOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};
import api from "../utils/api";

export const sendOTP = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

export const verifyOTP = async (email, otp) => {
  const response = await api.post("/auth/verify-otp", { email, otp });
  return response.data;
};

export const resetPassword = async (email, newPassword) => {
  const response = await api.post("/auth/reset-password", { email, newPassword });
  return response.data;
};

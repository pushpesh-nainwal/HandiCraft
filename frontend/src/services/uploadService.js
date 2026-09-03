import api from "../utils/api";

export const getImageKitAuth = async () => {
  const response = await api.get("/uploads/auth");
  return response.data;
};
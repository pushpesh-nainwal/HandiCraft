// In-memory OTP storage with expiration
const otpStore = new Map();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const storeOTP = (email, otp) => {
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  otpStore.set(email, { otp, expiresAt });
};

const verifyOTP = (email, otp) => {
  const storedData = otpStore.get(email);
  if (!storedData) return false;
  
  if (Date.now() > storedData.expiresAt) {
    otpStore.delete(email);
    return false;
  }
  
  if (storedData.otp !== otp) return false;
  
  otpStore.delete(email);
  return true;
};

const clearOTP = (email) => {
  otpStore.delete(email);
};

export { generateOTP, storeOTP, verifyOTP, clearOTP };

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { resetPassword } from "../services/authService";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email, formData.newPassword);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF3E8] to-[#F3E9DA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link
            to="/login"
            className="inline-flex items-center text-[#A8572E] hover:text-[#8E4525] mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Login
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2E2016]">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-[#7A6A58]">
            Enter your new password
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              Password reset successfully! Redirecting to login...
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-[#4A3B2C]"
              >
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-[#E6DBC8] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#4A3B2C]"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-[#E6DBC8] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#A8572E] hover:bg-[#8E4525] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A8572E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

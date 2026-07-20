import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SellerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "seller") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SellerRoute;

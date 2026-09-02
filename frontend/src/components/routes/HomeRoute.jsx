import { useAuth } from "../../context/AuthContext";
import Home from "../../pages/Home";
import SellerDashboard from "../../pages/seller/SellerDashboard";

const HomeRoute = () => {
  const { user, loading } = useAuth();

  // Wait until the token is checked and user is restored
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Seller → Seller homepage
  if (user?.role === "seller") {
    return <SellerDashboard />;
  }

  // Everyone else → normal homepage
  return <Home />;
};

export default HomeRoute;

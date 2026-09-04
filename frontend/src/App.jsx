import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Cart from "./pages/Cart";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import SellerRoute from "./components/routes/SellerRoute";

import HomeRoute from "./components/routes/HomeRoute";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/Orders";

import SellerDashboard from "./pages/seller/SellerDashboard";
import MyProducts from "./pages/seller/MyProducts";
import AddProduct from "./pages/seller/AddProduct";
import Orders from "./pages/seller/Orders";
import Analytics from "./pages/seller/Analytics";
import EditProduct from "./pages/seller/EditProduct";

function App() {
  return (
    <Router>
      <Routes>
        {/* ================= USER / SELLER LAYOUT ================= */}
        <Route element={<UserLayout />}>
          {/* Public / Buyer */}
          <Route path="/" element={<HomeRoute />} />

          <Route path="/products" element={<Products />} />

          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/verify-otp" element={<VerifyOTP />} />

          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route path="/wishlist" element={<Wishlist />} />

          {/* ================= SELLER ================= */}

          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/products"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <MyProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/products/add"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/products/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <SellerRoute>
                  <EditProduct />
                </SellerRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/orders"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/analytics"
            element={
              <ProtectedRoute allowedRoles={["seller"]}>
                <Analytics />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ================= ADMIN ================= */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

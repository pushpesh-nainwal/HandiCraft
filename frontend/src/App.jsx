import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import SellerLayout from "./layouts/SellerLayout";

import Cart from "./pages/Cart";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import SellerRoute from "./components/routes/SellerRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";

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
        {/* Public/User Layout */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
        </Route>

        {/* Admin */}
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

        {/* Seller */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<MyProducts />} />
          <Route path="/seller/products/add" element={<AddProduct />} />
          <Route
            path="/seller/products/edit/:id"
            element={
              <SellerRoute>
                <EditProduct />
              </SellerRoute>
            }
          />
          <Route path="/seller/orders" element={<Orders />} />
          <Route path="/seller/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

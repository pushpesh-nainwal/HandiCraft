import { useEffect, useState } from "react";
import api from "../../utils/api";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  ShoppingCart,
  LogOut,
  Package,
  PlusCircle,
  ClipboardList,
  BarChart3,
} from "lucide-react";

import NavItem from "./NavItem";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const [categories, setCategories] = useState([]);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      setCategories(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const isSeller = user?.role === "seller";

  return (
    <nav className="bg-[#fff] sticky top-0 z-50 border-b border-[#E6DBC8]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= TOP NAVBAR ================= */}
        <div className="flex justify-between items-center h-[72px] gap-8">
          {/* Logo */}
          <Link to={user?.role === "seller" ? "/seller/dashboard" : "/"}>
            <img
              src={logo}
              alt="HandiCraft Logo"
              className="h-35 w-40 object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="w-full p-[2px] bg-[#D8CCBB] rounded-full">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={
                    isSeller
                      ? "Search your products..."
                      : "Seek unique, handcrafted pieces..."
                  }
                  className="w-full pl-11 pr-4 py-2.5 bg-[#FBF7F0] rounded-full text-[13.5px] text-[#2E2016] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E] placeholder:text-[#9C8D7B] transition-all"
                />

                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9C8D7B]" />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-5 shrink-0">
            {!isSeller && (
              <Link
                to="/products"
                className="hidden sm:inline text-[13.5px] font-medium tracking-wide text-[#4A3B2C] hover:text-[#A8572E] transition-colors"
              >
                Products
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-5">
                {/* Cart only for buyers */}
                {!isSeller && (
                  <Link
                    to="/cart"
                    className="relative text-[#4A3B2C] hover:text-[#A8572E] transition-colors"
                  >
                    <ShoppingCart
                      className="h-[22px] w-[22px]"
                      strokeWidth={1.75}
                    />
                  </Link>
                )}

                <ProfileDropdown />

                <button
                  onClick={handleLogout}
                  className="flex items-center text-[#8F8175] hover:text-[#B3432B] transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-[13.5px] font-medium tracking-wide text-[#4A3B2C] hover:text-[#A8572E] transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-[#2E2016] text-[#FBF7F0] text-[13.5px] font-medium tracking-wide px-5 py-2.5 rounded-full hover:bg-[#A8572E] transition-colors duration-250"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* CONDITIONAL SECOND NAVBAR */}
        {/* ================================================= */}

        <div className="hidden lg:flex items-center justify-center gap-2 h-14 border-t border-[#E6DBC8]">
          {isSeller ? (
            /* ================= SELLER NAVBAR ================= */
            <>
              <Link
                to="/seller/products"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[13.5px] font-medium tracking-wide text-[#4A3B2C] hover:text-[#FDFAF4] hover:bg-[#A8572E] transition-colors"
              >
                <Package size={16} />
                My Products
              </Link>

              <Link
                to="/seller/products/add"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[13.5px] font-medium tracking-wide text-[#4A3B2C] hover:text-[#FDFAF4] hover:bg-[#A8572E] transition-colors"
              >
                <PlusCircle size={16} />
                Add Product
              </Link>

              <Link
                to="/seller/orders"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[13.5px] font-medium tracking-wide text-[#4A3B2C] hover:text-[#FDFAF4] hover:bg-[#A8572E] transition-colors"
              >
                <ClipboardList size={16} />
                Orders
              </Link>

              <Link
                to="/seller/analytics"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[13.5px] font-medium tracking-wide text-[#4A3B2C] hover:text-[#FDFAF4] hover:bg-[#A8572E] transition-colors"
              >
                <BarChart3 size={16} />
                Analytics
              </Link>
            </>
          ) : (
            /* ================= BUYER CATEGORY NAVBAR ================= */
            categories.map((category) => (
              <NavItem key={category.title} category={category} />
            ))
          )}
        </div>

        {/* ================= MOBILE SEARCH ================= */}

        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder={
                isSeller
                  ? "Search your products..."
                  : "Seek unique, handcrafted pieces..."
              }
              className="w-full pl-11 pr-4 py-2.5 bg-[#FFFFFF] border border-[#E6DBC8] rounded-full text-[13.5px] text-[#2E2016] focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E] placeholder:text-[#9C8D7B]"
            />

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9C8D7B]" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

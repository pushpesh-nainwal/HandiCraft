import { useEffect, useState } from "react";
import api from "../../utils/api";

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Leaf, Search, ShoppingCart, User, LogOut } from 'lucide-react';
import NavItem from "./NavItem";

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
    console.error(error);
  }
};
  return (
    <nav className="bg-[#F3ECE2] shadow-sm sticky top-0 z-50 border-b border-[#DED4C7]">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-[#8FA77A]" />
           <span className="text-2xl font-bold text-[#4D3B2F] tracking-wide">GreenCraft</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Hand made products..."
                className="w-full pl-10 pr-4 py-2 bg-[#FFFCF8] border border-[#DED4C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] placeholder:text-[#8F8175]"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#8F8175]" />
            </div>
          </div>
          

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/products"
              className="text-[#5E5348] hover:text-[#8B5E3C] font-medium transition-colors"
            >
              Products
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/cart"
                 className="relative text-[#5E5348] hover:text-[#8B5E3C] transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-6 w-6 text-[#5E5348]" />
                  <span className="text-[#5E5348] font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-[#5E5348] hover:text-[#8B5E3C] font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#8B5E3C] text-white px-4 py-2 rounded-lg hover:bg-[#6E472A] transition-colors font-medium shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ================= Category Navbar ================= */}
<div className="hidden lg:flex items-center justify-center gap-10 h-12 border-t border-[#DED4C7] bg-[#F8F5EF]">

  

  {categories.map((category) => (
    <NavItem
      key={category.name}
      category={category}
    />
  ))}

</div>



        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-[#FFFCF8] border border-[#DED4C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] placeholder:text-[#8F8175]"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#8F8175]" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

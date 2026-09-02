import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[#4A3B2C] hover:text-[#A8572E] transition-colors"
      >
        <User size={18} />

        <span className="hidden sm:block">{user?.name}</span>

        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
          {/* Header */}
          <div className="px-5 py-4 border-b">
            <h3 className="font-semibold text-gray-800">{user?.name}</h3>

            <p className="text-sm text-gray-500 truncate">{user?.email}</p>

            {user?.role && (
              <p className="text-xs text-[#A8572E] mt-1 capitalize">
                {user.role}
              </p>
            )}
          </div>

          {/* Admin Dashboard */}
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-blue-50 text-gray-700 transition"
            >
              ⚙️
              <span>Admin Dashboard</span>
            </Link>
          )}

          {/* Divider */}
          <div className="border-t" />

          {/* Profile */}
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
          >
            <User size={18} />
            <span>My Profile</span>
          </Link>

          {/* Orders */}
          <Link
            to={user?.role === "seller" ? "/seller/orders" : "/orders"}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
          >
            📦
            <span>
              {user?.role === "seller" ? "Seller Orders" : "My Orders"}
            </span>
          </Link>

          {/* Wishlist - buyer only */}
          {user?.role !== "seller" && (
            <Link
              to="/wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
            >
              ❤️
              <span>Wishlist</span>
            </Link>
          )}

          <div className="border-t" />

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

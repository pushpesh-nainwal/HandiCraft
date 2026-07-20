import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingCart,
  BarChart3,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/seller/dashboard",
  },
  {
    title: "My Products",
    icon: Package,
    path: "/seller/products",
  },
  {
    title: "Add Product",
    icon: PlusCircle,
    path: "/seller/products/add",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    path: "/seller/orders",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/seller/analytics",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-green-700">Seller Panel</h1>
      </div>

      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 transition ${
                  isActive
                    ? "bg-green-100 text-green-700 font-semibold border-r-4 border-green-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      <div className="absolute bottom-5 left-0 w-full px-6">
        <button className="flex items-center gap-3 text-red-600 hover:text-red-700">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

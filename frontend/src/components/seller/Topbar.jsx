import { Bell, UserCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Seller Dashboard</h2>
        <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-600 hover:text-green-600">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-2">
          <UserCircle size={34} className="text-green-700" />
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

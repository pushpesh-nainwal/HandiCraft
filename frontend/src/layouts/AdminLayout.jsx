import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen">
      <h2 className="bg-gray-900 text-white p-4">Admin Panel</h2>

      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

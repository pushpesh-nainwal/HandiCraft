import { Outlet } from "react-router-dom";
import Sidebar from "../components/seller/Sidebar";
import Topbar from "../components/seller/Topbar";

const SellerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;

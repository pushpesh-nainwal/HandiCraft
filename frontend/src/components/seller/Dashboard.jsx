import DashboardCard from "../../components/seller/DashboardCard";
import { Package, ShoppingCart, IndianRupee, Star } from "lucide-react";

const Dashboard = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-[#2E2016]">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard title="Total Products" value="0" icon={Package} />

        <DashboardCard title="Orders" value="0" icon={ShoppingCart} />

        <DashboardCard title="Revenue" value="₹0" icon={IndianRupee} />

        <DashboardCard title="Average Rating" value="0.0" icon={Star} />
      </div>
    </>
  );
};

export default Dashboard;

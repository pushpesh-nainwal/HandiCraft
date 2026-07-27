import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/orderService";
import OrderCard from "../../components/admin/OrderCard";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => <OrderCard key={order._id} order={order} />)
      )}
    </div>
  );
};

export default AdminOrders;

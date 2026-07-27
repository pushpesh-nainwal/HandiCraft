import { useEffect, useState } from "react";
import OrderCard from "../components/orders/OrderCard";
import { getMyOrders } from "../services/orderService";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();

      setOrders(data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

export default MyOrders;

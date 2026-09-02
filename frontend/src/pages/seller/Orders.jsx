import { useEffect, useState } from "react";

import { getSellerOrders } from "../../services/orderService";

import SellerOrderCard from "../../components/seller/SellerOrderCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getSellerOrders();

      setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-[#7A6A58]">Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-[#2E2016]">Seller Orders</h1>

      {orders.map((order) => (
        <SellerOrderCard key={order._id} order={order} refresh={fetchOrders} />
      ))}
    </div>
  );
};

export default Orders;

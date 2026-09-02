import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOrderById } from "../services/orderService";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(id);
      setOrder(data.order);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-medium">Loading...</div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-red-600">Order not found</h2>
      </div>
    );
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-[#F3E8D6] text-[#8C6B2E]";

      case "Processing":
        return "bg-[#FFF1D6] text-[#A96816]";

      case "Shipped":
        return "bg-[#E8EEF8] text-[#46658E]";

      case "Delivered":
        return "bg-[#E8F1E5] text-[#54724A]";

      case "Cancelled":
        return "bg-[#F8E8E8] text-[#8E4646]";

      default:
        return "bg-[#F3ECE1] text-[#4A3B2C]";
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#2E2016]">
          Order #{order._id.slice(-6)}
        </h1>

        <p className="text-[#7A6A58] mt-2">
          Placed on {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Status */}
      <div className="mt-6 bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-3">Order Status</h2>

        <span className={`${getStatusColor(order.status)} px-4 py-2 rounded`}>
          {order.status}
        </span>
      </div>

      {/* Order Items */}
      <div className="mt-8 bg-white rounded-xl shadow overflow-hidden">
        {order.items.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between items-center p-6 border-b last:border-b-0"
          >
            <div className="flex gap-5 items-center">
              <img
                src={item.product.images?.[0]}
                alt={item.product.name}
                className="w-24 h-24 rounded-lg object-cover"
              />

              <div>
                <h2 className="font-semibold text-lg text-[#2E2016]">
                  {item.product.name}
                </h2>

                <p className="text-[#7A6A58]">Qty: {item.quantity}</p>

                <p className="text-[#7C8B65] font-medium">₹{item.price}</p>
              </div>
            </div>

            <p className="font-semibold text-lg text-[#2E2016]">
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#2E2016]">Total</h2>

          <h2 className="text-2xl font-bold text-[#A8572E]">
            ₹{order.totalAmount}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

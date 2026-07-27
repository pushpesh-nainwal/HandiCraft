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
        return "bg-yellow-100 text-yellow-800";

      case "Processing":
        return "bg-blue-100 text-blue-800";

      case "Shipped":
        return "bg-purple-100 text-purple-800";

      case "Delivered":
        return "bg-green-100 text-green-800";

      case "Cancelled":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Order #{order._id.slice(-6)}</h1>

        <p className="text-gray-500 mt-2">
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
                <h2 className="font-semibold text-lg">{item.product.name}</h2>

                <p className="text-gray-600">Qty: {item.quantity}</p>

                <p className="text-green-700 font-medium">₹{item.price}</p>
              </div>
            </div>

            <p className="font-semibold text-lg">
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Total</h2>

          <h2 className="text-2xl font-bold text-green-700">
            ₹{order.totalAmount}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

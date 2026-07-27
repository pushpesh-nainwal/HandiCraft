import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <Link to={`/orders/${order._id}`}>
      <div className="bg-white rounded-xl shadow p-6 mb-5 hover:shadow-lg">
        <div className="flex justify-between">
          <div>
            <h2 className="font-semibold">Order #{order._id.slice(-6)}</h2>

            <p className="text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <span className="bg-yellow-100 px-3 py-1 rounded">
              {order.status}
            </span>
          </div>
        </div>

        <p className="mt-4 font-semibold">₹{order.totalAmount}</p>
      </div>
    </Link>
  );
};

export default OrderCard;

import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <Link to={`/orders/${order._id}`}>
      <div className="bg-white rounded-xl shadow p-6 mb-5 hover:shadow-lg border border-[#E6DBC8]">
        <div className="flex justify-between">
          <div>
            <h2 className="font-semibold text-[#2E2016]">
              Order #{order._id.slice(-6)}
            </h2>

            <p className="text-[#7A6A58]">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <span className="bg-[#F3E8D6] text-[#8C6B2E] px-3 py-1 rounded">
              {order.status}
            </span>
          </div>
        </div>

        <p className="mt-4 font-semibold text-[#A8572E]">
          ₹{order.totalAmount}
        </p>
      </div>
    </Link>
  );
};

export default OrderCard;

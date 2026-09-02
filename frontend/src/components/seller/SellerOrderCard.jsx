import { updateOrderStatus } from "../../services/orderService";

// Returns only the valid next statuses
const getNextStatuses = (status) => {
  switch (status) {
    case "Pending":
      return ["Processing", "Cancelled"];

    case "Processing":
      return ["Shipped"];

    case "Shipped":
      return ["Delivered"];

    case "Delivered":
    case "Cancelled":
      return [];

    default:
      return [];
  }
};

// Returns badge color
const getStatusStyle = (status) => {
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

const SellerOrderCard = ({ order, refresh }) => {
  const nextStatuses = getNextStatuses(order.status);

  const handleStatus = async (e) => {
    try {
      await updateOrderStatus(order._id, e.target.value);

      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order status");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 border border-[#E6DBC8]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold text-[#2E2016]">
            Order #{order._id.slice(-6)}
          </h2>

          <p className="mt-2 font-medium text-[#4A3B2C]">
            {order.customer.name}
          </p>

          <p className="text-[#7A6A58]">{order.customer.email}</p>
        </div>

        <div className="text-right">
          <p className="mb-3">
            <span className="font-semibold text-[#4A3B2C]">
              Current Status:
            </span>
          </p>

          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
              order.status,
            )}`}
          >
            {order.status}
          </span>

          <div className="mt-4">
            {nextStatuses.length > 0 ? (
              <select
                defaultValue=""
                onChange={handleStatus}
                className="border border-[#E6DBC8] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
              >
                <option value="" disabled>
                  Change Status
                </option>

                {nextStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-[#7A6A58] font-medium">
                No actions available
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="mt-6">
        {order.items.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between items-center border-t py-4"
          >
            <div>
              <h3 className="font-medium text-[#2E2016]">
                {item.product.name}
              </h3>

              <p className="text-[#7A6A58]">Qty: {item.quantity}</p>
            </div>

            <p className="font-semibold text-[#A8572E]">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOrderCard;

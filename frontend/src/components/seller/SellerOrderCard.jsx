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
      return "bg-gray-100 text-gray-700";
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
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold">
            Order #{order._id.slice(-6)}
          </h2>

          <p className="mt-2 font-medium">{order.customer.name}</p>

          <p className="text-gray-500">{order.customer.email}</p>
        </div>

        <div className="text-right">
          <p className="mb-3">
            <span className="font-semibold">Current Status:</span>
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
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              <span className="text-gray-500 font-medium">
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
              <h3 className="font-medium">{item.product.name}</h3>

              <p className="text-gray-500">Qty: {item.quantity}</p>
            </div>

            <p className="font-semibold">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerOrderCard;

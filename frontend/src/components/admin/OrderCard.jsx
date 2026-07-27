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

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Order #{order._id.slice(-6)}</h2>

          <p className="mt-2">
            <span className="font-semibold">Customer:</span> {order.user.name}
          </p>

          <p className="text-gray-500">{order.user.email}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
            order.status,
          )}`}
        >
          {order.status}
        </span>
      </div>

      {/* Products */}
      <div className="mt-6">
        {order.items.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between py-4 border-t"
          >
            <div>
              <h3 className="font-medium">{item.product.name}</h3>

              <p>Qty: {item.quantity}</p>

              <p className="text-sm text-gray-500">
                Seller: {item.seller?.name || "Unknown"}
              </p>
            </div>

            <div className="font-semibold">₹{item.price}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t pt-4 mt-4 flex justify-between">
        <h2 className="font-semibold">Total</h2>

        <h2 className="text-lg font-bold">₹{order.totalAmount}</h2>
      </div>
    </div>
  );
};

export default OrderCard;

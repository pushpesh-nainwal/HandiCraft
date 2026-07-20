const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="border rounded-lg p-5 flex justify-between items-center mb-4">
      <div className="flex gap-5">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-28 h-28 object-cover rounded-lg"
        />

        <div>
          <h2 className="text-xl font-semibold">{item.product.name}</h2>

          <p className="text-green-600 font-semibold mt-2">
            ₹{item.product.price}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => onDecrease(item)}
              className="px-3 py-1 border rounded"
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => onIncrease(item)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button onClick={() => onRemove(item)} className="text-red-600">
        Remove
      </button>
    </div>
  );
};

export default CartItem;

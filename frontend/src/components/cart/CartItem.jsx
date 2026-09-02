const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="border border-[#E6DBC8] rounded-lg p-5 flex justify-between items-center mb-4 bg-white">
      <div className="flex gap-5">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-28 h-28 object-cover rounded-lg"
        />

        <div>
          <h2 className="text-xl font-semibold text-[#2E2016]">
            {item.product.name}
          </h2>

          <p className="text-[#A8572E] font-semibold mt-2">
            ₹{item.product.price}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => onDecrease(item)}
              className="px-3 py-1 border border-[#E6DBC8] rounded hover:bg-[#F3ECE1] transition-colors"
            >
              -
            </button>

            <span className="text-[#2E2016]">{item.quantity}</span>

            <button
              onClick={() => onIncrease(item)}
              className="px-3 py-1 border border-[#E6DBC8] rounded hover:bg-[#F3ECE1] transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => onRemove(item)}
        className="text-[#B3432B] hover:text-[#8E2E1F] transition-colors"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;

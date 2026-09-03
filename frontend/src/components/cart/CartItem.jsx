const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const getImageUrl = (image) => {
    if (typeof image === 'string') return image;
    if (image?.url) return image.url;
    // Handle malformed object with numeric keys
    if (typeof image === 'object' && image !== null) {
      const values = Object.values(image).filter(v => typeof v === 'string' && v.length === 1);
      if (values.length > 0) return values.join('');
    }
    return null;
  };

  return (
    <div className="border border-[#E6DBC8] rounded-lg p-5 flex justify-between items-center mb-4 bg-white">
      <div className="flex gap-5">
        <img
          src={getImageUrl(item.product.images[0]) || "https://via.placeholder.com/400x300?text=No+Image"}
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

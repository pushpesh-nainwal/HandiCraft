import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

import { useWishlist } from "../context/WishlistContext";
import { addToCart } from "../services/cartService";

const Wishlist = () => {
  const { wishlist, loading, toggle } = useWishlist();

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

  const handleMoveToCart = async (productId) => {
    try {
      await addToCart(productId);

      // remove from wishlist
      await toggle(productId);

      alert("Moved to cart");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading Wishlist...</div>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <Heart size={60} className="mx-auto text-[#9C8D7B] mb-4" />

        <h2 className="text-2xl font-semibold text-[#2E2016]">
          Your wishlist is empty
        </h2>

        <p className="text-[#7A6A58] mt-2">Save products you love for later.</p>

        <Link
          to="/products"
          className="inline-block mt-6 bg-[#A8572E] hover:bg-[#8E4525] text-white px-6 py-3 rounded-lg"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[#2E2016]">My Wishlist</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <Link to={`/products/${product._id}`}>
              <img
                src={
                  product.images?.length
                    ? getImageUrl(product.images[0]) || "https://via.placeholder.com/400"
                    : "https://via.placeholder.com/400"
                }
                alt={product.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg hover:text-[#A8572E] transition-colors text-[#2E2016]">
                  {product.name}
                </h3>

                <p className="text-[#7A6A58] mt-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-4">
                  <span className="font-bold text-xl">₹{product.price}</span>
                </div>
              </div>
            </Link>

            <div className="px-4 pb-4">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => toggle(product._id)}
                  className="text-red-500"
                >
                  <Heart className="fill-red-500" size={22} />
                </button>
              </div>

              <button
                onClick={() => handleMoveToCart(product._id)}
                className="w-full bg-[#A8572E] hover:bg-[#8E4525] text-white py-3 rounded-lg flex justify-center items-center gap-2"
              >
                <ShoppingCart size={18} />
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

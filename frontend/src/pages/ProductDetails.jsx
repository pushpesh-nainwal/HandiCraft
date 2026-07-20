import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { addToCart } from "../services/cartService";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Leaf,
  Truck,
  Shield,
  CheckCircle,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  // Cart states
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [cartError, setCartError] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);

      setProduct(response.data.product);
      setSelectedImage(0);
    } catch (err) {
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  // Add product to cart
  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      setCartMessage("");
      setCartError("");

      await addToCart(product._id);

      setCartMessage("Product added to cart successfully!");
    } catch (err) {
      setCartError(
        err.response?.data?.message || "Failed to add product to cart",
      );
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">
            {error || "Product not found"}
          </p>

          <Link
            to="/products"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-green-600"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-8">
              {/* Eco Badge */}
              <div className="flex items-center mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Leaf className="h-4 w-4 mr-1" />
                  {product.ecoBadge}
                </span>

                <span className="ml-3 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="text-3xl font-bold text-green-600 mb-6">
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>

                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Seller Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-1">Sold by</h3>

                <p className="text-gray-600">{product.sellerName}</p>
              </div>

              {/* Eco Features */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Eco Features
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm">Sustainably sourced</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm">Eco-friendly packaging</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm">Handcrafted quality</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm">Carbon neutral shipping</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Add To Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />

                  {addingToCart ? "Adding..." : "Add to Cart"}
                </button>

                {/* Success Message */}
                {cartMessage && (
                  <p className="text-center text-sm text-green-600">
                    {cartMessage}
                  </p>
                )}

                {/* Error Message */}
                {cartError && (
                  <p className="text-center text-sm text-red-600">
                    {cartError}
                  </p>
                )}

                {/* Wishlist */}
                <button className="w-full border-2 border-green-600 text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </button>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-gray-600 mb-2">
                  <Truck className="h-5 w-5 mr-2" />

                  <span className="text-sm">
                    Free shipping on orders over $50
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Shield className="h-5 w-5 mr-2" />

                  <span className="text-sm">30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            More from {product.category}
          </h2>

          <div className="text-center py-8 bg-white rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">
              Discover more products in this category
            </p>

            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              View All {product.category} Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

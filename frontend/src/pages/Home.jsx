import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Leaf, ArrowRight, Star, Truck, Shield, Heart } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products?limit=6');
      setFeaturedProducts(response.data.products.slice(0, 6));
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Eco-Friendly Products
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Handmade, sustainable, and crafted with love for our planet
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors text-lg"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Eco-Friendly</h3>
              <p className="text-gray-600">
                All products are made from sustainable materials and processes
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Handmade with Love</h3>
              <p className="text-gray-600">
                Each product is carefully crafted by skilled artisans
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                We verify every seller to ensure the highest quality standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our most popular eco-friendly items
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.ecoBadge}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">
                        by {product.sellerName}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Sustainable Community
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Start shopping eco-friendly products today and make a difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors text-lg"
            >
              Browse Products
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center bg-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition-colors text-lg border-2 border-white"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

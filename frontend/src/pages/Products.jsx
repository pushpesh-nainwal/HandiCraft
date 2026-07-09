import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import { Search, SlidersHorizontal } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
 const [filters, setFilters] = useState({
  search: searchParams.get("search") || "",
  category: searchParams.get("category") || "",
  section: searchParams.get("section") || "",
  item: searchParams.get("item") || "",
  ecoBadge: searchParams.get("ecoBadge") || "",
});


  const ecoBadgeOptions = [
    'Handmade',
    'Organic',
    'Recycled',
    'Sustainable',
    'Natural',
    'Upcycled'
  ];
useEffect(() => {
  fetchCategories();
}, []);

  useEffect(() => {
  fetchProducts();
}, [filters]);

  useEffect(() => {
  setFilters({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    section: searchParams.get("section") || "",
    item: searchParams.get("item") || "",
    ecoBadge: searchParams.get("ecoBadge") || "",
  });
}, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
if (filters.category) params.append("category", filters.category);
if (filters.section) params.append("section", filters.section);
if (filters.item) params.append("item", filters.item);
if (filters.ecoBadge) params.append("ecoBadge", filters.ecoBadge);
      const response = await api.get(`/products?${params.toString()}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/products/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleFilterChange = (key, value) => {
  let updated = {
    ...filters,
    [key]: value,
  };

  // If category changes, reset section & item
  if (key === "category") {
    updated.section = "";
    updated.item = "";
  }

  // If section changes, reset item
  if (key === "section") {
    updated.item = "";
  }

  setFilters(updated);

  const params = new URLSearchParams();

  if (updated.search) params.set("search", updated.search);
  if (updated.category) params.set("category", updated.category);
  if (updated.section) params.set("section", updated.section);
  if (updated.item) params.set("item", updated.item);
  if (updated.ecoBadge) params.set("ecoBadge", updated.ecoBadge);

  setSearchParams(params);
};

  const clearFilters = () => {
  const cleared = {
    search: "",
    category: "",
    section: "",
    item: "",
    ecoBadge: "",
  };

  setFilters(cleared);
  setSearchParams({});
};

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Discover our collection of eco-friendly products</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <SlidersHorizontal className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Category
  </label>

  <select
    value={filters.category}
    onChange={(e) => handleFilterChange("category", e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
  >
    <option value="">All Categories</option>

{categories.length > 0 &&
  categories.map((cat) => (
    <option key={cat.slug} value={cat.slug}>
      {cat.name}
    </option>
  ))}
  </select>
</div>

            {/* Eco Badge Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Eco Badge</label>
              <select
                value={filters.ecoBadge}
                onChange={(e) => handleFilterChange('ecoBadge', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Badges</option>
                {ecoBadgeOptions.map((badge) => (
                  <option key={badge} value={badge}>
                    {badge}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(
  filters.search ||
  filters.category ||
  filters.section ||
  filters.item ||
  filters.ecoBadge
) &&  (
            <button
              onClick={clearFilters}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${products.length} products found`}
          </p>
        </div>

        {/* Products Grid */}
        {/* Products Grid */}
{loading ? (
  <div className="text-center py-12">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-700 border-t-transparent"></div>
  </div>
) : products.length === 0 ? (
  <div className="text-center py-12 bg-white rounded-xl shadow-md">
    <p className="text-gray-600 text-lg">
      No products found matching your criteria
    </p>

    <button
      onClick={clearFilters}
      className="mt-4 text-amber-700 hover:text-amber-800 font-medium"
    >
      Clear filters
    </button>
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {products.map((product) => (
      <Link
        key={product._id}
        to={`/products/${product._id}`}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
      >
        <div className="relative">
          <img
            src={
  product.images?.length
    ? product.images[0]
    : "https://via.placeholder.com/400x300?text=No+Image"
}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute top-3 right-3 flex flex-col gap-1">
  {product.ecoBadges?.slice(0, 2).map((badge) => (
    <span
      key={badge}
      className="bg-amber-700 text-white text-xs px-2 py-1 rounded-full"
    >
      {badge}
    </span>
  ))}
</div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>

          {/* Category */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-amber-800 bg-amber-100 px-2 py-1 rounded">
              {product.categoryName}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-amber-700">
              ₹{product.price.toLocaleString()}
            </span>

            <span className="text-xs text-gray-500">
              {product.seller?.name || "GreenCraft Seller"}
            </span>
          </div>
        </div>
      </Link>
    ))}
  </div>
)}
      </div>
    </div>
  );
};

export default Products;

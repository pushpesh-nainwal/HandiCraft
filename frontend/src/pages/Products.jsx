import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../utils/api";
import { addToCart } from "../services/cartService";
import prodHero from "../assets/prodhero.png";

import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ShoppingCart,
  Heart,
  Share2,
} from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A-Z" },
];

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

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Cart states
  const [addingProduct, setAddingProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [cartError, setCartError] = useState("");

  const ecoBadgeOptions = [
    "Handmade",
    "Organic",
    "Recycled",
    "Sustainable",
    "Natural",
    "Upcycled",
  ];
  const { toggle, isWishlisted, loading: wishlistLoading } = useWishlist();
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
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/products/categories");

      setCategories(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Add product to cart
  const handleAddToCart = async (productId) => {
    try {
      setAddingProduct(productId);
      setCartMessage("");
      setCartError("");

      await addToCart(productId);

      setCartMessage("Product added to cart!");

      // Hide message after 3 seconds
      setTimeout(() => {
        setCartMessage("");
      }, 3000);
    } catch (error) {
      setCartError(
        error.response?.data?.message || "Failed to add product to cart",
      );

      setTimeout(() => {
        setCartError("");
      }, 3000);
    } finally {
      setAddingProduct(null);
    }
  };

  const handleFilterChange = (key, value) => {
    let updated = {
      ...filters,
      [key]: value,
    };

    if (key === "category") {
      updated.section = "";
      updated.item = "";
    }

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

  const removeFilter = (key) => handleFilterChange(key, "");

  const activeChips = useMemo(() => {
    const chips = [];

    if (filters.search) {
      chips.push({
        key: "search",
        label: `"${filters.search}"`,
      });
    }

    if (filters.category) {
      const cat = categories.find((c) => c.slug === filters.category);

      chips.push({
        key: "category",
        label: cat?.name || filters.category,
      });
    }

    if (filters.section) {
      chips.push({
        key: "section",
        label: filters.section.replace(/-/g, " "),
      });
    }

    if (filters.item) {
      chips.push({
        key: "item",
        label: filters.item.replace(/-/g, " "),
      });
    }

    if (filters.ecoBadge) {
      chips.push({
        key: "ecoBadge",
        label: filters.ecoBadge,
      });
    }

    return chips;
  }, [filters, categories]);

  const hasActiveFilters = activeChips.length > 0;

  const sortedProducts = useMemo(() => {
    const list = [...products];

    switch (sortBy) {
      case "price_asc":
        return list.sort((a, b) => a.price - b.price);

      case "price_desc":
        return list.sort((a, b) => b.price - a.price);

      case "name_asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));

      case "newest":
      default:
        return list;
    }
  }, [products, sortBy]);

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label || "Newest";

  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      {/* Cart Messages */}
      {(cartMessage || cartError) && (
        <div
          className={`fixed top-5 right-5 z-[100] px-5 py-3 rounded-lg shadow-lg text-sm font-medium ${
            cartMessage ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {cartMessage || cartError}
        </div>
      )}

      {/* ================= Layer 1 : Slogan ================= */}

      <div className="w-full bg-[#F8F3EC] border-b border-[#E6DBC8]">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[420px]">
            <img
              src={prodHero}
              alt="Potter crafting pottery"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center px-10 lg:px-16 py-12">
            <span className="uppercase tracking-[0.35em] text-[#A8572E] text-sm font-medium mb-4">
              Handmade Collection
            </span>

            <h1
              className="text-5xl text-[#2E2016] leading-tight"
              style={{
                fontFamily: "'Fraunces','Playfair Display',Georgia,serif",
              }}
            >
              Search Handmade
              <br />
              Treasures
            </h1>

            <p className="mt-6 text-[#6B5C4C] text-lg leading-8 max-w-lg">
              Every creation tells a story. Browse handcrafted pottery, home
              décor, textiles, and artisan-made products crafted with passion
              and timeless tradition.
            </p>

            <button className="mt-10 w-fit bg-[#8B5E3C] hover:bg-[#74492C] text-white px-8 py-3 rounded-full transition-all duration-300">
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= Filter / Sort bar ================= */}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 bg-[#2E2016] text-[#FBF7F0] text-[13.5px] font-medium tracking-wide px-4 py-2.5 rounded-full hover:bg-[#A8572E] transition-colors duration-250"
            >
              <SlidersHorizontal size={15} strokeWidth={2} />
              Filters
              {hasActiveFilters && (
                <span className="ml-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-[#A8572E] text-[10px] font-semibold">
                  {activeChips.length}
                </span>
              )}
            </button>

            {activeChips.map((chip) => (
              <button
                key={chip.key}
                onClick={() => removeFilter(chip.key)}
                className="group flex items-center gap-1.5 bg-[#F3ECE1] border border-[#E6DBC8] text-[#4A3B2C] text-[13px] capitalize pl-3 pr-2 py-1.5 rounded-full hover:border-[#A8572E] transition-colors duration-200"
              >
                {chip.label}

                <span className="flex items-center justify-center h-4 w-4 rounded-full text-[#9C8D7B] group-hover:text-white group-hover:bg-[#A8572E] transition-colors duration-200">
                  <X size={11} strokeWidth={2.5} />
                </span>
              </button>
            ))}

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[13px] font-medium text-[#A8572E] hover:text-[#8A4423] transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Sort By */}

          <div className="relative">
            <button
              onClick={() => setIsSortOpen((v) => !v)}
              className="flex items-center gap-2 text-[13.5px] font-medium text-[#4A3B2C] border border-[#E6DBC8] bg-white px-4 py-2.5 rounded-full hover:border-[#A8572E] transition-colors duration-200"
            >
              Sort By:
              <span className="text-[#2E2016]">{currentSortLabel}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-250 ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSortOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsSortOpen(false)}
                />

                <div className="absolute right-0 mt-2 w-52 bg-white border border-[#E6DBC8] rounded-[4px] shadow-xl z-20 overflow-hidden">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[13.5px] hover:bg-[#F3ECE1] transition-colors ${
                        sortBy === option.value
                          ? "text-[#A8572E] font-medium"
                          : "text-[#4A3B2C]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Results Count */}

        <div className="mb-6">
          <p className="text-[#6B5C4C] text-[13.5px]">
            {loading ? "Loading..." : `${sortedProducts.length} products found`}
          </p>
        </div>

        {/* ================= Products Grid ================= */}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-[#A8572E] border-t-transparent"></div>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[4px] border border-[#E6DBC8]">
            <p className="text-[#6B5C4C] text-[15px]">
              No products found matching your criteria
            </p>

            <button
              onClick={clearFilters}
              className="mt-4 text-[#A8572E] hover:text-[#8A4423] font-medium text-[13.5px]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => {
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
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="group bg-white rounded-[4px] border border-[#E6DBC8] overflow-hidden hover:shadow-[0_20px_40px_-16px_rgba(46,32,22,0.2)] transition-shadow duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      product.images?.length
                        ? getImageUrl(product.images[0]) || "https://via.placeholder.com/400x300?text=No+Image"
                        : "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-[1.06] transition-transform duration-500 ease-out"
                  />

                  {/* Eco badges */}

                  <div className="absolute top-3 right-3 flex flex-col gap-1">
                    {product.ecoBadges?.slice(0, 2).map((badge) => (
                      <span
                        key={badge}
                        className="bg-[#2E2016]/85 text-white text-[10px] tracking-wide px-2 py-1 rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Hover action icons */}

                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 py-3 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {/* Add to Cart */}

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        handleAddToCart(product._id);
                      }}
                      disabled={addingProduct === product._id}
                      title="Add to cart"
                      className="flex items-center justify-center h-9 w-9 rounded-full bg-white text-[#2E2016] hover:bg-[#A8572E] hover:text-white transition-colors duration-200 disabled:opacity-50"
                    >
                      {addingProduct === product._id ? (
                        <span className="h-4 w-4 border-2 border-[#2E2016] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ShoppingCart size={16} strokeWidth={2} />
                      )}
                    </button>

                    {/* Wishlist */}

                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await toggle(product._id);
                      }}
                      disabled={wishlistLoading}
                      title="Wishlist"
                      className="flex items-center justify-center h-9 w-9 rounded-full bg-white hover:bg-[#A8572E] transition-colors duration-200"
                    >
                      <Heart
                        size={16}
                        strokeWidth={2}
                        className={
                          isWishlisted(product._id)
                            ? "fill-red-500 text-red-500"
                            : "text-[#2E2016]"
                        }
                      />
                    </button>

                    {/* Share */}

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        // TODO: wire up share action
                      }}
                      title="Share"
                      className="flex items-center justify-center h-9 w-9 rounded-full bg-white text-[#2E2016] hover:bg-[#A8572E] hover:text-white transition-colors duration-200"
                    >
                      <Share2 size={16} strokeWidth={2} />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-[15px] font-medium text-[#2E2016] mb-1.5 line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-[#8F8175] text-[13px] mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] tracking-wide uppercase text-[#A8572E] bg-[#F6E9DD] px-2 py-1 rounded">
                      {product.categoryName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[18px] font-semibold text-[#2E2016]">
                      ₹{product.price.toLocaleString()}
                    </span>

                    <span className="text-[11px] text-[#9C8D7B]">
                      {product.seller?.name || "GreenCraft Seller"}
                    </span>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Filter Sidebar */}

      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-[320px] max-w-[85vw] bg-[#FBF7F0] border-r border-[#E6DBC8] z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 h-[72px] border-b border-[#E6DBC8]">
            <h2
              className="text-[19px] text-[#2E2016]"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
              }}
            >
              Filters
            </h2>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="flex items-center justify-center h-8 w-8 rounded-full text-[#6B5C4C] hover:bg-[#F3ECE1] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
            {/* Search */}

            <div>
              <label className="block text-[12px] font-semibold tracking-wide uppercase text-[#6B5C4C] mb-2.5">
                Search
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E6DBC8] rounded-[4px] text-[13.5px] text-[#2E2016] focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E] placeholder:text-[#9C8D7B]"
                />

                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9C8D7B]" />
              </div>
            </div>

            {/* Category */}

            <div>
              <label className="block text-[12px] font-semibold tracking-wide uppercase text-[#6B5C4C] mb-2.5">
                Category
              </label>

              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#E6DBC8] rounded-[4px] text-[13.5px] text-[#2E2016] focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
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

            {/* Eco Badge */}

            <div>
              <label className="block text-[12px] font-semibold tracking-wide uppercase text-[#6B5C4C] mb-2.5">
                Eco Badge
              </label>

              <select
                value={filters.ecoBadge}
                onChange={(e) => handleFilterChange("ecoBadge", e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#E6DBC8] rounded-[4px] text-[13.5px] text-[#2E2016] focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
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

          <div className="px-6 py-5 border-t border-[#E6DBC8] flex items-center gap-3">
            <button
              onClick={clearFilters}
              className="flex-1 text-[13.5px] font-medium text-[#4A3B2C] border border-[#E6DBC8] rounded-full py-2.5 hover:border-[#A8572E] hover:text-[#A8572E] transition-colors"
            >
              Clear all
            </button>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="flex-1 text-[13.5px] font-medium text-[#FBF7F0] bg-[#2E2016] rounded-full py-2.5 hover:bg-[#A8572E] transition-colors"
            >
              Show results
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Products;

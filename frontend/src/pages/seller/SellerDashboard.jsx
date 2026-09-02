import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  IndianRupee,
  BarChart3,
  PlusCircle,
  ArrowRight,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getSellerOrders } from "../../services/orderService";
import { getMyProducts } from "../../services/productService";

const LOW_STOCK_THRESHOLD = 5;

const SellerDashboard = () => {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [productsRes, ordersRes] = await Promise.all([
        getMyProducts(),
        getSellerOrders(),
      ]);

      // Adjust these two lines if your API wraps data differently
      setProducts(productsRes.products || []);
      setOrders(ordersRes.orders || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Derived stats ----------
  const totalProducts = products.length;
  const totalOrders = orders.length;

  const productsSold = products.reduce(
    (sum, product) => sum + (product.sold || 0),
    0,
  );

  const revenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((orderSum, order) => {
      const orderRevenue = (order.items || []).reduce(
        (itemSum, item) => itemSum + (item.price || 0) * (item.quantity || 0),
        0,
      );

      return orderSum + orderRevenue;
    }, 0);

  const stats = { totalProducts, totalOrders, productsSold, revenue };

  // ---------- Derived lists ----------
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const lowStockProducts = products
    .filter((p) => p.stock <= LOW_STOCK_THRESHOLD)
    .sort((a, b) => a.stock - b.stock);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F3EB] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#A8572E]" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F3EB] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-[#7A6B5C]">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="bg-[#A8572E] text-white px-5 py-2.5 rounded-full hover:bg-[#8E4525] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EB] py-8">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <p className="text-sm tracking-[0.16em] uppercase text-[#A8572E] font-semibold mb-2">
              Seller Overview
            </p>

            <h1
              className="text-3xl md:text-4xl text-[#2E2016]"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
              }}
            >
              Welcome back, {user?.name || "Seller"}
            </h1>

            <p className="text-[#7A6B5C] mt-2">
              Manage your products, orders and store performance from one place.
            </p>
          </div>

          <Link
            to="/seller/products/add"
            className="inline-flex items-center justify-center gap-2 bg-[#A8572E] text-white px-5 py-3 rounded-full hover:bg-[#8E4525] transition-colors shadow-sm"
          >
            <PlusCircle size={18} />
            Add Product
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <StatCard
            icon={<Package size={22} />}
            title="Total Products"
            value={stats.totalProducts}
          />

          <StatCard
            icon={<ShoppingBag size={22} />}
            title="Total Orders"
            value={stats.totalOrders}
          />

          <StatCard
            icon={<BarChart3 size={22} />}
            title="Products Sold"
            value={stats.productsSold}
          />

          <StatCard
            icon={<IndianRupee size={22} />}
            title="Total Revenue"
            value={`₹${stats.revenue.toLocaleString()}`}
          />
        </div>

        {/* Quick Actions */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[#2E2016]">
              Quick Actions
            </h2>
            <p className="text-sm text-[#7A6B5C] mt-1">
              Common actions for managing your store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <QuickAction
              to="/seller/products/add"
              icon={<PlusCircle size={22} />}
              title="Add New Product"
              description="Create a new product listing."
            />

            <QuickAction
              to="/seller/products"
              icon={<Package size={22} />}
              title="Manage Products"
              description="View, edit and manage your listings."
            />

            <QuickAction
              to="/seller/orders"
              icon={<ShoppingBag size={22} />}
              title="View Orders"
              description="Review and manage customer orders."
            />
          </div>
        </section>

        {/* Recent products + Low stock */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
          {/* Recent Products */}
          <section className="xl:col-span-2 bg-[#FFFCF8] border border-[#E6DBC8] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-semibold text-[#2E2016]">
                  Recent Products
                </h2>
                <p className="text-sm text-[#7A6B5C] mt-1">
                  Recently added products from your store.
                </p>
              </div>

              <Link
                to="/seller/products"
                className="inline-flex items-center gap-1 text-sm text-[#A8572E] font-medium hover:gap-2 transition-all"
              >
                View All
                <ArrowRight size={15} />
              </Link>
            </div>

            {recentProducts.length === 0 ? (
              <p className="text-sm text-[#9A8673] py-6 text-center">
                No products yet. Add your first product to get started.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentProducts.map((product) => (
                  <div
                    key={product._id}
                    className="border border-[#E9DED0] rounded-xl p-4 bg-white"
                  >
                    <div className="h-28 rounded-lg bg-[#EFE4D5] mb-4 flex items-center justify-center text-[#A8572E] overflow-hidden">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Package size={28} strokeWidth={1.5} />
                      )}
                    </div>

                    <h3 className="font-medium text-[#2E2016] line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-[#A8572E] font-semibold mt-2">
                      ₹{product.price.toLocaleString()}
                    </p>

                    <p className="text-xs text-[#7A6B5C] mt-2">
                      Stock: {product.stock}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Low Stock */}
          <section className="bg-[#FFFCF8] border border-[#E6DBC8] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle size={20} className="text-[#B36B2C]" />

              <h2 className="text-xl font-semibold text-[#2E2016]">
                Low Stock
              </h2>
            </div>

            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-[#9A8673] py-4">
                All products are well stocked.
              </p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex justify-between items-center border-b border-[#EFE4D5] pb-3 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#4A3B2C]">
                        {product.name}
                      </p>

                      <p className="text-xs text-[#9A8673] mt-1">
                        Only {product.stock} remaining
                      </p>
                    </div>

                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#F5E3D2] text-[#A8572E] font-medium">
                      Low
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Link
              to="/seller/products"
              className="inline-flex items-center gap-1 text-sm text-[#A8572E] mt-5 font-medium"
            >
              Manage Products
              <ArrowRight size={15} />
            </Link>
          </section>
        </div>

        {/* Recent Orders */}
        <section className="bg-[#FFFCF8] border border-[#E6DBC8] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-[#2E2016]">
                Recent Orders
              </h2>

              <p className="text-sm text-[#7A6B5C] mt-1">
                Latest orders for your products.
              </p>
            </div>

            <Link
              to="/seller/orders"
              className="inline-flex items-center gap-1 text-sm text-[#A8572E] font-medium"
            >
              View All
              <ArrowRight size={15} />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-sm text-[#9A8673] py-6 text-center">
              No orders yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#E6DBC8] text-xs uppercase tracking-wider text-[#8C7968]">
                    <th className="py-3 pr-4">Order</th>
                    <th className="py-3 pr-4">Product</th>
                    <th className="py-3 pr-4">Amount</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => {
                    const orderAmount = (order.items || []).reduce(
                      (sum, item) =>
                        sum + (item.price || 0) * (item.quantity || 0),
                      0,
                    );
                    const firstItem = order.items?.[0];
                    const productLabel =
                      order.items?.length > 1
                        ? `${firstItem?.product?.name || "Product"} +${
                            order.items.length - 1
                          } more`
                        : firstItem?.product?.name || "—";

                    return (
                      <tr
                        key={order._id}
                        className="border-b border-[#F0E7DC] last:border-0"
                      >
                        <td className="py-4 pr-4 text-sm font-medium text-[#4A3B2C]">
                          #{order._id.slice(-6).toUpperCase()}
                        </td>

                        <td className="py-4 pr-4 text-sm text-[#6F6153]">
                          {productLabel}
                        </td>

                        <td className="py-4 pr-4 text-sm font-medium text-[#4A3B2C]">
                          ₹{orderAmount.toLocaleString()}
                        </td>

                        <td className="py-4">
                          <OrderStatus status={order.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="bg-[#FFFCF8] border border-[#E6DBC8] rounded-2xl p-5 shadow-sm">
      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F1E5D8] text-[#A8572E] mb-4">
        {icon}
      </div>

      <p className="text-sm text-[#7A6B5C]">{title}</p>

      <p className="text-2xl font-semibold text-[#2E2016] mt-1">{value}</p>
    </div>
  );
};

const QuickAction = ({ to, icon, title, description }) => {
  return (
    <Link
      to={to}
      className="group bg-[#FFFCF8] border border-[#E6DBC8] rounded-2xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all"
    >
      <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-[#F1E5D8] text-[#A8572E] group-hover:bg-[#A8572E] group-hover:text-white transition-colors">
        {icon}
      </div>

      <h3 className="font-semibold text-[#2E2016] mt-4">{title}</h3>

      <p className="text-sm text-[#7A6B5C] mt-1">{description}</p>
    </Link>
  );
};

const OrderStatus = ({ status }) => {
  const styles = {
    Pending: "bg-[#F3E8D6] text-[#8C6B2E]",
    Processing: "bg-[#FFF1D6] text-[#A96816]",
    Shipped: "bg-[#E8EEF8] text-[#46658E]",
    Delivered: "bg-[#E8F1E5] text-[#54724A]",
    Cancelled: "bg-[#F8E8E8] text-[#8E4646]",
  };

  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

export default SellerDashboard;

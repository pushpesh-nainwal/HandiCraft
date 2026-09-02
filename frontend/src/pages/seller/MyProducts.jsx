import { useEffect, useState } from "react";
import { Package } from "lucide-react";

import { getMyProducts } from "../../services/productService";
import ProductTable from "../../components/seller/ProductTable";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getMyProducts();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Package className="text-[#A8572E]" />
          <h1 className="text-3xl font-bold text-[#2E2016]">My Products</h1>
        </div>

        <p className="text-[#7A6A58]">{products.length} Products</p>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <Package size={60} className="mx-auto text-[#9C8D7B] mb-4" />

          <h2 className="text-xl font-semibold text-[#2E2016]">
            No Products Yet
          </h2>

          <p className="text-[#7A6A58] mt-2">
            Start selling by adding your first handmade product.
          </p>
        </div>
      ) : (
        <ProductTable products={products} setProducts={setProducts} />
      )}
    </div>
  );
};

export default MyProducts;

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
          <Package className="text-green-600" />
          <h1 className="text-3xl font-bold">My Products</h1>
        </div>

        <p className="text-gray-500">{products.length} Products</p>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <Package size={60} className="mx-auto text-gray-400 mb-4" />

          <h2 className="text-xl font-semibold">No Products Yet</h2>

          <p className="text-gray-500 mt-2">
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

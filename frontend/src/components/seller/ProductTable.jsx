import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../services/productService";
const ProductTable = ({ products, setProducts }) => {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts((prev) => prev.filter((product) => product._id !== id));

      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden border border-[#E6DBC8]">
      <table className="w-full">
        <thead className="bg-[#F3ECE1]">
          <tr>
            <th className="text-left p-4 text-[#4A3B2C]">Image</th>
            <th className="text-left p-4 text-[#4A3B2C]">Product</th>
            <th className="text-left p-4 text-[#4A3B2C]">Price</th>
            <th className="text-left p-4 text-[#4A3B2C]">Stock</th>
            <th className="text-left p-4 text-[#4A3B2C]">Sold</th>
            <th className="text-left p-4 text-[#4A3B2C]">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t border-[#E6DBC8]">
              <td className="p-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>

              <td className="p-4 text-[#2E2016]">{product.name}</td>

              <td className="p-4 text-[#A8572E]">₹{product.price}</td>

              <td className="p-4 text-[#2E2016]">{product.stock}</td>

              <td className="p-4 text-[#2E2016]">{product.sold}</td>

              <td className="p-4">
                <div className="flex gap-2">
                  <Link to={`/seller/products/edit/${product._id}`}>
                    <button className="p-2 rounded-lg bg-[#E8EEF8] text-[#46658E] hover:bg-[#D8E2F0] transition-colors">
                      <Pencil size={18} />
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 rounded-lg bg-[#F8E8E8] text-[#B3432B] hover:bg-[#E8D8D8] transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

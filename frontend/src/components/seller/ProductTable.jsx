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
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Image</th>
            <th className="text-left p-4">Product</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Stock</th>
            <th className="text-left p-4">Sold</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="p-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>

              <td className="p-4">{product.name}</td>

              <td className="p-4">₹{product.price}</td>

              <td className="p-4">{product.stock}</td>

              <td className="p-4">{product.sold}</td>

              <td className="p-4">
                <div className="flex gap-2">
                  <Link to={`/seller/products/edit/${product._id}`}>
                    <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Pencil size={18} />
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
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

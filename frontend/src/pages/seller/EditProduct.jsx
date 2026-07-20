import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/seller/ProductForm";
import { getProductById } from "../../services/productService";

const EditProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data.product);
    } catch (err) {
      console.error(err);
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return <ProductForm mode="edit" initialData={product} />;
};

export default EditProduct;

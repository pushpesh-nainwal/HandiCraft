import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import {
  getCategories,
  createProduct,
  updateProduct,
} from "../../services/productService";

const ProductForm = ({ mode = "create", initialData = null }) => {
  console.log(mode);
  console.log(initialData);
  const [categories, setCategories] = useState([]);

  const [sections, setSections] = useState([]);

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    section: "",
    item: "",
    categoryName: "",
    sectionName: "",
    itemName: "",
    images: [""],
    ecoBadges: [],
    stock: 1,
  });

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (mode === "edit" && initialData && categories.length > 0) {
      const selectedCategory = categories.find(
        (cat) => cat.slug === initialData.category,
      );

      if (selectedCategory) {
        setSections(selectedCategory.sections);

        const selectedSection = selectedCategory.sections.find(
          (sec) => sec.slug === initialData.section,
        );

        if (selectedSection) {
          setItems(selectedSection.items);
        }
      }

      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        category: initialData.category,
        section: initialData.section,
        item: initialData.item,
        categoryName: initialData.categoryName,
        sectionName: initialData.sectionName,
        itemName: initialData.itemName,
        images: initialData.images,
        ecoBadges: initialData.ecoBadges,
        stock: initialData.stock,
      });
    }
  }, [mode, initialData, categories]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCategoryChange = (e) => {
    const slug = e.target.value;

    const selected = categories.find((cat) => cat.slug === slug);

    if (!selected) return;

    setSections(selected.sections);

    setItems([]);

    setFormData((prev) => ({
      ...prev,

      category: selected.slug,
      categoryName: selected.name,

      section: "",
      sectionName: "",

      item: "",
      itemName: "",
    }));
  };
  const handleSectionChange = (e) => {
    const slug = e.target.value;

    const selected = sections.find((sec) => sec.slug === slug);

    if (!selected) return;

    setItems(selected.items);

    setFormData((prev) => ({
      ...prev,

      section: selected.slug,
      sectionName: selected.title,

      item: "",
      itemName: "",
    }));
  };
  const handleItemChange = (e) => {
    const slug = e.target.value;

    const selected = items.find((item) => item.slug === slug);

    if (!selected) return;

    setFormData((prev) => ({
      ...prev,

      item: selected.slug,
      itemName: selected.name,
    }));
  };

  const ECO_BADGES = [
    "Handmade",
    "Organic",
    "Recycled",
    "Sustainable",
    "Natural",
    "Upcycled",
  ];

  const handleEcoBadge = (badge) => {
    setFormData((prev) => {
      const exists = prev.ecoBadges.includes(badge);

      return {
        ...prev,
        ecoBadges: exists
          ? prev.ecoBadges.filter((b) => b !== badge)
          : [...prev.ecoBadges, badge],
      };
    });
  };
  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];

    updatedImages[index] = value;

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };
  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };
  const removeImageField = (index) => {
    if (formData.images.length === 1) return;

    const updatedImages = formData.images.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (mode === "edit") {
        await updateProduct(initialData._id, formData);
        alert("Product updated successfully!");
      } else {
        await createProduct(formData);
        alert("Product added successfully!");
      }
      if (mode === "create") {
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          section: "",
          item: "",
          categoryName: "",
          sectionName: "",
          itemName: "",
          images: [""],
          ecoBadges: [],
          stock: 1,
        });

        setSections([]);
        setItems([]);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8">
          {mode === "edit" ? "Edit Product" : "Add New Product"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Name */}
          <div>
            <label className="block font-medium mb-2">Product Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2">Description</label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Price + Stock */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Price</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Stock</label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-2">Category</label>

            <select
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Section */}
          <div>
            <label className="block font-medium mb-2">Section</label>

            <select
              value={formData.section}
              onChange={handleSectionChange}
              disabled={!sections.length}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Section</option>

              {sections.map((section) => (
                <option key={section.slug} value={section.slug}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>

          {/* Item */}
          <div>
            <label className="block font-medium mb-2">Item</label>

            <select
              value={formData.item}
              onChange={handleItemChange}
              disabled={!items.length}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Item</option>

              {items.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Eco Badges */}
          <div>
            <label className="block font-medium mb-4">Eco Badges</label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ECO_BADGES.map((badge) => (
                <label key={badge} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.ecoBadges.includes(badge)}
                    onChange={() => handleEcoBadge(badge)}
                  />

                  {badge}
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="font-medium">Product Images</label>

              <button
                type="button"
                onClick={addImageField}
                className="flex items-center gap-2 text-green-600"
              >
                <Plus size={18} />
                Add Image
              </button>
            </div>

            <div className="space-y-3">
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter Image URL"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="flex-1 border rounded-lg p-3"
                  />

                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="bg-red-100 text-red-600 px-4 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-8 py-3 rounded-lg transition"
            >
              {loading
                ? "Saving..."
                : mode === "edit"
                  ? "Update Product"
                  : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProductForm;

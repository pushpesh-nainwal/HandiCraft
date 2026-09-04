import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { upload } from "@imagekit/javascript";

import {
  getCategories,
  createProduct,
  updateProduct,
} from "../../services/productService";

import { getImageKitAuth } from "../../services/uploadService";

const ProductForm = ({ mode = "create", initialData = null }) => {
  console.log(mode);
  console.log(initialData);

  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

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
    images: [],
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
      console.log("INITIAL PRODUCT IMAGES:", initialData.images);
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
        images: initialData.images || [],
        ecoBadges: initialData.ecoBadges || [],
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

  // IMAGE UPLOAD
  const handleImageUpload = async (e) => {
    const input = e.target;
    const files = Array.from(input.files);

    if (!files.length) return;

    if (formData.images.length + files.length > 5) {
      setUploadError("You can upload a maximum of 5 images.");
      input.value = "";
      return;
    }
    try {
      setUploading(true);
      setUploadError("");

      // Get ImageKit authentication from backend
      const auth = await getImageKitAuth();

      const uploadedImages = [];

      for (const file of files) {
        const result = await upload({
          file,
          fileName: file.name,

          publicKey: auth.publicKey,
          token: auth.token,
          expire: auth.expire,
          signature: auth.signature,

          folder: "/handicraft/products",
        });

        uploadedImages.push({
          url: result.url,
          fileId: result.fileId,
        });
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }));
    } catch (error) {
      console.error("Image upload failed:", error);

      setUploadError(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload image",
      );
    } finally {
      setUploading(false);

      // Allows selecting the same image again
      e.target.value = "";
    }
  };

  // REMOVE IMAGE FROM FORM
  const removeImageField = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
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
          images: [],
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
      <div className="bg-white rounded-xl shadow-md p-8 border border-[#E6DBC8]">
        <h1 className="text-3xl font-bold mb-8 text-[#2E2016]">
          {mode === "edit" ? "Edit Product" : "Add New Product"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Name */}
          <div>
            <label className="block font-medium mb-2 text-[#4A3B2C]">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-[#E6DBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2 text-[#4A3B2C]">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-[#E6DBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
            />
          </div>

          {/* Price + Stock */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2 text-[#4A3B2C]">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-[#E6DBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-[#4A3B2C]">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border border-[#E6DBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-2 text-[#4A3B2C]">
              Category
            </label>

            <select
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full border border-[#E6DBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
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
            <label className="block font-medium mb-2 text-[#4A3B2C]">
              Section
            </label>

            <select
              value={formData.section}
              onChange={handleSectionChange}
              disabled={!sections.length}
              className="w-full border border-[#E6DBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
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
            <label className="block font-medium mb-2 text-[#4A3B2C]">
              Item
            </label>

            <select
              value={formData.item}
              onChange={handleItemChange}
              disabled={!items.length}
              className="w-full border border-[#E6DBC8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#A8572E]/30 focus:border-[#A8572E]"
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
            <label className="block font-medium mb-4 text-[#4A3B2C]">
              Eco Badges
            </label>

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

          {/* Product Images */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="font-medium text-[#4A3B2C]">
                Product Images
              </label>

              <label
                className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                  uploading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#7C8B65] hover:bg-[#5A6B4A] text-white"
                }`}
              >
                <Upload size={18} />

                {uploading ? "Uploading..." : "Choose Images"}

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* Upload Error */}
            {uploadError && (
              <p className="text-sm text-red-600 mb-4">{uploadError}</p>
            )}

            {/* Image Preview */}
            {formData.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div
                    key={image.fileId || index}
                    className="relative group border border-[#E6DBC8] rounded-lg overflow-hidden bg-[#FAF7F2]"
                  >
                    <img
                      src={image.url}
                      alt={`Product ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="absolute top-2 right-2 bg-white/90 text-[#B3432B] p-1.5 rounded-full shadow hover:bg-white"
                    >
                      <X size={16} />
                    </button>

                    <div className="p-2 text-xs text-[#6B5B4A]">
                      Image {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#E6DBC8] rounded-lg p-8 text-center">
                <Upload size={32} className="mx-auto mb-3 text-[#A8572E]" />

                <p className="text-[#6B5B4A]">No images uploaded yet</p>

                <p className="text-sm text-gray-400 mt-1">
                  Select one or more product images
                </p>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || uploading}
              className="bg-[#A8572E] hover:bg-[#8E4525] disabled:bg-[#D4A088] text-white px-8 py-3 rounded-lg transition-colors"
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

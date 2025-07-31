import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Pencil, Upload, ImageIcon } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useAuthUserStore from "../../store/AuthUserStore";
import ImageComponent from "../public/ImageComponent.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const UserProductGallerySection = ({ userId }) => {
  const { token } = useAuthUserStore();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productLink: "",
    productImage: null,
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showSnackbar = (message, type = "success") =>
    setSnackbar({ open: true, message, type });
  const closeSnackbar = () =>
    setSnackbar({ open: false, message: "", type: "success" });

  useEffect(() => {
    fetchProducts();
  }, [userId]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${apiURL}/user-product-gallery/${userId}`);
      setProducts(res.data?.products || []);
    } catch {
      showSnackbar("Failed to load product gallery", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productImage") {
      setNewProduct((prev) => ({ ...prev, productImage: files[0] }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newProduct.productLink && !newProduct.productImage) return;

    const formData = new FormData();
    if (newProduct.productLink)
      formData.append("productLink", newProduct.productLink);
    if (newProduct.productImage)
      formData.append("productImage", newProduct.productImage);

    try {
      if (editingIndex !== null) {
        await axios.put(
          `${apiURL}/user-product-gallery/${userId}/${editingIndex}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        showSnackbar("Product updated");
      } else {
        await axios.post(`${apiURL}/user-product-gallery/${userId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showSnackbar("Product added");
      }

      setNewProduct({ productLink: "", productImage: null });
      setEditingIndex(null);
      fetchProducts();
    } catch {
      showSnackbar("Failed to save product", "error");
    }
  };

  const handleEdit = (index) => {
    const item = products[index];
    setEditingIndex(index);
    setNewProduct({ productLink: item.productLink || "", productImage: null });
  };

  const handleCancelEdit = () => {
    setNewProduct({ productLink: "", productImage: null });
    setEditingIndex(null);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${apiURL}/user-product-gallery/${userId}/${index}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showSnackbar("Deleted");
      fetchProducts();
    } catch {
      showSnackbar("Failed to delete", "error");
    }
  };

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-2">
        <div className="flex items-center justify-start gap-2">
          <ImageIcon className="w-5 h-5 text-yellow-400" />
          <h2 className="text-base font-medium text-yellow-400">
            Product Gallery
          </h2>
        </div>
        <span className="text-sm text-gray-500 pt-2">Maximum 4</span>
        <p className="text-xs text-gray-400 mt-1">
          Tip:Upload a square photo (1:1 ratio, e.g. 400x400px). Square images
          fit.
        </p>
      </div>

      {/* Only show form if under 4 or editing */}
      {(products.length < 4 || editingIndex !== null) && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="url"
            name="productLink"
            placeholder="Product Link"
            className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
            value={newProduct.productLink}
            onChange={handleInputChange}
          />

          <label
            htmlFor="product-image-upload"
            className="cursor-pointer inline-flex items-center inner-glow text-white px-4 py-2 rounded-md mb-2"
          >
            <Upload size={18} className="mr-2" />
            {newProduct.productImage ? "Change Image" : "Upload Image"}
          </label>
          <input
            id="product-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
            name="productImage"
          />

          {newProduct.productImage && (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(newProduct.productImage)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
                onLoad={() => URL.revokeObjectURL(newProduct.productImage)}
              />
            </div>
          )}

          <div className="flex items-center justify-center mt-5 gap-2">
            <button
              type="submit"
              disabled={!newProduct.productImage && !newProduct.productLink}
              className=" cursor-pointer disabled:opacity-50 px-4 py-2 rounded text-white border-2 border-white flex items-center gap-1"
            >
              {editingIndex !== null ? "Update" : "Add Product"}
            </button>

            {editingIndex !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 rounded text-white border-2 cursor-pointer border-white"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* Product Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-[#263238] p-2 rounded shadow text-sm relative"
          >
            <ImageComponent
              imageName={item.productImage}
              altName={"Product"}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <a
              href={item.productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline break-words truncate block max-w-full whitespace-nowrap overflow-hidden"
              style={{ maxWidth: "100%" }}
            >
              {item.productLink}
            </a>

            <div className="absolute top-2 right-2 flex gap-2">
              <button onClick={() => handleEdit(index)} title="Edit">
                <Pencil className="w-4 h-4 text-yellow-400" />
              </button>
              <button onClick={() => handleDelete(index)} title="Delete">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserProductGallerySection;

import React, { useEffect, useState } from "react";
import { PackageSearch, Link2, Trash2 } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import useAuthUserStore from "../../store/AuthUserStore";
import LoadingLottie from "../public/LoadingLottie.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const ProductServiceSister = ({
  title = "Info List",
  type = "productAndServices", // or "sisterConcerns"
  icon = <PackageSearch className="w-5 h-5 text-green-400" />,
  slug
}) => {
  const {  token } = useAuthUserStore();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "", type: "success" });
  };

  useEffect(() => {
    if (!slug || !token) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiURL}/userbyslug/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const list = res.data?.profile?.[type] || [];
        setItems(list);
      } catch (error) {
        console.error(`Failed to fetch ${type}`, error);
        showSnackbar("Failed to load data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, token, type]);

  const handleChange = (index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleAdd = () => {
    setItems((prev) => [
      ...prev,
      {
        label: "",
        value: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    showSnackbar("Item removed", "success");
  };

  const handleSave = async () => {
    if (items.some((item) => !item.label.trim())) {
      showSnackbar("All items must have a label", "error");
      return;
    }

    try {
      setLoading(true);
      await axios.patch(
        `${apiURL}/profilebyslug/${slug}`,
        { [type]: items },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      showSnackbar("Saved successfully", "success");
    } catch (error) {
      console.error("Save error", error);
      showSnackbar("Failed to save", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingLottie />;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        {icon}
        <h2 className="text-base font-medium text-green-400">{title}</h2>
      </div>

      {items.length === 0 && (
        <p className="text-white text-sm mb-2">No data added yet.</p>
      )}

      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center gap-2 mb-2 p-2 rounded inner-glow bg-[#1b252a]"
        >
          <input
            type="text"
            placeholder="Label"
            value={item.label}
            onChange={(e) => handleChange(index, "label", e.target.value)}
            className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 w-full"
          />
          <input
            type="text"
            placeholder="Optional Link"
            value={item.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
            className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 w-full"
          />
          <button
            onClick={() => handleRemove(index)}
            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 cursor-pointer"
            title="Remove"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}

      <div className="flex justify-center mb-4">
        <button
          onClick={handleAdd}
          className="border-2 border-white text-white px-4 py-2 rounded cursor-pointer hover:bg-white hover:text-[#212F35] transition-colors"
        >
          + Add Row
        </button>
      </div>

      {/* Save button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          disabled={loading}
          className="border-2 border-white text-white px-4 py-2 rounded cursor-pointer"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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

export default ProductServiceSister;

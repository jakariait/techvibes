import React, { useEffect, useState } from "react";
import { Briefcase, Trash2 } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import useAuthUserStore from "../../store/AuthUserStore.jsx";
import LoadingLottie from "../public/LoadingLottie.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const DesignationSection = ({ title = "Designations" , slug }) => {
  const {  token } = useAuthUserStore();
  const apiSlug = slug;

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const MAX_DESIGNATIONS = 3;
  const isLimitReached = items.length >= MAX_DESIGNATIONS;

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "", type: "success" });
  };

  useEffect(() => {
    if (!apiSlug || !token) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiURL}/userbyslug/${apiSlug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data?.profile?.designationInfo || [];
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch designations", error);
        showSnackbar("Failed to load designations", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiSlug, token]);

  const handleChange = (index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleAdd = () => {
    if (isLimitReached) {
      showSnackbar(
        `You can only add up to ${MAX_DESIGNATIONS} designations`,
        "error"
      );
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        designation: "",
        department: "",
        organization: "",
      },
    ]);
    showSnackbar("New designation row added");
  };


  const handleRemove = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    showSnackbar("Designation removed", "success");
  };

  const handleSave = async () => {
    if (items.some((item) => !item.designation || !item.organization)) {
      showSnackbar("Each item must have Designation and Organization", "error");
      return;
    }

    try {
      setLoading(true);
      await axios.patch(
        `${apiURL}/profilebyslug/${apiSlug}`,
        { designationInfo: items },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      showSnackbar("Designations saved", "success");
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
        <Briefcase className="w-5 h-5 text-green-400" />
        <h2 className="text-base font-medium text-green-400">{title}</h2>
      </div>

      {/* Existing Designations */}
      {items.length === 0 && (
        <p className="text-white text-sm mb-2">No designations added yet.</p>
      )}

      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 mb-4 p-3 rounded inner-glow bg-[#1b252a]"
        >
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="Designation"
              value={item.designation}
              onChange={(e) =>
                handleChange(index, "designation", e.target.value)
              }
              className="flex-1 bg-[#212F35] text-white p-2 rounded border border-gray-600 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Department"
              value={item.department}
              onChange={(e) =>
                handleChange(index, "department", e.target.value)
              }
              className="flex-1 bg-[#212F35] text-white p-2 rounded border border-gray-600 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Organization"
              value={item.organization}
              onChange={(e) =>
                handleChange(index, "organization", e.target.value)
              }
              className="flex-1 bg-[#212F35] text-white p-2 rounded border border-gray-600 focus:outline-none"
            />
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 cursor-pointer"
              title="Remove"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      {!isLimitReached && (
        <div className="flex justify-center mb-4">
          <button
            onClick={handleAdd}
            className="border-2 border-white text-white px-4 py-2 rounded cursor-pointer hover:bg-white hover:text-[#212F35] transition-colors"
          >
            + Add Designation
          </button>
        </div>
      )}


      {/* Save Button */}
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

export default DesignationSection;

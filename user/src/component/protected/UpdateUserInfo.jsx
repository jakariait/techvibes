import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthUserStore from "../../store/AuthUserStore.jsx";
import { User } from "lucide-react";
import LoadingLottie from "../public/LoadingLottie.jsx";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const UpdateUserInfo = ({slug}) => {
  const { token } = useAuthUserStore();

  const baseUrl = import.meta.env.VITE_API_URL;
  const patchUrl = `${baseUrl}/userbyslug/${slug}`;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success", // "success" | "error"
  });

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (!slug || !token) return;
    const fetchUser = async () => {
      try {
        const res = await axios.get(patchUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = res.data.user || {};
        setFormData({
          fullName: userData.fullName || "",
          email: userData.email || "",
        });
      } catch {
        // Optionally show error snackbar
        setSnackbar({
          open: true,
          message: "Failed to load user info.",
          type: "error",
        });
      }
    };
    fetchUser();
  }, [slug, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(patchUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSnackbar({
        open: true,
        message: res.data.message || "User info updated successfully!",
        type: "success",
      });

      // Delay for snackbar to show, then reload
      setTimeout(() => {
        window.location.reload();
      }, 1500); // 1.5 seconds delay before reload
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Something went wrong.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };


  if (loading) return <LoadingLottie />;

  return (
    <div className="max-w-7xl mx-auto bg-[#212F35] p-6 rounded-xl text-white">
      <h2 className="flex items-center justify-center text-green-400 text-center mb-6 gap-2">
        <User className="w-5 h-5" />
        Update User Info
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full p-2 rounded border border-gray-600 bg-[#212F35] focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full p-2 rounded border border-gray-600 bg-[#212F35] focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="border-2 border-white text-white cursor-pointer px-4 py-2 rounded transition-colors flex items-center gap-2"
          >
            {loading ? <>Updating...</> : "Update"}
          </button>
        </div>
      </form>

      {/* Snackbar for notifications */}
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

export default UpdateUserInfo;

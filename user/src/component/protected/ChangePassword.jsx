import React, { useState } from "react";
import axios from "axios";
import {  Key } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useAuthUserStore from "../../store/AuthUserStore.jsx";

const ChangePassword = () => {
  const { token } = useAuthUserStore();
  const baseUrl = import.meta.env.VITE_API_URL;
  const changePasswordUrl = `${baseUrl}/change-password`;

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmNewPassword } = formData;

    if (newPassword !== confirmNewPassword) {
      showSnackbar("New password and confirm password do not match.", "error");
      return;
    }

    if (!currentPassword || !newPassword) {
      showSnackbar("Please fill in all required fields.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        changePasswordUrl,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.message) {
        showSnackbar(res.data.message, "success");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        showSnackbar("Failed to change password.", "error");
      }
    } catch (err) {
      showSnackbar(
        err.response?.data?.message || "Something went wrong.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#212F35] inner-glow p-6 rounded-xl max-w-7xl mx-auto mb-8">
      <h2 className=" text-center text-green-400 mb-6 flex items-center justify-center gap-2">
        <Key className="w-5 h-5" />
        Change Password
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <div>
            <label className="block text-white mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full p-2 rounded border border-gray-600 bg-[#212F35] text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full p-2 rounded border border-gray-600 bg-[#212F35] text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Re-type new password"
              className="w-full p-2 rounded border border-gray-600 bg-[#212F35] text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className="border-2 border-white text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full " />
            ) : (
              <>Change Password</>
            )}
          </button>
        </div>
      </form>

      {/* Snackbar for showing messages */}
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

export default ChangePassword;

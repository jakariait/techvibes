import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useTheme } from "../../context/ThemeContext.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const ConnectForm = ({ userId, onSuccess }) => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    socialLink: "",
    message: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, userId };
      const res = await axios.post(`${apiURL}/connect`, payload);

      setSnackbar({
        open: true,
        message: res.data.message,
        severity: "success",
      });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        socialLink: "",
        message: "",
      });

      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000); // close after 1 second
      }
    } catch (err) {
      const message = err.response?.data?.error || "Failed to submit connect.";
      setSnackbar({ open: true, message, severity: "error" });
    }
  };

  return (
    <div className="max-w-xl   rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className={`${theme.connectFormBg} ${theme.text} p-2 rounded border flex-1 focus:outline-none w-full`}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className={`${theme.connectFormBg} ${theme.text} p-2 rounded border flex-1 focus:outline-none w-full`}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className={`${theme.connectFormBg} ${theme.text} p-2 rounded border flex-1 focus:outline-none w-full`}
        />

        <input
          type="url"
          name="socialLink"
          placeholder="Social Media Link"
          value={formData.socialLink}
          onChange={handleChange}
          className={`${theme.connectFormBg} ${theme.text} p-2 rounded border flex-1 focus:outline-none w-full`}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className={`${theme.connectFormBg} ${theme.text} p-2 rounded border flex-1 focus:outline-none w-full`}
        />

        <div className={"flex items-center justify-center"}>
          <button
            type="submit"
            className="border-2 border-white text-white px-4 py-2 rounded cursor-pointer"
          >
            Connect
          </button>
        </div>
      </form>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ConnectForm;

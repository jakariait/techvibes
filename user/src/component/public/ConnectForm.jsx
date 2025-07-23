import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ConnectForm = ({ userId }) => {
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
      const res = await axios.post("http://localhost:5050/api/connect", payload);
      setSnackbar({ open: true, message: res.data.message, severity: "success" });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        socialLink: "",
        message: "",
      });
    } catch (err) {
      const message = err.response?.data?.error || "Failed to submit connect.";
      setSnackbar({ open: true, message, severity: "error" });
    }
  };

  return (
    <div className="max-w-xl bg-[#212F35] inner-glow p-4 rounded-xl space-y-4">
      <h2 className="text-2xl font-semibold text-center">Connect With Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="url"
          name="socialLink"
          placeholder="Social Media Link"
          value={formData.socialLink}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded resize-none h-24"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ConnectForm;

import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const AppointmentForm = ({ userId, onSuccess }) => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    requesterName: "",
    requesterEmail: "",
    requesterPhone: "",
    appointmentDate: dayjs().format("YYYY-MM-DD"),
    appointmentTime: "09:00",
    message: "",
    location: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submit
    try {
      const payload = {
        ...formData,
        appointmentDate: new Date(formData.appointmentDate).toISOString(),
        userId,
      };

      await axios.post(`${apiURL}/appointments`, payload);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Appointment request submitted successfully.",
      });

      setFormData({
        requesterName: "",
        requesterEmail: "",
        requesterPhone: "",
        appointmentDate: dayjs().format("YYYY-MM-DD"),
        appointmentTime: "09:00",
        message: "",
        location: "",
      });

      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000);
      }
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to submit appointment request.",
      });
    }
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className={`max-w-xl mx-auto`}>
      <form onSubmit={handleSubmit} className={`text-white space-y-4`}>
        <input
          type="text"
          name="requesterName"
          placeholder="Full Name"
          required
          value={formData.requesterName}
          onChange={(e) => handleChange("requesterName", e.target.value)}
          className={`w-full p-3 rounded-md ${theme.connectFormBg} ${theme.text} border   focus:outline-none`}
        />

        <input
          type="email"
          name="requesterEmail"
          placeholder="Email Address"
          value={formData.requesterEmail}
          onChange={(e) => handleChange("requesterEmail", e.target.value)}
          className={`w-full p-3 rounded-md ${theme.connectFormBg} ${theme.text} border   focus:outline-none`}
        />

        <input
          type="tel"
          name="requesterPhone"
          placeholder="Phone Number"
          required
          value={formData.requesterPhone}
          onChange={(e) => handleChange("requesterPhone", e.target.value)}
          className={`w-full p-3 rounded-md ${theme.connectFormBg} ${theme.text} border   focus:outline-none`}
        />

        <div>
          <label
            htmlFor="appointmentDate"
            className={`block ${theme.text} mb-1`}
          >
            Select Date
          </label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            required
            value={formData.appointmentDate}
            onChange={(e) => handleChange("appointmentDate", e.target.value)}
            className={`w-full p-3 rounded-md ${theme.connectFormBg} ${theme.text} border   focus:outline-none`}
          />
        </div>

        <div>
          <label
            htmlFor="appointmentTime"
            className={`block ${theme.text} mb-1`}
          >
            Select Time
          </label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            required
            value={formData.appointmentTime}
            onChange={(e) => handleChange("appointmentTime", e.target.value)}
            className={`w-full p-3 rounded-md ${theme.connectFormBg} ${theme.text} border   focus:outline-none`}
          />
        </div>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className={`w-full p-3 rounded-md ${theme.connectFormBg} ${theme.text} border   focus:outline-none`}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`w-full p-3 rounded-md ${theme.connectFormBg} ${theme.text} border   focus:outline-none`}
        />

        <div className={`flex justify-center`}>
          <button
            type="submit"
            className={`border-2  ${theme.text} px-6 py-2 rounded cursor-pointer `}
          >
            Submit
          </button>
        </div>
      </form>

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

export default AppointmentForm;

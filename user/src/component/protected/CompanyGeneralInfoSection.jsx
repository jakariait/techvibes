import React, { useEffect, useState } from "react";
import axios from "axios";
import { Upload, Trash2, Building2 } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import useAuthUserStore from "../../store/AuthUserStore";
import LoadingLottie from "../public/LoadingLottie";
import ImageComponent from "../public/ImageComponent";

const apiURL = import.meta.env.VITE_API_URL;

const CompanyGeneralInfoSection = ({ companyId }) => {
  const { token } = useAuthUserStore();

  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [fields, setFields] = useState({
    companyName: "",
    companyLogo: "",
    website: "",
    phoneNumber: { label: "Head Office", value: "" },
    locations: { label: "Head Office", value: "" },
  });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "", type: "success" });
  };

  const fetchCompany = async () => {
    if (!companyId || !token) return;
    try {
      const res = await axios.get(`${apiURL}/company/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFields(res.data);
    } catch (err) {
      console.error("Error fetching company", err);
      showSnackbar("Failed to load company data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [companyId, token]);

  const handleChange = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (section, key, value) => {
    setFields((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !companyId || !token) return;
    const formData = new FormData();
    formData.append("companyLogo", file);
    formData.append("field", "companyLogo");

    try {
      setLoading(true);
      await axios.put(`${apiURL}/company/${companyId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      showSnackbar("Company logo updated successfully");
      fetchCompany(); // 🔁 Refetch to update logo
    } catch (err) {
      console.error("Logo upload failed", err);
      showSnackbar("Logo upload failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoDelete = async () => {
    setConfirmOpen(false);
    try {
      setLoading(true);
      await axios.put(
        `${apiURL}/company/${companyId}`,
        { companyLogo: "" },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      showSnackbar("Company logo deleted");
      fetchCompany(); // 🔁 Refetch to update view
    } catch (err) {
      console.error("Logo delete failed", err);
      showSnackbar("Failed to delete logo", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(`${apiURL}/company/${companyId}`, fields, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showSnackbar("Company info updated successfully");
    } catch (err) {
      console.error("Error updating company", err);
      showSnackbar("Failed to update company info", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingLottie />;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <Building2 className="w-5 h-5 text-green-400" />
        <h2 className="text-base font-medium text-green-400">
          Company General Info
        </h2>
      </div>

      {/* Company Name */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
        <label className="text-white md:w-[180px]">Company Name</label>
        <input
          type="text"
          value={fields.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
          className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
        />
      </div>

      {/* Website */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
        <label className="text-white md:w-[180px]">Website</label>
        <input
          type="text"
          value={fields.website}
          onChange={(e) => handleChange("website", e.target.value)}
          placeholder="https://example.com"
          className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center mb-3">
        <label className="text-white md:w-[180px]">Number</label>
        <input
          type="text"
          value={fields.phoneNumber?.label}
          onChange={(e) =>
            handleNestedChange("phoneNumber", "label", e.target.value)
          }
          placeholder="Label (e.g. Head Office)"
          className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
        />
        <input
          type="text"
          value={fields.phoneNumber?.value}
          onChange={(e) =>
            handleNestedChange("phoneNumber", "value", e.target.value)
          }
          placeholder="Phone Number"
          className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
        />
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center mb-3">
        <label className="text-white md:w-[180px]">Location</label>
        <input
          type="text"
          value={fields.locations?.label}
          onChange={(e) =>
            handleNestedChange("locations", "label", e.target.value)
          }
          placeholder="Label (e.g. Head Office)"
          className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
        />
        <input
          type="text"
          value={fields.locations?.value}
          onChange={(e) =>
            handleNestedChange("locations", "value", e.target.value)
          }
          placeholder="Location"
          className="bg-[#212F35] text-white p-2 rounded border border-gray-600 flex-1 focus:outline-none"
        />
      </div>

      {/* Logo Upload */}
      <div className="flex mt-5 gap-10 items-center  justify-center">
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
          <label className="cursor-pointer inline-flex items-center text-white px-4 py-2 rounded-md border border-white">
            <Upload size={16} className="mr-2" /> Upload Logo
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-300 mt-1 italic">
            📌 We recommend using a 1:1 ratio image for the best logo display.
          </p>
        </div>

        {fields.companyLogo && (
          <div className="mb-3 text-center relative">
            <ImageComponent
              imageName={fields.companyLogo}
              className="h-20 mx-auto rounded object-cover"
              altName="Company Logo"
            />
            <button
              onClick={() => setConfirmOpen(true)}
              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className="border-2 border-white text-white px-4 py-2 rounded cursor-pointer"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Logo?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this logo?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleLogoDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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

export default CompanyGeneralInfoSection;

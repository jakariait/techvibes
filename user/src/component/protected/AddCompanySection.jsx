import React, { useState } from "react";
import axios from "axios";
import { Building2, Plus, Loader2 } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useAuthUserStore from "../../store/AuthUserStore";

const apiUrl = import.meta.env.VITE_API_URL;

const AddCompanySection = ({ onCompanyAdded }) => {
  const { token } = useAuthUserStore();
  const [companyName, setCompanyName] = useState("");
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

  const handleAddCompany = async () => {
    if (!companyName.trim()) {
      showSnackbar("Company name is required", "warning");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${apiUrl}/company`,
        { companyName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSnackbar("Company created successfully");
      setCompanyName("");
      if (onCompanyAdded) onCompanyAdded(); // 🔁 refetch

    } catch (err) {
      console.error(err);
      showSnackbar(
        err.response?.data?.message || "Failed to create company",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-green-400" />
        <h2 className="text-base font-medium text-green-400">
          Add New Company
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
          className="w-full bg-transparent border-b border-gray-500 text-white px-2 py-2 focus:outline-none"
        />
        <button
          onClick={handleAddCompany}
          disabled={loading}
          className="flex w-64 items-center justify-center gap-2 cursor-pointer px-4 py-2 border border-white text-white rounded disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Creating...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" /> Add Company
            </>
          )}
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

export default AddCompanySection;

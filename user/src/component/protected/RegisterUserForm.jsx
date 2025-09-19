import React, { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { UserPlus } from "lucide-react";
import useAuthUserStore from "../../store/AuthUserStore.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const RegisterUserForm = ({ onUserCreated }) => {
  const { token } = useAuthUserStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "123456",
    role: "normal",
    company: "",
    isMainAdmin: false,
    isVarified: false,
    baseUrl: "user.techvibesbd.com",
    permission: [],
    themePermission: ["yellow", "green", "black", "red", "gray"],
  });

  const [permissionsList] = useState([
    "gallery",
    "productgallery",
    "brandLogo",
  ]);

  const [themePermissionsList] = useState([
    "magenta",
    "teal",
    "royalBlue",
    "purpleHaze",
    "yellow",
    "cream",
    "marrsGreen",
    "green",
    "black",
    "red",
    "gray",
  ]);

  const [companies, setCompanies] = useState([]);
  const [submitting, setSubmitting] = useState(false);
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
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${apiUrl}/company`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(res.data.companies || []);
      } catch (err) {
        showSnackbar("Failed to load companies", "error");
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "permission") {
      setFormData((prev) => {
        const newPermissions = checked
          ? [...prev.permission, value]
          : prev.permission.filter((p) => p !== value);
        return { ...prev, permission: newPermissions };
      });
    } else if (type === "checkbox" && name === "themePermission") {
      setFormData((prev) => {
        const newThemePermissions = checked
          ? [...prev.themePermission, value]
          : prev.themePermission.filter((p) => p !== value);
        return { ...prev, themePermission: newThemePermissions };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...formData };
      if (payload.role !== "corporate") delete payload.company;

      await axios.post(`${apiUrl}/register`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSnackbar("✅ User registered successfully!", "success");
      // ✅ Trigger parent to reload users
      onUserCreated?.();

      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "normal",
        company: "",
        isMainAdmin: false,
        isVarified: false,
        baseUrl: "user.techvibesbd.com",
        permission: [],
        themePermission: ["yellow", "green", "black", "red", "gray"],
      });
    } catch (err) {
      showSnackbar(
        err?.response?.data?.message || "❌ Registration failed.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#212F35] inner-glow p-6 rounded-xl max-w-7xl mx-auto text-white">
      <div className="flex items-center justify-center gap-2 mb-2">
        <UserPlus className="w-5 h-5 text-green-400" />
        <h2 className="text-base font-medium text-green-400">
          Register New User
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-[#212F35] border border-gray-600 text-white focus:outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-[#212F35] border border-gray-600 text-white focus:outline-none"
        />

        <input
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-[#212F35] border border-gray-600 text-white focus:outline-none"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#212F35] border border-gray-600 text-white focus:outline-none"
        >
          <option value="normal">Normal</option>
          <option value="corporate">Corporate</option>
        </select>

        {formData.role === "corporate" && (
          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#212F35] border border-gray-600 text-white focus:outline-none"
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.companyName}
              </option>
            ))}
          </select>
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isMainAdmin"
            checked={formData.isMainAdmin}
            onChange={handleChange}
          />
          <span>Is Main Admin</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isVarified"
            checked={formData.isVarified}
            onChange={handleChange}
          />
          <span>Is Verified</span>
        </label>

        <input
          type="text"
          name="baseUrl"
          placeholder="Base URL"
          value={formData.baseUrl}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#212F35] border border-gray-600 text-white focus:outline-none"
        />

        <div>
          <p className="font-semibold mb-1">Permissions:</p>
          <div className="grid grid-cols-2 gap-2">
            {permissionsList.map((perm) => (
              <label key={perm} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="permission"
                  value={perm}
                  checked={formData.permission.includes(perm)}
                  onChange={handleChange}
                />
                <span>{perm}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold mb-1">Theme Permissions:</p>
          <div className="grid grid-cols-2 gap-2">
            {themePermissionsList.map((perm) => (
              <label key={perm} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="themePermission"
                  value={perm}
                  checked={formData.themePermission.includes(perm)}
                  onChange={handleChange}
                />
                <span>{perm}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="border-2 border-white text-white px-6 py-2 rounded cursor-pointer mt-4"
          >
            {submitting ? "Registering..." : "Register User"}
          </button>
        </div>
      </form>

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

export default RegisterUserForm;

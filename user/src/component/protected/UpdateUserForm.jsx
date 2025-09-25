import React, { useEffect, useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Pencil } from "lucide-react";
import useAuthUserStore from "../../store/AuthUserStore.jsx";
import LoadingLottie from "../public/LoadingLottie.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const UpdateUserForm = ({ slug }) => {
  const { token } = useAuthUserStore();
  const [user, setUser] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const permissionsList = ["gallery", "productgallery", "brandLogo"];
  const themePermissionsList = [
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
  ];

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "", type: "success" });
  };

  useEffect(() => {
    const fetchUserAndCompanies = async () => {
      try {
        const [userRes, companyRes] = await Promise.all([
          axios.get(`${apiUrl}/userbyslug/${slug}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${apiUrl}/company`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const fetchedUser = userRes.data.user;
        fetchedUser.permission = fetchedUser.permission || [];
        fetchedUser.themePermission = fetchedUser.themePermission || [];
        setUser(fetchedUser);

        setCompanies(companyRes.data.companies || []);
      } catch (error) {
        showSnackbar("Failed to fetch user or companies", "error");
      }
    };

    fetchUserAndCompanies();
  }, [slug, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "permission") {
        setUser((prev) => {
          const newPermissions = checked
            ? [...prev.permission, value]
            : prev.permission.filter((p) => p !== value);
          return { ...prev, permission: newPermissions };
        });
      } else if (name === "themePermission") {
        setUser((prev) => {
          const newThemePermissions = checked
            ? [...prev.themePermission, value]
            : prev.themePermission.filter((p) => p !== value);
          return { ...prev, themePermission: newThemePermissions };
        });
      } else {
        setUser((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...user };
      if (payload.role !== "corporate") delete payload.company;

      await axios.patch(`${apiUrl}/userbyslug/${slug}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showSnackbar("✅ User updated successfully!", "success");
    } catch (error) {
      showSnackbar(
        error?.response?.data?.message || "❌ Update failed.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return <LoadingLottie />;

  return (
    <div className="bg-[#212F35] inner-glow p-6 rounded-xl max-w-7xl mx-auto text-white">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Pencil className="w-5 h-5 text-yellow-400" />
        <h2 className="text-base font-medium text-yellow-400">Update User</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={user.fullName}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-[#212F35] border border-gray-600 text-white focus:outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={user.email}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-[#212F35] border border-gray-600 text-white focus:outline-none"
        />

        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#212F35] border border-gray-600 text-white focus:outline-none"
        >
          <option value="normal">Normal</option>
          <option value="corporate">Corporate</option>
        </select>

        {user.role === "corporate" && (
          <select
            name="company"
            value={user.company || ""}
            onChange={handleChange}
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
            checked={user.isMainAdmin}
            onChange={handleChange}
          />
          <span>Is Main Admin</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isVarified"
            checked={user.isVarified}
            onChange={handleChange}
          />
          <span>Is Verified</span>
        </label>

        <input
          type="text"
          name="baseUrl"
          placeholder="Base URL"
          value={user.baseUrl}
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
                  checked={user.permission?.includes(perm)}
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
                  checked={user.themePermission?.includes(perm)}
                  onChange={handleChange}
                />
                <span>{perm}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="text-sm ">
          <p>
            Last update by: {user?.lastUpdatedBy?.fullName || "Unknown"} (
            {user?.lastUpdatedBy?.email || "No email"})
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="border-2 border-white text-white px-6 py-2 rounded cursor-pointer mt-4"
          >
            {submitting ? "Updating..." : "Update User"}
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
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UpdateUserForm;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {UserPlus, UserMinus, Shield, Users, Search, X, Eye} from "lucide-react";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import useAuthUserStore from "../../store/AuthUserStore";
import LoadingLottie from "../public/LoadingLottie";

const apiURL = import.meta.env.VITE_API_URL;

const AdminManagementSection = ({companyId}) => {
  const {  token } = useAuthUserStore();

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Company admins array
  const [admins, setAdmins] = useState([]);
  // List of all users belonging to this company
  const [companyUsers, setCompanyUsers] = useState([]);

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "", type: "success" });
  };

  // Fetch company admins
  const fetchCompanyAdmins = async () => {
    if (!companyId || !token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${apiURL}/company/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdmins(Array.isArray(res.data.admins) ? res.data.admins : []);
    } catch (err) {
      console.error("Error fetching company admins", err);
      showSnackbar(
        err.response?.data?.message || "Failed to load admin data",
        "error",
      );
      setAdmins([]);
    }
  };

  // Fetch all users belonging to company
  const fetchCompanyUsers = async () => {
    if (!companyId || !token) return;

    try {
      const res = await axios.get(`${apiURL}/by-company/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanyUsers(Array.isArray(res.data.users) ? res.data.users : []);
    } catch (err) {
      console.error("Error fetching company users", err);
      showSnackbar(
        err.response?.data?.message || "Failed to load company users",
        "error",
      );
      setCompanyUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyId && token) {
      const loadData = async () => {
        await fetchCompanyAdmins();
        await fetchCompanyUsers();
      };
      loadData();
    }
  }, [companyId, token]);

  // Add admin handler
  const addAdmin = async (userIdToAdd) => {
    if (!userIdToAdd || !companyId || !token) return;

    if (admins.includes(userIdToAdd)) {
      showSnackbar("User is already an admin", "warning");
      return;
    }

    const updatedAdmins = [...admins, userIdToAdd];

    try {
      setProcessing(true);
      const res = await axios.put(
        `${apiURL}/company/${companyId}`,
        { admins: updatedAdmins },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setAdmins(
        Array.isArray(res.data.admins) ? res.data.admins : updatedAdmins,
      );
      showSnackbar("Admin added successfully");
    } catch (err) {
      console.error("Failed to add admin", err);
      showSnackbar(
        err.response?.data?.message || "Failed to add admin",
        "error",
      );
    } finally {
      setProcessing(false);
    }
  };

  // Remove admin handler
  const removeAdmin = async (userIdToRemove) => {
    if (!userIdToRemove || !companyId || !token) return;

    // Prevent removing the last admin
    if (admins.length <= 1) {
      showSnackbar(
        "Cannot remove the last admin. Company must have at least one admin.",
        "warning",
      );
      return;
    }

    const updatedAdmins = admins.filter((id) => id !== userIdToRemove);

    try {
      setProcessing(true);
      const res = await axios.put(
        `${apiURL}/company/${companyId}`,
        { admins: updatedAdmins },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setAdmins(
        Array.isArray(res.data.admins) ? res.data.admins : updatedAdmins,
      );
      showSnackbar("Admin removed successfully");
    } catch (err) {
      console.error("Failed to remove admin", err);
      showSnackbar(
        err.response?.data?.message || "Failed to remove admin",
        "error",
      );
    } finally {
      setProcessing(false);
    }
  };

  // Loading state
  if (loading) return <LoadingLottie />;

  // No company or token
  if (!companyId || !token) {
    return (
      <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6 max-w-4xl mx-auto">
        <div className="text-center text-red-400">
          Unable to load admin information. Please try logging in again.
        </div>
      </div>
    );
  }

  // Filter users into current admins and non-admins
  const currentAdmins = companyUsers.filter((user) =>
    admins.includes(user._id),
  );
  const nonAdmins = companyUsers.filter((user) => !admins.includes(user._id));

  // Filter non-admins based on search query
  const filteredNonAdmins = nonAdmins.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.fullName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 justify-center">
        <Shield className="w-5 h-5 text-green-400" />
        <h2 className="text-base font-medium text-green-400">
          Admin Management
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#152023] p-4 rounded-lg border border-gray-600 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-medium">Total Admins</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {currentAdmins.length}
          </div>
        </div>

        <div className="bg-[#152023] p-4 rounded-lg border border-gray-600 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-medium">Total Users</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {companyUsers.length}
          </div>
        </div>

        <div className="bg-[#152023] p-4 rounded-lg border border-gray-600 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <UserPlus className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-medium">
              Available to Add
            </span>
          </div>
          <div className="text-2xl font-bold text-white">
            {searchQuery ? filteredNonAdmins.length : nonAdmins.length}
          </div>
          {searchQuery && (
            <div className="text-xs text-gray-400 mt-1">
              of {nonAdmins.length} total
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Admins Section */}
        <div className="bg-[#152023] p-4 rounded-lg border border-gray-600">
          <h3 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <Shield size={18} />
            Current Admins ({currentAdmins.length})
          </h3>

          {currentAdmins.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 italic">No admins assigned yet.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 scrollbar-hide overflow-y-auto">
              {currentAdmins.map((admin) => (
                <div
                  key={admin._id}
                  className="flex items-center justify-between bg-[#1e2c31] p-3 rounded-lg border border-gray-600 hover:border-green-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">
                        {admin.fullName}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {admin.email}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeAdmin(admin._id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 flex items-center gap-1 px-3 py-1 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    title="Remove Admin"
                    disabled={processing || currentAdmins.length <= 1}
                  >
                    {processing ? (
                      <CircularProgress size={14} color="inherit" />
                    ) : (
                      <UserMinus size={16} />
                    )}
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {currentAdmins.length === 1 && (
            <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-400 text-sm">
              ⚠️ This is the last admin. At least one admin is required.
            </div>
          )}
        </div>

        {/* Add New Admin Section */}
        <div className="bg-[#152023] scrollbar-hide p-4 rounded-lg border border-gray-600">
          <h3 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
            <UserPlus size={18} />
            Add New Admin ({filteredNonAdmins.length} of {nonAdmins.length})
          </h3>

          {/* Search Input */}
          {nonAdmins.length > 0 && (
            <div className="mb-4 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full bg-[#1e2c31] text-white pl-10 pr-10 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-green-400 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Results Info */}
              {searchQuery && (
                <div className="mt-2 text-sm text-gray-400">
                  {filteredNonAdmins.length === 0 ? (
                    <span className="text-yellow-400">
                      No users found matching "{searchQuery}"
                    </span>
                  ) : (
                    <span>
                      Showing {filteredNonAdmins.length} of {nonAdmins.length}{" "}
                      users
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {nonAdmins.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 italic">
                {companyUsers.length === 0
                  ? "No users found in this company."
                  : "All users are already admins."}
              </p>
            </div>
          ) : filteredNonAdmins.length === 0 && searchQuery ? (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 italic">
                No users found matching "
                <span className="text-yellow-400">{searchQuery}</span>"
              </p>
              <button
                onClick={clearSearch}
                className="mt-2 text-green-400 hover:text-green-300 text-sm underline"
              >
                Clear search to show all users
              </button>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 scrollbar-hide overflow-y-auto">
              {filteredNonAdmins.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between bg-[#1e2c31] p-3 rounded-lg border border-gray-600 hover:border-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span
                        className="text-white font-medium"
                        dangerouslySetInnerHTML={{
                          __html: searchQuery
                            ? user.fullName.replace(
                                new RegExp(`(${searchQuery})`, "gi"),
                                '<mark class="bg-yellow-400/30 text-yellow-200 px-1 rounded">$1</mark>',
                              )
                            : user.fullName,
                        }}
                      />
                      <span
                        className="text-gray-400 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: searchQuery
                            ? user.email.replace(
                                new RegExp(`(${searchQuery})`, "gi"),
                                '<mark class="bg-yellow-400/30 text-yellow-200 px-1 rounded">$1</mark>',
                              )
                            : user.email,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 ">
                    {user.slug && (
                      <a
                        href={`/profile/${user.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-200 text-sm flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => addAdmin(user._id)}
                      className="text-green-400 hover:text-green-300 hover:bg-green-400/10 flex items-center gap-1 px-3 py-1 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      title="Add as Admin"
                      disabled={processing}
                    >
                      {processing ? (
                        <CircularProgress size={14} color="inherit" />
                      ) : (
                        <UserPlus size={16} />
                      )}
                      Add
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
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

export default AdminManagementSection;

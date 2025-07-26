import React, { useEffect, useState } from "react";
import { Users, Search, Loader2, Pencil, Trash2, Eye } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const apiUrl = import.meta.env.VITE_API_URL;

const AllUsersSection = () => {
  const [users, setUsers] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allTimeTotal, setAllTimeTotal] = useState(0);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmText, setConfirmText] = useState("");

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/getAllUsers`, {
        params: { page, search },
      });
      setUsers(res.data.users || []);
      setTotalPages(res.data.pages || 1);
      setAllTimeTotal(res.data.allTimeTotal || 0);
    } catch (error) {
      showSnackbar("Failed to fetch users", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "", type: "success" });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setConfirmText("");
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(`${apiUrl}/userbyslug/${userToDelete.slug}`);
      showSnackbar(`User ${userToDelete.fullName} deleted`, "success");
      setDeleteDialogOpen(false);
      fetchUsers(); // refresh list
    } catch (error) {
      showSnackbar("Failed to delete user", "error");
      console.error(error);
    }
  };

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-green-400" />
          <h2 className="text-base font-medium text-green-400">All Users</h2>
        </div>
        <p className="text-white text-sm">Total created: {allTimeTotal}</p>
      </div>

      {/* Search Field */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="text-white w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={handleSearch}
          className="flex-1 bg-transparent border-b border-gray-500 text-white px-2 py-1 focus:outline-none"
        />
      </div>

      {/* User List */}
      {loading ? (
        <div className="flex justify-center items-center text-white">
          <Loader2 className="animate-spin mr-2" /> Loading users...
        </div>
      ) : users.length === 0 ? (
        <p className="text-white text-sm text-center">No users found</p>
      ) : (
        <ul className="text-white grid md:grid-cols-2 gap-3">
          {users.map((user) => (
            <li
              key={user._id}
              className="border border-gray-600 rounded p-3 flex flex-col md:flex-row justify-between md:items-center gap-2"
            >
              <div>
                <p className="font-semibold">{user.fullName}</p>
                <p className="text-sm text-gray-300">{user.email}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
                <a
                  href={`https://${user.baseUrl}/profile/${user?.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" rounded-full py-2 px-2 flex items-center cursor-pointer gap-2"
                >
                  <Eye className="w-4 h-4" />
                </a>
                <button
                  onClick={() => navigate(`/user/edit-user-admin/${user.slug}`)}
                  className="text-blue-400 hover:text-blue-600 cursor-pointer"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(user)}
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-white border px-3 py-1 cursor-pointer rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white text-sm pt-1">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="text-white border px-3 py-1 cursor-pointer rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ backgroundColor: "#212F35", color: "#fff" }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#212F35", color: "#fff" }}>
          <p className="mb-2 text-sm">
            To confirm deletion of <strong>{userToDelete?.fullName}</strong>,
            please type:
            <code className="font-mono bg-gray-800 text-white px-2 py-1 rounded ml-1">
              delete {userToDelete?.fullName}
            </code>
          </p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={`delete ${userToDelete?.fullName}`}
            className="w-full bg-transparent border border-gray-500 text-white p-2 rounded mt-2 focus:outline-none"
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#212F35", color: "#fff" }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ color: "#fff" }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            disabled={confirmText !== `delete ${userToDelete?.fullName}`}
          >
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

export default AllUsersSection;

import React, { useEffect, useState } from "react";
import { Users, Search, Pencil, Trash2, Eye, Loader2, Download } from "lucide-react";
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
import useAuthUserStore from "../../store/AuthUserStore.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const AllUsersSection = ({ reload }) => {
  const { token } = useAuthUserStore();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // New filter states
  const [filterType, setFilterType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState([]); // To store list of companies
  const [applyFilter, setApplyFilter] = useState(false);


  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmText, setConfirmText] = useState("");

  const navigate = useNavigate();

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(`${apiUrl}/get-all-company-info`);
      setCompanies(res.data || []);
    } catch (err) {
      console.error("Failed to fetch companies", err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);


  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/getAllUsers`, {
        params: {
          page,
          search,
          filterType,
          startDate,
          endDate,
          month,
          year,
          company,
        },
      });

      setUsers(res.data.users || []);
      setTotalPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } catch (err) {
      showSnackbar("Failed to fetch users", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [reload, page, search, applyFilter]);

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "", type: "success" });
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setConfirmText("");
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(
        `${apiUrl}/userbyslug/${userToDelete.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSnackbar(`User ${userToDelete.fullName} deleted`, "success");
      setDeleteDialogOpen(false);
      fetchUsers(); // refetch after deletion
    } catch (err) {
      showSnackbar("Failed to delete user", "error");
    }
  };

  const handleReset = () => {
    setFilterType("");
    setStartDate("");
    setEndDate("");
    setMonth("");
    setYear("");
    setCompany("");
    setApplyFilter(p => !p);
  }
  
  const handleExportCSV = async () => {
    try {
      const res = await axios.get(`${apiUrl}/exportUsersCSV`, {
        params: {
          search,
          filterType,
          startDate,
          endDate,
          month,
          year,
          company,
        },
        responseType: 'blob', // Important
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      showSnackbar("Failed to export users", "error");
      console.error(err);
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
        <p className="text-white text-sm">Total Users: {total}</p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 mb-4">
        <Search className="text-white w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page when search changes
          }}
          className="flex-1 bg-transparent border-b border-gray-500 text-white px-2 py-1 focus:outline-none"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-transparent border border-gray-500 text-white px-2 py-1 rounded focus:outline-none"
        >
          <option value="">Filter by...</option>
          <option value="lastDay">Last Day User Create</option>
          <option value="lastWeek">Last Week User Create</option>
          <option value="lastMonth">Last Month User Create</option>
          <option value="lastYear">Last Year User Create</option>
          <option value="dateToDate">Date to Date</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          {/*<option value="company">Company</option>*/}
        </select>

        {filterType === "dateToDate" && (
          <>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent border border-gray-500 text-white px-2 py-1 rounded focus:outline-none"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent border border-gray-500 text-white px-2 py-1 rounded focus:outline-none"
            />
          </>
        )}

        {filterType === "month" && (
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-transparent border border-gray-500 text-white px-2 py-1 rounded focus:outline-none"
          >
            <option value="">Select Month</option>
            {[...Array(12).keys()].map((m) => (
              <option key={m + 1} value={m + 1}>
                {new Date(0, m).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        )}

        {(filterType === "month" || filterType === "year") && (
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-transparent border border-gray-500 text-white px-2 py-1 rounded focus:outline-none"
          />
        )}

        {filterType === "company" && (
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="bg-transparent border border-gray-500 text-white px-2 py-1 rounded focus:outline-none"
          >
            <option value="">Select Company</option>
            {companies.map((c) => (
              <option key={c._id} value={c.companyName}>
                {c.companyName}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={() => {setPage(1); setApplyFilter(p => !p)}}
          className="bg-blue-500 text-white cursor-pointer px-4 py-1 rounded hover:bg-blue-600"
        >
          Filter
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white cursor-pointer px-4 py-1 rounded hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          onClick={handleExportCSV}
          className="bg-green-500 text-white cursor-pointer px-4 py-1 rounded hover:bg-green-600 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>


      {/* User List */}
      {loading ? (
        <div className="flex justify-center text-white py-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading users...
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
                  // href={`https://${user.baseUrl}/profile/${user.slug}`}

                  href={`/profile/${user.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Eye className="w-4 h-4" />
                </a>
                <button
                  onClick={() => navigate(`/user/edit-user-admin/${user.slug}`)}
                  className="text-blue-400 hover:text-blue-600 cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(user)}
                  className="text-red-400 hover:text-red-600 cursor-pointer"
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
            className="text-white border px-3 py-1 rounded cursor-pointer disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white text-sm pt-1">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="text-white border px-3 py-1 rounded cursor-pointer disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Dialog */}
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
            <code className="ml-1 bg-gray-800 text-white px-2 py-1 rounded">
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
        <DialogActions sx={{ backgroundColor: "#212F35" }}>
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

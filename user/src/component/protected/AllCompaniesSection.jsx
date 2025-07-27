import React, { useEffect, useState } from "react";
import {
  Building2,
  Loader2,
  Pencil,
  Trash2,
  Search,
  FileDown,
} from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthUserStore from "../../store/AuthUserStore.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const AllCompaniesSection = ({ companies = [], refreshCompanies, loading }) => {
  const { token } = useAuthUserStore();

  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [confirmText, setConfirmText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter((company) =>
      company.companyName?.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredCompanies(filtered);
    setTotal(filtered.length);
    setPage(1); // Reset to page 1 on search
  }, [search, companies]);

  const showSnackbar = (message, type = "success") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "", type: "success" });
  };

  const handleDeleteClick = (company) => {
    setCompanyToDelete(company);
    setConfirmText("");
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!companyToDelete) return;
    try {
      await axios.delete(`${apiUrl}/company/${companyToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSnackbar(`Company ${companyToDelete.companyName} deleted`, "success");
      setDeleteDialogOpen(false);
      refreshCompanies();
    } catch (error) {
      showSnackbar("Failed to delete company", "error");
    }
  };

  const handleExportCSV = () => {
    const header = [
      "Company Name",
      "Website",
      "Phone Label",
      "Phone",
      "Location Label",
      "Location",
    ];
    const rows = filteredCompanies.map((c) => [
      c.companyName || "",
      c.website || "",
      c.phoneNumber?.label || "",
      c.phoneNumber?.value || "",
      c.locations?.label || "",
      c.locations?.value || "",
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows]
        .map((e) => e.map((cell) => `"${cell}"`).join(","))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "companies.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(filteredCompanies.length / pageSize);
  const currentPageCompanies = filteredCompanies.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-green-400" />
          <h2 className="text-base font-medium text-green-400">
            All Companies
          </h2>
        </div>
        <p className="text-white text-sm">Total Companies: {total}</p>
      </div>

      {/* Search and Export */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 flex-1">
          <Search className="text-white w-5 h-5" />
          <input
            type="text"
            placeholder="Search by company name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-gray-500 text-white px-2 py-1 focus:outline-none"
          />
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-1 border border-white text-white cursor-pointer rounded "
        >
          <FileDown className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Company List */}
      {loading ? (
        <div className="flex justify-center items-center text-white">
          <Loader2 className="animate-spin mr-2" /> Loading companies...
        </div>
      ) : currentPageCompanies.length === 0 ? (
        <p className="text-white text-sm text-center">No companies found</p>
      ) : (
        <ul className="text-white grid md:grid-cols-2 gap-3">
          {currentPageCompanies.map((company) => (
            <li
              key={company._id}
              className="border border-gray-600 rounded p-3 flex flex-col md:flex-row justify-between md:items-center gap-2"
            >
              <div>
                <p className="font-semibold">{company.companyName}</p>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-300 underline"
                  >
                    {company.website}
                  </a>
                )}
                {company.phoneNumber?.value && (
                  <p className="text-sm text-gray-300">
                    {company.phoneNumber.label}: {company.phoneNumber.value}
                  </p>
                )}
                {company.locations?.value && (
                  <p className="text-sm text-gray-300">
                    {company.locations.label}: {company.locations.value}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/user/edit-company/${company._id}`)}
                  className="text-blue-400 hover:text-blue-600 cursor-pointer"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(company)}
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
            To confirm deletion of{" "}
            <strong>{companyToDelete?.companyName}</strong>, please type:
            <code className="font-mono bg-gray-800 text-white px-2 py-1 rounded ml-1">
              delete {companyToDelete?.companyName}
            </code>
          </p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={`delete ${companyToDelete?.companyName}`}
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
            disabled={confirmText !== `delete ${companyToDelete?.companyName}`}
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

export default AllCompaniesSection;

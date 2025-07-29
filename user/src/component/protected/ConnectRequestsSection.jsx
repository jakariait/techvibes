import React, { useEffect, useState } from "react";
import { Contact, Trash2, Download, Pencil, FileDown } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import axios from "axios";
import useAuthUserStore from "../../store/AuthUserStore.jsx";
import LoadingLottie from "../public/LoadingLottie.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const ConnectRequestsSection = ({ userId }) => {
  const {  token } = useAuthUserStore();
  const [connects, setConnects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [connectToDelete, setConnectToDelete] = useState(null);
  const [connectToEdit, setConnectToEdit] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const connectsPerPage = 6;

  const showSnackbar = (message, type = "success") =>
    setSnackbar({ open: true, message, type });
  const closeSnackbar = () =>
    setSnackbar({ open: false, message: "", type: "success" });

  const fetchConnects = async () => {
    if (!userId || !token) return;
    try {
      const res = await axios.get(`${apiURL}/connect/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConnects(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      showSnackbar("Failed to load connect requests", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnects();
  }, [userId, token]);

  const openDeleteDialog = (connect) => {
    setConnectToDelete(connect);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!connectToDelete) return;
    try {
      await axios.delete(`${apiURL}/connect/${connectToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConnects((prev) =>
        prev.filter((item) => item._id !== connectToDelete._id),
      );
      showSnackbar("Connect request deleted");
    } catch (err) {
      console.error("Delete error:", err);
      showSnackbar("Failed to delete connect", "error");
    } finally {
      setDeleteDialogOpen(false);
      setConnectToDelete(null);
    }
  };

  const openEditDialog = (connect) => {
    setConnectToEdit({ ...connect });
    setEditDialogOpen(true);
  };

  const confirmEdit = async () => {
    try {
      await axios.put(`${apiURL}/connect/${connectToEdit._id}`, connectToEdit, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConnects((prev) =>
        prev.map((item) =>
          item._id === connectToEdit._id ? connectToEdit : item,
        ),
      );
      showSnackbar("Connect request updated");
    } catch (err) {
      console.error("Edit error:", err);
      showSnackbar("Failed to update connect", "error");
    } finally {
      setEditDialogOpen(false);
      setConnectToEdit(null);
    }
  };

  const downloadVCard = (connect) => {
    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${connect.fullName}
EMAIL:${connect.email}
TEL:${connect.phone}
URL:${connect.socialLink || ""}
NOTE:${connect.message}
END:VCARD
    `.trim();

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${connect.fullName || "contact"}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "SocialLink",
      "Message",
      "SubmittedAt",
    ];
    const rows = filteredConnects.map((c) => [
      c.fullName,
      c.email,
      c.phone,
      c.socialLink || "",
      c.message,
      new Date(c.createdAt).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `connects_${Date.now()}.csv`);
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePageChange = (event, value) => setCurrentPage(value);

  const filteredConnects = connects.filter((connect) => {
    const term = searchTerm.toLowerCase();
    return (
      connect.fullName.toLowerCase().includes(term) ||
      connect.email.toLowerCase().includes(term) ||
      connect.phone.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredConnects.length / connectsPerPage);

  const paginatedConnects = filteredConnects.slice(
    (currentPage - 1) * connectsPerPage,
    currentPage * connectsPerPage,
  );

  if (loading) return <LoadingLottie />;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-4 justify-between">
        <div className="flex items-center gap-2">
          <Contact className="w-5 h-5 text-green-400" />
          <h2 className="text-base font-medium text-green-400">
            Total Connects: {connects.length}
          </h2>
        </div>

        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 px-4 py-1 border border-white text-white cursor-pointer rounded "
        >
          <FileDown className="w-4 h-4" /> Export CSV
        </button>
      </div>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-full max-w-md rounded-lg border border-gray-600 bg-[#1a1f24] text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {paginatedConnects.map((connect) => (
          <div
            key={connect._id}
            className="border border-gray-600 rounded-lg p-4  text-white bg-[#1a1f24]"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p>
                  <strong>Name:</strong> {connect.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {connect.email}
                </p>
                <p>
                  <strong>Phone:</strong> {connect.phone}
                </p>
                {connect.socialLink && (
                  <p>
                    <strong>Social Link:</strong>{" "}
                    <a
                      href={connect.socialLink}
                      className="underline text-blue-400"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {connect.socialLink}
                    </a>
                  </p>
                )}
                <p>
                  <strong>Message:</strong> {connect.message}
                </p>
                <p className="text-sm text-gray-400">
                  Submitted: {new Date(connect.createdAt).toLocaleString()}
                </p>
                <div className={"flex items-center justify-center mt-5"}>
                  <button
                    onClick={() => downloadVCard(connect)}
                    className="bg-[#4E4E4E] text-white font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4 cursor-pointer"
                    title="Download vCard"
                  >
                    <Download />
                    Save This Contact
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => openEditDialog(connect)}
                  className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                  title="Edit"
                >
                  <Pencil className="w-5 h-5" />
                </button>

                <button
                  onClick={() => openDeleteDialog(connect)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {connects.length > connectsPerPage && (
        <div className="flex justify-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
                borderColor: "#ccc",
              },
              "& .Mui-selected": { backgroundColor: "#1976d2", color: "white" },
            }}
          />
        </div>
      )}

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Connect Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this connect request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#212F35", // dark slate
            color: "white", // white text
          },
        }}
      >
        <DialogTitle>Edit Connect</DialogTitle>
        <DialogContent>
          {["fullName", "email", "phone", "socialLink", "message"].map(
            (field) => (
              <TextField
                key={field}
                margin="dense"
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                fullWidth
                variant="outlined"
                value={connectToEdit?.[field] || ""}
                onChange={(e) =>
                  setConnectToEdit((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
                sx={{
                  mt: 1,
                  input: { color: "white" },
                  label: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#aaa",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
                InputLabelProps={{ style: { color: "white" } }}
              />
            ),
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmEdit} color="success">
            Save
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

export default ConnectRequestsSection;

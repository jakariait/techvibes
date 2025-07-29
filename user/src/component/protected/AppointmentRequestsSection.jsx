import React, { useEffect, useState } from "react";
import { Trash2, CalendarDays, Pencil, Download } from "lucide-react";
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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const apiURL = import.meta.env.VITE_API_URL;

const AppointmentRequestsSection = ({ userId }) => {
  const {  token } = useAuthUserStore();
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    accepted: 0,
    declined: 0,
  });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 6;
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const showSnackbar = (message, type = "success") =>
    setSnackbar({ open: true, message, type });
  const closeSnackbar = () =>
    setSnackbar({ open: false, message: "", type: "success" });

  const fetchAppointments = async () => {
    if (!userId || !token) return;
    try {
      const res = await axios.get(`${apiURL}/appointments/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data.data || []);
      setStatusCounts(res.data.statusCounts || {});
    } catch (err) {
      console.error("Fetch error:", err);
      showSnackbar("Failed to load appointments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [userId, token]);

  const openDeleteDialog = (appointment) => {
    setAppointmentToDelete(appointment);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!appointmentToDelete) return;
    try {
      await axios.delete(`${apiURL}/appointments/${appointmentToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchAppointments();
      showSnackbar("Appointment deleted");
    } catch (err) {
      console.error("Delete error:", err);
      showSnackbar("Failed to delete appointment", "error");
    } finally {
      setDeleteDialogOpen(false);
      setAppointmentToDelete(null);
    }
  };

  const openEditDialog = (appointment) => {
    setAppointmentToEdit({ ...appointment });
    setEditDialogOpen(true);
  };

  const confirmEdit = async () => {
    try {
      await axios.patch(
        `${apiURL}/appointments/${appointmentToEdit._id}`,
        appointmentToEdit,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      await fetchAppointments();
      showSnackbar("Appointment updated");
    } catch (err) {
      console.error("Edit error:", err);
      showSnackbar("Failed to update appointment", "error");
    } finally {
      setEditDialogOpen(false);
      setAppointmentToEdit(null);
    }
  };

  const handlePageChange = (event, value) => setCurrentPage(value);

  const filteredAppointments = appointments.filter((a) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      a.requesterName?.toLowerCase().includes(term) ||
      a.requesterEmail?.toLowerCase().includes(term) ||
      a.requesterPhone?.toLowerCase().includes(term);

    const matchesStatus = statusFilter === "all" || a.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * appointmentsPerPage,
    currentPage * appointmentsPerPage,
  );

  const downloadVCard = (connect) => {
    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${connect.requesterName}
EMAIL:${connect.requesterEmail}
TEL:${connect.requesterPhone}
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
      "Date",
      "Time",
      "Location",
      "Message",
      "Status",
      "SubmittedAt",
    ];
    const rows = filteredAppointments.map((a) => [
      a.requesterName,
      a.requesterEmail,
      a.requesterPhone,
      new Date(a.appointmentDate).toLocaleDateString(),
      a.appointmentTime,
      a.location,
      a.message || "",
      a.status.charAt(0).toUpperCase() + a.status.slice(1),
      new Date(a.createdAt).toLocaleString(),
    ]);
    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `appointments_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
  if (loading) return <LoadingLottie />;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-medium text-blue-400">
            Total Appointments: {appointments.length}
          </h2>
        </div>
        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 px-4 py-1 border border-white text-white cursor-pointer rounded "
        >
          <Download className="w-4 h-4" />
          Download CSV
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 w-full max-w-md rounded-lg border border-gray-600 bg-[#1a1f24] text-white focus:outline-none focus:border-blue-400"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
        </select>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-white text-center">
        <div className="bg-[#1a1f24] p-4 rounded-lg border border-gray-600">
          <p className="text-lg font-semibold text-yellow-400">Pending</p>
          <p className="text-2xl font-bold">{statusCounts.pending}</p>
        </div>
        <div className="bg-[#1a1f24] p-4 rounded-lg border border-gray-600">
          <p className="text-lg font-semibold text-green-400">Accepted</p>
          <p className="text-2xl font-bold">{statusCounts.accepted}</p>
        </div>
        <div className="bg-[#1a1f24] p-4 rounded-lg border border-gray-600">
          <p className="text-lg font-semibold text-red-400">Declined</p>
          <p className="text-2xl font-bold">{statusCounts.declined}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {paginatedAppointments.map((appointment) => (
          <div
            key={appointment._id}
            className="border border-gray-600 rounded-lg p-4 text-white bg-[#1a1f24]"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p>
                  <strong>Name:</strong> {appointment.requesterName}
                </p>
                <p>
                  <strong>Email:</strong> {appointment.requesterEmail}
                </p>
                <p>
                  <strong>Phone:</strong> {appointment.requesterPhone}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {appointment.appointmentTime}
                </p>
                <p>
                  <strong>Location:</strong> {appointment.location}
                </p>
                <p>
                  <strong>Message:</strong> {appointment.message || "-"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      appointment.status === "pending"
                        ? "text-yellow-400"
                        : appointment.status === "accepted"
                          ? "text-green-400"
                          : "text-red-400"
                    }
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </span>
                </p>

                <p className="text-sm text-gray-400">
                  Submitted: {new Date(appointment.createdAt).toLocaleString()}
                </p>
                <div className={"flex items-center justify-center mt-5"}>
                  <button
                    onClick={() => downloadVCard(appointment)}
                    className="bg-[#4E4E4E] text-white font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4 cursor-pointer"
                    title="Download vCard"
                  >
                    <Download />
                    Save Contact
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => openEditDialog(appointment)}
                  className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                  title="Edit"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => openDeleteDialog(appointment)}
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

      {appointments.length > appointmentsPerPage && (
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
              "& .Mui-selected": {
                backgroundColor: "#1976d2",
                color: "white",
              },
            }}
          />
        </div>
      )}

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this appointment request?
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
            backgroundColor: "#212F35",
            color: "white",
          },
        }}
      >
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          {[
            "requesterName",
            "requesterEmail",
            "requesterPhone",
            "appointmentTime",
            "message",
          ].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              fullWidth
              variant="outlined"
              value={appointmentToEdit?.[field] || ""}
              onChange={(e) =>
                setAppointmentToEdit((prev) => ({
                  ...prev,
                  [field]: e.target.value,
                }))
              }
              sx={{
                mt: 1,
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#aaa" },
                  "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                },
              }}
              InputLabelProps={{ style: { color: "white" } }}
            />
          ))}
          {/* Status Selector */}
          <FormControl fullWidth margin="dense">
            <InputLabel sx={{ color: "white" }}>Status</InputLabel>
            <Select
              value={appointmentToEdit?.status || "pending"}
              onChange={(e) =>
                setAppointmentToEdit((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
              label="Status"
              sx={{
                color: "white",
                svg: { color: "white" }, // ✅ This makes the dropdown arrow white

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#aaa",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1976d2",
                },
              }}
            >
              {["pending", "accepted", "declined"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default AppointmentRequestsSection;

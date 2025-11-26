// EditUserDesignationSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { Pencil } from "lucide-react";
import useAuthUserStore from "../../store/AuthUserStore.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const EditUserDesignationSection = ({ slug, onClose, onSaved }) => {
  const { token, user } = useAuthUserStore();

  const [designation, setDesignation] = useState("");
  const [idNumber, setIdNumber] = useState(""); // New state for ID number
  const [department, setDepartment] = useState("");
  const [editDesignationCompany, setEditDesignationCompany] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const showSnackbar = (message, type = "success") =>
    setSnackbar({ open: true, message, type });
  const closeSnackbar = () =>
    setSnackbar({ open: false, message: "", type: "success" });

  useEffect(() => {
    if (!slug || !token) return;
    setLoading(true);

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${apiURL}/userbyslug/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profile = res.data?.profile || {};
        setDesignation(profile.designation || "");
        setIdNumber(profile.idNumber || ""); // Fetch ID number
        setDepartment(profile.department || "");
        setEditDesignationCompany(profile.editDesignationCompany || false);
      } catch (err) {
        showSnackbar("Failed to load data", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [slug, token]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        designation,
      };

      if (user?.company === "691b46700f3b99a078f08b46") {
        payload.idNumber = idNumber;
        payload.department = department;
      } else {
        payload.editDesignationCompany = editDesignationCompany;
      }

      await axios.patch(
        `${apiURL}/profilebyslug/${slug}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      showSnackbar("Updated successfully!");
      onSaved?.(); // Notify parent
      onClose?.();
    } catch (err) {
      showSnackbar("Failed to save", "error");
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    if (user?.company === "691b46700f3b99a078f08b46") {
      return (
        <>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-200">
              Designation
            </label>
            <input
              type="text"
              placeholder="Enter Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="bg-[#212F35] text-white p-2 rounded border border-gray-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-200">
              ID Number
            </label>
            <input
              type="text"
              placeholder="Enter ID Number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className="bg-[#212F35] text-white p-2 rounded border border-gray-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-200">
              Department
            </label>
            <input
              type="text"
              placeholder="Enter Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-[#212F35] text-white p-2 rounded border border-gray-600 focus:outline-none"
            />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-200">
              Designation
            </label>
            <input
              type="text"
              placeholder="Enter Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="bg-[#212F35] text-white p-2 rounded border border-gray-600 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={editDesignationCompany}
              onChange={(e) => setEditDesignationCompany(e.target.checked)}
              className="w-5 h-5"
              id="editDesigComp"
            />
            <label htmlFor="editDesigComp" className="text-gray-200 text-sm">
              User Can Change Designation
            </label>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      <div className="bg-[#212F35]  p-4 flex flex-col gap-3 mt-2 mb-2">
        {renderFields()}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={loading}
          sx={{
            borderColor: "#fff",
            color: "#fff",
            "&:hover": { borderColor: "#38bdf8", color: "#38bdf8" },
            background: "rgba(255,255,255,0.02)",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          startIcon={<Pencil className="w-4 h-4" />}
          sx={{
            background: "#38bdf8",
            color: "#18181b",
            "&:hover": { background: "#0ea5e9", color: "#fff" },
            boxShadow: "none",
          }}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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

export default EditUserDesignationSection;
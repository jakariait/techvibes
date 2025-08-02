import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Trash2, ImageIcon, UserCircle } from "lucide-react";
import useAuthUserStore from "../../store/AuthUserStore";
import ImageComponent from "../public/ImageComponent.jsx";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const PhotoUploadSection = ({ type = "profilePhoto", slug }) => {
  const { token } = useAuthUserStore();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const IMAGE_LABELS = {
    coverPhoto: "Cover Photo",
    profilePhoto: "Profile Photo",
    brandLogo: "Brand Logo",
  };
  const label = IMAGE_LABELS[type] || "Image";

  const IMAGE_TIPS = {
    coverPhoto:
      "Tip: Upload a wide cover image, at least 1200×400px (aspect ratio 3:1 or wider) for best fit.\n",
    profilePhoto:
      "📸 Profile Image Upload Guidelines\n" +
      "To ensure your profile looks clean, professional, and visually balanced, please follow the image ratio guidelines below:\n" +
      "\n" +
      "🟦 Option 1: Rounded Corner Profile Image\n" +
      "If you prefer a rectangular image with slightly rounded corners:\n" +
      "\n" +
      "Recommended Ratio: 7:9\n" +
      "\n" +
      "Recommended Size: 700 x 900 pixels\n" +
      "✅ This format fits perfectly into the profile layout and gives a sleek, modern look.\n" +
      "\n" +
      "⚪ Option 2: Circular (Round) Profile Image\n" +
      "If you prefer a fully circular profile picture:\n" +
      "\n" +
      "Recommended Ratio: 1:1\n" +
      "\n" +
      "Recommended Size: 1000 x 1000 pixels\n" +
      "✅ This format centers your face and displays beautifully in a circle frame.",
    brandLogo:
      "Tip: Upload a transparent PNG or SVG for best logo quality. Recommended size: at least 200x200px.",
  };
  const tip = IMAGE_TIPS[type] || "";

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!slug || !token) return;
      try {
        const response = await axios.get(`${apiUrl}/userbyslug/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetched = response?.data?.profile?.[type];
        setPhoto(fetched || "");
      } catch (err) {
        console.error(`Failed to fetch ${label}`, err);
      }
    };

    fetchPhoto();
  }, [slug, token, apiUrl, type]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !slug || !token) return;

    const formData = new FormData();
    formData.append(type, file);
    formData.append("field", type);

    setLoading(true);
    try {
      const response = await axios.patch(
        `${apiUrl}/profilebyslug/${slug}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response?.data?.profile?.[type]) {
        setPhoto(response.data.profile[type]);
        setSnackbar({
          open: true,
          message: `${label} updated successfully`,
          type: "success",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.warn("Photo not found in response:", response.data);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setSnackbar({ open: true, message: `Upload failed`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setConfirmOpen(false);
    setLoading(true);
    try {
      await axios.patch(
        `${apiUrl}/profilebyslug/${slug}`,
        { [type]: "" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPhoto("");
      setSnackbar({ open: true, message: `${label} deleted`, type: "success" });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Delete error:", error);
      setSnackbar({ open: true, message: `Delete failed`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const iconMap = {
    profilePhoto: <UserCircle className="text-green-400 w-5 h-5 mr-1" />,
    coverPhoto: <ImageIcon className="text-green-400 w-5 h-5 mr-1" />,
  };

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl mb-6">
      <h2 className="text-green-400 font-semibold mb-2 flex items-center justify-center">
        {iconMap[type] || <ImageIcon className="text-green-400 w-5 h-5 mr-1" />}
        {label}
      </h2>

      {tip && (
        <div className="mt-3 mb-3  p-3 rounded-lg  text-xs text-gray-300 text-left">
          {tip.split("\n").map((line, index) =>
            line.trim() ? (
              <p key={index} className="mb-1">
                {line}
              </p>
            ) : (
              <br key={index} />
            )
          )}
        </div>
      )}


      <label className="cursor-pointer inline-flex items-center inner-glow text-white px-4 py-2 rounded-md shadow">
        <Upload size={18} className="mr-2" />
        Upload {label}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      {loading && <p className="text-sm text-blue-400 mt-2">Processing...</p>}

      {photo ? (
        <div
          className={`relative mt-4 ${
            type === "coverPhoto" ? "w-full" : "w-full max-w-xs"
          }`}
        >
          <ImageComponent
            imageName={photo}
            className="rounded-lg object-cover w-full"
            altName={photo}
          />
          <button
            onClick={() => setConfirmOpen(true)}
            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ) : (
        !loading && (
          <div className="mt-4 text-gray-400 flex items-center gap-2">
            <ImageIcon size={18} />
            No {label.toLowerCase()} uploaded
          </div>
        )
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete {label}?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this {label.toLowerCase()}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PhotoUploadSection;

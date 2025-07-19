import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageComponent from "./ImageComponent.jsx";
import { X } from "lucide-react";


const API_URL = import.meta.env.VITE_API_URL;

const UserGallery = ({ userId, token }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch gallery on mount
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${API_URL}/gallery/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGalleryImages(response.data.galleryImages || []);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    if (userId && token) {
      fetchGallery();
    }
  }, [userId, token]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("galleryImages", file));

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/gallery/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setGalleryImages(response.data.gallery.galleryImages || []);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageName) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_URL}/gallery/${userId}/${imageName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setGalleryImages(response.data.gallery.galleryImages || []);
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">User Gallery</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />

      <button
        onClick={handleUpload}
        disabled={loading || selectedFiles.length === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Images"}
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-4">
        {galleryImages.length > 0 ? (
          galleryImages.map((image, index) => (
            <div key={index} className="relative group">
              <ImageComponent
                imageName={image}
                altName={`Gallery ${index}`}
                className={"w-full object-cover rounded"}
              />
              <button
                onClick={() => handleDelete(image)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          ))
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserGallery;

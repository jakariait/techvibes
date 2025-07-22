import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ImageComponent from "../public/ImageComponent.jsx";
import { ImageIcon, Link2, X } from "lucide-react";
import LoadingLottie from "../public/LoadingLottie.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const UserGallery = ({ userId, token }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // <-- Add this ref

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
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // <-- Reset input
      }
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

  if (loading) return <LoadingLottie />;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden">
      <div className={"flex flex-col items-center justify-center mb-2"}>
        <div className="flex items-center justify-start gap-2 ">
          <ImageIcon className="w-5 h-5 text-yellow-400" />
          <h2 className="text-base font-medium text-yellow-400">Gallery</h2>
        </div>
        <span className="text-sm text-gray-500 pt-2">Maximum 4</span>
      </div>
      {galleryImages.length < 4 && (
        <div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="mb-2 text-white"
          />

          <button
            onClick={handleUpload}
            disabled={loading || selectedFiles.length === 0}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-6 disabled:opacity-70"
          >
            {loading ? "Uploading..." : "Upload Images"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-center gap-4">
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
          <p className={"text-white"}>No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserGallery;

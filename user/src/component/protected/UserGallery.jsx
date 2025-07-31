import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ImageComponent from "../public/ImageComponent.jsx";
import { ImageIcon, Upload, X } from "lucide-react";
import LoadingLottie from "../public/LoadingLottie.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const UserGallery = ({ userId, token }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch gallery images on load
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

  // Delete image
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

  // Show loading animation
  if (loading) return <LoadingLottie />;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-2">
        <div className="flex items-center justify-start gap-2">
          <ImageIcon className="w-5 h-5 text-yellow-400" />
          <h2 className="text-base font-medium text-yellow-400">Gallery</h2>
        </div>
        <span className="text-sm text-gray-500 pt-2">Maximum 4</span>
        <p className="text-xs text-gray-400 mt-1">
          Tip:Upload a square photo (1:1 ratio, e.g. 400x400px). Square images fit.
        </p>

      </div>

      {/* Upload Button */}
      {galleryImages.length < 4 && (
        <div>
          <label
            className="cursor-pointer inline-flex items-center inner-glow text-white px-4 py-2 rounded-md inner-glow mb-4"
            htmlFor="gallery-upload"
          >
            <Upload size={18} className="mr-2" />
            {loading ? "Uploading..." : "Upload Images"}
          </label>

          <input
            id="gallery-upload"
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={async (e) => {
              const files = Array.from(e.target.files);
              if (files.length === 0) return;

              const formData = new FormData();
              files.forEach((file) => formData.append("galleryImages", file));

              try {
                setLoading(true);
                const response = await axios.post(
                  `${API_URL}/gallery/${userId}`,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "multipart/form-data",
                    },
                  },
                );
                setGalleryImages(response.data.gallery.galleryImages || []);
                if (fileInputRef.current) fileInputRef.current.value = "";
              } catch (error) {
                console.error("Error uploading images:", error);
              } finally {
                setLoading(false);
              }
            }}
          />
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {galleryImages.length > 0 ? (
          galleryImages.map((image, index) => (
            <div key={index} className="relative group">
              <ImageComponent
                imageName={image}
                altName={`Gallery ${index}`}
                className="w-full object-cover rounded"
              />
              <button
                onClick={() => handleDelete(image)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition"
              >
                <X size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-white">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserGallery;

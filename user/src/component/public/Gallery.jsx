import React, { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import ImageComponent from "./ImageComponent.jsx";
import LoadingLottie from "./LoadingLottie.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const Gallery = ({ userId }) => {
  const { theme } = useTheme();

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL; // your base API URL

  useEffect(() => {
    if (!userId) return;

    const fetchGallery = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/gallery/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch gallery");
        const data = await res.json();

        setPhotos(data.galleryImages || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [userId, apiUrl]);

  if (loading) return <LoadingLottie />;
  if (photos.length === 0) return null;

  return (
    <div
      className={`${theme.connectFormBg} inner-glow p-4 rounded-xl overflow-hidden h-full`}
    >
      <div className={`flex items-center justify-center gap-2 mb-4`}>
        <ImageIcon className={`w-5 h-5 ${theme.iconColor}`} />
        <h2 className={`text-base font-medium ${theme.iconColor}`}>Gallery</h2>
      </div>

      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-2 items-center justify-center`}
      >
        {photos.map((photo, idx) => (
          <div key={idx} className={`overflow-hidden rounded-md`}>
            <ImageComponent
              imageName={photo}
              className={`object-contain rounded-md transition-transform hover:scale-105 cursor-pointer`}
              altName={`Gallery photo ${idx + 1}`}
              skeletonHeight="200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ExternalLink, GalleryHorizontalEnd } from "lucide-react";
import ImageComponent from "./ImageComponent.jsx";
import LoadingLottie from "./LoadingLottie.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const UserProductGalleryViewer = ({ userId }) => {
  const { theme } = useTheme();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${apiURL}/user-product-gallery/${userId}`);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Failed to fetch product gallery", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchGallery();
  }, [userId]);

  if (loading) return <LoadingLottie />;
  if (!products.length) return null;

  return (
    <div
      className={`${theme.connectFormBg} inner-glow p-4 rounded-xl overflow-hidden h-full`}
    >
      <div
        className={`flex items-center justify-center gap-2 mb-4 ${theme.iconColor}`}
      >
        <GalleryHorizontalEnd className={`w-5 h-5`} />
        <h2 className={`text-base font-medium`}>Product Gallery</h2>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-4 gap-2`}>
        {products.map((item, index) => (
          <div
            key={item._id || index}
            className={` rounded text-sm relative group`}
          >
            <ImageComponent
              imageName={item.productImage}
              className={`w-full h-32 object-contain rounded`}
              altName="Product"
            />

            {item.productLink && (
              <a
                href={item.productLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute top-2 right-2 ${theme.externalLinkColor} p-1 rounded-full  z-10`}
                title="Visit link"
              >
                <ExternalLink className={`w-4 h-4`} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProductGalleryViewer;

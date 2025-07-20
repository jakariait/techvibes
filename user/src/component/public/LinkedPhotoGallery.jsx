import React from "react";
import { ExternalLink, Image as ImageIcon } from "lucide-react";
import ImageComponent from "./ImageComponent.jsx";

const LinkedPhotoGallery = ({ productImages = [] }) => {
  if (!Array.isArray(productImages) || productImages.length === 0) return null;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl h-full text-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="w-5 h-5 text-white" />
        <h2 className="text-base font-medium text-white">Product Images</h2>
      </div>

      {/* Image Cards */}
      <div className="grid grid-cols-4 gap-4">
        {productImages.map((item, index) => (
          <div
            key={index}
            className="relative bg-[#1B262C] rounded-xl overflow-hidden group shadow-sm"
          >
            <div className="relative w-full h-20">

              <ImageComponent imageName={item.productImage} className="object-cover" altName={`Product ${index + 1}`} />
            </div>

            {item.link && (
              <div className="absolute top-2 right-2 z-10">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  title="See More"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkedPhotoGallery;

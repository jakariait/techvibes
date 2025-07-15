import React from "react";
import { ImageIcon } from "lucide-react";
import ImageComponent from "./ImageComponent.jsx";

const Gallery = ({ profile }) => {
  const photos = profile?.galleryPhotos || [];
  if (photos.length === 0) return null;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
      <div className="flex items-center justify-center gap-2 mb-4">
        <ImageIcon className="w-5 h-5 text-yellow-400" />
        <h2 className="text-base font-medium text-yellow-400">Gallery</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-2 items-center justify-center">
        {photos.map((photo, idx) => (
          <div key={idx} className="overflow-hidden rounded-md">
            <ImageComponent
              imageName={photo}
              className="object-cover rounded-md transition-transform hover:scale-105 cursor-pointer"
              altName={`Gallery photo ${idx + 1}`}
              skeletonHeight="200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfilePage = ({ user, profile }) => {
  const userPermissions = Array.isArray(user?.permission)
    ? user.permission
        .map((p) => p.trim().toLowerCase())
        .filter((p) => p.length > 0)
    : [];

  const canViewGallery = userPermissions.includes("gallery");

  if (!canViewGallery || !profile?.galleryPhotos?.length) {
    return null;
  }

  return <Gallery profile={profile} />;
};

export default ProfilePage;

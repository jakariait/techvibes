import React from 'react';
import UserLayout from "../component/protected/UserLayout.jsx";
import PhotoUploadSection from "../component/protected/PhotoUploadSection.jsx";

const ProfileCoverPhotoPage = () => {
  return (
    <UserLayout>
      <PhotoUploadSection type="profilePhoto" />
      <PhotoUploadSection type="coverPhoto" />
    </UserLayout>
  );
};

export default ProfileCoverPhotoPage;
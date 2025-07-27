import React from 'react';
import UserLayout from "../component/protected/UserLayout.jsx";
import PhotoUploadSection from "../component/protected/PhotoUploadSection.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const ProfileCoverPhotoPage = () => {

  const { user} = useAuthUserStore();

  return (
    <UserLayout>
      <PhotoUploadSection type="profilePhoto" slug={user?.slug} />
      <PhotoUploadSection type="coverPhoto"  slug={user?.slug} />
    </UserLayout>
  );
};

export default ProfileCoverPhotoPage;
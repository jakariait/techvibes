import React from "react";
import UserGallery from "../component/protected/UserGallery.jsx";
import UserLayout from "../component/protected/UserLayout.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const GalleryPage = () => {
  const { user, token } = useAuthUserStore();

  return (
    <UserLayout>
      <UserGallery userId={user?._id} token={token} />
    </UserLayout>
  );
};

export default GalleryPage;

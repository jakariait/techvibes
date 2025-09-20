import React from "react";
import UserGallery from "../component/protected/UserGallery.jsx";
import UserLayout from "../component/protected/UserLayout.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";
import RequirePermission from "../component/public/RequirePermission.jsx";

const GalleryPage = () => {
  const { user, token } = useAuthUserStore();


  return (
    <UserLayout>
      <RequirePermission permission="gallery" userPermissions={user?.permission}>
        <UserGallery userId={user?._id} token={token} />
      </RequirePermission>
    </UserLayout>
  );
};

export default GalleryPage;

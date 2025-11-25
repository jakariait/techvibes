import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import GeneralProfileInfoSection from "../component/protected/GeneralProfileInfoSection.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";
import PhotoUploadSection from "../component/protected/PhotoUploadSection.jsx";

const GeneralInfoPage = () => {
  const { user } = useAuthUserStore();


  return (
    <UserLayout>
      <GeneralProfileInfoSection slug={user?.slug} />

      {user?.role === "normal" && user?.permission?.includes("brandLogo") && (
        <PhotoUploadSection slug={user?.slug} type="brandLogo" />
      )}

    </UserLayout>
  );
};

export default GeneralInfoPage;

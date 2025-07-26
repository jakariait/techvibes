import React from 'react';
import UserLayout from "../component/protected/UserLayout.jsx";
import GeneralProfileInfoSection from "../component/protected/GeneralProfileInfoSection.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const GeneralInfoPage = () => {
  const { user } = useAuthUserStore();

  return (
    <UserLayout>
      <GeneralProfileInfoSection slug={user?.slug} />

    </UserLayout>
  );
};

export default GeneralInfoPage;
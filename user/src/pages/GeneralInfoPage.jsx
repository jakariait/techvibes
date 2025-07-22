import React from 'react';
import UserLayout from "../component/protected/UserLayout.jsx";
import GeneralProfileInfoSection from "../component/protected/GeneralProfileInfoSection.jsx";

const GeneralInfoPage = () => {
  return (
    <UserLayout>
      <GeneralProfileInfoSection/>

    </UserLayout>
  );
};

export default GeneralInfoPage;
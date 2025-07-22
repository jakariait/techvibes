import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import DesignationSection from "../component/protected/DesignationSection.jsx";

const DesignationsPage = () => {
  return (
    <UserLayout>
      <DesignationSection />
    </UserLayout>
  );
};

export default DesignationsPage;

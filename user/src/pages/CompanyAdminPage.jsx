import React from "react";
import CompanyGeneralInfoSection from "../component/protected/CompanyGeneralInfoSection.jsx";
import CompanyAdminManagement from "../component/protected/CompanyAdminManagement.jsx";
import UserLayout from "../component/protected/UserLayout.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";
import CompanyUserListSection from "../component/protected/CompanyUserListSection.jsx";

const CompanyAdminPage = () => {
  const isAdmin = useAuthUserStore((state) => state.isAdmin);
  const { user } = useAuthUserStore();

  const companyId = user?.company;


  return (
    <UserLayout>
      {isAdmin && (
        <>
          <CompanyGeneralInfoSection companyId={companyId} />
          <CompanyAdminManagement companyId={companyId} />
          <CompanyUserListSection companyId={companyId} />
        </>
      )}
    </UserLayout>
  );
};

export default CompanyAdminPage;

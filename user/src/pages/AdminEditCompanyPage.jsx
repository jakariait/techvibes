import React from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../component/protected/UserLayout.jsx";
import CompanyGeneralInfoSection from "../component/protected/CompanyGeneralInfoSection.jsx";
import CompanyAdminManagement from "../component/protected/CompanyAdminManagement.jsx";
import CompanyUserListSection from "../component/protected/CompanyUserListSection.jsx";

const AdminEditCompanyPage = () => {
  const { id } = useParams(); // 👈 capture the company ID from route

  return (
    <UserLayout>
      <CompanyGeneralInfoSection companyId={id} />
      <CompanyAdminManagement companyId={id} />
      <CompanyUserListSection companyId={id} />
    </UserLayout>
  );
};

export default AdminEditCompanyPage;

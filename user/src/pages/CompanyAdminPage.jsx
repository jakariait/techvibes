import React from "react";
import CompanyGeneralInfoSection from "../component/protected/CompanyGeneralInfoSection.jsx";
import CompanyAdminManagement from "../component/protected/CompanyAdminManagement.jsx";
import UserLayout from "../component/protected/UserLayout.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const CompanyAdminPage = () => {
  const isAdmin = useAuthUserStore((state) => state.isAdmin);

  return (
    <UserLayout>
      {/*{isAdmin && (*/}
      {/*  <>*/}
      {/*    <CompanyGeneralInfoSection />*/}
      {/*    <CompanyAdminManagement />*/}
      {/*  </>*/}
      {/*)}*/}

          <CompanyGeneralInfoSection />
          <CompanyAdminManagement />

    </UserLayout>
  );
};

export default CompanyAdminPage;

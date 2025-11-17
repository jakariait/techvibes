import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyGeneralInfoSection from "../component/protected/CompanyGeneralInfoSection.jsx";
import CompanyAdminManagement from "../component/protected/CompanyAdminManagement.jsx";
import UserLayout from "../component/protected/UserLayout.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";
import CompanyUserListSection from "../component/protected/CompanyUserListSection.jsx";
import AccordionSection from "../component/protected/AccordionSection.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const CompanyAdminPage = () => {
  const isAdmin = useAuthUserStore((state) => state.isAdmin);
  const { user, token } = useAuthUserStore();
  const [companyData, setCompanyData] = useState({});

  // Define a map of special users and their associated company IDs
  const specialUserCompanies = {
    "mehedi@elitegroup-bd.com": [
      "688e77dc4fe3d53473581bcf",
      "688e2919a86d6f81deec0f5b",
      "69019f28c7f42617ed266038",
      "6919b1004329736063e95ef4",
      "6919b10c4329736063e95ef8",
      "6919b11c4329736063e95efc"
    ],
    "saadi@elitegroup-bd.com": [
      "688e77dc4fe3d53473581bcf",
      "688e2919a86d6f81deec0f5b",
      "69019f28c7f42617ed266038",
      "6919b1004329736063e95ef4",
      "6919b10c4329736063e95ef8",
      "6919b11c4329736063e95efc"
    ]
  };

  // Function to get company IDs based on the logged-in user
  const getCompanyIds = () => {
    if (user?.email && specialUserCompanies[user.email]) {
      return specialUserCompanies[user.email];
    }
    if (user?.company) {
      return [user.company];
    }
    return [];
  };

  const companyIds = getCompanyIds();

  useEffect(() => {
    const fetchCompanyData = async (id) => {
      if (!token) return;
      try {
        const res = await axios.get(`${apiURL}/company/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompanyData((prev) => ({ ...prev, [id]: res.data }));
      } catch (err) {
        console.error(`Error fetching company ${id}`, err);
      }
    };

    companyIds.forEach((id) => {
      if (!companyData[id]) {
        fetchCompanyData(id);
      }
    });
  }, [companyIds, token, companyData]);

  return (
    <UserLayout>
      {isAdmin &&
        companyIds.map((id, index) => {
          const content = (
            <>
              <CompanyGeneralInfoSection companyId={id} />
              <CompanyAdminManagement companyId={id} />
              <CompanyUserListSection companyId={id} />
            </>
          );

          if (companyIds.length > 1) {
            const companyName = companyData[id]?.companyName || `Company...`;
            return (
              <div className="my-4" key={id}>
                <AccordionSection title={companyName} defaultOpen={index === 0}>
                  {content}
                </AccordionSection>
              </div>
            );
          } else {
            return <div key={id}>{content}</div>;
          }
        })}
    </UserLayout>
  );
};

export default CompanyAdminPage;

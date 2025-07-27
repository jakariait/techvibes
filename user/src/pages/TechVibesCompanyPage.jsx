import React, { useEffect, useState } from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import AddCompanySection from "../component/protected/AddCompanySection.jsx";
import AllCompaniesSection from "../component/protected/AllCompaniesSection.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const TechVibesCompanyPage = () => {
  const { token, user } = useAuthUserStore();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ track loading here

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/company`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(res.data.companies || []);
    } catch (error) {
      console.error("Failed to fetch companies", error);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const isMainAdmin = user?.isMainAdmin;

  if (!isMainAdmin) {
    return (
      <UserLayout>
        <p className="text-center text-red-500 mt-10">
          Access denied. You are not authorized to view this page.
        </p>
      </UserLayout>
    );
  }
  return (
    <UserLayout>
      <AddCompanySection onCompanyAdded={fetchCompanies} />
      <AllCompaniesSection
        companies={companies}
        refreshCompanies={fetchCompanies}
        loading={loading}
      />
    </UserLayout>
  );
};

export default TechVibesCompanyPage;

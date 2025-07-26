import React from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../component/protected/UserLayout.jsx";
import GeneralProfileInfoSection from "../component/protected/GeneralProfileInfoSection.jsx";

const AdminEditUserPage = () => {
  const { slug } = useParams(); // 👈 Get slug from route params

  return (
    <UserLayout>
      <p className="text-white">
        Editing user: <strong>{slug}</strong>
      </p>
      <GeneralProfileInfoSection slug={slug} />
    </UserLayout>
  );
};

export default AdminEditUserPage;

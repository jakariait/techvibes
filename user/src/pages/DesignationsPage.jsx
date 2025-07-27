import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import DesignationSection from "../component/protected/DesignationSection.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const DesignationsPage = () => {
  const { user} = useAuthUserStore();

  return (
    <UserLayout>
      <DesignationSection slug={user?.slug} />
    </UserLayout>
  );
};

export default DesignationsPage;

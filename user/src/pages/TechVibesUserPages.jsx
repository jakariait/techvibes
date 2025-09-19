import React, { useState } from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import RegisterUserForm from "../component/protected/RegisterUserForm.jsx";
import AllUsersSection from "../component/protected/AllUsersSection.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";
import LoadingLottie from "../component/public/LoadingLottie.jsx";
import AllAppointment from "../component/protected/AllAppointment.jsx";
import AllConnect from "../component/protected/AllConnect.jsx";

const TechVibesUserPages = () => {
  const { user } = useAuthUserStore();
  const [reloadUsers, setReloadUsers] = useState(false);

  const isMainAdmin = user?.isMainAdmin;

  if (!isMainAdmin) {
    return (
      <UserLayout>
        <LoadingLottie/>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-4">
        <RegisterUserForm onUserCreated={() => setReloadUsers((prev) => !prev)} />
        <AllUsersSection reload={reloadUsers} />
        <AllConnect/>
        <AllAppointment />
      </div>
    </UserLayout>
  );
};

export default TechVibesUserPages;

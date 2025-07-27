import React, { useState } from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import RegisterUserForm from "../component/protected/RegisterUserForm.jsx";
import AllUsersSection from "../component/protected/AllUsersSection.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const TechVibesUserPages = () => {
  const { user } = useAuthUserStore();
  const [reloadUsers, setReloadUsers] = useState(false);

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
      <div className="space-y-4">
        <RegisterUserForm onUserCreated={() => setReloadUsers((prev) => !prev)} />
        <AllUsersSection reload={reloadUsers} />
      </div>
    </UserLayout>
  );
};

export default TechVibesUserPages;

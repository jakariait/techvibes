import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import UpdateUserInfo from "../component/protected/UpdateUserInfo.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const NameLoginEmailPage = () => {
  const { user } = useAuthUserStore();

  return (
    <UserLayout>
      <UpdateUserInfo slug={user?.slug} />
    </UserLayout>
  );
};

export default NameLoginEmailPage;

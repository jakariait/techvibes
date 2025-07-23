import React from 'react';
import UserLayout from "../component/protected/UserLayout.jsx";
import UpdateUserInfo from "../component/protected/UpdateUserInfo.jsx";

const NameLoginEmailPage = () => {
  return (
    <UserLayout>
      <UpdateUserInfo />
    </UserLayout>
  );
};

export default NameLoginEmailPage;
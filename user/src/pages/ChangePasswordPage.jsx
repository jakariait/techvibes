import React from 'react';
import UserLayout from "../component/protected/UserLayout.jsx";
import ChangePassword from "../component/protected/ChangePassword.jsx";

const ChangePasswordPage = () => {
  return (
    <UserLayout>
      <ChangePassword/>
    </UserLayout>
  );
};

export default ChangePasswordPage;
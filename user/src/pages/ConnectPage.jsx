import React from 'react';
import UserLayout from "../component/protected/UserLayout.jsx";
import ConnectRequestsSection from "../component/protected/ConnectRequestsSection.jsx";

const ConnectPage = () => {
  return (
    <UserLayout>
      <ConnectRequestsSection/>
    </UserLayout>
  );
};

export default ConnectPage;
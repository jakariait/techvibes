import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import ContactListSection from "../component/protected/ContactListSection.jsx";

const EmailPages = () => {
  return (
    <UserLayout>
      <ContactListSection
        title="Email Addresses"
        type="email"
        fieldKey="emails"
      />
    </UserLayout>
  );
};

export default EmailPages;

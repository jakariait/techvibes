import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import ContactListSection from "../component/protected/ContactListSection.jsx";

const PhonePages = () => {
  return (
    <UserLayout>
      <ContactListSection
        title="Phone Numbers"
        type="phone"
        fieldKey="phones"
      />
    </UserLayout>
  );
};

export default PhonePages;

import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import ContactListSection from "../component/protected/ContactListSection.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const EmailPages = () => {
  const { user } = useAuthUserStore();
  return (
    <UserLayout>
      <ContactListSection
        title="Email Addresses"
        type="email"
        fieldKey="emails"
        slug={user?.slug}
      />
    </UserLayout>
  );
};

export default EmailPages;

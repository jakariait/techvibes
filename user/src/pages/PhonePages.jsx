import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import ContactListSection from "../component/protected/ContactListSection.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const PhonePages = () => {
  const { user } = useAuthUserStore();

  return (
    <UserLayout>
      <ContactListSection
        title="Phone Numbers"
        type="phone"
        fieldKey="phones"
        slug={user?.slug}
      />
    </UserLayout>
  );
};

export default PhonePages;

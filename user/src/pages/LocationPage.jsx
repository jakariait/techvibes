import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import ContactListSection from "../component/protected/ContactListSection.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const LocationPage = () => {
  const { user } = useAuthUserStore();

  return (
    <UserLayout>
      <ContactListSection
        title="Location"
        type="locations"
        fieldKey="locations"
        slug={user?.slug}
      />
    </UserLayout>
  );
};

export default LocationPage;

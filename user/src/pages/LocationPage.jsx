import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import ContactListSection from "../component/protected/ContactListSection.jsx";

const LocationPage = () => {
  return (
    <UserLayout>
      <ContactListSection
        title="Location"
        type="locations"
        fieldKey="locations"
      />
    </UserLayout>
  );
};

export default LocationPage;

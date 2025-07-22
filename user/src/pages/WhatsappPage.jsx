import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import ContactListSection from "../component/protected/ContactListSection.jsx";

const WhatsappPage = () => {
  return (
    <UserLayout>
      <ContactListSection
        title="Whatsapp"
        type="whatsapp"
        fieldKey="whatsapp"
      />
    </UserLayout>
  );
};

export default WhatsappPage;

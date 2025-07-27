import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import ContactListSection from "../component/protected/ContactListSection.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const WhatsappPage = () => {
  const { user } = useAuthUserStore();

  return (
    <UserLayout>
      <ContactListSection
        title="Whatsapp"
        type="whatsapp"
        fieldKey="whatsapp"
        slug={user?.slug}

      />
    </UserLayout>
  );
};

export default WhatsappPage;

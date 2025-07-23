import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import SocialLinksSection from "../component/protected/SocialLinksSection.jsx";
import CustomSocialLinksSection from "../component/protected/CustomSocialLinksSection.jsx";

const SocialMediaPage = () => {
  return (
    <UserLayout>
      <div className="flex flex-col space-y-10 ">
        <SocialLinksSection />
        <CustomSocialLinksSection />
      </div>
    </UserLayout>
  );
};

export default SocialMediaPage;

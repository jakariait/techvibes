import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import SocialLinksSection from "../component/protected/SocialLinksSection.jsx";
import CustomSocialLinksSection from "../component/protected/CustomSocialLinksSection.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const SocialMediaPage = () => {
  const { user } = useAuthUserStore();

  const slug = user?.slug;
  return (
    <UserLayout>
      <div className="flex flex-col space-y-10 ">
        <SocialLinksSection slug={slug} />
        <CustomSocialLinksSection slug={slug} />
      </div>
    </UserLayout>
  );
};

export default SocialMediaPage;

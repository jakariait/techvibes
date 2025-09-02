import React from "react";
import UserLayout from "../component/protected/UserLayout.jsx";
import SectionOrderEditor from "../component/protected/SectionOrderEditor.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";

const ReorderProfilePage = () => {
  const { user: authUser } = useAuthUserStore();

  return (
    <UserLayout>
      <SectionOrderEditor slug={authUser?.slug} user={authUser} />
    </UserLayout>
  );
};

export default ReorderProfilePage;

import React from "react";
import ProfileViews from "./ProfileViews.jsx";

const Views = ({ userId, token }) => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <ProfileViews userId={userId} token={token} name="Profile" />
      <ProfileViews userId={userId} token={token} name="Service" />
      <ProfileViews userId={userId} token={token} name="Portfolio" />
    </div>
  );
};

export default Views;

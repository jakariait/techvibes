import React from "react";
import ProfileViews from "./ProfileViews.jsx";

const Views = ({ userId, token }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <ProfileViews userId={userId} token={token} name="Profile" />
      <ProfileViews userId={userId} token={token} name="Service" />
      <ProfileViews userId={userId} token={token} name="Portfolio" />
      <ProfileViews userId={userId} token={token} name="Product" />
    </div>
  );
};

export default Views;

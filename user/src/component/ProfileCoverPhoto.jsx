import React from "react";
import ImageComponent from "./ImageComponent.jsx";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileCoverPhoto = ({ profile, user }) => {
  return (
    <div>
      {/* Cover Photo */}
      <div className="relative h-60 lg:h-96 max-w-6xl mx-auto">
        <ImageComponent
          imageName={profile.coverPhoto}
          altName="Cover Photo"
          className={"w-full h-full object-cover opacity-90 absolute inset-0"}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent" />
        <div className="absolute left-10 top-8 flex items-center gap-4 z-10">
          <ImageComponent
            imageName={profile.brandLogo}
            altName="Cover Photo"
            className="w-16 h-16 object-contain "
          />
        </div>
        <div className="absolute right-10 top-8 flex items-center gap-4 z-10">
          <Link
            to="/"
            className="text-white border-2 border-white px-2 py-1 rounded-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <User /> Login
          </Link>
        </div>
        {/* Profile Photo - Overlapping */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 z-20 ">
          <ImageComponent
            imageName={profile.profilePhoto}
            altName={user.fullName}
            className="w-33 h-40 md:w-50 md:h-60 object-cover  -mb-16 md:-mb-24  rounded-xl "
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCoverPhoto;

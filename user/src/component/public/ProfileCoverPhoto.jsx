import React from "react";
import ImageComponent from "./ImageComponent.jsx";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import techBibes from "../../assets/TechVibes.png";
import { useTheme } from "../../context/ThemeContext.jsx";

const ProfileCoverPhoto = ({ profile, user, company }) => {
  const { theme } = useTheme();

  return (
    <div>
      {/* Cover Photo */}
      <div className={`relative h-60 lg:h-96 `}>
        <ImageComponent
          imageName={profile?.coverPhoto}
          altName="Cover Photo"
          className={`w-full h-full object-cover opacity-90 absolute inset-0`}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent`}
        />

        {/* Top bar: Logo + Login */}
        <div
          className={`absolute top-0 inset-x-0 flex justify-between items-start px-10 pt-6 z-10`}
        >
          {/* Left: Logo */}
          {user?.role === "corporate" ? (
            <ImageComponent
              imageName={company?.companyLogo}
              altName="Company Logo"
              className={`w-16 h-16 object-contain`}
            />
          ) : user?.role === "normal" &&
            user?.permission?.includes("brandLogo") &&
            profile?.brandLogo ? (
            <ImageComponent
              imageName={profile?.brandLogo}
              altName="Brand Logo"
              className={`w-16 h-16 object-contain`}
            />
          ) : user?.role === "normal" ? (
            <img
              src={techBibes}
              alt="Tech Vibes"
              className={`w-30 h-30 -mt-10 object-contain`}
            />
          ) : null}

          {/* Right: Login Button */}
          <Link
            to="/"
            className={`${theme.background} background ${theme.text} font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-2 cursor-pointer`}
          >
            <User className={`w-4 h-4`} />
            Login
          </Link>
        </div>

        {/* Profile Photo - Overlapping */}

        <div
          className={`absolute left-1/2 transform -translate-x-1/2 bottom-0 z-20 `}
        >
          {profile?.profilePhoto ? (
            <ImageComponent
              imageName={profile.profilePhoto}
              altName={user.fullName}
              className={` object-cover -mb-16 md:-mb-24 ${
                profile.profilePhotoShape === "circle"
                  ? "rounded-full w-40 h-40 md:w-60 md:h-60"
                  : profile.profilePhotoShape === "square"
                    ? "rounded-xl w-30 h-40 md:w-50 md:h-60"
                    : "rounded-xl" // default fallback
              }`}
            />
          ) : (
            <div
              className={` bg-white text-gray-500 flex items-center justify-center -mb-16 md:-mb-24 border border-gray-300 ${
                profile?.profilePhotoShape === "circle"
                  ? "rounded-full w-40 h-40 md:w-60 md:h-60"
                  : profile?.profilePhotoShape === "square"
                    ? "rounded-xl w-33 h-40 md:w-50 md:h-60"
                    : "rounded-xl"
              }`}
            >
              Your Photo
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCoverPhoto;

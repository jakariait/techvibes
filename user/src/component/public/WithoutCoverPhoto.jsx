import React from "react";
import ImageComponent from "./ImageComponent.jsx";
import techBibes from "../../assets/TechVibes.png";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { Check } from "lucide-react";

const WithoutCoverPhoto = ({ profile, user, company }) => {
  const { theme } = useTheme();

  return (
    <div className="w-full">
      {/* Top bar: Logo + Login */}
      <div className="flex justify-between  items-center px-10 pt-3">
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
            className={`w-30 h-30  object-contain`}
          />
        ) : null}

        {/* Right: Login Button */}
        <Link
          to="/"
          className={`${theme.background} ${theme.text} font-semibold py-2 px-5 rounded-lg inner-glow flex items-center gap-2`}
        >
          <User className="w-4 h-4" />
          Login
        </Link>
      </div>

      {/* Main Profile Section */}
      <div className="flex inner-glow m-2  rounded-xl items-center justify-center p-2 gap-2">
        {/* Profile Image */}
        {profile?.profilePhoto ? (
          <ImageComponent
            imageName={profile.profilePhoto}
            altName={user?.fullName || "Profile"}
            className="rounded-xl w-50 h-60 md:w-50 md:h-60 object-cover"
          />
        ) : (
          <div className="w-50 h-60  bg-white rounded-xl border border-gray-300 flex items-center justify-center text-gray-500 shadow">
            Your Photo
          </div>
        )}

        {/* Name & Title */}
        <div className={"mt-10"}>
          <div
            className={` ${theme.text} flex  items-center justify-center flex-col`}
          >
            <div className="text-xl font-bold  text-center lg:text-left">
              <span className="break-words font-bold ">
                {profile?.prefix && `${profile.prefix} `}
                {user.fullName}
                {profile?.suffix && (
                  <span className="!text-xs">, {profile?.suffix}</span>
                )}
                {user.isVarified && (
                  <Check
                    className="inline-block p-0.5 ml-1 w-5 h-5 flex-shrink-0 bg-[#1877F2] rounded-full text-white"
                    strokeWidth={3}
                  />
                )}
              </span>
            </div>

            {/*Designation*/}
            {profile?.designation && (
              <h1 className={"text text-center"}>{profile.designation}</h1>
            )}

            {/*Department Corporate Only*/}
            {user?.role === "corporate" && profile.department && (
              <h1 className="text-center">{profile.department}</h1>
            )}

            {/*Company Name*/}
            {user?.role === "normal" && profile.companyName && (
              <h1 className={"font-bold text-center"}>{profile.companyName}</h1>
            )}

            {user?.role === "corporate" && company?.companyName && (
              <h1 className={"font-bold text-lg text-center"}>
                {company?.companyName}
              </h1>
            )}

            {/* ID Number — Corporate Only and Must Exist */}
            {user?.role === "corporate" && profile.idNumber && (
              <div
                className={`${theme.background} ${theme.text} px-7 py-1 rounded-lg mt-4`}
              >
                ID: {profile.idNumber}
              </div>
            )}
          </div>

          {/*Blood Group*/}
          {profile?.bloodGroup && (
            <span className=" text-[#F34242] px-4 py-2 rounded-full text-xl font-bold  flex items-center justify-center gap-2 mt-2">
              🩸 {profile.bloodGroup}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithoutCoverPhoto;

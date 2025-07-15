import React from "react";
import { Check } from "lucide-react";

const NameTitle = ({ profile, user }) => {
  return (
    <div className={"pt-18 md:pt-27 px-2 "}>
      <div className="text-white  flex items-center justify-center flex-col">

        <div className="flex  items-center gap-2 md:flex-row md:items-center md:justify-center">
          {/* Name */}
          <div className="text-2xl text-center lg:text-left">
            {profile.prefix} {user.fullName}
            {profile.suffix && <span className={"text-lg"}>, {profile.suffix}</span>}
          </div>

          {/* Verified Tick */}
          {user.isVarified && (
            <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1877F2] text-white shadow-sm">
              <Check className="w-3 h-3" strokeWidth={3} />
            </div>
          )}
        </div>

        {/*Designation*/}
        {profile.designation && (
          <h1 className={"text-xl"}>{profile.designation}</h1>
        )}

        {/*Department Corporate Only*/}
        {user.role === "corporate" && profile.department && (
          <h1>{profile.department}</h1>
        )}

        {/*Company Name*/}
        {profile.companyName && (
          <h1 className={"font-bold"}>{profile.companyName}</h1>
        )}

        {/* ID Number — Corporate Only and Must Exist */}
        {user.role === "corporate" && profile.idNumber && (
          <div className="text-white bg-[rgba(255,255,255,0.18)] px-7 py-1 rounded-lg mt-4">
            ID: {profile.idNumber}
          </div>
        )}
      </div>

      {/*Blood Group*/}
      {profile.bloodGroup && (
        <span className=" text-[#F34242] px-4 py-2 rounded-full text-xl font-medium flex items-center justify-center gap-2 mt-2">
          🩸 {profile.bloodGroup}
        </span>
      )}
    </div>
  );
};

export default NameTitle;

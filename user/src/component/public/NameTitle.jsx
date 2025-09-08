import React from "react";
import { Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const NameTitle = ({ profile, user, company }) => {
  const { theme } = useTheme();

  return (
    <div >
      <div
        className={` ${theme.text} flex items-center justify-center flex-col`}
      >
        <div className="text-2xl  text-center lg:text-left">
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
          <h1 className={"text-xl text-center"}>{profile.designation}</h1>
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
          <h1 className={"font-bold text-center"}>{company?.companyName}</h1>
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
  );
};

export default NameTitle;

import React from "react";

import imgVector from "../../assets/imgVector111.svg";
import imgFluentPeopleTeam16Filled from "../../assets/imgFluentPeopleTeam16Filled.svg";
import imgFaGlobe from "../../assets/imgFaGlobe.svg";
import imgPhBuildingOfficeFill from "../../assets/imgPhBuildingOfficeFill.svg";

const AtAGlance = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1
        style={{
          width: "100%",
          textAlign: "center",
          color: "#4E52FB",
          fontSize: 48,
          fontFamily: "Bruno Ace",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
        className={"pb-15"}
      >
        TechVibes at a Glance
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-16 text-white">
        <div className="flex items-center gap-6">
          <div className="bg-gray-200 p-5 rounded-lg">
            <img
              className="w-12 h-12"
              src={imgFluentPeopleTeam16Filled}
              alt="Team Members"
            />
          </div>
          <div>
            <p className="text-4xl font-bold">35+</p>
            <p className="text-[16px]">Team Members</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-gray-200 p-5 rounded-lg">
            <div className="w-12 h-12">
              <img
                className="w-full h-full"
                src={imgVector}
                alt="Companies Onboarded"
              />
            </div>
          </div>
          <div>
            <p className="text-4xl font-bold">10,000+</p>
            <p className="text-[16px]">Companies Onboarded</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-gray-200 p-5 rounded-lg">
            <img
              className="w-12 h-12"
              src={imgFaGlobe}
              alt="Active Countries"
            />
          </div>
          <div>
            <p className="text-4xl font-bold">195+</p>
            <p className="text-[16px]">Active Countries</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-gray-200 p-5 rounded-lg">
            <img
              className="w-12 h-12"
              src={imgPhBuildingOfficeFill}
              alt="Office Locations"
            />
          </div>
          <div>
            <p className="text-4xl font-bold">5</p>
            <p className="ttext-[16px]">Office Locations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtAGlance;

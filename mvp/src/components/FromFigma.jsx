import React from "react";
import { profileData } from "../utlts/SampleData.js";
import {
  Check,
  Download,
  User,
  MessageCircle,
  ExternalLink,
  Globe,
} from "lucide-react";
import SocialIconsGlow from "./SocialIconsGlow.jsx";

const FromFigma = () => {
  const handleSaveContact = () => {
    // Create vCard data
    const vcard = `BEGIN:VCARD
      VERSION:3.0
      FN:${profileData.employee.fullName}
      ORG:${profileData.company.name}
      TITLE:${profileData.employee.designation}
      EMAIL;TYPE=WORK:${profileData.contact.emails.office}
      EMAIL;TYPE=HOME:${profileData.contact.emails.personal}
      TEL;TYPE=WORK:${profileData.contact.phones.office}
      TEL;TYPE=HOME:${profileData.contact.phones.personal}
      ADR;TYPE=WORK:;;${profileData.locations[0].address}
      URL:${profileData.social[0].url}
      NOTE:${profileData.employee.bio}
      END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profileData.employee.fullName.replace(
      " ",
      "_",
    )}_contact.vcf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleConnect = () => {
    alert("Connection request sent! Lead information captured.");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profileData.employee.fullName} - ${profileData.company.name}`,
        text: `Connect with ${profileData.employee.fullName} from ${profileData.company.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Profile link copied to clipboard!");
    }
  };

  const handleAppointment = () => {
    window.open(`tel:${profileData.contact.phones.office}`, "_self");
  };

  return (
    <div className={"bg-[#0E191E]  "}>
      {/* Cover Photo */}
      <div className="relative h-72 lg:h-96 max-w-6xl mx-auto">
        <img
          src={profileData.company.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover opacity-90 absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent" />
        <div className="absolute left-10 top-8 flex items-center gap-4 z-10">
          <img
            src={profileData.company.logo}
            alt="Company Logo"
            className="w-20 h-20"
          />
        </div>
        <div className="absolute right-10 top-8 flex items-center gap-4 z-10">
          <button
            className={
              "text-white border-2 border-white px-2 py-1 rounded-md flex items-center justify-center gap-2 cursor-pointer"
            }
          >
            <User /> Login
          </button>
        </div>
        {/* Profile Photo - Overlapping */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 z-20">
          <div className="relative">
            <img
              src={profileData.employee.profilePhoto}
              alt="Profile"
              className="w-60 h-60 rounded-full border-10 border-[0E181E] shadow-2xl object-cover -mb-30"
            />
          </div>
        </div>
      </div>
      {/* Main Content - Starts below profile photo */}
      <div className="pt-32 px-8 md:px-52 lg:px-92 pb-16 max-w-6xl mx-auto">
        <div className="text-white uppercase flex items-center justify-center flex-col">
          <h1 className="flex items-center gap-2 justify-center lg:justify-start">
            {profileData.employee.fullName}
            {profileData.employee.verified && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1877F2] text-white shadow-sm">
                <Check className="w-3 h-3" strokeWidth={3} />
              </span>
            )}
          </h1>
          <h1>{profileData.employee.designation}</h1>
          <h1>{profileData.employee.department}</h1>
          <h1>{profileData.company.name}</h1>
          <span className=" text-[#F34242] px-4 py-2 rounded-full text-xl font-medium flex items-center gap-2">
            🩸 {profileData.employee.bloodGroup}
          </span>
          <div className="text-white bg-[rgba(255,255,255,0.18)] px-7 py-1 rounded-lg">
            ID: {profileData.employee.employeeId}
          </div>
          <div className={"flex gap-10 mt-5"}>
            <button className="bg-[#4E4E4E] text-white font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4">
              <Download />
              Save Contact
            </button>

            <button className="bg-[#4E4E4E] text-white font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4">
              <MessageCircle />
              Connect
            </button>
          </div>
        </div>
        <div className={"flex flex-col  justify-center mt-5"}>
          <div>
            <span className={" flex gap-4"}>
              <Globe className={"text-green-600"} />
              <span className={"text-white"}> Connect Online</span>
            </span>
            <SocialIconsGlow socials={profileData.social} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromFigma;

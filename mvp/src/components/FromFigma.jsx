import React from "react";
import { profileData } from "../utlts/SampleData.js";
import {
  Check,
  Download,
  User,
  MessageCircle,
  BriefcaseBusiness,
  Globe,
  MessagesSquare,
} from "lucide-react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import SocialIconsGlow from "./SocialIconsGlow.jsx";
import ContactSection from "./ContactSection.jsx";
import AddressSection from "./AddressSection.jsx";
import BusinessHoursCard from "./BusinessHoursCard.jsx";
import QRCodeSection from "./QRCodeSection.jsx";

const FromFigma = () => {
  return (
    <div className={"bg-[#0E191E]  "}>
      {/* Cover Photo */}
      <div className="relative h-60 lg:h-96 max-w-6xl mx-auto">
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
          <img
            src={profileData.employee.profilePhoto}
            alt="Profile"
            className=" md:w-60 md:h-60 rounded-full shadow-2xl object-cover -mb-16 md:-mb-24 border-[#0E181E]"
            style={{ borderWidth: "10px" }}
          />
        </div>
      </div>
      {/* Main Content - Starts below profile photo */}
      <div className="pt-18 md:pt-25 px-2 md:px-52 lg:px-92 pb-7 max-w-6xl mx-auto">
        <div className="text-white uppercase flex items-center justify-center flex-col">
          <h1 className="flex items-center gap-2 justify-center lg:justify-start text-3xl">
            {profileData.employee.fullName}
            {profileData.employee.verified && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1877F2] text-white shadow-sm">
                <Check className="w-3 h-3" strokeWidth={3} />
              </span>
            )}
          </h1>
          <h1 className={"text-xl"}>{profileData.employee.designation}</h1>
          <h1>{profileData.employee.department}</h1>
          <h1 className={"font-bold"}>{profileData.company.name}</h1>
          <span className=" text-[#F34242] px-4 py-2 rounded-full text-xl font-medium flex items-center gap-2">
            🩸 {profileData.employee.bloodGroup}
          </span>
          <div className="text-white bg-[rgba(255,255,255,0.18)] px-7 py-1 rounded-lg">
            ID: {profileData.employee.employeeId}
          </div>
          <div className={"flex gap-5 mt-5"}>
            <button className="bg-[#4E4E4E] text-white font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4 cursor-pointer">
              <Download />
              Save Contact
            </button>

            <button className="bg-[#4E4E4E] text-white font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4 cursor-pointer">
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
      <div className={"max-w-6xl mx-auto px-2 md:px-32 "}>
        <p className="text-white bg-[#212F35] inner-glow p-4 leading-relaxed rounded-xl flex flex-col gap-4">
          <BriefcaseBusiness />
          {profileData.employee.bio}
        </p>
      </div>
      <div className={"max-w-6xl mx-auto px-2 md:px-10 overflow-hidden"}>
        <h1
          className={
            "text-white flex gap-2 pt-5 pb-5 text-xl font-medium  items-center"
          }
        >
          <MessagesSquare />
          Get In Touch
        </h1>
        <div className={"grid md:grid-cols-2 gap-4 "}>
          <ContactSection
            title="WhatsApp"
            icon={FaWhatsapp}
            iconColor="#22c55e" // green-600
            items={[
              {
                label: "Personal",
                value: profileData.contact.whatsapp.personal,
              },
              { label: "Office", value: profileData.contact.whatsapp.business },
            ]}
            linkPrefix="https://wa.me/"
          />

          <ContactSection
            title="Phone"
            icon={FaPhoneAlt}
            iconColor="#3b82f6" // blue-500
            items={[
              { label: "Personal", value: profileData.contact.phones.personal },
              { label: "Office", value: profileData.contact.phones.office },
            ]}
            linkPrefix="tel:"
          />

          <ContactSection
            title="Email"
            icon={FaEnvelope}
            iconColor="#f87171" // red-400
            items={[
              { label: "Personal", value: profileData.contact.emails.personal },
              { label: "Office", value: profileData.contact.emails.office },
            ]}
            linkPrefix="mailto:"
          />
          <AddressSection
            title="Locations"
            icon={FaMapMarkerAlt}
            iconColor="#fbbf24" // yellow-400
            items={profileData.locations.map((location) => ({
              label: location.type,
              value: location.address,
            }))}
          />
        </div>

        <div className={"md:flex flex-col  justify-center items-center"}>
          <BusinessHoursCard />

          <QRCodeSection qrCodeData={"https://techvibesbd.com/"} />
        </div>
      </div>
    </div>
  );
};

export default FromFigma;

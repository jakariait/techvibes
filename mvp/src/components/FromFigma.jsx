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
import SisterConcernSection from "./SisterConcernSection.jsx";
import TechVibesCard from "./TechVibesCard.jsx";

const FromFigma = () => {


  const handleSaveContact = async () => {
    const imageUrl = profileData.employee.profilePhoto;

    // Convert image to base64
    const getBase64FromImageUrl = async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]); // remove data:image/...;base64,
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const base64Image = await getBase64FromImageUrl(imageUrl);

    // Create vCard data with PHOTO included
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:${profileData.employee.fullName}
ORG:${profileData.company.name}
TITLE:${profileData.employee.designation}
EMAIL;TYPE=WORK:${profileData.contact.emails.office}
EMAIL;TYPE=HOME:${profileData.contact.emails.personal}
TEL;TYPE=WORK:${profileData.contact.phones.office}
TEL;TYPE=HOME:${profileData.contact.phones.personal}
ADR;TYPE=WORK:;;${profileData.locations[0].address}
URL:${profileData.social[2].url}
NOTE:Elite Garments Industries Ltd., Octagon Fibres & Chemicals Ltd., Elite Iron & Steel Industries Ltd., Aqua Refinery Ltd., Aqua Mineral Turpentine & Solvents Plant Ltd.
PHOTO;ENCODING=b;TYPE=JPEG:${base64Image}
END:VCARD`;


    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profileData.employee.fullName.replace(" ", "_")}_contact.vcf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
            className="w-16 h-16 object-contain "
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
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 z-20 ">
          <img
            src={profileData.employee.profilePhoto}
            alt="Profile"
            className="w-33 h-40 md:w-50 md:h-60 object-cover  -mb-16 md:-mb-24  rounded-xl "
          />
        </div>
      </div>
      {/* Main Content - Starts below profile photo */}
      <div className="pt-18 md:pt-25 px-2 md:px-52 lg:px-92 pb-7 max-w-6xl mx-auto">
        <div className="text-white  flex items-center justify-center flex-col">
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

          {/*<div className="text-white bg-[rgba(255,255,255,0.18)] px-7 py-1 rounded-lg">*/}
          {/*  ID: {profileData.employee.employeeId}*/}
          {/*</div>*/}
          <div className={"flex gap-5 mt-5"}>
            <button
              onClick={handleSaveContact}
              className="bg-[#4E4E4E] text-white font-semibold py-2 px-5 rounded-lg inner-glow flex justify-center items-center gap-4 cursor-pointer"
            >
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

      {/*<div className={"max-w-6xl mx-auto px-2 md:px-32 "}>*/}
      {/*  <p className="text-white bg-[#212F35] inner-glow p-4 leading-relaxed rounded-xl flex flex-col gap-4">*/}
      {/*    <div className={"flex gap-2"}>*/}
      {/*      <BriefcaseBusiness />*/}
      {/*      <h1>Departments / Responsibilities</h1>*/}
      {/*    </div>*/}
      {/*    <ul className="list-disc pl-5 text-white leading-relaxed space-y-1 grid md:grid-cols-2">*/}
      {/*      <li>Corporate Strategy & Leadership</li>*/}
      {/*      <li>Production Oversight & Quality Control</li>*/}
      {/*      <li>International Client Relations</li>*/}
      {/*      <li>Supply Chain & Compliance</li>*/}
      {/*    </ul>*/}
      {/*  </p>*/}
      {/*  <span className=" text-[#F34242] px-4 py-2 rounded-full text-xl font-medium flex items-center justify-center gap-2">*/}
      {/*    🩸 {profileData.employee.bloodGroup}*/}
      {/*  </span>*/}
      {/*</div>*/}

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
                label: "Cell",
                value: profileData.contact.whatsapp.personal,
              },
              // { label: "Office", value: profileData.contact.whatsapp.business },
            ]}
            linkPrefix="https://wa.me/"
          />

          <ContactSection
            title="Phone"
            icon={FaPhoneAlt}
            iconColor="#3b82f6" // blue-500
            items={[
              {
                label: "Cell",
                value: profileData.contact.phones.personal,
              },
              { label: "Office", value: profileData.contact.phones.office },
              { label: "Office", value: "09602-112277" },
            ]}
            linkPrefix="tel:"
          />

          <ContactSection
            title="Email"
            icon={FaEnvelope}
            iconColor="#f87171" // red-400
            items={[
              // { label: "Personal", value: profileData.contact.emails.personal },
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
          <div className={"grid lg:grid-cols-2 w-full gap-4 mt-5"}>
            <BusinessHoursCard />
            <SisterConcernSection
              concerns={[
                "                Elite Garments Industries Ltd.\n",
                "Octagon Fibres & Chemicals Ltd.",
                "Elite Iron & Steel Industries Ltd.",
                "Aqua Refinery Ltd.",
                "Aqua Mineral Turpentine & Solvents Plant Ltd.",
              ]}
            />
          </div>
          <div
            className={
              "grid md:grid-cols-2 w-full gap-4 md:items-center md:justify-center"
            }
          >
            <QRCodeSection qrCodeData={"https://nfc-elitegroupbd.vercel.app/"} />
            <TechVibesCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromFigma;

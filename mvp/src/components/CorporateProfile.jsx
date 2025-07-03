import React, { useState } from "react";
import {
	Phone,
	Mail,
	MapPin,
	Clock,
	QrCode,
	Download,
	Share2,
	UserPlus,
	Bookmark,
	ExternalLink,
	Building2,
	User,
	Briefcase,
	Calendar,
	MessageCircle,
	Shield,
	Package,
	Globe,
} from "lucide-react";
import {profileData} from "../utlts/SampleData.js";

const CorporateProfile = () => {
	const [activeTab, setActiveTab] = useState("profile");



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
			"_"
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
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl w-full mx-auto bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-72 lg:h-96 bg-gradient-to-r from-blue-700 to-blue-400">
          <img
            src={profileData.company.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover opacity-90 absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent" />
          <div className="absolute left-10 bottom-8 flex items-center gap-4 z-10">
            <img
              src={profileData.company.logo}
              alt="Company Logo"
              className="w-16 h-16 rounded-lg bg-white p-2 shadow-xl border border-gray-200"
            />
            <div>
              <div className="text-white text-2xl font-bold drop-shadow-lg">
                {profileData.company.name}
              </div>
              <div className="text-blue-100 text-sm font-medium drop-shadow">
                Corporate Profile
              </div>
            </div>
          </div>
          {/* Profile Photo - Overlapping */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 z-20">
            <div className="relative">
              <img
                src={profileData.employee.profilePhoto}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-white shadow-2xl object-cover -mb-20"
              />
              {profileData.employee.verified && (
                <div className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-1 shadow">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content - Starts below profile photo */}
        <div className="pt-28 px-8 lg:px-24 pb-16">
          <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col lg:flex-row items-center gap-12 border border-gray-100">
            {/* Info & Actions */}
            <div className="flex-1 w-full text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 justify-center lg:justify-start">
                    {profileData.employee.fullName}
                    {profileData.employee.verified && (
                      <span className="text-blue-600">✓</span>
                    )}
                  </h1>
                  <div className="text-blue-700 font-semibold text-xl">
                    {profileData.employee.designation}
                  </div>
                  <div className="text-gray-500 text-lg">
                    {profileData.employee.department}
                  </div>
                  <div className="text-gray-400 text-sm mt-2 flex items-center gap-1 justify-center lg:justify-start">
                    <Building2 className="w-5 h-5 inline" />
                    {profileData.company.name} • ID:{" "}
                    {profileData.employee.employeeId}
                  </div>
                </div>
                <div className="flex gap-3 mt-4 lg:mt-0 justify-center lg:justify-end">
                  <button
                    onClick={handleConnect}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-sm transition-colors text-lg"
                  >
                    <UserPlus className="w-5 h-5" /> Connect
                  </button>
                  <button
                    onClick={handleSaveContact}
                    className="bg-gray-100 hover:bg-gray-200 text-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 border border-gray-200 transition-colors text-lg"
                  >
                    <Bookmark className="w-5 h-5" /> Save
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-sm transition-colors text-lg"
                  >
                    <Share2 className="w-5 h-5" /> Share
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 justify-center lg:justify-start">
                <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-base font-medium flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />{" "}
                  {profileData.employee.designation}
                </span>
                <span className="bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-base font-medium flex items-center gap-2">
                  <User className="w-4 h-4" /> {profileData.employee.department}
                </span>
                <span className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-base font-medium flex items-center gap-2">
                  🩸 {profileData.employee.bloodGroup}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8 px-6 lg:px-12 pb-10">
          <div className="flex gap-2 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-5 py-2 rounded-t-lg font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "profile"
                  ? "text-blue-700 border-blue-600 bg-blue-50"
                  : "text-gray-500 border-transparent hover:bg-gray-50"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-5 py-2 rounded-t-lg font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "contact"
                  ? "text-blue-700 border-blue-600 bg-blue-50"
                  : "text-gray-500 border-transparent hover:bg-gray-50"
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-5 py-2 rounded-t-lg font-semibold text-sm transition-colors border-b-2 ${
                activeTab === "business"
                  ? "text-blue-700 border-blue-600 bg-blue-50"
                  : "text-gray-500 border-transparent hover:bg-gray-50"
              }`}
            >
              Business
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bio & Social */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                  <User className="w-5 h-5" /> Bio
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {profileData.employee.bio}
                </p>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                  <Globe className="w-5 h-5" /> Social Media
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profileData.social.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg hover:bg-blue-50 border border-gray-100 text-gray-700 font-medium text-sm transition-colors shadow-sm"
                    >
                      <span className="text-xl">{social.icon}</span>
                      {social.platform}
                      <ExternalLink className="w-4 h-4 ml-1 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
              {/* Quick Info */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 shadow-sm">
                <div className="mb-4">
                  <span className="block text-xs text-blue-700 font-semibold mb-1">
                    Employee ID
                  </span>
                  <span className="text-lg font-bold text-blue-900">
                    {profileData.employee.employeeId}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-blue-700 font-semibold mb-1">
                    Company
                  </span>
                  <span className="text-lg font-bold text-blue-900">
                    {profileData.company.name}
                  </span>
                </div>
              </div>
            </div>
          )}
          {activeTab === "contact" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Emails & Phones */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email Addresses
                  </h3>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${profileData.contact.emails.office}`}
                      className="block p-3 bg-white rounded-lg hover:bg-blue-50 border border-gray-100 transition-colors shadow-sm"
                    >
                      <div className="font-medium">Office</div>
                      <div className="text-gray-600 text-sm">
                        {profileData.contact.emails.office}
                      </div>
                    </a>
                    <a
                      href={`mailto:${profileData.contact.emails.personal}`}
                      className="block p-3 bg-white rounded-lg hover:bg-blue-50 border border-gray-100 transition-colors shadow-sm"
                    >
                      <div className="font-medium">Personal</div>
                      <div className="text-gray-600 text-sm">
                        {profileData.contact.emails.personal}
                      </div>
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Numbers
                  </h3>
                  <div className="space-y-2">
                    <a
                      href={`tel:${profileData.contact.phones.office}`}
                      className="block p-3 bg-white rounded-lg hover:bg-blue-50 border border-gray-100 transition-colors shadow-sm"
                    >
                      <div className="font-medium">Office</div>
                      <div className="text-gray-600 text-sm">
                        {profileData.contact.phones.office}
                      </div>
                    </a>
                    <a
                      href={`tel:${profileData.contact.phones.personal}`}
                      className="block p-3 bg-white rounded-lg hover:bg-blue-50 border border-gray-100 transition-colors shadow-sm"
                    >
                      <div className="font-medium">Personal</div>
                      <div className="text-gray-600 text-sm">
                        {profileData.contact.phones.personal}
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              {/* WhatsApp & Locations */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </h3>
                  <div className="space-y-2">
                    <a
                      href={`https://wa.me/${profileData.contact.whatsapp.business.replace(
                        /[^0-9]/g,
                        "",
                      )}`}
                      className="block p-3 bg-white rounded-lg hover:bg-green-50 border border-gray-100 transition-colors shadow-sm"
                    >
                      <div className="font-medium">Business</div>
                      <div className="text-gray-600 text-sm">
                        {profileData.contact.whatsapp.business}
                      </div>
                    </a>
                    <a
                      href={`https://wa.me/${profileData.contact.whatsapp.personal.replace(
                        /[^0-9]/g,
                        "",
                      )}`}
                      className="block p-3 bg-white rounded-lg hover:bg-green-50 border border-gray-100 transition-colors shadow-sm"
                    >
                      <div className="font-medium">Personal</div>
                      <div className="text-gray-600 text-sm">
                        {profileData.contact.whatsapp.personal}
                      </div>
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Locations
                  </h3>
                  <div className="space-y-2">
                    {profileData.locations.map((location, index) => (
                      <div
                        key={index}
                        className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm"
                      >
                        <div className="font-medium">{location.type}</div>
                        <div className="text-gray-600 text-sm">
                          {location.address}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "business" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Business Hours & Services */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Business Hours
                  </h3>
                  <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div className="text-gray-600 mb-2">
                      {profileData.business.hours}
                    </div>
                    <button
                      onClick={handleAppointment}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Calendar className="w-4 h-4" /> Call for Appointment
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4" /> Products & Services
                  </h3>
                  <div className="space-y-2">
                    {profileData.business.services.map((service, index) => (
                      <div
                        key={index}
                        className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm text-gray-700"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* QR Code & Networking Partner */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <QrCode className="w-4 h-4" /> QR Code
                  </h3>
                  <div className="bg-white rounded-lg p-6 text-center border border-gray-100 shadow-sm">
                    <div className="w-32 h-32 bg-gray-100 border-2 border-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors">
                        <Download className="w-4 h-4" /> Download
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                      >
                        <Share2 className="w-4 h-4" /> Share
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center py-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">
                    Networking Partner
                  </div>
                  <div className="text-blue-600 font-semibold">
                    🤝 TechVibes
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorporateProfile;

import React from "react";
import ImageComponent from "../public/ImageComponent.jsx";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const menuItems = [
  {
    label: "Dashboard",
    path: "/user/home",
    active: true,
  },
  {
    label: "General Info",
    path: "/user/general-info",
  },
  {
    label: "Profile & Cover Photo",
    path: "/user/profile-cover-photo",
  },
  {
    label: "Social Media",
    path: "/user/social-media",
  },
  {
    label: "Gallery",
    path: "/user/gallery",
  },
  {
    label: "Email",
    path: "/user/email",
  },
  {
    label: "Phone",
    path: "/user/phone",
  },
  {
    label: "Whatsapp",
    path: "/user/whatsapp",
  },
  {
    label: "Designations",
    path: "/user/designations",
  },
  {
    label: "Products & Services",
    path: "/user/products-services",
  },
  {
    label: "Sister Concerns",
    path: "/user/sister-concerns",
  },
  {
    label: "Location",
    path: "/user/location",
  },
  { label: "Change password", path: "/user/change-password" },
];

const UserMenu = ({ user, logout, profile }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden  w-60">
      {/* Profile Box */}
      <div className="text-white rounded-xl p-2 py-1 flex flex-col items-center">
        {profile?.profilePhoto ? (
          <ImageComponent
            imageName={profile?.profilePhoto}
            className="w-24 h-24 rounded-full object-cover border-white border-4"
          />
        ) : (
          <span className="accentTextColor text-xl font-semibold w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-center">
            {user?.fullName || "User"}
          </span>
        )}
        <h2 className="text-xl font-bold mt-2">{user?.fullName}</h2>
        <p className="text-sm mt-1">{user?.phone || user?.email}</p>

        <button
          onClick={handleLogout}
          className="mt-4 accentBgColor primaryTextColor rounded-full py-2 px-5 flex items-center cursor-pointer gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-6 space-y-2">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow`}
          >
            <div className="flex items-center gap-3">
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default UserMenu;

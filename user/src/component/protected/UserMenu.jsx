import React from "react";
import ImageComponent from "../public/ImageComponent.jsx";
import { Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserCog,
  FaKey,
} from "react-icons/fa";

const menuItems = [
  {
    icon: <FaTachometerAlt />,
    label: "Dashboard",
    path: "/user/home",
    active: true,
  },
  {
    icon: <FaUserCog />,
    label: "Manage profile",
    path: "/user/manage-profile",
  },
  { icon: <FaKey />, label: "Change password", path: "/user/change-password" },
];

const UserMenu = ({ user, logout, profile }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white md:shadow-md rounded-xl p-4 w-60">
      {/* Profile Box */}
      <div className="primaryBgColor accentTextColor rounded-xl p-2 py-5 flex flex-col items-center">
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
            className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer ${
              item.active
                ? "primaryBgColor accentTextColor"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.active && <span className="text-xl">→</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default UserMenu;

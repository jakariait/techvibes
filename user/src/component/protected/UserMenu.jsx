import React from "react";
import ImageComponent from "../public/ImageComponent.jsx";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { UserCircle } from "lucide-react";
import RequirePermission from "../public/RequirePermission.jsx";

const menuItems = [
  { label: "Dashboard", path: "/user/home", active: true },
  { label: "General Info", path: "/user/general-info" },
  { label: "Profile & Cover Photo", path: "/user/profile-cover-photo" },
  { label: "Social Media", path: "/user/social-media" },
  { label: "Gallery", path: "/user/gallery" },
  { label: "Email", path: "/user/email" },
  { label: "Phone", path: "/user/phone" },
  { label: "Whatsapp", path: "/user/whatsapp" },
  { label: "Designations", path: "/user/designations" },
  { label: "Products & Services", path: "/user/products-services" },
  { label: "Sister Concerns", path: "/user/sister-concerns" },
  { label: "Location", path: "/user/location" },
  { label: "Name & Login Email", path: "/user/name-login-email" },
  { label: "Change Password", path: "/user/change-password" },
  { label: "Connect", path: "/user/connect" },
];

const UserMenu = ({ user, logout, profile }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl   overflow-y-auto scrollbar-hide">
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

        <a
          href={`/profile/${user?.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 accentBgColor primaryTextColor rounded-full py-2 px-5 flex items-center cursor-pointer gap-2"
        >
          <UserCircle className="w-4 h-4" />
          View Profile
        </a>
      </div>

      {/* Menu */}
      <nav className="mt-6 space-y-2">
        <Link to={menuItems[0].path} className="menu-link inner-glow">
          {menuItems[0].label}
        </Link>
        <Link to={menuItems[14].path} className="menu-link inner-glow">
          {menuItems[14].label}
        </Link>
        <Link to={menuItems[1].path} className="menu-link inner-glow">
          {menuItems[1].label}
        </Link>
        <Link to={menuItems[2].path} className="menu-link inner-glow">
          {menuItems[2].label}
        </Link>
        <Link to={menuItems[3].path} className="menu-link inner-glow">
          {menuItems[3].label}
        </Link>

        {/*Gallery Render With Permission*/}
        <RequirePermission
          permission="gallery"
          userPermissions={user?.permission}
        >
          <Link to={menuItems[4].path} className="menu-link inner-glow">
            {menuItems[4].label}
          </Link>
        </RequirePermission>

        <Link to={menuItems[5].path} className="menu-link inner-glow">
          {menuItems[5].label}
        </Link>
        <Link to={menuItems[6].path} className="menu-link inner-glow">
          {menuItems[6].label}
        </Link>
        <Link to={menuItems[7].path} className="menu-link inner-glow">
          {menuItems[7].label}
        </Link>
        <Link to={menuItems[8].path} className="menu-link inner-glow">
          {menuItems[8].label}
        </Link>
        <Link to={menuItems[9].path} className="menu-link inner-glow">
          {menuItems[9].label}
        </Link>

        {/* Sister Concerns only for corporate users */}
        {user?.role === "corporate" && (
          <Link to={menuItems[10].path} className="menu-link inner-glow">
            {menuItems[10].label}
          </Link>
        )}

        <Link to={menuItems[11].path} className="menu-link inner-glow">
          {menuItems[11].label}
        </Link>
        <Link to={menuItems[12].path} className="menu-link inner-glow">
          {menuItems[12].label}
        </Link>
        <Link to={menuItems[13].path} className="menu-link inner-glow">
          {menuItems[13].label}
        </Link>
      </nav>
    </div>
  );
};

export default UserMenu;

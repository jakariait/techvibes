import React from "react";
import ImageComponent from "../public/ImageComponent.jsx";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { UserCircle } from "lucide-react";
import RequirePermission from "../public/RequirePermission.jsx";
import Gallery from "../public/Gallery.jsx";

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
];

const UserMenu = ({ user, logout, profile }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden w-60">
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
        <Link
          to={menuItems[0].path}
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
        >
          <div className="flex items-center gap-3">
            <span>{menuItems[0].label}</span>
          </div>
        </Link>

        <Link
          to={menuItems[1].path}
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
        >
          <div className="flex items-center gap-3">
            <span>{menuItems[1].label}</span>
          </div>
        </Link>

        <Link
          to={menuItems[2].path}
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
        >
          <div className="flex items-center gap-3">
            <span>{menuItems[2].label}</span>
          </div>
        </Link>

        <Link
          to={menuItems[3].path}
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
        >
          <div className="flex items-center gap-3">
            <span>{menuItems[3].label}</span>
          </div>
        </Link>

        {/*Gallery Render With Permission*/}
        <RequirePermission
          permission="gallery"
          userPermissions={user?.permission}
        >
          <Link
            to={menuItems[4].path}
            className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
          >
            <div className="flex items-center gap-3">
              <span>{menuItems[4].label}</span>
            </div>
          </Link>
        </RequirePermission>


        <Link
          to={menuItems[5].path}
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
        >
          <div className="flex items-center gap-3">
            <span>{menuItems[5].label}</span>
          </div>
        </Link>

        <Link
          to={menuItems[6].path}
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
        >
          <div className="flex items-center gap-3">
            <span>{menuItems[6].label}</span>
          </div>
        </Link>

        <Link
          to={menuItems[7].path}
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
        >
          <div className="flex items-center gap-3">
            <span>{menuItems[7].label}</span>
          </div>
        </Link>

        <Link
          to={menuItems[8].path}
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
        >
          <div className="flex items-center gap-3">
            <span>{menuItems[8].label}</span>
          </div>
        </Link>

        <Link
          to={menuItems[9].path}
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
        >
          <div className="flex items-center gap-3">
            <span>{menuItems[9].label}</span>
          </div>
        </Link>

        {/* Sister Concerns - conditionally rendered */}
        {user?.role === "corporate"  && (
          <Link
            to={menuItems[10].path}
            className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
          >
            <div className="flex items-center gap-3">
              <span>{menuItems[10].label}</span>
            </div>
          </Link>
        )}

        <Link
          to={menuItems[11].path}
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
        >
          <div className="flex items-center gap-3">
            <span>{menuItems[11].label}</span>
          </div>
        </Link>

        <Link
          to={menuItems[12].path}
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
        >
          <div className="flex items-center gap-3">
            <span>{menuItems[12].label}</span>
          </div>
        </Link>

        <Link
          to={menuItems[13].path}
          className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer text-white inner-glow"
        >
          <div className="flex items-center gap-3">
            <span>{menuItems[13].label}</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default UserMenu;

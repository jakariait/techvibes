import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { UserCircle } from "lucide-react";
import ImageComponent from "../public/ImageComponent.jsx";
import RequirePermission from "../public/RequirePermission.jsx";
import useAuthUserStore from "../../store/AuthUserStore.jsx";

const menuItems = [
  { label: "Dashboard", path: "/user/home" },

  { label: "TechVibes User", path: "/user/techvibes-user" },
  { label: "TechVibes Company", path: "/user/techvibes-company" },

  { label: "Company Admin", path: "/user/company-admin" },

  { label: "General Info", path: "/user/general-info" },
  { label: "Profile & Cover Photo", path: "/user/profile-cover-photo" },
  { label: "Social Media", path: "/user/social-media" },
  { label: "Gallery", path: "/user/gallery", permission: "gallery" },
  { label: "Email", path: "/user/email" },
  { label: "Phone", path: "/user/phone" },
  { label: "Whatsapp", path: "/user/whatsapp" },
  { label: "Career Journey", path: "/user/career-journey" },
  { label: "Products & Services", path: "/user/products-services" },
  {
    label: "Sister Concerns",
    path: "/user/sister-concerns",
    role: "corporate",
  },
  { label: "Location", path: "/user/location" },
  { label: "Reorder Profile Sections", path: "/user/reorder-profile" },
  { label: "Name & Login Email", path: "/user/name-login-email" },
  { label: "Change Password", path: "/user/change-password" },
];

const UserMenu = ({ user, logout, profile }) => {
  const location = useLocation();

  const isAdmin = useAuthUserStore((state) => state.isAdmin);

  const isMainAdmin = user?.isMainAdmin;

  const handleLogout = () => {
    logout();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-[#212F35] inner-glow p-4 md:rounded-xl h-screen  overflow-y-auto scrollbar-hide">
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
        {menuItems.map((item) => {
          // Conditionally render "Company Admin" only if isAdmin is true
          if (item.label === "Company Admin" && !isAdmin) {
            return null;
          }



          // Hide "TechVibes User" and "TechVibes Company" if isAdmin is true
          if (!isMainAdmin && (item.label === "TechVibes User" || item.label === "TechVibes Company")) {
            return null;
          }

          // Permission-based rendering
          if (item.permission) {
            return (
              <RequirePermission
                key={item.path}
                permission={item.permission}
                userPermissions={user?.permission}
              >
                <Link
                  to={item.path}
                  className={`menu-link inner-glow ${
                    isActive(item.path) ? "!bg-blue-200 !text-[#212F35]" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </RequirePermission>
            );
          }

          // Role-based rendering
          if (item.role && item.role !== user?.role) {
            return null;
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-link inner-glow ${
                isActive(item.path) ? "!bg-blue-200 !text-[#212F35]" : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default UserMenu;

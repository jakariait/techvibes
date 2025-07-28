import React, { useEffect, useRef, useState } from "react";
import UserMenu from "./UserMenu.jsx";
import { FaUser } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import useAuthUserStore from "../../store/AuthUserStore.jsx";
import useUserProfileStore from "../../store/useUserProfileStore.jsx";

const UserLayout = ({ children }) => {
  const { user, logout, initialize } = useAuthUserStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const { fetchUserBySlug, profile } = useUserProfileStore();

  // Once authUser is available, fetch full profile by slug
  useEffect(() => {
    if (!user?.slug) return;

    (async () => {
      try {
        await fetchUserBySlug(user.slug);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    })();
  }, [user?.slug, fetchUserBySlug]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#0E191E]">
      {/* Main container with vertical layout */}
      <div className="xl:container xl:mx-auto p-2 flex flex-col lg:flex-row  relative">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-[250px]">
          <UserMenu user={user} logout={logout} profile={profile} />
        </aside>

        {/* Mobile menu toggle button */}
        <div className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-blue-500/60 text-white p-3 rounded-r-lg cursor-pointer">
          <FaUser
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl"
          />
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Slide-out menu */}
          <div
            ref={menuRef}
            className="relative bg-white w-64 h-full shadow-lg transform transition-transform duration-300 ease-in-out"
            style={{
              transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <button
              className="absolute z-50 right-5 top-5 bg-white p-2 rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdClose className="w-5 h-5" />
            </button>
            <UserMenu user={user} logout={logout} profile={profile} />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full md:ml-3">{children}</main>
      </div>
    </div>
  );
};

export default UserLayout;

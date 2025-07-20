import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUserStore from "../store/AuthUserStore.jsx";
import useUserProfileStore from "../store/useUserProfileStore.jsx";
import LoadingLottie from "../component/public/LoadingLottie.jsx";
import UserGallery from "../component/protected/UserGallery.jsx";
import UserLayout from "../component/protected/UserLayout.jsx";

import Analytics from "../component/protected/Analytics.jsx";
import SocialLinksSection from "../component/protected/SocialLinksSection.jsx";
import ContactListSection from "../component/protected/ContactListSection.jsx";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

const UserHomePage = () => {
  const {
    initialize,
    user: authUser,
    loading: authLoading,
    error: authError,
    logout,
    token,
  } = useAuthUserStore();

  const {
    loading: profileLoading,
    error: profileError,
    fetchUserBySlug,
    profile,
  } = useUserProfileStore();

  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  // Run initialize once on mount to load user from token
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Once authUser is available, fetch full profile by slug
  useEffect(() => {
    if (!authUser?.slug) return;

    (async () => {
      try {
        await fetchUserBySlug(authUser.slug);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    })();
  }, [authUser?.slug, fetchUserBySlug]);

  useEffect(() => {
    const init = async () => {
      await initialize();
      setIsInitialized(true);
    };
    init();
  }, [initialize]);

  // Only redirect after we've tried to initialize
  useEffect(() => {
    if (isInitialized && !authUser) {
      navigate("/");
    }
  }, [isInitialized, authUser, navigate]);

  // Show loader if auth or profile still loading
  if (authLoading || profileLoading) {
    return <LoadingLottie />;
  }

  // Show error if any
  if (authError || profileError) {
    return (
      <div className="p-10 text-red-500 text-center">
        {authError || profileError}
      </div>
    );
  }

  // If no authUser (should be rare here because of redirect), render nothing
  if (!authUser) return null;

  return (
    <UserLayout user={authUser} logout={logout} profile={profile}>
      <div className="xl:container mx-auto space-y-4 ">
        <UserGallery userId={authUser._id} token={token} />

        <Analytics userId={authUser._id} token={token} />

        <SocialLinksSection
          slug={authUser.slug}
          token={token}
          initialLinks={profile?.socialMedia}
        />

        <ContactListSection
          title="Email Addresses"
          type="Email"
          initialItems={profile?.emails}
          onSave={async (items) => {
            await axios.patch(
              `${apiURL}/profilebyslug/${authUser.slug}`,
              { emails: items },
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );
          }}
        />

        <ContactListSection
          title="Phone Numbers"
          type="Phone"
          initialItems={profile?.phones}
          onSave={async (items) => {
            await axios.patch(
              `${apiURL}/profilebyslug/${authUser.slug}`,
              { phones: items },
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );
          }}
        />

        <ContactListSection
          title="Whatsapp"
          type="Whatsapp"
          initialItems={profile?.whatsapp}
          onSave={async (items) => {
            await axios.patch(
              `${apiURL}/profilebyslug/${authUser.slug}`,
              { whatsapp: items },
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );
          }}
        />
      </div>
    </UserLayout>
  );
};

export default UserHomePage;

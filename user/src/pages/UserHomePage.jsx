import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUserStore from "../store/AuthUserStore.jsx";
import useUserProfileStore from "../store/useUserProfileStore.jsx";
import UserMenu from "../component/UserMenu.jsx";
import LoadingLottie from "../component/LoadingLottie.jsx";
import UserGallery from "../component/UserGallery.jsx";

const UserHomePage = () => {
  const {
    initialize,
    user: authUser,
    loading: authLoading,
    error: authError,
    logout,
    token
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
    <div className="xl:container mx-auto">
      <UserMenu user={authUser} logout={logout} profile={profile} />
      <UserGallery userId={authUser._id} token={token} />
    </div>
  );
};

export default UserHomePage;

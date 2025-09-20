import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUserStore from "../store/AuthUserStore.jsx";
import UserLayout from "../component/protected/UserLayout.jsx";
import Analytics from "../component/protected/Analytics.jsx";
import AppointmentRequestsSection from "../component/protected/AppointmentRequestsSection.jsx";
import ConnectRequestsSection from "../component/protected/ConnectRequestsSection.jsx";

const UserHomePage = () => {
  const { initialize, user: authUser, token } = useAuthUserStore();


  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  // Run initialize once on mount to load user from token
  useEffect(() => {
    initialize();
  }, [initialize]);

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

  // If no authUser (should be rare here because of redirect), render nothing
  if (!authUser) return null;
  return (
    <UserLayout>
      <div className="xl:container mx-auto space-y-4 ">
        <Analytics userId={authUser._id} token={token} />
        <ConnectRequestsSection  userId={authUser._id} />
        {authUser?.role === "corporate" && (
          <AppointmentRequestsSection userId={authUser._id} />
        )}
      </div>
    </UserLayout>
  );
};

export default UserHomePage;

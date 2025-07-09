import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useUserProfileStore from "../store/useUserProfileStore.jsx";
import ProfileCoverPhoto from "../component/ProfileCoverPhoto.jsx";

const UserPublicProfile = () => {
  const { slug } = useParams();
  const { user, loading, error, fetchUserBySlug, profile } = useUserProfileStore();

  useEffect(() => {
    if (slug) {
      fetchUserBySlug(slug);
    }
  }, [slug]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!user) return <div className="text-center">User not found</div>;

  return (
    <div className="bg-[#0E191E]">
      <ProfileCoverPhoto profile={profile} user={user} />
    </div>
  );
};

export default UserPublicProfile;

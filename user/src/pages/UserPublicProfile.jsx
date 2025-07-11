import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useUserProfileStore from "../store/useUserProfileStore.jsx";
import ProfileCoverPhoto from "../component/ProfileCoverPhoto.jsx";
import NameTitle from "../component/NameTitle.jsx";
import Bio from "../component/Bio.jsx";
import Skills from "../component/Skills.jsx";
import ProductService from "../component/ProductService.jsx";
import Emails from "../component/Emails.jsx";
import GetInTouch from "../component/GetInTouch.jsx";
import PhoneNumber from "../component/PhoneNumber.jsx";
import WhatsAppNumbers from "../component/WhatsAppNumbers.jsx";
import Address from "../component/Address.jsx";
import SisterConcerns from "../component/SisterConcerns.jsx";
import BusinessHoursCard from "../component/BusinessHoursCard.jsx";
import QRCodeSection from "../component/QRCodeSection.jsx";

const UserPublicProfile = () => {
  const { slug } = useParams();
  const { user, loading, error, fetchUserBySlug, profile } =
    useUserProfileStore();

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
      <div className={"max-w-6xl mx-auto"}>
        <ProfileCoverPhoto profile={profile} user={user} />
        <NameTitle profile={profile} user={user} />
        <div className={"p-2"}>
          <Bio profile={profile} />
        </div>
        <GetInTouch />

        <div className="grid md:grid-cols-2 gap-2 mt-2 p-2 ">
          <Skills profile={profile} user={user} />
          <ProductService profile={profile} />
          <Emails profile={profile} user={user} />
          <PhoneNumber profile={profile} user={user}/>
          <WhatsAppNumbers profile={profile} user={user} />
          <Address profile={profile} user={user} />
          <SisterConcerns profile={profile} user={user} />
          <BusinessHoursCard profile={profile} user={user} />
          <QRCodeSection user={user} />
        </div>

      </div>
    </div>
  );
};

export default UserPublicProfile;

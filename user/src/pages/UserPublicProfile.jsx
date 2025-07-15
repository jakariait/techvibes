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
import ColorizedQR from "../component/ColorizedQR.jsx";
import TechVibesCard from "../component/TechVibesCard.jsx";
import axios from "axios";
import Designations from "../component/Designations.jsx";
import SocialMediaLinks from "../component/SocialMediaLinks.jsx";
import Gallery from "../component/Gallery.jsx";
const apiUrl = import.meta.env.VITE_API_URL;

const UserPublicProfile = () => {
  const { slug } = useParams();
  const { user, loading, error, fetchUserBySlug, profile } =
    useUserProfileStore();

  useEffect(() => {
    if (slug) {
      fetchUserBySlug(slug);
    }
  }, [slug, fetchUserBySlug]);

  const userId = user?._id;

  useEffect(() => {
    const trackView = async () => {
      try {
        await axios.get(`${apiUrl}/profile/${userId}/view`);
      } catch (err) {
        console.error("Error tracking profile view", err);
      }
    };
    if (userId) {
      trackView();
    }
  }, [userId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!user) return <div className="text-center">User not found</div>;

  return (
    <div className="bg-[#0E191E]">
      <div className={"max-w-6xl mx-auto"}>
        <ProfileCoverPhoto profile={profile} user={user} />
        <NameTitle profile={profile} user={user} />
        <SocialMediaLinks profile={profile} />

        <div className={"p-2"}>
          <Bio profile={profile} />
        </div>
        <GetInTouch />


        <div className="grid md:grid-cols-2 gap-2 mt-2 p-2 ">
          <Designations profile={profile} />
          <Skills profile={profile} user={user} />
          <ProductService profile={profile} />
          <Emails profile={profile} user={user} />
          <PhoneNumber profile={profile} user={user} />
          <WhatsAppNumbers profile={profile} user={user} />
          <Address profile={profile} user={user} />
          <SisterConcerns profile={profile} user={user} />
          <BusinessHoursCard profile={profile} user={user} />
          <QRCodeSection user={user} profile={profile} />
          <TechVibesCard />

        </div>
        <div className={"p-2"}>
          <Gallery profile={profile} user={user} />

        </div>

        <ColorizedQR
          base64Data={user?.qrCode} // your original QR base64
          dotColor="" // Blue dots
          backgroundColor="#ff5733" // Light background
        />
      </div>
    </div>
  );
};

export default UserPublicProfile;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useUserProfileStore from "../store/useUserProfileStore.jsx";
import ProfileCoverPhoto from "../component/public/ProfileCoverPhoto.jsx";
import NameTitle from "../component/public/NameTitle.jsx";
import Bio from "../component/public/Bio.jsx";
import Skills from "../component/public/Skills.jsx";
import ProductService from "../component/public/ProductService.jsx";
import Emails from "../component/public/Emails.jsx";
import GetInTouch from "../component/public/GetInTouch.jsx";
import PhoneNumber from "../component/public/PhoneNumber.jsx";
import WhatsAppNumbers from "../component/public/WhatsAppNumbers.jsx";
import Address from "../component/public/Address.jsx";
import SisterConcerns from "../component/public/SisterConcerns.jsx";
import BusinessHoursCard from "../component/public/BusinessHoursCard.jsx";
import QRCodeSection from "../component/public/QRCodeSection.jsx";
import ColorizedQR from "../component/public/ColorizedQR.jsx";
import TechVibesCard from "../component/public/TechVibesCard.jsx";
import axios from "axios";
import Designations from "../component/public/Designations.jsx";
import SocialMediaLinks from "../component/public/SocialMediaLinks.jsx";
import Gallery from "../component/public/Gallery.jsx";
import PortfolioAndCV from "../component/public/PortfolioAndCV.jsx";
import YouTubeEmbed from "../component/public/YouTubeEmbed.jsx";
import LinkedPhotoGallery from "../component/public/LinkedPhotoGallery.jsx";
import useCompanyStore from "../store/useCompanyStore.jsx";
import LoadingLottie from "../component/public/LoadingLottie.jsx";
import UserNotFound from "../component/public/UserNotFound.jsx";
import RequirePermission from "../component/public/RequirePermission.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

const UserPublicProfile = () => {
  const { slug } = useParams();
  const { user, loading, error, fetchUserBySlug, profile } =
    useUserProfileStore();

  const { company, fetchCompanyById } = useCompanyStore();

  useEffect(() => {
    if (!slug) return;

    (async () => {
      try {
        await fetchUserBySlug(slug);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    })();
  }, [slug, fetchUserBySlug]);

  const userId = user?._id;

  const companyId = user?.company;

  useEffect(() => {
    if (!companyId) return;

    const fetchData = async () => {
      await fetchCompanyById(companyId);
    };

    fetchData();
  }, [companyId, fetchCompanyById]);

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

  if (loading) return <LoadingLottie />;
  // if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!user) return <UserNotFound />;

  return (
    <>
      <div className="bg-[#0E191E]">
        <div className={"max-w-6xl mx-auto"}>
          <ProfileCoverPhoto profile={profile} user={user} company={company} />
          <NameTitle profile={profile} user={user} company={company} />
          <SocialMediaLinks profile={profile} user={user} company={company} />

          <div className={"p-2"}>
            <Bio profile={profile} />
          </div>
          <GetInTouch />

          <div className="grid md:grid-cols-2 gap-2 mt-2 p-2 ">
            <Designations profile={profile} />
            <Skills profile={profile} user={user} />
            <ProductService profile={profile} />
            <Emails profile={profile} user={user} />
            <PhoneNumber profile={profile} user={user} company={company} />
            <WhatsAppNumbers profile={profile} user={user} />
            <Address profile={profile} user={user} company={company} />
            <SisterConcerns profile={profile} user={user} />
            <BusinessHoursCard profile={profile} user={user} />
            <QRCodeSection user={user} profile={profile} />
            <PortfolioAndCV profile={profile} />
            <YouTubeEmbed url={profile?.youtubeUrl} />
            <LinkedPhotoGallery productImages={profile?.productImages || []} />
          </div>

          <RequirePermission
            permission="gallery"
            userPermissions={user.permission}
          >
            <div className={"p-2"}>
              <Gallery userId={user._id} />
            </div>
          </RequirePermission>

          <ColorizedQR
            base64Data={user?.qrCode} // your original QR base64
            dotColor="" // Blue dots
            backgroundColor="#ff5733" // Light background
          />

          <div className={"p-2"}>
            <TechVibesCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPublicProfile;

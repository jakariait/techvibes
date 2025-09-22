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
import TechVibesCard from "../component/public/TechVibesCard.jsx";
import axios from "axios";
import Designations from "../component/public/Designations.jsx";
import SocialMediaLinks from "../component/public/SocialMediaLinks.jsx";
import Gallery from "../component/public/Gallery.jsx";
import PortfolioAndCV from "../component/public/PortfolioAndCV.jsx";
import YouTubeEmbed from "../component/public/YouTubeEmbed.jsx";
import useCompanyStore from "../store/useCompanyStore.jsx";
import LoadingLottie from "../component/public/LoadingLottie.jsx";
import UserNotFound from "../component/public/UserNotFound.jsx";
import RequirePermission from "../component/public/RequirePermission.jsx";
import SaveContactConnect from "../component/public/SaveContactConnect.jsx";
import UserProductGalleryViewer from "../component/public/UserProductGalleryViewer.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import WithoutCoverPhoto from "../component/public/WithoutCoverPhoto.jsx";
import HomePageLoading from "../component/public/HomePageLoading.jsx";
import OrderNFCCard from "../component/public/OrderNFCCard.jsx";

const sectionComponentMap = {
  designations: (props) => <Designations {...props} />,
  skills: (props) => <Skills {...props} />,
  productAndServices: (props) => <ProductService {...props} />,
  emails: (props) => <Emails {...props} />,
  phones: (props) => <PhoneNumber {...props} />,
  whatsapp: (props) => <WhatsAppNumbers {...props} />,
  locations: (props) => <Address {...props} />,
  sisterConcerns: (props) => <SisterConcerns {...props} />,
  businessHours: (props) => <BusinessHoursCard {...props} />,
  portfolio: (props) => <PortfolioAndCV {...props} />,
  youtube: (props) => <YouTubeEmbed url={props.profile?.youtubeUrl} />,
};

// Function to check if a section has actual content
const hasContent = (key, profile, user, company) => {
  if (!profile) return false;

  switch (key) {
    case "designations":
      return profile?.designationInfo && profile.designationInfo.length > 0;

    case "skills":
      return profile?.skills && profile.skills.length > 0;
    case "productAndServices":
      return (
        profile?.productAndServices && profile.productAndServices.length > 0
      );
    case "emails":
      return profile?.emails && profile.emails.length > 0;
    case "phones":
      return profile?.phones && profile.phones.length > 0;
    case "whatsapp":
      return profile?.whatsapp && profile.whatsapp.length > 0;
    case "locations":
      return profile?.locations && profile.locations.length > 0;
    case "sisterConcerns":
      return profile?.sisterConcerns && profile.sisterConcerns.length > 0;
    case "businessHours":
      return (
        profile?.businessHours && Object.keys(profile.businessHours).length > 0
      );
    case "portfolio":
      return profile?.portfolio || profile?.cv;
    case "youtube":
      return profile?.youtubeUrl && profile.youtubeUrl.trim() !== "";

    default:
      return false;
  }
};

const apiUrl = import.meta.env.VITE_API_URL;

const UserPublicProfile = () => {
  const { theme } = useTheme();

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

  if (loading || (user === null && !error)) {
    return <HomePageLoading />;
  }

  if (user === null) {
    return <UserNotFound />;
  }

  // Filter sections that have actual content
  const validSections = (profile?.sectionOrder || []).filter((key) => {
    const Component = sectionComponentMap[key];
    return Component && hasContent(key, profile, user, company);
  });


  return (
    <>
      <div className={`${theme.homePageBgColor}`}>
        <div className={`max-w-6xl mx-auto`}>
          {profile?.profilePhotoShape === "without-cover-photo" ? (
            // Without Cover Photo Layout
            <WithoutCoverPhoto
              profile={profile}
              user={user}
              company={company}
            />
          ) : (
            // With Cover Photo Layout
            <>
              <ProfileCoverPhoto
                profile={profile}
                user={user}
                company={company}
              />
              <div className="pt-18 md:pt-27 px-2">
                <NameTitle profile={profile} user={user} company={company} />
              </div>
            </>
          )}

          <SaveContactConnect profile={profile} user={user} company={company} />

          <SocialMediaLinks profile={profile} user={user} company={company} />

          <div className={`p-2`}>
            <Bio profile={profile} />
          </div>

          <GetInTouch />

          {/*Re-Arranged Sections Will Print Here*/}
          {validSections.length > 0 && (
            <div className={`grid md:grid-cols-2 gap-2 mt-2 p-2`}>
              {validSections.map((key) => {
                const Component = sectionComponentMap[key];
                return (
                  <div key={key} style={{ display: "contents" }}>
                    <Component
                      profile={profile}
                      user={user}
                      company={company}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <RequirePermission
            permission="gallery"
            userPermissions={user.permission}
          >
            <div className={`px-2`}>
              <Gallery userId={user._id} />
            </div>
          </RequirePermission>
          <RequirePermission
            permission="productgallery"
            userPermissions={user.permission}
          >
            <div className={`p-2`}>
              <UserProductGalleryViewer userId={user._id} />
            </div>
          </RequirePermission>

          <div className={`px-2`}>
            <QRCodeSection profile={profile} user={user} />
          </div>

          <div className={`p-2 flex-col gap-2 flex`}>
            <OrderNFCCard />
            <TechVibesCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPublicProfile;

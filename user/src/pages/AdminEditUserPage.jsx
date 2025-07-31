import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../component/protected/UserLayout.jsx";
import GeneralProfileInfoSection from "../component/protected/GeneralProfileInfoSection.jsx";
import AccordionSection from "../component/protected/AccordionSection.jsx";
import PhotoUploadSection from "../component/protected/PhotoUploadSection.jsx";
import SocialLinksSection from "../component/protected/SocialLinksSection.jsx";
import CustomSocialLinksSection from "../component/protected/CustomSocialLinksSection.jsx";
import ContactListSection from "../component/protected/ContactListSection.jsx";
import DesignationSection from "../component/protected/DesignationSection.jsx";
import ProductServiceSister from "../component/protected/ProductServiceSister.jsx";
import { Building2, PackageSearch } from "lucide-react";
import UpdateUserInfo from "../component/protected/UpdateUserInfo.jsx";
import UpdateUserForm from "../component/protected/UpdateUserForm.jsx";
import axios from "axios";
import Analytics from "../component/protected/Analytics.jsx";
import useAuthUserStore from "../store/AuthUserStore.jsx";
import ConnectRequestsSection from "../component/protected/ConnectRequestsSection.jsx";
import AppointmentRequestsSection from "../component/protected/AppointmentRequestsSection.jsx";
import UserGallery from "../component/protected/UserGallery.jsx";
import UserProductGallerySection from "../component/protected/UserProductGallerySection.jsx";
import ColorizedQR from "../component/protected/ColorizedQR.jsx";

const apiURL = import.meta.env.VITE_API_URL;

const AdminEditUserPage = () => {
  const { slug } = useParams(); // 👈 Get slug from route params
  const [userData, setUserData] = useState(null);
  const { token } = useAuthUserStore();

  useEffect(() => {
    const fetchUserBySlug = async () => {
      try {
        const response = await axios.get(`${apiURL}/userbyslug/${slug}`);
        const data = response.data.data ?? response.data;
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user by slug:", err);
      } finally {
      }
    };
    fetchUserBySlug();
  }, [slug]);

  const userId = userData?.user?._id;

  return (
    <UserLayout>
      <div className={"space-y-2"}>
        <UpdateUserForm slug={slug} />
        <ColorizedQR base64Data={userData?.user?.qrCode} />
      </div>

      <div className={"flex  flex-col mt-2 gap-2"}>
        <AccordionSection title="Analytics">
          <Analytics userId={userId} token={token} />
        </AccordionSection>
        <AccordionSection title="Connect Request">
          <ConnectRequestsSection userId={userId} />
        </AccordionSection>
        <AccordionSection title="Appointments">
          <AppointmentRequestsSection userId={userId} />
        </AccordionSection>
        <AccordionSection title="General Profile Info">
          <GeneralProfileInfoSection slug={slug} />
        </AccordionSection>
        <AccordionSection title="Profile & Cover Photo">
          <PhotoUploadSection type="profilePhoto" slug={slug} />
          <PhotoUploadSection type="coverPhoto" slug={slug} />
        </AccordionSection>
        <AccordionSection title="Social Media">
          <div className="flex  flex-col gap-4">
            <SocialLinksSection slug={slug} />
            <CustomSocialLinksSection slug={slug} />
          </div>
        </AccordionSection>
        <AccordionSection title="Email">
          <ContactListSection
            title="Email Addresses"
            type="email"
            fieldKey="emails"
            slug={slug}
          />
        </AccordionSection>
        <AccordionSection title="Phone">
          <ContactListSection
            title="Phone Numbers"
            type="phone"
            fieldKey="phones"
            slug={slug}
          />
        </AccordionSection>
        <AccordionSection title="Whatsapp">
          <ContactListSection
            title="Whatsapp"
            type="whatsapp"
            fieldKey="whatsapp"
            slug={slug}
          />
        </AccordionSection>
        <AccordionSection title="Designations">
          <DesignationSection slug={slug} />
        </AccordionSection>
        <AccordionSection title="Products & Services">
          <ProductServiceSister
            title="Products & Services"
            type="productAndServices"
            icon={<PackageSearch className="w-5 h-5 text-green-400" />}
            slug={slug}
          />
          <UserProductGallerySection userId={userId} />
        </AccordionSection>
        <AccordionSection title="Sister Concerns">
          <ProductServiceSister
            title="Sister Concerns"
            type="sisterConcerns"
            icon={<Building2 className="w-5 h-5 text-green-400" />}
            slug={slug}
          />
        </AccordionSection>
        <AccordionSection title="Location">
          <ContactListSection
            title="Location"
            type="locations"
            fieldKey="locations"
            slug={slug}
          />
        </AccordionSection>
        <AccordionSection title="Gallery">
          <UserGallery userId={userId} token={token} />
        </AccordionSection>
        <AccordionSection title="Update User Info">
          <UpdateUserInfo slug={slug} />
        </AccordionSection>
      </div>
    </UserLayout>
  );
};

export default AdminEditUserPage;

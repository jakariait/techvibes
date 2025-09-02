import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ForgetPasswordPage from "./pages/ForgetPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import UserProtectedRoute from "./component/protected/UserProtectedRoute.jsx";
import UserHomePage from "./pages/UserHomePage.jsx";
import UserPublicProfile from "./pages/UserPublicProfile.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import SocialMediaPage from "./pages/SocialMediaPage.jsx";
import EmailPages from "./pages/EmailPages.jsx";
import PhonePages from "./pages/PhonePages.jsx";
import WhatsappPage from "./pages/WhatsappPage.jsx";
import LocationPage from "./pages/LocationPage.jsx";
import DesignationsPage from "./pages/DesignationsPage.jsx";
import ProductServicePage from "./pages/ProductServicePage.jsx";
import SisterConcernsPage from "./pages/SisterConcernsPage.jsx";
import GeneralInfoPage from "./pages/GeneralInfoPage.jsx";
import ProfileCoverPhotoPage from "./pages/ProfileCoverPhotoPage.jsx";
import ChangePasswordPage from "./pages/ChangePasswordPage.jsx";
import NameLoginEmailPage from "./pages/NameLoginEmailPage.jsx";
import ScrollToTop from "./component/public/ScrollToTop.jsx";
import CompanyAdminPage from "./pages/CompanyAdminPage.jsx";
import AdminEditUserPage from "./pages/AdminEditUserPage.jsx";
import AdminEditCompanyPage from "./pages/AdminEditCompanyPage.jsx";
import TechVibesUserPages from "./pages/TechVibesUserPages.jsx";
import TechVibesCompanyPage from "./pages/TechVibesCompanyPage.jsx";
import ReorderProfilePage from "./pages/ReorderProfilePage.jsx";
import LogInPage from "./pages/LogInPage.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* General User Routes */}
        <Route path="/" element={<LogInPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/*User Public Route*/}
        <Route path="/profile/:slug" element={<UserPublicProfile />} />

        {/* Protected User Routes */}
        <Route element={<UserProtectedRoute />}>
          <Route path="/user/home" element={<UserHomePage />} />
          <Route path="/user/gallery" element={<GalleryPage />} />
          <Route path="/user/social-media" element={<SocialMediaPage />} />
          <Route path="/user/email" element={<EmailPages />} />
          <Route path="/user/phone" element={<PhonePages />} />
          <Route path="/user/whatsapp" element={<WhatsappPage />} />
          <Route path="/user/location" element={<LocationPage />} />
          <Route path="/user/career-journey" element={<DesignationsPage />} />
          <Route
            path="/user/products-services"
            element={<ProductServicePage />}
          />
          <Route path="/user/general-info" element={<GeneralInfoPage />} />

          <Route
            path="/user/sister-concerns"
            element={<SisterConcernsPage />}
          />

          <Route
            path="/user/profile-cover-photo"
            element={<ProfileCoverPhotoPage />}
          />

          <Route
            path="/user/change-password"
            element={<ChangePasswordPage />}
          />
          <Route
            path="/user/name-login-email"
            element={<NameLoginEmailPage />}
          />
          <Route path="/user/company-admin" element={<CompanyAdminPage />} />

          <Route
            path="/user/edit-user-admin/:slug"
            element={<AdminEditUserPage />}
          />

          <Route
            path="/user/edit-company/:id"
            element={<AdminEditCompanyPage />}
          />
          <Route path="/user/techvibes-user" element={<TechVibesUserPages />} />

          <Route
            path="/user/techvibes-company"
            element={<TechVibesCompanyPage />}
          />

          <Route
            path="/user/reorder-profile"
            element={<ReorderProfilePage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

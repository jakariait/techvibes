import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./component/public/LoginForm.jsx";
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
import ConnectPage from "./pages/ConnectPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* General User Routes */}
        <Route path="/" element={<LoginForm />} />
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
          <Route path="/user/designations" element={<DesignationsPage />} />
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
          <Route
            path="/user/connect"
            element={<ConnectPage />}
          />

        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

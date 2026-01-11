import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CorporatePage from "./pagesUser/CorporatePage.jsx";
import NotFoundPage from "./pagesUser/NotFoundPage.jsx";
import ReturnPolicyPage from "./pagesUser/ReturnPolicyPage.jsx";
import PrivacyPolicyPage from "./pagesUser/PrivacyPolicyPage.jsx";
import TermsConditionPage from "./pagesUser/TermsConditionPage.jsx";
import AboutUsPage from "./pagesUser/AboutUsPage.jsx";
import HowWorksPage from "./pagesUser/HowWorksPage.jsx";
import SuccessCreateProfilePage from "./pagesUser/SuccessCreateProfilePage.jsx";
import CreateProfilePage from "./pagesUser/CreateProfilePage.jsx";
import OrderCongratulationPage from "./pagesUser/OrderCongratulationPage.jsx";
import FinalDesignPage from "./pagesUser/FinalDesignPage.jsx";
import BlogPage from "./pagesUser/BlogPage.jsx";
import TestingCode from "./component/TestingCode.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FinalDesignPage />} />
        <Route path="/corporate" element={<CorporatePage />} />

        <Route path="/return-policy" element={<ReturnPolicyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-condition" element={<TermsConditionPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/how-it-works" element={<HowWorksPage />} />
        <Route
          path="/success-create-profile"
          element={<SuccessCreateProfilePage />}
        />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/thank-you" element={<OrderCongratulationPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/test" element={<div className="h-screen flex items-center justify-center p-8"><div className="w-full max-w-[781px]"><TestingCode /></div></div>} />

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

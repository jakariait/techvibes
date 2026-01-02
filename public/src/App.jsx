import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CorporatePage from "./pagesUser/CorporatePage.jsx";
import NotFoundPage from "./pagesUser/NotFoundPage.jsx";
import ReturnPolicyPage from "./pagesUser/ReturnPolicyPage.jsx";
import PrivacyPolicyPage from "./pagesUser/PrivacyPolicyPage.jsx";
import TermsConditionPage from "./pagesUser/TermsConditionPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CorporatePage />} />
        <Route path="/return-policy" element={<ReturnPolicyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-condition" element={<TermsConditionPage />} />

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

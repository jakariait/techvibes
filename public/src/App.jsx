import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CorporatePage from "./pagesUser/CorporatePage.jsx";
import NotFoundPage from "./pagesUser/NotFoundPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CorporatePage />} />

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

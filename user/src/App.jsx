import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./component/LoginForm.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ForgetPasswordPage from "./pages/ForgetPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import UserProtectedRoute from "./component/UserProtectedRoute.jsx";
import UserHomePage from "./pages/UserHomePage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* General User Routes */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected User Routes */}
        <Route element={<UserProtectedRoute />}>
          <Route path="/user/home" element={<UserHomePage />} />

        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;

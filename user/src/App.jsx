import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./component/public/LoginForm.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ForgetPasswordPage from "./pages/ForgetPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import UserProtectedRoute from "./component/protected/UserProtectedRoute.jsx";
import UserHomePage from "./pages/UserHomePage.jsx";
import UserPublicProfile from "./pages/UserPublicProfile.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* General User Routes */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/*User Public Route*/}
        <Route path="/profile/:slug" element={<UserPublicProfile/>} />

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

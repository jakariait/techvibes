import { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useAuthUserStore from "../../store/AuthUserStore.jsx";

import logo from "../../assets/TechVibes.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading, error, user } = useAuthUserStore();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attemptedLogin, setAttemptedLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptedLogin(true);
    await login(emailOrPhone, password);
  };

  useEffect(() => {
    if (attemptedLogin && user) {
      navigate("/user/home");
    }
  }, [attemptedLogin, user, navigate]);

  return (
    <div className="flex items-center justify-center  px-4 mt-20 mb-20 md:m-50">
      <div className="bg-transparent  rounded-2xl shadow-2xl  w-full max-w-md text-center relative">
        <div className="bg-black/60 rounded-t-2xl p-6">
          <img src={logo} alt="TechVibes" />
        </div>
        <div className={"p-4"}>
          <h2 className="text-3xl font-semibold m-4">Sign in</h2>
          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 mb-4 rounded">
              {error}
            </div>
          )}
          {/*Important Notice*/}
          {/*<div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded mb-6 text-sm text-left">*/}
          {/*  <div className="flex items-start gap-2">*/}
          {/*    <span className="text-lg">🔐</span>*/}
          {/*    <div>*/}
          {/*      <strong className="block mb-1">*/}
          {/*        Important Notice for Login*/}
          {/*      </strong>*/}
          {/*      <p className="mb-1">*/}
          {/*        We’ve upgraded your Digital Profile with new features and*/}
          {/*        enhanced sections to serve you better.*/}
          {/*      </p>*/}
          {/*      <p className="mb-1">*/}
          {/*        To access your updated profile, please reset your password*/}
          {/*        during login for security and compatibility reasons.*/}
          {/*      </p>*/}
          {/*      <p className="mb-1">*/}
          {/*        👉 Click on <strong>“Forgot Password?”</strong> to reset and*/}
          {/*        enjoy the new experience.*/}
          {/*      </p>*/}
          {/*      <p className="mt-2">*/}
          {/*        Thank you for being with us.*/}
          {/*        <br />— Team TechVibes*/}
          {/*      </p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Email / Phone */}
            <div className="flex items-center bg-white rounded-md shadow-sm px-4 py-4">
              <FaUser className="primaryTextColor mr-5 text-2xl" />
              <input
                type="text"
                placeholder="Email"
                className="w-full outline-none text-sm bg-transparent"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
              />
            </div>

            {/* Password with show/hide toggle */}
            <div className="flex items-center bg-white rounded-md shadow-sm px-4 py-4 relative">
              <FaLock className="primaryTextColor mr-5 text-2xl" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full outline-none text-sm bg-transparent pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-4 cursor-pointer text-xl text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <Link
                to="/forgot-password"
                className="primaryTextColor font-medium hover:underline"
              >
                Forgotten password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-md mt-2 primaryBgColor accentTextColor cursor-pointer"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

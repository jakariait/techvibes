import React from "react";
import LoginForm from "../component/public/LoginForm.jsx";
import loginBg from "../assets/loginbg.png";

const LogInPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // full page height
      }}
      className="flex items-center justify-center"
    >
      <LoginForm />
    </div>
  );
};

export default LogInPage;

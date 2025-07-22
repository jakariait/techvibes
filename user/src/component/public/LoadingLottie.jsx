import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Loading animation blue.json";

const LoadingLottie = () => {
  return (
    <div className="flex justify-center items-center  bg-[#212F35] ">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        style={{ height: 300, width: 300 }}
      />
    </div>
  );
};

export default LoadingLottie;

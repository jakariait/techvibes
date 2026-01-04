import React from "react";

import rightPhoneImg from "../../assets/rightphone.png";
import leftPhoneImg from "../../assets/leftphone.png";
import centerPhoneImg from "../../assets/centerphone.png";

const DigitalProfileDemo = () => {
  return (
    <div>
      <h1 className="w-full text-center text-[48px] font-normal bg-[linear-gradient(90deg,#4EFAD2_0%,#6614B2_100%)] bg-clip-text text-transparent">
        Digital Profile Demo
      </h1>

      <div
        className={
          " flex flex-col md:flex-row items-center justify-center gap-[20px] p-[20px]"
        }
      >
        <img
          src={rightPhoneImg}
          alt="Digital Profile Demo 3"
          style={{ height: "600px", borderRadius: "24px" }}
        />
        <img
          src={centerPhoneImg}
          alt="Digital Profile Demo 2"
          style={{ height: "650px", borderRadius: "40px" }}
        />
        <img
          src={leftPhoneImg}
          alt="Digital Profile Demo 1"
          style={{ height: "600px", borderRadius: "24px" }}
        />
      </div>
    </div>
  );
};

export default DigitalProfileDemo;

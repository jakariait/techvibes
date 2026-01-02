import React from "react";
import imgScreenshot5631 from "../../assets/imgScreenshot5631.png";

const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 sm:p-12 md:p-16 lg:p-20  text-white gap-8 md:gap-12 lg:gap-16">
      <div className="md:w-1/2 flex flex-col items-start text-left gap-6 md:gap-8">
        <h2
          className="text-[48px]  bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(95.63deg, #4E52FB 23.65%, #20ACF7 79.38%)",
          }}
        >
          About Us
        </h2>
        <p className="text-base text-[20px] text-[#f0f0f0]">
          TapNext is the smartest business card on the block. Turn meetings into
          leads and share your contact details without contact.
          <br />
          <br />
          Our cutting-edge technology and integrations reshape how the business
          world connects.
        </p>
      </div>
      <div className="md:w-1/2 w-full h-64 md:h-auto relative">
        <img
          className="w-full h-full object-cover rounded-lg"
          alt="About us"
          src={imgScreenshot5631}
        />
      </div>
    </div>
  );
};

export default AboutUs;

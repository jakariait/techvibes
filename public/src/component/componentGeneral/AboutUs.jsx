import React from "react";
import { MapPin } from "lucide-react";
import imgScreenshot5631 from "../../assets/imgScreenshot5631.png";

const AboutUs = () => {
  // Pin positions (percentage based for responsiveness)
  const pins = [
    { id: 1, left: "22%", top: "25%" },
    { id: 2, left: "32%", top: "35%" },
    { id: 3, left: "42%", top: "45%" },
    { id: 4, left: "44%", top: "35%" },
    { id: 4, left: "34%", top: "35%" },
    { id: 5, left: "45%", top: "60%" },
    { id: 6, left: "55%", top: "60%" },
    { id: 7, left: "65%", top: "35%" },
    { id: 8, left: "60%", top: "65%" },
    { id: 9, left: "35%", top: "65%" },
    { id: 10, left: "80%", top: "75%" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 sm:p-12 md:p-16 lg:p-20 text-white gap-8 md:gap-12 lg:gap-16">
      <div className="md:w-1/2 flex flex-col items-start text-left gap-6 md:gap-8">
        <h2
          className="text-[48px] bg-clip-text text-transparent"
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
      <div className="md:w-1/2 w-full h-64 md:h-auto relative group">
        <img
          className="w-full h-full object-cover rounded-lg"
          alt="About us"
          src={imgScreenshot5631}
        />

        {/* Pin overlay - visible on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {pins.map((pin) => (
            <div
              key={pin.id}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer"
              style={{ left: pin.left, top: pin.top }}
            >
              <MapPin
                className="text-red-500 drop-shadow-lg "
                fill="currentColor"
                size={32}
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

import React from "react";

import checkIcon from "../../assets/stash_check-solid.svg";
import unCheckIcon from "../../assets/stash_times-solid.svg";
import techvibesCard from "../../assets/simple-icons_nfc.svg";
import otherCard from "../../assets/streamline_business-card-solid.svg";

// --- Icon Components ---

const CheckCircleIcon = () => (
  <img src={checkIcon} alt="check icon" className="w-10 h-10 text-[#11F254]" />
);

const XCircleIcon = () => (
  <img
    src={unCheckIcon}
    alt="uncheck icon"
    className="w-10 h-10 text-[#FF0000]"
  />
);

const FeatureItem = ({ icon, text }) => (
  <div className="flex flex-col items-center gap-1">
    {icon}
    <span className="text-sm text-white">{text}</span>
  </div>
);

const WhyChooseUs = () => {
  const platformFeatures = [
    { text: "One Tap" },
    { text: "Editable" },
    { text: "Reusable" },
    { text: "ECO-Friendly" },
    { text: "Technology" },
  ];

  return (
    <div className="w-full flex justify-center py-8 px-4">
      <div className="flex flex-col items-center gap-8 w-full max-w-7xl">
        <h2 className="text-center text-[#4E52FB] text-[48px] ">
          Why Choose Us
        </h2>

        {/* Main content container */}
        <div className="w-full flex flex-col items-center gap-6">
          {/* Platform Features */}
          <div className="w-full flex flex-wrap justify-center items-center gap-4 px-4">
            {platformFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-5 hover:bg-gray-700 transition-colors"
              >
                <span className="text-white text-sm font-medium">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Cards Container */}
          <div className="w-full flex flex-col gap-5">
            {/* TechVibes NFC Card */}
            <div
              className="self-stretch h-auto p-6 md:p-8
                            bg-gradient-to-b from-[rgba(2.49,85.05,107.88,0.20)] to-[rgba(167.33,49.79,235.38,0.20)] bg-[#171025]
                            rounded-2xl border-l-4 border-t-4 border-r border-b border-[#93C2EF]
                            flex flex-col justify-between items-center gap-6"
            >
              <div className="w-full flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <img src={techvibesCard} alt="Techbives Card" />
                <div className="flex flex-col items-center sm:items-start gap-2 w-full">
                  <div className="text-white text-2xl font-semibold">
                    TechVibes NFC
                  </div>
                  <div className="text-white text-sm font-normal max-w-sm">
                    A smart card that instantly shares digital information with
                    a single tap on a smartphone.
                  </div>
                </div>
              </div>
              <div className="w-full pt-6 border-t border-gray-700/50">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                  <FeatureItem icon={<CheckCircleIcon />} text="Editable" />
                  <FeatureItem icon={<CheckCircleIcon />} text="Reusable" />
                  <FeatureItem icon={<CheckCircleIcon />} text="ECO-Friendly" />
                  <FeatureItem
                    icon={<CheckCircleIcon />}
                    text="One Tap Share"
                  />
                  <FeatureItem icon={<CheckCircleIcon />} text="Analytics" />
                </div>
              </div>
            </div>

            {/* Business Card */}
            <div
              className="self-stretch h-auto p-6 md:p-8
                            bg-[rgba(157.47,143.15,186.10,0.09)] shadow-lg rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#91BFED]
                            flex flex-col justify-between items-center gap-6"
            >
              <div className="w-full flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <img src={otherCard} alt="OtherCard" />
                <div className="flex flex-col items-center sm:items-start gap-2 w-full">
                  <div className="text-white text-2xl font-semibold">
                    Business Card
                  </div>
                  <div className="text-white text-sm font-normal max-w-sm">
                    A traditional printed card made of paper or plastic, often
                    discarded and not eco-friendly.
                  </div>
                </div>
              </div>
              <div className="w-full pt-6 border-t border-gray-700/50">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                  <FeatureItem icon={<XCircleIcon />} text="Static" />
                  <FeatureItem icon={<XCircleIcon />} text="Single Use" />
                  <FeatureItem icon={<XCircleIcon />} text="Wasteful" />
                  <FeatureItem icon={<XCircleIcon />} text="Manual Entry" />
                  <FeatureItem icon={<XCircleIcon />} text="No Analytics" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

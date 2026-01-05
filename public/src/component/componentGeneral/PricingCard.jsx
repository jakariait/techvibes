import React from "react";
import imgFrame3473919D6 from "../../assets/Frame3473919D6.png";
import imgIconoirCheck from "../../assets/iconoir_check.svg";
import blackMaterial from "../../assets/Black Material.png";
import metalCard from "../../assets/Metal Card.png";
import AddressGrid from "./AddressGrid.jsx";

const PricingCard = () => {
  const cardData = [
    {
      title: "White Material",
      price: "৳ 799 – 999",
      altText: "White Material Card",
      imageUrl: imgFrame3473919D6,
      features: [
        "Standard NFC Card",
        "One Tap Sharing",
        "Digital Profile Setup",
        "Unlimited Profile Visits",
        "Basic Design Template",
      ].map((feature) => ({ text: feature, showIcon: false })),
      featureTextColor: "text-[#f0f0f0]",
    },
    {
      title: "Black Material",
      price: "৳ 1200 – 1500",
      altText: "Black Material Card",
      imageUrl: blackMaterial,
      features: [
        "Premium Quality NFC Card",
        "Custom Branding (Logo + Color)",
        "Digital Profile Hub",
        "Lifetime Editing",
        "Social + Contact Links",
        "QR Code Included",
        "Priority Support",
      ].map((feature) => ({ text: feature, showIcon: true })),
      featureTextColor: "text-[#d1d2f1]",
    },
    {
      title: "Metal Card",
      price: "৳ 1800 – 2200",
      altText: "Metal Card",
      imageUrl: metalCard,
      features: [
        "Stainless Steel / Metal NFC Card",
        "Laser Engraved Design",
        "Full Branding",
        "All Premium Features",
        "Advanced Analytics",
        "Custom Landing Page",
      ].map((feature) => ({ text: feature, showIcon: false })),
      featureTextColor: "text-[#f0f0f0]",
    },
  ];

  return (
    <div>
      <span className="bg-[linear-gradient(90deg,#4E52FB_0%,#20ACF7_100%)] bg-clip-text text-transparent text-2xl md:text-[48px] flex justify-center items-center pb-10">
        💳 Pricing Cards (3-Tier Best Setup)
      </span>
      <div className="w-full px-4 py-24">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-20 lg:gap-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex flex-col bg-linear-to-b border-2 border-solid border-white from-[#2c3498] to-[#090b3d] rounded-xl w-106 max-w-full"
            >
              <div className="flex flex-col items-center px-6 pb-6 text-center">
                <img
                  className="w-3/4 object-cover -mt-20"
                  alt={card.altText}
                  src={card.imageUrl}
                />
                <p className={` text-[#f0f0f0] text-[36px] mt-4`}>
                  {card.title}
                </p>
                <p className={` text-[#f0f0f0] text-[36px] my-4`}>
                  {card.price}
                </p>
                <div
                  className={` ${card.featureTextColor} text-[16px] space-y-2 text-left`}
                >
                  {card.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      {feature.showIcon && (
                        <img
                          className="shrink-0 size-6"
                          alt="check"
                          src={imgIconoirCheck}
                        />
                      )}
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex justify-center pb-8">
                <div className="bg-linear-to-b border border-[#4fdceb] border-solid from-[#b7f8f8] to-[#5511f2] rounded-lg px-8 py-2">
                  <p className={` text-[#f0f0f0] text-[16px] text-center`}>
                    BUY NOW
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingCard;

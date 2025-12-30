import React from "react";
import PackageCard from "./PackageCard";

const packages = [
  {
    title: "For Startups",
    subtitle: "Your Design",
    features: ["Design Assistance", "1 Revision"],
    moq: "MOQ: 10 Cards",
    buttonText: "Explore",
    isFeatured: false,
    customFeatures: [],
  },
  {
    title: "For SMB/MSME",
    subtitle: "Your Design",
    features: ["Design Assistance", "2 Revision"],
    moq: "MOQ: 25 Cards",
    buttonText: "Explore",
    isFeatured: true,
    customFeatures: ["Custom UI (Chargeable)"],
  },
  {
    title: "For Enterprise",
    subtitle: "Your Design",
    features: ["Design Assistance", "5 Revision"],
    moq: "MOQ: 50 Cards",
    buttonText: "Explore",
    isFeatured: false,
    customFeatures: ["Custom UI (Chargeable)", "Custom Dashboard (Chargeable)"],
  },
];

const ComparePackage = () => {
  return (
    <div className="content-stretch flex flex-col gap-15 items-center relative size-full p-8 font-['Bruno_Ace']">
      <p
        className="bg-clip-text bg-linear-to-r from-[#4e52fb] to-[#20acf7] text-[48px] text-center"
        style={{ WebkitTextFillColor: "transparent" }}
      >
        Corporate Package
      </p>
      <div className="content-stretch flex flex-col md:flex-row gap-6 items-end justify-center relative w-full">
        {packages.map((pkg, index) => (
          <PackageCard
            key={index}
            title={pkg.title}
            subtitle={pkg.subtitle}
            features={pkg.features}
            moq={pkg.moq}
            buttonText={pkg.buttonText}
            isFeatured={pkg.isFeatured}
            customFeatures={pkg.customFeatures}
          />
        ))}
      </div>
    </div>
  );
};

export default ComparePackage;

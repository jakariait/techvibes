import React from "react";
import PropTypes from "prop-types";

const PackageCard = ({
  title,
  subtitle,
  features,
  moq,
  buttonText,
  isFeatured,
  customFeatures,
}) => {
  const cardClasses = `
    content-stretch flex flex-col items-center relative rounded-[50px]
    bg-[#0a0042] border-2 border-solid border-[#20acf7] font-['Bruno_Ace'] text-white
    w-full sm:w-[425px]
    ${isFeatured ? "h-[578px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" : "h-[531px]"}
  `;

  const innerBgClasses = `
    absolute bg-[#020067] left-0 w-full
    rounded-bl-[12px] rounded-br-[12px] rounded-tl-[130px] rounded-tr-[130px]
    h-[387px]
    ${isFeatured ? "top-[191px]" : "top-[144px]"}
  `;

  const featuresPartGap = isFeatured ? "gap-[67px]" : "gap-[40px]";

  const featureListGap = isFeatured ? "gap-[15px]" : "gap-[15px]";

  return (
    <div className={cardClasses}>
      <div className={innerBgClasses} />

      <div
        className={`relative z-10 flex flex-col items-center text-center p-5 h-full py-8`}
      >
        <div className="flex flex-col gap-1.75">
          <p className="text-[24px]">{title}</p>

          <p className="text-[24px]">{subtitle}</p>
        </div>

        <div className="flex-grow" />

        <div className={`flex flex-col items-center ${featuresPartGap}`}>
          <div className={`flex flex-col items-center ${featureListGap}`}>
            <div className="flex flex-col gap-3">
              {features.map((feature, index) => (
                <p key={index} className="text-[16px]">
                  {feature}
                </p>
              ))}
            </div>
            <p className="text-[16px]">{moq}</p>
            <div className="flex flex-col gap-1.5">
              {customFeatures.map((feature, index) => (
                <p key={index} className="text-[16px]">
                  {feature}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-linear-to-b from-[rgba(178,237,246,0.2)] to-[rgba(32,172,247,0.2)] border-b-2 border-[#20acf7] rounded-sm shadow-[2px_2px_21.1px_0px_#20acf7] p-2.5 w-56.25">
            <p className="text-[#ebecff] text-[16px]">{buttonText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

PackageCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  moq: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  isFeatured: PropTypes.bool,
  customFeatures: PropTypes.arrayOf(PropTypes.string),
};

PackageCard.defaultProps = {
  isFeatured: false,
  customFeatures: [],
};

export default PackageCard;

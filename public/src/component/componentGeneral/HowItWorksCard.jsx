import React from "react";

const HowItWorksCard = ({ number, title, description, children }) => {
  return (
    <div className="bg-[#1e3751] p-6 rounded-lg flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-[#0f149e] rounded-full size-10 flex items-center justify-center">
          <p className="text-2xl text-white">{number}</p>
        </div>
        <p className="text-sm text-white">{title}</p>
      </div>
      {children}
      <p className="text-xs text-white">{description}</p>
    </div>
  );
};

export default HowItWorksCard;

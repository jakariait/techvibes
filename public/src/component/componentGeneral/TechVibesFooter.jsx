import React from "react";

// Tighter layers with more subtle opacity for smoother depth effect
const layers = [
  { top: "0em", opacity: 1 },
  { top: "0.01em", opacity: 0.7 },
  { top: "0.02em", opacity: 0.5 },
  { top: "0.03em", opacity: 0.35 },
  { top: "0.04em", opacity: 0.25 },
  { top: "0.05em", opacity: 0.18 },
  { top: "0.06em", opacity: 0.12 },
  { top: "0.07em", opacity: 0.08 },
];

const TechVibesFooter = () => {
  return (
    <div className="relative w-full h-25 sm:h-45 md:h-60 lg:h-80 overflow-hidden">
      {/* Blur Gradient Background - using percentage-based positioning */}
      <div
        className="absolute w-full left-0 bg-linear-to-r from-[rgba(15,12,154,0.7)] to-[rgba(32,172,247,0.7)] blur-2xl sm:blur-[50px] md:blur-[60px] lg:blur-[62.7px]"
        style={{
          height: "30%",
          top: "40%",
        }}
      />

      {/* Layered TechVibes Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        {layers.map((layer, index) => (
          <h1
            key={index}
            className="absolute text-[100px] sm:text-[160px] md:text-[220px] lg:text-[300px] font-semibold leading-none bg-clip-text text-transparent bg-linear-to-r from-[#0f149e] to-[#20acf7] select-none whitespace-nowrap"
            style={{
              top: layer.top,
              opacity: layer.opacity,
              fontFamily: "'Source Serif Pro', serif",
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            TechVibes
          </h1>
        ))}
      </div>
    </div>
  );
};

export default TechVibesFooter;

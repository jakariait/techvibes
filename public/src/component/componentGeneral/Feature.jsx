import React from "react";
import FeatureCircle from "./FeatureCircle.jsx";

const Feature = () => {
  return (
    <div>
      <div
        className={"max-w-3xl mx-auto flex items-center justify-center py-5"}
      >
        <h1
          style={{
            background:
              "linear-gradient(90deg, #4E52FB 33.63%, #20ACF7 67.04%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="text-[48px] font-bold"
        >
          Features
        </h1>
      </div>

      <div
        className="text-xl flex flex-col gap-3 max-w-3xl mx-auto"
        style={{
          background:
            "linear-gradient(90deg, #4E52FB -12.98%, #F0F0F0 101.68%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        <p>
          We realized that traditional paper business cards no longer fit
          today’s digital world.
        </p>
        <p>
          Paper cards are outdated, inefficient, and often get lost or
          forgotten.
        </p>
        <p>
          After returning from a trade show in 2019 with over 90 paper business
          cards—and feeling the complete disconnect—we knew something needed to
          change.
        </p>

        <p>
          That’s why we created Mobile. It seamlessly integrates with all your
          digital tools and brings a new era of smart, effortless, and
          meaningful business connections.
        </p>
      </div>

      <div className="w-full max-w-[781px] mx-auto p-4">
        <FeatureCircle />
      </div>
    </div>
  );
};

export default Feature;

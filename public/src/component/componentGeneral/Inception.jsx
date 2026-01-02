import React from "react";
import businessCardFront from "../../assets/businesCardFront.png";
import businessCardBack from "../../assets/businessCardBack.png";

const Inception = () => {
  return (
    <div className={"md:grid grid-cols-2 p-4 pt-30"}>
      <div className="inception-container">
        <div className="card-front">
          <img src={businessCardFront} alt="Business Card Front" />
        </div>
        <div className="card-back">
          <img src={businessCardBack} alt="Business Card Back" />
        </div>
      </div>

      <div>
        <h1 className="bg-[linear-gradient(90deg,#4E52FB_20.71%,#20ACF7_80.6%)] bg-clip-text text-[48px] text-transparent">
          Inception
        </h1>

        <div className="bg-[linear-gradient(90deg,#4E52FB_-12.98%,#F0F0F0_101.68%)] bg-clip-text text-transparent text-[20px] flex flex-col gap-4">
          <p>
            We realized that traditional paper business cards no longer fit
            today’s digital world. Paper cards are outdated, inefficient, and
            often get lost or forgotten.
          </p>
          <p>
            After returning from a trade show in 2019 with over 90 paper
            business cards—and feeling the complete disconnect—we knew something
            needed to change. That’s why we created Mobile. It seamlessly
            integrates with all your digital tools and brings a new era of
            smart, effortless, and meaningful business connections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inception;

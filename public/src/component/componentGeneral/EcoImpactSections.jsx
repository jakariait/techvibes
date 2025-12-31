import React from "react";
import EcoImpactCalculator from "./EcoImpactCalculator.jsx";

import eclipse from "../../assets/eclipse.png";

const EcoImpactSections = () => {
  return (
    <div className="relative overflow-hidden">
      <img
        src={eclipse}
        alt=""
        className="absolute inset-0 w-full h-full opacity-30 animate-[spin_20s_linear_infinite] z-10"
      />

      <h1 className="relative z-20 text-center  text-[64px] font-normal leading-normal bg-linear-to-r from-[#4E52FB] to-[#20ACF7] bg-clip-text text-transparent">
        Heading
      </h1>

      <div
        className={"lg:grid items-center p-4 justify-center grid-cols-6 gap-4 relative z-20"}
      >
        <div
          className={
            "col-span-2 flex flex-col gap-4 items-center justify-center"
          }
        >
          <h1 className={"text-white text-[36px]"}>Save Money and Trees</h1>
          <p className={"text-white text-[16px]"}>
            Calculate your company’s savings and environmental impactCalculate
            your company’s savings and environmental impactCalculate your
            company’s savings and environmental impactCalculate your company’s
            savings and environmental impactCalculate your company’s savings and
            environmental impactCalculate your company’s savings and
            environmental impact
          </p>
          <button className="flex w-94 p-2.5 justify-center items-center gap-2.5 rounded-xl border-b-2 border-b-[#9C43CA] bg-linear-to-b from-[#B1EAF5] to-[#5C22E9] shadow-[2px_2px_21.1px_0_#6B519D] text-[#EBECFF] text-[16px]">
            Make the switch
          </button>
        </div>
        <div className={"col-span-4"}>
          <EcoImpactCalculator />
        </div>
      </div>
    </div>
  );
};

export default EcoImpactSections;

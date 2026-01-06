import React from "react";
import EcoImpactCalculator from "./EcoImpactCalculator.jsx";
import imgProperty1Default from "../../assets/eclipse.png";

function Ellipse({ className }) {
  return (
    <div data-node-id="1:2555" className={className}>
      <div className="absolute inset-[-4.19%]">
        <img
          className="block max-w-none size-full"
          alt=""
          height="1560.6"
          src={imgProperty1Default}
          width="1560.6"
        />
      </div>
    </div>
  );
}

const EcoImpactSections = () => {
  return (
    <div className="relative overflow-hidden">
      <Ellipse className="absolute  left-0 size-[1440px] top-[64px] globe-bg" />

      <h1 className="relative z-20 text-center  text-[64px] font-normal leading-normal bg-linear-to-r from-[#4E52FB] to-[#20ACF7] bg-clip-text text-transparent">
        Heading
      </h1>

      <div
        className={
          "lg:grid items-center p-4 justify-center grid-cols-6 gap-4 relative z-20"
        }
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

import React from "react";
import imgRectangle5263 from "../../assets/Rectangle 5263.png";

const Congratulations = () => {
  return (
    <div className={"p-4 flex flex-col justify-center items-center gap-10"}>
      <div className={"max-w-xl mx-auto flex flex-col justify-center gap-4"}>
        <img alt="" src={imgRectangle5263} />
        <h1 className="bg-[linear-gradient(90deg,#4E52FB_0%,#20ACF7_100%)] bg-clip-text text-transparent text-[24px] md:text-[54px]">
          Congratulations!
        </h1>
        <h2 className={"text-[#F2ECEC] md:text-[24px]"}>
          Your Digital Profile has been Created
        </h2>

        <button className="flex w-full p-2.5 justify-center items-center gap-2.5 rounded-sm border-b-2 border-b-[#9C43CA] bg-[linear-gradient(180deg,#B3EFF7_0%,#5718F2_100%)] shadow-[2px_2px_21.1px_0_#6B519D] text-[#EBECFF] font-['Bruno_Ace'] text-[16px] font-normal transition hover:brightness-110 active:translate-y-px">
          Edit your Digital Profile
        </button>
      </div>

      <div className={"max-w-2xl mx-auto flex flex-col justify-center gap-4"}>
        <p className={"text-[#F2ECEC] text-[22px]"}>
          Our designer will contact you through WhatsApp  Or Send Text us -
          01906906000
        </p>
      </div>
    </div>
  );
};

export default Congratulations;

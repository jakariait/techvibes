import React from "react";

import imgGroup from "../../assets/imgGroup.svg";

const AddressCard = ({ country, address, isBackground }) => {
  return (
    <div
      className={`flex flex-col items-center justify-between relative content-stretch h-46.5 px-13.25 py-14 rounded-[13px] shadow-[0px_0px_28px_0px_rgba(98,166,255,0.25)]
    ${isBackground ? "bg-[rgba(93,178,186,0.24)] " : ""}`}
    >

      <div className="content-stretch flex flex-col gap-3 items-center relative shrink-0">
        <div className="overflow-clip relative shrink-0 size-6">
          <div className="absolute inset-[14.58%_10.42%_16.67%_8.33%]">
            <div className="absolute inset-[-6.06%_-5.13%]">
              <img
                alt=""
                className="block max-w-none size-full"
                src={imgGroup}
              />
            </div>
          </div>
        </div>
        <p className=" leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-white w-36 whitespace-pre-wrap">
          {country}
        </p>
        <p className=" leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.67)] text-center w-51.25 whitespace-pre-wrap">
          {address}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;

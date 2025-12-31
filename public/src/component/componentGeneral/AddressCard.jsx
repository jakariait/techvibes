import React from 'react';

const AddressCard = ({ country, address }) => {
  const imgGroup = "https://www.figma.com/api/mcp/asset/a76ea742-5cde-4174-8ff6-4c5a614073f4";
  return (
    <div
      className="bg-[rgba(93,178,186,0.24)] content-stretch flex flex-col h-[186px] items-center justify-between px-[53px] py-[56px] relative rounded-[13px] shadow-[0px_0px_28px_0px_rgba(98,166,255,0.25)]"
    >
      <div
        className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0"
      >
        <div
          className="overflow-clip relative shrink-0 size-[24px]"
        >
          <div
            className="absolute inset-[14.58%_10.42%_16.67%_8.33%]"
          >
            <div className="absolute inset-[-6.06%_-5.13%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup} />
            </div>
          </div>
        </div>
        <p
          className="font-['Bruno_Ace:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-white w-[144px] whitespace-pre-wrap"
        >
          {country}
        </p>
        <p
          className="font-['Bruno_Ace:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.67)] text-center w-[205px] whitespace-pre-wrap"
        >
          {address}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
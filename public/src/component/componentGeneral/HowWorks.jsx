import React from "react";
import imgRectangle5264 from "../../assets/imgRectangle5264.jpeg";
import imgRectangle5269 from "../../assets/imgRectangle5269.jpeg";
import imgRectangle5270 from "../../assets/imgRectangle5270.jpeg";
import imgRectangle5271 from "../../assets/imgRectangle5271.jpeg";
import imgRectangle5272 from "../../assets/imgRectangle5272.jpeg";
import imgGroup from "../../assets/imgGroup222.svg";
import imgEmojioneV1DeliveryTruck from "../../assets/imgEmojioneV1DeliveryTruck.svg";
import HowItWorksCard from "./HowItWorksCard";

const cardData = [
  {
    number: "1",
    title: "Place your Order",
    description:
      "Choose your NFC Card type, Select add ons and complete the checkout security",
    imageContent: (
      <div className="h-[107px] relative rounded-[8px] shrink-0 w-[185px]">
        <img
          alt="Place your order"
          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full"
          src={imgRectangle5269}
        />
      </div>
    ),
  },
  {
    number: "2",
    title: "Share Your Design",
    description:
      "Upload your logo, brand colour and informations through our easy design portal",
    imageContent: (
      <div className="h-[107px] relative rounded-[8px] shrink-0 w-[185px]">
        <img
          alt="Share your design"
          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full"
          src={imgRectangle5270}
        />
      </div>
    ),
  },
  {
    number: "3",
    title: "Review & Approve",
    description:
      "Check the digital proof and request changes or approve the final design",
    imageContent: (
      <div className="content-stretch flex items-center pl-0 pr-[36px] py-0 relative shrink-0 w-full">
        <div className="h-[107px] mr-[-36px] relative rounded-[8px] shrink-0 w-[185px]">
          <img
            alt="Review and approve"
            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full"
            src={imgRectangle5271}
          />
        </div>
        <div
          className="mr-[-36px] overflow-clip relative shrink-0 size-[65px]"
          data-name="lets-icons:search-duotone"
        >
          <div
            className="absolute bottom-1/4 left-[12.15%] right-[12.85%] top-0"
            data-name="Group"
          >
            <div className="absolute inset-[-1.03%_-1.02%_-1.03%_-1.03%]">
              <img
                alt="Search icon"
                className="block max-w-none size-full"
                src={imgGroup}
              />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "4",
    title: "Print & Delivery",
    description:
      "We program your NFC card. Print it and ship it delivery to your address.",
    imageContent: (
      <div className="content-stretch flex items-center pl-0 pr-[24px] py-0 relative shrink-0 w-full">
        <div className="h-[107px] mr-[-24px] relative rounded-[8px] shrink-0 w-[185px]">
          <img
            alt="Print and delivery"
            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full"
            src={imgRectangle5272}
          />
        </div>
        <div className="flex items-center justify-center mr-[-24px] relative shrink-0">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <div
              className="relative size-[54px]"
              data-name="emojione-v1:delivery-truck"
            >
              <img
                alt="Delivery truck"
                className="block max-w-none size-full"
                src={imgEmojioneV1DeliveryTruck}
              />
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const HowWorks = () => {
  return (
    <div className="content-stretch flex flex-col gap-10 md:gap-20 items-start relative w-full px-4 md:px-8 lg:px-16">
      <div className="content-stretch flex flex-col lg:flex-row items-center justify-between relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-6 items-start leading-[normal] not-italic relative shrink-0 w-full lg:w-1/2 text-center lg:text-left">
          <p
            className="bg-clip-text bg-gradient-to-r from-[#4e52fb] self-stretch text-4xl md:text-5xl to-[#20acf7]"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            How it Works
          </p>
          <p className="relative shrink-0 text-xl md:text-2xl text-white self-stretch">
            Create your smart NFC Card in just 4 simple steps
          </p>
        </div>
        <div className="h-64 md:h-80 w-full lg:w-2/5 mt-6 lg:mt-0 relative rounded-lg shrink-0 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none rounded-[12px]">
            <img
              alt="Decorative"
              className="absolute h-[186.92%] left-[-0.11%] max-w-none top-[-52.31%] w-full"
              src={imgRectangle5264}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {cardData.map((card) => (
          <HowItWorksCard
            key={card.number}
            number={card.number}
            title={card.title}
            description={card.description}
          >
            {card.imageContent}
          </HowItWorksCard>
        ))}
      </div>

      <div className="flex justify-center w-full">
        <button className="px-6 py-3 rounded-sm border-b-2 border-b-[#9C43CA] bg-[linear-gradient(180deg,#B3EFF7_0%,#5718F2_100%)] shadow-[2px_2px_21.1px_0_#6B519D] text-[#EBECFF]  text-[16px] font-normal transition hover:brightness-110 active:translate-y-px">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HowWorks;

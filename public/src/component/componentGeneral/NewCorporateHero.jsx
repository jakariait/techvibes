import React from "react";
import newCorporateHeroBg from "../../assets/new-corporate-hero.jpg";

const NewCorporateHero = () => {
  return (
    <div className="content-stretch flex items-center justify-center px-4 py-16 sm:px-8 sm:py-24 md:px-16 md:py-32 xl:px-20.25 xl:py-50.25 relative rounded-xl size-full">
      <img
        alt="TechVibes Corporate Hero"
        className="absolute inset-0 max-w-none object-50%-50% object-cover  pointer-events-none rounded-xl size-full"
        src={newCorporateHeroBg}
      />
      <p className="leading-[normal] not-italic relative text-center text-white whitespace-pre-wrap text-2xl sm:text-3xl md:text-4xl xl:text-[48px]">
        The next-generation NFC business card build for modern, visionary
        companies.
      </p>
    </div>
  );
};

export default NewCorporateHero;

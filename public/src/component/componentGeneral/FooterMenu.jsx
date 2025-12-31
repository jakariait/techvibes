import React from "react";
import FollowUs from "./FollowUs.jsx";

const footerMenuItems = [
  {
    title: "Compare",
    links: [
      { name: "vs popl", href: "#" },
      { name: "vs popl", href: "#" },
      { name: "vs popl", href: "#" },
      { name: "vs popl", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "Card Modes", href: "#" },
      { name: "Feaures", href: "#" },
      { name: "Card Modes", href: "#" },
      { name: "Feaures", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Terms & Conditions", href: "#" },
      { name: "Support", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Return Policy", href: "#" },
    ],
  },
  {
    title: "Contacts",
    links: [
      { name: "asdfg@gmail.com", href: "mailto:asdfg@gmail.com" },
      { name: "+14545414", href: "tel:+14545414" },
    ],
  },
];

const FooterMenu = () => {
  return (
    <div className="flex flex-wrap gap-y-8 md:gap-y-0 items-end justify-end relative w-full p-4 ">
      <div className="flex flex-col  items-start relative shrink-0 w-full">
        <div className="flex flex-col  items-start relative shrink-0 w-full">
          <p
            className="bg-clip-text bg-gradient-to-r  from-[#0f0c9a] leading-[normal] not-italic relative shrink-0 text-[36px] to-[#20acf7] py-5"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            TechVibes
          </p>
          <div className="flex flex-col md:flex-row md:justify-between items-start relative shrink-0 w-full gap-8 md:gap-4">
            {footerMenuItems.map((category, index) => (
              <div
                key={index}
                className="flex flex-col gap-[16px] items-start w-full md:flex-1"
              >
                <p className=" leading-[normal] not-italic relative shrink-0 text-[#d1d2f1] text-[24px] whitespace-pre-wrap">
                  {category.title}
                </p>
                <div className="flex flex-col  gap-[6px] items-start leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-pre-wrap">
                  {category.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      className="relative shrink-0 w-full"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FollowUs />
    </div>
  );
};

export default FooterMenu;

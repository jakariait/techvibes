import React from 'react';

import linkedinIcon from "../../assets/skill-icons_linkedin.svg"


const socialLinks = [
  {
    href: "#",
    icon: (
      <img
        src={linkedinIcon}
        alt="LinkedIn"
        className="w-6 h-6"
      />
    ),
  },
  {
    href: "#",
    icon: (
      <img
        src="/src/assets/logos_facebook.svg"
        alt="Facebook"
        className="w-6 h-6"
      />
    ),
  },
  {
    href: "#",
    icon: (
      <img
        src="/src/assets/skill-icons_instagram.svg"
        alt="Instagram"
        className="w-6 h-6"
      />
    ),
  },
  {
    href: "#",
    icon: (
      <img
        src="/src/assets/streamline-flex_tiktok-solid.svg"
        alt="TikTok"
        className="w-6 h-6"
      />
    ),
  },
  {
    href: "#",
    icon: (
      <img
        src="/src/assets/logos_youtube-icon.svg"
        alt="Youtube"
        className="w-6 h-6"
      />
    ),
  },
];
const FollowUs = () => {
  return (
    <div className="flex flex-col gap-[16px] items-end w-full md:flex-1">
      <p className=" leading-[normal] not-italic relative shrink-0 text-[#d1d2f1] text-[24px] whitespace-pre-wrap">
        Follow Us
      </p>
      <div className="flex items-center gap-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="text-white hover:text-gray-400"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FollowUs;
import React from "react";

import linkedinIcon from "../../assets/skill-icons_linkedin.svg";
import facebookIcon from "../../assets/logos_facebook.svg";
import instagramIcon from "../../assets/skill-icons_instagram.svg";
import tiktokIcon from "../../assets/streamline-flex_tiktok-solid.svg";
import youTubeIcon from "../../assets/logos_youtube-icon.svg";


const socialLinks = [
  {
    href: "#",
    icon: <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />,
  },
  {
    href: "#",
    icon: <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />,
  },
  {
    href: "#",
    icon: <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />,
  },
  {
    href: "#",
    icon: <img src={tiktokIcon} alt="TikTok" className="w-6 h-6" />,
  },
  {
    href: "#",
    icon: <img src={youTubeIcon} alt="Youtube" className="w-6 h-6" />,
  },
];
const FollowUs = () => {
  return (
    <div className="flex flex-col gap-4 items-end w-full md:flex-1">
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

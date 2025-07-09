import React from "react";
import {
  FaLinkedinIn,
  FaWeixin,
  FaInstagram,
  FaFacebookF,
  FaGlobe,
} from "react-icons/fa";

const iconMap = {
  LinkedIn: {
    icon: FaLinkedinIn,
    color: "#0077B5",
  },
  WeChat: {
    icon: FaWeixin,
    color: "#1DA1F2",
  },
  Instagram: {
    icon: FaInstagram,
    color: "#E1306C",
  },
  Facebook: {
    icon: FaFacebookF,
    color: "#1877F2",
  },
  Website: {
    icon: FaGlobe,
    color: "#1877F2",
  },
};

const SocialIconsGlow = ({ socials }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <div className="flex gap-6 items-center justify-center mt-5 flex-wrap px-10">
      {socials.map((social, index) => {
        const platform = iconMap[social.platform];
        if (!platform) return null;

        const Icon = platform.icon;
        const color = platform.color;

        const isWeChat = social.platform === "WeChat";

        return isWeChat ? (
          <button
            key={index}
            onClick={() => handleCopy(social.url)} // Treat `url` as WeChat ID here
            className="p-3 rounded-md transition-all"
            style={{
              backgroundColor: color,
              color: "#ffffff",
              boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
            }}
          >
            <Icon className="text-xl" />
          </button>
        ) : (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-md transition-all"
            style={{
              backgroundColor: color,
              color: "#ffffff",
              boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
            }}
          >
            <Icon className="text-xl" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIconsGlow;

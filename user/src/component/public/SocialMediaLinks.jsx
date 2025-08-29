import React, { useState, useEffect, useRef } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaSnapchatGhost,
  FaRedditAlien,
  FaGithub,
  FaMediumM,
  FaTelegramPlane,
  FaDiscord,
  FaPodcast,
  FaLink,
  FaGlobe,
  FaChevronRight,
  FaChevronLeft,
  FaFacebookSquare,
} from "react-icons/fa";
import {
  SiFiverr,
  SiDribbble,
  SiUpwork,
  SiQuora,
  SiTwitch,
  SiSoundcloud,
  SiVimeo,
  SiSpotify,
  SiBehance,
  SiApplemusic,
  SiWechat,
  SiThreads,
  SiX,
} from "react-icons/si";
import { SiFreelancer } from "react-icons/si";
import { SiTinder } from "react-icons/si";

import { Globe } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useTheme } from "../../context/ThemeContext.jsx";

const SOCIAL_ICONS = {
  facebook: { icon: FaFacebookF, color: "#1877F2" },
  "facebook page": { icon: FaFacebookSquare, color: "#1877F2" },
  twitter: { icon: FaTwitter, color: "#1DA1F2" },
  "x.com": { icon: SiX, color: "#000000" },
  instagram: { icon: FaInstagram, color: "#E1306C" },
  linkedin: { icon: FaLinkedinIn, color: "#0077B5" },
  youtube: { icon: FaYoutube, color: "#FF0000" },
  tiktok: { icon: FaTiktok, color: "#010101" },
  pinterest: { icon: FaPinterest, color: "#E60023" },
  snapchat: { icon: FaSnapchatGhost, color: "#FFFC00" },
  reddit: { icon: FaRedditAlien, color: "#FF4500" },
  github: { icon: FaGithub, color: "#333" },
  medium: { icon: FaMediumM, color: "#000000" },
  telegram: { icon: FaTelegramPlane, color: "#0088cc" },
  discord: { icon: FaDiscord, color: "#5865F2" },
  website: { icon: FaGlobe, color: "#666" },
  teams: { icon: FaLink, color: "#6264A7" },
  quora: { icon: SiQuora, color: "#B92B27" },
  twitch: { icon: SiTwitch, color: "#9146FF" },
  soundcloud: { icon: SiSoundcloud, color: "#FF5500" },
  vimeo: { icon: SiVimeo, color: "#1AB7EA" },
  spotify: { icon: SiSpotify, color: "#1DB954" },
  behance: { icon: SiBehance, color: "#1769FF" },
  fiverr: { icon: SiFiverr, color: "#1DBF73" },
  dribbble: { icon: SiDribbble, color: "#EA4C89" },
  upwork: { icon: SiUpwork, color: "#6FDA44" },
  wechat: { icon: SiWechat, color: "#7BB32E" },
  "apple music": { icon: SiApplemusic, color: "#FA233B" },
  podcast: { icon: FaPodcast, color: "#FF2D55" },
  freelancer: { icon: SiFreelancer, color: "#29B2FE" },
  threads: { icon: SiThreads, color: "#000000" },
  tinder: { icon: SiTinder, color: "#FF6B6B" },
};

const SocialMediaLinks = ({ profile, user, company }) => {
  const [snackOpen, setSnackOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const scrollRef = useRef();

  const socialMedia = Array.isArray(profile?.socialMedia)
    ? profile.socialMedia
    : [];
  const customSocialMedia = Array.isArray(profile?.customSocialMedia)
    ? profile.customSocialMedia
    : [];

  const sortedPredefined = socialMedia.sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  const sortedCustom = customSocialMedia.sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  let allSorted = [...sortedPredefined, ...sortedCustom];

  if (user?.role === "corporate" && company?.website) {
    allSorted.unshift({
      platform: "website",
      url: company.website,
      order: -999,
    });
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackOpen(true);
  };

  const updateArrowVisibility = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 10);
    setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    updateArrowVisibility();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", updateArrowVisibility);
    return () => {
      if (el) el.removeEventListener("scroll", updateArrowVisibility);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 200, behavior: "smooth" });
    }
  };

  const renderIconButton = (Icon, url, color, key, isWeChat = false) => {
    const props = {
      className: "p-3 rounded-md transition-all hover:scale-105",
      style: {
        backgroundColor: color,
        color: "#ffffff",
        boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
      },
    };

    return isWeChat ? (
      <button key={key} onClick={() => handleCopy(url)} {...props}>
        <Icon className="text-xl" />
      </button>
    ) : (
      <a
        key={key}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        <Icon className="text-xl" />
      </a>
    );
  };
  const { theme } = useTheme();

  return (
    allSorted.length > 0 && (
      <div className="relative p-4 rounded-xl overflow-hidden h-full max-w-2xl mx-auto">
        {/* Header */}
        <span className="flex gap-4 mb-4 items-center">
          <Globe className={` ${theme.iconColor} `} />
          <span className={` ${theme.iconColor} text-lg font-medium`}>
            Connect Online
          </span>
        </span>

        {/* Arrows */}
        {showLeftArrow && (
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-22 transform -translate-y-1/2 z-10 cursor-pointer bg-[#212F35]  text-white p-2 rounded-full"
          >
            <FaChevronLeft />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-22 transform -translate-y-1/2 z-10 bg-[#212F35] cursor-pointer text-white p-2 rounded-full"
          >
            <FaChevronRight />
          </button>
        )}

        {/* Scrollable icons */}
        <div
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          ref={scrollRef}
        >
          <div className="flex gap-4 items-center justify-start px-4 py-2 min-w-max">
            {allSorted.map((item, index) => {
              const key = item.platform
                ? `${item.platform}-${index}`
                : `custom-${index}`;
              const url = item.url;
              const platform = item.platform?.toLowerCase();
              const isWeChat = platform === "wechat";
              const iconData = SOCIAL_ICONS[platform] || {};
              const Icon = iconData.icon || FaLink;
              const color = iconData.color || "#999";

              return renderIconButton(Icon, url, color, key, isWeChat);
            })}
          </div>
        </div>

        {/* Snackbar */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
        >
          <MuiAlert
            severity="success"
            variant="filled"
            onClose={() => setSnackOpen(false)}
          >
            WeChat ID copied!
          </MuiAlert>
        </Snackbar>
      </div>
    )
  );
};

export default SocialMediaLinks;

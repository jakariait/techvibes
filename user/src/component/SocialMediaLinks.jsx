import React, { useState } from "react";
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
  FaLink,
  FaPodcast,
  FaGlobe,
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
} from "react-icons/si";

import { Globe } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const SOCIAL_ICONS = {
  facebook: { icon: FaFacebookF, color: "#1877F2" },
  twitter: { icon: FaTwitter, color: "#1DA1F2" },
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

  fiverr: { icon: SiFiverr, color: "#1DBF73" },
  dribbble: { icon: SiDribbble, color: "#EA4C89" },
  upwork: { icon: SiUpwork, color: "#6FDA44" },
  quora: { icon: SiQuora, color: "#B92B27" },
  twitch: { icon: SiTwitch, color: "#9146FF" },
  soundcloud: { icon: SiSoundcloud, color: "#FF5500" },
  vimeo: { icon: SiVimeo, color: "#1AB7EA" },
  spotify: { icon: SiSpotify, color: "#1DB954" },
  behance: { icon: SiBehance, color: "#1769FF" },
  "apple music": { icon: SiApplemusic, color: "#FA233B" },
  podcast: { icon: FaPodcast, color: "#FF2D55" },
  teams: { icon: FaLink, color: "#6264A7" },
  wechat: { icon: SiWechat, color: "#7BB32E" },
  website: { icon: FaGlobe, color: "#666" },
};

const SocialMediaLinks = ({ profile }) => {
  const [snackOpen, setSnackOpen] = useState(false);

  const socialMedia = Array.isArray(profile?.socialMedia) ? profile.socialMedia : [];
  const customSocialMedia = Array.isArray(profile?.customSocialMedia) ? profile.customSocialMedia : [];

  const sortedPredefined = socialMedia.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const sortedCustom = customSocialMedia.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const allSorted = [...sortedPredefined, ...sortedCustom];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackOpen(true);
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
      <a key={key} href={url} target="_blank" rel="noopener noreferrer" {...props}>
        <Icon className="text-xl" />
      </a>
    );
  };

  return (
    allSorted.length > 0 && (
      <div className="p-4 rounded-xl overflow-hidden h-full max-w-2xl mx-auto">
        {/* Header */}
        <span className="flex gap-4 mb-4">
          <Globe className="text-green-600" />
          <span className="text-white">Connect Online</span>
        </span>

        {/* Icons */}
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {allSorted.map((item, index) => {
            const key = item.platform ? `${item.platform}-${index}` : `custom-${index}`;
            const url = item.url;
            const platform = item.platform?.toLowerCase();
            const isWeChat = platform === "wechat";
            const iconData = SOCIAL_ICONS[platform] || {};
            const Icon = iconData.icon || FaLink;
            const color = iconData.color || "#999";

            return renderIconButton(Icon, url, color, key, isWeChat);
          })}
        </div>

        {/* Snackbar */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
        >
          <MuiAlert severity="success" variant="filled" onClose={() => setSnackOpen(false)}>
            WeChat ID copied!
          </MuiAlert>
        </Snackbar>
      </div>
    )
  );
};

export default SocialMediaLinks;

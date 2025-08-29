import React from "react";
import { UserRound } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const Bio = ({ profile }) => {
  const { theme } = useTheme();

  return profile?.bio ? (
    <div
      className={` ${theme.connectFormBg} inner-glow p-4 rounded-xl overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <UserRound className={` ${theme.iconColor} w-5 h-5`} />
        <h2 className={` ${theme.iconColor} text-base font-medium `}>Bio</h2>
      </div>
      <div className={` ${theme.text} `}>{profile?.bio}</div>
    </div>
  ) : null;
};

export default Bio;

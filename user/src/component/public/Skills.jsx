import React from "react";
import { Settings } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const Skills = ({ profile, user }) => {
  const { theme } = useTheme();

  const isCorporate = user?.role === "corporate";
  const hasSkills =
    Array.isArray(profile?.skills) && profile?.skills.length > 0;

  return isCorporate && hasSkills ? (
    <div
      className={`${theme.connectFormBg} inner-glow p-4 rounded-xl overflow-hidden h-full`}
    >
      {/* Header */}
      <div className={`flex items-center gap-2 mb-4`}>
        <Settings className={`w-5 h-5 ${theme.iconColor}`} />
        <h2 className={`text-base font-medium ${theme.iconColor}`}>Skills</h2>
      </div>
      <div className={`flex flex-wrap gap-2`}>
        {profile?.skills.map((skill, index) => (
          <span
            key={index}
            className={`${theme.skillBgColor} ${theme.text} text-sm px-3 py-1 rounded-full`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  ) : null;
};

export default Skills;

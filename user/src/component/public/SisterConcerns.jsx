import React from "react";
import { ExternalLink, Building2 } from "lucide-react";
import {useTheme} from "../../context/ThemeContext.jsx";

const SisterConcerns = ({ profile, user }) => {
  const { theme } = useTheme();


  const concerns = profile?.sisterConcerns || [];

  // Only show for corporate users
  if (user?.role !== "corporate" || concerns.length === 0) return null;

  return (
    <div
      className={`${theme.connectFormBg} inner-glow p-4 rounded-xl overflow-hidden h-full`}
    >
      {/* Header */}
      <div className={`flex items-center gap-3 mb-4`}>
        <Building2 className={`w-5 h-5 ${theme.iconColor}`} />
        <h2 className={`text-xl font-medium ${theme.iconColor}`}>Sister Concerns</h2>
      </div>

      {/* List */}
      <div className={`flex flex-col gap-2 w-full`}>
        {concerns.map(({ label, value }, index) => (
          <div
            key={index}
            className={`flex flex-wrap items-center justify-between gap-2 w-full`}
          >
            <div className={`flex flex-wrap items-center gap-1`}>
              <span className={`${theme.text} text-md`}>{label}</span>
            </div>

            {value && (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className={`${theme.externalLinkColor} transition-colors`}
              >
                <ExternalLink className={`w-5 h-5`} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SisterConcerns;

import React from "react";
import { ExternalLink, MessageCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const WhatsAppNumbers = ({ profile, user }) => {
  const { theme } = useTheme();

  const whatsapps = profile?.whatsapp || [];
  const linkPrefix = "https://wa.me/";

  // Show only 2 WhatsApp numbers for "normal" users, all for others
  const visibleNumbers =
    user?.role === "normal" ? whatsapps.slice(0, 1) : whatsapps;

  return (
    visibleNumbers.length > 0 && (
      <div
        className={` ${theme.connectFormBg} inner-glow p-4 rounded-xl overflow-hidden h-full`}
      >
        {/* Header */}
        <div className={`flex items-center gap-3 mb-4`}>
          <MessageCircle className={`w-5 h-5 ${theme.iconColor}`} />
          <h2 className={`text-xl font-medium ${theme.iconColor}`}>WhatsApp</h2>
        </div>

        {/* WhatsApp List */}
        <div className={`flex flex-col gap-2 w-full`}>
          {visibleNumbers.map(({ label, value, _id }) => (
            <div
              key={_id}
              className={`flex flex-wrap items-center justify-between gap-2 w-full`}
            >
              <div className={`flex flex-wrap items-center gap-1`}>
                <span className={`${theme.text} text-md w-[80px]`}>
                  {label}
                </span>
                <span className={`${theme.text}`}>:</span>
                <span className={`${theme.text} text-sm`}>{value}</span>
              </div>

              {value && (
                <a
                  href={`${linkPrefix}${value.replace(/\D/g, "")}`}
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
    )
  );
};

export default WhatsAppNumbers;

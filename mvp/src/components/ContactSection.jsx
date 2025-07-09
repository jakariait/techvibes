import React from "react";
import { ExternalLink } from "lucide-react";

const ContactSection = ({
  title,
  icon: Icon,
  iconColor,
  items,
  linkPrefix,
}) => {
  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden">
      {/* Header: Icon and Title always in one row */}
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6" style={{ color: iconColor }} />
        <h2 className="text-xl font-medium" style={{ color: iconColor }}>
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 w-full">
        {items.map(({ label, value }, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center justify-between gap-2 w-full"
          >
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-white text-md w-[80px]">{label}</span>
              <span className="text-white">:</span>
              <span className="text-white text-sm">{value}</span>
            </div>

            {linkPrefix && value && (
              <a
                href={
                  linkPrefix.includes("wa.me")
                    ? `${linkPrefix}${value.replace(/\D/g, "")}`
                    : linkPrefix === "tel:"
                      ? `${linkPrefix}${value.replace(/\D/g, "")}`
                      : `${linkPrefix}${value}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>


            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactSection;

import React from "react";
import { ExternalLink } from "lucide-react";

const AddressSection = ({ title, icon: Icon, iconColor, items }) => {
  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Icon className="w-5 h-5" style={{ color: iconColor }} />
        <h2 className="text-base font-medium" style={{ color: iconColor }}>
          {title}
        </h2>
      </div>

      {/* Address Items */}
      <div className="flex flex-col gap-2">
        {items.map(({ label, value }, index) => (
          <div key={index} className="w-full">
            {/* Label on its own line */}
            <div className="flex items-center justify-center  gap-2">
              <div>
                <span className="text-white ">{label}</span>
                <span className="text-white">:</span>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  value,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {/* Address + External Link on next line */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <p className="text-white text-sm">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressSection;

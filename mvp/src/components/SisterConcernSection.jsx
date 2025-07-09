import React from "react";
import { Globe } from "lucide-react";

const SisterConcernSection = ({
  title = "Sister Concerns",
  icon: Icon = Globe,
  iconColor = "#38bdf8",
  concerns = [],
}) => {
  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center  gap-2 mb-4">
        <Icon className="w-5 h-5" style={{ color: iconColor }} />
        <h2 className="text-base font-medium" style={{ color: iconColor }}>
          {title}
        </h2>
      </div>

      {/* Bullet List */}
      <div className="text-white space-y-2 text-sm">
        {concerns.map((item, idx) => (
          <div key={idx} className="flex items-start  gap-2">
            <span className="text-lg leading-none">•</span>
            <span className="">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SisterConcernSection;

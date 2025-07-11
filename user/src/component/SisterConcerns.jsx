import React from "react";
import { ExternalLink, Building2 } from "lucide-react";

const SisterConcerns = ({ profile, user }) => {
  const concerns = profile?.sisterConcerns || [];

  // Only show for corporate users
  if (user?.role !== "corporate" || concerns.length === 0) return null;

  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Building2 className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-medium text-blue-400">Sister Concerns</h2>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2 w-full">
        {concerns.map(({ label, value }, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center justify-between gap-2 w-full"
          >
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-white text-md">{label}</span>
            </div>

            {value && (
              <a
                href={value}
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

export default SisterConcerns;

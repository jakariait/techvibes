import React from "react";
import { ExternalLink, MapPin } from "lucide-react";

const Address = ({ profile, user, company }) => {
  const locations = profile?.locations || [];

  const isCorporate = user?.role === "corporate";
  const hasCompanyLocation = company?.locations?.value;

  const visibleLocations =
    user?.role === "normal" ? locations.slice(0, 2) : locations;

  const shouldShow =
    visibleLocations.length > 0 || (isCorporate && hasCompanyLocation);

  return (
    shouldShow && (
      <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-yellow-400" />
          <h2 className="text-base font-medium text-yellow-400">Location</h2>
        </div>

        <div className="flex flex-col gap-4">
          {/* Company Location (for corporate users) */}
          {isCorporate && hasCompanyLocation && (
            <div className="w-full">
              {/* Label line */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-white">
                  {company.locations.label || "Office"}
                </span>
                <span className="text-white">:</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    company.locations.value
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              {/* Address value */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <p className="text-white text-sm">
                  {company.locations.value}
                </p>
              </div>
            </div>
          )}

          {/* User Locations (if any) */}
          {visibleLocations.map(({ label, value, _id }) => (
            <div key={_id} className="w-full">
              {/* Label line */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-white">{label}</span>
                <span className="text-white">:</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    value
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              {/* Address value */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <p className="text-white text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Address;


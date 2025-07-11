import React from "react";
import { ExternalLink, MapPin } from "lucide-react";

const Address = ({ profile, user }) => {
  const locations = profile?.locations || [];

  // Show only 2 locations for "normal" users, all for others
  const visibleLocations =
    user?.role === "normal" ? locations.slice(0, 2) : locations;

  return (
    visibleLocations.length > 0 && (
      <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-yellow-400" />
          <h2 className="text-base font-medium text-yellow-400">Location</h2>
        </div>

        {/* Address List */}
        <div className="flex flex-col gap-2">
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

              {/* Address value line */}
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

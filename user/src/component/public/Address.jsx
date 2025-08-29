import React from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const Address = ({ profile, user, company }) => {
  const { theme } = useTheme();

  const locations = profile?.locations || [];

  const isCorporate = user?.role === "corporate";
  const hasCompanyLocation = company?.locations?.value;

  const visibleLocations =
    user?.role === "normal" ? locations.slice(0, 2) : locations;

  const shouldShow =
    visibleLocations.length > 0 || (isCorporate && hasCompanyLocation);

  return (
    shouldShow && (
      <div
        className={`${theme.connectFormBg} inner-glow p-4 rounded-xl overflow-hidden h-full`}
      >
        {/* Header */}
        <div className={`flex items-center justify-center gap-2 mb-4`}>
          <MapPin className={`w-5 h-5 ${theme.iconColor}`} />
          <h2 className={`text-base font-medium ${theme.iconColor}`}>
            Location
          </h2>
        </div>

        <div className={`flex flex-col gap-4`}>
          {/* Company Location (for corporate users) */}
          {isCorporate && hasCompanyLocation && (
            <div className={`w-full`}>
              {/* Label line */}
              <div className={`flex items-center justify-center gap-2`}>
                <span className={`${theme.text}`}>
                  {company.locations.label || "Office"}
                </span>
                <span className={`${theme.text}`}>:</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    company.locations.value,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme.externalLinkColor} transition-colors flex-shrink-0`}
                >
                  <ExternalLink className={`w-5 h-5`} />
                </a>
              </div>

              {/* Address value */}
              <div
                className={`flex items-center justify-center gap-2 flex-wrap`}
              >
                <p className={`${theme.text} text-sm`}>
                  {company.locations.value}
                </p>
              </div>
            </div>
          )}

          {/* User Locations (if any) */}
          {visibleLocations.map(({ label, value, _id }) => (
            <div key={_id} className={`w-full`}>
              {/* Label line */}
              <div className={`flex items-center justify-center gap-2`}>
                <span className={`${theme.text}`}>{label}</span>
                <span className={`${theme.text}`}>:</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    value,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme.externalLinkColor} transition-colors flex-shrink-0`}
                >
                  <ExternalLink className={`w-5 h-5`} />
                </a>
              </div>

              {/* Address value */}
              <div
                className={`flex items-center justify-center gap-2 flex-wrap`}
              >
                <p className={`${theme.text} text-sm`}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Address;

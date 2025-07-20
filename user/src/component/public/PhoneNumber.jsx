import React from "react";
import { ExternalLink, Phone } from "lucide-react";

const PhoneNumber = ({ profile, user, company }) => {
  const phones = profile?.phones || [];
  const linkPrefix = "tel:";

  // Show only 2 phone numbers for "normal" users, all for others
  const visiblePhones = user?.role === "normal" ? phones.slice(0, 2) : phones;

  return (
    (visiblePhones.length > 0 ||
      (user?.role === "corporate" && company?.phoneNumber?.value)) && (
      <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Phone className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-medium text-green-400">Phone</h2>
        </div>

        {/* Phone List */}
        <div className="flex flex-col gap-2 w-full">
          {/* Company Phone First */}
          {user?.role === "corporate" && company?.phoneNumber?.value && (
            <div className="flex flex-wrap items-center justify-between gap-2 w-full">
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-white text-md w-[80px]">
                  {company.phoneNumber.label}
                </span>
                <span className="text-white">:</span>
                <span className="text-white text-sm">
                  {company.phoneNumber.value}
                </span>
              </div>

              <a
                href={`tel:${company.phoneNumber.value.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          )}

          {/* User's Saved Phone Numbers */}
          {visiblePhones.map(({ label, value, _id }) => (
            <div
              key={_id}
              className="flex flex-wrap items-center justify-between gap-2 w-full"
            >
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-white text-md w-[80px]">{label}</span>
                <span className="text-white">:</span>
                <span className="text-white text-sm">{value}</span>
              </div>

              {value && (
                <a
                  href={`tel:${value.replace(/\D/g, "")}`}
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
    )
  );
};

export default PhoneNumber;

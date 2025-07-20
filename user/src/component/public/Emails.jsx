import React from "react";
import { ExternalLink, Mail } from "lucide-react";

const Emails = ({ profile, user }) => {
  const emails = profile?.emails || [];
  const linkPrefix = "mailto:";

  // Show only 2 emails for normal users, all for others
  const visibleEmails =
    user?.role === "normal" ? emails.slice(0, 2) : emails;

  return (
    visibleEmails.length > 0 && (
      <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-red-400" />
          <h2 className="text-xl font-medium text-red-400">Email</h2>
        </div>

        {/* Email List */}
        <div className="flex flex-col gap-2 w-full">
          {visibleEmails.map(({ label, value, _id }) => (
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
                  href={`${linkPrefix}${value}`}
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

export default Emails;

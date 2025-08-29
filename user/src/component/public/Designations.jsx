import React from "react";
import { Briefcase } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const Designations = ({ profile }) => {
  const { theme } = useTheme();

  const designationInfo = profile?.designationInfo || [];

  // Show max 3 designations for all users
  const visibleDesignations = designationInfo.slice(0, 3);

  return (
    visibleDesignations.length > 0 && (
      <div
        className={`${theme.connectFormBg} inner-glow p-4 rounded-xl overflow-hidden h-full`}
      >
        {/* Header */}
        <div className={`flex items-center gap-3 mb-4`}>
          <Briefcase className={`w-5 h-5 ${theme.iconColor}`} />
          <h2 className={`text-xl font-medium ${theme.iconColor}`}>
            Career Journey
          </h2>
        </div>

        {/* Designation List */}
        <div className={`flex flex-col gap-3 w-full`}>
          {visibleDesignations.map(
            (
              {
                designation,
                department,
                organization,
                startMonth,
                startYear,
                endMonth,
                endYear,
              },
              index,
            ) => {
              // Determine the date range text
              let dateRange = "";
              if (startMonth && startYear) {
                dateRange = `${startMonth} ${startYear} - `;
                if (endMonth && endYear) {
                  dateRange += `${endMonth} ${endYear}`;
                } else {
                  dateRange += "Present";
                }
              }

              return (
                <div
                  key={index}
                  className={`flex flex-col gap-1 w-full border-b border-gray-700 pb-3 last:border-b-0`}
                >
                  <span className={`${theme.text} text-md font-semibold`}>
                    {designation}
                  </span>
                  {department && (
                    <span className={`${theme.text} text-sm`}>
                      {department}
                    </span>
                  )}
                  {organization && (
                    <span className={`${theme.text} text-sm italic`}>
                      {organization}
                    </span>
                  )}
                  {dateRange && (
                    <span className={`${theme.text} text-xs italic`}>
                      {dateRange}
                    </span>
                  )}
                </div>
              );
            },
          )}
        </div>
      </div>
    )
  );
};

export default Designations;

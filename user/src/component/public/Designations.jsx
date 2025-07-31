import React from "react";
import { Briefcase } from "lucide-react";

const Designations = ({ profile }) => {
  const designationInfo = profile?.designationInfo || [];

  // Show max 3 designations for all users
  const visibleDesignations = designationInfo.slice(0, 3);

  return (
    visibleDesignations.length > 0 && (
      <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-5 h-5 text-red-400" />
          <h2 className="text-xl font-medium text-red-400">Career Journey</h2>
        </div>

        {/* Designation List */}
        <div className="flex flex-col gap-3 w-full">
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
              index
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
                  className="flex flex-col gap-1 w-full border-b border-gray-700 pb-3 last:border-b-0"
                >
                  <span className="text-white text-md font-semibold">
                    {designation}
                  </span>
                  {department && (
                    <span className="text-gray-300 text-sm">{department}</span>
                  )}
                  {organization && (
                    <span className="text-gray-400 text-sm italic">
                      {organization}
                    </span>
                  )}
                  {dateRange && (
                    <span className="text-gray-500 text-xs italic">
                      {dateRange}
                    </span>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    )
  );
};

export default Designations;

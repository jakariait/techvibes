import React from "react";
import { Settings } from "lucide-react";

const Skills = ({ profile, user }) => {
  const isCorporate = user?.role === "corporate";
  const hasSkills = Array.isArray(profile.skills) && profile.skills.length > 0;

  return isCorporate && hasSkills ? (
      <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-white" />
          <h2 className="text-base font-medium text-white">Skills</h2>
        </div>
        <div className="text-white flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-white/10 text-white text-sm px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
  ) : null;
};

export default Skills;

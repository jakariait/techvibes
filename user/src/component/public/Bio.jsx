import React from "react";
import { UserRound } from "lucide-react";

const Bio = ({ profile }) => {
  return profile?.bio ? (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <UserRound className="w-5 h-5 text-white" />
        <h2 className="text-base font-medium text-white">Bio</h2>
      </div>
      <div className="text-white">{profile?.bio}</div>
    </div>
  ) : null;
};

export default Bio;

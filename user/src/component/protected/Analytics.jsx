import React from "react";
import Views from "./Views.jsx";
import DailyViewsChart from "./DailyViewsChart.jsx";
import { BarChart3 } from "lucide-react";

const Analytics = ({ userId, token }) => {
  return (
    <div className="grid grid-cols-1 gap-2 bg-[#212F35] inner-glow p-4 rounded-xl overflow-hidden h-full">
      <div className="flex items-center justify-center gap-2 mb-2">
        <BarChart3 className="w-5 h-5 text-green-400" />
        <h2 className="text-base font-medium text-green-400">Analytics</h2>
      </div>

      <Views userId={userId} token={token} />

      <DailyViewsChart userId={userId} token={token} />
    </div>
  );
};

export default Analytics;

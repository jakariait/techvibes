import React from "react";
import { Clock, Calendar } from "lucide-react";

const BusinessHoursCard = () => {
  return (
    <div className="bg-[#212F35] inner-glow p-6 rounded-xl overflow-hidden">
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Left side - Business Hours */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-5 text-center sm:text-left">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
            <Clock className="w-7 h-7 text-white" />
          </div>

          <div>
            <h2 className="text-white mb-1 tracking-wide">
              BUSINESS HOURS
            </h2>
            <div className="text-gray-300 text-base sm:text-lg">
              <div className="font-semibold">SAT-THU:</div>
              <div className="font-light">09:00 - 18:00 BST</div>
            </div>
          </div>
        </div>

        {/* Right side - Appointment Button */}
        <div>
          <button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 whitespace-nowrap">
            <Calendar className="w-6 h-6" />
            <span>Appointment</span>
          </button>
        </div>
      </div>
    </div>

  );
};

export default BusinessHoursCard;

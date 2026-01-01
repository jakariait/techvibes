import { useState } from "react";
import img1 from "../../assets/img1.svg";
import img2 from "../../assets/img2.svg";

export default function EcoImpactCalculator() {
  const [employees, setEmployees] = useState(100);
  const [printingCost, setPrintingCost] = useState(100);

  // Calculations
  const treesSaved = Math.round((employees * printingCost) / 2500);
  const annualSavings = employees * printingCost * 12 * 0.1075;

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto bg-slate-800/50 border-2 border-gray-200 rounded-lg p-6 sm:p-8 lg:p-12">
        <div className="space-y-8 lg:space-y-12">
          {/* Employees Slider */}
          <div className="space-y-4">
            <label className=" text-white text-xs sm:text-sm block">
              Amount of employees
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1">
                <div className="bg-[#152d5f] h-12 sm:h-14 rounded-full shadow-lg flex items-center px-4 sm:px-6">
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500 custom-range-thumb"
                  />
                </div>
              </div>
              <div className="bg-[rgba(47,75,166,0.2)] border border-gray-200 rounded px-6 sm:px-8 py-4 sm:py-6 min-w-25 sm:w-30 text-center">
                <p className=" text-white text-lg sm:text-xl">{employees}</p>
              </div>
            </div>
          </div>

          {/* Printing Cost Slider */}
          <div className="space-y-4">
            <label className=" text-white text-xs sm:text-sm block">
              Printing cost per employee (monthly)
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1">
                <div className="bg-[#152d5f] h-12 sm:h-14 rounded-full shadow-lg flex items-center px-4 sm:px-6">
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={printingCost}
                    onChange={(e) => setPrintingCost(Number(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500 custom-range-thumb"
                  />
                </div>
              </div>
              <div className="bg-[rgba(47,75,165,0.2)] border border-gray-200 rounded px-6 sm:px-8 py-4 sm:py-6 min-w-25 sm:w-30 text-center">
                <p className=" text-white text-lg sm:text-xl">
                  ${printingCost}
                </p>
              </div>
            </div>
          </div>

          {/* Results Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-8">
            {/* Bottom Line Card */}
            <div className="bg-[rgba(47,75,165,0.2)] border border-gray-200 rounded-lg p-6 sm:p-8 transform transition-transform hover:scale-105">
              <div className="flex flex-col sm:flex-row items-center gap-4 ">
                <div className="size-12  shrink-0">
                  <img
                    alt="Savings icon"
                    className="block w-full h-full"
                    src={img2}
                  />
                </div>
                <div className="text-center flex-1">
                  <p className=" text-white text-base  mb-2">
                    Bottom Line
                  </p>
                  <p className=" text-white text-2xl  mb-2">
                    ${annualSavings.toLocaleString()}
                  </p>
                  <p className=" text-gray-400 text-xs">
                    savings per year
                  </p>
                </div>
              </div>
            </div>

            {/* Trees Saved Card */}
            <div className="bg-[rgba(47,75,165,0.2)] border-2 border-gray-200 rounded-lg p-4  transform transition-transform hover:scale-105">
              <div className="flex flex-col sm:flex-row items-center gap-4 ">
                <div className="size-12  shrink-0">
                  <img
                    alt="Tree icon"
                    className="block w-full h-full"
                    src={img1}
                  />
                </div>
                <div className="text-center  flex-1">
                  <p className=" text-white text-base mb-2">
                    Trees Saved
                  </p>
                  <p className=" text-white text-2xl mb-2">
                    {treesSaved}
                  </p>
                  <p className="text-gray-400 text-xs ">
                    eco-friendly impact per year
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

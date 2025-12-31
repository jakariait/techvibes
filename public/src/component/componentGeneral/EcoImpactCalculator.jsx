import { useState } from "react";

const img =
  "https://www.figma.com/api/mcp/asset/e757f1dc-bdbb-4f9a-af44-b38c379a8151";
const img1 =
  "https://www.figma.com/api/mcp/asset/4eb666ca-1807-4597-bde2-116cd43d0b06";
const img2 =
  "https://www.figma.com/api/mcp/asset/e70bdac3-7191-48a6-8615-c3e3c60d2b95";

export default function EcoImpactCalculator() {
  const [employees, setEmployees] = useState(100);
  const [printingCost, setPrintingCost] = useState(100);

  // Calculations
  const treesSaved = Math.round(((employees * printingCost * 12) / 10000) * 4);
  const annualSavings = employees * printingCost * 12 * 0.9;

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-slate-800/50 border-2 border-gray-200 rounded-lg p-6 sm:p-8 lg:p-12">
        <h1 className="font-['Bruno_Ace',sans-serif] text-white text-2xl sm:text-3xl lg:text-4xl mb-8 text-center">
          Eco Impact Calculator
        </h1>

        <div className="space-y-8 lg:space-y-12">
          {/* Employees Slider */}
          <div className="space-y-4">
            <label className="font-['Bruno_Ace',sans-serif] text-white text-xs sm:text-sm block">
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
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <div className="absolute -top-2 left-6 sm:left-8 size-12 sm:size-16">
                  <img
                    alt="Employee icon"
                    className="block w-full h-full drop-shadow-lg"
                    src={img}
                  />
                </div>
              </div>
              <div className="bg-[rgba(47,75,166,0.2)] border border-gray-200 rounded px-6 sm:px-8 py-4 sm:py-6 min-w-[100px] sm:min-w-[120px] text-center">
                <p className="font-['Bruno_Ace',sans-serif] text-white text-lg sm:text-xl">
                  {employees}
                </p>
              </div>
            </div>
          </div>

          {/* Printing Cost Slider */}
          <div className="space-y-4">
            <label className="font-['Bruno_Ace',sans-serif] text-white text-xs sm:text-sm block">
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
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <div className="absolute -top-2 left-40 sm:left-48 size-12 sm:size-16">
                  <img
                    alt="Cost icon"
                    className="block w-full h-full drop-shadow-lg"
                    src={img}
                  />
                </div>
              </div>
              <div className="bg-[rgba(47,75,165,0.2)] border border-gray-200 rounded px-6 sm:px-8 py-4 sm:py-6 min-w-[100px] sm:min-w-[120px] text-center">
                <p className="font-['Bruno_Ace',sans-serif] text-white text-lg sm:text-xl">
                  ${printingCost}
                </p>
              </div>
            </div>
          </div>

          {/* Results Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-8">
            {/* Bottom Line Card */}
            <div className="bg-[rgba(47,75,165,0.2)] border border-gray-200 rounded-lg p-6 sm:p-8 transform transition-transform hover:scale-105">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="size-12 sm:size-16 shrink-0">
                  <img
                    alt="Savings icon"
                    className="block w-full h-full"
                    src={img2}
                  />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <p className="font-['Bruno_Ace',sans-serif] text-white text-base sm:text-xl mb-2">
                    Bottom Line
                  </p>
                  <p className="font-['Bruno_Ace',sans-serif] text-white text-2xl sm:text-4xl mb-2">
                    ${annualSavings.toLocaleString()}
                  </p>
                  <p className="font-['Bruno_Ace',sans-serif] text-gray-400 text-xs sm:text-sm">
                    savings per year
                  </p>
                </div>
              </div>
            </div>

            {/* Trees Saved Card */}
            <div className="bg-[rgba(47,75,165,0.2)] border-2 border-gray-200 rounded-lg p-6 sm:p-8 transform transition-transform hover:scale-105">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="size-12 sm:size-16 shrink-0">
                  <img
                    alt="Tree icon"
                    className="block w-full h-full"
                    src={img1}
                  />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <p className="font-['Bruno_Ace',sans-serif] text-white text-base sm:text-xl mb-2">
                    Trees Saved
                  </p>
                  <p className="font-['Bruno_Ace',sans-serif] text-white text-2xl sm:text-4xl mb-2">
                    {treesSaved}
                  </p>
                  <p className="font-['Bruno_Ace',sans-serif] text-gray-400 text-xs sm:text-sm">
                    eco-friendly impact per year
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Text */}
          <div className="mt-8 p-4 sm:p-6 bg-slate-700/30 rounded-lg">
            <p className="font-['Bruno_Ace',sans-serif] text-gray-300 text-xs sm:text-sm text-center">
              Adjust the sliders above to see how going paperless can impact
              your bottom line and the environment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

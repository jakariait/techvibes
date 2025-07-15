import React from 'react';

export default function TechVibesCard() {
  return (
    <div className="bg-[#212F35] inner-glow p-4 rounded-xl w-full mx-auto text-center">
      {/* Header */}
      <h1 className="text-base font-light text-white mb-2">
        Powered by <span className="text-blue-400 font-medium">TechVibes</span>
      </h1>

      {/* Tap Tap Tap */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-white text-sm font-light tracking-wide">Tap</span>
        <div className="w-2 h-2 bg-blue-400 rounded-full" />
        <span className="text-white text-sm font-light tracking-wide">Connect</span>
        <div className="w-2 h-2 bg-blue-400 rounded-full" />
        <span className="text-white text-sm font-light tracking-wide">Grow</span>
      </div>
    </div>
  );
}

import React from 'react';

const AIDesignSystem = () => {
  const cards = [
    {
      title: "UX Copy That Clicks",
      description: "We use AI to create effective copies like CTAs and microcopy that speaks.",
      visual: (
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-16 bg-indigo-900/40 rounded-lg border border-indigo-500/30" />
          <div className="w-20 h-20 bg-indigo-900/40 rounded-full border border-indigo-500/30" />
          <div className="w-16 h-16 bg-indigo-900/40 rounded-lg border border-indigo-500/30" />
        </div>
      )
    },
    {
      title: "Visuals, Instantly on Point",
      description: "We use AI to create effective copies like CTAs and microcopy that speaks.",
      visual: (
        <div className="relative h-48 flex items-center justify-center mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-48 bg-gradient-to-b from-indigo-500/40 via-purple-500/60 to-indigo-500/40 rounded-full blur-2xl" />
          </div>
          <div className="relative">
            <svg viewBox="0 0 100 120" className="w-24 h-32">
              <path
                d="M 50 10 Q 30 40 50 60 Q 70 40 50 10 M 50 60 Q 30 80 50 110 Q 70 80 50 60"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                className="drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute bottom-4 text-xs text-indigo-300/60">
            Quick line interactions
          </div>
        </div>
      )
    },
    {
      title: "Data-Led Design Decisions",
      description: "We use AI to create effective copies like CTAs and microcopy that speaks.",
      visual: (
        <div className="flex items-end justify-center gap-3 mb-6 h-32">
          <div className="w-12 h-20 bg-indigo-500/30 rounded-t border border-indigo-400/40" />
          <div className="w-12 h-28 bg-indigo-500/30 rounded-t border border-indigo-400/40" />
          <div className="w-12 h-32 bg-indigo-500/50 rounded-t border border-indigo-400/60 shadow-[0_0_20px_rgba(99,102,241,0.4)]" />
          <div className="w-12 h-24 bg-indigo-500/30 rounded-t border border-indigo-400/40" />
        </div>
      )
    }
  ];

  const bottomCards = [
    {
      title: "Smarter & Faster Wireframes",
      description: "We rapidly turn ideas into functional wireframes using AI tools, with less",
      visual: (
        <div className="space-y-4">
          <div className="h-12 bg-indigo-600/30 rounded border border-indigo-500/40 flex items-center justify-center text-sm font-medium text-indigo-200">
            Smarter
          </div>
          <div className="h-12 bg-indigo-600/30 rounded border border-indigo-500/40 flex items-center justify-center text-sm font-medium text-indigo-200">
            Faster
          </div>
        </div>
      )
    },
    {
      title: "Smarter & Faster Wireframes",
      description: "We rapidly turn ideas into functional wireframes using AI tools, with less",
      visual: (
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-1 h-16 bg-indigo-600/40 rounded-lg border border-indigo-500/50" />
            <div className="flex-1 h-16 bg-indigo-600/40 rounded-lg border border-indigo-500/50" />
            <div className="flex-1 h-16 bg-indigo-600/40 rounded-lg border border-indigo-500/50" />
          </div>
          <div className="h-3 bg-indigo-600/30 rounded w-3/4" />
          <div className="h-3 bg-indigo-600/30 rounded w-1/2" />
        </div>
      )
    },
    {
      title: "Smarter & Faster Wireframes",
      description: "We rapidly turn ideas into functional wireframes using AI tools, with less",
      visual: (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 bg-indigo-600/40 rounded border border-indigo-500/50" />
            <div className="h-12 bg-indigo-600/40 rounded border border-indigo-500/50" />
            <div className="h-12 bg-indigo-600/50 rounded border border-indigo-500/60 shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
          </div>
          <div className="h-16 bg-indigo-600/40 rounded border border-indigo-500/50" />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-8 overflow-x-auto">
      <div className="min-w-[1200px] max-w-7xl mx-auto">
        {/* Top Row */}
        <div className="grid grid-cols-3 gap-6 mb-24">
          {cards.map((card, idx) => (
            <div key={idx} className="relative">
              <div className="bg-slate-900/50 backdrop-blur border border-indigo-500/20 rounded-xl p-6 hover:border-indigo-500/40 transition-all duration-300">
                <h3 className="text-indigo-200 font-medium mb-2 text-sm tracking-wide">
                  {card.title}
                </h3>
                <p className="text-indigo-300/60 text-xs mb-6 leading-relaxed">
                  {card.description}
                </p>
                {card.visual}
              </div>
              {/* Connection point */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_15px_rgba(129,140,248,0.8)]" />
            </div>
          ))}
        </div>

        {/* Center Hub */}
        <div className="relative h-48 mb-24">
          {/* Connection lines from top */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '-96px', height: 'calc(100% + 192px)' }}>
            {/* Lines from top cards to center */}
            <line x1="16.67%" y1="96" x2="50%" y2="192" stroke="url(#lineGradient1)" strokeWidth="2" />
            <line x1="50%" y1="96" x2="50%" y2="192" stroke="url(#lineGradient1)" strokeWidth="2" />
            <line x1="83.33%" y1="96" x2="50%" y2="192" stroke="url(#lineGradient1)" strokeWidth="2" />

            {/* Lines from center to bottom */}
            <line x1="16.67%" y1="192" x2="16.67%" y2="288" stroke="url(#lineGradient2)" strokeWidth="2" />
            <line x1="50%" y1="192" x2="50%" y2="288" stroke="url(#lineGradient2)" strokeWidth="2" />
            <line x1="83.33%" y1="192" x2="83.33%" y2="288" stroke="url(#lineGradient2)" strokeWidth="2" />

            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-4 bg-indigo-400/50 rounded-full blur-2xl" />
              <div className="absolute inset-8 bg-indigo-300/70 rounded-full blur-xl" />
              <div className="absolute inset-12 bg-indigo-200 rounded-full shadow-[0_0_50px_rgba(165,180,252,0.9)]" />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-6">
          {bottomCards.map((card, idx) => (
            <div key={idx} className="relative">
              {/* Connection point */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_15px_rgba(129,140,248,0.8)]" />

              <div className="bg-slate-900/50 backdrop-blur border border-indigo-500/20 rounded-xl p-6 hover:border-indigo-500/40 transition-all duration-300">
                <h3 className="text-indigo-200 font-medium mb-2 text-sm tracking-wide">
                  {card.title}
                </h3>
                <p className="text-indigo-300/60 text-xs mb-6 leading-relaxed">
                  {card.description}
                </p>
                {card.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIDesignSystem;
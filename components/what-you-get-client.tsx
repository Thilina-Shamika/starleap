"use client";

type Column = {
  heading?: string;
  bullets: string[];
};

export function WhatYouGetClient({ columns }: { columns: Column[] }) {
  if (!columns || columns.length === 0) return null;

  const [left, right] = [columns[0], columns[1] ?? { bullets: [] }];

  // Icons
  const {
    Film,
    Scissors,
    Music,
    Sparkles,
    Share2,
    BarChart3,
    Calendar,
    TrendingUp,
    Send,
  } = require("lucide-react");

  function iconsFor(heading?: string) {
    const name = (heading || '').toLowerCase();
    if (name.includes('content') || name.includes('edit')) {
      return [
        { C: Film, label: 'Video' },
        { C: Scissors, label: 'Editing' },
        { C: Music, label: 'Audio' },
        { C: Sparkles, label: 'Branding' },
      ];
    }
    // Optimization & Posting
    return [
      { C: Share2, label: 'Multi-platform' },
      { C: BarChart3, label: 'Insights' },
      { C: Calendar, label: 'Scheduling' },
      { C: TrendingUp, label: 'Optimization' },
    ];
  }

  return (
    <section className="px-4 py-10 md:py-14">
      <div className="w-full">
        {/* Single rounded container with two columns */}
        <div className="relative w-full rounded-[28px] md:rounded-[32px] border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] py-[160px] md:py-[180px]">
          {/* Gradient overlay similar to reference (teal to purple) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/25 via-teal-500/10 to-purple-600/30" />

          {/* Eyebrow title inside at top-left */}
          <div className="absolute top-6 left-8 md:top-8 md:left-12 text-base md:text-lg tracking-wide text-white/80 z-10">
            <span className="font-medium">What </span>
            <span className="font-bold text-white">You Get</span>
          </div>

          {/* Centered content */}
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center px-8 md:px-12">
            {/* Left column */}
            <div className="px-8 md:px-12">
              {left?.heading && (
                <h3 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                  {left.heading}
                </h3>
              )}
              <div className="mb-5 flex flex-wrap items-center gap-3 text-white/80">
                {iconsFor(left?.heading).map(({ C, label }, i) => (
                  <C key={i} aria-label={label} title={label} className="h-5 w-5" />
                ))}
              </div>
              <ul className="space-y-3 text-white/90">
                {left?.bullets?.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="mt-1.5 h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    <span className="text-[16px] leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column */}
            <div className="px-8 md:px-12">
              {right?.heading && (
                <h3 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                  {right.heading}
                </h3>
              )}
              <div className="mb-5 flex flex-wrap items-center gap-3 text-white/80">
                {iconsFor(right?.heading).map(({ C, label }, i) => (
                  <C key={i} aria-label={label} title={label} className="h-5 w-5" />
                ))}
              </div>
              <ul className="space-y-3 text-white/85">
                {right?.bullets?.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="mt-1.5 h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    <span className="text-[16px] leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



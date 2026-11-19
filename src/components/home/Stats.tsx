import StatsCard from "./StatsCard";

// Real figures from the capability guide at ezrecruit.ai/nyra (10 Nov 2026).
// Bar fills are decoration only, not figures.
const STATS = [
  { value: "100+", text: "Things Nyra can do for you today, live in production.", fill: 0.99, delay: 0.15, href: "/nyra/#capabilities" },
  { value: "36", text: "Actions that get work done: book, reject, send, log. Each one previewed first.", fill: 0.72, delay: 0.25 },
  { value: "30+", text: "Numbers she answers in seconds, from time to fill to revenue.", fill: 0.5, delay: 0.35 },
];

export default function Stats() {
  return (
    <section id="results" data-section="Stats" className="flex flex-col items-center px-5 py-18 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="flex w-full max-w-[1136px] flex-col gap-10 lg:gap-14">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-12">
          <h2 data-reveal className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px] md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px]
            lg:flex-1 lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">Nyra, by the numbers.</h2>
          <p data-reveal style={{ "--d": "0.1s" } as React.CSSProperties} className="text-[17px] leading-[24.65px] tracking-[-0.17px] text-muted md:text-lg md:leading-[26.1px] lg:w-[360px]">
            Ask in English, Hindi or Hinglish. Every number comes from your own EZRecruit data.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-3 md:gap-5">
          {STATS.map((s, i) => <StatsCard key={s.value} {...s} d={`${i * 0.1}s`} />)}
        </div>
      </div>
    </section>
  );
}

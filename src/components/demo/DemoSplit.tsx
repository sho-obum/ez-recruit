import NyraMark from "../home/NyraMark";
import DemoForm from "./DemoForm";

const STEPS = [
  ["Tell us about your agency", "A short form, about a minute."],
  ["We walk through EZRecruit", "30 minutes with our team, on your own jobs."],
  ["We help you bring your data in", "Most teams are ready in a few days."],
];

// One screen on desktop: a sky-blue panel that says what happens next, and the form beside it.
export default function DemoSplit() {
  return (
    <section data-section="Demo" className="flex flex-col items-center px-4 pt-20 pb-4 md:px-6 lg:h-dvh lg:px-8">
      <div className="grid w-full max-w-[1240px] gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
        <div className="relative flex flex-col justify-between gap-8 overflow-clip rounded-[28px] bg-[linear-gradient(125deg,#e4f3ff_0%,#9fd8ff_38%,#c9ebff_58%,#62bdf6_100%)] p-7 md:rounded-[40px] md:p-10 lg:p-12 [@media(max-height:720px)]:lg:gap-5 [@media(max-height:720px)]:lg:py-7">
          <div className="flex flex-col items-start gap-5">
            <span className="flex items-center gap-2 rounded-full bg-white/70 py-1.5 pr-3.5 pl-2.5 text-sm text-ink-2">
              <NyraMark size={16} once className="text-blue-deep" />Book a demo
            </span>
            <h1 className="fade-up max-w-[560px] text-[40px] leading-[1] font-medium tracking-[-0.05em] text-balance md:text-[56px] xl:text-[64px] [@media(max-height:720px)]:lg:text-[44px] [@media(max-height:720px)]:xl:text-[44px]">See EZRecruit on your own jobs.</h1>
            <p className="max-w-[440px] text-lg leading-[1.5] text-balance text-ink-2 [@media(max-height:720px)]:lg:hidden">A 30-minute walkthrough with our team, shaped around how your agency works.</p>
          </div>

          <ol className="flex flex-col gap-2.5">
            {STEPS.map(([title, text], i) => (
              <li key={title} data-reveal style={{ "--d": `${i * 0.1}s` } as React.CSSProperties} className="flex items-center gap-4 rounded-2xl bg-white/75 px-4 py-3.5 [@media(max-height:720px)]:lg:py-2.5">
                <span className="grid size-8 flex-none place-items-center rounded-full bg-blue-soft font-display text-sm font-semibold text-blue-deep">{i + 1}</span>
                <span className="flex flex-col">
                  <span className="text-base leading-6 font-medium">{title}</span>
                  <span className="text-[14px] leading-5 text-muted [@media(max-height:720px)]:lg:hidden">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <DemoForm />
      </div>
    </section>
  );
}

import Icon, { type IconName } from "../Icon";
import { GlowingEffect } from "../ui21/glowing-effect";

// The four reasons from the capability guide; each card's border glows toward the pointer.
const WHY: { icon: IconName; title: string; text: string }[] = [
  { icon: "clock", title: "Answers in seconds", text: "Job status, at-risk roles, funnels, time to fill, revenue: read straight from your own EZRecruit data, with a link to the page behind every number." },
  { icon: "check", title: "Actions, not just answers", text: "Book and reschedule interviews, reject with a reason, log joinings, send trackers to clients, create jobs from a brief, all from one chat panel." },
  { icon: "shield", title: "Safe by design", text: "Every change is previewed and confirmed. Reversible actions have a 30-second undo. Nyra sees only what each user is allowed to see." },
  { icon: "target", title: "Onboarding on autopilot", text: "Guided page tours, step-by-step hiring walkthroughs and instant Knowledge Center answers get new users productive on day one." },
];

export default function NyraWhy() {
  return (
    <section id="why" className="flex flex-col items-center px-5 py-18 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="flex w-full max-w-[1136px] flex-col gap-10 lg:gap-14">
        <h2 data-reveal className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px] md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px] lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">
          Less clicking.<br />More hiring.
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {WHY.map((w, i) => (
            <li key={w.title} data-reveal style={{ "--d": `${(i % 2) * 0.1}s` } as React.CSSProperties} className="relative rounded-[28px] border border-line p-2">
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <div className="relative flex h-full flex-col gap-4 rounded-[20px] bg-fill-2 p-6 md:p-8">
                <span className="grid size-11 place-items-center rounded-full bg-white text-blue-deep shadow-[inset_0_0_0_1px_var(--color-line)]"><Icon name={w.icon} size={19} /></span>
                <h3 className="text-[22px] leading-[26px] font-medium tracking-[-0.66px] md:text-2xl md:leading-[28px]">{w.title}</h3>
                <p className="text-base leading-6 text-muted">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Icon, { type IconName } from "../Icon";
import NyraMark from "../home/NyraMark";
import { AnimatedBeam } from "../ui21/animated-beam";
import { AnimatedList } from "../ui21/animated-list";

// Sample briefing: the kinds of items are from the guide, the figures are illustrative.
const PLATE: { icon: IconName; title: string; text: string }[] = [
  { icon: "calendar", title: "3 interviews today", text: "First one at 11:30" },
  { icon: "message", title: "2 feedback forms you owe", text: "JC-2041 and JC-1877" },
  { icon: "clock", title: "1 reminder due", text: "Call Priya about the offer" },
  { icon: "target", title: "Goal: 4 of 6 closures", text: "This month" },
  { icon: "mail", title: "1 item waiting on you", text: "Tracker for Acme Corp" },
];
const SOURCES: { icon: IconName; label: string }[] = [
  { icon: "briefcase", label: "Jobs" }, { icon: "users", label: "Candidates" }, { icon: "building", label: "Clients" },
  { icon: "calendar", label: "Interviews" }, { icon: "chart", label: "Reports" }, { icon: "mail", label: "Mailbox" },
];
const CARD = "relative flex flex-col gap-6 overflow-clip rounded-[40px] border border-line bg-fill-2 p-7 md:p-9";
const NODE = "relative z-[1] grid size-12 place-items-center rounded-full bg-white text-ink-2 shadow-[inset_0_0_0_1px_var(--color-line),0_10px_20px_-12px_rgba(20,20,20,0.3)]";

// Two live pieces: the morning briefing filling in, and beams of data flowing into Nyra.
export default function NyraDay() {
  const box = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const n0 = useRef<HTMLDivElement>(null), n1 = useRef<HTMLDivElement>(null), n2 = useRef<HTMLDivElement>(null);
  const n3 = useRef<HTMLDivElement>(null), n4 = useRef<HTMLDivElement>(null), n5 = useRef<HTMLDivElement>(null);
  const nodes = [n0, n1, n2, n3, n4, n5];

  return (
    <section id="day" className="flex flex-col items-center px-5 pb-18 md:px-6 md:pb-24 lg:px-8 lg:pb-32">
      <div className="grid w-full max-w-[1136px] gap-4 lg:grid-cols-2">
        <div data-reveal className={CARD}>
          <div className="flex flex-col gap-2">
            <h3 className="text-[26px] leading-[30px] font-semibold tracking-[-1px] md:text-[32px] md:leading-[35px]">&ldquo;What&apos;s on my plate?&rdquo;</h3>
            <p className="max-w-[420px] text-base leading-6 text-muted">Start every day knowing exactly what needs you: today&apos;s interviews, feedback you owe, reminders, goals and items waiting on you.</p>
          </div>
          <div aria-hidden="true" className="relative h-[340px] overflow-clip [mask-image:linear-gradient(#000_70%,transparent)]">
            <AnimatedList delay={1600} className="items-stretch! gap-2.5!">
              {PLATE.map(p => (
                <div key={p.title} className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-[inset_0_0_0_1px_var(--color-line)]">
                  <span className="grid size-10 flex-none place-items-center rounded-full bg-blue-soft text-blue-deep"><Icon name={p.icon} size={17} /></span>
                  <span className="flex flex-col"><span className="text-[15px] leading-5 font-medium">{p.title}</span><span className="text-sm leading-5 text-muted">{p.text}</span></span>
                </div>
              ))}
            </AnimatedList>
          </div>
          <p className="text-sm leading-5 text-faint">Sample briefing.</p>
        </div>

        <div data-reveal style={{ "--d": "0.1s" } as React.CSSProperties} className={CARD}>
          <div className="flex flex-col gap-2">
            <h3 className="text-[26px] leading-[30px] font-semibold tracking-[-1px] md:text-[32px] md:leading-[35px]">Answers from your own data.</h3>
            <p className="max-w-[420px] text-base leading-6 text-muted">Nyra reads straight from your EZRecruit account, with a link to the page behind every number. She sees only what each user is allowed to see.</p>
          </div>
          <div ref={box} aria-hidden="true" className="relative flex h-[340px] items-center justify-between px-1 md:px-6">
            <div className="flex h-full flex-col justify-between py-4">
              {SOURCES.slice(0, 3).map((s, i) => <div key={s.label} ref={nodes[i]} title={s.label} className={NODE}><Icon name={s.icon} size={19} /></div>)}
            </div>
            <div ref={hub} className="relative z-[1] grid size-20 place-items-center rounded-full bg-blue-deep text-white shadow-[0_0_0_10px_rgba(58,168,242,0.14),0_20px_40px_-16px_rgba(15,111,184,0.7)]">
              <NyraMark size={36} />
            </div>
            <div className="flex h-full flex-col justify-between py-4">
              {SOURCES.slice(3).map((s, i) => <div key={s.label} ref={nodes[i + 3]} title={s.label} className={NODE}><Icon name={s.icon} size={19} /></div>)}
            </div>
            {nodes.map((n, i) => (
              <AnimatedBeam key={i} containerRef={box} fromRef={n} toRef={hub} reverse={i >= 3}
                curvature={i % 3 === 0 ? -60 : i % 3 === 2 ? 60 : 0} duration={4 + (i % 3)} delay={i * 0.4}
                pathColor="#0f6fb8" pathOpacity={0.14} gradientStartColor="#9fd8ff" gradientStopColor="#0f6fb8" />
            ))}
          </div>
          <p className="text-sm leading-5 text-faint">Jobs, candidates, clients, interviews, reports and your mailbox.</p>
        </div>
      </div>
    </section>
  );
}

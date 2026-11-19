"use client";

import BuildStars from "../home/BuildStars";
import { useRef } from "react";
import { askNyra, openNyra } from "../home/NyraLive";
import { NumberTicker } from "../ui21/number-ticker";
import { PlaceholdersAndVanishInput } from "../ui21/placeholders-and-vanish-input";

// Real prompts from the capability guide, in English and Hinglish.
const ASKS = [
  "Find Java developers in Bangalore with 5+ years",
  "mere kitne interviews hain is week",
  "Book Priya for JC-2041 tomorrow at 3pm",
  "JC-2041 ka status",
  "Ravi joined yesterday",
  "Rahul ka interview cancel kar do",
  "Send the tracker for JC-2041 to the client",
  "What's on my plate?",
];
const STATS: { value: number; plus?: boolean; label: string; href?: string }[] = [
  { value: 100, plus: true, label: "Live capabilities", href: "#capabilities" },
  { value: 36, label: "Actions that get work done" },
  { value: 30, plus: true, label: "Instant metrics" },
  { value: 3, label: "Languages" },
];

// Dark hero: star backdrop, the pitch, a prompt bar that cycles real asks, and the four live numbers.
export default function NyraHero() {
  const typed = useRef("");
  return (
    <section className="relative flex flex-col items-center overflow-clip rounded-b-[28px] bg-night px-5 pt-36 pb-16 text-white md:rounded-b-[40px] md:px-8 md:pt-44 md:pb-20">
      <BuildStars />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_40%,rgba(11,11,13,0.25)_0%,rgba(11,11,13,0.8)_60%,#0b0b0d_100%)]" />

      <div className="relative z-[1] flex w-full max-w-[900px] flex-col items-center gap-7 text-center">
        <h1 className="fade-up text-[56px] leading-[0.95] font-medium tracking-[-0.05em] md:text-[96px] lg:text-[128px]">Meet Nyra.</h1>
        <p className="max-w-[620px] text-lg leading-[1.5] text-balance text-white/65 md:text-xl">
          The recruiter&apos;s copilot that actually does the work. Search, schedule, shortlist, chase feedback and answer every number your managers ask for, just by asking.
        </p>
        <div className="w-full pt-2">
          <PlaceholdersAndVanishInput placeholders={ASKS} onChange={e => { typed.current = e.target.value; }}
            onSubmit={() => { const q = typed.current.trim(); typed.current = ""; setTimeout(() => (q ? askNyra(q) : openNyra()), 900); }} />
          <p className="pt-4 text-sm leading-5 text-white/45">Ask in English or Hinglish. The demo plays it on sample data, just like inside EzRecruit.</p>
        </div>
      </div>

      <dl className="relative z-[1] mt-16 grid w-full max-w-[1120px] grid-cols-2 gap-3 md:mt-20 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className={`relative flex flex-col gap-2 rounded-[24px] border border-white/10 bg-white/6 px-5 py-5 md:p-6 ${s.href ? "transition-colors hover:bg-white/10" : ""}`}>
            <dd className="font-display text-[44px] leading-none font-medium tracking-[-0.05em] md:text-[56px]">
              <NumberTicker value={s.value} delay={0.2 + i * 0.15} />{s.plus && "+"}
            </dd>
            <dt className="text-sm leading-5 text-white/55">
              {s.href ? <a href={s.href} className="underline underline-offset-4 before:absolute before:inset-0 before:rounded-[24px]">{s.label}</a> : s.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

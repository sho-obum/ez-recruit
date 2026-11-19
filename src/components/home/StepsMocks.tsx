"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../Icon";
import { openNyra } from "./NyraLive";

// True while the element is on screen; reduced motion skips straight to the end state.
export function useLive<T extends Element>() {
  const ref = useRef<T>(null);
  const [live, setLive] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setReduced(true); return; }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.35 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return { ref, live, reduced };
}

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-6 flex-none animate-spin [animation-duration:1.2s] motion-reduce:animate-none ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="#e4f3ff" strokeWidth="2" />
      <path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="#3aa8f2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`size-6 flex-none text-green ${className}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const BRIEFS = [
  "Acme needs a senior Java developer in Pune. 6+ years, Spring Boot, can join within 30 days.",
  "Hiring 2 backend engineers for a fintech client. Microservices and AWS, hybrid in Bengaluru.",
];

// Step 1: the client's brief types itself out, then Nyra writes the job description.
export function BriefMock() {
  const { ref, live, reduced } = useLive<HTMLDivElement>();
  const [k, setK] = useState(0);
  const [n, setN] = useState(0);
  const [phase, setPhase] = useState<"type" | "write" | "done">("type");
  const text = BRIEFS[k];

  useEffect(() => {
    if (reduced) { setN(BRIEFS[0].length); setPhase("done"); }
  }, [reduced]);

  useEffect(() => {
    if (!live || reduced) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "type") {
      t = n < text.length ? setTimeout(() => setN(n + 1), n === 0 ? 700 : 32) : setTimeout(() => setPhase("write"), 500);
    } else if (phase === "write") {
      t = setTimeout(() => setPhase("done"), 2600);
    } else {
      t = setTimeout(() => { setK((k + 1) % BRIEFS.length); setN(0); setPhase("type"); }, 2600);
    }
    return () => clearTimeout(t);
  }, [live, reduced, phase, n, text, k]);

  return (
    <div ref={ref} className="absolute top-10 left-6 flex h-[302px] w-[374px] flex-col justify-between rounded-[18px] bg-white/80 px-[22px] pt-[22px] pb-4 backdrop-blur-[10px]
      md:top-6 md:h-[430px] md:w-[460px] lg:top-[91px] lg:left-10 lg:h-[228px] lg:w-[374px]">
      <p className="pr-6 text-base leading-6 tracking-[-0.1px] text-ink">
        {text.slice(0, n)}
        {phase === "type" && <span className="ml-0.5 inline-block h-[18px] w-[1.5px] translate-y-[3px] animate-pulse bg-blue-deep" />}
      </p>
      <div className="flex h-[41px] items-center gap-3">
        <span className="flex min-w-0 flex-1 items-center gap-2 text-sm tracking-[-0.1px] text-ink-2">
          {phase === "type" && <><Icon name="file" size={16} className="flex-none" />Client brief</>}
          {phase === "write" && <><Spinner className="size-4" /><span className="truncate">Nyra is writing the job description</span></>}
          {phase === "done" && <><Tick className="size-4" /><span className="truncate">Job description ready</span></>}
        </span>
        <button type="button" onClick={openNyra}
          className="flex h-[41px] flex-none items-center gap-1.5 rounded-full bg-blue-deep px-[18px] text-[15px] font-medium tracking-[-0.1px] text-white transition-colors hover:bg-blue-press">
          Write it <Icon name="sparkle" size={14} />
        </button>
      </div>
    </div>
  );
}

// Tiles around the Nyra mark, placed in percent of the panel so the lines (drawn in a 100x100 box) meet them.
const TILES = [
  { label: "CVs", icon: "file", x: 16.7, y: 30.5 },
  { label: "Job description", icon: "briefcase", x: 16.7, y: 50 },
  { label: "Your database", icon: "database", x: 16.7, y: 69.5 },
  { label: "Skills", icon: "target", x: 83.3, y: 30.5 },
  { label: "Experience", icon: "trending", x: 83.3, y: 50 },
  { label: "Notice period", icon: "clock", x: 83.3, y: 69.5 },
] as const;

// The panel keeps a fixed 384x410 aspect ratio, so the SVG can use that box and scale evenly.
const curve = (x: number, y: number) => {
  const [cx, cy, tx, ty, mx] = [192, 205, x * 3.84, y * 4.1, (192 + x * 3.84) / 2];
  return `M${cx} ${cy} C ${mx} ${cy}, ${mx} ${ty}, ${tx} ${ty}`;
};

// Step 2: Nyra in the middle, data flowing in from six sources along the lines.
export function ConnectMock() {
  return (
    <div className="absolute inset-0">
      <style>{`
        @keyframes steps-flow { from { stroke-dashoffset: 1.25; } to { stroke-dashoffset: 0; } }
        .steps-pulse { stroke-dasharray: 0.25 1; animation: steps-flow 2.4s cubic-bezier(0.45,0,0.55,1) infinite; }
        @media (prefers-reduced-motion: reduce) { .steps-pulse { animation: none; stroke-dashoffset: 1.25; } }
      `}</style>
      <svg viewBox="0 0 384 410" className="absolute inset-0 size-full" aria-hidden="true">
        {TILES.map((t, i) => (
          <g key={t.label}>
            <path d={curve(t.x, t.y)} fill="none" stroke="rgba(56,170,255,0.55)" strokeWidth="2" />
            {/* the path runs centre to tile; reversing the offset makes the pulse travel tile to centre */}
            <path d={curve(t.x, t.y)} pathLength={1} fill="none" stroke="#3aa8f2" strokeWidth="2" strokeLinecap="round"
              className="steps-pulse" style={{ animationDelay: `${i * 0.4}s`, animationDirection: "reverse" }} />
          </g>
        ))}
      </svg>
      {TILES.map(t => (
        <div key={t.label} className="absolute flex -translate-x-1/2 -translate-y-[22px] flex-col items-center gap-1.5" style={{ left: `${t.x}%`, top: `${t.y}%` }}>
          <span className="grid size-11 place-items-center rounded-xl bg-white text-ink shadow-[0_4px_12px_-4px_rgba(0,40,120,0.25)]">
            <Icon name={t.icon} size={20} stroke={1.75} />
          </span>
          <span className="rounded-full bg-white/70 px-1.5 text-[11px] leading-4 font-medium whitespace-nowrap text-ink-2 backdrop-blur-sm">{t.label}</span>
        </div>
      ))}
      <button type="button" onClick={openNyra} aria-label="Ask Nyra"
        className="absolute top-1/2 left-1/2 grid size-16 -translate-1/2 place-items-center rounded-2xl bg-white shadow-[0_8px_24px_-8px_rgba(58,168,242,0.45)]">
        <span className="absolute inset-0 animate-ping rounded-2xl bg-blue/10 [animation-duration:2.4s] motion-reduce:hidden" />
        <NyraMark />
      </button>
    </div>
  );
}

function NyraMark() {
  return (
    <svg viewBox="0 0 24 24" className="relative size-9" aria-hidden="true">
      <defs>
        <linearGradient id="steps-nyra" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7cc8fb" /><stop offset="1" stopColor="#3aa8f2" />
        </linearGradient>
      </defs>
      <path fill="url(#steps-nyra)" d="M12 2c.5 4.6 2.9 7.3 8 8.2v1.6c-5.1.9-7.5 3.6-8 8.2h-.1c-.5-4.6-2.9-7.3-8-8.2v-1.6c5.1-.9 7.5-3.6 8-8.2z" />
      <circle cx="19" cy="4.5" r="1.6" fill="#7cc8fb" />
    </svg>
  );
}

const TASKS = ["Reading the brief", "Writing the job description", "Searching your candidates", "Scoring matches", "Building the client tracker"];

// Step 3: Nyra works through the shortlist, ticking tasks off one at a time, then starts again.
export function ChecklistMock() {
  const { ref, live, reduced } = useLive<HTMLDivElement>();
  const [step, setStep] = useState(0);

  useEffect(() => { if (reduced) setStep(TASKS.length); }, [reduced]);
  useEffect(() => {
    if (!live || reduced) return;
    const t = setTimeout(() => setStep(step >= TASKS.length ? 0 : step + 1), step >= TASKS.length ? 2800 : step === 0 ? 900 : 1300);
    return () => clearTimeout(t);
  }, [live, reduced, step]);

  const busy = step < TASKS.length;
  return (
    <div ref={ref} className="absolute top-1/2 right-8 left-8 -translate-y-1/2 rounded-2xl bg-white/80 backdrop-blur-[10px]">
      <style>{`@keyframes steps-pop { from { opacity: 0; transform: scale(0.4); } }`}</style>
      <div className="flex items-center gap-3 p-4">
        <span aria-hidden="true" className="grid grid-cols-3 gap-[3px]">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className={`size-[5px] rounded-full bg-blue ${busy ? "animate-pulse motion-reduce:animate-none" : ""}`}
              style={{ opacity: busy ? 0.35 + ((i * 3) % 7) / 10 : 1, animationDelay: `${(i % 3) * 0.2}s` }} />
          ))}
        </span>
        <span className="text-base font-medium tracking-[-0.1px] text-ink">{busy ? "Nyra is preparing the shortlist" : "Shortlist ready"}</span>
      </div>
      <ul className="pt-2 pb-[9px]">
        {TASKS.map((task, i) => (
          <li key={task} className="flex h-12 items-center gap-3 px-4 text-sm tracking-[-0.1px]">
            {i < step
              ? <Tick className="animate-[steps-pop_0.45s_var(--ease-out)_both] motion-reduce:animate-none" />
              : i === step ? <Spinner /> : <span className="grid size-6 flex-none place-items-center"><span className="size-[18px] rounded-full border-2 border-[#e4f3ff]" /></span>}
            <span className={i <= step ? "text-ink-2" : "text-faint"}>{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Icon, { type IconName } from "../Icon";
import { Badge, CANDIDATES } from "./Nyra";
import NyraMark from "./NyraMark";
import { openNyra } from "./NyraLive";

// Three jobs Nyra does in the product; each chat ends in its own result (sample data).
export const SCENES: { icon: IconName; title: string; text: string; ask: string; msg: string }[] = [
  { icon: "search", title: "Find the right people", text: "A score for each candidate, with the reason",
    ask: "Who are the best people for the Java role at Acme?",
    msg: "I checked your candidates for the Java role at Acme. Here are the 3 best matches, with reasons." },
  { icon: "check", title: "Build the screening", text: "Skills and questions from the job description",
    ask: "Set up screening for the Java role at Acme.",
    msg: "I read the job description. Here are the skills and questions I suggest. You confirm what counts." },
  { icon: "file", title: "Draft the answers", text: "Screening answers from the CV, for you to check",
    ask: "Draft Arjun's screening answers.",
    msg: "I drafted Arjun Mehta's answers from his CV. Please check them before you use them." },
];
const SKILLS = [{ label: "Must have", items: ["Java 11+", "Spring Boot", "Microservices"] }, { label: "Nice to have", items: ["AWS", "Kafka"] }];
const QUESTIONS = ["How many years have you worked with Spring Boot?", "Have you run microservices in production?", "What is your notice period?"];
const ANSWERS = [
  { q: "Years with Spring Boot?", a: "6 years", cv: true },
  { q: "Microservices in production?", a: "Yes, in his last two roles", cv: true },
  { q: "Notice period?", a: "Not in the CV. Ask Arjun.", cv: false },
];
const ROW = "mt-2 rounded-xl bg-white px-3 py-2.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]";
const LABEL = "text-[12.5px] leading-[18px] text-black/50";
const CHIPS = ["Show me the top 3", "Build the screening", "Draft the answers"];

// Pause before each step: 0 asked, 1 thinking, 2 typing, 3 to 5 match rows, 6 suggestions label, 7 to 9 chips.
const WAIT = [500, 1500, 300, 420, 420, 420, 350, 240, 240];
const DONE = WAIT.length;
const EASE = [0.22, 1, 0.36, 1] as const;

function Score({ to, run, reduce }: { to: number; run: boolean; reduce: boolean }) {
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!run) return;
    if (reduce) { setV(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 800);
      setV(Math.round(to * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, reduce]);
  return (
    <div className="w-[52px] flex-none text-right">
      <p className="leading-5"><b className="text-[15px] font-semibold tabular-nums">{v}</b><span className="text-[11px] text-black/40">/100</span></p>
      <span className="mt-1 block h-1 overflow-clip rounded-full bg-black/[0.07]">
        <span className="block h-full rounded-full bg-green transition-[width] duration-700 ease-out" style={{ width: `${v}%` }} />
      </span>
    </div>
  );
}

// Grows into place so the chat scrolls up smoothly as new parts arrive.
function Enter({ show, reduce, children, x = 0 }: { show: boolean; reduce: boolean; children: React.ReactNode; x?: number }) {
  if (!show) return null;
  return (
    <motion.div initial={reduce ? false : { opacity: 0, height: 0, x }} animate={{ opacity: 1, height: "auto", x: 0 }}
      transition={{ duration: 0.5, ease: EASE }} className="overflow-hidden">
      {children}
    </motion.div>
  );
}

export default function NyraWindowChat({ scene = 0 }: { scene?: number }) {
  const { ask: ASK, msg: MSG } = SCENES[scene];
  const reduce = !!useReducedMotion();
  const card = useRef<HTMLDivElement>(null);
  const feed = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduce) { setStep(DONE); setTyped(MSG.length); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(card.current!);
    return () => io.disconnect();
  }, [reduce, MSG]);

  useEffect(() => {
    if (!go || step >= DONE) return;
    const typing = step === 2 && typed < MSG.length;
    const t = setTimeout(() => (typing ? setTyped(typed + 1) : setStep(step + 1)), typing ? 16 : WAIT[step]);
    return () => clearTimeout(t);
  }, [go, step, typed, MSG]);

  // Replay: after the full answer, pause 4s and start again.
  useEffect(() => {
    if (!go || reduce || step < DONE) return;
    const t = setTimeout(() => { setStep(0); setTyped(0); }, 4000);
    return () => clearTimeout(t);
  }, [go, reduce, step]);

  // Keep the newest part in view, like a real chat.
  useLayoutEffect(() => {
    const ro = new ResizeObserver(() => { if (feed.current) feed.current.scrollTop = feed.current.scrollHeight; });
    ro.observe(inner.current!);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={card}
      className="relative mx-auto flex h-[592px] w-full max-w-[466px] flex-col gap-6 rounded-2xl bg-white/80 p-6 backdrop-blur-[10px]
        shadow-[0_0.6px_0.6px_-1.25px_rgba(0,0,0,0.18),0_2.3px_2.3px_-2.5px_rgba(0,0,0,0.16),0_10px_10px_-3.75px_rgba(0,0,0,0.06)] md:h-[593px]">
      <div ref={feed} className="min-h-0 flex-1 overflow-hidden [mask-image:linear-gradient(transparent,#000_40px)]">
        <div ref={inner} className="flex flex-col pt-10 text-[15px] leading-6 tracking-[-0.1px] md:text-base md:leading-[25.6px]">
          <p className="ml-auto max-w-[80%] rounded-2xl bg-blue/10 px-4 py-3">{ASK}</p>

          <div className="mt-6 flex h-5 items-center gap-2 text-black/40">
            {step >= 2 ? (
              <><Icon name="chevron" size={12} className="rotate-90" />Thinking completed</>
            ) : step === 1 ? (
              <span className="nyra-thinking flex items-center gap-2 text-blue-deep"><NyraMark size={16} /><span className="nyra-thinking-text">Nyra is thinking…</span></span>
            ) : null}
          </div>

          <Enter show={step >= 2} reduce={reduce}>
            <p className="relative mt-4 rounded-2xl md:max-w-[86%] bg-black/5 px-4 py-3">
              <span className="invisible">{MSG}</span>
              <span className="absolute inset-x-4 top-3">
                {MSG.slice(0, typed)}
                {typed < MSG.length && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[3px] animate-pulse bg-blue" />}
              </span>
            </p>
          </Enter>

          <div className="mt-2 flex flex-col">
            {scene === 1 && SKILLS.map((s, i) => (
              <Enter key={s.label} show={step >= 3 + i} reduce={reduce} x={-16}>
                <div className={ROW}>
                  <p className={LABEL}>{s.label}</p>
                  <p className="mt-1.5 flex flex-wrap gap-1.5">
                    {s.items.map(t => <span key={t} className="rounded-full bg-blue-soft px-2.5 py-0.5 text-[13px] leading-5 text-blue-deep">{t}</span>)}
                  </p>
                </div>
              </Enter>
            ))}
            {scene === 1 && (
              <Enter show={step >= 5} reduce={reduce} x={-16}>
                <div className={ROW}>
                  <p className={LABEL}>Screening questions</p>
                  <ol className="mt-1 list-decimal pl-5 text-sm leading-6">{QUESTIONS.map(q => <li key={q}>{q}</li>)}</ol>
                </div>
              </Enter>
            )}
            {scene === 2 && ANSWERS.map((a, i) => (
              <Enter key={a.q} show={step >= 3 + i} reduce={reduce} x={-16}>
                <div className={ROW + " flex items-center gap-3"}>
                  <div className="min-w-0 flex-1">
                    <p className={LABEL}>{a.q}</p>
                    <p className="text-sm leading-5 font-medium">{a.a}</p>
                  </div>
                  <span className={"flex-none rounded-full px-2 py-0.5 text-[11px] leading-4 font-medium " + (a.cv ? "bg-blue-soft text-blue-deep" : "bg-black/5 text-black/50")}>{a.cv ? "From CV" : "To check"}</span>
                </div>
              </Enter>
            ))}
            {scene === 0 && CANDIDATES.map((c, i) => (
              <Enter key={c.name} show={step >= 3 + i} reduce={reduce} x={-16}>
                <div className="mt-2 flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-1.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
                  <Badge className="size-8 bg-[linear-gradient(140deg,#7cc8fb,#3aa8f2)] text-[11px] font-semibold">{c.initials}</Badge>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm leading-5 font-medium">{c.name}</p>
                    <p className="truncate text-[12.5px] leading-[18px] text-black/50"><span className="hidden md:inline">{c.role}, </span>{c.reason}</p>
                  </div>
                  <Score to={c.score} run={step >= 3 + i} reduce={reduce} />
                </div>
              </Enter>
            ))}
          </div>

          <Enter show={step >= 6} reduce={reduce}>
            <p className="mt-5 text-black/40">Suggestions</p>
          </Enter>
          <div className="flex flex-wrap gap-2 pt-2">
            {CHIPS.map((c, i) => step >= 7 + i && (
              <motion.button key={c} type="button" onClick={openNyra}
                initial={reduce ? false : { opacity: 0, y: 10, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="h-8 rounded-full bg-blue-soft px-3 text-sm tracking-[-0.1px] md:h-9 md:px-3.5 md:text-[15px] transition-colors hover:bg-[#cfe9fd]">
                {c}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <button type="button" onClick={openNyra} aria-label="Ask Nyra anything"
        className="flex w-full flex-none flex-col gap-4 rounded-2xl bg-black/5 px-3.5 py-4 text-left transition-colors hover:bg-black/[0.07]">
        <span className="flex items-center text-base leading-[25.6px] tracking-[-0.1px] text-black/60">
          Ask Nyra anything
          {step >= DONE && <span className="ml-0.5 inline-block h-[18px] w-px animate-pulse bg-ink/60" />}
        </span>
        <span className="flex w-full items-center gap-3.5 text-black/50" aria-hidden="true">
          <svg className="mr-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><path d="M12 19v3" />
          </svg>
          <span className="grid size-[34px] place-items-center rounded-full bg-blue text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 7-7 7 7" /><path d="M12 19V5" />
            </svg>
          </span>
        </span>
      </button>
    </div>
  );
}

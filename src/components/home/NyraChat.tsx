"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "../Button";
import Icon, { type IconName } from "../Icon";
import { FAQS } from "./Faq";
import { Badge, CANDIDATES } from "./Nyra";

type Topic = { id: string; label: string; icon: IconName; keys: RegExp; text: string; match?: boolean };
type Msg = { from: "nyra" | "you"; text: string; topic?: number; team?: boolean };

// Feature tour: every answer restates what the site already says.
const TOPICS: Topic[] = [
  { id: "ai", label: "Find the best people", icon: "sparkle", keys: /match|score|\bai\b|nyra|shortlist|recommend|best/, match: true,
    text: "Just ask me, like you'd ask a colleague. I read every CV and give each person a score out of 100, with the reasons. Ask \"Who should I call first for the Java role at Acme?\" and I show:" },
  { id: "req", label: "Add a new job", icon: "file", keys: /requirement|brief|\bjd\b|job description|screening|job/,
    text: "Paste what your client sent you. I write the job description and the screening questions for you." },
  { id: "cand", label: "Your candidates", icon: "database", keys: /candidate|\bcvs?\b|resume|database|duplicate|sourc/,
    text: "Upload CVs, even many at once. I read each one and keep them all in your own database. If someone is already there, I spot it by email and phone, so no duplicates." },
  { id: "track", label: "Update clients", icon: "table", keys: /tracker|client|spreadsheet|excel|share|update/,
    text: "Pick the columns your client wants and share a clean tracker in one click. No more messy spreadsheets." },
  { id: "int", label: "Interviews", icon: "calendar", keys: /interview|schedul|slot|feedback/,
    text: "Set up every interview round and collect feedback in one place. Candidates can even pick their own time slot." },
  { id: "close", label: "Offers and joining", icon: "chart", keys: /closure|offer|join|revenue|report|roi|money/,
    text: "Track offers and joining dates, and see the money each role brings in. Reports show results by client, recruiter and job." },
  { id: "dash", label: "Team goals", icon: "target", keys: /dashboard|goal|target|manager|team lead|team/,
    text: "Everyone gets a dashboard made for their role. Set targets for a person or a team, and they tick themselves off when they are met." },
  { id: "imp", label: "Bring your data", icon: "mail", keys: /import|migrat|existing|bring|outlook|google|gmail|email|calendar/,
    text: `${FAQS[1].a} ${FAQS[3].a}` },
  { id: "data", label: "Is my data safe?", icon: "shield", keys: /data|secur|privacy|separate|safe/,
    text: `${FAQS[5].a} Admins also set a monthly AI budget, so there are no surprise bills.` },
];

const HELLO: Msg = { from: "nyra", text: "Hi, I'm Nyra, the AI assistant inside EZRecruit. I can show you around in a minute. What would you like to see?" };
const TEAM: Msg = { from: "nyra", text: "Good question! Our team can answer that best. Leave your details and they'll get back to you.", team: true };
const TEASER = "Hi, I'm Nyra. Want a 1 minute tour?";

const reply = (q: string): Msg => {
  const t = TOPICS.findIndex(t => t.keys.test(q.toLowerCase()));
  return t < 0 ? TEAM : { from: "nyra", text: TOPICS[t].text, topic: t };
};

const SPRING = { type: "spring", bounce: 0.25, duration: 0.5 } as const;
const CHIP = "flex items-center gap-1.5 rounded-full border-[0.8px] border-line bg-white px-3 py-2 text-[13px] leading-[17px] font-medium transition-colors hover:border-blue/30 hover:bg-[#f2f7ff]";

// Writes the reply out word by word, like it is being typed.
function Stream({ text, onDone }: { text: string; onDone: () => void }) {
  const words = text.split(" ");
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= words.length) { onDone(); return; }
    const t = setTimeout(() => setN(n + 1), 32);
    return () => clearTimeout(t);
  }, [n]); // eslint-disable-line react-hooks/exhaustive-deps
  return <>{words.slice(0, n).join(" ")}<span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-blue" /></>;
}

function CountUp({ to }: { to: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 700);
      setV(Math.round(to * (1 - (1 - k) ** 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v}</>;
}

// Nyra's avatar: a slow spinning colour ring around the sparkle.
function Avatar({ size = "size-10", ring = true }: { size?: string; ring?: boolean }) {
  return (
    <span className={`relative grid flex-none place-items-center ${size}`}>
      {ring && <span aria-hidden="true" className="absolute -inset-[3px] animate-[spin_5s_linear_infinite] rounded-full bg-[conic-gradient(#0066ff,#ccff00,#635bff,#0066ff)] motion-reduce:animate-none" />}
      <Badge className={`relative ${size} bg-[linear-gradient(140deg,#4d94ff,#0052ff)]`}><Icon name="sparkle" size={18} /></Badge>
    </span>
  );
}

export default function NyraChat() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([HELLO]);
  const [streamed, setStreamed] = useState(-1);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [teaser, setTeaser] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const lastIdx = msgs.length - 1;
  const last = msgs[lastIdx];
  const busy = typing || (last.from === "nyra" && streamed < lastIdx && open);

  const show = () => { setOpen(true); setTeaser(false); try { sessionStorage.setItem("ez-nyra", "1"); } catch {} };

  // Other parts of the page open the chat with a "nyra:open" event.
  useEffect(() => {
    addEventListener("nyra:open", show);
    let t = 0;
    try { if (!sessionStorage.getItem("ez-nyra")) t = window.setTimeout(() => setTeaser(true), 6000); } catch {}
    return () => { removeEventListener("nyra:open", show); clearTimeout(t); };
  }, []);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" }); });

  const send = (q: string, answer: Msg) => {
    if (busy) return;
    setMsgs(m => [...m, { from: "you", text: q }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs(m => [...m, answer]); }, 900);
  };
  const pick = (t: number) => send(TOPICS[t].label, { from: "nyra", text: TOPICS[t].text, topic: t });
  const restart = () => { setMsgs([HELLO]); setStreamed(-1); };
  const toTeam = () => { setOpen(false); location.hash = "contact"; };

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div key="panel" id="nyra-chat" role="dialog" aria-label="Chat with Nyra"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 30, filter: "blur(6px)" }}
            transition={SPRING}
            className="flex h-[min(580px,calc(100dvh-112px))] w-[min(400px,calc(100vw-32px))] origin-bottom-right flex-col overflow-clip rounded-[28px] bg-white
              shadow-[0_40px_80px_-30px_rgba(0,82,255,0.45),0_0_0_0.8px_#e3e9f5]">
            <div className="relative flex items-center gap-3 overflow-clip bg-[linear-gradient(120deg,#0a1f5c,#0052ff_60%,#4d94ff)] px-4 py-4 text-white">
              <span aria-hidden="true" className="absolute -top-16 -right-10 size-40 rounded-full bg-lime/30 blur-3xl" />
              {msgs.length > 1 && (
                <button type="button" onClick={restart} aria-label="Back to all topics"
                  className="relative grid size-9 flex-none place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/25"><Icon name="chevron" size={16} className="rotate-180" /></button>
              )}
              <Avatar />
              <div className="relative flex flex-col gap-0.5">
                <span className="text-base leading-5 font-semibold tracking-[-0.2px]">Nyra</span>
                <span className="flex items-center gap-1.5 text-xs leading-[15.6px] text-white/75">
                  <span className="relative flex size-2"><span className="absolute inset-0 animate-ping rounded-full bg-lime/70" /><span className="relative size-2 rounded-full bg-lime" /></span>
                  Online · your EZRecruit guide
                </span>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat"
                className="relative ml-auto grid size-9 flex-none place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/25"><Icon name="close" size={16} /></button>
            </div>

            <div ref={list} aria-live="polite"
              className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[linear-gradient(180deg,#f5f8ff,#fff_160px)] px-4 py-5 [scrollbar-color:#dde3ee_transparent] [scrollbar-width:thin]">
              {msgs.map((m, i) => {
                const live = m.from === "nyra" && i > streamed && !reduce;
                return m.from === "you" ? (
                  <motion.p key={i} initial={{ opacity: 0, x: 20, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={SPRING}
                    className="max-w-[80%] origin-bottom-right self-end rounded-[20px] rounded-br-md bg-ink px-4 py-2.5 text-sm leading-[20.3px] text-white">{m.text}</motion.p>
                ) : (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING}
                    className="flex max-w-[92%] items-end gap-2 self-start">
                    <Avatar size="size-7" ring={false} />
                    <div className="flex min-w-0 flex-col gap-2.5">
                      <p className="rounded-[20px] rounded-bl-md bg-white px-4 py-2.5 text-sm leading-[20.3px] shadow-[0_4px_14px_-8px_rgba(0,82,255,0.35),0_0_0_0.8px_#e8edf6]">
                        {live ? <Stream text={m.text} onDone={() => setStreamed(i)} /> : m.text}
                      </p>
                      {!live && m.topic !== undefined && TOPICS[m.topic].match && (
                        <ul className="flex flex-col gap-2">
                          {CANDIDATES.map((c, n) => (
                            <motion.li key={c.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ ...SPRING, delay: n * 0.12 }}
                              className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_0_0_0.8px_#e8edf6]">
                              <Badge className="size-8 bg-ink text-xs font-medium">{c.initials}</Badge>
                              <div className="flex min-w-0 flex-1 flex-col gap-1">
                                <span className="text-[13px] leading-[17px] font-medium">{c.name}</span>
                                <span className="h-1 overflow-clip rounded-full bg-fill">
                                  <motion.span className="block h-full rounded-full bg-blue" initial={{ width: 0 }} animate={{ width: `${c.score}%` }} transition={{ duration: 0.8, delay: 0.2 + n * 0.12 }} />
                                </span>
                                <span className="text-xs leading-[15.6px] text-muted">{c.reason}</span>
                              </div>
                              <span className="ml-1 rounded-full bg-[#e8f0ff] px-2 py-0.5 text-xs leading-[15.6px] font-semibold text-blue tabular-nums"><CountUp to={c.score} /></span>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                      {!live && m.team && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} onClick={() => setOpen(false)}>
                          <Button href="#contact" small chevron>Talk to our team</Button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              <AnimatePresence>
                {typing && (
                  <motion.span key="typing" aria-label="Nyra is typing" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="ml-9 flex gap-1 self-start rounded-[20px] rounded-bl-md bg-white px-4 py-3.5 shadow-[0_0_0_0.8px_#e8edf6]">
                    {[0, 1, 2].map(d => (
                      <motion.span key={d} className="size-1.5 rounded-full bg-blue" animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }} />
                    ))}
                  </motion.span>
                )}
              </AnimatePresence>

              {!busy && (last === HELLO ? (
                <div className="ml-9 grid grid-cols-2 gap-2">
                  {[...TOPICS.map((t, i) => ({ label: t.label, icon: t.icon, go: () => pick(i) })), { label: "Something else", icon: "message" as IconName, go: () => send("Something else", TEAM) }].map((t, i) => (
                    <motion.button key={t.label} type="button" onClick={t.go}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ ...SPRING, delay: i * 0.04 }}
                      whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                      className={`flex items-center gap-2 rounded-2xl p-2.5 text-left text-[13px] leading-[17px] font-medium transition-colors
                        ${i === TOPICS.length ? "bg-ink text-white" : "bg-white shadow-[0_0_0_0.8px_#e8edf6] hover:shadow-[0_0_0_1px_#b3d1ff,0_8px_20px_-12px_rgba(0,82,255,0.5)]"}`}>
                      <span className={`grid size-7 flex-none place-items-center rounded-full ${i === TOPICS.length ? "bg-white/15" : "bg-[#eef4ff] text-blue"}`}><Icon name={t.icon} size={14} /></span>
                      {t.label}
                    </motion.button>
                  ))}
                </div>
              ) : last.from === "nyra" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="ml-9 flex flex-wrap gap-2">
                  {last.topic !== undefined && last.topic < TOPICS.length - 1 && (
                    <button type="button" onClick={() => pick(last.topic! + 1)} className={`${CHIP} border-transparent bg-blue text-white hover:bg-blue-deep`}>
                      Next: {TOPICS[last.topic + 1].label}<Icon name="chevron" size={13} />
                    </button>
                  )}
                  <button type="button" onClick={restart} className={CHIP}><Icon name="chevron" size={13} className="rotate-180" />All topics</button>
                  {!last.team && <button type="button" onClick={toTeam} className={CHIP}>Talk to our team</button>}
                </motion.div>
              ))}
            </div>

            <form onSubmit={e => { e.preventDefault(); if (draft.trim()) send(draft.trim(), reply(draft)); }}
              className="flex items-center gap-2 border-t-[0.8px] border-line p-3">
              <input ref={input} value={draft} onChange={e => setDraft(e.target.value)} placeholder="Ask Nyra anything"
                aria-label="Message Nyra" className="h-11 flex-1 rounded-full bg-fill-2 px-4 text-sm outline-none placeholder:text-faint focus:ring-2 focus:ring-blue/30" />
              <motion.button type="submit" aria-label="Send" disabled={!draft.trim() || busy} whileTap={{ scale: 0.9 }}
                className="grid size-11 flex-none place-items-center rounded-full bg-blue text-white transition-opacity disabled:opacity-40"><Icon name="arrow" size={18} stroke={2.5} /></motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {teaser && !open && (
          <motion.div key="teaser" initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={SPRING} className="relative flex origin-bottom-right items-center gap-2 rounded-2xl rounded-br-md bg-white py-3 pr-2 pl-4 shadow-[0_20px_40px_-16px_rgba(0,82,255,0.4),0_0_0_0.8px_#e3e9f5]">
            <button type="button" onClick={show} className="text-sm leading-5 font-medium">{TEASER}</button>
            <button type="button" onClick={() => setTeaser(false)} aria-label="Dismiss" className="grid size-7 place-items-center rounded-full text-muted hover:bg-fill"><Icon name="close" size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button type="button" onClick={() => (open ? setOpen(false) : dispatchEvent(new Event("nyra:open")))} aria-expanded={open} aria-controls="nyra-chat"
        initial={{ opacity: 0, y: 30, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ ...SPRING, delay: 1.4 }}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        className="relative flex h-14 items-center gap-3 rounded-full bg-ink pr-5 pl-2 text-[15px] font-medium tracking-[-0.15px] text-white
          shadow-[0_18px_36px_-12px_rgba(0,82,255,0.55)]">
        {!open && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-blue/25 [animation-duration:2.4s] motion-reduce:hidden" />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? "x" : "s"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
            {open ? <Badge className="size-10 bg-white/15"><Icon name="close" size={18} /></Badge> : <Avatar />}
          </motion.span>
        </AnimatePresence>
        <span className="relative">{open ? "Close" : "Ask Nyra"}</span>
      </motion.button>
    </div>
  );
}

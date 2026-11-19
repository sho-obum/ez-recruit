"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Icon, { type IconName } from "../Icon";
import { Badge } from "./Nyra";
import NyraMark from "./NyraMark";

// A replica of the Nyra panel inside EzRecruit (ezrecruit-frontend NyraAssistantPanel), running on made-up sample data.
type Row = { name: string; match: number; meta: string; skills: string[] };
type Card =
  | { kind: "search"; title: string; total: number; rows: Row[] }
  | { kind: "action"; title: string; summary: string; notifies?: string[]; done?: boolean; confirm?: string; change?: string; cancel?: string }
  | { kind: "metric"; label: string; value: string; delta?: string; note?: string }
  | { kind: "list"; title: string; items: [IconName, string][] };
type Node = { nyra: string; card?: Card; chips?: [string, string][]; undo?: string };
type Msg = { from: "nyra" | "you"; text: string; card?: Card; chips?: [string, string][]; undo?: string };

const JAVA: Row[] = [
  { name: "Arjun Mehta", match: 94, meta: "Senior Java Developer · 7 yrs · Bangalore", skills: ["Java", "Spring Boot", "Kafka"] },
  { name: "Priya Sharma", match: 91, meta: "Java Lead · 8 yrs · Bangalore", skills: ["Java", "Microservices", "AWS"] },
  { name: "Karthik N", match: 88, meta: "Backend Engineer · 6 yrs · Bangalore", skills: ["Java", "Kafka", "SQL"] },
  { name: "Divya Iyer", match: 85, meta: "Java Developer · 5 yrs · Bangalore", skills: ["Java", "Spring", "Docker"] },
  { name: "Rohan Das", match: 82, meta: "Software Engineer · 6 yrs · Bangalore", skills: ["Java", "Hibernate"] },
];
const BOOK = (time: string): Card => ({ kind: "action", title: "Schedule interview", summary: `Priya Sharma · JC-2041 Senior Java Developer · Technical round · Tomorrow, ${time} · 45 min`,
  notifies: ["Priya Sharma", "Asha Menon (panel)"], confirm: "book_done", change: "change", cancel: "cancelled" });

const NODES: Record<string, Node> = {
  plate: { nyra: "Good morning! Here's your day.", card: { kind: "list", title: "Today", items: [
    ["calendar", "3 interviews today, the first at 11:00 AM"], ["message", "Feedback owed on 2 interviews"], ["briefcase", "JC-2041 closes in 3 days, 2 candidates in the client round"]] },
    chips: [["Which interviews need my feedback?", "feedback"], ["Find people for JC-2041", "search"]] },
  feedback: { nyra: "Two interviews are waiting on your feedback.", card: { kind: "list", title: "Feedback you owe", items: [
    ["clock", "Ankit Verma · JC-1987 · Technical round, yesterday"], ["clock", "Sneha Rao · JC-2041 · HR round, Friday"]] },
    chips: [["Nudge interviewers for pending feedback", "nudge"]] },
  nudge: { nyra: "Here's what I'll send. Nothing goes out until you confirm.", card: { kind: "action", title: "Nudge interviewers", summary: "A reminder to 2 teammates who owe feedback on 3 interviews",
    notifies: ["Asha Menon", "Vikram Joshi"], confirm: "nudge_done", cancel: "cancelled" } },
  nudge_done: { nyra: "Sent. Asha and Vikram have a reminder.", card: { kind: "action", title: "Interviewers nudged", summary: "2 teammates reminded", done: true } },

  search: { nyra: "Found 42 people. Here are the top 5.", card: { kind: "search", title: "Java developers · Bangalore · 5+ years", total: 42, rows: JAVA },
    chips: [["Add Kafka", "kafka"], ["Shortlist the top 5 for JC-2041", "shortlist"]] },
  kafka: { nyra: "Narrowed it down. 18 of them also know Kafka.", card: { kind: "search", title: "Java developers · Bangalore · 5+ years · Kafka", total: 18, rows: JAVA.filter(r => r.skills.includes("Kafka")) },
    chips: [["Shortlist the top 5 for JC-2041", "shortlist"]] },
  shortlist: { nyra: "Here's the change. Confirm and it's done.", card: { kind: "action", title: "Shortlist 5 candidates",
    summary: "JC-2041 Senior Java Developer · Arjun Mehta, Priya Sharma, Karthik N, Divya Iyer, Rohan Das", confirm: "shortlist_done", cancel: "cancelled" } },
  shortlist_done: { nyra: "Done. All 5 are on the JC-2041 shortlist.", card: { kind: "action", title: "Shortlisted", summary: "5 candidates on JC-2041", done: true },
    undo: "undone", chips: [["Send the tracker for JC-2041 to the client", "tracker"]] },
  tracker: { nyra: "Here's the email. Check it before it goes.", card: { kind: "action", title: "Email the shortlist tracker", summary: "JC-2041 · 5 candidates · Excel tracker attached",
    notifies: ["Neha Kapoor (Acme Corp)"], confirm: "tracker_done", cancel: "cancelled" } },
  tracker_done: { nyra: "Sent to Neha. Emails can't be undone once they go out, which is why I always show you first.", card: { kind: "action", title: "Tracker sent", summary: "Neha Kapoor (Acme Corp)", done: true } },

  book: { nyra: "Here's what I'll book. Nothing changes until you confirm.", card: BOOK("3:00 PM") },
  change: { nyra: "Sure. What should I change? In EzRecruit you just type it.", chips: [["Make it 4 pm", "book4"]] },
  book4: { nyra: "Updated. Here it is at 4.", card: BOOK("4:00 PM") },
  book_done: { nyra: "Booked. Priya gets the details, and a WhatsApp reminder an hour before.", card: { kind: "action", title: "Interview scheduled", summary: "Priya Sharma · JC-2041 · Tomorrow", done: true }, undo: "undone" },
  slots: { nyra: "You're free at these times tomorrow.", card: { kind: "list", title: "Free tomorrow", items: [["clock", "10:00 AM"], ["clock", "12:30 PM"], ["clock", "3:00 PM"], ["clock", "4:00 PM"]] },
    chips: [["Book Priya for JC-2041 tomorrow at 3pm", "book"]] },
  outlook: { nyra: "Not yet, and I'd rather be honest. I find free slots in your EzRecruit interview calendar. I can't read Outlook or Google calendars today.",
    chips: [["What slots do I have tomorrow?", "slots"]] },

  hinglish: { nyra: "Is week aapke 6 interviews hain. Aaj 2, aur baaki 4 Friday tak.", card: { kind: "metric", label: "Interviews · this week", value: "6", note: "2 today · 4 later this week" },
    chips: [["Rahul ka interview cancel kar do", "rahul"]] },
  rahul: { nyra: "Cancel karne se pehle ek baar dekh lijiye.", card: { kind: "action", title: "Cancel interview", summary: "Rahul Nair · JC-1987 Backend Engineer · Thursday, 11:00 AM",
    notifies: ["Rahul Nair"], confirm: "rahul_done", cancel: "cancelled" } },
  rahul_done: { nyra: "Ho gaya. Rahul ka interview cancel ho gaya.", card: { kind: "action", title: "Interview cancelled", summary: "Rahul Nair · JC-1987", done: true }, undo: "undone" },

  joined: { nyra: "Great news! Here's what I'll log.", card: { kind: "action", title: "Mark as joined", summary: "Ravi Kumar · JC-1987 Backend Engineer · Joined yesterday", confirm: "joined_done", cancel: "cancelled" } },
  joined_done: { nyra: "Logged. It counts in this month's closures.", card: { kind: "action", title: "Joining logged", summary: "Ravi Kumar · JC-1987", done: true }, undo: "undone",
    chips: [["What's my closure rate this quarter?", "rate"]] },
  reject: { nyra: "Here's the rejection. The reason is logged and Rahul gets a polite regret email.", card: { kind: "action", title: "Reject candidate",
    summary: "Rahul Nair · JC-2041 · Reason: not enough Kafka · Regret email: yes", notifies: ["Rahul Nair"], confirm: "reject_done", cancel: "cancelled" } },
  reject_done: { nyra: "Done, reason logged. The regret email has gone, so this one can't be undone.", card: { kind: "action", title: "Candidate rejected", summary: "Rahul Nair · JC-2041", done: true } },

  rate: { nyra: "Your closure rate is up this quarter.", card: { kind: "metric", label: "Closure rate · this quarter", value: "18%", delta: "Up 3 points vs last quarter", note: "7 closures from 39 submissions" },
    chips: [["Closures vs last month", "closures"], ["Email me this month's closures as Excel", "excel"]] },
  closures: { nyra: "Here's the comparison.", card: { kind: "metric", label: "Closures · this month", value: "4", delta: "Up from 2 last month" },
    chips: [["Email me this month's closures as Excel", "excel"]] },
  excel: { nyra: "It goes only to you. Phone numbers and emails are left out of the file.", card: { kind: "action", title: "Email closures report", summary: "This month · Excel file",
    notifies: ["Only you"], confirm: "excel_done", cancel: "cancelled" } },
  excel_done: { nyra: "It's in your inbox.", card: { kind: "action", title: "Report sent", summary: "Closures · this month · Excel", done: true } },

  undone: { nyra: "Undone. Everything is back the way it was." },
  cancelled: { nyra: "Okay, I've left everything as it was." },
};

const GROUPS: [string, [string, string][]][] = [
  ["Start your day", [["What's on my plate?", "plate"]]],
  ["Find people", [["Find Java developers in Bangalore with 5+ years", "search"]]],
  ["Interviews", [["Book Priya for JC-2041 tomorrow at 3pm", "book"], ["What slots do I have tomorrow?", "slots"], ["Can you sync my Outlook calendar?", "outlook"]]],
  ["Pipeline", [["Ravi joined yesterday", "joined"], ["Reject Rahul for JC-2041, not enough Kafka", "reject"]]],
  ["Numbers", [["What's my closure rate this quarter?", "rate"]]],
  ["In Hinglish", [["mere kitne interviews hain is week", "hinglish"]]],
];
const STARTERS = [GROUPS[0][1][0], GROUPS[1][1][0], GROUPS[2][1][0]];
// Questions typed elsewhere on the site (the Nyra page prompt bar) play the closest sample.
const TYPED: [RegExp, string][] = [
  [/plate|today|briefing/i, "plate"], [/feedback/i, "feedback"], [/find|search|developer|candidate/i, "search"], [/outlook|google|sync/i, "outlook"],
  [/slot|free/i, "slots"], [/kitne|hain/i, "hinglish"], [/cancel/i, "rahul"], [/book|schedule|interview/i, "book"], [/join/i, "joined"],
  [/reject/i, "reject"], [/tracker|client/i, "tracker"], [/closure|rate|number|revenue|metric/i, "rate"], [/shortlist/i, "shortlist"],
];

const HELLO = "Hi, I'm Nyra. Pick a question below and I'll show you exactly what I do inside EzRecruit.";
const TEASER = "Hi, I'm Nyra. Want to see how I work inside EzRecruit?";
const SPRING = { type: "spring", bounce: 0.25, duration: 0.5 } as const;
const CHIP = "rounded-lg border border-line bg-white px-2.5 py-1.5 text-left text-xs font-medium text-ink transition-colors hover:border-[#bfe3ff] hover:bg-blue-soft disabled:cursor-not-allowed disabled:opacity-50";
const CARD = "rounded-xl border border-line bg-white px-3 py-2.5 text-[13px]";

function Face({ size = 24 }: { size?: number }) {
  return <span style={{ width: size, height: size }} className="grid flex-none place-items-center rounded-full bg-blue-soft text-blue-deep"><NyraMark size={size * 0.6} once /></span>;
}
function Tile({ icon }: { icon: IconName }) {
  return <span className="grid size-8 flex-none place-items-center rounded-lg bg-blue-soft text-blue-deep"><Icon name={icon} size={16} /></span>;
}

// The real panel offers Undo for 30 seconds after a change.
function Undo({ onUndo }: { onUndo: () => void }) {
  const [s, setS] = useState(30);
  useEffect(() => { if (s > 0) { const t = setTimeout(() => setS(s - 1), 1000); return () => clearTimeout(t); } }, [s]);
  return s > 0 ? <button type="button" onClick={onUndo} className={CHIP}>Undo · {s}s</button> : null;
}

function CardView({ card, live, onDecide }: { card: Card; live: boolean; onDecide: (label: string, node: string) => void }) {
  if (card.kind === "search") return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="flex items-start gap-3 px-3 py-2.5 text-[13px]">
        <Tile icon="search" />
        <span className="min-w-0 flex-1 self-center leading-snug"><span className="font-medium">{card.title}</span>
          <span className="mt-0.5 block text-muted">{card.total} matches · Open full results</span></span>
        <Icon name="chevron" size={16} className="mt-2 flex-none text-faint" />
      </div>
      <ul className="border-t border-line text-[13px]">
        {card.rows.map((r, n) => (
          <motion.li key={r.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ ...SPRING, delay: n * 0.08 }}
            className="border-t border-fill-2 px-3 py-2 first:border-t-0">
            <div className="flex items-baseline gap-2"><span className="truncate font-medium text-blue-deep">{r.name}</span>
              <span className="ml-auto flex-none rounded-full bg-blue-soft px-1.5 text-[11px] font-semibold text-blue-deep">{r.match}%</span></div>
            <p className="mt-0.5 truncate text-xs text-muted">{r.meta}</p>
            <ul className="mt-1 flex flex-wrap gap-1">{r.skills.map(s => <li key={s} className="rounded-md bg-fill-2 px-1.5 text-[11px] text-ink/80">{s}</li>)}</ul>
          </motion.li>
        ))}
      </ul>
    </div>
  );
  if (card.kind === "metric") return (
    <div className={`${CARD} flex items-start gap-3`}>
      <Tile icon="chart" />
      <div className="flex flex-col leading-snug">
        <span className="text-muted">{card.label}</span>
        <span className="font-display text-[28px] leading-9 font-medium tracking-[-0.03em]">{card.value}</span>
        {card.delta && <span className="text-xs font-medium text-[#067647]">{card.delta}</span>}
        {card.note && <span className="mt-0.5 text-xs text-muted">{card.note}</span>}
      </div>
    </div>
  );
  if (card.kind === "list") return (
    <div className={CARD}>
      <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">{card.title}</p>
      <ul className="flex flex-col gap-2">{card.items.map(([icon, text]) => <li key={text} className="flex items-center gap-3"><Tile icon={icon} /><span className="leading-snug">{text}</span></li>)}</ul>
    </div>
  );
  const decisions: [string, string | undefined][] = [["Confirm", card.confirm], ["Change", card.change], ["Cancel", card.cancel]];
  return (
    <div className={CARD}>
      <div className="flex items-start gap-3">
        <Tile icon={card.done ? "check" : "file"} />
        <div className="min-w-0 flex-1 leading-snug">
          <p className="font-medium">{card.title}</p>
          <p className="mt-0.5 text-muted">{card.summary}</p>
          {card.notifies && <p className="mt-1 text-xs text-muted">Notifies: {card.notifies.join(", ")}</p>}
          {card.done && <p className="mt-1 text-xs font-medium text-[#067647]">All set ✓</p>}
        </div>
      </div>
      {card.confirm && (
        <div className="mt-2 flex flex-wrap gap-2">
          {decisions.filter(([, n]) => n).map(([label, node], i) => (
            <button key={label} type="button" disabled={!live} onClick={() => onDecide(label, node!)}
              className={i === 0 ? "rounded-lg border border-blue-deep bg-blue-deep px-2.5 py-1.5 text-xs font-medium text-white disabled:opacity-50" : CHIP}>{label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// A themed prompt picker that opens upward: group headings, one prompt per row.
function PromptMenu({ disabled, onPick }: { disabled: boolean; onPick: (q: string, id: string) => void }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (!box.current?.contains(e.target as globalThis.Node)) setOpen(false); };
    addEventListener("pointerdown", away);
    return () => removeEventListener("pointerdown", away);
  }, [open]);
  return (
    <div ref={box} className="relative" onKeyDown={e => { if (e.key === "Escape" && open) { e.preventDefault(); setOpen(false); } }}>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.15 }}
            role="listbox" aria-label="Prompts" data-lenis-prevent
            className="absolute right-0 bottom-[calc(100%+8px)] left-0 max-h-[min(340px,45dvh)] overflow-y-auto rounded-xl border border-line bg-white p-1.5 shadow-[0_24px_48px_-20px_rgba(20,20,20,0.35)] [scrollbar-width:thin]">
            {GROUPS.map(([g, items]) => (
              <div key={g} className="flex flex-col pb-1 last:pb-0">
                <p className="px-2.5 pt-2 pb-1 text-[11px] leading-4 font-semibold tracking-wide text-faint uppercase">{g}</p>
                {items.map(([q, id]) => (
                  <button key={id} type="button" role="option" aria-selected="false" onClick={() => { setOpen(false); onPick(q, id); }}
                    className="rounded-lg px-2.5 py-2 text-left text-sm leading-5 transition-colors hover:bg-blue-soft focus-visible:bg-blue-soft focus-visible:outline-none">{q}</button>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" disabled={disabled} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(o => !o)}
        className="flex h-11 w-full cursor-pointer items-center justify-between rounded-lg border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-[#9fd8ff] focus-visible:ring-[3px] focus-visible:ring-[#bfe3ff] focus-visible:outline-none disabled:opacity-60">
        Pick something to ask Nyra
        <Icon name="chevron" size={16} className={`text-muted transition-transform duration-200 ${open ? "-rotate-90" : "rotate-90"}`} />
      </button>
    </div>
  );
}

export default function NyraChat() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const play = useRef<(q: string, id: string) => void>(() => {});

  const show = () => { setOpen(true); setTeaser(false); try { sessionStorage.setItem("ez-nyra", "1"); } catch {} };

  // Other parts of the page open the chat with "nyra:open", or ask a question with "nyra:ask".
  useEffect(() => {
    addEventListener("nyra:open", show);
    const onAsk = (e: Event) => {
      const q = (e as CustomEvent<string>).detail;
      const id = TYPED.find(([re]) => re.test(q))?.[1];
      setTimeout(() => (id ? play.current(q, id) : setMsgs(m => [...m, { from: "you", text: q },
        { from: "nyra", text: "In EzRecruit you can type anything. In this demo I can show a few real examples, so pick one below." }])), 350);
    };
    addEventListener("nyra:ask", onAsk);
    let t = 0;
    // Wait until the visitor is past the hero, so the teaser never covers its buttons.
    const later = () => { if (scrollY > innerHeight) { removeEventListener("scroll", later); t = window.setTimeout(() => setTeaser(true), 1500); } };
    try { if (!sessionStorage.getItem("ez-nyra")) addEventListener("scroll", later, { passive: true }); } catch {}
    return () => { removeEventListener("nyra:open", show); removeEventListener("nyra:ask", onAsk); removeEventListener("scroll", later); clearTimeout(t); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !e.defaultPrevented && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" }); });

  play.current = (q, id) => {
    if (typing) return;
    const n = NODES[id];
    setMsgs(m => [...m, { from: "you", text: q }]);
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs(m => [...m, { from: "nyra", text: n.nyra, card: n.card, chips: n.chips, undo: n.undo }]); }, 1000);
  };
  const go = (q: string, id: string) => play.current(q, id);
  const last = msgs.length - 1;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div key="panel" id="nyra-chat" role="dialog" aria-label="Nyra demo"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 30, filter: "blur(6px)" }}
            transition={SPRING}
            className="flex h-[min(640px,calc(100dvh-104px))] w-[min(400px,calc(100vw-32px))] origin-bottom-right flex-col overflow-clip rounded-2xl bg-white text-sm text-ink
              shadow-[0_40px_80px_-30px_rgba(20,20,20,0.45),0_0_0_1px_#e3e9f5]">
            <p className="bg-blue-soft px-4 py-1.5 text-center text-xs leading-[17px] text-blue-deep">Sample data. In EzRecruit, Nyra uses your real jobs.</p>
            <div className="flex items-center gap-2.5 border-b border-fill-2 px-4 py-3">
              <Face size={32} />
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-tight font-semibold">Nyra</p>
                <p className="truncate text-xs leading-tight text-muted">Your next-gen recruitment assistant</p>
              </div>
              {msgs.length > 0 && <button type="button" onClick={() => setMsgs([])} className={CHIP}>Start over</button>}
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid size-8 flex-none place-items-center rounded-lg text-muted transition-colors hover:bg-fill-2 hover:text-ink"><Icon name="close" size={16} /></button>
            </div>

            <div ref={list} aria-live="polite" data-lenis-prevent className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 [scrollbar-width:thin]">
              <div className="flex items-end gap-2"><Face /><p className="max-w-[min(90%,280px)] rounded-2xl rounded-bl-md bg-blue-deep px-3 py-2 text-white">{HELLO}</p></div>
              {msgs.length === 0 && (
                <ul className="ml-8 flex flex-col gap-2">
                  {STARTERS.map(([q, id]) => (
                    <li key={id}><button type="button" onClick={() => go(q, id)}
                      className="flex w-full items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5 text-left transition-colors hover:border-[#bfe3ff] hover:bg-blue-soft">
                      <span className="flex-1 leading-snug">{q}</span><Icon name="chevron" size={16} className="flex-none text-faint" /></button></li>
                  ))}
                </ul>
              )}

              {msgs.map((m, i) => m.from === "you" ? (
                <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={SPRING} className="flex flex-row-reverse items-end gap-2">
                  <Badge className="size-6 bg-ink text-[10px] font-semibold">You</Badge>
                  <p className="max-w-[min(90%,280px)] rounded-2xl rounded-br-md bg-fill-2 px-3 py-2">{m.text}</p>
                </motion.div>
              ) : (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING} className="flex flex-col gap-2">
                  <div className="flex items-end gap-2"><Face /><p className="max-w-[min(90%,280px)] rounded-2xl rounded-bl-md bg-blue-deep px-3 py-2 text-white">{m.text}</p></div>
                  {m.card && <div className="ml-8"><CardView card={m.card} live={i === last && !typing} onDecide={go} /></div>}
                  {i === last && !typing && (m.chips || m.undo) && (
                    <div className="ml-8 flex flex-wrap gap-2">
                      {m.undo && <Undo onUndo={() => go("Undo", m.undo!)} />}
                      {m.chips?.map(([q, id]) => <button key={id} type="button" onClick={() => go(q, id)} className={CHIP}>{q}</button>)}
                    </div>
                  )}
                </motion.div>
              ))}

              <AnimatePresence>
                {typing && (
                  <motion.span key="typing" aria-label="Nyra is thinking" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="nyra-thinking ml-8 flex items-center gap-2 self-start text-xs text-blue-deep">
                    <NyraMark size={14} /><span className="nyra-thinking-text">Nyra is thinking…</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-fill-2 px-4 pt-3 pb-3.5">
              <PromptMenu disabled={typing} onPick={go} />
              <p className="pt-2 text-xs text-muted">In EzRecruit you type anything. <a href="/demo/" onClick={() => setOpen(false)} className="font-medium text-blue-deep underline underline-offset-2">See it on your own jobs</a></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {teaser && !open && (
          <motion.div key="teaser" initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={SPRING} className="relative flex origin-bottom-right items-center gap-2 rounded-2xl rounded-br-md bg-white py-3 pr-2 pl-4 shadow-[0_20px_40px_-16px_rgba(20,20,20,0.4),0_0_0_0.8px_#e3e9f5]">
            <button type="button" onClick={show} className="text-sm leading-5 font-medium">{TEASER}</button>
            <button type="button" onClick={() => setTeaser(false)} aria-label="Dismiss" className="grid size-7 place-items-center rounded-full text-muted hover:bg-fill"><Icon name="close" size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button type="button" onClick={() => dispatchEvent(new Event("nyra:open"))} aria-controls="nyra-chat"
          initial={{ opacity: 0, y: 30, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ ...SPRING, delay: 1.4 }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          className="relative flex h-14 items-center gap-3 rounded-full bg-blue-soft pr-5 pl-2 text-[15px] font-medium tracking-[-0.15px] text-blue-deep
            shadow-[inset_0_0_0_1px_#bfe3ff,0_18px_36px_-14px_rgba(15,111,184,0.45)]">
          <span aria-hidden="true" className="nyra-breath absolute inset-0 rounded-full" />
          <span className="grid size-10 place-items-center rounded-full bg-white text-blue-deep shadow-[inset_0_0_0_1px_#bfe3ff]"><NyraMark size={22} /></span>
          <span className="relative">Ask Nyra</span>
        </motion.button>
      )}
    </div>
  );
}

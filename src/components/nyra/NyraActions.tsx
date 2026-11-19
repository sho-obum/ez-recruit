"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NyraMark from "../home/NyraMark";
import { BorderBeam } from "../ui21/border-beam";

// Seven actions from the capability guide, as users see them in the Nyra panel. Names and figures are illustrative.
const ACTIONS: { name: string; ask: string; card: string; rows: [string, string][]; notifies: string; done: string; note: string }[] = [
  { name: "From a one-line brief to a live job", ask: "Create this job for Amazon", card: "Create job",
    rows: [["Title", "Senior Backend Engineer"], ["Client / SPOC", "Amazon · Rahul Sharma"], ["Positions", "1 · Permanent"], ["Location", "Bengaluru"], ["Org SPOC", "You"]],
    notifies: "Nobody outside your team", done: "Created JC-2097. Apply link ready.", note: "Every default is shown before you confirm, so nothing is hidden." },
  { name: "Book an interview in one sentence", ask: "Book Priya for JC-2041 tomorrow at 3pm", card: "Confirm interview",
    rows: [["Candidate", "Priya Sharma"], ["Job", "JC-2041 · Senior Java Engineer"], ["Round", "L2 Scheduled"], ["When", "Wed 11 Nov, 3:00 pm IST"]],
    notifies: "Candidate email", done: "Booked. On the Interview Roster now.", note: "Slot taken? Nyra offers the nearest free slots instead." },
  { name: "Chase feedback across the team", ask: "Nudge interviewers for pending feedback", card: "Nudge for feedback",
    rows: [["Interviews waiting", "5"], ["Asha Menon", "2 · JC-2041"], ["Ravi Kumar", "2 · JC-1877"], ["Dev Patel", "1 · JG-9474"]],
    notifies: "3 teammates · in-app", done: "Nudged 3 people.", note: "Only teammates in your own team. Nobody outside the company is contacted." },
  { name: "Reject with a reason, kindly", ask: "Reject Rahul for JG-9474, not enough Kafka depth", card: "Reject candidate",
    rows: [["Candidate", "Rahul Verma"], ["Job", "JG-9474 · Data Engineer"], ["New stage", "L1 Reject"], ["Reason (internal)", "Not enough Kafka depth"], ["Regret email", "Yes, polite, no reason"]],
    notifies: "Candidate email", done: "Rejected and logged.", note: "The reason stays on the tracker. The regret email never shows it." },
  { name: "Offers and joinings, logged as you speak", ask: "Ravi joined yesterday", card: "Mark as joined",
    rows: [["Candidate", "Ravi Kumar"], ["Job", "JC-1877 · QA Lead · Acme Corp"], ["Status", "Joined"], ["Joining date", "Mon 9 Nov 2026"], ["Offer details", "CTC, grade, location from record"]],
    notifies: "Nobody outside your team", done: "Logged. Counts in this month's closures.", note: "No offer details on record? Nyra sends you to the form. It never makes them up." },
  { name: "Send the client their shortlist", ask: "Send the tracker for JC-2041 to the client", card: "Send tracker to client",
    rows: [["To", "Anita Rao · Acme Corp (SPOC)"], ["Job", "JC-2041 · Senior Java Engineer"], ["Candidates", "3 shortlisted"], ["Attachment", "Acme_JC-2041_tracker.xlsx"]],
    notifies: "Client email", done: "Sent from your mailbox.", note: "Messages that leave the company always need a tap on Confirm." },
  { name: "A leaver's work, handed over in one step", ask: "Priya is leaving, move her work to Ravi", card: "Transfer ownership",
    rows: [["From", "Priya Nair"], ["To", "Ravi Kumar"], ["Jobs", "14"], ["Candidates", "312"], ["Open goals", "3"]],
    notifies: "Nobody outside your team", done: "Transferred. History recorded.", note: "If the counts change before you confirm, Nyra stops and shows the new preview. Admins only." },
];
const STEPS = ["Ask", "Preview", "Confirm", "Done + Undo"];
type Stage = "ask" | "preview" | "done" | "undone";
const EASE = [0.22, 1, 0.36, 1] as const;

// Pick an action, then press Confirm yourself: the same Ask, Preview, Confirm, Undo loop as the product.
export default function NyraActions() {
  const [on, setOn] = useState(0);
  const [stage, setStage] = useState<Stage>("ask");
  const [left, setLeft] = useState(30);
  const a = ACTIONS[on];

  useEffect(() => {
    if (stage !== "ask") return;
    const t = setTimeout(() => setStage("preview"), 900);
    return () => clearTimeout(t);
  }, [stage, on]);
  useEffect(() => {
    if (stage !== "done" || left <= 0) return;
    const t = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, left]);

  const pick = (i: number) => { setOn(i); setStage("ask"); };
  const lit = stage === "ask" ? 0 : stage === "preview" ? 1 : 3;

  return (
    <section id="actions" className="flex flex-col items-center px-5 py-18 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="flex w-full max-w-[1136px] flex-col gap-10 lg:gap-14">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-12">
          <h2 data-reveal className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px] md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px] lg:flex-1 lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">
            Actions, not just answers.
          </h2>
          <p data-reveal style={{ "--d": "0.1s" } as React.CSSProperties} className="text-[17px] leading-[24.65px] text-muted md:text-lg md:leading-[26.1px] lg:w-[400px]">
            Every change is previewed first. Nothing happens until you say so, and you get 30 seconds to undo. Pick one and press Confirm.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-14">
          <div data-reveal className="flex flex-col gap-1 lg:w-[400px] lg:flex-none">
            {ACTIONS.map((x, i) => (
              <button key={x.name} type="button" aria-pressed={on === i} onClick={() => pick(i)}
                className={`flex cursor-pointer items-baseline gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors duration-300 ${on === i ? "bg-blue-soft shadow-[inset_0_0_0_1px_#bfe3ff]" : "hover:bg-fill-2"}`}>
                <span className={`font-display text-sm font-semibold tabular-nums ${on === i ? "text-blue-deep" : "text-faint"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={`text-base leading-6 font-medium tracking-[-0.1px] ${on === i ? "text-ink" : "text-ink-2"}`}>{x.name}</span>
              </button>
            ))}
            <p className="px-4 pt-3 text-sm leading-5 text-faint">Names and figures are illustrative.</p>
          </div>

          <div data-reveal style={{ "--d": "0.1s" } as React.CSSProperties}
            className="relative flex min-h-[620px] flex-1 flex-col overflow-clip rounded-[40px] bg-[linear-gradient(125deg,#d8efff_0%,#9fd8ff_38%,#c9ebff_58%,#62bdf6_100%)] px-4 py-6 md:px-10 md:py-10">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_75%_30%,rgba(255,255,255,0.75),transparent_70%),radial-gradient(50%_35%_at_15%_75%,rgba(255,255,255,0.55),transparent_70%)]" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.55)_0_1px,transparent_1px_3px)] opacity-60" />

            <ol className="relative mx-auto mb-6 flex w-full max-w-[460px] items-center justify-between gap-2">
              {STEPS.map((s, i) => (
                <li key={s} className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs leading-4 font-medium transition-colors duration-500 md:text-[13px]
                  ${i <= lit ? "bg-white text-blue-deep" : i === 2 && stage === "preview" ? "animate-pulse bg-white/70 text-blue-deep" : "bg-white/35 text-ink/50"}`}>
                  <span className="tabular-nums">{i + 1}</span>{s}
                </li>
              ))}
            </ol>

            <div className="relative mx-auto flex w-full max-w-[460px] flex-1 flex-col gap-3">
              <AnimatePresence mode="wait">
                <motion.div key={on} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }} className="flex flex-col gap-3">
                  <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-blue-deep px-4 py-2.5 text-[15px] leading-[22px] text-white">{a.ask}</p>

                  {stage === "ask" && (
                    <p className="nyra-thinking flex items-center gap-2 self-start rounded-2xl bg-white/80 px-4 py-2.5 text-sm text-blue-deep">
                      <NyraMark size={16} /><span className="nyra-thinking-text">Nyra is thinking…</span>
                    </p>
                  )}

                  {stage !== "ask" && (
                    <motion.div initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.45, ease: EASE }}
                      className="relative rounded-[20px] bg-white p-4 shadow-[0_24px_48px_-28px_rgba(15,111,184,0.55)] md:p-5">
                      {stage === "preview" && <BorderBeam size={140} duration={7} borderWidth={2} colorFrom="#0f6fb8" colorTo="#9fd8ff" />}
                      <p className="flex items-center gap-2 pb-3 text-[15px] leading-5 font-semibold"><NyraMark size={16} once className="text-blue-deep" />{a.card}</p>
                      <dl className="flex flex-col">
                        {a.rows.map(([k, v]) => (
                          <div key={k} className="flex items-baseline justify-between gap-4 border-t border-line py-2 text-sm leading-5">
                            <dt className="flex-none text-muted">{k}</dt><dd className="text-right font-medium">{v}</dd>
                          </div>
                        ))}
                        <div className="flex items-baseline justify-between gap-4 border-t border-line py-2 text-sm leading-5">
                          <dt className="flex-none text-muted">Notifies</dt><dd className="text-right font-medium text-blue-deep">{a.notifies}</dd>
                        </div>
                      </dl>

                      {stage === "preview" && (
                        <div className="flex items-center gap-2 pt-3">
                          <button type="button" onClick={() => { setLeft(30); setStage("done"); }}
                            className="h-10 cursor-pointer rounded-full bg-blue-deep px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-press">Confirm</button>
                          <button type="button" onClick={() => setStage("undone")} className="h-10 cursor-pointer rounded-full px-4 text-sm font-medium text-ink-2 transition-colors hover:bg-fill-2">Change</button>
                          <button type="button" onClick={() => setStage("undone")} className="h-10 cursor-pointer rounded-full px-4 text-sm font-medium text-ink-2 transition-colors hover:bg-fill-2">Cancel</button>
                        </div>
                      )}
                      {stage === "done" && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between gap-3 pt-3">
                          <p className="flex items-center gap-2 text-sm leading-5 font-medium"><span className="grid size-5 flex-none place-items-center rounded-full bg-blue-deep text-[11px] text-white">✓</span>{a.done}</p>
                          {left > 0 ? (
                            <button type="button" onClick={() => setStage("undone")}
                              className="flex h-9 flex-none cursor-pointer items-center gap-2 rounded-full bg-blue-soft px-3.5 text-sm font-semibold text-blue-deep shadow-[inset_0_0_0_1px_#bfe3ff] transition-colors hover:bg-[#cfe9fd]">
                              Undo <span className="tabular-nums">{left}s</span>
                            </button>
                          ) : <span className="flex-none text-sm text-faint">Saved</span>}
                        </motion.div>
                      )}
                      {stage === "undone" && (
                        <div className="flex items-center justify-between gap-3 pt-3">
                          <p className="text-sm leading-5 font-medium text-muted">Nothing was changed.</p>
                          <button type="button" onClick={() => setStage("preview")} className="cursor-pointer text-sm font-semibold text-blue-deep underline decoration-blue-deep/30 underline-offset-4">Preview again</button>
                        </div>
                      )}
                    </motion.div>
                  )}
                  {stage !== "ask" && <p className="px-1 text-sm leading-5 text-ink/60">{a.note}</p>}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

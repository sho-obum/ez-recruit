"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import { FAQS } from "./Faq";
import { Badge, CANDIDATES } from "./Nyra";

type Msg = { from: "nyra" | "you"; text: string; kind?: "match" | "demo" };

const HELLO: Msg = { from: "nyra", text: "Hi, I'm Nyra, the AI assistant inside EZRecruit. Ask me anything about the platform, or try one of these." };
const SUGGESTIONS = ["Show me a match", "What can Nyra do?", "Can we import our data?", "How much does it cost?"];

// Scripted replies for the site preview; keyword sets map to FAQ answers.
const RULES: [RegExp, Msg][] = [
  [/demo|talk|sales|contact|call me/, { from: "nyra", text: "Happy to set that up. Leave your details and our team will reach out within a working day.", kind: "demo" }],
  [/match|candidate|score|java|shortlist/, { from: "nyra", text: "Here's how I'd answer \"Who should I call first for the Java role at Acme?\" in your account:", kind: "match" }],
  [/nyra|\bai\b|what can/, { from: "nyra", text: "I score every recommended candidate out of 100 with the reasons, write job descriptions from a client brief, draft screening questions and send each recruiter a daily briefing. Admins set a monthly AI budget, so cost stays in check." }],
  [/import|existing|migrat|bring|database|cv/, { from: "nyra", text: FAQS[1].a }],
  [/cost|price|pricing|quote|plan/, { from: "nyra", text: FAQS[7].a, kind: "demo" }],
  [/email|calendar|outlook|google|gmail/, { from: "nyra", text: FAQS[3].a }],
  [/interview|slot|schedul/, { from: "nyra", text: FAQS[4].a }],
  [/data|secure|separate|privacy|safe/, { from: "nyra", text: FAQS[5].a }],
  [/setup|set up|onboard|how long/, { from: "nyra", text: FAQS[6].a }],
  [/who|agency|staffing/, { from: "nyra", text: FAQS[0].a }],
  [/^(hi|hello|hey)\b/, { from: "nyra", text: "Hello! What would you like to know about EZRecruit?" }],
];
const FALLBACK: Msg = { from: "nyra", text: "I'm a preview here on the website, so I only know the basics. In a demo you'll see me working on real CVs and roles.", kind: "demo" };

const reply = (q: string) => RULES.find(([re]) => re.test(q.toLowerCase()))?.[1] ?? FALLBACK;

export default function NyraChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([HELLO]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing]);

  const ask = (q: string) => {
    if (!q.trim() || typing) return;
    setMsgs(m => [...m, { from: "you", text: q.trim() }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs(m => [...m, reply(q)]); }, 900);
  };

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <div id="nyra-chat" role="dialog" aria-label="Chat with Nyra" aria-hidden={!open} inert={!open}
        className={`flex h-[min(600px,calc(100dvh-112px))] w-[min(392px,calc(100vw-32px))] origin-bottom-right flex-col overflow-clip rounded-[28px] bg-white
          shadow-[0_30px_60px_-24px_rgba(20,20,20,0.35),0_0_0_0.8px_#ebebeb] transition-[opacity,transform,filter] duration-500 ease-(--ease-out)
          ${open ? "opacity-100" : "pointer-events-none scale-90 translate-y-4 opacity-0 blur-[4px]"}`}>
        <div className="flex items-center gap-3 border-b-[0.8px] border-line px-5 py-4">
          <Badge className="size-10 bg-blue"><Icon name="sparkle" size={18} /></Badge>
          <div className="flex flex-col gap-px">
            <span className="text-[15px] leading-[19.5px] font-semibold tracking-[-0.15px]">Nyra</span>
            <span className="flex items-center gap-1.5 text-xs leading-[15.6px] font-medium text-muted">
              <span className="size-1.5 rounded-full bg-green" />AI assistant · website preview
            </span>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close chat"
            className="ml-auto grid size-9 place-items-center rounded-full bg-fill transition-colors hover:bg-line"><Icon name="close" size={16} /></button>
        </div>

        <div ref={list} className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-5" aria-live="polite">
          {msgs.map((m, i) => m.from === "you" ? (
            <p key={i} className="max-w-[80%] self-end rounded-[20px] rounded-br-md bg-ink px-4 py-2.5 text-sm leading-[20.3px] text-white animate-[track-in_0.4s_var(--ease-out)_both]">{m.text}</p>
          ) : (
            <div key={i} className="flex max-w-[90%] flex-col gap-2.5 self-start animate-[track-in_0.5s_var(--ease-out)_both]">
              <p className="rounded-[20px] rounded-bl-md bg-fill-2 px-4 py-2.5 text-sm leading-[20.3px]">{m.text}</p>
              {m.kind === "match" && (
                <ul className="flex flex-col gap-2">
                  {CANDIDATES.map(c => (
                    <li key={c.name} className="flex items-center gap-3 rounded-2xl border-[0.8px] border-line bg-white p-3">
                      <Badge className="size-8 bg-ink text-xs font-medium">{c.initials}</Badge>
                      <div className="flex min-w-0 flex-col gap-px">
                        <span className="text-[13px] leading-[17px] font-medium">{c.name}</span>
                        <span className="truncate text-xs leading-[15.6px] text-muted">{c.reason} · {c.note}</span>
                      </div>
                      <span className="ml-auto rounded-full bg-[#e8f0ff] px-2 py-0.5 text-xs leading-[15.6px] font-semibold text-blue">{c.score}</span>
                    </li>
                  ))}
                </ul>
              )}
              {m.kind === "demo" && <div onClick={() => setOpen(false)}><Button href="#contact" small chevron>Book a demo</Button></div>}
            </div>
          ))}
          {typing && (
            <span aria-label="Nyra is typing" className="flex gap-1 self-start rounded-[20px] rounded-bl-md bg-fill-2 px-4 py-3.5">
              {[0, 0.15, 0.3].map(d => <span key={d} className="size-1.5 animate-pulse rounded-full bg-faint" style={{ animationDelay: `${d}s` }} />)}
            </span>
          )}
          {msgs.length === 1 && (
            <div className="mt-1 flex flex-wrap gap-2">
              {SUGGESTIONS.map(s => (
                <button key={s} type="button" onClick={() => ask(s)}
                  className="rounded-full border-[0.8px] border-line px-3.5 py-2 text-[13px] leading-[17px] font-medium transition-colors hover:bg-fill">{s}</button>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={e => { e.preventDefault(); ask(draft); }} className="flex items-center gap-2 border-t-[0.8px] border-line p-3">
          <input ref={input} value={draft} onChange={e => setDraft(e.target.value)} placeholder="Ask Nyra about EZRecruit"
            aria-label="Message Nyra" className="h-11 flex-1 rounded-full bg-fill-2 px-4 text-sm outline-none placeholder:text-faint focus:ring-2 focus:ring-blue/30" />
          <button type="submit" aria-label="Send" disabled={!draft.trim() || typing}
            className="grid size-11 flex-none place-items-center rounded-full bg-blue text-white transition-opacity disabled:opacity-40"><Icon name="chevron" size={18} stroke={2.5} /></button>
        </form>
      </div>

      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="nyra-chat"
        className="flex h-14 items-center gap-2.5 rounded-full bg-ink pr-5 pl-2 text-[15px] font-medium tracking-[-0.15px] text-white
          shadow-[0_16px_32px_-12px_rgba(20,20,20,0.45)] transition-transform duration-300 ease-(--ease-out) hover:scale-[1.03]
          animate-[track-in_0.8s_var(--ease-out)_both] [animation-delay:calc(var(--boot,0s)+1.2s)]">
        <Badge className="size-10 bg-blue"><Icon name={open ? "close" : "sparkle"} size={18} /></Badge>
        {open ? "Close" : "Ask Nyra"}
      </button>
    </div>
  );
}

import TextCta from "../TextCta";
import TalkButton from "../TalkButton";
import Icon from "../Icon";
import NyraDemo from "./NyraDemo";

const content = {
  title: "Ask in plain words. Get the right people.",
  body: "Ask Nyra like you would ask a teammate. Pick a job below and watch her do it.",
  points: [],
};
export const CANDIDATES = [
  { name: "Arjun Mehta", role: "Senior Java developer", initials: "AM", score: 94, reason: "Spring Boot, 6 yrs", note: "Available in 30 days", fit: [96, 92, 88] },
  { name: "Sara Thomas", role: "Backend engineer", initials: "ST", score: 89, reason: "Microservices, AWS", note: "Serving notice, 15 days", fit: [90, 86, 84] },
  { name: "Rohan Iyer", role: "Java developer", initials: "RI", score: 83, reason: "Joins in 15 days", note: "Interviewed last month", fit: [80, 78, 94] },
];

// Shared by the three split sections. A [data-reveal] element given TRIGGER stays put and only
// flags "is-in"; its RISE children animate from their own --from transform with a --d delay.
export const TRIGGER = { opacity: 1, translate: "none", transition: "none" } as React.CSSProperties;
export const RISE = "transition-[opacity,transform,filter] duration-800 ease-(--ease-out) [transition-delay:var(--d,0s)] motion-safe:[html.js_&]:opacity-0 motion-safe:[html.js_&]:[transform:var(--from)] [html.js_.is-in_&]:opacity-100 [html.js_.is-in_&]:[transform:none]";
export const from = (t: string, d = 0) => ({ "--from": t, "--d": `${d}s` }) as React.CSSProperties;

// Glossy round app icon used inside the mock panels.
export function Badge({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={`relative grid flex-none place-items-center overflow-clip rounded-full text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_0_-3px_8px_0_rgba(0,0,0,0.12)] ${className}`}>
      <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_55%)]" />
      <span className="relative">{children}</span>
    </span>
  );
}

type CopyProps = { title: string; body: string; points: string[]; link?: { label: string; href: string; talk?: boolean }; children?: React.ReactNode };

// Blur-in title, paragraph, optional stats, ticked points and a light link button.
export function SplitCopy({ title, body, points, link, children }: CopyProps) {
  const words = title.split(" ");
  const after = 0.15 + words.length * 0.05;
  return (
    <div data-reveal style={TRIGGER} className="flex w-full flex-col items-start gap-6 lg:w-[466px] lg:flex-none">
      <h2 className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px] md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px]
        lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">
        {words.map((w, i) => (
          <span key={i} className={`mr-[0.24em] inline-block last:mr-0 motion-safe:[html.js_&]:[filter:blur(8px)] [html.js_.is-in_&]:[filter:blur(0)] ${RISE}`}
            style={from("translateY(10px)", 0.1 + i * 0.05)}>{w}</span>
        ))}
      </h2>
      <p className={`text-[17px] leading-[24.65px] tracking-[-0.17px] text-muted md:text-lg md:leading-[26.1px] md:tracking-[-0.18px] lg:text-xl lg:leading-[29px] lg:tracking-[-0.2px] ${RISE}`}
        style={from("translateY(14px)", after)}>{body}</p>
      {children}
      {points.length > 0 && <ul className="flex flex-col gap-3 pt-1 pb-2">
        {points.map((p, i) => (
          <li key={p} className={`flex items-center gap-3 text-[15px] leading-[22.5px] tracking-[-0.075px] md:text-base md:leading-6 md:tracking-[-0.08px] ${RISE}`}
            style={from("translateX(-16px)", after + 0.15 + i * 0.07)}>
            <span className="grid size-6 flex-none place-items-center rounded-full bg-[#c9ebff] text-[#12a150]"><Icon name="tick" size={13} stroke={2.5} /></span>
            {p}
          </li>
        ))}
      </ul>}
      <div className={RISE} style={from("translateY(14px)", after + 0.2 + points.length * 0.07)}>
        {link && (link.talk ? <TalkButton href={link.href}>{link.label}</TalkButton> : <TextCta href={link.href}>{link.label}</TextCta>)}
      </div>
    </div>
  );
}

export default function Nyra() {
  return (
    <section data-section="Split AI" id="ask-nyra" className="flex flex-col items-center overflow-clip px-5 py-18 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <NyraDemo copy={content} />
    </section>
  );
}

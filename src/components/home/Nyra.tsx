import Button from "../Button";
import Icon from "../Icon";
import SectionTag from "../SectionTag";
import { TryNyra, TypeOn } from "./NyraLive";

const content = {
  tag: "Nyra AI",
  title: "Meet Nyra, your team's AI assistant.",
  body: "Nyra reads every CV and every job in your account. Just ask, and she shows you the right people.",
  points: [
    "Gives each candidate a score out of 100, and says why",
    "Writes the job description from your client's brief",
    "Drafts screening questions for each job",
    "Sends a daily update: best matches, feedback due, today's interviews",
  ],
  link: { label: "See Nyra in a demo", href: "#contact" },
  prompt: "Who should I call first for the Java role at Acme?",
  answer: "Nyra found 3 strong matches",
};
export const CANDIDATES = [
  { name: "Arjun Mehta", role: "Senior Java developer", initials: "AM", score: 94, reason: "Spring Boot, 6 yrs", note: "Available in 30 days", fit: [96, 92, 88] },
  { name: "Sara Thomas", role: "Backend engineer", initials: "ST", score: 89, reason: "Microservices, AWS", note: "Serving notice, 15 days", fit: [90, 86, 84] },
  { name: "Rohan Iyer", role: "Java developer", initials: "RI", score: 83, reason: "Joins in 15 days", note: "Interviewed last month", fit: [80, 78, 94] },
];
const FIT = ["Skills", "Experience", "Notice period"];

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

type CopyProps = { n: number; dot?: string; tag: string; title: string; body: string; points: string[]; link: { label: string; href: string }; children?: React.ReactNode };

// Tag, blur-in title, paragraph, optional stats, ticked points and a light link button.
export function SplitCopy({ n, dot, tag, title, body, points, link, children }: CopyProps) {
  const words = title.split(" ");
  const after = 0.15 + words.length * 0.05;
  return (
    <div data-reveal style={TRIGGER} className="flex w-full flex-col items-start gap-6 lg:w-[466px] lg:flex-none">
      <div className={RISE} style={from("translateY(12px)")}><SectionTag n={n} label={tag} dot={dot} /></div>
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
      <ul className="flex flex-col gap-3 pt-1 pb-2">
        {points.map((p, i) => (
          <li key={p} className={`flex items-center gap-3 text-[15px] leading-[22.5px] tracking-[-0.075px] md:text-base md:leading-6 md:tracking-[-0.08px] ${RISE}`}
            style={from("translateX(-16px)", after + 0.15 + i * 0.07)}>
            <span className="grid size-6 flex-none place-items-center rounded-full bg-[#e7f6ee] text-[#12a150]"><Icon name="tick" size={13} stroke={2.5} /></span>
            {p}
          </li>
        ))}
      </ul>
      <div className={RISE} style={from("translateY(14px)", after + 0.2 + points.length * 0.07)}>
        <Button href={link.href} variant="light" chevron>{link.label}</Button>
      </div>
    </div>
  );
}

export default function Nyra() {
  return (
    <section data-section="Split AI" id="nyra" className="flex flex-col items-center overflow-clip px-5 py-18 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="flex w-full max-w-[1136px] flex-col gap-8 md:gap-10 lg:flex-row lg:items-center lg:gap-16">
        <SplitCopy n={1} {...content}>
          <div className={RISE} style={from("translateY(14px)", 0.6)}><TryNyra /></div>
        </SplitCopy>

        <div data-reveal style={TRIGGER} className="relative h-[460px] w-full md:h-[520px] lg:h-[560px] lg:w-[606px] lg:flex-none">
          <div className={`absolute inset-0 overflow-clip rounded-[40px] bg-[linear-gradient(160deg,#e3edff_0%,#f4f7fd_45%,#f7f7f7_100%)] ${RISE}`} style={from("translateY(40px) scale(0.97)")}>
            <span aria-hidden="true" className="absolute -top-24 -left-20 size-72 animate-[pulse_5s_ease-in-out_infinite] rounded-full bg-blue/20 blur-3xl" />
            <p className={`absolute top-5 right-5 w-[270px] rounded-3xl rounded-br-md bg-ink px-[22px] py-[18px] text-[17px] leading-[24.65px] tracking-[-0.17px] text-white
              md:top-10 md:right-10 md:w-[360px] md:text-lg md:leading-[26.1px] md:tracking-[-0.18px] lg:text-xl lg:leading-[29px] lg:tracking-[-0.2px] ${RISE}`}
              style={from("translateY(20px) scale(0.96)", 0.25)}>
              <TypeOn text={content.prompt} delay={900} />
            </p>

            <p className={`absolute top-[150px] left-5 flex items-center gap-2 text-[17px] leading-[24.65px] tracking-[-0.17px]
              md:top-[192px] md:left-10 md:text-lg md:leading-[26.1px] md:tracking-[-0.18px] lg:text-xl lg:leading-[29px] lg:tracking-[-0.2px] ${RISE}`}
              style={from("translateY(10px)", 2.3)}>
              <Icon name="sparkle" size={18} className="text-blue" />
              {content.answer}
            </p>

            <ul className="absolute top-[190px] left-5 flex gap-3.5 md:top-[236px] md:left-10">
              {CANDIDATES.map((c, i) => (
                <li key={c.name} className={`flex h-[340px] w-[224px] flex-none flex-col gap-3.5 rounded-3xl bg-white p-[18px] shadow-[0_18px_32px_-20px_rgba(20,20,20,0.25)] ${RISE}`}
                  style={from("translateX(70px)", 2.4 + i * 0.12)}>
                  <div className="flex items-center gap-2.5">
                    <Badge className="size-9 bg-ink text-[13px] font-medium tracking-[-0.13px]">{c.initials}</Badge>
                    <div className="flex flex-col gap-px">
                      <span className="text-sm leading-[18.2px] font-medium tracking-[-0.14px]">{c.name}</span>
                      <span className="text-xs leading-[15.6px] font-medium text-muted">{c.role}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[40px] leading-[44px] font-semibold tracking-[-1.4px]">{c.score}</span>
                    <span className="text-sm leading-[18.2px] font-medium text-muted">/100</span>
                  </div>
                  <span className="rounded-full bg-[#e8f0ff] px-2.5 py-1 text-xs leading-[15.6px] font-medium text-blue">{c.reason}</span>
                  <div className="mt-auto flex w-full flex-col gap-2.5">
                    {FIT.map((f, n) => (
                      <div key={f} className="flex flex-col gap-1.5">
                        <span className="flex justify-between text-xs leading-[15.6px] font-medium text-muted"><span>{f}</span><span className="text-ink">{c.fit[n]}</span></span>
                        <span className="block h-1.5 overflow-clip rounded-full bg-fill">
                          <span className={`block h-full origin-left rounded-full ${n === 0 ? "bg-blue" : "bg-[#b3d1ff]"} ${RISE}`}
                            style={{ ...from("scaleX(0)", 2.8 + i * 0.12 + n * 0.08), width: `${c.fit[n]}%` }} />
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs leading-[15.6px] font-medium text-muted">{c.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

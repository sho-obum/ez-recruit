import nyra from "@/content/nyra.json";
import { Marquee } from "../ui21/marquee";

// Real Hinglish asks from the guide, mixed in with English ones taken from the capability list.
const HINGLISH = ["mere kitne interviews hain is week", "JC-2041 ka status", "Rahul ka interview cancel kar do", "Mehul ka offer kya hua"];
const ENGLISH = [...new Set(nyra.areas.flatMap(a => a.cards.flatMap(c => c.prompts)).map(p => p.replace(/[“”"]/g, "").trim())
  .filter(p => p.length > 14 && p.length < 46 && !p.startsWith("(") && !/[a-z] (ka|kar|hain|kya) /i.test(p)))];
const pick = (from: number) => ENGLISH.filter((_, i) => i % 7 === from).slice(0, 10);
const ROWS = [
  [HINGLISH[0], ...pick(0).slice(0, 5), HINGLISH[1], ...pick(0).slice(5)],
  [...pick(3).slice(0, 4), HINGLISH[2], ...pick(3).slice(4), HINGLISH[3]],
];

function Chip({ text }: { text: string }) {
  const hi = HINGLISH.includes(text);
  return (
    <span className={`rounded-full px-5 py-2.5 text-[15px] leading-5 whitespace-nowrap ${hi ? "bg-blue-soft text-blue-deep shadow-[inset_0_0_0_1px_#bfe3ff]" : "bg-white text-ink-2 shadow-[inset_0_0_0_1px_var(--color-line)]"}`}>
      &ldquo;{text}&rdquo;
    </span>
  );
}

export default function NyraSpeak() {
  return (
    <section id="languages" className="flex flex-col items-center gap-10 overflow-clip bg-fill-2 py-18 md:py-24 lg:gap-14 lg:py-28">
      <div className="flex w-full max-w-[1136px] flex-col items-start gap-5 px-5 md:px-6 lg:px-8">
        <h2 data-reveal className="max-w-[760px] text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px] md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px] lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">
          Ask the way your team actually talks.
        </h2>
        <p data-reveal style={{ "--d": "0.1s" } as React.CSSProperties} className="max-w-[520px] text-[17px] leading-[24.65px] text-muted md:text-lg md:leading-[26.1px]">
          English, Hindi or Hinglish. Same answers and actions, whatever the language.
        </p>
      </div>
      <div aria-hidden="true" className="flex w-full flex-col gap-1 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <Marquee pauseOnHover className="[--duration:60s] [--gap:0.75rem]">{ROWS[0].map(t => <Chip key={t} text={t} />)}</Marquee>
        <Marquee pauseOnHover reverse className="[--duration:70s] [--gap:0.75rem]">{ROWS[1].map(t => <Chip key={t} text={t} />)}</Marquee>
      </div>
    </section>
  );
}

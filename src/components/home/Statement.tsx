import Icon, { type IconName } from "../Icon";
import StatementX from "./StatementX";

type Chip = { icon: IconName; tone: string };
// "|" marks where an icon chip sits in the sentence.
const content = {
  sentence: "EZRecruit | is where agency teams add jobs, find and check candidates, | share them with clients and fill roles, | all in one calm place.",
  chips: [
    { icon: "briefcase", tone: "bg-[linear-gradient(#2b7fff,#0052ff)] text-white" },
    { icon: "check", tone: "bg-[linear-gradient(#e0ff5c,#b8e600)] text-ink" },
    { icon: "handshake", tone: "bg-[linear-gradient(#2ee66f,#00b843)] text-white" },
  ] as Chip[],
};

// Each item goes from 12% to full and rises 14px as --p (set by StatementX) passes its index.
const fill = (i: number) => ({
  "--i": i,
  "--t": "clamp(0, calc(var(--p, 1) * (var(--n) + 3) - var(--i)), 1)",
  opacity: "calc(0.12 + 0.88 * var(--t))",
  translate: "0 calc((1 - var(--t)) * 14px)",
}) as React.CSSProperties;

export default function Statement() {
  const tokens = content.sentence.split(" ");
  let chip = 0;
  return (
    <section data-section="Statement" className="flex flex-col items-center overflow-clip px-5 py-22 md:px-6 md:py-30 lg:px-8 lg:py-55">
      <StatementX count={tokens.length}
        className="flex max-w-[1000px] flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-[30px] leading-[34.5px] font-medium tracking-[-0.9px]
          md:gap-x-[11px] md:gap-y-1 md:text-[42px] md:leading-[46.2px] md:tracking-[-1.47px] lg:gap-x-3.5 lg:gap-y-1.5 lg:text-[56px] lg:leading-[61.6px] lg:tracking-[-1.96px]">
        {tokens.map((t, i) => {
          if (t !== "|") return <span key={i} className="inline-block" style={fill(i)}>{t}</span>;
          const c = content.chips[chip++];
          return (
            <span key={i} aria-hidden="true" style={fill(i)}
              className={`inline-grid size-[34px] place-items-center rounded-[10px] md:size-[46px] md:rounded-[13px] lg:size-[60px] lg:rounded-2xl
                shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_0_-3px_8px_0_rgba(0,0,0,0.12),0_10px_20px_-10px_rgba(20,20,20,0.35)]
                [&>svg]:size-4 md:[&>svg]:size-5 lg:[&>svg]:size-6 ${c.tone}`}>
              <Icon name={c.icon} size={24} stroke={2} />
            </span>
          );
        })}
      </StatementX>
    </section>
  );
}

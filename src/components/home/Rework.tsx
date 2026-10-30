import Icon from "../Icon";
import { Badge, RISE, SplitCopy, TRIGGER, from } from "./Nyra";

const content = {
  tag: "Less rework",
  title: "Stop doing the same work twice.",
  body: "Every search, CV and submission is saved and reused, so the next role starts where the last one ended.",
  points: ["Bulk CV import, read in moments", "A new CV replaces the old one everywhere", "Email typos caught as you type"],
  link: { label: "Read The Glove story", href: "https://ezrecruit.ai/blog/case-study-the-glove-how-the-glove-got-an-hour-back-per-recruiter-every-day/" },
};
const STATS = [
  { value: "1 hr", label: "back per recruiter, every day, at The Glove" },
  { value: "1 record", label: "per candidate: email and phone are checked before anyone is added" },
];
// The mock "Add candidate" form: email and phone light up as matches, then the duplicate warning.
const FIELDS = [
  { label: "Add candidate", value: "Priya Nair" },
  { label: "Email", value: "priya.nair@gmail.com", match: true },
  { label: "Phone", value: "+91 98200 41736", match: true },
];
const BLOCK = "relative flex flex-col gap-2 overflow-clip rounded-2xl bg-[#262626] p-3.5";
const LABEL = "relative font-mono text-xs leading-[15.6px] font-medium tracking-[0.48px] uppercase text-white/60";
const VALUE = "relative text-sm leading-[18.2px] font-medium tracking-[-0.14px] text-white";

export default function Rework() {
  return (
    <section data-section="Split Automations" className="flex flex-col items-center overflow-clip px-5 pt-8 pb-18 md:px-6 md:pt-12 md:pb-24 lg:px-8 lg:pt-16 lg:pb-32">
      <div className="flex w-full max-w-[1136px] flex-col gap-8 md:gap-10 lg:flex-row lg:items-center lg:gap-16">
        <SplitCopy n={4} dot="bg-[#2ee6c5]" {...content}>
          <dl className={`flex gap-10 py-2 ${RISE}`} style={from("translateY(14px)", 0.65)}>
            {STATS.map(s => (
              <div key={s.value} className="flex flex-1 flex-col gap-1 border-l border-line pl-4 md:max-w-[200px]">
                <dt className="text-[28px] leading-[30.8px] font-semibold tracking-[-0.98px] md:text-[34px] md:leading-[37.4px] md:tracking-[-1.19px] lg:text-[40px] lg:leading-[44px] lg:tracking-[-1.4px]">{s.value}</dt>
                <dd className="text-sm leading-[18.2px] font-medium tracking-[-0.14px] text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </SplitCopy>

        <div data-reveal style={TRIGGER} className="relative h-[430px] w-full md:h-[520px] lg:order-first lg:h-[560px] lg:w-[606px] lg:flex-none">
          <div className={`absolute inset-0 overflow-clip rounded-[40px] bg-ink ${RISE}`} style={from("translateY(40px) scale(0.97)")}>
            <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-[676px] items-center justify-center perspective-[900px] md:flex lg:w-[330px]">
              <span className={`absolute h-[280px] w-[596px] rounded-full bg-blue blur-[90px] lg:h-[320px] lg:w-[250px] ${RISE}`} style={from("scale(0.6)", 0.2)} />
              <span className="block transform-3d rotate-x-[6deg] rotate-y-[-16deg] -rotate-2">
                <span className={`block ${RISE}`} style={from("scale(0.4) rotate(-30deg)", 0.3)}>
                  <Badge className="size-[168px] rounded-[48px]! bg-blue-deep"><Icon name="userCheck" size={77} stroke={1.8} /></Badge>
                </span>
              </span>
            </div>

            <div aria-hidden="true" className="absolute inset-x-3.5 top-3.5 flex flex-col gap-1.5 rounded-[28px] bg-ink p-1.5 ring-1 ring-white/10
              md:left-auto md:w-[256px] lg:right-auto lg:left-[336px]">
              {FIELDS.map((f, i) => (
                <div key={f.label} className={`${BLOCK} ${RISE}`} style={from("translateY(16px)", 0.2 + i * 0.08)}>
                  {f.match && <span className={`absolute inset-0 bg-orange/14 ${RISE}`} style={from("translateX(-101%)", 1 + i * 0.1)} />}
                  <span className={LABEL}>{f.label}</span>
                  <span className={`${VALUE} flex items-center justify-between`}>
                    {f.value}
                    {f.match && <span className="size-2 rounded-full bg-orange" />}
                  </span>
                </div>
              ))}

              <div className={`flex flex-col gap-2 rounded-2xl bg-[#262626] px-1.5 pt-3.5 pb-1.5 ${RISE}`} style={from("translateY(16px)", 0.44)}>
                <span className={`${LABEL} px-2 text-orange`}>Already on file</span>
                <span className="flex items-center gap-2 px-2">
                  <Badge className="size-7 bg-lime text-xs font-medium text-ink">PN</Badge>
                  <span className={VALUE}>Priya Nair</span>
                  <span className="ml-auto text-xs leading-[15.6px] font-medium text-white/60">Java, Pune</span>
                </span>
                <span className="flex gap-1.5 text-[13px] leading-[16.9px] font-medium">
                  <span className="grid h-[34px] flex-1 place-items-center rounded-xl bg-white text-ink">Open profile</span>
                  <span className="grid h-[34px] flex-1 place-items-center rounded-xl bg-[#404040] text-white">Update CV</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

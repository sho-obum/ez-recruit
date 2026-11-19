import Icon from "../Icon";
import { Badge, RISE, SplitCopy, TRIGGER, from } from "./Nyra";

const content = {
  title: "Stop doing the same work twice.",
  body: "Every search, CV and candidate you send is saved, so you can use it again on the next role.",
  points: ["Upload many CVs, read in moments", "A new CV replaces the old one everywhere", "Email mistakes found as you type"],
  link: { label: "Read The Glove story", href: "https://ezrecruit.ai/blog/case-study-the-glove-how-the-glove-got-an-hour-back-per-recruiter-every-day/" },
};
// The mock "Add candidate" form: email and phone light up as matches, then the duplicate warning.
const FIELDS = [
  { label: "Name", value: "Priya Nair" },
  { label: "Email", value: "priya.nair@gmail.com", match: true },
  { label: "Phone", value: "+91 98200 41736", match: true },
];
const LABEL = "text-xs leading-[15.6px] font-medium text-muted";
const VALUE = "text-[15px] leading-5 font-medium tracking-[-0.15px] text-ink";

export default function Rework() {
  return (
    <section data-section="Split Automations" className="flex flex-col items-center overflow-clip px-5 pt-8 pb-18 md:px-6 md:pt-12 md:pb-24 lg:px-8 lg:pt-16 lg:pb-32">
      <div className="flex w-full max-w-[1136px] flex-col gap-8 md:gap-10 lg:flex-row lg:items-center lg:gap-16">
        <SplitCopy {...content} />

        <div data-reveal style={TRIGGER} className="relative h-[430px] w-full md:h-[520px] lg:order-first lg:h-[560px] lg:w-[606px] lg:flex-none">
          {/* Calm sky-blue panel with one frosted card, same family as the step panels. */}
          <div aria-hidden="true" className={`absolute inset-0 grid place-items-center overflow-clip rounded-[40px] bg-[linear-gradient(125deg,#d8efff_0%,#9fd8ff_38%,#c9ebff_58%,#62bdf6_100%)] px-5 ${RISE}`}
            style={from("translateY(40px) scale(0.97)")}>
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_75%_30%,rgba(255,255,255,0.75),transparent_70%),radial-gradient(50%_35%_at_15%_75%,rgba(255,255,255,0.55),transparent_70%)]" />
            <span className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.55)_0_1px,transparent_1px_3px)] opacity-60" />

            <div className="relative flex w-full max-w-[400px] flex-col rounded-[18px] bg-white/80 px-[22px] pt-5 pb-[22px] backdrop-blur-[10px]">
              <p className={`flex items-center gap-2.5 pb-4 text-[17px] leading-6 font-medium tracking-[-0.17px] ${RISE}`} style={from("translateY(12px)", 0.2)}>
                <Icon name="userCheck" size={18} className="text-blue" />Add candidate
              </p>
              {FIELDS.map((f, i) => (
                <div key={f.label} className={`relative flex items-center justify-between overflow-clip border-t border-ink/8 py-3 ${RISE}`} style={from("translateY(12px)", 0.28 + i * 0.08)}>
                  <span className="relative flex flex-col gap-0.5">
                    <span className={LABEL}>{f.label}</span>
                    <span className={VALUE}>{f.value}</span>
                  </span>
                  {f.match && <span className="relative rounded-full bg-blue-soft px-2 py-0.5 text-xs leading-[15.6px] font-medium text-blue-deep">Match</span>}
                </div>
              ))}

              <div className={`mt-2 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-[0_8px_24px_-8px_rgba(58,168,242,0.45)] ${RISE}`} style={from("translateY(16px)", 0.55)}>
                <span className="flex items-center gap-2.5">
                  <Badge className="size-8 bg-[linear-gradient(140deg,#7cc8fb,#3aa8f2)] text-[11px] font-semibold">PN</Badge>
                  <span className="flex flex-col">
                    <span className={VALUE}>Priya Nair</span>
                    <span className={LABEL}>Already on file · Java, Pune</span>
                  </span>
                </span>
                <span className="flex gap-1.5 text-[13px] leading-[16.9px] font-medium">
                  <span className="grid h-9 flex-1 place-items-center rounded-full bg-blue-deep text-white">Open profile</span>
                  <span className="grid h-9 flex-1 place-items-center rounded-full bg-fill text-ink">Update CV</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Icon from "../Icon";
import { Badge, RISE, SplitCopy, TRIGGER, from } from "./Nyra";

const content = {
  title: "Built for agencies, anywhere.",
  body: "Work with clients in any country from one system, with what each one needs.",
  points: [
    "International servers",
    "Many clients, each with their own contacts, locations and rate cards",
    "Works with Outlook and Google Workspace",
  ],
};
// Sample clients are fictional.
const REGIONS = [
  { code: "IN", name: "India", hosted: "Hosted in India", tone: "bg-orange", client: "Kestrel Logistics", meta: "Bengaluru, Pune · 4 contacts", rate: "8.33% of annual CTC", shift: "md:-translate-x-6" },
  { code: "US", name: "United States", hosted: "Hosted in the US", tone: "bg-blue", client: "Harbor Health", meta: "Austin, Dallas · 3 contacts", rate: "$62/hr, C2C or W-2", shift: "md:translate-x-6" },
];

export default function Regions() {
  return (
    <section id="international" data-section="Split Payouts" className="flex flex-col items-center overflow-clip px-5 pt-8 pb-18 md:px-6 md:pt-12 md:pb-24 lg:px-8 lg:pt-16 lg:pb-32">
      <div className="flex w-full max-w-[1136px] flex-col gap-8 md:gap-10 lg:flex-row lg:items-center lg:gap-16">
        <SplitCopy {...content} />

        <div data-reveal style={TRIGGER} className="relative h-[460px] w-full md:h-[520px] lg:h-[560px] lg:w-[606px] lg:flex-none">
          <div aria-hidden="true" className={`absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-clip rounded-[40px] bg-fill-2 px-5 ${RISE}`}
            style={from("translateY(40px) scale(0.97)")}>
            {REGIONS.map((r, i) => (
              <div key={r.code} className={`w-full max-w-[360px] ${r.shift}`}>
                <div className={`overflow-clip rounded-[28px] bg-white shadow-[0_24px_48px_-28px_rgba(20,20,20,0.3)] ${RISE}`} style={from("translateY(30px) scale(0.96)", 0.2 + i * 0.15)}>
                  <div className="flex items-center gap-2.5 border-b border-line px-4 py-3.5 md:gap-3 md:px-5">
                    <Badge className={`size-[38px] text-[13px] font-semibold ${r.tone}`}>{r.code}</Badge>
                    <span className="flex-1 text-base leading-[20.8px] font-medium tracking-[-0.16px]">{r.name}</span>
                  </div>
                  <div className="flex flex-col gap-3 px-4 pt-3 pb-4 md:px-5">
                    <div className="flex items-center gap-3">
                      <Badge className="size-[38px] bg-ink"><Icon name="building" size={17} /></Badge>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-sm leading-[18.2px] font-medium tracking-[-0.14px]">{r.client}</span>
                        <span className="text-xs leading-[15.6px] font-medium text-muted">{r.meta}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-fill-2 px-3 py-2.5 text-xs leading-[15.6px] font-medium">
                      <span className="text-muted">Rate card</span>
                      <span className="text-sm leading-[18.2px] tracking-[-0.14px]">{r.rate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <span className={`absolute top-6 left-7 z-2 hidden items-center gap-2 rounded-full bg-white px-3.5 py-2.5 text-sm leading-[18.2px] font-medium tracking-[-0.14px]
              shadow-[0_12px_24px_-14px_rgba(20,20,20,0.25)] md:flex ${RISE}`} style={from("translateY(-24px)", 0.6)}>
              <Icon name="globe" size={14} className="text-blue-deep" />One system, any country
            </span>
            <span className={`absolute right-4 bottom-4 z-2 flex items-center gap-2 rounded-full bg-ink px-3.5 py-2.5 text-sm leading-[18.2px] font-medium tracking-[-0.14px] text-white
              shadow-[0_12px_24px_-14px_rgba(20,20,20,0.4)] md:right-10 md:bottom-14 ${RISE}`} style={from("translateY(24px)", 0.75)}>
              <Icon name="mail" size={14} className="text-lime" />Outlook and Google Workspace
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

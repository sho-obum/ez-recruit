import Icon, { type IconName } from "../Icon";
import SectionTag from "../SectionTag";

const content = {
  title: "Everything an agency runs on.",
  side: "Start with requirements and candidates and add the rest as you grow. Everything shares one database, one login and one pipeline.",
};

const MINI = "rounded-3xl bg-white shadow-[0_16px_32px_-24px_rgba(20,20,20,0.22)]";
const TILE_ICON = "grid shrink-0 place-items-center text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_0_-3px_8px_0_rgba(0,0,0,0.12)]";
const SMALL = "text-xs leading-[15.6px] font-medium";
const BODY = "text-sm leading-[18.2px] font-medium tracking-[-0.14px]";

function Requirements() {
  return (
    <div className="absolute inset-x-0 top-[170px] bottom-0 md:top-[114px]">
      <div className={`absolute top-0 left-7 flex w-[260px] flex-col gap-2.5 p-4 md:top-[60px] ${MINI}`}>
        <div className="flex items-center gap-2.5">
          <span className={`${TILE_ICON} size-8 rounded-[10px] bg-blue-deep`}><Icon name="mail" size={15} /></span>
          <span className="flex flex-col gap-px"><span className={BODY}>Client brief</span><span className={`${SMALL} text-muted`}>Acme Logistics</span></span>
        </div>
        <p className="rounded-xl bg-fill-2 px-3 py-2 text-[13px] leading-[18px] text-ink-2">Need a senior Java dev, Spring Boot, 5+ years, can join in 30 days.</p>
        <span className="flex items-center justify-center gap-2 rounded-xl bg-blue px-[18px] py-3 text-base leading-[19.2px] font-medium tracking-[-0.16px] text-white">
          <Icon name="sparkle" size={15} />Generate with Nyra
        </span>
      </div>
      <div className={`absolute inset-x-5 top-[178px] flex flex-col gap-3 p-4 md:inset-x-auto md:top-[68px] md:right-7 md:w-[416px] ${MINI}`}>
        <div className="flex items-center gap-2.5">
          <span className={`${TILE_ICON} size-8 rounded-[10px] bg-violet`}><Icon name="file" size={15} /></span>
          <span className="flex min-w-0 flex-1 flex-col gap-px"><span className={BODY}>Senior Java Developer</span><span className={`${SMALL} text-muted`}>Job description by Nyra</span></span>
          <span className={`${SMALL} hidden rounded-full bg-[#e7f6ee] px-2.5 py-1.5 text-[#12a150] md:block`}>Draft ready</span>
        </div>
        <p className="text-[13px] leading-[18px] text-muted">Build and run Spring Boot services for a fast growing logistics platform.</p>
        <div className="flex flex-wrap gap-1.5">
          {["Years with Spring Boot?", "Current notice period?"].map(q => (
            <span key={q} className={`${SMALL} rounded-full bg-fill-2 px-2.5 py-1.5 text-ink-2`}>{q}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const FILES: [string, string, string][] = [
  ["PDF", "bg-orange", "priya_nair_cv.pdf"], ["DOCX", "bg-blue-deep", "rahul_mehta.docx"], ["RTF", "bg-violet", "aisha_khan.rtf"],
  ["PDF", "bg-ink", "vikram_rao_cv.pdf"], ["DOCX", "bg-green", "neha_joshi.docx"], ["PDF", "bg-orange", "arjun_das.pdf"],
];
function FileRow({ shift, reverse }: { shift: number; reverse?: boolean }) {
  const files = [...FILES.slice(shift), ...FILES.slice(0, shift)];
  return (
    <div className="flex w-max gap-2 [animation:suite-ticker_36s_linear_infinite] motion-reduce:[animation:none]"
      style={{ animationDirection: reverse ? "reverse" : "normal" }}>
      {[...files, ...files].map(([type, tone, name], n) => (
        <span key={n} className="flex items-center gap-3 rounded-full bg-white py-2.5 pr-5 pl-2.5">
          <span className={`${TILE_ICON} size-9 rounded-xl text-[10px] leading-none font-semibold tracking-[0.02em] ${tone}`}>{type}</span>
          <span className={BODY}>{name}</span>
        </span>
      ))}
    </div>
  );
}

function Candidates() {
  return (
    <div className="absolute inset-x-0 top-[118px] bottom-0 flex flex-col items-center justify-center gap-7 pb-7">
      <style>{"@keyframes suite-ticker { to { transform: translateX(-50%); } }"}</style>
      <div className="flex w-full flex-col gap-2.5 overflow-clip mask-[linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <FileRow shift={0} />
        <FileRow shift={2} reverse />
        <FileRow shift={4} />
        <FileRow shift={1} reverse />
      </div>
      <span className="flex items-center gap-2 rounded-full bg-[#fff1e8] py-2 pr-4 pl-2 text-orange">
        <span className={`${TILE_ICON} size-7 rounded-full bg-orange`}><Icon name="copy" size={13} /></span>
        <span className={BODY}>Duplicate found: same email and phone</span>
      </span>
      <div className={`flex w-[280px] flex-col gap-2.5 rounded-[20px] p-4 ${MINI}`}>
        <div className="flex items-center justify-between">
          <span className={`${SMALL} text-muted`}>Bulk upload</span>
          <span className={BODY}>118 of 120 read</span>
        </div>
        <span className="block h-2 overflow-clip rounded-full bg-fill"><span className="block h-full w-[98%] rounded-full bg-blue" /></span>
      </div>
    </div>
  );
}

const SLOTS = [
  { when: "Tue 4 Nov, 10:30", note: "Picked by Priya", picked: true },
  { when: "Tue 4 Nov, 14:00", note: "Open" },
  { when: "Wed 5 Nov, 11:00", note: "Open" },
];
function Interviews() {
  return (
    <div className={`absolute inset-x-7 -bottom-3.5 flex flex-col overflow-clip ${MINI}`}>
      {SLOTS.map(s => (
        <div key={s.when} className="flex items-center gap-2.5 border-b border-line px-3.5 py-2.5 last:border-0">
          <span className={`${TILE_ICON} size-7 rounded-[9px] ${s.picked ? "bg-blue-deep" : "bg-ink"}`}><Icon name="clock" size={13} /></span>
          <span className={`${BODY} flex-1`}>{s.when}</span>
          <span className={`${SMALL} ${s.picked ? "rounded-full bg-[#e7f6ee] px-2 py-1 text-[#12a150]" : "text-faint"}`}>{s.note}</span>
        </div>
      ))}
    </div>
  );
}

const OFFERS = [
  { label: "Offer accepted", name: "Priya Nair", pill: "Joins 12 Dec", icon: "calendar" as IconName, tone: "bg-blue-deep" },
  { label: "Joined", name: "Rahul Mehta", pill: "3 Nov", icon: "tick" as IconName, tone: "bg-green" },
];
function Closures() {
  return (
    <div className={`absolute inset-x-7 -bottom-3.5 flex flex-col gap-2 p-3 ${MINI}`}>
      {OFFERS.map(o => (
        <div key={o.name} className="flex items-center justify-between gap-3 rounded-2xl bg-fill-2 px-4 py-3">
          <span className="flex flex-col gap-1">
            <span className={`${SMALL} text-muted`}>{o.label}</span>
            <span className="text-xl leading-[25px] font-medium tracking-[-0.4px] md:text-2xl md:leading-[30px]">{o.name}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white py-1.5 pr-3 pl-1.5">
            <span className={`${TILE_ICON} size-6 rounded-full ${o.tone}`}><Icon name={o.icon} size={12} /></span>
            <span className={BODY}>{o.pill}</span>
          </span>
        </div>
      ))}
      <span className="pb-2 text-center text-xs leading-[15.6px] text-faint">Revenue counted by date of joining</span>
    </div>
  );
}

const GOAL_BARS = [21, 25, 28, 32, 36, 42, 49, 59];
function Goals() {
  return (
    <div className={`absolute inset-x-7 -bottom-3.5 flex flex-col gap-2.5 p-4 ${MINI}`}>
      <div className="flex items-center gap-2">
        <span className="flex-1 text-[28px] leading-[32.2px] font-medium tracking-[-0.84px]">18 of 24</span>
        <span className={`${SMALL} rounded-full bg-[#e7f6ee] px-2.5 py-1.5 text-[#12a150]`}>75%</span>
      </div>
      <div className="flex h-[70px] items-end gap-[5px]">
        {GOAL_BARS.map((h, n) => (
          <span key={n} className={`flex-1 rounded-lg ${n === GOAL_BARS.length - 1 ? "bg-blue" : "bg-[#b3d1ff]"}`} style={{ height: h }} />
        ))}
      </div>
    </div>
  );
}

const MATCHES: [string, number, string][] = [["Priya N.", 92, "bg-[#ffd6a8]"], ["Rahul M.", 88, "bg-[#c9dcff]"], ["Aisha K.", 81, "bg-[#d8f5c4]"]];
function Nyra() {
  return (
    <div className="absolute inset-x-7 -bottom-3 flex justify-center">
      <div className="flex w-full max-w-[620px] flex-col gap-2.5">
        <div className="flex justify-end">
          <p className="max-w-[360px] rounded-[22px] bg-fill px-[18px] py-3.5 text-[15px] leading-[22.5px] tracking-[-0.075px] text-ink md:text-base md:leading-6 md:tracking-[-0.08px]">
            Find Java developers in Pune with 5+ years
          </p>
        </div>
        <div className={`flex flex-col gap-2.5 p-3.5 ${MINI}`}>
          <div className="flex items-center gap-2">
            <span className={`${TILE_ICON} size-[26px] rounded-lg bg-violet`}><Icon name="sparkle" size={12} /></span>
            <span className={BODY}>Three matches with Spring Boot, all based in Pune.</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {MATCHES.map(([name, score, tone]) => (
              <span key={name} className="flex items-center gap-1.5 rounded-[10px] bg-fill-2 px-2.5 py-2">
                <span className={`size-3.5 shrink-0 rounded-full ${tone}`} />
                <span className={`${SMALL} hidden truncate text-ink md:inline`}>{name}</span>
                <span className={`${SMALL} text-[#12a150]`}>{score}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const TILES = [
  { title: "Requirements", text: "Paste the client's brief and Nyra drafts the job description and screening questions.", stage: <Requirements />,
    span: "h-[400px] md:col-span-2 md:h-auto" },
  { title: "Candidates", text: "Every CV read on upload, even in bulk. Duplicates are caught by email and phone.", stage: <Candidates />,
    span: "h-[620px] md:row-span-2 md:h-auto lg:col-start-3" },
  { title: "Interviews", text: "Schedule interviews, and let candidates pick their own slot.", stage: <Interviews />, span: "h-[320px] md:h-auto" },
  { title: "Closures", text: "Track offers and joining dates, and see revenue by date of joining.", stage: <Closures />, span: "h-[340px] md:h-auto" },
  { title: "Goals", text: "Set team targets that complete themselves when they are met.", stage: <Goals />, span: "h-[320px] md:col-span-2 md:h-auto lg:col-span-1" },
  { title: "Nyra AI", text: "Ask in plain words and get the right candidates, with reasons.", stage: <Nyra />, span: "h-[360px] md:col-span-2 md:h-auto" },
];

export default function Suite() {
  return (
    <section data-section="Suite" className="flex flex-col items-center overflow-clip px-5 py-18 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="flex w-full max-w-[1136px] flex-col gap-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-12">
          <div className="flex flex-col gap-6 lg:flex-1">
            <SectionTag n={2} label="Products" />
            <h2 data-reveal className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px] md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px]
              lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">{content.title}</h2>
          </div>
          <p data-reveal style={{ "--d": "0.1s" } as React.CSSProperties}
            className="text-[17px] leading-[24.65px] tracking-[-0.17px] text-muted md:text-lg md:leading-[26.1px] md:tracking-[-0.18px] lg:flex-1 lg:text-xl lg:leading-[29px] lg:tracking-[-0.2px]">
            {content.side}
          </p>
        </div>

        <div className="flex flex-col gap-3 md:grid md:auto-rows-[344px] md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {TILES.map(t => (
            <div key={t.title} data-reveal className={`relative flex flex-col overflow-clip rounded-[32px] bg-fill-2 p-7 ${t.span}`}>
              <div className="relative z-2 flex max-w-[420px] flex-col gap-1.5">
                <h3 className="text-[22px] leading-[25.3px] font-medium tracking-[-0.66px] md:text-2xl md:leading-[27.6px] md:tracking-[-0.72px]
                  lg:text-[28px] lg:leading-[32.2px] lg:tracking-[-0.84px]">{t.title}</h3>
                <p className="text-[15px] leading-[22.5px] tracking-[-0.075px] text-muted md:text-base md:leading-6 md:tracking-[-0.08px]">{t.text}</p>
              </div>
              <div aria-hidden="true">{t.stage}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

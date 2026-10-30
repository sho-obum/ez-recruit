import Icon from "../Icon";
import SectionTag from "../SectionTag";

const content = {
  title: "From brief to closure, in one place",
  sub: "Take the client's brief, find the right people in your own database, keep clients updated and see every closure, all from one place.",
};

const CANDIDATES: [string, number][] = [
  ["Priya Nair", 92], ["Rahul Mehta", 88], ["Aisha Khan", 81], ["Vikram Rao", 77],
  ["Neha Joshi", 74], ["Arjun Das", 70], ["Sara Thomas", 66], ["Karan Shah", 61],
];
const TRACKER = [
  { name: "Priya Nair", stage: "Interview", tone: "bg-[#e2ecff] text-blue", notice: "30 days" },
  { name: "Rahul Mehta", stage: "Submitted", tone: "bg-[#ecebff] text-violet", notice: "15 days" },
  { name: "Aisha Khan", stage: "Offer", tone: "bg-[#e7f6ee] text-[#12a150]", notice: "60 days" },
];
// Bar heights in px; the last four are the lighter "this month" bars.
const BARS = [45, 55, 50, 66, 60, 74, 81, 88, 100, 110];

const CARD = "rounded-2xl bg-white p-3.5 shadow-[0_14px_28px_-16px_rgba(20,20,20,0.28)]";
const SMALL = "text-xs leading-[15.6px] font-medium";
const BODY = "text-sm leading-[18.2px] font-medium tracking-[-0.14px]";

function Brief() {
  return (
    <div className="absolute top-0 left-1/2 h-[250px] w-[272px] -translate-x-1/2">
      <div className="absolute top-[70px] left-[50px] h-[120px] w-[172px] rounded-2xl bg-fill" />
      <div className="absolute top-12 left-9 h-[130px] w-[200px] rounded-2xl bg-white opacity-80" />
      <div className={`absolute top-[22px] left-[22px] flex w-[228px] flex-col gap-3 ${CARD}`}>
        <div className="flex items-center gap-2.5">
          <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-ink text-white"><Icon name="briefcase" size={15} /></span>
          <span className="flex min-w-0 flex-col gap-px">
            <span className={`${BODY} truncate`}>Senior Java Developer</span>
            <span className={`${SMALL} text-faint`}>Acme Logistics</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Java", "Spring Boot", "5+ yrs"].map(s => (
            <span key={s} className={`${SMALL} rounded-full bg-fill-2 px-2 py-1 text-ink-2`}>{s}</span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#12a150]" />
          <span className={`${SMALL} text-muted`}>Notice period 30 days</span>
        </div>
      </div>
    </div>
  );
}

function Database() {
  return (
    <div className="mx-[22px] mt-2 flex flex-col">
      {CANDIDATES.map(([name, score]) => (
        <div key={name} className="flex items-center justify-between gap-2 border-b border-line py-2.5 last:border-0">
          <span className={BODY}>{name}</span>
          <span className={`${SMALL} ${score >= 85 ? "text-[#12a150]" : "text-muted"}`}>{score}/100</span>
        </div>
      ))}
    </div>
  );
}

function Tracker() {
  return (
    <div className={`absolute top-[18px] left-[22px] flex w-[300px] flex-col gap-2.5 ${CARD}`}>
      <span className={`${SMALL} text-muted`}>Acme Logistics · Java</span>
      <div className="overflow-clip rounded-[10px] border border-line">
        <div className={`grid grid-cols-[1.3fr_1fr_0.8fr] bg-fill-2 px-2.5 py-1.5 text-[11px] leading-[14px] font-medium text-faint`}>
          <span>Candidate</span><span>Stage</span><span>Notice</span>
        </div>
        {TRACKER.map(r => (
          <div key={r.name} className="grid grid-cols-[1.3fr_1fr_0.8fr] items-center border-t border-line px-2.5 py-2">
            <span className={`${SMALL} text-ink`}>{r.name}</span>
            <span><span className={`rounded-full px-2 py-0.5 text-[11px] leading-[14px] font-medium ${r.tone}`}>{r.stage}</span></span>
            <span className={`${SMALL} text-muted`}>{r.notice}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-[#12a150]" />
        <span className={`${SMALL} text-muted`}>Shared with client</span>
      </div>
    </div>
  );
}

function Closures() {
  return (
    <div className={`absolute top-[18px] left-[22px] flex w-[300px] flex-col gap-1 ${CARD}`}>
      <span className={`${SMALL} text-muted`}>Closures this quarter</span>
      <span className="text-xl leading-[25px] font-medium tracking-[-0.4px]">+38</span>
      <div className="flex h-[129px] items-end gap-1.5 pt-2.5">
        {BARS.map((h, n) => (
          <span key={n} className={`w-[22px] shrink-0 rounded ${n < 6 ? "bg-blue" : "bg-[#b3d1ff]"}`} style={{ height: h }} />
        ))}
      </div>
    </div>
  );
}

const TILES = [
  { kicker: "Capture every", label: "Brief", visual: <Brief /> },
  { kicker: "Search your own", label: "Database", visual: <Database />, mask: true },
  { kicker: "Send clients a", label: "Tracker", visual: <Tracker /> },
  { kicker: "Track your", label: "Closures", visual: <Closures /> },
];

export default function Platform() {
  return (
    <section data-section="Features" id="platform"
      className="flex flex-col items-center gap-10 overflow-clip px-5 py-18 md:gap-12 md:px-6 md:py-24 lg:gap-16 lg:px-8 lg:py-32">
      <div className="flex max-w-[760px] flex-col lg:max-w-[880px] items-center gap-4 text-center">
        <SectionTag n={1} label="Platform" />
        <h2 data-reveal className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px] md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px]
          lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">{content.title}</h2>
        <p data-reveal style={{ "--d": "0.1s" } as React.CSSProperties}
          className="max-w-[480px] text-[17px] leading-[24.65px] tracking-[-0.17px] text-muted md:text-lg md:leading-[26.1px] md:tracking-[-0.18px] lg:text-xl lg:leading-[29px] lg:tracking-[-0.2px]">
          {content.sub}
        </p>
      </div>

      <div className="grid w-full max-w-[1136px] grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {TILES.map((t, n) => (
          <div key={t.label} data-reveal style={{ "--d": `${n * 0.08}s` } as React.CSSProperties}
            className="group relative flex h-[360px] flex-col gap-1.5 overflow-clip rounded-3xl bg-fill-2 px-[22px] pt-[22px] md:h-[380px]">
            <p className="text-xs leading-[15.6px] font-medium text-muted">{t.kicker}</p>
            <h3 className="text-[22px] leading-[25.3px] font-medium tracking-[-0.66px] md:text-2xl md:leading-[27.6px] md:tracking-[-0.72px]
              lg:text-[28px] lg:leading-[32.2px] lg:tracking-[-0.84px]">{t.label}</h3>
            <div aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-[252px] md:h-[272px] ${t.mask ? "mask-[linear-gradient(#000_35%,transparent_92%)]" : ""}`}>
              {t.visual}
            </div>
            <span aria-hidden="true" className="absolute right-4 bottom-4 grid size-8 place-items-center rounded-full bg-white transition-transform duration-500 ease-(--ease-out) group-hover:rotate-90">
              <Icon name="plus" size={14} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

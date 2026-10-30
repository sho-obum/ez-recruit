import Icon, { type IconName } from "../Icon";
import SectionTag from "../SectionTag";
import TourNav from "./TourX";

const content = {
  title: "Every step, mapped out.",
  sub: "Scroll through the core of EZRecruit, from the first brief to the final report.",
};

type Step = { id: string; title: string; icon: IconName; tone: string; lead: string; body: string; Mock: () => React.ReactNode };

// Squircle app tile shared with the workspace panel; falls back to a plain radius where corner-shape is unsupported.
export const APP_ICON = `relative grid shrink-0 place-items-center overflow-clip rounded-[14px] text-white
  supports-[corner-shape:superellipse(2)]:rounded-[48px] supports-[corner-shape:superellipse(2)]:[corner-shape:superellipse(2)]
  bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_55%)]
  shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_0_-3px_8px_0_rgba(0,0,0,0.12),0_10px_20px_-10px_rgba(20,20,20,0.32)]`;

const SMALL = "text-xs leading-[15.6px] font-medium text-muted";
const NAME = "text-sm leading-[18.2px] font-medium tracking-[-0.14px]";
const BIG = "text-[40px] leading-[44px] font-semibold tracking-[-1.4px]";
const DELTA = "rounded-md bg-[#e7f6ee] px-2 py-[3px] text-xs leading-[15.6px] font-medium text-[#12a150]";
const PILL = "rounded-md px-2 py-[3px] text-xs leading-[15.6px] font-medium whitespace-nowrap";

function Segment({ items, active }: { items: string[]; active: number }) {
  return (
    <div className="flex items-center gap-0.5 rounded-full bg-fill-2 p-[3px] max-md:hidden">
      {items.map((s, i) => (
        <span key={s} className={`rounded-full px-3 py-1.5 text-xs leading-[15.6px] font-medium
          ${i === active ? "bg-white text-ink shadow-[0_1px_2px_0_rgba(20,20,20,0.08)]" : "text-muted"}`}>{s}</span>
      ))}
    </div>
  );
}

const Avatar = ({ tone, label, className = "" }: { tone: string; label: string; className?: string }) => (
  <span className={`grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-ink-2 ${tone} ${className}`}>{label}</span>
);

const PEOPLE = [
  { name: "Priya Nair", ini: "PN", role: "Frontend Developer", tone: "bg-[#c9dcff]" },
  { name: "Arjun Shah", ini: "AS", role: "Data Analyst", tone: "bg-[#ffd6a8]" },
  { name: "Meera Pillai", ini: "MP", role: "Backend Engineer", tone: "bg-[#d8f5c4]" },
  { name: "Kabir Sethi", ini: "KS", role: "Product Designer", tone: "bg-[#e4dcff]" },
  { name: "Nisha Verma", ini: "NV", role: "QA Engineer", tone: "bg-[#ffe1cf]" },
];

const INTERVIEWS = [
  { time: "10:00", round: "Round 2", status: "Confirmed", pill: "bg-[#e7f6ee] text-[#12a150]" },
  { time: "11:30", round: "Round 1", status: "Confirmed", pill: "bg-[#e7f6ee] text-[#12a150]" },
  { time: "14:00", round: "Final round", status: "Moved", pill: "bg-[#e6f0ff] text-blue" },
  { time: "16:30", round: "Round 1", status: "Pending", pill: "bg-[#fff0e6] text-orange" },
];

function DashboardMock() {
  return (
    <div className="flex h-full flex-col gap-4 px-6 pt-[22px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className={SMALL}>Today&apos;s interviews</p>
          <div className="flex items-center gap-2.5"><span className={BIG}>6</span><span className={DELTA}>2 this morning</span></div>
        </div>
        <Segment items={["Me", "Team", "All"]} active={0} />
      </div>
      <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-[1fr_232px]">
        <ul className="flex min-w-0 flex-col">
          {INTERVIEWS.map((it, i) => (
            <li key={it.time} className="flex items-center gap-3 border-b border-line py-2.5 last:border-0">
              <span className="w-[52px] shrink-0 rounded-lg bg-fill-2 py-1 text-center text-xs leading-[15.6px] font-medium">{it.time}</span>
              <Avatar tone={PEOPLE[i].tone} label={PEOPLE[i].ini} />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className={NAME}>{PEOPLE[i].name}</span>
                <span className={`${SMALL} truncate font-normal`}>{PEOPLE[i].role}, {it.round}</span>
              </span>
              <span className={`${PILL} max-md:hidden ${it.pill}`}>{it.status}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 pb-6 max-md:hidden">
          <div className="flex flex-col gap-2 rounded-2xl bg-fill-2 p-4">
            <p className={SMALL}>Feedback owed</p>
            <div className="flex items-center justify-between">
              <span className="text-[28px] leading-8 font-semibold tracking-[-0.9px]">3</span>
              <span className="flex -space-x-2">
                {PEOPLE.slice(0, 3).map(p => <span key={p.ini} className={`size-7 rounded-full ring-2 ring-fill-2 ${p.tone}`} />)}
              </span>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-2xl bg-fill-2 p-4">
            <p className={SMALL}>Submissions this week</p>
            <div className="flex min-h-0 flex-1 items-end gap-1.5">
              {[42, 64, 50, 86, 70, 34, 22].map((h, i) => (
                <span key={i} className={`flex-1 rounded-t-[3px] ${i === 3 ? "bg-blue" : "bg-[#b3d1ff]"}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const STAGES = [
  { stage: "Interview", pill: "bg-[#e6f0ff] text-blue", match: 94, notice: "30 days" },
  { stage: "Offer", pill: "bg-[#fff0e6] text-orange", match: 91, notice: "Immediate" },
  { stage: "Screening", pill: "bg-[#efeeff] text-violet", match: 88, notice: "60 days" },
  { stage: "Joined", pill: "bg-[#e7f6ee] text-[#12a150]", match: 86, notice: "15 days" },
  { stage: "Submitted", pill: "bg-fill text-ink-2", match: 79, notice: "30 days" },
];
const COLS = "grid grid-cols-[1fr_auto_44px] items-center gap-3 md:grid-cols-[1.5fr_1fr_1fr_0.7fr]";

function TrackerMock() {
  return (
    <div className="flex h-full flex-col gap-4 px-6 pt-[22px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className={`${NAME} truncate`}>Brightline Labs tracker</span>
          <span className={`${SMALL} truncate font-normal`}>Backend Engineer, 5 candidates</span>
        </div>
        <div className="flex shrink-0 gap-2">
          <span className="rounded-full bg-fill-2 px-3 py-[7px] text-xs leading-[15.6px] font-medium max-md:hidden">6 columns</span>
          <span className="rounded-full bg-ink px-3 py-[7px] text-xs leading-[15.6px] font-medium text-white">Share tracker</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className={`${COLS} border-b border-line pb-2 ${SMALL}`}>
          <span>Candidate</span><span>Stage</span><span>Match</span><span className="max-md:hidden">Notice</span>
        </div>
        {STAGES.map((s, i) => (
          <div key={s.stage} className={`${COLS} border-b border-line py-2 last:border-0 lg:py-2.5`}>
            <span className="flex min-w-0 items-center gap-2.5">
              <Avatar tone={PEOPLE[i].tone} label={PEOPLE[i].ini} className="max-md:hidden" />
              <span className="flex min-w-0 flex-col">
                <span className={`${NAME} truncate`}>{PEOPLE[i].name}</span>
                <span className={`${SMALL} truncate font-normal`}>{PEOPLE[i].role}</span>
              </span>
            </span>
            <span><span className={`${PILL} ${s.pill}`}>{s.stage}</span></span>
            <span className="flex items-center gap-2">
              <span className="text-[13px] leading-4 font-medium">{s.match}</span>
              <span className="h-1.5 w-12 overflow-clip rounded-full bg-fill max-md:hidden">
                <span className="block h-full rounded-full bg-blue" style={{ width: `${s.match}%` }} />
              </span>
            </span>
            <span className="text-[13px] leading-4 text-ink-2 max-md:hidden">{s.notice}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SLOTS = [
  { time: "10:00", who: 0, round: "Round 2", bar: "border-blue bg-[#f2f7ff]" },
  { time: "11:30", who: 1, round: "Round 1", bar: "border-violet bg-[#f6f5ff]" },
  { time: "14:00", who: 2, round: "Final round", bar: "border-green bg-[#f1fbf5]" },
  { time: "16:30", who: 3, round: "Round 1", bar: "border-orange bg-[#fff6f0]" },
];

function SchedulerMock() {
  return (
    <div className="grid h-full gap-5 px-6 pt-[22px] md:grid-cols-[1fr_288px]">
      <div className="flex flex-col gap-3 max-md:hidden">
        <div className="flex items-baseline gap-2.5"><span className={NAME}>Tuesday, 14 Oct</span><span className={SMALL}>4 interviews</span></div>
        {SLOTS.map(s => (
          <div key={s.time} className="flex gap-3">
            <span className={`${SMALL} w-10 shrink-0 pt-2.5`}>{s.time}</span>
            <span className={`flex flex-1 flex-col rounded-xl border-l-[3px] px-3 py-2 ${s.bar}`}>
              <span className="text-[13px] leading-[17px] font-medium tracking-[-0.13px]">{PEOPLE[s.who].name}, {s.round}</span>
              <span className={`${SMALL} font-normal`}>{PEOPLE[s.who].role}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3.5 self-start rounded-[20px] bg-white p-4 shadow-[0_16px_32px_-16px_rgba(20,20,20,0.22),0_0_0_1px_rgba(20,20,20,0.06)] max-md:mt-6">
        <div className="flex items-center gap-2.5">
          <Avatar tone={PEOPLE[1].tone} label={PEOPLE[1].ini} />
          <span className="flex flex-col">
            <span className={NAME}>Pick your slot, Arjun</span>
            <span className={`${SMALL} font-normal`}>Data Analyst, Round 2</span>
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[["Mon", "13"], ["Tue", "14"], ["Wed", "15"]].map(([d, n], i) => (
            <span key={d} className={`flex flex-col items-center rounded-xl py-1.5 ${i === 1 ? "bg-ink text-white" : "bg-fill-2"}`}>
              <span className={`text-[11px] leading-[14px] font-medium ${i === 1 ? "text-white/60" : "text-muted"}`}>{d}</span>
              <span className={NAME}>{n}</span>
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["10:00", "11:30", "14:00", "16:30"].map((t, i) => (
            <span key={t} className={`rounded-lg border py-1.5 text-center text-[13px] leading-4 font-medium
              ${i === 1 ? "border-blue bg-[#f2f7ff] text-blue" : i === 2 ? "border-line text-faint line-through" : "border-line"}`}>{t}</span>
          ))}
        </div>
        <span className="rounded-full bg-ink py-2.5 text-center text-[13px] leading-4 font-medium text-white">Confirm slot</span>
      </div>
    </div>
  );
}

const GOALS = [
  { name: "Ananya Rao", done: 9, of: 12, fill: "bg-blue" },
  { name: "Rohan Mehta", done: 12, of: 12, fill: "bg-green" },
  { name: "Sara Iyer", done: 7, of: 8, fill: "bg-orange" },
  { name: "Dev Malhotra", done: 6, of: 11, fill: "bg-ink" },
];

function GoalsMock() {
  return (
    <div className="flex h-full flex-col justify-center gap-[18px] px-7 py-6">
      {GOALS.map(g => (
        <div key={g.name} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className={`${NAME} flex-1 whitespace-nowrap`}>{g.name}</span>
            {g.done === g.of && <span className={`${DELTA} inline-flex items-center gap-1 py-0.5`}><Icon name="tick" size={12} stroke={2.6} />Met</span>}
            <span className={`${SMALL} whitespace-nowrap`}>{g.done} of {g.of}<span className="max-md:hidden"> closures</span></span>
          </div>
          <span className="h-2.5 overflow-clip rounded-full bg-fill">
            <span className={`block h-full rounded-full ${g.fill}`} style={{ width: `${(g.done / g.of) * 100}%` }} />
          </span>
        </div>
      ))}
    </div>
  );
}

// 52 weekly bars; the shape is fixed so server and client render the same chart.
const BARS = Array.from({ length: 52 }, (_, i) => Math.round(42 + 22 * Math.sin(i / 4.2) + 14 * Math.sin(i / 1.7 + 1) + i * 0.55));

function ReportsMock() {
  return (
    <div className="relative flex h-full flex-col gap-4 px-6 pt-[22px]">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 flex-col gap-0.5">
          <p className={SMALL}>Revenue by date of joining</p>
          <div className="flex items-center gap-2.5"><span className={BIG}>₹48.6L</span><span className={DELTA}>+12.4%</span></div>
        </div>
        <Segment items={["Q1", "Q2", "Q3", "Q4"]} active={2} />
      </div>
      <div className="relative flex min-h-0 flex-1 items-end gap-[3px]">
        {BARS.map((h, i) => (
          <span key={i} style={{ height: `${h}%`, opacity: i < 12 ? 0.35 + i * 0.055 : 1 }}
            className={`flex-1 rounded-t-[3px] ${i === BARS.length - 1 ? "bg-blue" : "bg-[#b3d1ff]"} ${i < 28 ? "max-md:hidden" : ""}`} />
        ))}
        <span className="absolute top-[14%] right-0 flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1.5 text-xs leading-[12px] font-medium text-white">
          <span className="size-[5px] rounded-full bg-lime" />Q3 · ₹14.2L
        </span>
      </div>
    </div>
  );
}

const STEPS: Step[] = [
  { id: "tour-dashboards", title: "Dashboards", icon: "layout", tone: "bg-ink", Mock: DashboardMock,
    lead: "A dashboard for every role.", body: "Recruiters, leads, managers, business heads and admins each see what they need." },
  { id: "tour-tracker", title: "Tracker", icon: "table", tone: "bg-blue-deep", Mock: TrackerMock,
    lead: "Client-ready trackers in a click.", body: "Pick the columns your client wants and share a clean tracker, not a messy spreadsheet." },
  { id: "tour-scheduler", title: "Interview scheduler", icon: "calendar", tone: "bg-lime text-ink!", Mock: SchedulerMock,
    lead: "Interviews without the back and forth.", body: "Schedule rounds, collect feedback and let candidates book their own slot." },
  { id: "tour-goals", title: "Goals and targets", icon: "target", tone: "bg-green", Mock: GoalsMock,
    lead: "Targets the whole team can see.", body: "Set goals by recruiter or team; they complete themselves when they are met." },
  { id: "tour-reports", title: "Reports and ROI", icon: "chart", tone: "bg-orange", Mock: ReportsMock,
    lead: "Know what every role earned.", body: "Client, recruiter and requirement reports, plus revenue by date of joining." },
];

export default function Tour() {
  return (
    <section data-section="Product Tour" id="tour"
      className="flex flex-col items-center gap-10 px-5 py-18 md:gap-12 md:px-6 md:py-24 lg:gap-16 lg:px-8 lg:py-32">
      <div className="flex max-w-[760px] flex-col items-center gap-4 text-center">
        <SectionTag n={6} label="Product tour" className="justify-center" />
        <h2 data-reveal className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px]
          md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px] lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">{content.title}</h2>
        <p data-reveal style={{ "--d": "0.1s" } as React.CSSProperties}
          className="max-w-[520px] text-[17px] leading-[24.65px] tracking-[-0.17px] text-muted md:text-lg md:leading-[26.1px] md:tracking-[-0.18px] lg:text-xl lg:leading-[29px] lg:tracking-[-0.2px]">
          {content.sub}
        </p>
      </div>

      <div className="flex w-full max-w-[1136px] items-start lg:gap-16">
        <div className="hidden w-[240px] shrink-0 self-stretch lg:block">
          <TourNav items={STEPS.map(({ id, title }) => ({ id, title }))} />
        </div>
        {/* Each card sticks a little lower than the last, so they stack up as you scroll. */}
        <div className="flex min-w-0 flex-1 flex-col gap-6 md:gap-10">
          {STEPS.map(({ id, title, icon, tone, lead, body, Mock }, i) => (
            <article key={id} id={id} data-reveal className="sticky scroll-mt-30" style={{ top: 120 + i * 14 }}>
              <div className="flex flex-col gap-6 overflow-clip rounded-[40px] border border-line bg-fill-2 p-7 shadow-[0_-12px_32px_-24px_rgba(20,20,20,0.18)]">
                <div className="flex items-center gap-3.5">
                  <span className={`${APP_ICON} size-11 ${tone}`}><Icon name={icon} size={20} /></span>
                  <h3 className="text-[22px] leading-[25.3px] font-medium tracking-[-0.66px] md:text-2xl md:leading-[27.6px] md:tracking-[-0.72px] lg:text-[28px] lg:leading-[32.2px] lg:tracking-[-0.84px]">{title}</h3>
                </div>
                <div aria-hidden="true" className="h-[403px] overflow-clip rounded-3xl bg-white md:h-[364px] lg:h-[384px]"><Mock /></div>
                <div className="flex max-w-[538px] flex-col gap-1">
                  <h4 className="text-[15px] leading-[19.5px] font-medium tracking-[-0.15px] md:text-base md:leading-[20.8px] md:tracking-[-0.16px]">{lead}</h4>
                  <p className="text-[15px] leading-[22.5px] tracking-[-0.075px] text-muted md:text-base md:leading-6 md:tracking-[-0.08px]">{body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

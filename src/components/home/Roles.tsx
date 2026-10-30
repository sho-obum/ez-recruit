import Icon, { type IconName } from "../Icon";
import SectionTag from "../SectionTag";
import RolesStage from "./RolesX";
import { APP_ICON } from "./Tour";

const content = {
  title: "One place to work, a view for every role.",
  body: "Recruiters, leads, managers, business heads and admins work in the same place. Each one sees the work that matters to them.",
};

type Item = { label: string; icon: IconName; active?: boolean; badge?: string };
const MENU: { group: string; items: Item[] }[] = [
  { group: "Home", items: [{ label: "Dashboard", icon: "layout", active: true }, { label: "Requirements", icon: "file" }] },
  { group: "Talent", items: [{ label: "Candidates", icon: "users" }, { label: "Tracker", icon: "table" }, { label: "Scheduler", icon: "calendar" }] },
  { group: "Results", items: [{ label: "Closures", icon: "handshake" }, { label: "Goals", icon: "target" }, { label: "Reports", icon: "chart", badge: "New" }] },
];

const STATS: { label: string; value: string; icon: IconName; tone: string }[] = [
  { label: "Interviews today", value: "6", icon: "calendar", tone: "bg-blue-deep" },
  { label: "Feedback pending", value: "3", icon: "message", tone: "bg-orange" },
  { label: "Strong matches", value: "12", icon: "sparkle", tone: "bg-lime text-ink!" },
];

// Soft illustrated cards stand in for photos: a glow, a glass tile and two faint UI lines.
const ROLES: { name: string; icon: IconName; glow: string }[] = [
  { name: "Recruiter", icon: "search", glow: "bg-[radial-gradient(120%_90%_at_30%_0%,#4d8dff_0%,#0052ff_32%,#0a1633_80%)]" },
  { name: "Lead", icon: "users", glow: "bg-[radial-gradient(120%_90%_at_70%_0%,#5ff096_0%,#00b544_32%,#06281a_80%)]" },
  { name: "Manager", icon: "briefcase", glow: "bg-[radial-gradient(120%_90%_at_30%_0%,#ffa36b_0%,#ff6b1a_32%,#33150a_80%)]" },
  { name: "Business head", icon: "trending", glow: "bg-[radial-gradient(120%_90%_at_70%_0%,#9c97ff_0%,#635bff_32%,#16133a_80%)]" },
  { name: "Admin", icon: "shield", glow: "bg-[radial-gradient(120%_90%_at_30%_0%,#e6ff80_0%,#a8d400_32%,#1f2600_80%)]" },
];

const MUTED = "text-xs leading-[15.6px] font-medium text-white/60";
const LABEL = "text-sm leading-[18.2px] font-medium tracking-[-0.14px]";
const H4 = "text-xl leading-[25px] font-medium tracking-[-0.4px]";

function Copy() {
  return (
    <div className="flex flex-col items-start gap-6">
      <SectionTag n={7} label="Roles" />
      <h2 className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px]
        md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px] lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">{content.title}</h2>
      <p className="text-[17px] leading-[24.65px] tracking-[-0.17px] text-muted md:text-lg md:leading-[26.1px] md:tracking-[-0.18px] lg:text-xl lg:leading-[29px] lg:tracking-[-0.2px]">
        {content.body}
      </p>
    </div>
  );
}

function Panel() {
  return (
    <div aria-hidden="true" className="flex h-[480px] overflow-clip rounded-[28px] bg-ink text-white shadow-[0_40px_80px_-40px_rgba(20,20,20,0.55)]
      md:h-[min(580px,calc(100vh-80px))] md:rounded-[36px] lg:h-[min(640px,calc(100vh-80px))]">
      <div className="hidden w-[216px] shrink-0 flex-col gap-0.5 border-r border-white/8 px-3.5 py-[22px] md:flex">
        <div className="flex items-center gap-2.5">
          <span className="grid size-11 place-items-center rounded-full bg-white text-[17px] font-semibold tracking-[-0.6px] text-ink">Ez</span>
          <span className="text-[22px] leading-[22px] font-semibold tracking-[-0.88px]">EZRecruit</span>
        </div>
        {MENU.map((m, g) => (
          <div key={m.group} className={`flex flex-col gap-0.5 ${g ? "pt-3" : "pt-[18px]"}`}>
            <p className={MUTED}>{m.group}</p>
            {m.items.map(it => (
              <div key={it.label} className={`flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 ${it.active ? "bg-[#262626]" : ""}`}>
                <Icon name={it.icon} />
                <span className={`${LABEL} flex-1`}>{it.label}</span>
                {it.badge && <span className="rounded-md bg-lime px-1.5 py-0.5 text-xs leading-[15.6px] font-medium text-ink">{it.badge}</span>}
              </div>
            ))}
          </div>
        ))}
        <div className="mt-auto flex items-center gap-2.5 p-2">
          <span className="grid size-8 place-items-center rounded-[10px] bg-lime text-xs leading-[15.6px] font-medium text-ink">AR</span>
          <span className="flex flex-col gap-px">
            <span className={LABEL}>Ananya Rao</span>
            <span className={MUTED}>Team lead</span>
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[26px] overflow-clip px-[26px] py-[22px]">
        <div className="flex items-center gap-2">
          <span className={`${LABEL} flex-1`}>Dashboard</span>
          <span className="rounded-full bg-[#262626] px-3 py-[7px] text-xs leading-[15.6px] font-medium">Export</span>
          <span className="rounded-full bg-white px-3 py-[7px] text-xs leading-[15.6px] font-medium text-ink">New requirement</span>
        </div>
        <div className="flex flex-col gap-3.5">
          <div className="flex items-end gap-2.5"><h4 className={H4}>Today</h4><span className={MUTED}>Your work at a glance</span></div>
          <div className="flex gap-3">
            {STATS.map((s, i) => (
              <div key={s.label} data-reveal style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}
                className="flex min-w-[143px] flex-1 items-center gap-3 rounded-[20px] bg-[#262626] py-3.5 pr-3.5 pl-4">
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[22px] leading-[26px] font-semibold tracking-[-0.6px]">{s.value}</span>
                  <span className={`${MUTED} truncate`}>{s.label}</span>
                </span>
                <span className={`${APP_ICON} size-14 max-md:hidden ${s.tone}`}><Icon name={s.icon} size={24} /></span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-3.5">
          <div className="flex items-end gap-2.5"><h4 className={H4}>Roles</h4><span className={MUTED}>Each sees their own work</span></div>
          <div className="flex min-h-0 flex-1 gap-3">
            {ROLES.map((r, i) => (
              <div key={r.name} data-reveal style={{ "--d": `${0.1 + i * 0.08}s` } as React.CSSProperties}
                className={`relative flex min-w-[143px] flex-1 flex-col justify-end overflow-clip rounded-[20px] p-3.5 max-md:min-w-[200px] ${r.glow}`}>
                <span className="absolute inset-x-0 top-[22%] flex flex-col items-center gap-3">
                  <span className="grid size-16 place-items-center rounded-[20px] border border-white/25 bg-white/15 backdrop-blur-md
                    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_16px_32px_-12px_rgba(0,0,0,0.45)]">
                    <Icon name={r.icon} size={28} stroke={1.8} />
                  </span>
                  <span className="h-1.5 w-16 rounded-full bg-white/30" />
                  <span className="-mt-1.5 h-1.5 w-10 rounded-full bg-white/20" />
                </span>
                <span className={`${LABEL} relative self-start rounded-full bg-white/84 px-3 py-2 whitespace-nowrap text-ink`}>{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Roles() {
  return (
    <section data-section="Workspace Scroll" className="relative bg-white md:h-[calc(100vh+1000px)]">
      <RolesStage copy={<Copy />} panel={<Panel />} />
    </section>
  );
}

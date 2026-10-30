import Button from "../Button";
import Icon, { type IconName } from "../Icon";
import SectionTag from "../SectionTag";

const LINKEDIN = "https://www.linkedin.com/company/deeptalent-technologies/";
const COLUMNS = [
  { title: "Product", links: [
    { label: "Platform", href: "#platform" }, { label: "Nyra AI", href: "#nyra" },
    { label: "Product tour", href: "#tour" }, { label: "Customers", href: "#customers" }] },
  { title: "Resources", links: [
    { label: "Blog", href: "/blog/" }, { label: "What's new", href: "/updates/" }, { label: "FAQ", href: "#faq" }] },
  { title: "Company", links: [
    { label: "Book a demo", href: "#contact" }, { label: "support@ezrecruit.ai", href: "mailto:support@ezrecruit.ai" },
    { label: "LinkedIn", href: LINKEDIN, external: true }] },
  { title: "Legal", links: [
    { label: "Privacy policy", href: "/privacy-policy/" }, { label: "Terms and conditions", href: "/terms-and-conditions/" }] },
];

// Two counter-rotating rings of app icons; each icon spins back so it stays upright.
type Orb = { icon: IconName; tone: string; angle: number };
const ORBITS: { r: number; spin: string; back: string; orbs: Orb[] }[] = [
  { r: 130, spin: "animate-[ez-orbit_26s_linear_infinite]", back: "animate-[ez-orbit_26s_linear_infinite_reverse]", orbs: [{ icon: "sparkle", tone: "bg-violet text-white", angle: -60 }, { icon: "trending", tone: "bg-green text-white", angle: 120 }] },
  { r: 190, spin: "animate-[ez-orbit_40s_linear_infinite_reverse]", back: "animate-[ez-orbit_40s_linear_infinite]", orbs: [
    { icon: "users", tone: "bg-ink text-white", angle: 44 }, { icon: "calendar", tone: "bg-blue-deep text-white", angle: 165 },
    { icon: "briefcase", tone: "bg-lime text-ink", angle: -75 }] },
];

function Orbit() {
  return (
    <div aria-hidden="true" className="absolute -top-5 -right-[110px] hidden size-[420px] md:block lg:right-5">
      {[140, 260, 380].map(s => (
        <span key={s} className="absolute top-1/2 left-1/2 -translate-1/2 rounded-full border-[0.8px] border-[#dbdbdb]" style={{ width: s, height: s }} />
      ))}
      <span className="absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-full bg-ink text-xl font-semibold tracking-[-0.6px] text-white shadow-[0_0_0_8px_#f7f7f7]">Ez</span>
      {ORBITS.map(o => (
        <div key={o.r} className={`absolute top-1/2 left-1/2 motion-reduce:animate-none ${o.spin}`}
          style={{ width: o.r * 2, height: o.r * 2, margin: -o.r }}>
          {o.orbs.map(b => (
            <span key={b.icon} className="absolute -translate-1/2"
              style={{ left: `${50 + 50 * Math.cos(b.angle * Math.PI / 180)}%`, top: `${50 + 50 * Math.sin(b.angle * Math.PI / 180)}%` }}>
              <span className={`relative grid size-[42px] place-items-center overflow-clip rounded-[14px] motion-reduce:animate-none ${o.back} ${b.tone}
                shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_0_-3px_8px_0_rgba(0,0,0,0.12),0_10px_20px_-10px_rgba(20,20,20,0.32)]
                before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_55%)]`}>
                <Icon name={b.icon} size={20} stroke={2.2} />
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

const LINK = "roll-trigger inline-flex items-center gap-1 text-sm leading-[20.3px] text-muted";

export default function Footer() {
  return (
    <footer data-section="Footer" className="px-2 pb-2 md:px-4 md:pb-4">
      <style>{"@keyframes ez-orbit{to{rotate:360deg}}"}</style>
      <div className="flex flex-col gap-10 overflow-clip rounded-[32px] bg-fill-2 px-4 pt-4 pb-5 md:gap-14 md:rounded-[40px] md:px-7 md:pt-7 md:pb-6 lg:px-10 lg:pt-8 lg:pb-7">
        <div data-reveal className="relative flex overflow-clip rounded-3xl bg-white px-6 py-7 shadow-[0_24px_48px_-32px_rgba(20,20,20,0.22)]
          md:h-[380px] md:items-center md:rounded-[32px] md:p-12">
          <div className="relative z-1 flex flex-col items-start gap-5 md:w-[380px] lg:w-[460px]">
            <SectionTag n={12} label="Get started" />
            <h3 className="text-[28px] leading-[30.8px] font-semibold tracking-[-0.98px] md:text-[34px] md:leading-[37.4px] md:tracking-[-1.19px]
              lg:text-[40px] lg:leading-[44px] lg:tracking-[-1.4px]">Run your agency<br />from one system.</h3>
            <p className="text-base leading-6 tracking-[-0.08px] text-muted">
              Briefs, candidates, trackers and closures in one place, with Nyra handling the busywork.
            </p>
            <div className="flex flex-col items-start gap-2.5 pt-2 md:flex-row">
              <Button href="#contact">Book a demo</Button>
              <Button href="#tour" variant="light" chevron>See how it works</Button>
            </div>
          </div>
          <Orbit />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-2 md:grid-cols-4 md:gap-x-6 md:gap-y-9 lg:grid-cols-[241px_185px_185px_185px_1fr] lg:gap-8">
          <div className="col-span-2 flex flex-col items-start gap-4 md:col-span-4 lg:col-span-1">
            <a href="/" aria-label="EZRecruit home" className="flex items-center gap-2.5">
              <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-ink text-[17px] font-semibold tracking-[-0.5px] text-white">Ez</span>
              <span className="text-[22px] leading-[22px] font-semibold tracking-[-0.88px]">EZRecruit</span>
            </a>
            <p className="max-w-[241px] text-sm leading-[20.3px] text-muted">The operating system for recruitment agencies.</p>
          </div>
          {COLUMNS.map(c => (
            <nav key={c.title} aria-label={c.title} className="flex flex-col items-start gap-3">
              <h4 className="text-sm leading-[18.2px] font-medium tracking-[-0.14px]">{c.title}</h4>
              {c.links.map(l => (
                <a key={l.label} href={l.href} className={LINK} {...("external" in l ? { target: "_blank", rel: "noopener" } : {})}>
                  <span className="roll h-[20.3px]"><span>{l.label}</span><span aria-hidden="true" className="text-ink">{l.label}</span></span>
                  {"external" in l && <Icon name="chevron" size={12} className="text-faint" />}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-10 md:gap-14">
          <div className="h-px bg-line" />
          <div className="flex flex-col items-start gap-4 px-2 md:flex-row md:items-center md:justify-between">
            <p className="text-xs leading-[15.6px] font-medium text-muted">© 2026 EZRecruit. Product by DeepTalent Technologies.</p>
            <div className="flex items-center gap-3 text-muted">
              <a href={LINKEDIN} target="_blank" rel="noopener" aria-label="EZRecruit on LinkedIn" className="transition-colors hover:text-ink"><Icon name="linkedin" size={18} stroke={1.8} /></a>
              <a href="mailto:support@ezrecruit.ai" aria-label="Email support@ezrecruit.ai" className="transition-colors hover:text-ink"><Icon name="mail" size={18} stroke={1.8} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

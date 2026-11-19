"use client";

import Icon from "../Icon";
import dynamic from "next/dynamic";

// Loaded after the page is interactive: the WebGL library is not needed for the first view.
const GradientBlinds = dynamic(() => import("./GradientBlinds"), { ssr: false });
import TextCta from "../TextCta";

const LINKEDIN = "https://www.linkedin.com/company/deeptalent-technologies/";
const COLUMNS = [
  { title: "Product", links: [
    { label: "Platform", href: "#platform" }, { label: "Nyra AI", href: "/nyra/" },
    { label: "ATS for agencies", href: "/ats-for-recruitment-agencies/" }, { label: "Candidate matching", href: "/features/ai-candidate-matching/" },
    { label: "Client trackers", href: "/features/client-trackers/" }, { label: "Interview scheduling", href: "/features/interview-scheduling/" },
    { label: "Import candidates", href: "/features/import-center/" }, { label: "Pricing", href: "/pricing/" }] },
  { title: "Resources", links: [
    { label: "Blog", href: "/blog/" }, { label: "What's new", href: "/updates/" }, { label: "FAQ", href: "#faq" }] },
  { title: "Company", links: [
    { label: "Book a demo", href: "/demo/" }, { label: "support@ezrecruit.ai", href: "mailto:support@ezrecruit.ai" },
    { label: "LinkedIn", href: LINKEDIN, external: true }] },
  { title: "Legal", links: [
    { label: "Privacy policy", href: "/privacy-policy/" }, { label: "Terms and conditions", href: "/terms-and-conditions/" }] },
];
const LINK = "roll-trigger inline-flex items-center gap-1 text-sm leading-[20.3px] text-white/55";

// One dark block: closing call to action over WebGL blue blinds, then the links.
export default function Footer({ base = "", cta = true }: { base?: string; cta?: boolean }) {
  return (
    <footer data-section="Footer" className="relative overflow-clip rounded-t-[28px] bg-[#050608] text-white md:rounded-t-[40px]">
      {cta && (
        <div className="relative px-5 pt-20 pb-16 md:px-10 md:pt-28 md:pb-24 lg:px-14 lg:pt-32">
          {/* Blinds only on the right, faded in from the left so the text sits on clean dark. */}
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-full opacity-35 [mask-image:linear-gradient(90deg,transparent_0%,#000_45%)] md:w-[58%] md:opacity-100">
            <GradientBlinds style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              gradientColors={["#9fd8ff", "#3aa8f2", "#0f6fb8", "#05121f"]} angle={20} blindCount={16} blindMinWidth={60}
              spotlightRadius={0.5} shine={0.4} relief={0.5} glow={0.4} sway={0.35} hoverTilt={0.6} clickEffect="ripple" noise={0.3}
              shineDirection="left" lightColor="#ffffff" idle="drift" mixBlendMode="normal" intro />
          </div>
          {/* The original banner's scrim (darker behind the text), plus a fade into the links below. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(5,6,8,0.72)_0%,rgba(5,6,8,0.38)_42%,rgba(5,6,8,0.18)_100%),radial-gradient(90%_80%_at_78%_50%,rgba(58,168,242,0.22),transparent_62%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,#050608)]" />
          <div data-reveal className="relative z-[1] mx-auto flex w-full max-w-[1136px] flex-col items-start gap-5">
            <h2 className="max-w-[560px] text-[40px] leading-[42px] font-semibold tracking-[-1.6px] md:text-[56px] md:leading-[58.8px] md:tracking-[-2.24px]
              lg:text-[72px] lg:leading-[72px] lg:tracking-[-2.88px]">Let&apos;s sort your hiring.</h2>
            <p className="max-w-[460px] text-[17px] leading-[24.65px] text-white/60 md:text-lg md:leading-[26.1px]">
              One system for jobs, candidates and clients, with Nyra built in. See it running on your own jobs.
            </p>
            <TextCta href="/demo/" tone="dark" className="mt-1 text-base md:text-[17px]">Book a demo</TextCta>
          </div>
        </div>
      )}

      <div className={`relative mx-auto flex w-full max-w-[1136px] flex-col gap-10 px-5 pb-8 md:gap-14 md:px-10 lg:px-0 ${cta ? "" : "pt-16 md:pt-20"}`}>
        {cta && <div className="h-px bg-white/10" />}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-9 lg:grid-cols-[241px_185px_185px_185px_1fr] lg:gap-8">
          <div className="col-span-2 flex flex-col items-start gap-4 md:col-span-4 lg:col-span-1">
            {/* Dark-background version of the wordmark: white letters, blue box kept (made from ezrecruit-logo.png). */}
            <a href="/" aria-label="EZRecruit home" className="flex items-center">
              <img src="/ezrecruit-logo-light.png" alt="EZRecruit" width={400} height={101} className="h-11 w-auto" />
            </a>
            <p className="max-w-[241px] text-sm leading-[20.3px] text-white/55">The ATS for recruitment agencies.</p>
          </div>
          {COLUMNS.map(c => (
            <nav key={c.title} aria-label={c.title} className="flex flex-col items-start gap-3">
              <h4 className="text-sm leading-[18.2px] font-medium tracking-[-0.14px]">{c.title}</h4>
              {c.links.map(l => (
                <a key={l.label} href={l.href.startsWith("#") ? base + l.href : l.href} className={LINK} {...("external" in l ? { target: "_blank", rel: "noopener" } : {})}>
                  <span className="roll h-[20.3px]"><span>{l.label}</span><span aria-hidden="true" className="text-white">{l.label}</span></span>
                  {"external" in l && <Icon name="chevron" size={12} className="text-white/30" />}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-[15.6px] font-medium text-white/45">© 2026 EZRecruit. Product by DeepTalent Technologies.</p>
          <div className="flex items-center gap-3 text-white/45">
            <a href={LINKEDIN} target="_blank" rel="noopener" aria-label="EZRecruit on LinkedIn" className="transition-colors hover:text-white"><Icon name="linkedin" size={18} stroke={1.8} /></a>
            <a href="mailto:support@ezrecruit.ai" aria-label="Email support@ezrecruit.ai" className="transition-colors hover:text-white"><Icon name="mail" size={18} stroke={1.8} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

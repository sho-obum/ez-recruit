"use client";

import { useEffect, useState } from "react";
import Button from "../Button";
import Icon from "../Icon";

const LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Nyra AI", href: "#nyra" },
  { label: "Product tour", href: "#tour" },
  { label: "Customers", href: "#customers" },
  { label: "FAQ", href: "#faq" },
];

// Hidden parts collapse their width (not display) so the pill animates between full and compact.
const COLLAPSE = "overflow-clip whitespace-nowrap transition-[max-width,margin,opacity,padding] duration-[550ms] ease-(--ease-out)";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  // Full menu near the top and while scrolling up; compact pill while scrolling down.
  useEffect(() => {
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY, dy = y - lastY;
      if (y < 80 || dy < -4) setCompact(false);
      else if (dy > 4) setCompact(true);
      if (Math.abs(dy) > 4) lastY = y;
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("keydown", onKey);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("keydown", onKey); };
  }, []);

  return (
    <nav aria-label="Main" data-section="Nav"
      className="fixed inset-x-4 top-4 z-50 flex flex-col overflow-clip rounded-[28px] bg-white/84 p-1.5 backdrop-blur-[15px]
        shadow-[0_16px_40px_-20px_rgba(20,20,20,0.28),inset_0_1px_0_0_rgba(255,255,255,0.8)]
        animate-[nav-in_0.8s_var(--ease-out)_both] [animation-delay:var(--boot,0s)]
        md:right-auto md:left-1/2 md:-translate-x-1/2">
      <div className="flex items-center">
        <a href="/" aria-label="EZRecruit home" className="flex items-center">
          <span aria-hidden="true" className="grid size-11 flex-none place-items-center rounded-full bg-ink text-[17px] font-semibold tracking-[-0.5px] text-white">Ez</span>
          <span className={`${COLLAPSE} text-[22px] leading-[22px] font-semibold tracking-[-0.88px]
            ml-2.5 max-w-[140px] opacity-100 ${compact ? "" : "md:ml-0 md:max-w-0 md:opacity-0"}`}>EZRecruit</span>
        </a>

        <div className={`${COLLAPSE} hidden md:flex gap-0.5 ${compact ? "max-w-0 opacity-0 ml-0 px-0" : "max-w-[560px] ml-3 px-1.5"}`}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href}
              className="roll-trigger flex rounded-full px-3 py-2.5 text-[15px] leading-[18px] font-medium tracking-[-0.15px] transition-colors duration-300 hover:bg-fill">
              <span className="roll h-[18px]"><span>{l.label}</span><span aria-hidden="true">{l.label}</span></span>
            </a>
          ))}
        </div>
        <span aria-hidden="true" className={`${COLLAPSE} hidden md:block h-5 w-px flex-none bg-[#dbdbdb] ${compact ? "max-w-0 mx-0 opacity-0" : "max-w-px mx-3"}`} />
        <div className={`hidden md:block flex-none transition-[margin] duration-[550ms] ease-(--ease-out) ${compact ? "ml-12" : ""}`}>
          <Button href="#contact" small chevron>Book a demo</Button>
        </div>

        <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="nav-drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto grid size-11 place-items-center rounded-full bg-fill md:hidden">
          <Icon name={open ? "close" : "menu"} size={20} />
        </button>
      </div>

      {open && (
        <div id="nav-drawer" className="flex flex-col gap-0.5 pt-3 pb-1 md:hidden">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-[22px] px-4 py-3.5 text-[15px] leading-[18px] font-medium tracking-[-0.15px] hover:bg-fill">
              {l.label}<Icon name="chevron" className="text-faint" />
            </a>
          ))}
          <div onClick={() => setOpen(false)} className="mt-2.5 flex flex-col"><Button href="#contact">Book a demo</Button></div>
        </div>
      )}
    </nav>
  );
}

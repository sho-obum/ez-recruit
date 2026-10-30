"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon, { type IconName } from "../Icon";

type Item = { label: string; desc: string; icon: IconName; href: string };
type NavItem = { label: string; href?: string; subMenus?: { title: string; items: Item[] }[] };

const NAV: NavItem[] = [
  {
    label: "Nyra AI",
    subMenus: [
      { title: "What Nyra does", items: [
        { label: "Finds the best people", desc: "A score out of 100, and why", icon: "sparkle", href: "#nyra" },
        { label: "Writes job descriptions", desc: "Straight from your client's brief", icon: "file", href: "#nyra" },
        { label: "Daily update", desc: "Best matches, feedback due, interviews", icon: "clock", href: "#nyra" },
      ] },
      { title: "You stay in control", items: [
        { label: "AI budget", desc: "Set a monthly limit for your team", icon: "shield", href: "#faq" },
      ] },
    ],
  },
  {
    label: "Product",
    subMenus: [
      { title: "Hiring", items: [
        { label: "Jobs", desc: "Add a job and its details in one place", icon: "file", href: "#platform" },
        { label: "Candidates", desc: "All your CVs, no duplicates", icon: "database", href: "#platform" },
        { label: "Client updates", desc: "Share a clean tracker in one click", icon: "table", href: "#tour" },
      ] },
      { title: "Results", items: [
        { label: "Interviews", desc: "Rounds, feedback and self-booking", icon: "calendar", href: "#tour" },
        { label: "Offers and joining", desc: "Track joining dates and earnings", icon: "chart", href: "#tour" },
        { label: "Dashboards and goals", desc: "A view for everyone on the team", icon: "target", href: "#tour" },
      ] },
    ],
  },
  {
    label: "Resources",
    subMenus: [
      { title: "Learn", items: [
        { label: "Product tour", desc: "From the first brief to the final report", icon: "layout", href: "#tour" },
        { label: "Blog", desc: "Guides and customer stories", icon: "file", href: "/blog/" },
        { label: "What's new", desc: "See what shipped", icon: "sparkle", href: "/updates/" },
      ] },
      { title: "Help", items: [
        { label: "FAQ", desc: "Setup, data and pricing answered", icon: "message", href: "#faq" },
        { label: "Support", desc: "support@ezrecruit.ai", icon: "mail", href: "mailto:support@ezrecruit.ai" },
      ] },
    ],
  },
  { label: "Customers", href: "#customers" },
  { label: "FAQ", href: "#faq" },
];
const CTA = { label: "Book a demo", href: "#contact" };

const ITEM = "relative flex items-center gap-1 px-4 py-1.5 text-[15px] font-medium transition-colors duration-300 hover:text-ink";
const Chevron = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className={`relative z-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
    <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [left, setLeft] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const drawerOpen = useRef(false);
  drawerOpen.current = drawer;
  const triggers = useRef<Record<string, HTMLElement | null>>({});
  const menu = NAV.find(n => n.label === openMenu)?.subMenus;

  const enter = (item: NavItem) => {
    setHovered(item.label);
    setOpenMenu(item.subMenus ? item.label : null);
    if (item.subMenus) setLeft(triggers.current[item.label]?.offsetLeft ?? 0);
  };
  const closeAll = () => { setOpenMenu(null); setDrawer(false); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeAll(); };
    // Hides while scrolling down or while Nyra is open; scrolling up brings it back.
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY;
      if (Math.abs(y - lastY) < 6) return;
      const hide = y > lastY && y > 80 && !drawerOpen.current;
      setHidden(hide);
      if (hide) setOpenMenu(null);
      lastY = y;
    };
    const onNyra = () => { closeAll(); setHidden(true); };
    addEventListener("keydown", onKey);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("nyra:open", onNyra);
    return () => { removeEventListener("keydown", onKey); removeEventListener("scroll", onScroll); removeEventListener("nyra:open", onNyra); };
  }, []);

  return (
    <nav aria-label="Main" data-section="Nav" onFocus={() => setHidden(false)}
      className={`sticky top-0 z-50 border-b-[0.8px] border-line bg-white/90 backdrop-blur-md transition-transform duration-300 ease-(--ease-out) ${hidden ? "-translate-y-full" : ""}`}>
      <div className="relative mx-auto flex h-13 max-w-[1200px] items-center gap-6 px-5 md:px-6 lg:px-8">
        <a href="/" className="flex flex-none items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ezrecruit-logo.png" alt="EZRecruit" width={127} height={28} className="h-7 w-auto" />
        </a>

        {/* Desktop: the hover pill slides between items; one shared panel moves and resizes between menus. */}
        <div className="relative mx-auto hidden lg:block" onMouseLeave={() => { setOpenMenu(null); setHovered(null); }}>
          <ul className="flex items-center">
            {NAV.map(item => {
              const on = hovered === item.label || openMenu === item.label;
              const pill = on && <motion.span layoutId="nav-hover" transition={{ type: "spring", bounce: 0.15, duration: 0.4 }} className="absolute inset-0 rounded-full bg-ink/[0.06]" />;
              return (
                <li key={item.label} ref={el => { triggers.current[item.label] = el; }} onMouseEnter={() => enter(item)}>
                  {item.subMenus ? (
                    <button type="button" aria-expanded={openMenu === item.label} onFocus={() => enter(item)}
                      onClick={() => setOpenMenu(o => o === item.label ? null : item.label)}
                      className={`${ITEM} ${on ? "text-ink" : "text-muted"}`}>
                      <span className="relative z-1">{item.label}</span><Chevron open={openMenu === item.label} />{pill}
                    </button>
                  ) : (
                    <a href={item.href} onFocus={() => enter(item)} className={`${ITEM} ${on ? "text-ink" : "text-muted"}`}>
                      <span className="relative z-1">{item.label}</span>{pill}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <AnimatePresence>
            {menu && (
              <motion.div className="absolute top-full left-0 pt-3"
                initial={{ opacity: 0, y: 6, x: left }} animate={{ opacity: 1, y: 0, x: left }} exit={{ opacity: 0, y: 6 }}
                transition={{ type: "spring", bounce: 0.1, duration: 0.35 }}>
                <motion.div layout transition={{ type: "spring", bounce: 0.1, duration: 0.35 }} style={{ borderRadius: 16 }}
                  className="w-max overflow-hidden border-[0.8px] border-line bg-white p-5 shadow-[0_24px_48px_-20px_rgba(20,20,20,0.18)]">
                  <motion.div key={openMenu} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="flex gap-9">
                    {menu.map(sub => (
                      <div key={sub.title}>
                        <h3 className="mb-4 text-sm font-medium text-muted">{sub.title}</h3>
                        <ul className="space-y-5">
                          {sub.items.map(link => (
                            <li key={link.label}>
                              <a href={link.href} onClick={closeAll} className="group flex items-start gap-3">
                                <span className="grid size-9 flex-none place-items-center rounded-md border-[0.8px] border-line text-ink transition-colors duration-300 group-hover:bg-fill group-hover:text-blue">
                                  <Icon name={link.icon} size={18} />
                                </span>
                                <span className="w-max leading-5">
                                  <span className="block text-sm font-medium text-ink">{link.label}</span>
                                  <span className="block text-xs text-muted transition-colors duration-300 group-hover:text-ink">{link.desc}</span>
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <a href={CTA.href} className="hidden rounded-lg bg-blue px-4 py-2 text-sm leading-[18px] font-semibold text-white transition-colors duration-300 hover:bg-blue-deep md:block">
            {CTA.label}
          </a>
          <button type="button" onClick={() => setDrawer(o => !o)} aria-expanded={drawer} aria-controls="nav-drawer" aria-label="Toggle menu"
            className="grid size-9 place-items-center rounded-lg text-ink hover:bg-fill lg:hidden">
            <Icon name={drawer ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Tablet and phone: menus become an accordion under the bar. */}
      {drawer && (
        <ul id="nav-drawer" className="max-h-[calc(100dvh-52px)] overflow-y-auto border-t-[0.8px] border-line bg-white px-5 pb-5 md:px-6 lg:hidden">
          {NAV.map(item => (
            <li key={item.label} className="border-b-[0.8px] border-line">
              {item.subMenus ? (
                <>
                  <button type="button" aria-expanded={section === item.label} onClick={() => setSection(s => s === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between py-3.5 text-base font-semibold">
                    {item.label}<Chevron open={section === item.label} />
                  </button>
                  {section === item.label && (
                    <div className="flex flex-col gap-4 pb-4">
                      {item.subMenus.map(sub => (
                        <div key={sub.title} className="flex flex-col gap-3">
                          <p className="text-xs font-medium text-muted">{sub.title}</p>
                          {sub.items.map(link => (
                            <a key={link.label} href={link.href} onClick={closeAll} className="flex items-start gap-3">
                              <span className="grid size-9 flex-none place-items-center rounded-md border-[0.8px] border-line"><Icon name={link.icon} size={18} /></span>
                              <span className="leading-5">
                                <span className="block text-sm font-medium">{link.label}</span>
                                <span className="block text-xs text-muted">{link.desc}</span>
                              </span>
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a href={item.href} onClick={closeAll} className="flex py-3.5 text-base font-semibold">{item.label}</a>
              )}
            </li>
          ))}
          <li className="pt-4">
            <a href={CTA.href} onClick={closeAll} className="block rounded-lg bg-blue px-4 py-3 text-center text-sm font-semibold text-white">{CTA.label}</a>
          </li>
        </ul>
      )}
    </nav>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Icon, { type IconName } from "../Icon";
import NyraMark from "./NyraMark";
import { openNyra } from "./NyraLive";
import { POSTS } from "./Posts";

const EASE = [0.22, 1, 0.36, 1] as const;
type Link = [label: string, href: string];
type PanelProps = { at: (href: string) => string; done: () => void };

// The three submenu styles from the 21st.dev "Animated shifting tab component" (uniquesonu): icon list, featured card, post card.
type Item = { label: string; desc: string; href: string; icon: IconName };
const PRODUCT: Item[] = [
  { label: "ATS for agencies", desc: "Jobs, candidates and clients in one workspace", href: "/ats-for-recruitment-agencies/", icon: "layout" },
  { label: "How it works", desc: "From brief to placement, step by step", href: "#how", icon: "target" },
  { label: "Product tour", desc: "Click through the real screens", href: "#tour", icon: "briefcase" },
  { label: "Security", desc: "How your data is protected", href: "#security", icon: "shield" },
  { label: "International", desc: "Built for agencies, anywhere", href: "#international", icon: "globe" },
  { label: "Pricing", desc: "What decides the price", href: "/pricing/", icon: "briefcase" },
];
const NYRA_ITEMS: Item[] = [
  { label: "Ask in plain words", desc: "Type a question, get the answer", href: "#ask-nyra", icon: "message" },
  { label: "100+ capabilities", desc: "Everything she can do today", href: "/nyra/#capabilities", icon: "layout" },
];
const MORE = "flex cursor-pointer items-center gap-1 text-sm font-medium text-blue-deep transition-opacity hover:opacity-70";
const ROW = "group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-fill-2";

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="flex size-9 flex-none items-center justify-center rounded-[10px] bg-blue-soft text-blue-deep transition-colors group-hover:bg-white">{children}</span>;
}
function Text({ label, desc }: { label: string; desc: string }) {
  return <span className="flex flex-col"><span className="text-sm leading-5 font-medium text-ink">{label}</span><span className="text-[13px] leading-[18px] text-muted">{desc}</span></span>;
}

function ColumnsPanel({ at, done }: PanelProps) {
  return (
    <div className="p-1.5">
      <div className="grid grid-cols-2 gap-x-1 gap-y-0.5">
        {PRODUCT.map(i => (
          <a key={i.label} href={at(i.href)} onClick={done} className={ROW}><Chip><Icon name={i.icon} size={18} /></Chip><Text label={i.label} desc={i.desc} /></a>
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-between rounded-xl bg-fill-2 px-4 py-3">
        <span className="text-[13px] text-muted">Not sure where to start?</span>
        <a href="/demo/" onClick={done} className={MORE}>Book a demo <Icon name="arrow" size={14} /></a>
      </div>
    </div>
  );
}

function TilesPanel({ at, done }: PanelProps) {
  return (
    <div className="grid grid-cols-[210px_1fr] gap-1.5 p-1.5">
      <a href="/nyra/" onClick={done} className="group flex flex-col justify-between gap-8 rounded-xl bg-night p-4 text-white">
        <NyraMark size={30} once className="text-white" />
        <span className="flex flex-col gap-1">
          <span className="font-display text-lg leading-6 font-medium">Meet Nyra</span>
          <span className="text-[13px] leading-[18px] text-white/60">The copilot that does the work, in English, Hindi or Hinglish.</span>
          <span className="mt-2 flex items-center gap-1 text-sm font-medium text-white/90 group-hover:text-white">See what she does <Icon name="arrow" size={14} /></span>
        </span>
      </a>
      <div className="flex flex-col gap-0.5">
        {NYRA_ITEMS.map(i => (
          <a key={i.label} href={at(i.href)} onClick={done} className={ROW}><Chip><Icon name={i.icon} size={18} /></Chip><Text label={i.label} desc={i.desc} /></a>
        ))}
        <button type="button" onClick={() => { done(); openNyra(); }} className={`${ROW} cursor-pointer text-left`}>
          <Chip><NyraMark size={18} once /></Chip><Text label="Try Nyra now" desc="Chat with her right here" />
        </button>
      </div>
    </div>
  );
}

const PAGES: Item[] = [
  { label: "Blog", desc: "Guides for agencies", href: "/blog/", icon: "file" },
  { label: "What's new", desc: "Product updates", href: "/updates/", icon: "sparkle" },
  { label: "FAQ", desc: "Quick answers", href: "#faq", icon: "message" },
];

function CardsPanel({ at, done }: PanelProps) {
  const p = POSTS[0];
  return (
    <div className="grid grid-cols-[250px_1fr] gap-1.5 p-1.5">
      <a href={p.href} onClick={done} className="group flex flex-col rounded-xl p-2.5 transition-colors hover:bg-fill-2">
        <span className={`mb-3 flex h-24 w-full items-end rounded-lg p-3 font-display text-base leading-5 font-medium ${p.tone}`}>{p.cover}</span>
        <span className="mb-1 text-sm leading-5 font-medium text-ink">{p.title}</span>
        <span className="line-clamp-2 text-[13px] leading-[18px] text-muted">{p.excerpt}</span>
      </a>
      <div className="flex flex-col gap-0.5">
        {PAGES.map(i => (
          <a key={i.label} href={at(i.href)} onClick={done} className={ROW}><Chip><Icon name={i.icon} size={18} /></Chip><Text label={i.label} desc={i.desc} /></a>
        ))}
        <a href="/blog/" onClick={done} className={`${MORE} mt-auto px-2.5 pb-2`}>View all posts <Icon name="arrow" size={14} /></a>
      </div>
    </div>
  );
}

const TABS: { title: string; Panel: (p: PanelProps) => React.ReactNode; drawer: Link[] }[] = [
  { title: "Product", Panel: ColumnsPanel, drawer: PRODUCT.map(i => [i.label, i.href] as Link) },
  { title: "Nyra", Panel: TilesPanel, drawer: [["Meet Nyra", "/nyra/"], ...NYRA_ITEMS.map(i => [i.label, i.href] as Link)] },
  { title: "Resources", Panel: CardsPanel, drawer: [["Blog", "/blog/"], ["Customers", "#customers"], ["What's new", "/updates/"], ["FAQ", "#faq"]] },
];

// Shifting tabs: hover a tab and one panel slides between the tabs' contents, with a pointer that follows.
function Tabs({ at, closeKey }: { at: PanelProps["at"]; closeKey: boolean }) {
  const [sel, setSel] = useState<number | null>(null);
  const [dir, setDir] = useState<"l" | "r" | null>(null);
  const [nub, setNub] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);

  const pick = (i: number | null) => {
    setDir(sel !== null && i !== null ? (sel > i ? "r" : "l") : null);
    setSel(i);
  };
  useEffect(() => { if (closeKey) setSel(null); }, [closeKey]);
  useEffect(() => {
    const t = sel !== null ? tabs.current[sel] : null;
    const p = panel.current;
    if (t && p) { const r = t.getBoundingClientRect(); setNub(r.left + r.width / 2 - p.getBoundingClientRect().left); }
  }, [sel]);

  return (
    <div onMouseLeave={() => pick(null)} className="relative flex h-fit gap-1">
      {TABS.map((t, i) => (
        <button key={t.title} ref={el => { tabs.current[i] = el; }} type="button" aria-expanded={sel === i}
          onMouseEnter={() => pick(i)} onClick={() => pick(sel === i ? null : i)}
          className={`flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-2 font-display text-sm font-medium tracking-[-0.01em] transition-colors duration-200
            ${sel === i ? "bg-fill-2 text-ink" : "text-nav-link hover:text-ink"}`}>
          {t.title}
          <Icon name="chevron" size={13} className={`transition-transform duration-300 ${sel === i ? "-rotate-90" : "rotate-90"}`} />
        </button>
      ))}

      <AnimatePresence>
        {sel !== null && (
          <motion.div ref={panel} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2, ease: EASE }}
            className="absolute top-[calc(100%+18px)] left-1/2 w-[620px] -translate-x-1/2 rounded-2xl border border-line bg-white p-0.5 shadow-[0_24px_48px_-24px_rgba(20,20,20,0.25)]">
            <span aria-hidden="true" className="absolute inset-x-0 -top-[18px] h-[18px]" />
            <motion.span aria-hidden="true" animate={{ left: nub }} transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)" }}
              className="absolute top-0 size-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-line bg-white" />
            {TABS.map(({ title, Panel }, i) => sel === i && (
              <div key={title} className="overflow-hidden">
                <motion.div initial={{ opacity: 0, x: dir === "l" ? 100 : dir === "r" ? -100 : 0 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}>
                  <Panel at={at} done={() => pick(null)} />
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Full-width bar: logo, shifting tabs, Book a demo. Slides away while scrolling down and back on scroll up.
export default function Nav({ base = "" }: { base?: string }) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const reduce = useReducedMotion();
  openRef.current = open;
  const at = (href: string) => (href.startsWith("#") ? base + href : href);

  useEffect(() => {
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY;
      if (Math.abs(y - lastY) < 4) return;
      setHidden(y > lastY && y > 120 && !openRef.current);
      lastY = y;
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onNyra = () => { setOpen(false); setHidden(true); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("keydown", onKey);
    addEventListener("nyra:open", onNyra);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("keydown", onKey); removeEventListener("nyra:open", onNyra); };
  }, []);

  return (
    <header data-section="Nav" onFocus={() => setHidden(false)}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/85 backdrop-blur-[10px]"
      style={{ transform: hidden ? "translate3d(0,-100%,0)" : "translate3d(0,0,0)",
        transition: reduce ? "none" : hidden ? "transform 0.2s cubic-bezier(0.4,0,1,1)" : "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
      <nav aria-label="Main" className="relative mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 md:px-8">
        <a href="/" aria-label="EZRecruit home" className="flex-none">
          <img src="/ezrecruit-logo.png" alt="EZRecruit" width={400} height={101} className="h-7 w-auto md:h-8" />
        </a>
        <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block"><Tabs at={at} closeKey={hidden} /></div>
        <div className="flex items-center gap-5">
          <a href="/demo/" className="rainbow-btn relative hidden h-9 items-center rounded-full px-4 font-display text-sm font-semibold tracking-[-0.14px] text-ink md:inline-flex">
            Book a demo
          </a>
          <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="nav-drawer"
            className="cursor-pointer font-display text-[15px] font-semibold tracking-[-0.15px] text-ink lg:hidden">{open ? "Close" : "Menu"}</button>
        </div>
      </nav>

      {/* Tablet and phone: the same three groups as plain lists. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id="nav-drawer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }} className="overflow-hidden border-t border-line lg:hidden">
            <div className="grid max-h-[calc(100dvh-64px)] gap-6 overflow-y-auto px-5 pt-4 pb-6 md:grid-cols-3 md:px-8">
              {TABS.map(t => (
                <div key={t.title} className="flex flex-col gap-1">
                  <p className="pb-1 font-display text-[13px] font-semibold text-faint">{t.title}</p>
                  {t.drawer.map(([label, href]) => (
                    <a key={label} href={at(href)} onClick={() => setOpen(false)} className="text-base leading-8 font-medium text-ink">{label}</a>
                  ))}
                  {t.title === "Nyra" && (
                    <button type="button" onClick={() => { setOpen(false); openNyra(); }} className="cursor-pointer text-left text-base leading-8 font-medium text-blue-deep">Try Nyra now</button>
                  )}
                </div>
              ))}
              <a href="/demo/" className="rainbow-btn relative inline-flex h-11 w-fit items-center rounded-full px-5 font-display text-sm font-semibold text-ink md:hidden">Book a demo</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

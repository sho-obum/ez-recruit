"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../Icon";

export const openNyra = () => dispatchEvent(new Event("nyra:open"));

export function TryNyra({ label = "Try Nyra now", className = "" }: { label?: string; className?: string }) {
  return (
    <button type="button" onClick={openNyra}
      className={`group flex h-12 items-center gap-2.5 rounded-full bg-[linear-gradient(120deg,#0a1f5c,#0052ff_60%,#4d94ff)] pr-5 pl-1.5 text-[15px] font-medium tracking-[-0.15px] text-white
        shadow-[0_14px_30px_-12px_rgba(0,82,255,0.6)] transition-transform duration-300 hover:-translate-y-0.5 ${className}`}>
      <span className="grid size-9 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-90"><Icon name="sparkle" size={16} /></span>
      {label}
    </button>
  );
}

// Types the text out once it scrolls into view; the hidden copy keeps the box from changing size.
export function TypeOn({ text, delay = 400 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(text.length); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, [text]);

  useEffect(() => {
    if (!go || n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), n === 0 ? delay : 28);
    return () => clearTimeout(t);
  }, [go, n, text, delay]);

  return (
    <span ref={ref} className="relative block">
      <span className="invisible">{text}</span>
      <span className="absolute inset-0">
        {text.slice(0, n)}
        {n < text.length && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[3px] animate-pulse bg-blue" />}
      </span>
    </span>
  );
}

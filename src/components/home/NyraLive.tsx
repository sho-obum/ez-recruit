"use client";

import { useEffect, useRef, useState } from "react";
import NyraMark from "./NyraMark";

export const openNyra = () => dispatchEvent(new Event("nyra:open"));
// Opens the chat and asks it a question typed somewhere else on the page.
export const askNyra = (q: string) => { openNyra(); dispatchEvent(new CustomEvent("nyra:ask", { detail: q })); };

// Nyra call to action: glowing blue pill whose letters light up in turn.
export function TryNyra({ label = "Try Nyra now", className = "" }: { label?: string; className?: string }) {
  return (
    <button type="button" onClick={openNyra} aria-label={label}
      className={`nyra-btn flex h-12 cursor-pointer items-center gap-2.5 rounded-full px-6 text-[15px] font-medium tracking-[-0.15px] text-blue-deep ${className}`}>
      <NyraMark size={18} once />
      <span aria-hidden="true" className="whitespace-pre">
        {[...label].map((ch, i) => <span key={i} className="nyra-btn-letter" style={{ animationDelay: `${i * 0.08}s` }}>{ch}</span>)}
      </span>
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

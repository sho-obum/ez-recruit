"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const GRADIENT = "linear-gradient(90deg, #bfe3ff, #62bdf6, #d8efff, #bfe3ff, #62bdf6, #d8efff, #bfe3ff)";

// Stat card: lifts on hover; the blue bar springs to its value once in view and stays still.
export default function StatsCard({ value, text, fill, delay, d, href }: { value: string; text: string; fill: number; delay: number; d: string; href?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const still = useReducedMotion();
  return (
    <motion.div
      data-reveal
      style={{ "--d": d } as React.CSSProperties}
      whileHover={{ y: -6, boxShadow: "0px 30px 60px -24px rgba(17, 17, 17, 0.18)" }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
      className="relative flex h-full w-full flex-col items-start gap-6 rounded-3xl bg-page p-8 shadow-[0px_30px_60px_-24px_rgba(17,17,17,0)] max-md:h-auto"
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] border border-line" />
      <p className="w-full font-display text-[52px] leading-none font-medium tracking-[-0.055em] text-ink tabular-nums md:text-[64px] lg:text-[80px]">{value}</p>
      <div ref={ref} aria-hidden="true" className="relative h-[14px] w-full overflow-hidden rounded-full bg-fill">
        <motion.div
          initial={{ scaleX: still ? fill : 0 }}
          animate={{ scaleX: still || seen ? fill : 0 }}
          transition={still ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 20, mass: 1, delay }}
          style={{ originX: 0 }}
          className="absolute inset-0 overflow-hidden rounded-full"
        >
          <div
            style={{ background: GRADIENT }}
            className="absolute inset-y-0 left-0 w-[200%]"
          />
        </motion.div>
      </div>
      <p className="w-full text-[15px] leading-[1.6] text-pretty text-muted">{text}</p>
      {href && <a href={href} className="mt-auto text-sm font-medium text-blue-deep underline underline-offset-4 before:absolute before:inset-0 before:rounded-3xl">See them all</a>}
    </motion.div>
  );
}

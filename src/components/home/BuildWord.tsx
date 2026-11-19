"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// Giant word that morphs into the next one: letters both words share glide into place, the rest fade.
export default function BuildWord({ words, hold = 2.6 }: { words: string[]; hold?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView || reduce || words.length < 2) return;
    const t = setInterval(() => setI(n => (n + 1) % words.length), hold * 1000);
    return () => clearInterval(t);
  }, [inView, reduce, words.length, hold]);

  // Key each letter by its character and how many times it has appeared, so shared letters keep their identity.
  const seen: Record<string, number> = {};
  const letters = [...words[i]].map(ch => ({ ch, key: ch + (seen[ch] = (seen[ch] ?? 0) + 1) }));

  return (
    <span ref={ref} aria-label={words[i]} className="relative flex justify-center font-display text-[min(132px,10.5vw)] leading-none font-medium tracking-[-0.055em] whitespace-pre text-white">
      <AnimatePresence mode="popLayout" initial={false}>
        {letters.map(l => (
          <motion.span key={l.key} layout="position" aria-hidden="true" className="inline-block"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.85 }} animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.85 }} transition={{ duration: 0.7, ease: EASE }}>
            {l.ch}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}

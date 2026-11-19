"use client";

import { motion, useReducedMotion } from "framer-motion";
import TextCta from "../TextCta";

const EASE = [0.16, 1, 0.3, 1] as const;

// Bottom of the hero: says plainly that EZRecruit is an ATS, then one text call to action.
export default function HeroBottom() {
  const reduce = useReducedMotion();
  const appear = (delay: number) => (reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay } });

  return (
    <div className="absolute inset-x-0 bottom-0 z-[4] px-5 pb-12 md:px-10 md:pb-14 lg:px-14 lg:pb-16">
      <div className="flex max-w-[540px] flex-col items-start gap-5">
        <motion.div {...appear(0.3)} className="flex flex-col gap-2">
          <p className="font-display text-[22px] leading-[26px] font-semibold tracking-[-0.66px] text-ink md:text-[28px] md:leading-[32px] md:tracking-[-0.84px]">
            The ATS for recruitment agencies.
          </p>
          <p className="text-[15px] leading-6 text-muted md:text-base">
            Jobs, candidates, clients and closures in one place, with Nyra, your AI assistant, built in.
          </p>
        </motion.div>
        <motion.div {...appear(0.4)}>
          <TextCta href="/demo/" className="text-base md:text-[17px]">See it on your own jobs</TextCta>
        </motion.div>
      </div>
    </div>
  );
}

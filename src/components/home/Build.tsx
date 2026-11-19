"use client";

import { motion, useReducedMotion } from "framer-motion";
import BuildStars from "./BuildStars";
import BuildWord from "./BuildWord";
import TextCta from "../TextCta";
import { AnimatedShinyText } from "../ui21/animated-shiny-text";

const WORDS = ["AGENCIES", "RECRUITERS", "TEAM LEADS", "MANAGERS"];
// The ATS in four lines: what an agency does all day.
const SPECS = [
  ["Jobs.", "Paste the client's brief. The job description is written for you."],
  ["Candidates.", "Upload CVs in bulk. Repeats are found by email and phone."],
  ["Trackers.", "Share a tracker with your client."],
  ["Closures.", "Track offers and joining dates."],
];
const EASE = [0.16, 1, 0.3, 1] as const;

// Dark rounded panel that slides over the hero: moving star streaks, Nyra's pitch and her four jobs.
export default function Build() {
  const reduce = useReducedMotion();
  // Each block fades up whenever it scrolls into view, every time, like the template.
  const rise = (i: number) => (reduce ? {} : {
    initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { amount: 0.15 },
    transition: { duration: 0.8, ease: EASE, delay: i * 0.08 },
  });

  return (
    <section id="ats" className="relative z-[1] flex min-h-screen flex-col items-center gap-20 overflow-clip rounded-t-[28px] bg-night px-5 pt-28 pb-22
      md:rounded-t-[36px] md:px-8 md:pt-36 md:pb-28 lg:rounded-t-[40px] lg:px-10 lg:pt-40 lg:pb-30">
      <BuildStars />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_45%,rgba(11,11,13,0.2)_0%,rgba(11,11,13,0.75)_60%,#0b0b0d_100%)]" />

      <div className="relative z-[1] flex w-full max-w-[1000px] flex-col items-center gap-8">
        <motion.div {...rise(0)} className="flex items-center rounded-full bg-white/14 px-5 py-2 text-[15px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3),0_8px_24px_-12px_rgba(159,216,255,0.5)] backdrop-blur-sm">
          <AnimatedShinyText tone="dark" className="font-medium">Meet EZRecruit</AnimatedShinyText>
        </motion.div>
        <motion.h2 {...rise(1)} className="text-center text-balance text-[44px] leading-[0.98] tracking-[-0.05em] text-white md:text-[64px] lg:text-[88px]">
          An ATS built for
        </motion.h2>
        <BuildWord words={WORDS} />
        <motion.p {...rise(2)} className="max-w-[560px] text-center text-base leading-[1.55] tracking-[-0.01em] text-balance text-white/62 md:text-lg lg:text-[19px]">
          Jobs, candidates, trackers, interviews and closures in one place, with AI doing the routine work.
        </motion.p>
        <motion.div {...rise(3)}>
          <TextCta href="/demo/" tone="dark">See it on your own jobs</TextCta>
        </motion.div>
      </div>

      <div className="relative z-[1] grid w-full max-w-[1120px] grid-cols-2 gap-3 lg:grid-cols-4">
        {SPECS.map(([label, value], i) => (
          <motion.div key={label} {...rise(i)}
            className="flex flex-col items-start gap-2 rounded-[24px] border border-white/10 bg-white/6 px-4 py-5 md:p-6">
            <h3 className="text-xl leading-6 tracking-[-0.03em] text-white md:text-2xl md:leading-[28.8px]">{label}</h3>
            <p className="text-[15px] leading-[22px] text-white/55">{value}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

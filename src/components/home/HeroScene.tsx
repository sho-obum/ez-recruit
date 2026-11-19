"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { animate, motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

// Layout per scene width, same rules as the template's hand scene: headline size, gap above and below, hand size.
const SIZES = {
  d: { cap: 200, wk: 0.17, min: 104, r: 1.4, m: 2.12, top: 96, bot: 128 },
  t: { cap: 140, wk: 0.175, min: 84, r: 1.5, m: 2.12, top: 96, bot: 168 },
  p: { cap: 70, wk: 0.185, min: 50, r: 2.5, m: 2.8, top: 84, bot: 196 },
};
// Each arm box: aspect ratio and the point (tx, ty) that touches the centre.
const LEFT = { ar: 1475 / 364, tx: 0.998, ty: 0.3819, low: 0.813, hand: 0.62 };
const RIGHT = { ar: 1412 / 424, tx: 0.0007, ty: 0.4316, low: 0.814 };
// One-line headline: its width in em, and the template meet point moved up by the missing second line.
const WIDE = 5.86, ONE_LINE = 0.9;
const EASE = [0.16, 1, 0.3, 1] as const;
const TILT = 7;
const abs: CSSProperties = { position: "absolute" };
const will: CSSProperties = { willChange: "transform, opacity" };

const clamp12 = (v: number) => Math.max(-12, Math.min(12, v));

function Shadow({ style, sx, op }: { style: CSSProperties; sx: MotionValue<number>; op: MotionValue<number> }) {
  return (
    <motion.div aria-hidden="true" style={{ ...abs, ...style, borderRadius: "50%", ...will, scaleX: sx, opacity: op, filter: "blur(14px)",
      background: "radial-gradient(50% 50% at 50% 50%, rgba(17,17,24,0.55) 0%, rgba(17,17,24,0) 70%)" }} />
  );
}

// Giant two-line headline with a human hand and a robot hand reaching for each other across it.
export default function HeroScene({ text }: { text: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 1176, h: 860 });
  const reduce = !!useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (!box.current) return;
    const ro = new ResizeObserver(e => setSize({ w: e[0].contentRect.width, h: e[0].contentRect.height }));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  // Pointer position, -1 to 1 on both axes, eased by a soft spring.
  const px = useMotionValue(0), py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 1 }), sy = useSpring(py, { stiffness: 60, damping: 20, mass: 1 });
  useEffect(() => {
    if (reduce) return;
    const mq = matchMedia("(pointer: fine)");
    setFine(mq.matches);
    if (!mq.matches) return;
    const move = (e: PointerEvent) => { px.set((e.clientX / innerWidth) * 2 - 1); py.set((e.clientY / innerHeight) * 2 - 1); };
    const leave = () => { px.set(0); py.set(0); };
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => { removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, [reduce, px, py]);

  const { scrollY } = useScroll();
  // Idle float for each hand and a slow sway of the whole scene on touch screens.
  const floatL = useMotionValue(0), floatR = useMotionValue(0), sway = useMotionValue(0);
  useAnimationFrame(t => {
    if (reduce || scrollY.get() > size.h) return;
    const amp = fine ? 5 : 9;
    floatL.set(Math.sin(t / 1700) * amp);
    floatR.set(Math.sin(t / 1900 + 1.3) * (amp + 1));
    sway.set(fine ? 0 : Math.sin(t / 2600));
  });

  // Hands fly in from the screen edges on a soft spring.
  const inL = useMotionValue(reduce ? 0 : -700), inR = useMotionValue(reduce ? 0 : 700);
  useEffect(() => {
    if (reduce) { inL.set(0); inR.set(0); return; }
    const spring = { type: "spring" as const, stiffness: 52, damping: 15, mass: 2 };
    const a = animate(inL, 0, { ...spring, delay: 0.3 }), b = animate(inR, 0, { ...spring, delay: 0.4 });
    return () => { a.stop(); b.stop(); };
  }, [reduce, inL, inR]);

  // Scrolling one screen pulls the hands apart and lifts and fades the headline.
  const prog = useTransform(scrollY, y => (reduce ? 0 : Math.min(1, Math.max(0, y / Math.max(1, size.h)))));
  const sp = useSpring(prog, { stiffness: 120, damping: 30, mass: 1 });

  const rotX = useTransform([sy, sway], ([y, s]: number[]) => -y * (TILT - 1) + s * 1.5);
  const rotY = useTransform([sx, sway], ([x, s]: number[]) => x * TILT + s * 2);
  const xL = useTransform([inL, sx, sp], ([a, x, p]: number[]) => a + x * 26 - p * 90);
  const xR = useTransform([inR, sx, sp], ([a, x, p]: number[]) => a + x * 40 + p * 90);
  const yL = useTransform([floatL, sy], ([f, y]: number[]) => f + y * 14);
  const yR = useTransform([floatR, sy], ([f, y]: number[]) => f + y * 20);
  const turnL = useTransform(sp, p => -p * 8), turnR = useTransform(sp, p => p * 8);
  const h1x = useTransform(sx, x => x * -10);
  const h1y = useTransform([sy, sp], ([y, p]: number[]) => y * -8 - p * 90);
  const h1o = useTransform(sp, p => 1 - p * 0.6);
  const gx = useTransform(sx, x => x * 12), gy = useTransform(sy, y => y * 10);
  const near = useTransform([xL, xR], ([a, b]: number[]) => 1 - Math.min(1, Math.abs(b - a) / 320));
  const glowO = useTransform(near, n => 0.35 + 0.65 * n), glowS = useTransform(near, n => 0.85 + 0.2 * n);
  const shLsx = useTransform(yL, v => 1 - clamp12(v) * -0.012), shRsx = useTransform(yR, v => 1 - clamp12(v) * -0.012);
  const shLo = useTransform(yL, v => 0.5 + v * 0.012), shRo = useTransform(yR, v => 0.5 + v * 0.012);

  const { w, h } = size;
  const C = w >= 1000 ? SIZES.d : w >= 700 ? SIZES.t : SIZES.p;
  const cx = w / 2;
  const room = Math.max(0, h - C.top - C.bot);
  // S sizes the hands as in the template; R is the headline, shrunk if needed to fit one line.
  const S = Math.max(C.min, Math.min(C.cap, w * C.wk, room / (C.m + 0.5 * C.r)));
  const R = Math.min(S, (w * 0.9) / WIDE) * 0.9;
  const m = C.m - ONE_LINE;
  const top = C.top + Math.max(0, (room - m * R - 0.5 * C.r * S) * 0.42);
  const meet = top + m * R;
  const bh = S * C.r, rh = bh * 1.02, gap = S * 0.1;
  const lw = bh * LEFT.ar, rw = rh * RIGHT.ar;
  const glow = [S * 3.7, S * 2.6];
  const line = (i: number) => (reduce ? {} : { initial: { y: "130%" }, animate: { y: "0%" }, transition: { duration: 1.1, ease: EASE, delay: 0.1 + i * 0.08 } });

  return (
    <div ref={box} className="relative size-full overflow-hidden" style={{ perspective: 1200, perspectiveOrigin: "50% 60%" }}>
      <motion.div aria-hidden="true" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.2, delay: 0.4 }}
        style={{ ...abs, left: cx - glow[0] / 2, top: meet - glow[1] / 2, width: glow[0], height: glow[1] }}>
        <motion.div style={{ ...abs, inset: 0, borderRadius: "50%", filter: "blur(60px)", x: gx, y: gy, opacity: glowO, scale: glowS, ...will,
          background: "radial-gradient(50% 50% at 50% 50%, rgb(201,235,255) 0%, rgba(159,216,255,0.85) 42%, rgba(228,243,255,0) 100%)" }} />
      </motion.div>

      <motion.h1 initial={reduce ? false : { scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
        style={{ ...abs, left: 0, right: 0, top, margin: 0, fontSize: R, lineHeight: `${R * 0.9}px`, x: h1x, y: h1y, opacity: h1o, ...will }}
        className="text-center font-medium tracking-[-0.05em] text-ink">
        <span className="block overflow-hidden" style={{ paddingBottom: R * 0.24, marginBottom: -R * 0.2 }}>
          <motion.span className="inline-block whitespace-nowrap" {...line(0)}><span style={{ opacity: 0.75 }}>{text.split(" ")[0]}</span> {text.split(" ").slice(1).join(" ")}</motion.span>
        </span>
      </motion.h1>

      <motion.div style={{ ...abs, inset: 0, transformStyle: "preserve-3d", rotateX: rotX, rotateY: rotY, ...will }}>
        <motion.div style={{ ...abs, left: cx - gap / 2 - LEFT.tx * lw, top: meet - LEFT.ty * bh, width: lw, height: bh, x: xL, rotateY: turnL, transformStyle: "preserve-3d", ...will }}>
          <Shadow style={{ left: lw * LEFT.hand, top: bh * LEFT.low + bh * 0.06, width: lw * 0.3, height: bh * 0.11 }} sx={shLsx} op={shLo} />
          <motion.img src="/hero/hand-human.png" alt="" draggable={false} style={{ ...abs, inset: 0, width: "100%", height: "100%", y: yL, z: 40, ...will }} />
        </motion.div>

        <motion.div style={{ ...abs, left: cx + gap / 2 - RIGHT.tx * rw, top: meet + S * 0.03 - RIGHT.ty * rh, width: rw, height: rh, x: xR, rotateY: turnR, transformStyle: "preserve-3d", ...will }}>
          <Shadow style={{ left: rw * 0.06, top: rh * RIGHT.low + rh * 0.06, width: rw * 0.34, height: rh * 0.12 }} sx={shRsx} op={shRo} />
          <motion.img src="/hero/hand-robot.png" alt="" draggable={false} style={{ ...abs, inset: 0, width: "100%", height: "100%", y: yR, z: 70, ...will }} />
        </motion.div>
      </motion.div>

    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Icon, { type IconName } from "../Icon";

// Position as % of the hero content width and px from its top, per breakpoint (desktop, tablet, phone).
type Spot = { icon: IconName; tone: string; d: [number, number]; t: [number, number]; p: [number, number] };
const SPOTS: Spot[] = [
  { icon: "briefcase", tone: "bg-ink", d: [20.6, -26], t: [12.5, -50], p: [31.4, 13] },
  { icon: "trending", tone: "bg-green", d: [74.0, -22], t: [82.4, -50], p: [57.7, 14] },
  { icon: "users", tone: "bg-orange", d: [8.5, 146], t: [0.9, 184], p: [2.6, 39] },
  { icon: "calendar", tone: "bg-blue-deep", d: [85.1, 136], t: [93.7, 184], p: [86.6, 40] },
  { icon: "search", tone: "bg-green", d: [17.0, 325], t: [3.4, 360], p: [16.3, 64] },
  { icon: "check", tone: "bg-lime text-ink", d: [77.0, 324], t: [91.0, 360], p: [74.3, 63] },
];

const TILE = `absolute inset-0 grid origin-top cursor-grab touch-none select-none place-items-center text-white
  rounded-[18px] md:rounded-[22px] lg:rounded-[27px]
  supports-[corner-shape:superellipse(2)]:rounded-[48px] supports-[corner-shape:superellipse(2)]:[corner-shape:superellipse(2)]
  bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_55%)] [&>svg]:size-[44%]
  shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),inset_0_-3px_8px_0_rgba(0,0,0,0.12),0_10px_20px_-10px_rgba(20,20,20,0.32)]`;

function Hanger({ id, icon, tone, className = "", style }: { id: string; icon: IconName; tone: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div data-hang aria-hidden="true" className={`z-0 size-(--app) ${className}`} style={style}>
      <svg className="pointer-events-none absolute top-0 left-0 -z-10 h-px w-full overflow-visible">
        <defs>
          <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="-600" x2="0" y2="0">
            <stop offset="0%" stopColor="#adadad" stopOpacity="0" />
            <stop offset="30%" stopColor="#adadad" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#adadad" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path fill="none" stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" />
        <circle r="2.6" fill="#dbdbdb" />
      </svg>
      <span className={`${TILE} ${tone}`}><Icon name={icon} stroke={2.2} /></span>
    </div>
  );
}

export default function Hangers() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => root.current ? hang(root.current.closest("section")!) : undefined, []);
  return (
    <>
      {/* Phone keeps a band above the badge for its top icons; wider screens let the content sit higher. */}
      <div ref={root} aria-hidden="true" className="h-[calc(var(--app)+36px)] md:-mb-6 md:h-0" />
      {SPOTS.map((s, n) => (
        <Hanger key={n} id={`rope${n + 1}`} icon={s.icon} tone={s.tone}
          className="absolute left-(--px) top-(--py) md:left-(--tx) md:top-(--ty) lg:left-(--dx) lg:top-(--dy)"
          style={{ "--dx": `${s.d[0]}%`, "--dy": `${s.d[1]}px`, "--tx": `${s.t[0]}%`, "--ty": `${s.t[1]}px`, "--px": `${s.p[0]}%`, "--py": `${s.p[1]}px` } as React.CSSProperties} />
      ))}
    </>
  );
}

// Each icon hangs on a rope: 16 Verlet points between a fixed anchor above the section and the icon (the bob).
// The bob feels gravity, a springy rope when stretched, air drag and a slow breeze; it can be dragged and thrown.
const SEG = 16, GRAVITY = 2600, STIFF = 360, DAMP = 9, AIR = 0.7, ABOVE = 36;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

type Rope = {
  el: HTMLElement; tile: HTMLElement; path: SVGPathElement; dot: SVGCircleElement; grad: SVGLinearGradientElement;
  w: number; L0: number; ax: number; ay: number; bx: number; by: number; vx: number; vy: number;
  rot: number; av: number; pts: Float32Array; prev: Float32Array; startAt: number; started: boolean; phase: number;
  drag: { on: boolean; tx: number; ty: number; gx: number; gy: number; pvx: number; pvy: number; lx: number; ly: number; lt: number };
};

function hang(hero: HTMLElement) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Seconds the intro screen holds the page, so the icons drop as it fades.
  const boot = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--boot")) || 0;

  // Distance from the hero's top edge to the icon's resting top.
  const depth = (el: HTMLElement) => {
    let y = 0, node: HTMLElement | null = el;
    while (node && node !== hero) { y += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
    return node === hero ? y : el.getBoundingClientRect().top - hero.getBoundingClientRect().top;
  };

  const layout = (r: Rope, first = false) => {
    const w = r.el.offsetWidth, L = depth(r.el) + ABOVE;
    r.w = w; r.ax = w / 2; r.ay = -L; r.L0 = Math.max(20, L - GRAVITY / STIFF);
    if (!first) return;
    // Start above the anchor so the icon falls into place; icons further from the centre drop later.
    const h = hero.getBoundingClientRect(), e = r.el.getBoundingClientRect();
    const off = Math.abs(e.left + w / 2 - (h.left + h.width / 2)) / Math.max(1, h.width);
    r.bx = reduce ? r.ax : r.ax + (Math.random() - 0.5) * 50;
    r.by = reduce ? 0 : r.ay - 24;
    for (let n = 0; n <= SEG; n++) {
      r.pts[n * 2] = r.ax + (r.bx - r.ax) * n / SEG;
      r.pts[n * 2 + 1] = reduce ? r.ay + L * n / SEG : r.ay + (r.by - r.ay) * n / SEG;
    }
    r.prev.set(r.pts);
    r.startAt = performance.now() + (boot + 0.25 + off * 1.3) * 1000;
  };

  const draw = (r: Rope) => {
    r.tile.style.transform = `translate(${(r.bx - r.w / 2).toFixed(1)}px, ${r.by.toFixed(1)}px) rotate(${r.rot.toFixed(2)}deg)`;
    const p = r.pts;
    let d = `M${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
    for (let n = 1; n < SEG; n++) {
      const mx = (p[n * 2] + p[n * 2 + 2]) / 2, my = (p[n * 2 + 1] + p[n * 2 + 3]) / 2;
      d += ` Q${p[n * 2].toFixed(1)} ${p[n * 2 + 1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    d += ` L${r.bx.toFixed(1)} ${r.by.toFixed(1)}`;
    r.path.setAttribute("d", d);
    r.dot.setAttribute("cx", r.bx.toFixed(1));
    r.dot.setAttribute("cy", r.by.toFixed(1));
    r.grad.setAttribute("x1", String(r.ax)); r.grad.setAttribute("y1", String(r.ay));
    r.grad.setAttribute("x2", r.bx.toFixed(1)); r.grad.setAttribute("y2", r.by.toFixed(1));
  };

  const step = (r: Rope, dt: number, now: number) => {
    if (!r.started) { if (now < r.startAt) return draw(r); r.started = true; }
    const t = now / 1000;
    if (r.drag.on) {
      // Follow the pointer, but resist being pulled far past the rope length.
      let tx = r.drag.tx, ty = r.drag.ty;
      const dx = tx - r.ax, dy = ty - r.ay, dist = Math.hypot(dx, dy) || 1, max = r.L0 * 1.06 + 28;
      if (dist > max) { const k = max + (dist - max) * 0.12; tx = r.ax + dx / dist * k; ty = r.ay + dy / dist * k; }
      const nx = r.bx + (tx - r.bx) * 0.45, ny = r.by + (ty - r.by) * 0.45;
      r.vx = (nx - r.bx) / dt; r.vy = (ny - r.by) / dt; r.bx = nx; r.by = ny;
    } else {
      const h = dt / 4;
      for (let s = 0; s < 4; s++) {
        let fx = reduce ? 0 : Math.sin(t * 0.8 + r.phase) * 26, fy = GRAVITY;
        const dx = r.bx - r.ax, dy = r.by - r.ay, dist = Math.hypot(dx, dy) || 1, ux = dx / dist, uy = dy / dist;
        if (dist > r.L0) {
          const stretch = dist - r.L0, vr = r.vx * ux + r.vy * uy;
          fx -= STIFF * stretch * ux + DAMP * vr * ux;
          fy -= STIFF * stretch * uy + DAMP * vr * uy;
        }
        r.vx = (r.vx + fx * h) * (1 - AIR * h);
        r.vy = (r.vy + fy * h) * (1 - AIR * h);
        r.bx += r.vx * h; r.by += r.vy * h;
        // Hard stop so a hard throw can't fling the icon off the page.
        const ex = r.bx - r.ax, ey = r.by - r.ay, el = Math.hypot(ex, ey) || 1, lim = r.L0 * 1.2 + 40;
        if (el > lim) {
          r.bx = r.ax + ex / el * lim; r.by = r.ay + ey / el * lim;
          const out = (r.vx * ex + r.vy * ey) / el;
          if (out > 0) { r.vx -= 1.4 * out * ex / el; r.vy -= 1.4 * out * ey / el; }
        }
      }
    }

    // Rope: Verlet integrate the inner points, then relax segment lengths between the fixed ends.
    const p = r.pts, o = r.prev;
    p[0] = r.ax; p[1] = r.ay; p[SEG * 2] = r.bx; p[SEG * 2 + 1] = r.by;
    for (let n = 1; n < SEG; n++) {
      const k = n * 2, vx = (p[k] - o[k]) * 0.96, vy = (p[k + 1] - o[k + 1]) * 0.96;
      o[k] = p[k]; o[k + 1] = p[k + 1];
      p[k] += vx; p[k + 1] += vy + GRAVITY * 0.6 * dt * dt;
    }
    const span = Math.hypot(r.bx - r.ax, r.by - r.ay), seg = (span >= r.L0 ? span * 0.992 : r.L0) / SEG;
    const relax = (n: number) => {
      const a = n * 2, b = a + 2, dx = p[b] - p[a], dy = p[b + 1] - p[a + 1], len = Math.hypot(dx, dy) || 1;
      const diff = (len - seg) / len, wa = n === 0 ? 0 : n + 1 === SEG ? 1 : 0.5, wb = n + 1 === SEG ? 0 : n === 0 ? 1 : 0.5;
      p[a] += dx * diff * wa; p[a + 1] += dy * diff * wa; p[b] -= dx * diff * wb; p[b + 1] -= dy * diff * wb;
    };
    for (let it = 0; it < 12; it++) { for (let n = 0; n < SEG; n++) relax(n); for (let n = SEG - 1; n >= 0; n--) relax(n); }
    if (span >= r.L0) {
      // A taut rope straightens out.
      const pull = Math.min(1, (span - r.L0) / 8) * 0.3;
      for (let n = 1; n < SEG; n++) {
        const f = n / SEG;
        p[n * 2] += (r.ax + (r.bx - r.ax) * f - p[n * 2]) * pull;
        p[n * 2 + 1] += (r.ay + (r.by - r.ay) * f - p[n * 2 + 1]) * pull;
      }
    }

    // The icon tilts with the end of the rope and leans into its motion.
    const lx = p[(SEG - 2) * 2], ly = p[(SEG - 2) * 2 + 1];
    const tip = -Math.atan2(r.bx - lx, Math.max(4, r.by - ly)), whole = -Math.atan2(r.bx - r.ax, Math.max(4, r.by - r.ay));
    const target = clamp((tip * 0.45 + whole * 0.55) * 180 / Math.PI + clamp(-r.vx * 0.004, -10, 10), -55, 55);
    r.av += ((target - r.rot) * 110 - r.av * 13) * dt;
    r.rot = clamp(r.rot + r.av * dt, -70, 70);
    draw(r);
  };

  const ropes: Rope[] = [...hero.querySelectorAll<HTMLElement>("[data-hang]")].map(el => {
    const svg = el.querySelector("svg")!;
    const r: Rope = {
      el, tile: svg.nextElementSibling as HTMLElement, path: svg.querySelector("path")!,
      dot: svg.querySelector("circle")!, grad: svg.querySelector("linearGradient")!,
      w: 0, L0: 0, ax: 0, ay: 0, bx: 0, by: 0, vx: 0, vy: 0, rot: 0, av: 0,
      pts: new Float32Array((SEG + 1) * 2), prev: new Float32Array((SEG + 1) * 2),
      startAt: 0, started: reduce, phase: Math.random() * Math.PI * 2,
      drag: { on: false, tx: 0, ty: 0, gx: 0, gy: 0, pvx: 0, pvy: 0, lx: 0, ly: 0, lt: 0 },
    };
    layout(r, true);
    draw(r);
    return r;
  });
  if (reduce) return;

  let raf = 0, last = performance.now(), visible = true;
  const frame = (now: number) => {
    const dt = clamp((now - last) / 1000, 0.001, 0.033);
    last = now;
    if (visible) for (const r of ropes) step(r, dt, now);
    raf = requestAnimationFrame(frame);
  };
  const resize = new ResizeObserver(() => ropes.forEach(r => layout(r)));
  const seen = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  resize.observe(hero);
  seen.observe(hero);
  raf = requestAnimationFrame(frame);

  const cleanups = ropes.map(r => {
    const local = (e: PointerEvent) => { const b = r.el.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
    const move = (e: PointerEvent) => {
      if (!r.drag.on) return;
      const [x, y] = local(e), now = performance.now(), s = Math.max(8, now - r.drag.lt) / 1000;
      r.drag.pvx = r.drag.pvx * 0.4 + (x - r.drag.lx) / s * 0.6;
      r.drag.pvy = r.drag.pvy * 0.4 + (y - r.drag.ly) / s * 0.6;
      r.drag.lx = x; r.drag.ly = y; r.drag.lt = now;
      r.drag.tx = x - r.drag.gx; r.drag.ty = y - r.drag.gy;
    };
    const up = () => {
      if (r.drag.on) {
        r.drag.on = false;
        r.vx = clamp(r.drag.pvx * 0.6, -1500, 1500);
        r.vy = clamp(r.drag.pvy * 0.6, -900, 1500);
      }
      r.el.style.zIndex = ""; r.tile.style.cursor = "";
      removeEventListener("pointermove", move);
      removeEventListener("pointerup", up);
      removeEventListener("pointercancel", up);
    };
    const down = (e: PointerEvent) => {
      if (!r.started) return;
      e.preventDefault();
      const [x, y] = local(e);
      r.drag = { on: true, gx: x - r.bx, gy: y - r.by, tx: r.bx, ty: r.by, pvx: 0, pvy: 0, lx: x, ly: y, lt: performance.now() };
      r.el.style.zIndex = "20"; r.tile.style.cursor = "grabbing";
      addEventListener("pointermove", move);
      addEventListener("pointerup", up);
      addEventListener("pointercancel", up);
    };
    r.tile.addEventListener("pointerdown", down);
    return () => { r.tile.removeEventListener("pointerdown", down); up(); };
  });

  return () => { cancelAnimationFrame(raf); resize.disconnect(); seen.disconnect(); cleanups.forEach(c => c()); };
}

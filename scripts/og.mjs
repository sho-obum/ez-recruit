// Draws the 1200x630 share images in public/og. Run: node scripts/og.mjs
import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";

const posts = JSON.parse(readFileSync("src/content/posts.json", "utf8"));
const pages = JSON.parse(readFileSync("src/content/landing.json", "utf8"));
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const wrap = (text, max) => text.split(" ").reduce((ls, w) => { const l = ls[ls.length - 1]; (l && (l + " " + w).length <= max) ? ls[ls.length - 1] = l + " " + w : ls.push(w); return ls; }, []);

const cards = [
  ["default", "", "The ATS for recruitment agencies.", "Jobs, candidates, trackers and Nyra, your AI assistant."],
  ["nyra", "Nyra", "Meet Nyra.", "The recruiter's copilot that does the work."],
  ["demo", "Book a demo", "See EZRecruit on your own jobs.", "A 30-minute walkthrough with our team."],
  ["blog", "Blog", "The EZRecruit blog.", "Honest guides for recruitment agencies."],
  ["updates", "What's new", "What's new in EZRecruit.", "Product updates, edition by edition."],
  ...pages.map(p => [p.og, p.crumb, p.h1, ""]),
  ...posts.map(p => [p.slug, p.category, p.title, ""]),
];

mkdirSync("public/og", { recursive: true });
for (const [name, label, title, sub] of cards) {
  const big = title.length <= 40;
  const size = big ? 76 : title.length <= 80 ? 56 : 46;
  const lines = wrap(title, big ? 20 : title.length <= 80 ? 28 : 34).slice(0, 5);
  const top = 320 - (lines.length - 1) * (size * 0.5);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e4f3ff"/><stop offset="0.38" stop-color="#9fd8ff"/><stop offset="0.6" stop-color="#c9ebff"/><stop offset="1" stop-color="#62bdf6"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  ${label ? `<text x="80" y="${top - size - 26}" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="600" fill="#0f6fb8">${esc(label)}</text>` : ""}
  ${lines.map((l, i) => `<text x="80" y="${top + i * size * 1.05}" font-family="Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="700" letter-spacing="-2" fill="#0b0b0d">${esc(l)}</text>`).join("")}
  ${sub ? `<text x="80" y="${top + lines.length * size * 1.05 + 20}" font-family="Segoe UI, Arial, sans-serif" font-size="32" fill="#2b3540">${esc(sub)}</text>` : ""}
  <text x="80" y="570" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="600" fill="#0b0b0d">ezrecruit.ai</text>
</svg>`;
  const logo = await sharp("public/ezrecruit-logo.png").resize({ height: 56 }).toBuffer();
  await sharp(Buffer.from(svg)).composite([{ input: logo, left: 1200 - 80 - Math.round(56 * 400 / 101), top: 54 }]).png().toFile(`public/og/${name}.png`);
}
console.log(cards.length, "images");

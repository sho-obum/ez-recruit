import postsJson from "@/content/posts.json";
import updatesJson from "@/content/updates.json";
import legalJson from "@/content/legal.json";

// Blog and updates text is copied from the live site (ezrecruit.ai, 12 Nov 2026); only the cover lines and tones are ours.
const COVERS: Record<string, { cover: string; title?: string }> = {
  "best-ats-for-recruitment-agencies-2026-honest-comparison": { cover: "Best ATS for agencies, 2026" },
  "case-study-the-glove-how-the-glove-got-an-hour-back-per-recruiter-every-day": { cover: "One hour back, every day", title: "Case study: how The Glove got an hour back per recruiter, every day" },
  "where-recruiter-time-is-really-going-and-why-most-recruitment-agencies-don-t-see-it": { cover: "Where the hours go" },
  "the-future-of-recruitment-agencies-why-structure-ai-and-operating-systems-will-define-the-winners": { cover: "The future of agencies" },
  "how-recruitment-agencies-can-optimise-operations-with-the-right-ats": { cover: "Run operations better" },
  "how-to-choose-the-right-recruitment-software-for-a-staffing-agency-7-questions-to-ask": { cover: "7 questions to ask" },
  "what-is-recruitment-process-standardisation-a-complete-guide-for-staffing-agencies": { cover: "What is standardisation?" },
  "how-ezrecruit-solves-the-biggest-challenges-facing-recruitment-agencies-in-2026": { cover: "Solving agency challenges" },
  "recruitment-agency-dashboard-what-metrics-should-you-be-tracking-in-2026": { cover: "Metrics worth tracking" },
  "ask-nyra-in-hinglish-get-answers-without-opening-a-report": { cover: "Ask in Hinglish" },
  "why-nyra-asks-before-it-acts": { cover: "Asks before it acts" },
  "the-numbers-agency-owners-ask-for-every-week": { cover: "The weekly numbers" },
  "book-reschedule-and-chase-feedback-without-leaving-the-chat": { cover: "Scheduling in chat" },
  "describe-the-candidate-you-want-plain-language-search-with-nyra": { cover: "Search in plain words" },
};
const TONES = [
  { tone: "bg-blue text-white", ring: "border-white/25" },
  { tone: "bg-blue-deep text-white", ring: "border-white/25" },
  { tone: "bg-blue-soft text-ink", ring: "border-ink/15" },
];

export type Post = (typeof postsJson)[number] & { cover: string; tone: string; ring: string; time: number; href: string };

export const POST_LIST: Post[] = postsJson
  .map(p => ({ ...p, title: COVERS[p.slug]?.title ?? p.title, cover: COVERS[p.slug]?.cover ?? p.category, time: Date.parse(p.date), href: `/blog/${p.slug}/` }))
  .sort((a, b) => b.time - a.time)
  .map((p, i) => ({ ...p, ...TONES[i % TONES.length] }));

export const getPost = (slug: string) => POST_LIST.find(p => p.slug === slug);
export const relatedPosts = (slug: string, n = 3) => POST_LIST.filter(p => p.slug !== slug).slice(0, n);

export type Edition = (typeof updatesJson)[number];
export const EDITIONS: Edition[] = [...updatesJson].sort((a, b) => b.date.localeCompare(a.date));
export const getEdition = (slug: string) => EDITIONS.find(e => e.slug === slug);

export const LEGAL = legalJson as Record<"privacy-policy" | "terms-and-conditions", string>;

export const formatDay = (iso: string) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

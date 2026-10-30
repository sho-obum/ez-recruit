import Button from "../Button";
import SectionTag from "../SectionTag";
import ScrollWords from "./CustomersWords";

// No post images exist, so each cover is a typographic card in a brand colour.
const POSTS = [
  {
    title: "Best ATS for recruitment agencies in 2026: an honest comparison",
    excerpt: "What an agency should look for in an ATS, and how the main options stack up against each other.",
    href: "/blog/best-ats-for-recruitment-agencies-2026-honest-comparison/",
    topic: "ATS guide", kind: "Comparison", cover: "Best ATS for agencies, 2026",
    tone: "bg-blue text-white", ring: "border-white/25",
  },
  {
    title: "Case study: how The Glove got an hour back per recruiter, every day",
    excerpt: "How one agency moved its briefs, candidates and trackers into EZRecruit and won back recruiter time.",
    href: "/blog/case-study-the-glove-how-the-glove-got-an-hour-back-per-recruiter-every-day/",
    topic: "Customer story", kind: "Case study", cover: "One hour back, every day",
    tone: "bg-violet text-white", ring: "border-white/25",
  },
  {
    title: "Where recruiter time really goes, and why most agencies don't see it",
    excerpt: "The small admin tasks that quietly fill a recruiter's week, and how to spot them in your own team.",
    href: "/blog/where-recruiter-time-is-really-going-and-why-most-recruitment-agencies-don-t-see-it/",
    topic: "Recruiter time", kind: "Insight", cover: "Where the hours go",
    tone: "bg-lime text-ink", ring: "border-ink/15",
  },
];

export default function Posts() {
  return (
    <section data-section="Latest Posts" className="flex flex-col items-center px-5 py-18 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="flex w-full max-w-[1136px] flex-col gap-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-12">
          <div className="flex flex-1 flex-col items-start gap-6">
            <SectionTag n={9} label="Blog" dot="bg-orange" />
            <h2 className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px]
              md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px] lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">
              <ScrollWords text="From the blog" />
            </h2>
          </div>
          <div data-reveal className="flex flex-1 flex-col items-start gap-4 lg:items-end" style={{ "--d": "0.15s" } as React.CSSProperties}>
            <p className="max-w-[400px] text-[17px] leading-[24.65px] tracking-[-0.17px] text-muted
              md:text-lg md:leading-[26.1px] md:tracking-[-0.18px] lg:text-right lg:text-xl lg:leading-[29px] lg:tracking-[-0.2px]">
              Honest guides and real stories for recruitment agency teams.
            </p>
            <Button href="/blog/" variant="light" chevron>View all posts</Button>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-10 lg:grid-cols-3">
          {POSTS.map((p, n) => (
            <a key={p.href} href={p.href} data-reveal style={{ "--d": `${n * 0.1}s` } as React.CSSProperties}
              className="group flex flex-col items-start gap-3.5">
              <div className={`relative flex h-60 w-full flex-col justify-between overflow-clip rounded-[28px] p-6 ${p.tone}`}>
                <span aria-hidden="true" className={`absolute -right-16 -bottom-24 size-72 rounded-full border transition-transform duration-700 ease-(--ease-out) group-hover:scale-110 ${p.ring}`} />
                <span aria-hidden="true" className={`absolute -right-4 -bottom-12 size-44 rounded-full border transition-transform duration-700 ease-(--ease-out) group-hover:scale-110 ${p.ring}`} />
                <div className="relative flex w-full items-center justify-between">
                  <span className="font-mono text-[11px] leading-[14.3px] font-medium tracking-[0.44px] uppercase md:text-xs md:leading-[15.6px] md:tracking-[0.48px]">{p.topic}</span>
                  <span className="text-base leading-[20.8px] font-semibold tracking-[-0.5px]">EZRecruit</span>
                </div>
                <span aria-hidden="true" className="relative max-w-[260px] text-balance text-[32px] leading-[32px] font-semibold tracking-[-1.28px] transition-transform duration-500 ease-(--ease-out) group-hover:-translate-y-1">
                  {p.cover}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs leading-[15.6px] font-medium text-muted">
                <span>{p.kind}</span><span aria-hidden="true">·</span><span>Read the post</span>
              </div>
              <h3 className="text-lg leading-[22.5px] font-medium tracking-[-0.36px] md:text-xl md:leading-[25px] md:tracking-[-0.4px]">{p.title}</h3>
              <p className="line-clamp-2 text-sm leading-[20.3px] text-muted">{p.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

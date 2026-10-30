import Icon from "../Icon";
import SectionTag from "../SectionTag";
import ScrollWords from "./CustomersWords";

const CASE_STUDY = "https://ezrecruit.ai/blog/case-study-the-glove-how-the-glove-got-an-hour-back-per-recruiter-every-day/";

// placeholder: true cards are stand-ins for sales to replace; each shows a dashed chip so they cannot ship unnoticed.
type Quote = { quote: string; name: string; role?: string; company?: string; tone: string; link?: string; placeholder?: boolean };
const QUOTES: Quote[] = [
  { quote: "We got an hour back per recruiter, every day.", name: "The Glove", tone: "bg-blue text-white", link: CASE_STUDY },
  { quote: "Client trackers used to eat our Friday afternoons. Now they go out the same day.", name: "Priya Nair", role: "Founder", company: "Northbridge Talent", tone: "bg-[#ffd6a8]", placeholder: true },
  { quote: "Every brief arrives in the same shape, so new recruiters pick up roles on day one.", name: "Daniel Ross", role: "Head of Delivery", company: "Keystone Staffing", tone: "bg-[#c9dcff]", placeholder: true },
  { quote: "Nyra's match scores mean we call the right five people first.", name: "Ananya Rao", role: "Team Lead", company: "Brightpath Search", tone: "bg-[#d8f5c4]", placeholder: true },
  { quote: "Our whole candidate history finally lives in one place we can search.", name: "Marcus Hill", role: "Director", company: "Harbor & Vale", tone: "bg-[#e4e1ff]", placeholder: true },
  { quote: "Candidates book their own interview slots, so the back and forth is gone.", name: "Sara Mehta", role: "Recruiter", company: "Meridian People", tone: "bg-[#ffe1cf]", placeholder: true },
  { quote: "We see every open role across every client on one screen.", name: "Tom Becker", role: "Co-founder", company: "Summit Hire", tone: "bg-[#c9dcff]", placeholder: true },
  { quote: "Moving our old database in took an afternoon, with a report at the end.", name: "Neha Kapoor", role: "Operations Lead", company: "Lattice Talent", tone: "bg-[#d8f5c4]", placeholder: true },
  { quote: "Offers and joinings are tracked properly now, so nothing slips at the end.", name: "James Carter", role: "Account Manager", company: "Copperleaf Staffing", tone: "bg-[#ffd6a8]", placeholder: true },
  { quote: "The team stopped keeping side spreadsheets within a month.", name: "Rohan Desai", role: "Founder", company: "Bluewater Recruiters", tone: "bg-[#e4e1ff]", placeholder: true },
];
const ROWS = [QUOTES.slice(0, 5), QUOTES.slice(5)];

const initials = (name: string) => name.split(" ").map(w => w[0]).join("").slice(0, 2);

// Open-quote mark: two rounded blocks with tails, drawn on a 24px grid.
function QuoteMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" className="text-blue">
      {[3, 13.9].map(x => (
        <g key={x} transform={`translate(${x} 6)`}>
          <rect width="7.1" height="7.5" rx="0.75" fill="currentColor" />
          <path d="M7.1 0.75V9a3.75 3.75 0 0 1-3.75 3.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

function Card({ q }: { q: Quote }) {
  return (
    <li className="relative flex h-[236px] w-[300px] flex-none flex-col justify-between rounded-3xl bg-fill-2 p-6
      after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:border-[0.8px] after:border-line md:h-[224px] md:w-[340px] lg:w-[380px]">
      <div className="flex flex-col gap-4">
        <div className="flex h-[26px] items-center justify-between">
          <QuoteMark />
          {q.placeholder && (
            <span className="rounded-full border border-dashed border-faint px-2 py-0.5 text-[11px] leading-[14px] font-medium text-muted">Placeholder</span>
          )}
        </div>
        <p className="line-clamp-3 text-[15px] leading-[22.5px] tracking-[-0.075px] md:text-base md:leading-6 md:tracking-[-0.08px]">{q.quote}</p>
      </div>
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className={`grid size-10 flex-none place-items-center rounded-full text-sm font-semibold tracking-[-0.3px] ${q.tone}`}>{initials(q.name)}</span>
        <div className="flex min-w-0 flex-col gap-px">
          <p className="text-sm leading-[18.2px] font-medium tracking-[-0.14px]">{q.name}</p>
          {q.link ? (
            <a href={q.link} className="relative z-1 inline-flex items-center gap-0.5 text-xs leading-[15.6px] font-medium text-blue hover:underline">
              Read the case study<Icon name="chevron" size={12} />
            </a>
          ) : (
            <p className="truncate text-xs leading-[15.6px] font-medium text-muted">{q.role} · {q.company}</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Customers() {
  return (
    <section data-section="Testimonials" id="customers"
      className="flex flex-col items-center gap-10 overflow-clip py-18 md:gap-12 md:py-24 lg:gap-14 lg:py-32">
      <style>{"@keyframes ez-marquee{to{transform:translateX(-50%)}}"}</style>
      <div className="flex w-full max-w-[824px] flex-col items-center gap-4 px-5 md:px-6 lg:px-8">
        <SectionTag n={8} label="Customers" />
        <h2 className="max-w-[760px] text-center lg:max-w-[620px] text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px]
          md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px] lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">
          <ScrollWords text="Agencies that run on EZRecruit." />
        </h2>
        <a href={CASE_STUDY} data-reveal style={{ "--d": "0.2s" } as React.CSSProperties}
          className="inline-flex items-center gap-1 text-sm leading-[18.2px] font-medium tracking-[-0.14px] text-muted transition-colors hover:text-ink">
          Read the full story<Icon name="chevron" size={14} />
        </a>
      </div>

      <div className="flex w-full flex-col gap-3 mask-[linear-gradient(90deg,transparent_0%,#000_12%,#000_88%,transparent_100%)] md:gap-4">
        {ROWS.map((row, r) => (
          // Two copies of the row slide by half their width, so the loop is seamless.
          <div key={r} className={`flex w-max hover:[animation-play-state:paused] motion-reduce:animate-none
            ${r ? "animate-[ez-marquee_70s_linear_infinite]" : "animate-[ez-marquee_60s_linear_infinite_reverse]"}`}>
            {[0, 1].map(copy => (
              <ul key={copy} aria-hidden={copy === 1 || undefined} inert={copy === 1 || undefined} className="flex gap-4 pr-4">
                {row.map(q => <Card key={q.name} q={q} />)}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

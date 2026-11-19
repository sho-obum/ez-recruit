const ITEMS = [
  { title: "Your own database", text: "Every agency gets its own database. Your data is never mixed with others." },
  { title: "Roles and permissions", text: "Choose who sees what, for each person on your team." },
  { title: "AI budget", text: "Set a monthly AI limit for each person and each feature." },
  // CHECK with sales
  { title: "International servers", text: "Your data is kept on secure servers, wherever you work." },
];

// Padlock drawn as a thick outline, filled with a grid of dots in the pastel palette.
function DottedLock() {
  return (
    <svg viewBox="0 0 700 248" className="h-auto w-full max-w-[700px]" aria-hidden="true">
      <defs>
        <pattern id="sec-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="2.1" fill="#fff" />
        </pattern>
        <linearGradient id="sec-tone" x1="262" x2="438" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#000000" /><stop offset="0.5" stopColor="#4a4a4f" /><stop offset="1" stopColor="#0b0b0d" />
        </linearGradient>
        <mask id="sec-grid" maskUnits="userSpaceOnUse" x="0" y="0" width="700" height="248"><rect width="700" height="248" fill="url(#sec-dots)" /></mask>
        <mask id="sec-lock" maskUnits="userSpaceOnUse" x="0" y="0" width="700" height="248">
          <g fill="none" stroke="#fff" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M296 112V78a54 54 0 0 1 108 0v34" />
            <rect x="262" y="112" width="176" height="124" rx="26" />
          </g>
          <circle cx="350" cy="162" r="15" fill="#fff" />
          <path d="M343 168h14l4 34h-22z" fill="#fff" />
        </mask>
      </defs>
      <g mask="url(#sec-grid)"><rect width="700" height="248" fill="url(#sec-tone)" mask="url(#sec-lock)" /></g>
    </svg>
  );
}

export default function Security() {
  return (
    <section id="security" data-section="Security" className="flex flex-col items-center px-5 py-18 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="flex w-full max-w-[1136px] flex-col items-center gap-10 rounded-[28px] bg-[linear-gradient(125deg,#e4f3ff_0%,#c9ebff_45%,#dff1ff_65%,#9fd8ff_100%)] px-5 py-14 md:rounded-[40px] md:px-9 md:py-20 lg:gap-16">
        <h2 data-reveal className="text-center text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px] md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px]
          lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">Your data<br />stays yours.</h2>
        <div data-reveal className="flex w-full justify-center" style={{ "--d": "0.1s" } as React.CSSProperties}>
          <DottedLock />
        </div>
        <ul className="grid w-full grid-cols-2 gap-x-8 gap-y-10 md:flex md:w-auto md:justify-center md:gap-8">
          {ITEMS.map((it, i) => (
            <li key={it.title} data-reveal className="flex flex-col gap-2 md:w-[176px]" style={{ "--d": `${0.15 + i * 0.05}s` } as React.CSSProperties}>
              <h3 className="text-sm leading-[16.8px] font-semibold md:text-base md:leading-[19.2px]">{it.title}</h3>
              <p className="text-sm leading-[21px] tracking-[-0.1px] text-ink-2">{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

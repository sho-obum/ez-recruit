import { BriefMock, ConnectMock, ChecklistMock } from "./StepsMocks";

const STEPS = [
  { title: "Add the job", text: "Paste the client's brief. Nyra writes the job description for you.", mock: <BriefMock /> },
  { title: "Nyra finds the people", text: "Nyra reads every CV and scores the best matches out of 100, with reasons.", mock: <ConnectMock /> },
  { title: "Share and close", text: "Share a tracker with your client, set up interviews and follow offers until joining.", mock: <ChecklistMock /> },
];

// Three steps, each with a small live mock on the calm sky-blue panel.
export default function Steps() {
  return (
    <section id="how" data-section="How it works" className="flex flex-col items-center gap-10 px-5 py-18 md:gap-12 md:px-6 md:py-24 lg:gap-16 lg:px-8 lg:py-32">
      <div data-reveal className="flex max-w-[760px] flex-col items-center gap-4 text-center">
        <h2 className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px] text-balance md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px]
          lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">From new job to joining, in 3 steps.</h2>
        <p className="text-[17px] leading-[24.65px] tracking-[-0.17px] text-muted md:text-lg md:leading-[26.1px] lg:text-xl lg:leading-[29px]">
          Add a job, let Nyra find the people, then share and close.
        </p>
      </div>
      <ol className="grid w-full max-w-[1136px] gap-10 md:grid-cols-2 md:gap-x-6 md:gap-y-14 lg:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} data-reveal className="flex flex-col gap-6" style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
            <div className="relative aspect-[384/410] overflow-clip rounded-[32px] bg-[linear-gradient(125deg,#d8efff_0%,#9fd8ff_38%,#c9ebff_58%,#62bdf6_100%)]">
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_75%_30%,rgba(255,255,255,0.75),transparent_70%),radial-gradient(50%_35%_at_15%_75%,rgba(255,255,255,0.55),transparent_70%)]" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.55)_0_1px,transparent_1px_3px)] opacity-60" />
              <div className="relative h-full">{s.mock}</div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl leading-[26px] font-semibold tracking-[-0.4px]">{s.title}</h3>
              <p className="max-w-[340px] text-base leading-6 tracking-[-0.08px] text-muted">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

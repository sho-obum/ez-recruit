import Button from "../Button";
import Hangers from "./Hangers";
import Products from "./Products";

const content = {
  badge: "New",
  label: "Nyra now scores every candidate",
  lineA: "Run your agency",
  lineB: "from one system",
  sub: "Take the brief, find and screen candidates, send client-ready trackers and close roles. Nyra, your AI assistant, handles the busywork.",
};

// Splits a line into words for the blur-in; --i staggers them.
function Words({ text, from = 0, pace = 1, className = "" }: { text: string; from?: number; pace?: number; className?: string }) {
  return (
    <span className={`reveal-words ${className}`}>
      {text.split(" ").map((w, n) => (
        <span key={n} className="mr-[0.24em] last:mr-0" style={{ "--i": from + n * pace } as React.CSSProperties}>{w}</span>
      ))}
    </span>
  );
}

export default function Hero() {
  const titleWords = content.lineA.split(" ").length;
  return (
    <section data-section="Hero"
      className="relative flex flex-col items-center gap-10 overflow-clip px-5 pt-26 pb-8 md:gap-12 md:px-6 md:pt-30 md:pb-10 lg:gap-6 lg:px-8 lg:pt-32 lg:pb-12">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-0 h-[760px] bg-fill mask-[linear-gradient(#000_0%,transparent_100%)]" />

      <div className="relative z-1 flex w-full max-w-[1136px] flex-col items-center gap-6 pt-[30px] pb-4 [--app:40px] md:[--app:48px] lg:[--app:60px]">
        <Hangers />

        <div className="fade-up flex items-center gap-1.5 text-[13px] leading-[15.6px] font-medium tracking-[-0.065px] md:text-sm md:leading-[16.8px] md:tracking-[-0.07px]"
          style={{ "--d": "0.1s" } as React.CSSProperties}>
          <span className="inline-flex h-[34px] items-center gap-2 rounded-lg bg-blue pr-2 pl-2.5 text-white">
            {content.badge}
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path className="fill-lime" d="M11 1.5l2.1 2.4 3.1-.8.8 3.1 2.9 1.4-1.2 3 1.6 2.7-2.7 1.6-.2 3.2-3.2-.2L11 20.5l-2.2-2.6-3.2.2-.2-3.2-2.7-1.6 1.6-2.7-1.2-3 2.9-1.4.8-3.1 3.1.8z" /></svg>
          </span>
          <span className="inline-flex h-[34px] items-center rounded-lg bg-white px-[13px]">{content.label}</span>
        </div>

        <h1 className="max-w-[780px] text-center text-[42px] leading-[42px] font-semibold tracking-[-1.68px]
          md:text-[64px] md:leading-[64px] md:tracking-[-2.56px] lg:text-[88px] lg:leading-[88px] lg:tracking-[-3.52px]">
          <Words text={content.lineA} className="block" />
          <Words text={content.lineB} from={titleWords} className="block text-blue" />
        </h1>

        <p className="max-w-[520px] text-center text-[17px] leading-[24.65px] tracking-[-0.17px] text-muted
          md:text-lg md:leading-[26.1px] md:tracking-[-0.18px] lg:max-w-[640px] lg:text-xl lg:leading-[29px] lg:tracking-[-0.2px]"
          style={{ "--d": "0.3s" } as React.CSSProperties}>
          <Words text={content.sub} pace={0.3} />
        </p>

        <div className="fade-up flex justify-center gap-2.5 pt-4" style={{ "--d": "0.5s" } as React.CSSProperties}>
          <Button href="#contact">Book a demo</Button>
          <Button href="#tour" variant="light" chevron>See how it works</Button>
        </div>
      </div>

      <Products />
    </section>
  );
}

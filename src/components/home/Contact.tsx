import Icon from "../Icon";
import SectionTag from "../SectionTag";
import ScrollWords from "./CustomersWords";
import ContactForm from "./ContactForm";

const POINTS = [
  { label: "A 30-minute walkthrough" },
  { label: "Help bringing your candidates in" },
  { label: "support@ezrecruit.ai", href: "mailto:support@ezrecruit.ai" },
];

export default function Contact() {
  return (
    <section data-section="Contact" id="contact" className="flex flex-col items-center px-5 py-18 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="flex w-full max-w-[1136px] flex-col gap-8 overflow-clip rounded-[28px] bg-ink px-4 pt-8 pb-4
        md:gap-10 md:rounded-[40px] md:px-9 md:py-12 lg:flex-row lg:items-center lg:gap-14 lg:p-14">
        <div className="flex flex-col items-start gap-6 px-1 md:px-0 lg:w-[456px] lg:flex-none">
          <SectionTag n={11} label="Contact"
            className="[&>span:last-child]:border-transparent [&>span:last-child]:bg-[#262626] [&>span:last-child]:text-white" />
          <h2 className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px] text-white
            md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px] lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">
            <ScrollWords text="Book a demo" />
          </h2>
          <p data-reveal className="text-[17px] leading-[24.65px] tracking-[-0.17px] text-white/60
            md:text-lg md:leading-[26.1px] md:tracking-[-0.18px] lg:text-xl lg:leading-[29px] lg:tracking-[-0.2px]">
            Tell us about your agency. We will show you EZRecruit using your own jobs.
          </p>
          <ul data-reveal style={{ "--d": "0.1s" } as React.CSSProperties} className="flex flex-col gap-3">
            {POINTS.map(p => (
              <li key={p.label} className="flex items-center gap-3 text-[15px] leading-[22.5px] tracking-[-0.075px] text-white md:text-base md:leading-6 md:tracking-[-0.08px]">
                <span aria-hidden="true" className="grid size-6 flex-none place-items-center rounded-full bg-[#404040] text-lime"><Icon name="tick" size={12} stroke={2.5} /></span>
                {p.href ? <a href={p.href} className="underline decoration-white/30 underline-offset-4 hover:decoration-white">{p.label}</a> : p.label}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal style={{ "--d": "0.15s" } as React.CSSProperties}
          className="rounded-[22px] bg-white px-4 py-[22px] md:rounded-[28px] md:p-7 lg:flex-1">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

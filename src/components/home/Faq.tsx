import Button from "../Button";
import SectionTag from "../SectionTag";
import ScrollWords from "./CustomersWords";
import FaqAccordion from "./FaqAccordion";

export const FAQS = [
  { q: "Who is EZRecruit for?", a: "Recruitment and staffing agencies in India and the US that handle many clients and roles at once." },
  { q: "Can we bring in our current candidates?", a: "Yes. The Import Center brings in your candidate database and CVs. You see live progress, get a report at the end and can undo the import. Your account manager turns it on for you." },
  { q: "How does Nyra use AI, and can we control the cost?", a: "Nyra reads the CVs and job descriptions in your account to score matches and write drafts. Admins set a monthly AI budget, with limits per person and per feature, and see usage on a live dashboard." },
  { q: "Does it work with our email and calendar?", a: "Yes. EZRecruit connects to Outlook and Google Workspace." },
  { q: "Can candidates book their own interviews?", a: "Yes. Send a link and candidates pick a slot that suits them. A confirmation goes out once the booking is done." },
  { q: "Is our data kept separate from other agencies?", a: "Yes. Every agency has its own database." },
  // CHECK with sales
  { q: "How long does setup take?", a: "Most teams are ready in a few days. We help you bring your data in and train your team." },
  { q: "How much does it cost?", a: "The price depends on your team size and the modules you use. Book a demo and we will send you a quote." },
];

export default function Faq() {
  return (
    <section data-section="FAQ" id="faq" className="flex flex-col items-center px-5 py-18 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="flex w-full max-w-[1136px] flex-col items-start gap-8 md:gap-10 lg:flex-row lg:gap-16">
        <div className="flex w-full flex-col items-start gap-6 lg:sticky lg:top-28 lg:w-[456px] lg:flex-none">
          <SectionTag n={10} label="FAQ" dot="bg-orange" />
          <h2 className="text-[34px] leading-[35.7px] font-semibold tracking-[-1.36px]
            md:text-[44px] md:leading-[46.2px] md:tracking-[-1.76px] lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-2.24px]">
            <ScrollWords text="Your questions, answered." />
          </h2>
          <p data-reveal className="text-[17px] leading-[24.65px] tracking-[-0.17px] text-muted
            md:text-lg md:leading-[26.1px] md:tracking-[-0.18px] lg:text-xl lg:leading-[29px] lg:tracking-[-0.2px]">
            What you need to know about EZRecruit, from setup to your data. More questions? Just send us a message.
          </p>
          <div data-reveal style={{ "--d": "0.1s" } as React.CSSProperties}
            className="relative flex w-full flex-col items-start gap-4 rounded-3xl bg-fill-2 p-[22px] md:w-[400px]
              after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:border-[0.8px] after:border-line">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-ink text-[15px] font-semibold tracking-[-0.5px] text-white">Ez</span>
              <a href="mailto:support@ezrecruit.ai" className="relative z-1 text-xs leading-[15.6px] font-medium text-blue hover:underline">support@ezrecruit.ai</a>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[15px] leading-[19.5px] font-medium tracking-[-0.15px] md:text-base md:leading-[20.8px] md:tracking-[-0.16px]">Still have questions?</h3>
              <p className="text-sm leading-[20.3px] text-muted">Talk to our team and we will show you how it works.</p>
            </div>
            <Button href="#contact" small chevron className="relative z-1">Talk to us</Button>
          </div>
        </div>

        <div className="w-full lg:flex-1">
          <FaqAccordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}

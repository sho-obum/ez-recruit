import { LogoCloud } from "../ui21/logo-cloud-3";

// Add real customer logos here (public/logos). The list repeats until the strip is wide enough to loop without gaps.
const LOGOS = [
  { src: "/logos/esoftlabs.png", alt: "eSoft Labs", width: 129, height: 36 },
  { src: "/logos/scorg.png", alt: "SCORG", width: 1024, height: 420 },
  { src: "/logos/theglove.png", alt: "The Glove", width: 826, height: 271 },
  { src: "/logos/telemax.png", alt: "Telemax", width: 181, height: 63 },
  { src: "/logos/humansmind.png", alt: "The HumansMind", width: 768, height: 344 },
  { src: "/logos/kriyah.png", alt: "Kriyah Consulting", width: 134, height: 36 },
  { src: "/logos/prowiz.png", alt: "Prowiz Consulting", width: 183, height: 59 },
];
const STRIP = Array.from({ length: Math.ceil(14 / LOGOS.length) }, () => LOGOS).flat();

export default function Customers() {
  return (
    <section data-section="Testimonials" id="customers"
      className="flex flex-col items-center gap-8 overflow-clip py-14 md:gap-10 md:py-20 lg:py-24">
      <h2 className="px-5 text-center text-[28px] leading-[32px] font-semibold tracking-[-1.1px] md:text-[38px] md:leading-[42px] md:tracking-[-1.5px]">
        <span className="block text-muted">Agencies already working with Nyra.</span>
        <span className="block">Less chasing. More closing.</span>
      </h2>

      <div className="relative w-full max-w-[1136px]">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-line),transparent)]" />
        <LogoCloud logos={STRIP} className="py-6" />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-line),transparent)]" />
      </div>

      <figure data-reveal className="flex max-w-[720px] flex-col items-center gap-4 px-5 text-center md:px-6">
        <blockquote className="flex flex-col gap-3 text-[15px] leading-6 tracking-[-0.1px] text-muted">
          <p>EzRecruit has become an integral part of our recruitment operations. Its ease of use has enabled our team to adopt it quickly and work more efficiently. Team consistently improved their delivery capacity while maintaining the quality of profiles shared with clients. The steady growth in daily profile submissions reflects the impact it has had on our team’s productivity.</p>
          <p>The platform also provides the visibility I need to monitor business performance and make informed decisions. EzRecruit has strengthened both our operational efficiency and our ability to scale with confidence.</p>
        </blockquote>
        <figcaption className="text-sm leading-[18px] font-medium tracking-[-0.14px]">
          Kranthi N<span className="text-muted">, Executive Director at eSoft Labs</span>
        </figcaption>
      </figure>
    </section>
  );
}

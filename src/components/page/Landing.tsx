import PageShell from "./PageShell";
import PageHeader from "./PageHeader";
import JsonLd from "../JsonLd";
import TextCta from "../TextCta";
import { FAQS } from "../home/Faq";
import { abs } from "@/lib/seo";
import landing from "@/content/landing.json";

export type LandingData = (typeof landing)[number];
export const LANDING = landing;
export const getLanding = (path: string) => landing.find(l => l.path === path)!;
export const landingMeta = (path: string) => { const p = getLanding(path); return { title: p.metaTitle, description: p.description, alternates: { canonical: p.path },
  openGraph: { type: "website" as const, siteName: "EZRecruit", url: p.path, title: p.metaTitle, description: p.description, images: [{ url: `/og/${p.og}.png`, width: 1200, height: 630 }] } }; };

// One template for the topic, feature and pricing pages: header, text blocks, FAQ, related links.
export default function Landing({ page }: { page: LandingData }) {
  const faq = page.faq.map(i => FAQS[i]);
  return (
    <PageShell trail={[[page.crumb, page.path]]}>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: page.metaTitle, description: page.description, url: abs(page.path), isPartOf: { "@type": "WebSite", url: abs("/") } }} />
      {faq.length > 0 && <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />}
      <PageHeader title={page.h1} text={page.intro}>
        <div data-reveal style={{ "--d": "0.2s" } as React.CSSProperties}><TextCta href="/demo/">Book a demo</TextCta></div>
      </PageHeader>

      <section className="flex flex-col items-center px-5 pb-16 md:px-6 md:pb-20 lg:px-8">
        <div className="flex w-full max-w-[1136px] flex-col">
          {page.blocks.map(b => (
            <article key={b.h} data-reveal className="grid gap-4 border-t border-line py-10 first:border-t-0 lg:grid-cols-[360px_1fr] lg:gap-14 lg:py-14">
              <h2 className="text-[26px] leading-[29px] font-semibold tracking-[-1px] md:text-[32px] md:leading-[35px] md:tracking-[-1.28px]">{b.h}</h2>
              <div className="flex max-w-[680px] flex-col items-start gap-5">
                <p className="text-[17px] leading-[26px] text-muted">{b.p}</p>
                {b.points && (
                  <ul className="flex flex-col gap-2.5">
                    {b.points.map(p => <li key={p} className="flex gap-3 text-base leading-6"><span aria-hidden="true" className="mt-[9px] size-1.5 flex-none rounded-full bg-blue" />{p}</li>)}
                  </ul>
                )}
                {b.link && <TextCta href={b.link[1]}>{b.link[0]}</TextCta>}
              </div>
            </article>
          ))}
        </div>
      </section>

      {faq.length > 0 && (
        <section className="flex flex-col items-center px-5 pb-16 md:px-6 md:pb-20 lg:px-8">
          <div className="flex w-full max-w-[1136px] flex-col gap-8 rounded-[28px] bg-fill-2 px-5 py-10 md:rounded-[40px] md:px-10 md:py-14 lg:flex-row lg:gap-14 lg:p-16">
            <h2 className="text-[30px] leading-[1.1] font-semibold tracking-[-1.2px] md:text-[40px] md:tracking-[-1.6px] lg:w-[300px] lg:flex-none">Common questions</h2>
            <dl className="flex min-w-0 flex-1 flex-col">
              {faq.map(f => (
                <div key={f.q} className="flex flex-col gap-1.5 border-t border-line py-5 first:border-t-0 first:pt-0">
                  <dt className="text-base leading-6 font-medium">{f.q}</dt>
                  <dd className="text-[15px] leading-[23px] text-muted">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section className="flex flex-col items-center px-5 pb-20 md:px-6 md:pb-28 lg:px-8">
        <div className="flex w-full max-w-[1136px] flex-col gap-5 border-t border-line pt-8">
          <p className="text-sm leading-5 font-medium text-muted">Keep reading</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">{page.related.map(([l, h]) => <TextCta key={h} href={h}>{l}</TextCta>)}</div>
        </div>
      </section>
    </PageShell>
  );
}

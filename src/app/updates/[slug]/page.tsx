import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/page/PageShell";
import Spotlight from "@/components/page/Spotlight";
import NyraMark from "@/components/home/NyraMark";
import TextCta from "@/components/TextCta";
import { EDITIONS, formatDay, getEdition } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => EDITIONS.map(e => ({ slug: e.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEdition((await params).slug);
  if (!e) return {};
  const title = `Edition ${e.n}: ${e.title}`;
  return { title: `${title} | EZRecruit`, description: e.summary, alternates: { canonical: `/updates/${e.slug}/` }, openGraph: { type: "article", title, description: e.summary } };
}

export default async function EditionPage({ params }: Props) {
  const e = getEdition((await params).slug);
  if (!e) notFound();
  const i = EDITIONS.findIndex(x => x.slug === e.slug);
  const newer = EDITIONS[i - 1], older = EDITIONS[i + 1];
  return (
    <PageShell trail={[["What's new", "/updates/"], [`Edition ${e.n}`, `/updates/${e.slug}/`]]}>
      <header className="flex flex-col items-center px-5 pt-32 pb-10 md:px-6 md:pt-40 md:pb-12 lg:px-8">
        <div className="flex w-full max-w-[760px] flex-col items-start gap-6">
          <TextCta href="/updates/">All updates</TextCta>
          <p className="text-sm leading-5 text-muted"><span className="font-medium text-ink">Edition {e.n}</span> · {formatDay(e.date)}</p>
          <h1 data-reveal className="text-[32px] leading-[35px] font-semibold tracking-[-1.28px] text-balance md:text-[44px] md:leading-[47px] md:tracking-[-1.76px] lg:text-[52px] lg:leading-[55px] lg:tracking-[-2.08px]">{e.title}</h1>
          <p className="text-lg leading-[26px] text-muted">{e.summary}</p>
        </div>
      </header>

      <section className="flex flex-col items-center px-5 pb-16 md:px-6 md:pb-20 lg:px-8">
        <div className="flex w-full max-w-[760px] flex-col gap-14">
          {e.spotlight && <Spotlight s={e.spotlight} />}
          {e.groups.map(g => (
            <div key={g.label} className="flex flex-col">
              <h2 className="pb-2 text-[28px] leading-[32px] font-semibold tracking-[-1.1px]">{g.label}</h2>
              <ul>
                {g.items.map(it => (
                  <li key={it.title} className="flex flex-col gap-1.5 border-t border-line py-6">
                    <h3 className="flex items-start gap-2 text-[17px] leading-6 font-medium tracking-[-0.2px]">
                      {/nyra/i.test(it.title + it.body) && <NyraMark size={18} once className="mt-[3px] text-blue-deep" />}
                      {it.title}
                    </h3>
                    <p className="text-[15px] leading-[23px] text-muted">{it.body}</p>
                    {it.for && <p className="text-sm leading-5 text-faint">{it.for}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center px-5 pb-20 md:px-6 md:pb-28 lg:px-8">
        <div className="flex w-full max-w-[760px] flex-col gap-10 border-t border-line pt-10">
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-[28px] leading-[32px] font-semibold tracking-[-1.1px]">What should we build for you next?</h2>
            <p className="text-base leading-6 text-muted">Many of these updates started as an idea from a customer. Tell us yours.</p>
            <TextCta href="mailto:support@ezrecruit.ai" className="mt-2">Email support@ezrecruit.ai</TextCta>
          </div>
          <div className="flex items-start justify-between gap-6 text-sm leading-5">
            {older ? <a href={`/updates/${older.slug}/`} className="flex flex-col gap-1 text-muted transition-colors hover:text-ink"><span>Older</span><span className="font-medium text-ink">Edition {older.n}</span></a> : <span />}
            {newer ? <a href={`/updates/${newer.slug}/`} className="flex flex-col items-end gap-1 text-right text-muted transition-colors hover:text-ink"><span>Newer</span><span className="font-medium text-ink">Edition {newer.n}</span></a> : <span />}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

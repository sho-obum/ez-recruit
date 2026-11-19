import type { Metadata } from "next";
import PageShell from "@/components/page/PageShell";
import PageHeader from "@/components/page/PageHeader";
import Spotlight from "@/components/page/Spotlight";
import TextCta from "@/components/TextCta";
import { EDITIONS, formatDay } from "@/lib/content";

export const metadata: Metadata = {
  title: "What's new | EZRecruit",
  description: "Everything new in EZRecruit, one edition at a time. Editions go out by email every other Monday.",
  alternates: { canonical: "/updates/" },
};

export default function UpdatesPage() {
  return (
    <PageShell trail={[["What's new", "/updates/"]]}>
      <PageHeader title="Product updates, every fortnight." text="Everything new in EZRecruit, one edition at a time. Editions go out by email every other Monday." />
      <section className="flex flex-col items-center px-5 pb-20 md:px-6 md:pb-28 lg:px-8">
        <div className="flex w-full max-w-[1136px] flex-col">
          {EDITIONS.map(e => (
            <article key={e.slug} data-reveal className="grid gap-5 border-t border-line py-10 first:border-t-0 lg:grid-cols-[220px_1fr] lg:gap-14 lg:py-14">
              <div className="flex flex-col gap-1 text-sm leading-5 text-muted">
                <span className="font-medium text-ink">Edition {e.n}</span>
                <span>{formatDay(e.date)}</span>
              </div>
              <div className="flex max-w-[760px] flex-col items-start gap-5">
                <h2 className="text-[26px] leading-[29px] font-semibold tracking-[-1px] md:text-[32px] md:leading-[35px] md:tracking-[-1.28px]">{e.title}</h2>
                <p className="text-base leading-6 text-muted">{e.summary}</p>
                {e.spotlight && <div className="w-full"><Spotlight s={e.spotlight} /></div>}
                <p className="text-sm leading-5 text-muted">{e.groups.map(g => `${g.items.length} ${g.label.toLowerCase()}`).join(" · ")}</p>
                <TextCta href={`/updates/${e.slug}/`}>Read this edition</TextCta>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

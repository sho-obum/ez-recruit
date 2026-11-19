import type { Metadata } from "next";
import PageShell from "@/components/page/PageShell";
import PageHeader from "@/components/page/PageHeader";
import PostCard, { PostCover } from "@/components/page/PostCard";
import TextCta from "@/components/TextCta";
import { POST_LIST } from "@/lib/content";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog | EZRecruit",
  description: "Honest guides and real stories for recruitment agencies, from the team behind EZRecruit.",
  alternates: { canonical: "/blog/" },
  openGraph: { type: "website", siteName: "EZRecruit", url: "/blog/", title: "Blog | EZRecruit", images: ogImage("blog") },
};

export default function BlogPage() {
  const [lead, ...rest] = POST_LIST;
  return (
    <PageShell trail={[["Blog", "/blog/"]]}>
      <PageHeader title="The EZRecruit blog." text="Honest guides and real stories for recruitment agencies." />

      <section className="flex flex-col items-center px-5 pb-10 md:px-6 md:pb-14 lg:px-8">
        <a href={lead.href} data-reveal className="group grid w-full max-w-[1136px] gap-6 lg:grid-cols-2 lg:items-center lg:gap-14">
          <PostCover p={lead} className="h-[280px] md:h-[380px]" />
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-sm leading-5 text-muted"><span>{lead.date}</span><span aria-hidden="true">·</span><span>{lead.read}</span></div>
            <h2 className="text-[28px] leading-[30.8px] font-semibold tracking-[-0.98px] md:text-[34px] md:leading-[37.4px] md:tracking-[-1.19px] lg:text-[40px] lg:leading-[44px] lg:tracking-[-1.4px]">{lead.title}</h2>
            <p className="max-w-[480px] text-base leading-6 text-muted">{lead.description}</p>
            <span className="font-display text-[15px] font-semibold tracking-[-0.15px] text-ink underline decoration-ink/25 underline-offset-[6px] transition-colors duration-300 group-hover:decoration-ink">Read the post</span>
          </div>
        </a>
      </section>

      <section className="flex flex-col items-center px-5 py-14 md:px-6 md:py-20 lg:px-8">
        <div className="grid w-full max-w-[1136px] gap-x-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, n) => <PostCard key={p.slug} p={p} n={n} />)}
        </div>
      </section>

      <section className="flex flex-col items-center px-5 pb-20 md:px-6 md:pb-28 lg:px-8">
        <div className="flex w-full max-w-[1136px] flex-col items-start gap-3 border-t border-line pt-8">
          <p className="text-lg leading-[26px] text-muted">Want to see what Nyra and EZRecruit do for your agency?</p>
          <TextCta href="/demo/">See it on your own jobs</TextCta>
        </div>
      </section>
    </PageShell>
  );
}

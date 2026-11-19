import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/page/PageShell";
import PostCard, { PostCover } from "@/components/page/PostCard";
import Prose from "@/components/page/Prose";
import TextCta from "@/components/TextCta";
import { POST_LIST, getPost, relatedPosts } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import { abs, ogImage } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => POST_LIST.map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} | EZRecruit`,
    description: p.description,
    alternates: { canonical: p.href },
    openGraph: { type: "article", title: p.title, description: p.description, url: p.href, publishedTime: new Date(p.time).toISOString(), images: ogImage(p.slug) },
  };
}

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  return (
    <PageShell trail={[["Blog", "/blog/"], [p.title, p.href]]}>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description, url: abs(p.href), mainEntityOfPage: abs(p.href),
        datePublished: new Date(p.time).toISOString(), image: abs(`/og/${p.slug}.png`), author: { "@type": "Organization", name: p.author },
        publisher: { "@type": "Organization", name: "EZRecruit", logo: { "@type": "ImageObject", url: abs("/ezrecruit-logo.png") } } }} />
      <header className="flex flex-col items-center px-5 pt-32 pb-10 md:px-6 md:pt-40 md:pb-12 lg:px-8">
        <div className="flex w-full max-w-[1136px] flex-col items-start gap-6">
          <TextCta href="/blog/">All posts</TextCta>
          <h1 data-reveal className="max-w-[900px] text-[32px] leading-[35px] font-semibold tracking-[-1.28px] text-balance md:text-[44px] md:leading-[47px] md:tracking-[-1.76px] lg:text-[56px] lg:leading-[59px] lg:tracking-[-2.24px]">{p.title}</h1>
          <p className="flex flex-wrap items-center gap-x-2 text-sm leading-5 text-muted"><span>{p.author}</span><span aria-hidden="true">·</span><span>{p.date}</span><span aria-hidden="true">·</span><span>{p.read}</span></p>
        </div>
      </header>

      <section className="flex flex-col items-center px-5 pb-12 md:px-6 md:pb-16 lg:px-8">
        <div data-reveal className="group w-full max-w-[1136px]"><PostCover p={p} className="h-[220px] md:h-[320px]" /></div>
      </section>

      <section className="px-5 pb-16 md:px-6 md:pb-24 lg:px-8"><Prose html={p.body} /></section>

      <section className="flex flex-col items-center px-5 pb-20 md:px-6 md:pb-28 lg:px-8">
        <div className="flex w-full max-w-[1136px] flex-col gap-10 border-t border-line pt-12">
          <h2 className="text-[28px] leading-[30px] font-semibold tracking-[-1.1px] md:text-[34px] md:leading-[37px]">More to read</h2>
          <div className="grid gap-x-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts(p.slug).map((r, n) => <PostCard key={r.slug} p={r} n={n} />)}
          </div>
          <TextCta href="/demo/">See it on your own jobs</TextCta>
        </div>
      </section>
    </PageShell>
  );
}

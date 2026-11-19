import type { Metadata } from "next";
import PageShell from "@/components/page/PageShell";
import PageHeader from "@/components/page/PageHeader";
import AskNyraLink from "@/components/page/AskNyraLink";
import TextCta from "@/components/TextCta";

export const metadata: Metadata = { title: "Page not found | EZRecruit", robots: { index: false } };

export default function NotFound() {
  return (
    <PageShell cta={false}>
      <PageHeader title="This page didn&apos;t make the shortlist." text="The link may be old, or the page has moved.">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
          <TextCta href="/">Back to the home page</TextCta>
          <AskNyraLink>Ask Nyra where it went</AskNyraLink>
        </div>
      </PageHeader>
      <div className="pb-24 md:pb-32" />
    </PageShell>
  );
}

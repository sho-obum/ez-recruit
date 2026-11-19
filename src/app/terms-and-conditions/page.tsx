import type { Metadata } from "next";
import PageShell from "@/components/page/PageShell";
import PageHeader from "@/components/page/PageHeader";
import Prose from "@/components/page/Prose";
import { LEGAL } from "@/lib/content";

export const metadata: Metadata = { title: "Terms and conditions | EZRecruit", description: "The terms for using EZRecruit.", alternates: { canonical: "/terms-and-conditions/" } };

export default function TermsPage() {
  return (
    <PageShell cta={false} trail={[["Terms and conditions", "/terms-and-conditions/"]]}>
      <PageHeader title="Terms and conditions." />
      <section className="px-5 pb-20 md:px-6 md:pb-28 lg:px-8"><Prose html={LEGAL["terms-and-conditions"]} /></section>
    </PageShell>
  );
}

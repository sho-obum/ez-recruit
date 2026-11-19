import type { Metadata } from "next";
import PageShell from "@/components/page/PageShell";
import PageHeader from "@/components/page/PageHeader";
import Prose from "@/components/page/Prose";
import { LEGAL } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy policy | EZRecruit", description: "How EZRecruit collects, uses and protects personal information.", alternates: { canonical: "/privacy-policy/" } };

export default function PrivacyPage() {
  return (
    <PageShell cta={false} trail={[["Privacy policy", "/privacy-policy/"]]}>
      <PageHeader title="Privacy policy." />
      <section className="px-5 pb-20 md:px-6 md:pb-28 lg:px-8"><Prose html={LEGAL["privacy-policy"]} /></section>
    </PageShell>
  );
}

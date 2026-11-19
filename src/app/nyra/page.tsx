import type { Metadata } from "next";
import { ogImage } from "@/lib/seo";
import PageShell from "@/components/page/PageShell";
import NyraHero from "@/components/nyra/NyraHero";
import NyraActions from "@/components/nyra/NyraActions";
import NyraWhy from "@/components/nyra/NyraWhy";
import NyraDay from "@/components/nyra/NyraDay";
import NyraSpeak from "@/components/nyra/NyraSpeak";
import NyraCapabilities from "@/components/nyra/NyraCapabilities";

export const metadata: Metadata = {
  title: "Nyra | EZRecruit recruitment assistant",
  description: "Meet Nyra, the recruiter's copilot inside EZRecruit: 100+ live capabilities, 36 actions that get work done and 30+ instant metrics, in English, Hindi or Hinglish.",
  alternates: { canonical: "/nyra/" },
  openGraph: { type: "website", siteName: "EZRecruit", url: "/nyra/", title: "Nyra | EZRecruit recruitment assistant", images: ogImage("nyra") },
};

export default function NyraPage() {
  return (
    <PageShell trail={[["Nyra", "/nyra/"]]}>
      <NyraHero />
      <NyraActions />
      <NyraWhy />
      <NyraDay />
      <NyraSpeak />
      <NyraCapabilities />
    </PageShell>
  );
}

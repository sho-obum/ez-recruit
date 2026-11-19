import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { SITE, abs, ogImage } from "@/lib/seo";

const switzer = localFont({
  src: [
    { path: "./fonts/switzer-400.woff2", weight: "400" },
    { path: "./fonts/switzer-500.woff2", weight: "500" },
    { path: "./fonts/switzer-600.woff2", weight: "600" },
  ],
  variable: "--font-switzer",
  display: "swap",
});
// Manrope (SIL OFL) for headings, self-hosted.
const manrope = localFont({ src: "./fonts/manrope.woff2", weight: "200 800", variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ezrecruit.ai"),
  title: "EZRecruit | Recruitment Agency Operating System & ATS",
  description:
    "EZRecruit is the ATS for recruitment and staffing agencies. Manage jobs, candidates, client trackers and interviews, with Nyra, your AI assistant.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "EZRecruit", url: "/", locale: "en_IN", images: ogImage("default") },
  twitter: { card: "summary_large_image" },
};

// Marks that JS runs, so scroll reveals may start hidden.
const BOOT = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${switzer.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "EZRecruit", url: SITE, logo: abs("/ezrecruit-logo.png"), email: "support@ezrecruit.ai", sameAs: ["https://www.linkedin.com/company/deeptalent-technologies/"] }} />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: "EZRecruit", url: SITE }} />
        {children}
      </body>
    </html>
  );
}

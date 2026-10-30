import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const switzer = localFont({
  src: [
    { path: "./fonts/switzer-400.woff2", weight: "400" },
    { path: "./fonts/switzer-500.woff2", weight: "500" },
    { path: "./fonts/switzer-600.woff2", weight: "600" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ezrecruit.ai"),
  title: "EZRecruit | Recruitment Agency Operating System & ATS",
  description:
    "EZRecruit is the ATS and operating system for recruitment and staffing agencies: structured briefs, your own candidate database, client-ready trackers, closures and Nyra, your AI assistant.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "EZRecruit", url: "/" },
};

// Decides before first paint whether the intro screen plays (once per session, never with reduced motion).
const BOOT = `document.documentElement.classList.add("js");try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("ez-intro")){document.documentElement.classList.add("boot");sessionStorage.setItem("ez-intro","1")}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={switzer.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

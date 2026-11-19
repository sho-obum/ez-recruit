import type { Metadata } from "next";

// The live site used /contact-us for the demo form; old links land on /demo/.
export const metadata: Metadata = { title: "Book a demo | EZRecruit", robots: { index: false }, alternates: { canonical: "/demo/" } };

export default function ContactUsRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/demo/" />
      <p className="p-8 text-center text-muted">Taking you to <a className="underline" href="/demo/">the demo page</a>.</p>
    </>
  );
}

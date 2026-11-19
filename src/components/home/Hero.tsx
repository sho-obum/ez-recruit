import HeroScene from "./HeroScene";
import HeroBottom from "./HeroBottom";
import Build from "./Build";

// Fine film grain over the hero panel, drawn with SVG noise.
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// The light hero stays pinned while the dark Nyra panel slides up over it.
export default function Hero() {
  return (
    <div data-section="Hero Stack" className="relative flex flex-col">
      <section id="top" className="sticky top-0 z-0 h-screen overflow-clip bg-white">
        <div className="relative size-full overflow-clip bg-[linear-gradient(#ffffff_0%,#f1f1f3_100%)]">
          <div aria-hidden="true" className="absolute inset-0 opacity-5" style={{ backgroundImage: GRAIN }} />
          <div className="absolute inset-0 z-[2]">
            <HeroScene text="Hiring? Sorted." />
          </div>
          <HeroBottom />
        </div>
      </section>
      <Build />
    </div>
  );
}

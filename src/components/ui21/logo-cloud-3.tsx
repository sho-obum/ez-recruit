import { InfiniteSlider } from "./infinite-slider";
import { cn } from "./cn";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

// From the 21st.dev "logo-cloud-3" (shaban), installed via its registry; classes and slider props adapted to this site.
export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={64} reverse duration={30} durationOnHover={80}>
        {logos.map((logo, i) => (
          <img
            alt={logo.alt}
            className="pointer-events-none h-9 w-auto select-none md:h-11"
            height={logo.height}
            key={`logo-${i}`}
            loading="lazy"
            src={logo.src}
            width={logo.width}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}

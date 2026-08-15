import type { CSSProperties } from "react";

import type { BrandIcon } from "@/lib/brand-icons";
import { cn } from "@/lib/utils";

/**
 * A brand glyph from `simple-icons`, drawn in the current text colour.
 *
 * Callers look the icon up themselves and pass it in, because they generally
 * need to know whether one exists anyway — to pick a fallback glyph, or to
 * decide whether the brand hover tint applies.
 */
export function BrandMark({
  icon,
  className,
}: {
  icon: BrandIcon;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path d={icon.path} />
    </svg>
  );
}

/**
 * Hands the brand's own hue to `.lift-brand`, which mixes it far back towards
 * the foreground so it lands as a tint on hover rather than a logo colour.
 */
export function brandStyle(icon: BrandIcon): CSSProperties {
  return { "--brand": `#${icon.hex}` } as CSSProperties;
}

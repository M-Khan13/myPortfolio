import { BrandMark, brandStyle } from "@/components/brand-mark";
import { Section } from "@/components/frame";
import { stack } from "@/content";
import { brandIcon } from "@/lib/brand-icons";
import { cn } from "@/lib/utils";

export function Stack() {
  return (
    <Section label="Stack">
      <div className="border-t border-rule">
        {stack.map((group) => (
          <div
            key={group.no}
            className="flex flex-col gap-2 border-b border-rule py-4 sm:flex-row sm:gap-6"
          >
            <div className="flex shrink-0 items-baseline gap-2 sm:w-40">
              <span className="font-mono text-[0.6875rem] text-muted-foreground">
                {group.no}
              </span>
              <span className="font-heading text-sm font-semibold tracking-tight">
                {group.label}
              </span>
            </div>

            <ul className="flex flex-wrap gap-x-4 gap-y-2.5">
              {group.items.map((item) => (
                <Tech key={item} label={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/**
 * A brand mark plus its mono label, muted at rest.
 *
 * Anything without a mark in `simple-icons` — RAG, LLM Eval Guards,
 * nomic-embed, DRF — falls back to a neutral square glyph so the row still
 * aligns on the same optical grid.
 */
function Tech({ label }: { label: string }) {
  const brand = brandIcon(label);

  return (
    <li>
      <span
        className={cn(
          "lift inline-flex items-center gap-2 text-muted-foreground",
          // Brand hue is only ever used as the hover tint, and `.lift-brand`
          // mixes it way back towards the foreground before it lands.
          brand && "lift-brand",
        )}
        style={brand ? brandStyle(brand) : undefined}
      >
        {brand ? (
          <BrandMark icon={brand} className="size-4" />
        ) : (
          <NeutralGlyph />
        )}
        <span className="font-mono text-[0.75rem] tracking-tight">{label}</span>
      </span>
    </li>
  );
}

function NeutralGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className="size-4 shrink-0"
    >
      <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" />
    </svg>
  );
}

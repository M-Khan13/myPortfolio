import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { isPlaceholder, placeholderLabel } from "@/content";
import {
  ArrowUpRightIcon,
  entryIcons,
  type EntryIconId,
} from "@/components/icons";

/**
 * The centred content column. Its left/right borders are the hairline grid
 * rules that frame the whole page, so they run unbroken from nav to footer.
 */
export function Column({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-3xl border-rule sm:border-x",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Diagonal-hatch strip between sections, bounded by hairline rules. This is the
 * one divider used everywhere so the rhythm stays consistent.
 */
export function Divider({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      className={cn("hatch h-6 border-y border-rule", className)}
    />
  );
}

export function Section({
  id,
  label,
  children,
  className,
}: {
  id?: string;
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn("px-5 py-10 sm:px-8 sm:py-14", className)}
    >
      {label ? <SectionLabel>{label}</SectionLabel> : null}
      {children}
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="label mb-6 flex items-center gap-3">
      <span className="size-1 shrink-0 rotate-45 bg-rule-strong" />
      {children}
    </h2>
  );
}

/** Monospace tech tag. */
export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="lift lift-box inline-block rounded border border-rule bg-surface px-2 py-1 font-mono text-[0.6875rem] text-muted-foreground">
      {children}
    </span>
  );
}

/**
 * Outbound link chip — the bordered mono button used for a project's repo/live
 * links, on both the homepage cards and the case-study pages.
 */
export function LinkChip({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "group inline-flex items-center gap-1.5 rounded border border-rule px-2.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-rule-strong hover:text-foreground",
        className,
      )}
    >
      {children}
      <ArrowUpRightIcon className="size-3" />
    </a>
  );
}

/**
 * A project's link row: filled hrefs become chips, unfilled `{{PLACEHOLDER}}`
 * ones stay visible as labelled dashed chips rather than dead links.
 */
export function ProjectLinks({
  links,
  className,
}: {
  links: { label: string; href: string }[];
  className?: string;
}) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {links.map((link) =>
        isPlaceholder(link.href) ? (
          <li key={link.label} className="flex items-center gap-2">
            <span className="label">{link.label}</span>
            <PlaceholderChip value={link.href} />
          </li>
        ) : (
          <li key={link.label}>
            <LinkChip href={link.href}>{link.label}</LinkChip>
          </li>
        ),
      )}
    </ul>
  );
}

/**
 * Icon badge that opens an Experience / Project / Education entry: the glyph in
 * a rounded square with a hairline border. Brightens with the row it belongs to
 * — see the `.lift` rules in globals.css.
 */
export function EntryBadge({ icon }: { icon: EntryIconId }) {
  const Icon = entryIcons[icon];

  return (
    <Badge>
      <Icon className="size-4" />
    </Badge>
  );
}

/**
 * The badge shell itself — a rounded square with a hairline border. Holds an
 * entry glyph on the homepage and a step number on the case-study pages.
 */
export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "lift lift-box grid size-8 shrink-0 place-items-center rounded-md border border-rule bg-surface text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * The left rail shared by all three entry sections: a badge with a hairline
 * connector dropping from it to the entry's tag row at the bottom.
 *
 * The rail is a grid column, so it stretches to the full height of the entry
 * beside it and the connector grows as a disclosure opens. It fades out at the
 * bottom rather than stopping hard, which keeps it from fighting the section
 * rules for attention.
 */
export function EntryRail({ icon }: { icon: EntryIconId }) {
  return (
    <BadgeRail className="pt-4">
      <EntryBadge icon={icon} />
    </BadgeRail>
  );
}

/** The badge-plus-connector rail itself, given any badge as its head. */
export function BadgeRail({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {children}
      <span
        role="presentation"
        className="mt-2 w-px flex-1 bg-linear-to-b from-rule-strong to-transparent"
      />
    </div>
  );
}

/** Grid that pairs an entry rail with the entry body. */
export function EntryLayout({
  icon,
  children,
  className,
}: {
  icon: EntryIconId;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/entry grid grid-cols-[2rem_1fr] gap-x-3 sm:gap-x-4",
        className,
      )}
    >
      <EntryRail icon={icon} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/**
 * Renders an unfilled `{{PLACEHOLDER}}` as an obvious dashed chip so it can't
 * be mistaken for real content or silently shipped as a dead link.
 */
export function PlaceholderChip({ value }: { value: string }) {
  return (
    <span
      title="Unfilled placeholder — set this in src/content.ts"
      className="inline-flex items-center rounded border border-dashed border-rule-strong px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted-foreground"
    >
      {placeholderLabel(value)}
    </span>
  );
}

/**
 * A value that may or may not be filled in yet. Filled values become links,
 * placeholders become chips.
 */
export function Value({
  value,
  href,
  external,
  className,
}: {
  value: string;
  href?: string;
  external?: boolean;
  className?: string;
}) {
  if (isPlaceholder(value)) return <PlaceholderChip value={value} />;
  if (!href || isPlaceholder(href)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "group inline-flex items-center gap-1 underline decoration-rule-strong underline-offset-4 transition-colors hover:decoration-foreground",
        className,
      )}
    >
      {value}
      {external ? (
        <ArrowUpRightIcon className="size-3 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      ) : null}
    </a>
  );
}

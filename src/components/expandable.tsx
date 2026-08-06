"use client";

import { useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { EntryLayout } from "@/components/frame";
import { ChevronIcon, type EntryIconId } from "@/components/icons";

/**
 * Disclosure row used by Experience and Projects.
 *
 * The open/close animation uses a `grid-template-rows: 0fr → 1fr` transition,
 * which animates to the panel's natural height without measuring it in JS.
 * `prefers-reduced-motion` zeroes the transition globally in globals.css, so
 * the panel snaps instead of sliding.
 *
 * The collapsed panel is `inert`, keeping its links out of the tab order and
 * out of the accessibility tree.
 */
export function Expandable({
  icon,
  trigger,
  children,
  defaultOpen = false,
  className,
}: {
  /** Glyph for the badge on the entry's left rail. */
  icon: EntryIconId;
  trigger: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const panelId = `${id}-panel`;
  const triggerId = `${id}-trigger`;

  return (
    <div className={cn("border-t border-rule first:border-t-0", className)}>
      <EntryLayout icon={icon}>
        <button
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-start gap-4 py-4 text-left transition-colors hover:bg-accent/40"
        >
          <span className="min-w-0 flex-1">{trigger}</span>
          <ChevronIcon
            className={cn(
              "mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:text-foreground",
              open && "rotate-180",
            )}
          />
        </button>

        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          inert={!open}
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="pb-6">{children}</div>
          </div>
        </div>
      </EntryLayout>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { Badge, Divider, Section } from "@/components/frame";
import { caseStudyIcons } from "@/components/icons";
import { isPlaceholder, type CaseStudy } from "@/content";
import type { CaseStudyProject } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * The body of a case-study page: every block below the header, in reading
 * order. Blocks whose content is missing drop out entirely, so a thinner case
 * study still reads as finished rather than broken.
 *
 * The three narrative beats — problem, constraints, what I built — share one
 * badge rail, which is why they live inside a single section rather than each
 * getting their own.
 */
export function CaseStudyBody({
  study,
  title,
}: {
  study: CaseStudy;
  title: string;
}) {
  return (
    <>
      {study.cover ? (
        // No eyebrow, and no top padding — the cover belongs to the header
        // block above it and leads straight into the write-up.
        <Section className="pt-0">
          <Frame
            className="aspect-video"
            src={study.cover.src}
            alt={`${title} — ${study.cover.caption}`}
            caption={study.cover.caption}
            chrome
            sizes="(min-width: 768px) 768px, 100vw"
          />
        </Section>
      ) : null}

      <Divider />

      <Section>
        <Rail>
          <RailBlock icon="problem" label="The problem">
            <Prose>{study.problem}</Prose>
          </RailBlock>

          <RailBlock icon="constraints" label="Constraints">
            <Constraints items={study.constraints} />
          </RailBlock>

          <RailBlock icon="build" label="What I built">
            <Prose>{study.build.intro}</Prose>
            <Architecture {...study.build.architecture} />
            <Decisions items={study.build.decisions} />
          </RailBlock>
        </Rail>
      </Section>

      <Divider />

      <Section label="Outcome">
        <Outcome stats={study.outcome} />
      </Section>

      {study.gallery && study.gallery.length > 0 ? (
        <Section label="Gallery" className="pt-0">
          <Gallery shots={study.gallery} />
        </Section>
      ) : null}

      <Divider />

      <Section label="Reflection">
        <p className="max-w-xl text-pretty font-heading text-xl leading-snug tracking-tight sm:text-2xl">
          {study.reflection}
        </p>
      </Section>
    </>
  );
}

/**
 * The shared left rail: one hairline running the height of the group with the
 * section badges sitting on it. The line is drawn once behind the badges —
 * their surface fill masks it — so it reads as continuous rather than as three
 * separate connectors.
 */
function Rail({ children }: { children: ReactNode }) {
  return (
    <div className="relative grid grid-cols-[2rem_1fr] gap-x-4 sm:gap-x-6">
      <span
        aria-hidden="true"
        className="absolute left-4 top-4 bottom-0 w-px -translate-x-1/2 bg-linear-to-b from-rule-strong via-rule-strong to-transparent"
      />
      {children}
    </div>
  );
}

/**
 * One beat of the rail. Returns two grid cells — badge, then content — so
 * every block shares the parent's single column layout.
 */
function RailBlock({
  icon,
  label,
  children,
}: {
  icon: keyof typeof caseStudyIcons;
  label: string;
  children: ReactNode;
}) {
  const Icon = caseStudyIcons[icon];

  return (
    <>
      <Badge>
        <Icon className="size-4" />
      </Badge>
      {/* The badge is 2rem tall, so the eyebrow centres against it. */}
      <div className="min-w-0 pb-14 last:pb-0">
        <h2 className="label flex h-8 items-center">{label}</h2>
        <div className="mt-3">{children}</div>
      </div>
    </>
  );
}

/** Body copy, held to a comfortable measure. */
function Prose({ children }: { children: string }) {
  return (
    <p className="max-w-prose text-pretty text-sm leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

/**
 * An image slot. Until a real file is dropped in /public the `{{PLACEHOLDER}}`
 * src draws the empty frame instead — a hatched box captioned in brackets,
 * never a broken image.
 */
function Frame({
  src,
  alt,
  caption,
  className,
  sizes,
  chrome = false,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  sizes?: string;
  /** Draws the window dots along the top edge, as the cover does. */
  chrome?: boolean;
}) {
  if (!isPlaceholder(src)) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded border border-rule bg-surface",
          className,
        )}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative grid w-full place-items-center rounded border border-rule bg-surface",
        className,
      )}
    >
      {chrome ? (
        <span aria-hidden="true" className="absolute left-4 top-4 flex gap-1.5">
          <span className="size-2 rounded-full border border-rule-strong" />
          <span className="size-2 rounded-full border border-rule-strong" />
          <span className="size-2 rounded-full border border-rule-strong" />
        </span>
      ) : null}
      <span className="label px-4 text-center">[ {caption} ]</span>
    </div>
  );
}

/** Numbered constraints, with the number hanging in its own narrow column. */
function Constraints({ items }: { items: string[] }) {
  return (
    <ol className="space-y-5">
      {items.map((item, i) => (
        <li key={item} className="grid grid-cols-[1.75rem_1fr] gap-x-2">
          <span className="label pt-0.5">{String(i + 1).padStart(2, "0")}</span>
          <p className="max-w-prose text-pretty text-sm leading-relaxed text-muted-foreground">
            {item}
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * The system diagram: a framed flow of monochrome boxes. Each row of nodes sits
 * side by side, and rows are joined top to bottom — so a spine that branches
 * into several services is just a row with more than one node in it.
 */
function Architecture({ rows, deploy }: CaseStudy["build"]["architecture"]) {
  return (
    <div className="mt-8 rounded border border-rule px-4 py-6 sm:px-8">
      {rows.map((row, i) => (
        // Rows have no stable key of their own; their position is their key.
        <Fragment key={i}>
          {i > 0 ? (
            <p
              aria-hidden="true"
              className="py-2 text-center font-mono text-xs text-muted-foreground"
            >
              ↓
            </p>
          ) : null}
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            {row.map((node) => (
              <div
                key={node.label}
                className="lift lift-box flex-1 rounded border border-rule bg-surface px-3 py-2.5 text-center sm:max-w-56"
              >
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
                  {node.label}
                </p>
                {node.sub ? (
                  <p className="mt-1 font-mono text-[0.625rem] leading-relaxed text-muted-foreground">
                    {node.sub}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </Fragment>
      ))}

      {deploy ? (
        <p className="mt-6 font-mono text-[0.625rem] text-muted-foreground">
          <span className="mr-2 uppercase tracking-[0.14em]">Deploy</span>
          {deploy}
        </p>
      ) : null}
    </div>
  );
}

/** Key decisions — the title runs into its own paragraph after the arrow. */
function Decisions({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="mt-10">
      <h3 className="label mb-5">Key decisions</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 font-mono text-xs text-rule-strong"
            >
              →
            </span>
            <p className="max-w-prose text-pretty text-sm leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">
                {item.title}.
              </strong>{" "}
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Result stats: a big mono value over a small label, split by hairlines. */
function Outcome({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="grid border-t border-rule sm:grid-cols-3">
      {stats.map((stat, i) => (
        // Reversed so the value reads first while the label stays the term.
        <div
          key={stat.label}
          className={cn(
            // `justify-end` packs to the *top* in a reversed column, so the
            // values share a baseline even when one label wraps to fewer lines.
            "flex flex-col-reverse justify-end py-6",
            i > 0 && "border-t border-rule sm:border-l sm:border-t-0 sm:pl-6",
            i > 0 || "sm:pr-6",
          )}
        >
          <dt className="mt-2 max-w-40 text-pretty text-xs leading-relaxed text-muted-foreground">
            {stat.label}
          </dt>
          <dd className="font-mono text-3xl tracking-tight text-foreground">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Gallery({ shots }: { shots: { src: string; caption: string }[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {shots.map((shot) => (
        <li key={shot.caption}>
          <Frame
            className="aspect-video"
            src={shot.src}
            alt={shot.caption}
            caption={shot.caption}
            sizes="(min-width: 640px) 384px, 100vw"
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * Prev / next links to the neighbouring case studies. Renders nothing when a
 * project has no neighbours, so the page just ends on the reflection.
 */
export function CaseStudyNav({
  prev,
  next,
}: {
  prev?: CaseStudyProject;
  next?: CaseStudyProject;
}) {
  if (!prev && !next) return null;

  return (
    <Section className="pt-0">
      <nav
        aria-label="More case studies"
        className="flex flex-wrap items-start justify-between gap-6 border-t border-rule pt-6"
      >
        {prev ? <NavLink project={prev} direction="prev" /> : <span />}
        {next ? <NavLink project={next} direction="next" /> : null}
      </nav>
    </Section>
  );
}

function NavLink({
  project,
  direction,
}: {
  project: CaseStudyProject;
  direction: "prev" | "next";
}) {
  const next = direction === "next";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group max-w-[48%]", next && "text-right")}
    >
      <span className="label transition-colors group-hover:text-foreground">
        {next ? "Next →" : "← Prev"}
      </span>
      <span className="mt-1.5 block text-sm text-muted-foreground transition-colors group-hover:text-foreground">
        {project.title}
      </span>
    </Link>
  );
}

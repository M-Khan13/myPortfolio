import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { Badge, BadgeRail, Divider, Section } from "@/components/frame";
import { isPlaceholder, type CaseStudy } from "@/content";
import type { CaseStudyProject } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * The body of a case-study page: every block below the header, in reading
 * order. Blocks whose content is missing drop out entirely, so a thinner case
 * study still reads as finished rather than broken.
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
        <>
          <Divider />
          {/* No eyebrow — the cover leads straight into the write-up. */}
          <Section>
            <Frame
              // Letterboxed on a wide screen, squarer on a phone so the cover
              // doesn't collapse to a sliver.
              className="aspect-video sm:aspect-[21/9]"
              src={study.cover}
              alt={`${title} — cover`}
              sizes="(min-width: 768px) 768px, 100vw"
            />
          </Section>
        </>
      ) : null}

      <Divider />
      <Section label="The problem">
        <Prose>{study.problem}</Prose>
      </Section>

      <Divider />
      <Section label="Constraints">
        <Constraints items={study.constraints} />
      </Section>

      <Divider />
      <Section label="What I built">
        <Prose>{study.build.intro}</Prose>
        <Architecture {...study.build.architecture} />
        <Decisions items={study.build.decisions} />
      </Section>

      <Divider />
      <Section label="Outcome">
        <Outcome stats={study.outcome} />
      </Section>

      {study.gallery && study.gallery.length > 0 ? (
        <>
          <Divider />
          <Section label="Gallery">
            <Gallery shots={study.gallery} />
          </Section>
        </>
      ) : null}

      <Divider />
      <Section label="Reflection">
        <Prose>{study.reflection}</Prose>
      </Section>
    </>
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
    <>
      <Divider />
      <Section label="More case studies">
        <nav className="flex flex-wrap items-start justify-between gap-6">
          {prev ? <NavLink project={prev} direction="prev" /> : <span />}
          {next ? <NavLink project={next} direction="next" /> : null}
        </nav>
      </Section>
    </>
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
      <span className="mt-1.5 block font-heading text-sm font-semibold tracking-tight text-muted-foreground transition-colors group-hover:text-foreground">
        {project.title}
      </span>
    </Link>
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
 * src draws the empty frame instead — a hatched box on the grid, never a broken
 * image.
 */
function Frame({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded border border-rule bg-surface",
        className,
      )}
    >
      {isPlaceholder(src) ? (
        <div role="presentation" className="hatch size-full" />
      ) : (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      )}
    </div>
  );
}

/**
 * Numbered constraints, each on the badge-and-connector rail the homepage
 * entries use, so the two pages share one left margin.
 */
function Constraints({ items }: { items: string[] }) {
  return (
    <ol className="space-y-6">
      {items.map((item, i) => (
        <li
          key={item}
          className="group/entry grid grid-cols-[2rem_1fr] gap-x-3 sm:gap-x-4"
        >
          <BadgeRail>
            <Badge className="font-mono text-[0.6875rem]">
              {String(i + 1).padStart(2, "0")}
            </Badge>
          </BadgeRail>
          <p className="max-w-prose text-pretty pt-1.5 text-sm leading-relaxed text-muted-foreground">
            {item}
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * The system diagram: one monochrome box per node, joined by hairline
 * connectors that run left-to-right on a wide screen and top-to-bottom once
 * the boxes stack.
 */
function Architecture({
  nodes,
  deploy,
}: CaseStudy["build"]["architecture"]) {
  return (
    <div className="mt-8">
      {/* A diagram, not a list: the boxes are plain flow content so the
          connectors between them stay out of the accessibility tree. */}
      <div className="flex flex-col items-stretch sm:flex-row">
        {nodes.map((node, i) => (
          <Fragment key={node.label}>
            {i > 0 ? (
              <span
                aria-hidden="true"
                className="mx-auto h-4 w-px shrink-0 self-center bg-rule-strong sm:mx-0 sm:h-px sm:w-4"
              />
            ) : null}
            <div className="lift lift-box flex-1 rounded border border-rule bg-surface px-3 py-3 text-center">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
                {node.label}
              </p>
              {node.sub ? (
                <p className="mt-1 font-mono text-[0.625rem] leading-relaxed text-muted-foreground">
                  {node.sub}
                </p>
              ) : null}
            </div>
          </Fragment>
        ))}
      </div>

      {deploy ? (
        <p className="mt-4 border-t border-rule pt-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="mr-2 text-foreground">Deploy</span>
          {deploy}
        </p>
      ) : null}
    </div>
  );
}

/** Key decisions, as arrow points. */
function Decisions({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="mt-10">
      <h3 className="label mb-5">Key decisions</h3>
      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 font-mono text-xs text-rule-strong"
            >
              →
            </span>
            <div className="max-w-prose">
              <p className="font-heading text-sm font-semibold tracking-tight">
                {item.title}
              </p>
              <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Result stats: a big mono value over a small label. */
function Outcome({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded border border-rule bg-rule sm:grid-cols-3">
      {stats.map((stat) => (
        // Reversed so the value reads first while the label stays the term.
        <div
          key={stat.label}
          className="flex flex-col-reverse bg-surface px-4 py-5"
        >
          <dt className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground">
            {stat.label}
          </dt>
          <dd className="font-mono text-2xl tracking-tight text-foreground">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Gallery({ shots }: { shots: { src: string; caption: string }[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {shots.map((shot) => (
        <li key={shot.caption}>
          <figure>
            <Frame
              className="aspect-video"
              src={shot.src}
              alt={shot.caption}
              sizes="(min-width: 640px) 384px, 100vw"
            />
            <figcaption className="label mt-2.5">{shot.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

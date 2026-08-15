import Link from "next/link";

import { ProjectLinks, Section, TechPill } from "@/components/frame";
import { Expandable } from "@/components/expandable";
import { projects } from "@/content";

export function Projects() {
  return (
    <Section id="projects" label="Projects">
      <div className="border-t border-rule">
        {projects.map((project) => (
          <Expandable
            key={project.title}
            icon={project.icon}
            defaultOpen={project.defaultOpen}
            trigger={
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-heading text-base font-semibold tracking-tight">
                  {project.title}
                </span>
                <span className="label shrink-0">{project.year}</span>
              </span>
            }
          >
            <p className="text-pretty text-sm text-muted-foreground">
              {project.description}
            </p>

            <ul className="mt-4 space-y-3">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-pretty text-sm leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1 shrink-0 rotate-45 bg-rule-strong"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li key={tech}>
                  <TechPill label={tech} />
                </li>
              ))}
            </ul>

            <ProjectLinks links={project.links} className="mt-5" />

            {/* Only for projects with a write-up; the rest keep the card as
                their whole story. The collapsed panel is inert, so this stays
                out of the tab order until the entry is open. */}
            {project.caseStudy ? (
              <Link
                href={`/projects/${project.slug}`}
                className="mt-6 inline-flex items-center gap-2 border-b border-rule-strong pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors hover:border-foreground"
              >
                Read case study
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </Expandable>
        ))}
      </div>
    </Section>
  );
}

import { PlaceholderChip, Pill, Section } from "@/components/frame";
import { Expandable } from "@/components/expandable";
import { ArrowUpRightIcon } from "@/components/icons";
import { isPlaceholder, projects } from "@/content";

export function Projects() {
  return (
    <Section label="Projects">
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
                  <Pill>{tech}</Pill>
                </li>
              ))}
            </ul>

            {project.links.length > 0 ? (
              <ul className="mt-5 flex flex-wrap items-center gap-3">
                {project.links.map((link) =>
                  isPlaceholder(link.href) ? (
                    <li key={link.label} className="flex items-center gap-2">
                      <span className="label">{link.label}</span>
                      <PlaceholderChip value={link.href} />
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group inline-flex items-center gap-1.5 rounded border border-rule px-2.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-rule-strong hover:text-foreground"
                      >
                        {link.label}
                        <ArrowUpRightIcon className="size-3" />
                      </a>
                    </li>
                  ),
                )}
              </ul>
            ) : null}
          </Expandable>
        ))}
      </div>
    </Section>
  );
}

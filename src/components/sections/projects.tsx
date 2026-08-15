import { Pill, ProjectLinks, Section } from "@/components/frame";
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
                  <Pill>{tech}</Pill>
                </li>
              ))}
            </ul>

            <ProjectLinks links={project.links} className="mt-5" />
          </Expandable>
        ))}
      </div>
    </Section>
  );
}

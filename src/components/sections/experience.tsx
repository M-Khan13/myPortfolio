import { Pill, Section } from "@/components/frame";
import { Expandable } from "@/components/expandable";
import { experience } from "@/content";

export function Experience() {
  return (
    <Section label="Experience">
      <div className="border-t border-rule">
        {experience.map((role) => (
          <Expandable
            key={`${role.company}-${role.role}`}
            icon={role.icon}
            defaultOpen={role.defaultOpen}
            trigger={
              <span className="flex flex-col gap-1">
                <span className="font-heading text-base font-semibold tracking-tight">
                  {role.company}
                </span>
                <span className="text-sm text-muted-foreground">{role.role}</span>
                <span className="label normal-case tracking-[0.12em]">
                  {role.dates} · {role.location}
                </span>
              </span>
            }
          >
            <ul className="space-y-3">
              {role.bullets.map((bullet) => (
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
              {role.tech.map((tech) => (
                <li key={tech}>
                  <Pill>{tech}</Pill>
                </li>
              ))}
            </ul>
          </Expandable>
        ))}
      </div>
    </Section>
  );
}

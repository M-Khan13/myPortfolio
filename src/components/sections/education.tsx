import { EntryLayout, Pill, Section } from "@/components/frame";
import { education } from "@/content";

export function Education() {
  return (
    <Section label="Education">
      <div className="border-t border-rule">
        {/*
          No disclosure here, but the same rail as Experience and Projects so
          the three sections read as one system.
        */}
        <EntryLayout icon={education.icon} className="pb-4">
          <div className="py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-heading text-base font-semibold tracking-tight">
                {education.school}
              </h3>
              <span className="label">{education.dates}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {education.degree} · {education.detail}
            </p>

            <p className="label mt-5">Coursework</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {education.coursework.map((course) => (
                <li key={course}>
                  <Pill>{course}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </EntryLayout>
      </div>
    </Section>
  );
}

import { Section } from "@/components/frame";
import { Greeting } from "@/components/greeting";
import { intro, profile } from "@/content";
import { greeting } from "@/lib/time";

export function Intro({ now }: { now: Date }) {
  return (
    <Section label="Intro">
      <p className="font-script text-4xl leading-tight sm:text-5xl">
        <Greeting
          initial={greeting(now, profile.timeZone)}
          timeZone={profile.timeZone}
        />
      </p>

      <ul className="mt-6 space-y-3">
        {intro.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-pretty text-sm leading-relaxed sm:text-base">
            <span
              aria-hidden="true"
              className="mt-2.5 size-1 shrink-0 rotate-45 bg-rule-strong"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

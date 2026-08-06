import Image from "next/image";
import type { ReactNode } from "react";

import { PlaceholderChip, Section, Value } from "@/components/frame";
import { socialIcons, VerifiedIcon } from "@/components/icons";
import { IsoMark } from "@/components/iso-mark";
import { LocalClock } from "@/components/local-clock";
import { isPlaceholder, profile, socials } from "@/content";
import { formatTime } from "@/lib/time";

const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export function Hero({ now }: { now: Date }) {
  return (
    <Section id="main" className="pt-10 sm:pt-14">
      {/* Wraps the card so the wireframe's pointer glow tracks across it too. */}
      <IsoMark>
        <div className="flex items-start gap-5">
          <Avatar />

          <div className="min-w-0 flex-1">
            <h1 className="flex items-center gap-1.5 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              {profile.name}
              {profile.verified ? (
                <>
                  <VerifiedIcon className="size-4 shrink-0 text-foreground/70" />
                  <span className="sr-only">(verified)</span>
                </>
              ) : null}
            </h1>
            <p className="mt-2 text-pretty text-sm text-muted-foreground sm:text-base">
              {profile.tagline}
            </p>
          </div>
        </div>

        {/* Two-column data grid — the technical spine of the card. */}
        <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-0 border-t border-rule sm:grid-cols-2">
          <Row term="Role">{profile.title}</Row>
          <Row term="Fellowship">{profile.secondary}</Row>
          <Row term="Location">{profile.location}</Row>
          <Row term="Local time">
            <LocalClock
              timeZone={profile.timeZone}
              label={profile.timeZoneLabel}
              initialTime={formatTime(now, profile.timeZone)}
            />
          </Row>
          <Row term="Email">
            <Value value={profile.email} href={`mailto:${profile.email}`} />
          </Row>
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {socials.map((social) => {
            const Icon = socialIcons[social.id];
            const disabled = isPlaceholder(social.href);

            if (disabled) {
              return (
                <span
                  key={social.id}
                  title={`${social.label} — set this in src/content.ts`}
                  className="grid size-9 place-items-center rounded-md border border-dashed border-rule-strong text-muted-foreground/50"
                >
                  <Icon className="size-4" />
                  <span className="sr-only">{social.label} (not set)</span>
                </span>
              );
            }

            return (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                title={social.handle}
                className="lift lift-box grid size-9 place-items-center rounded-md border border-rule text-muted-foreground"
              >
                <Icon className="size-4" />
              </a>
            );
          })}

          {profile.resume ? (
            isPlaceholder(profile.resume) ? (
              <PlaceholderChip value={profile.resume} />
            ) : (
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="lift lift-box rounded-md border border-rule px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground"
              >
                Résumé
              </a>
            )
          ) : null}
        </div>
      </IsoMark>
    </Section>
  );
}

function Avatar() {
  const missing = isPlaceholder(profile.avatar);

  if (missing) {
    return (
      <div
        title="Drop an image in /public and set profile.avatar in src/content.ts"
        className="grid size-16 shrink-0 place-items-center rounded-lg border border-dashed border-rule-strong bg-surface font-heading text-lg font-bold text-muted-foreground sm:size-20"
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={profile.avatar}
      alt={profile.name}
      width={80}
      height={80}
      priority
      className="size-16 shrink-0 rounded-lg border border-rule object-cover sm:size-20"
    />
  );
}

function Row({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-rule py-3">
      <dt className="label">{term}</dt>
      <dd className="font-mono text-[0.8125rem] leading-relaxed">{children}</dd>
    </div>
  );
}

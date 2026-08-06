import { ContactForm } from "@/components/contact-form";
import { Section, Value } from "@/components/frame";
import { isPlaceholder, outro, profile, socials } from "@/content";

const contactIds = ["github", "linkedin"] as const;

export function Outro() {
  const links = contactIds
    .map((id) => socials.find((social) => social.id === id))
    .filter((social) => social !== undefined);

  return (
    <Section label="Contact">
      <p className="font-heading text-2xl font-bold tracking-tight text-pretty sm:text-3xl">
        {outro.line}
      </p>

      <dl className="mt-6 grid grid-cols-1 gap-x-8 border-t border-rule sm:grid-cols-2">
        <div className="flex flex-col gap-0.5 border-b border-rule py-3">
          <dt className="label">Email</dt>
          <dd className="font-mono text-[0.8125rem]">
            <Value value={profile.email} href={`mailto:${profile.email}`} />
          </dd>
        </div>

        {links.map((social) => (
          <div
            key={social.id}
            className="flex flex-col gap-0.5 border-b border-rule py-3"
          >
            <dt className="label">{social.label}</dt>
            <dd className="font-mono text-[0.8125rem]">
              {isPlaceholder(social.href) ? (
                <Value value={social.href} />
              ) : (
                <Value value={social.handle} href={social.href} external />
              )}
            </dd>
          </div>
        ))}
      </dl>

      <ContactForm />
    </Section>
  );
}

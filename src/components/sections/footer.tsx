import { socialIcons } from "@/components/icons";
import { isPlaceholder, profile, socials } from "@/content";

export function Footer() {
  return (
    <footer className="flex flex-col-reverse items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
      <p className="font-mono text-[0.6875rem] text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}
      </p>

      <ul className="flex items-center gap-1">
        {socials
          .filter((social) => !isPlaceholder(social.href))
          .map((social) => {
            const Icon = socialIcons[social.id];
            return (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            );
          })}
      </ul>
    </footer>
  );
}

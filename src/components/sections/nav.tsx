import { Column } from "@/components/frame";
import { GitHubIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { githubUser, profile } from "@/content";

const monogram = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-background/85 backdrop-blur-md">
      <Column className="border-b-0">
        <div className="flex h-14 items-center justify-between px-5 sm:px-8">
          <a
            href="#main"
            className="grid size-8 place-items-center rounded-md border border-rule font-heading text-xs font-bold tracking-tight transition-colors hover:border-rule-strong"
            aria-label={`${profile.name} — back to top`}
          >
            {monogram}
          </a>

          <div className="flex items-center gap-2">
            <a
              href={`https://github.com/${githubUser}`}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="grid size-8 place-items-center rounded-md border border-rule text-muted-foreground transition-colors hover:border-rule-strong hover:text-foreground"
            >
              <GitHubIcon className="size-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </Column>
    </header>
  );
}

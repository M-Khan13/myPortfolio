import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { CaseStudyBody, CaseStudyNav } from "@/components/case-study";
import {
  Column,
  Divider,
  ProjectLinks,
  Section,
  SectionLabel,
  TechPill,
} from "@/components/frame";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { profile } from "@/content";
import {
  adjacentCaseStudies,
  caseStudyProjects,
  findCaseStudyProject,
  findProject,
} from "@/lib/projects";

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findCaseStudyProject(slug);

  // The redirect/404 branches below never render, so there is nothing to title.
  if (!project) return {};

  const title = `${project.title} — Case study · ${profile.name}`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = findCaseStudyProject(slug);

  if (!project) {
    // A real project that simply hasn't been written up yet sends the reader
    // back to its card; anything else is a genuinely bad URL.
    if (findProject(slug)) redirect("/#projects");
    notFound();
  }

  const { caseStudy } = project;

  return (
    <>
      <Nav />

      <main id="main" className="flex-1">
        <Column>
          {/* No `label` — this section carries its own eyebrow and the <h1>
              below it, so Section's heading would only duplicate them. */}
          <Section>
            <Link
              href="/#projects"
              className="label inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <span aria-hidden="true">←</span> projects
            </Link>

            <div className="mt-10">
              <SectionLabel as="p">Case study</SectionLabel>

              <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                {project.title}
              </h1>

              <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-3">
                <div>
                  <dt className="label">Year</dt>
                  <dd className="mt-1.5 font-mono text-sm">{project.year}</dd>
                </div>
                <div>
                  <dt className="label">Role</dt>
                  <dd className="mt-1.5 font-mono text-sm">{caseStudy.role}</dd>
                </div>
              </dl>

              <ProjectLinks
                links={project.links}
                variant="plain"
                className="mt-7"
              />

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <TechPill label={tech} />
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <CaseStudyBody study={caseStudy} title={project.title} />
          <CaseStudyNav {...adjacentCaseStudies(slug)} />

          <Divider />
          <Footer />
        </Column>
      </main>
    </>
  );
}

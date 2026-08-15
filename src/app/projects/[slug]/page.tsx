import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { CaseStudyBody } from "@/components/case-study";
import {
  Column,
  Divider,
  Pill,
  ProjectLinks,
  Section,
  SectionLabel,
} from "@/components/frame";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import {
  caseStudyProjects,
  findCaseStudyProject,
  findProject,
} from "@/lib/projects";

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
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
          <Section label={`${project.title} — case study`}>
            <Link
              href="/#projects"
              className="label inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <span aria-hidden="true">←</span> projects
            </Link>

            <div className="mt-10">
              <SectionLabel>Case study</SectionLabel>

              <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {project.title}
              </h1>

              <p className="mt-3 text-pretty text-sm text-muted-foreground">
                {project.description}
              </p>

              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                <div>
                  <dt className="label">Year</dt>
                  <dd className="mt-1 font-mono text-sm">{project.year}</dd>
                </div>
                <div>
                  <dt className="label">Role</dt>
                  <dd className="mt-1 font-mono text-sm">{caseStudy.role}</dd>
                </div>
              </dl>

              <ProjectLinks links={project.links} className="mt-6" />

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <Pill>{tech}</Pill>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <CaseStudyBody study={caseStudy} />

          <Divider />
          <Footer />
        </Column>
      </main>
    </>
  );
}

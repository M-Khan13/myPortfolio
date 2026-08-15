import { projects, type CaseStudy, type Project } from "@/content";

/** A project that has a written case study, so `caseStudy` is guaranteed. */
export type CaseStudyProject = Project & { caseStudy: CaseStudy };

export function hasCaseStudy(project: Project): project is CaseStudyProject {
  return project.caseStudy !== undefined;
}

/**
 * The projects with a detail page, in the order they appear on the homepage.
 * Everything that walks case studies — static params, prev/next — derives from
 * this list, so adding a `caseStudy` in content.ts is the only step needed to
 * publish one.
 */
export const caseStudyProjects: CaseStudyProject[] = projects.filter(hasCaseStudy);

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function findCaseStudyProject(slug: string): CaseStudyProject | undefined {
  return caseStudyProjects.find((project) => project.slug === slug);
}

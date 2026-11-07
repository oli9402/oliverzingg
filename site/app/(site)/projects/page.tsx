import type { Metadata } from 'next';
import ProjectGrid from '@/components/ProjectGrid';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Theses, analyses and tools in R and Python: mixed models, machine learning, survey visualisation and more.',
};

export default function ProjectsPage() {
  const projects = getProjects().map(({ slug, title, summary, year, kind, cover }) => ({ slug, title, summary, year, kind, cover }));
  return (
    <>
      <section className="page-band on-blue">
        <div className="wrap">
          <h1 className="h-page">Projects</h1>
          <p className="lede">Two theses graded 6, plus analyses, simulations and tools in R and Python. Each one has the code and the reasoning behind it.</p>
        </div>
      </section>
      <div className="wrap">
        <ProjectGrid projects={projects} />
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import ProjectTable from '@/components/ProjectTable';
import { tableProjects } from '@/lib/table';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Theses, analyses and tools in R and Python: mixed models, machine learning, survey visualisation and more.',
};

export default function ProjectsPage() {
  const projects = tableProjects();
  return (
    <div className="wrap">
      <header className="page-band">
        <p className="call"><b>&gt;</b><code>projects</code><span className="cmt"># {projects.length} rows</span></p>
        <h1 className="h-page">Projects</h1>
        <p className="lede">Two theses graded 6, plus analyses, simulations and tools in R and Python. Open a row for a preview, or the title for the full write-up with code.</p>
      </header>
      <div className="page-body">
        <ProjectTable projects={projects} initialOpen={['simpsons-paradox']} />
      </div>
    </div>
  );
}

export const site = {
  name: 'Oliver Zingg',
  title: 'Oliver Zingg — Psychology, statistics and data science',
  description:
    'Psychologist and data scientist in Zürich. Projects, a public knowledge base on statistics, linear algebra and Python, and my experience.',
  // Set SITE_URL when you know the domain, e.g. SITE_URL=https://oliverzingg.ch npm run build
  url: (process.env.SITE_URL || 'https://oli9402.github.io/oliverzingg').replace(/\/$/, ''),
  email: 'oliver9402@gmail.com',
  location: 'Zürich, Switzerland',
  links: {
    github: 'https://github.com/oli9402',
    linkedin: 'https://www.linkedin.com/in/oliver-zingg-321b0228a/',
  },
  /**
   * Public CV PDF, served from /public. Leave null until you've added a version
   * without private details (address, phone, date of birth, transcripts).
   * Example: '/cv/Oliver-Zingg-CV.pdf'
   */
  cvPdf: null as string | null,
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const withBase = (p: string) => (p.startsWith('/') ? `${basePath}${p}` : p);

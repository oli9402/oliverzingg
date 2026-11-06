// Source of truth: CV-202611.pdf (6 November 2026). Translated to English.

export type Entry = {
  id: string;
  title: string;
  org: string;
  place: string;
  start: string; // YYYY-MM
  end: string | null; // null = ongoing
  endLabel?: string; // e.g. "Dec 2026" for a planned end
  short: string;
  points: string[];
  link?: string; // a project page that shows the work
  yearOnly?: boolean; // CV gives years only; months are placed approximately on the timeline
};

export const work: Entry[] = [
  {
    id: 'zurich',
    title: 'Working student, data science & project management',
    org: 'Zurich Insurance',
    place: 'Zürich',
    start: '2025-11',
    end: null,
    short: 'Power BI dashboards and data landscape for sales steering',
    points: [
      'Support two teams in sales steering: Sales Academy, and Sales Steering & Analytics',
      'Help build a data landscape and Power BI dashboards for data-driven decisions',
      'Run the mailbox for questions about the sales-steering dashboard landscape',
      'Ad-hoc descriptive analyses',
    ],
  },
  {
    id: 'helsana',
    title: 'Working student, insights',
    org: 'Helsana',
    place: 'Zürich',
    start: '2025-01',
    end: '2025-06',
    short: 'Studies for stakeholders, prototype tests, BERTopic',
    points: [
      'Designed, ran and presented studies for different stakeholders on my own',
      'Compared leading Swiss market research institutes, focusing on online panels',
      'Supported projects such as testing prototypes of new UX/UI features',
      'Manually coded customer feedback and compared it with automatic coding using BERTopic',
    ],
  },
  {
    id: 'tx-freelance',
    title: 'Freelancer, on call',
    org: 'TX Group',
    place: 'Zürich',
    start: '2024-05',
    end: '2025-03',
    short: 'Market research projects on demand',
    points: ['Continued market research work on demand after the internship'],
  },
  {
    id: 'tx-intern',
    title: 'Intern, market research',
    org: 'TX Group',
    place: 'Zürich',
    start: '2023-11',
    end: '2024-04',
    short: 'KPIs, questionnaires, interviews, user journeys',
    points: [
      'Supported project leads in delivering client projects',
      'Prepared, analysed and visualised key figures',
      'Built, analysed and presented questionnaires',
      'Documented qualitative interviews and created user journeys',
    ],
  },
  {
    id: 'vebego',
    title: 'Aircraft cabin cleaner (temporary)',
    org: 'Vebego Airport',
    place: 'Zürich Airport',
    start: '2019-07',
    end: '2019-11',
    short: 'Long-haul cabins between landing and boarding',
    points: [
      'Cleaned long-haul aircraft interiors in the short window between landing and boarding',
      'Rotated between aircraft in a small team, covering waste, galley, floors and more',
    ],
  },
];

export const education: Entry[] = [
  {
    id: 'hslu',
    title: 'M.Sc. Applied Information and Data Science',
    org: 'Lucerne University of Applied Sciences (HSLU)',
    place: 'Lucerne',
    start: '2024-09',
    end: null,
    endLabel: 'Dec 2026',
    short: 'Part-time · thesis on double machine learning',
    points: [
      'Part-time programme, graduating December 2026',
      'Thesis: Leveraging double machine learning for robust decision-making (supervisor: Dr. Claude Renaux)',
      'Preliminary study graded 6',
    ],
  },
  {
    id: 'msc-psy',
    title: 'M.Sc. Psychology',
    org: 'University of Zurich (UZH)',
    place: 'Zürich',
    start: '2021-09',
    end: '2024-07',
    yearOnly: true,
    short: 'Average grade 5.6 · thesis graded 6',
    points: ['Average grade 5.6', 'Thesis on the neuronal basis of learning in young people with psychiatric disorders, graded 6'],
    link: '/projects/masters-thesis/',
  },
  {
    id: 'bsc-psy',
    title: 'B.Sc. Psychology',
    org: 'University of Zurich (UZH)',
    place: 'Zürich',
    start: '2018-09',
    end: '2021-08',
    yearOnly: true,
    short: 'Average grade 5.5 · minor in film studies',
    points: ['Average grade 5.5', 'Minor in film studies', "Thesis on machine learning for Alzheimer's classification, graded 6"],
    link: '/projects/bachelors-thesis/',
  },
];

export const theses = [
  {
    level: "Master's thesis, data science (ongoing)",
    title: 'Leveraging double machine learning for robust decision-making',
    supervisor: 'Dr. Claude Renaux',
    grade: 'Due December 2026 · preliminary study graded 6',
  },
  {
    level: "Master's thesis, psychology",
    title:
      'Investigating the neuronal basis of learning processes and memory formation in children and adolescents with various psychiatric disorders',
    supervisor: 'Prof. Dr. Nicolas Langer, M.Sc. Dawid Strzelczyk',
    grade: 'Grade 6',
    link: '/projects/masters-thesis/',
  },
  {
    level: "Bachelor's thesis, psychology",
    title: "Comparison between support vector machine and convolutional neural network for Alzheimer's disease classification",
    supervisor: 'Prof. Dr. Nicolas Langer',
    grade: 'Grade 6',
    link: '/projects/bachelors-thesis/',
  },
];

export const skills = [
  { group: 'Programming', items: ['R (very good)', 'Python (good)', 'Matlab (good)', 'SQL (good basics)'] },
  { group: 'Analytics & BI', items: ['Power BI', 'Tableau', 'SPSS', 'Excel'] },
  { group: 'Writing & publishing', items: ['Quarto', 'RStudio', 'LaTeX', 'Markdown'] },
];

export const languages = [
  { name: 'German', level: 'Bilingual, fluent spoken and written' },
  { name: 'English', level: 'Bilingual, fluent spoken and written' },
  { name: 'French', level: 'Intermediate' },
];

export const certificates = [
  { title: 'Advanced Learning Algorithms', by: 'DeepLearning.AI & Stanford University (Coursera)', date: 'April 2024' },
  {
    title: 'Supervised Machine Learning: Regression and Classification',
    by: 'DeepLearning.AI & Stanford University (Coursera)',
    date: 'January 2024',
  },
];

export const TIMELINE_START = 2018;
export const TIMELINE_END = 2028; // exclusive: axis runs Jan 2018 – Dec 2027 (2027 = next step)
export const TODAY = '2026-11';

export function toYear(ym: string) {
  const [y, m] = ym.split('-').map(Number);
  return y + (m - 1) / 12;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function formatYm(ym: string) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}
export function formatRange(e: Entry) {
  if (e.yearOnly) return `${e.start.slice(0, 4)} – ${e.end ? e.end.slice(0, 4) : 'now'}`;
  return `${formatYm(e.start)} – ${e.end ? formatYm(e.end) : e.endLabel ? `${e.endLabel}` : 'now'}`;
}

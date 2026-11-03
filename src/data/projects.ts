export type ProjectLinkKind = 'github' | 'demo' | 'agent'

export interface Project {
  id: string
  name: string
  stack: string[]
  links: { kind: ProjectLinkKind; href: string }[]
  descriptionKey: string
}

const GITHUB = 'https://github.com/ViniciusRamoss'

export const featuredProject: Project = {
  id: 'sptaxi',
  name: 'sptaxi',
  stack: ['React', 'TypeScript', 'Django REST', 'LLM', 'CI'],
  links: [
    { kind: 'github', href: `${GITHUB}/sptaxi` },
    { kind: 'agent', href: `${GITHUB}/ai-agent-sptaxi` },
  ],
  descriptionKey: 'featured.description',
}

export const projects: Project[] = [
  {
    id: 'taymodas',
    name: 'taymodas',
    stack: ['Django', 'HTMX', 'PostgreSQL'],
    links: [
      { kind: 'demo', href: 'https://taymodas.onrender.com/' },
      { kind: 'github', href: `${GITHUB}/taymodas` },
    ],
    descriptionKey: 'projects.items.taymodas',
  },
  {
    id: 'jobmatch',
    name: 'jobmatch',
    stack: ['Python', 'Typer', 'Pydantic'],
    links: [{ kind: 'github', href: `${GITHUB}/jobmatch` }],
    descriptionKey: 'projects.items.jobmatch',
  },
  {
    id: 'fraud-detection',
    name: 'fraud-detection',
    stack: ['XGBoost', 'SHAP', 'scikit-learn'],
    links: [{ kind: 'github', href: `${GITHUB}/fraud-detection` }],
    descriptionKey: 'projects.items.fraud-detection',
  },
  {
    id: 'sales-data-consolidation',
    name: 'sales-data-consolidation',
    stack: ['Python', 'Pandas', 'Power BI'],
    links: [{ kind: 'github', href: `${GITHUB}/sales-data-consolidation` }],
    descriptionKey: 'projects.items.sales-data-consolidation',
  },
]

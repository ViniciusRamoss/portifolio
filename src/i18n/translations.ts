export type Lang = 'pt' | 'en'

export interface Chip {
  title: string
  subtitle: string
}

export interface Translations {
  meta: { title: string }
  nav: { work: string; about: string; contact: string }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    ctaWork: string
    ctaContact: string
  }
  featured: {
    label: string
    description: string
    github: string
    agentRepo: string
  }
  projects: {
    label: string
    liveDemo: string
    github: string
    items: {
      taymodas: string
      jobmatch: string
      'fraud-detection': string
      'sales-data-consolidation': string
    }
  }
  about: {
    title: string
    photoAlt: string
    intro: string
    experience: string
    focus: string
    chips: [Chip, Chip, Chip, Chip]
  }
  contact: {
    title: string
    email: string
    phone: string
    linkedin: string
    github: string
  }
  footer: { rights: string }
  toggle: { label: string }
}

const en: Translations = {
  meta: { title: 'Vinicius Silva Ramos — Python Developer' },
  nav: { work: 'Work', about: 'About', contact: 'Contact' },
  hero: {
    eyebrow: 'PYTHON DEVELOPER · DJANGO · DATA & ML · AI AGENTS',
    title: 'Python that solves real problems.',
    subtitle:
      'I build web apps with Django, data and ML models, and AI agents — shipped, tested, and deployed.',
    ctaWork: 'See my work',
    ctaContact: 'Get in touch',
  },
  featured: {
    label: 'Featured project',
    description:
      'Executive taxi service in São Paulo: a trilingual site (PT/EN/ES), a Django REST API that stores bookings, and an AI agent that continues the conversation on WhatsApp.',
    github: 'View on GitHub',
    agentRepo: 'AI agent repository',
  },
  projects: {
    label: 'Selected projects',
    liveDemo: 'Live demo',
    github: 'GitHub',
    items: {
      taymodas:
        'Clothing store catalog with stock by size and color and a WhatsApp checkout.',
      jobmatch:
        'Command-line tool that ranks job listings against a résumé.',
      'fraud-detection':
        'Fraud detection on 99.8% imbalanced data, using XGBoost with SHAP explanations.',
      'sales-data-consolidation':
        'Pipeline that merges ERP exports into a single Power BI sales dashboard.',
    },
  },
  about: {
    title: 'About',
    photoAlt: 'Portrait of Vinicius Silva Ramos',
    intro:
      'Information Systems graduate (Anhembi Morumbi, 2024) with a background in process automation, data analysis and information security.',
    experience:
      'At Nissan (Mar 2024 – Jan 2026) I built Power BI dashboards and Power Automate flows, cutting the time of a data-entry process by 25%. At KPMG Brasil (2022 – 2023) I ran security audits and wrote Python and VBA scripts to speed up audit data work. CompTIA Security+ certified, with Azure cloud and security training.',
    focus: 'Today I am focused on Python: Django, data and ML, and AI agents.',
    chips: [
      { title: 'Nissan', subtitle: 'Data & automation' },
      { title: 'KPMG', subtitle: 'Cybersecurity' },
      { title: 'CompTIA', subtitle: 'Security+' },
      { title: 'Azure', subtitle: 'Cloud & security' },
    ],
  },
  contact: {
    title: "Let's talk.",
    email: 'Email',
    phone: 'Phone',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  footer: { rights: '© 2026 Vinicius Silva Ramos' },
  toggle: { label: 'Language' },
}

const pt: Translations = {
  meta: { title: 'Vinicius Silva Ramos — Desenvolvedor Python' },
  nav: { work: 'Projetos', about: 'Sobre', contact: 'Contato' },
  hero: {
    eyebrow: 'DESENVOLVEDOR PYTHON · DJANGO · DADOS & ML · AGENTES DE IA',
    title: 'Python que resolve problemas reais.',
    subtitle:
      'Construo aplicações web com Django, modelos de dados e ML, e agentes de IA — entregues, testados e no ar.',
    ctaWork: 'Ver meus projetos',
    ctaContact: 'Entrar em contato',
  },
  featured: {
    label: 'Projeto em destaque',
    description:
      'Serviço de táxi executivo em São Paulo: um site trilíngue (PT/EN/ES), uma API REST em Django que armazena as reservas e um agente de IA que continua a conversa no WhatsApp.',
    github: 'Ver no GitHub',
    agentRepo: 'Repositório do agente de IA',
  },
  projects: {
    label: 'Projetos selecionados',
    liveDemo: 'Demo ao vivo',
    github: 'GitHub',
    items: {
      taymodas:
        'Catálogo de loja de roupas com estoque por tamanho e cor e checkout pelo WhatsApp.',
      jobmatch:
        'Ferramenta de linha de comando que ranqueia vagas de acordo com um currículo.',
      'fraud-detection':
        'Detecção de fraude em dados com 99,8% de desbalanceamento, usando XGBoost e explicações com SHAP.',
      'sales-data-consolidation':
        'Pipeline que consolida exportações do ERP em um único dashboard de vendas no Power BI.',
    },
  },
  about: {
    title: 'Sobre',
    photoAlt: 'Retrato de Vinicius Silva Ramos',
    intro:
      'Formado em Sistemas de Informação (Anhembi Morumbi, 2024), com experiência em automação de processos, análise de dados e segurança da informação.',
    experience:
      'Na Nissan (mar 2024 – jan 2026) construí dashboards em Power BI e fluxos em Power Automate, reduzindo em 25% o tempo de um processo de lançamento de dados. Na KPMG Brasil (2022 – 2023) conduzi auditorias de segurança e escrevi scripts em Python e VBA para acelerar o trabalho com dados de auditoria. Certificado CompTIA Security+, com formação em nuvem e segurança Azure.',
    focus: 'Hoje meu foco é Python: Django, dados e ML, e agentes de IA.',
    chips: [
      { title: 'Nissan', subtitle: 'Dados e automação' },
      { title: 'KPMG', subtitle: 'Cibersegurança' },
      { title: 'CompTIA', subtitle: 'Security+' },
      { title: 'Azure', subtitle: 'Nuvem e segurança' },
    ],
  },
  contact: {
    title: 'Vamos conversar.',
    email: 'E-mail',
    phone: 'Telefone',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  footer: { rights: '© 2026 Vinicius Silva Ramos' },
  toggle: { label: 'Idioma' },
}

export const translations: Record<Lang, Translations> = { pt, en }

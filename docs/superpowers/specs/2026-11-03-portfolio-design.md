# Portfólio de Vinicius Silva Ramos — Design

Data: 2026-11-03

## Intenção e porquê

Um site de página única para Vinicius Silva Ramos, desenvolvedor Python (Django, dados/ML, agentes de IA). Quem vê: recrutadores, clientes de freela e curiosos. Cada visitante deve conseguir entender em segundos que ele é um dev Python, ver projetos reais e entrar em contato.

## Objetivos

- Posicionar Vinicius como desenvolvedor Python, com Django, dados/ML e agentes de IA juntos.
- Mostrar 6 projetos reais, com um em destaque.
- Contatos sempre à mão: LinkedIn, GitHub, email e telefone.
- Site bilíngue (PT e EN) com botão de troca em estilo liquid glass.

## Não objetivos

- Sem blog, CMS, backend ou formulário de contato com envio.
- Sem páginas separadas por projeto (cada card linka para o GitHub ou demo).
- Sem analytics nem cookies nesta versão.

## Anti-objetivos (seria falha mesmo funcionando)

- Aparência de template genérico.
- Efeito liquid glass que prejudique a leitura ou trave em celular.
- Texto em um idioma só aparecendo quando o outro está selecionado.

## Restrições

- Pasta do projeto: `C:\dev\portifólio`.
- Deploy gratuito e estático (Cloudflare Pages ou GitHub Pages).
- O filtro SVG de refração do liquid glass só funciona em navegadores Chromium. Em Safari e Firefox o botão cai para vidro fosco (`backdrop-filter` com blur), que deve continuar bonito e legível.
- Respeitar `prefers-reduced-motion` e manter contraste acessível.

## Abordagens consideradas

1. HTML, CSS e JS puros. Simples, rápido, sem build. Recomendado por mim.
2. React + Vite + TypeScript. Mesma stack do `sptaxi`, com build e dependências.
3. Astro. Estático e organizado, mas Vinicius não usa nos outros projetos.

**Escolhida pelo Vinicius: 2, React + Vite + TypeScript.** Motivo dele: é a stack que ele já usa e quer mostrar. Troca assumida: um passo de build e dependências para uma página simples.

## Decisões do Vinicius

- Estrutura "B": manchete forte no topo, um projeto grande em destaque, os demais abaixo.
- Contatos: LinkedIn https://www.linkedin.com/in/vinicius-silva-ramos-7a5139164/, GitHub https://github.com/ViniciusRamoss, email viniciussilvaramos1@gmail.com, telefone +55 11 9 6150-7151.
- Foco em Python, cobrindo web, dados/ML e IA.
- Idiomas PT e EN, com botão de troca com efeito liquid glass.

## Conteúdo (proposta minha, a partir do GitHub dele)

- **Manchete:** "Python que resolve problemas reais." Subtítulo: web com Django, dados com ML, agentes de IA.
- **Destaque:** `sptaxi` (site em PT/EN/ES, API Django REST, agente de IA no WhatsApp via `ai-agent-sptaxi`).
- **Demais projetos:** `taymodas` (com demo https://taymodas.onrender.com/), `jobmatch`, `fraud-detection`, `sales-data-consolidation`, `ai-agent-sptaxi`. Cada um com uma frase e as tecnologias, linkando para o repositório.
- **Sobre (aprovado):** baseado no CV `Vinicius_Silva_Ramos_CV.pdf`, com a foto `1739842361941.jpg` à esquerda (moldura 320x400, cantos arredondados). Texto: formado em Sistemas de Informação (Anhembi Morumbi, 2024); Nissan (mar/2024 a jan/2026): dashboards Power BI e fluxos Power Automate, -25% no tempo de um processo de inserção de dados; KPMG Brasil (2022 a 2023): auditorias de segurança e scripts Python/VBA; CompTIA Security+ e formação em Azure. Fecha com foco atual em Python (Django, dados/ML, agentes de IA). Abaixo, quatro cartões: Nissan, KPMG, CompTIA Security+, Azure. Versões PT e EN.
- **Mockup no Figma:** https://www.figma.com/design/tJcrFXo6pzrUt8QSqKDVUE (desktop, EN). A seção About do mockup ainda é a versão antiga; vale o texto acima.
- **Ponto em aberto:** o CV posiciona como Power Platform/dados/segurança e o site como Python. O About faz a ponponte; a manchete pode ser ajustada depois. O CV usa o email vinicius_silva.ramos@hotmail.com, o site usa viniciussilvaramos1@gmail.com.
- **Contato:** os quatro canais, com links `mailto:`, `tel:` e externos.

## Arquitetura (proposta minha)

- Vite + React + TypeScript, página única.
- Textos PT/EN em um objeto tipado; o idioma escolhido vai para `localStorage` e a escolha inicial segue `navigator.language`.
- Componentes: `Header` (com `LangToggle` liquid glass), `Hero`, `FeaturedProject`, `ProjectGrid`, `About`, `Contact`.
- Dados dos projetos em um arquivo à parte, separado dos componentes.
- Liquid glass: componente `LiquidGlass` com `backdrop-filter`, filtro SVG de deslocamento e borda/brilho em CSS, com fallback para blur.

## Deixado para quem for construir

- Paleta, tipografia e identidade visual, seguindo a skill de design do projeto. Precisa fugir de aparência de template.
- Texto final das descrições em PT e EN.
- Testes básicos (troca de idioma, links de contato) e CI.
- Configuração do deploy.

## Chamadas minhas para você conferir

- Manchete e escolha do `sptaxi` como destaque.
- Detecção automática do idioma do navegador.
- Sem analytics, sem formulário.
- Fallback do liquid glass para blur fosco fora do Chromium.

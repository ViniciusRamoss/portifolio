# Portfólio — Vinicius Silva Ramos

Site de página única, bilíngue (PT/EN), com o portfólio de desenvolvimento Python: projeto em destaque, grade de projetos, sobre mim e contato. Feito com Vite, React e TypeScript, testado com Vitest.

O idioma é detectado automaticamente e pode ser trocado pelo botão no cabeçalho.

## Comandos

```bash
npm install       # instala as dependências
npm run dev       # servidor de desenvolvimento
npm test          # testes (Vitest)
npm run lint      # ESLint
npm run build     # checagem de tipos + build de produção em dist/
npm run preview   # serve o build localmente
```

## Como editar o conteúdo

- **Textos (PT e EN):** `src/i18n/translations.ts`. Cada idioma tem o mesmo conjunto de chaves; ao adicionar ou alterar uma chave, atualize os dois.
- **Projetos:** `src/data/projects.ts`. Cada projeto tem `id`, `name`, `stack`, `links` (`github`, `demo` ou `agent`) e `descriptionKey`, que aponta para o texto correspondente em `translations.ts`.
- **Contatos:** `src/data/contacts.ts`.
- **Foto:** `public/photo.jpg`.

## Deploy no Cloudflare Pages

1. Envie o repositório para o GitHub.
2. No painel do Cloudflare, vá em **Workers & Pages > Create > Pages > Connect to Git** e escolha o repositório.
3. Configure o build:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Salve e faça o deploy. Cada push na branch de produção publica uma nova versão.

O arquivo `public/_headers` é copiado para `dist/` e define os cabeçalhos de segurança `X-Content-Type-Options` e `Referrer-Policy`.

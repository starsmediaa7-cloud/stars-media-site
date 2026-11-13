# Stars Media — site oficial e plataforma de atletas

Fase 1 do projeto: identidade visual (Liquid Glass sobre palco escuro) e site institucional, em inglês (padrão), português e espanhol.

## Rodar no computador

Precisa do Node.js 20 ou mais recente.

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Para testar a versão final: `npm run build` e depois `npm start`.

## Colocar no ar (Vercel)

1. Suba esta pasta para um repositório no GitHub.
2. Na Vercel, "Add New → Project" e escolha o repositório. Nenhuma configuração extra é necessária.
3. Em "Environment Variables", preencha o que está em `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` — endereço final do site (ex.: `https://seudominio.com`).
   - `RESEND_API_KEY` — chave da conta em https://resend.com, para o formulário enviar e-mails.
   - `CONTACT_TO_EMAIL` — para onde as mensagens chegam.
   - `CONTACT_FROM_EMAIL` — remetente verificado no Resend.

Sem a chave do Resend, o formulário valida os dados mas avisa o visitante para escrever direto por e-mail ou WhatsApp.

## Onde mexer

| O que | Onde |
|---|---|
| Textos, nos três idiomas | `messages/en.json`, `messages/pt-BR.json`, `messages/es.json` |
| E-mail, WhatsApp, Instagram | `src/config/site.ts` |
| Peças do portfólio | `src/content/portfolio.ts` (imagens em `src/assets/photos/`) |
| Lista de serviços e áreas da plataforma | `src/content/services.ts` |
| Cores, vidro, luz, tipografia | `src/app/globals.css` |
| Logotipo | `public/brand/stars-media-mark.png` (arquivo oficial, só redimensionado) |

A história da agência (About) aparece sozinha quando o campo `about.story` for preenchido nos três arquivos de `messages/`. Enquanto estiver vazio, a seção não é exibida.

No portfólio, todo item com `demo: true` recebe a etiqueta "Demo". Ao trocar por um projeto real e autorizado, mude para `demo: false`.

## Páginas

- `/` Home
- `/about`, `/services` (sem preços), `/portfolio`, `/contact`
- `/athletes` e `/media-center` — apresentação do que abre nas Fases 2 e 3
- `/dashboard` — aviso da área do atleta (Fase 4), fora dos buscadores
- Cada página existe em `/en`, `/pt-br` e `/es`; o endereço sem idioma leva ao idioma do navegador.

## Sistema visual

- **Palco**: preto, com um refletor de estádio vindo do alto à direita (`.beam`).
- **Vidro** (`.glass`, `.glass-deep`, `.plate`): só na navegação, nos controles e em painéis sobre fotografia. O brilho acompanha o cursor.
- **Fotografia** (`<LitPhoto>`): as fotos de estúdio com fundo branco são multiplicadas sobre um gradiente de luz, em preto e branco com tom frio. Com `color`, a cor original volta ao passar o cursor.
- **Campo**: o círculo central aparece como anel metálico no início e como marcação nas chamadas finais; arcos de escanteio no rodapé.
- **Tipografia**: Archivo variável (largura e peso), servida pelo próprio site.
- **Movimento**: uma entrada orquestrada no início, parallax leve nas fotos, tudo desligado para quem pede menos movimento no sistema.

## Tecnologia

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · next-intl · Motion · Server Actions + Resend · zod.

## Próximas fases

2. Athlete Profiles e Discover Athletes (Supabase: banco, login, arquivos)
3. Athlete Portfolio e Media Center
4. Athlete Dashboard
5. Painel administrativo e integrações

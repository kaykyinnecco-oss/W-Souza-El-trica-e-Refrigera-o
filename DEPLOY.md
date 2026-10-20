# Hospedar no Vercel

O projeto está preparado para hospedagem estática. Não exige backend, banco de dados ou variáveis de ambiente. O formulário abre o WhatsApp oficial com a mensagem preenchida.

## Publicação pelo GitHub

1. Acesse [Novo projeto no Vercel](https://vercel.com/new) e entre com sua conta.
2. Importe `kaykyinnecco-oss/W-Souza-El-trica-e-Refrigera-o`. Se necessário, autorize o aplicativo do Vercel a acessar esse repositório.
3. Use a branch `main` e mantenha o diretório raiz como `./`.
4. Confira as configurações abaixo e clique em **Deploy**.

| Configuração | Valor |
| --- | --- |
| Framework Preset | Vite |
| Node.js | 24.x |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment Variables | Nenhuma necessária |

Os comandos e o diretório de saída já estão declarados em `vercel.json`. A versão do Node está em `package.json`. Não envie `node_modules` nem `dist`: o Vercel instala as dependências e gera os arquivos publicados.

Após conectar o GitHub, novos commits em `main` acionam a atualização de produção; outras branches podem gerar prévias conforme as configurações do projeto no Vercel.

## Conferência após publicar

- Abra a URL fornecida pelo Vercel no computador e no celular.
- Confira imagens, fontes, menu, galeria, showcase horizontal e faixa de marcas.
- Teste o formulário e confira o destinatário `(21) 99326-5129` e os dados da mensagem antes de enviar. O site inicia uma solicitação; não confirma agendamento.
- Confira os links do Instagram e do WhatsApp.

O endereço `*.vercel.app` já permite utilizar o site. Quando o domínio definitivo for escolhido, conecte-o em **Settings → Domains** e atualize canonical, `og:url`, URL absoluta de `og:image` em `index.html` e sitemap. A região de atendimento pode ser preenchida em `src/config.ts` quando confirmada. Esses ajustes não bloqueiam a primeira publicação.

## Executar localmente

Com Node.js 24 e npm instalados:

```sh
npm ci
npm test
npm run build
npm run preview
```

Para conferir as interações automatizadas:

```sh
npx playwright install chromium
npm run test:e2e
```

As imagens prontas estão versionadas em `public/assets`; scripts de preparação de imagens não são executados no deploy.

Documentação oficial: [Vite no Vercel](https://vercel.com/docs/frameworks/frontend/vite) e [configuração do projeto](https://vercel.com/docs/project-configuration/vercel-json).

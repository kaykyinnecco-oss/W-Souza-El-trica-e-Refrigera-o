# W Souza — Elétrica e Refrigeração

Site existente refinado em React, TypeScript e Vite. A stack, os dados reais, as imagens de origem e o fluxo de orçamento pelo WhatsApp foram preservados. O redesign adota azul `#020042`, complementar `#2446A6`, azul claro `#DCEBFF`, branco, `#F5F8FF` e texto `#5F6B80`.

## Executar

Node.js 24 com npm:

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Prévia em `http://127.0.0.1:5173/`. O build gera `dist/`, para hospedagem estática.

## Hospedar no Vercel

Importe este repositório pelo painel do Vercel, com preset **Vite**, branch **main** e raiz **./**. A configuração versionada usa `npm ci`, `npm run build`, saída `dist` e Node.js 24. Não são necessárias variáveis de ambiente. Veja o passo a passo em [DEPLOY.md](DEPLOY.md).

## O que foi preservado

- WhatsApp `5521993265129`, Instagram, logo oficial e arquivos originais de imagens.
- Todos os serviços e seus caminhos de orçamento.
- Formulário, campos, máscara brasileira, validação, mensagem codificada e link alternativo de abertura.
- Menu mobile acessível, filtros da galeria, animações discretas, faixa infinita das marcas, botão flutuante e links do Google.
- Configuração Vite, dependências de produção e estrutura de deploy.
- Ausência de depoimentos fictícios, estatísticas inventadas e promessas comerciais.

## Nova composição

Hero com texto e fotografia em áreas distintas; foto emoldurada com canto curvo; CTA claro no fundo navy. Os sete serviços de climatização aparecem em linhas compactas, acompanhados de fotografia de manutenção. Elétrica usa uma superfície clara, fotografia residencial e sete links objetivos. A apresentação institucional foi reduzida a três passos para conversar sobre o serviço. A galeria mantém filtros, prioriza manutenção e elétrica e apresenta legendas fora das imagens.

O formulário mantém o funcionamento original e recebe apenas novo acabamento e texto. No celular, o botão flutuante fica oculto enquanto o formulário está visível, para evitar cobrir campos; os caminhos diretos para WhatsApp e o botão do formulário continuam disponíveis.

## Showcase horizontal

Implementado em `src/components/Systems.tsx`, com dados em `climateSystems` de `src/config.ts`.

Desktop a partir de 1024 px, com altura mínima de 760 px e sem movimento reduzido: GSAP/ScrollTrigger fixa temporariamente a área de apresentação. A distância é `track.scrollWidth - viewport.clientWidth`; o scroll vertical desloca o trilho em X até essa distância. `scrub: 0.6`, sem loop e sem captura da roda do mouse. Ao terminar, a página continua normalmente. O percurso e as medidas são recalculados no resize; o contexto e a fixação são revertidos quando o modo deixa de se aplicar.

Mobile, tablet, telas baixas e movimento reduzido: rolagem horizontal nativa com scroll-snap, sem fixação vertical. Todos os modos oferecem botões anterior/próximo, teclas esquerda/direita, Home e End. O foco em um CTA fora da tela traz seu painel à vista. O contador acompanha a posição real dos painéis.

Há seis sistemas confirmados pelo cliente: Split Hi-Wall, Cassete, Piso-Teto, Multi Split, Inverter e instalação/manutenção. Cada fotografia corresponde ao item; Multi Split e Inverter têm esquemas próprios identificados. Inverter é explicado como tecnologia, não como outro formato de aparelho. Não foi utilizado recorte artificial do ar-condicionado no Hero.

A faixa de marcas é independente: animação CSS contínua com quatro grupos iguais, deslocamento de metade do trilho e pausa em hover/foco. Duplicatas estão ocultas de leitores de tela. Com movimento reduzido, a faixa permite rolagem manual e mostra apenas o grupo original. As marcas da lista foram confirmadas pelo cliente; não se afirma assistência autorizada.

## Editar o conteúdo

`src/config.ts` centraliza nome, WhatsApp, Instagram, região, caminhos de imagens, serviços, sistemas, marcas, galeria e depoimentos. Os serviços e fabricantes foram confirmados na conversa do redesign. A região permanece vazia até informação do cliente.

Imagens ilustrativas não representam trabalhos reais da W Souza. Substitua pelos registros autorizados do cliente quando disponíveis. O componente de depoimentos permanece preparado, sem relatos inventados; a lista vazia exibe um link para as avaliações no Google.

As versões WebP de 768 e 1280 px otimizam a entrega e preservam os arquivos de origem. O Hero tem preload responsivo e prioridade alta. Fontes locais com `font-display: swap`; sem scripts de anúncios, analytics ou backend de formulário.

```sh
node scripts/responsive-assets.mjs
```

O script regenera apenas as variantes de entrega. Depois de alterar a imagem do Hero, revise também o preload em `index.html`.

## Testar as interações

1. Abra a prévia no desktop e navegue até Serviços. Role verticalmente: o trilho deve avançar horizontalmente e liberar a página após o sexto item.
2. Use anterior/próximo, esquerda/direita, Home e End. Navegue com Tab pelos seis CTAs.
3. Em 360, 390 ou 430 px, deslize a faixa com o dedo. O scroll vertical deve continuar livre. Em 768 px, o trilho também é nativo.
4. Ative movimento reduzido no sistema/navegador: nenhuma seção deve ficar presa, e os sistemas continuam acessíveis.
5. Observe a faixa de marcas separadamente; ela pausa ao receber hover ou foco.
6. Filtre a galeria. Preencha o formulário, incluindo acentos, e confira a mensagem aberta no WhatsApp. Isso inicia uma solicitação e não confirma agendamento.

```sh
npm test
npx playwright install chromium
npm run test:e2e
npm run build
npm run preview
node scripts/audit.mjs
node scripts/visual-review.mjs
```

Os testes interceptam a abertura do formulário para verificar a URL sem enviar mensagens reais. Capturas e relatórios ficam em `artifacts/`. A inspeção visual cobre 360, 390, 430, 768, 1024 e 1440 px. Consulte `VERIFICATION.md` para os resultados executados e `REDESIGN.md` para auditoria e decisões.

## Pendências para publicação

Informar região atendida e domínio final. No domínio, configurar canonical, `og:url`, URL absoluta de `og:image` e sitemap. Fotografias de trabalhos reais e depoimentos autorizados podem substituir as demonstrações, quando fornecidos.

Identidade original preservada em `public/assets/logo-original.png`. Fontes e licenças OFL em `public/fonts/`; origens e prompts das imagens em `ASSETS.md`. Backups, ferramentas locais, dependências e relatórios de teste ficam fora do versionamento.

# Redesign W Souza — auditoria e decisões

## Auditoria anterior às alterações

Projeto existente: React 19, TypeScript, Vite, Tailwind, GSAP/ScrollTrigger, Lucide. Estilos/tokens em `src/styles.css`; dados editáveis em `src/config.ts`. Não há backend. O formulário valida no navegador e abre `wa.me` com os dados codificados. Número, Instagram, logo e arquivos de mídia preservados.

Componentes inspecionados: `App`, `Header`, `UI`, `Systems`, `Gallery`, `QuoteForm` e `Testimonials`. Recursos de verificação existentes: Playwright/Chromium, axe, Lighthouse, capturas e build TypeScript/Vite. Prévia existente nas portas 5173 e 4173. Captura anterior: `artifacts/redesign-before-hero.png`.

Semelhanças com a referência: Hero de foto inteira com texto sobre fundo escuro e acentos laranja; títulos e grades de serviços no mesmo ritmo; bloco institucional imagem/texto; galeria de grandes imagens em duas colunas com texto sobreposto; faixa institucional escura antes do formulário. A troca de paleta isolada não resolveria isso.

Animações anteriores: entradas CSS do Hero, GSAP de opacity/translateY ao rolar, transição de conteúdo nas abas de sistemas e marquee CSS dos fabricantes. **Não existia showcase horizontal ligado ao scroll vertical.** A seção Systems era um seletor de abas verticais, sem deslocamento horizontal.

Imagens disponíveis: ambiente com Split, manutenção de Split, serviço elétrico, Cassete, Piso-Teto, ambientes residencial/comercial e logos oficiais. Multi Split já tinha diagrama próprio; Inverter reutilizava a fotografia do Split. O redesign usa um diagrama exclusivo para explicar a tecnologia Inverter, evitando repetir uma fotografia como se fosse outro equipamento. Não existe recorte transparente adequado do aparelho: a entrada do Hero anima a fotografia inteira, preservando a instalação e evitando o recorte anterior.

O cliente confirmou nesta conversa os sistemas e as marcas da lista atual. Nenhum vínculo de assistência autorizada foi inferido. Serviços, formulários e contatos continuam disponíveis; depoimentos fictícios continuam ausentes. Backup do código anterior em `.history/before-redesign.zip`.

## Direção aprovada pelo pedido

Azul `#020042`, complementar `#2446A6`, azul claro `#DCEBFF`, branco, fundo `#F5F8FF` e texto `#5F6B80`. CTAs claros no fundo escuro e CTAs navy no fundo claro. Sem laranja em estilos ou estados de interação. Cores próprias das fotografias e logos oficiais são preservadas.

Hero com áreas distintas para fotografia e texto, serviços compactos, elétrica em superfície clara, apresentação curta do atendimento, galeria com legendas externas e formulário mais simples. Comunicação direta para casas e pequenos comércios.

## Implementação do showcase horizontal

O antigo seletor de abas foi substituído por seis painéis lado a lado. O GSAP/ScrollTrigger existente calcula `scrollWidth - clientWidth`, fixa a área apenas durante essa distância e transforma o trilho em X. O efeito se aplica a desktop >=1024 px com altura >=760 px, sem preferência por movimento reduzido. Telas menores/baixas e movimento reduzido usam rolagem horizontal nativa com scroll-snap.

Botões, setas, Home/End e foco nos links mantêm todos os painéis alcançáveis. O painel ativo é o mais próximo do centro da área visível. Contador e progresso acompanham o deslocamento real. O modo pin é revertido no resize e na mudança de preferência. O scroll vertical não recebe interceptadores de wheel/touch.

A faixa das marcas permanece um marquee CSS independente. Seu loop foi verificado antes/depois da duração do ciclo, comparando posições de logos iguais; também foram testadas pausa e preferência por movimento reduzido.

Referências técnicas consultadas: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [matchMedia e cleanup](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()>).

## Componentes e arquivos modificados

- `App.tsx`: Hero, agrupamento dos serviços, elétrica clara, atendimento curto, marcas, conversão, contato e acabamento do rodapé. Observador de visibilidade evita que o WhatsApp flutuante cubra o formulário no celular.
- `Systems.tsx`: showcase horizontal, controles, scroll nativo, diagramas, contador, progresso e adaptação a movimento reduzido.
- `Gallery.tsx`: prioridade para manutenção/elétrica, nova composição e legendas externas, mantendo filtros e links.
- `QuoteForm.tsx`: somente apresentação e textos; campos, validação e redirecionamento preservados.
- `Header.tsx`: variante responsiva da logo, preservando menu e navegação.
- `UI.tsx`: entrega responsiva das imagens, mantendo skeleton e tratamento de erro.
- `config.ts`: sistemas centralizados e confirmados, fabricantes confirmados, textos mais diretos e variantes de imagens.
- `styles.css`: sistema visual azul/branco e novas composições; estilos antigos com laranja removidos, inclusive foco, hover, estados de formulário e avaliações.
- `index.html`: preload responsivo do Hero; metadados preservados.
- Scripts de variantes/revisão visual e testes de regressão adicionados/atualizados. Nenhuma nova dependência de produção ou mudança de deploy.

## Conferência de identidade própria

Comparação final com a referência inicial e captura anterior: Hero sem fotografia em tela inteira, sete serviços em lista em vez de grade, elétrica clara em vez do painel navy, apresentação em três passos em vez de imagem/texto institucional, sistemas em trilho horizontal em vez de abas e galeria com legendas externas. A cor principal permanece a identidade real `#020042`; não há elementos laranja na interface. Fotografias e logos mantêm suas cores próprias.

As fotografias originais não foram substituídas ou redesenhadas. Foram criadas apenas variantes WebP menores para entrega responsiva. O Hero usa a fotografia inteira em uma moldura, com entrada suave de opacity/translate/scale, sem recorte artificial do equipamento. Todos os serviços anteriores mantêm caminho de orçamento.

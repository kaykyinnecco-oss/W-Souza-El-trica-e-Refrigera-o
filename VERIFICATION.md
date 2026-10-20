# Verificação do redesign — 20/10/2026

Fluxo verificado: o visitante consulta climatização ou elétrica, percorre o showcase, encontra o serviço e inicia uma solicitação no WhatsApp oficial informado. O formulário continua validando no cliente e abre uma URL codificada; nenhuma mensagem real foi enviada nos testes.

| Verificação executada                                                          | Resultado                                                                               |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| TypeScript e build de produção                                                 | Aprovados                                                                               |
| Testes unitários                                                               | 4 aprovados                                                                             |
| Testes Playwright/Chromium                                                     | 11 aprovados                                                                            |
| Regressão final do formulário mobile/skeleton após o ajuste do botão flutuante | 2 testes pertinentes aprovados                                                          |
| CTAs WhatsApp                                                                  | Todos os destinos em `5521993265129`, com mensagem contextual                           |
| Formulário vazio, telefone inválido e preenchimento válido                     | Aprovados, com abertura externa interceptada                                            |
| Acentos e caracteres especiais                                                 | Preservados na mensagem                                                                 |
| Showcase desktop                                                               | Movimento X medido após wheel vertical, área fixada durante o percurso                  |
| Todos os seis painéis                                                          | Alcançáveis por botões, teclado e foco nos CTAs                                         |
| Final do showcase                                                              | Página liberada, contato alcançado normalmente                                          |
| Resize desktop para mobile                                                     | Fixação e spacer removidos; trilho volta ao modo nativo                                 |
| Mobile touch                                                                   | Swipe real via eventos touch do Chromium deslocou o trilho                              |
| Movimento reduzido                                                             | Sem pin; Home/End e rolagem nativa mantêm todos os painéis disponíveis                  |
| Marquee das marcas                                                             | Movimento real, pausa e continuidade verificada antes/depois do reinício                |
| Menu mobile e Escape                                                           | Aprovados, com retorno de foco                                                          |
| Filtros da galeria                                                             | Aprovados                                                                               |
| Larguras 360, 390, 430, 768, 1024 e 1440 px                                    | Sem overflow horizontal; 24 capturas de Hero, elétrica, sistemas e contato              |
| Logo, contato e imagens originais                                              | Preservados; variantes WebP usadas na entrega                                           |
| Skeleton                                                                       | Espera de rede simulada sobre todas as variantes da imagem, sem alteração das dimensões |
| Interface azul/branca                                                          | Varredura dos estilos computados sem tons laranja, incluindo hover/foco exercitados     |
| Contraste e acessibilidade automatizada                                        | Sem violações detectadas nos critérios axe WCAG A/AA executados                         |
| Console e recursos                                                             | Sem erros nos testes e na inspeção de produção                                          |
| Formulário mobile                                                              | Botão flutuante oculto enquanto o formulário está visível, sem cobrir campos            |

## Build de produção — medição final Lighthouse mobile

| Categoria/métrica        | Resultado |
| ------------------------ | --------- |
| Desempenho               | 97/100    |
| Acessibilidade           | 100/100   |
| Boas práticas            | 100/100   |
| SEO                      | 100/100   |
| First Contentful Paint   | 1,5 s     |
| Largest Contentful Paint | 2,5 s     |
| Cumulative Layout Shift  | 0         |
| Total Blocking Time      | 0 ms      |

Relatório completo em `artifacts/lighthouse-mobile.html` e JSON no mesmo diretório. Trata-se de medição local de laboratório com emulação mobile; resultados variam por máquina, rede e hospedagem e não substituem métricas de campo ou revisão manual completa de acessibilidade.

O build final também foi aberto em `http://127.0.0.1:4173`, com navegação Serviços → próximo sistema → Contato. Deslocamento horizontal confirmado, contato visível, nenhum erro de console/recurso e nenhum overflow. Evidência em `artifacts/production-smoke.json`.

## Evidências visuais

- `artifacts/redesign-before-hero.png`: versão anterior.
- `artifacts/redesign-hero-final.png`: Hero final, no build de produção.
- `artifacts/redesign-showcase-final.png`: showcase final.
- `artifacts/redesign-horizontal-middle.png`: deslocamento intermediário.
- `artifacts/redesign-horizontal-last.png`: último painel.
- `artifacts/redesign-mobile-showcase.png`: último painel no mobile.
- `artifacts/desktop-full.png` e `artifacts/mobile-full.png`: página inteira, com movimento reduzido para revisão estável.
- `artifacts/responsive/`: capturas nas seis larguras solicitadas e resultados em JSON.
- `artifacts/redesign-responsive-*.png`: folhas de comparação visual por seção.

## Pendências editoriais

Região de atendimento e domínio final ainda não foram informados. As marcas e os sistemas foram confirmados pelo cliente nesta conversa. Fotografias ilustrativas continuam identificadas; registros reais autorizados podem substituí-las. Não há depoimentos fictícios, certificações, equipe, frota, sede ou estatísticas inventadas. Não houve publicação externa.

# Origem dos recursos visuais

## Identidade W Souza

Arte fornecida pelo cliente: `Logotipo W Souza Elétrica e Refrigeração.png`.

- `public/assets/logo-original.png`: cópia integral.
- `public/assets/logo.png`: somente corte de margem transparente e redimensionamento proporcional.
- `public/assets/logo.webp`: aplicação otimizada da mesma arte, usada no site.
- `public/assets/favicon.png`: recorte do símbolo existente, sem redesenho.

## Fotografias ilustrativas geradas

Ferramenta: geração de imagens integrada (`image_gen`, modo nativo, sem CLI/API). Nenhuma fotografia gerada representa uma obra, um funcionário real ou um equipamento comercial específico da W Souza.

Arquivos finais no workspace:

| Arquivo                          | Uso                                                |
| -------------------------------- | -------------------------------------------------- |
| `public/assets/hero.webp`        | Hero, exemplo Split Hi-Wall e ambiente residencial |
| `public/assets/electrical.webp`  | Elétrica e exemplo de execução                     |
| `public/assets/maintenance.webp` | Manutenção de ar-condicionado                      |
| `public/assets/cassette.webp`    | Representação de Cassete de quatro vias            |
| `public/assets/floor.webp`       | Representação de equipamento Piso-Teto             |

Os prompts utilizados, em inglês, seguem abaixo. Todos pedem ausência de texto, logos e marcas inventadas.

### Hero

Use case: photorealistic-natural. Create a premium architectural photograph for the hero of a Brazilian air conditioning and electrical company website. Wide landscape 1536x1024 or wider. Beautiful contemporary Brazilian living room, warm oak slatted feature wall on the right upper half, a correctly proportioned unbranded matte white wall-mounted split air conditioner mounted high on that wall, white linen sofa lower right, low travertine coffee table, natural large window on far right with lush green garden, afternoon sunlight, warm neutral stone and wood. Dark navy blue wall on left side with unobtrusive low-light negative space for white web headline to be overlaid by code. Architectural magazine realism, refined lived-in details, physically plausible AC and vent. Entire air conditioner visible with wall contact, not floating. No words, no logos, no watermarks, no UI. Avoid artificial gradients, surreal architecture, distorted furniture. This is an illustrative environment and not a customer project.

### Elétrica

Use case photorealistic-natural. Premium editorial documentary photograph for an electrical contractor website, landscape 1536x1024. Brazilian electrician seen from the back and side at waist height inspecting a clean residential electrical distribution board recessed into a pale warm wall, rows of modern DIN breakers neatly organized, breakers in OFF position, no exposed energized conductors. Adult technician wears navy work uniform and transparent safety glasses, holding an insulated screwdriver near the closed protective breaker cover without touching bare wires, correct hands and realistic anatomy, no text or logo on clothing or equipment. Soft natural side light, thoughtful precise work, believable tools, dark navy and warm neutral palette, architectural photography quality, crisp detailed natural textures, understated professional composition. Not cinematic effects, not sparks, not dangerous live work, not sci-fi. Room for cropping as a portrait at right side of webpage.

### Cassete

Use case product-mockup. A photorealistic studio product photograph of one unbranded white four-way ceiling cassette air conditioner indoor panel. Correct square 600mm cassette design, central rectangular intake grille, four perimeter directional outlet vents, subtle rounded edges, viewed from below at a gentle three-quarter angle so the entire square face and slim panel thickness are visible. Isolated on a very light neutral gray studio background, soft contactless studio shadow, white premium plastic, technically coherent commercial HVAC product. No wall-mounted split AC, no wall, no outdoor condenser, no words, no logos, no watermark. Landscape 1536x1024, centered object with generous empty margins for web product display.

### Piso-Teto

Use case product-mockup. Photorealistic studio product photograph of a single unbranded floor-ceiling commercial indoor air conditioner, Brazilian piso-teto type. Long horizontal rectangular white cabinet with deep rectangular body approximately 150cm wide 60cm deep and 25cm tall, broad front directional air discharge outlet across full width with horizontal dark gray louvers and large intake grille on underside. Three-quarter frontal angle showing front outlet and underside, plausible suspended ceiling indoor unit product design. Isolated on very light neutral gray studio background, realistic white plastic, subtle studio shadow, premium clean catalog lighting. Must look like a floor ceiling HVAC unit, distinctly deep and boxy not a slim residential hi-wall split. No text, no logo, no watermarks. Landscape 1536x1024 composition with generous empty margins.

### Manutenção

Use case photorealistic-natural. Premium realistic editorial photograph of a Brazilian air-conditioning technician performing routine cleaning of an unbranded white split hi-wall indoor air conditioner mounted high on a pale wall in a contemporary apartment. Technician seen from side, navy work shirt, clear safety glasses, standing on a stable short professional platform with both feet, AC safely de-energized, front cover open exposing realistic mesh filters, technician with correct natural hands carefully removes one intact gray mesh filter with both hands. Clean organized tools and protective cloth below, believable anatomy and equipment, no live wiring, no sparks, no text, no logos, no watermark. Natural soft window daylight, warm neutral and navy palette, architectural service photography, landscape 1536x1024, full equipment and hands clearly visible.

## Fotografias de ambientes

Imagens ilustrativas locais, obtidas do Unsplash. Não representam projetos executados pela W Souza.

- `architecture.webp`: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0
- `office.webp`: https://images.unsplash.com/photo-1497366754035-f200968a6e72

## Logos dos fabricantes

Arquivos obtidos nos sites oficiais, preservando suas proporções e cores. A presença no site não afirma parceria, autorização ou atendimento confirmado.

- Daikin: https://www.daikin.com/-/media/Project/Daikin/daikin_com/dg_common/images/logo_daikin-png.png
- LG: https://www.lg.com/content/dam/lge/common/logo/logo-lg-100-44.svg
- Samsung: https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/logo-square-letter.png
- Gree: https://gree.com.br/wp-content/uploads/2025/01/logo-1.png
- Midea: https://web-res.midea.com/content/dam/brandbook/midea/general/midea-logo.webp

Diretrizes Midea: https://brandbook.midea.com/guidelines/visual-identity/brand-elements/logo

Ícones de interface: Lucide. Multi Split: diagrama SVG ilustrativo criado para mostrar a relação entre unidades internas e externa.

## Atualização do redesign

As marcas e os sistemas da lista foram confirmados pelo cliente na conversa de redesign. Não se afirma vínculo de assistência autorizada. Os arquivos originais e a logo oficial permanecem preservados.

Foram adicionadas variantes WebP `hero-768`, `hero-1280`, `maintenance-768`, `maintenance-1280`, `electrical-768`, `electrical-1280`, `architecture-768`, `architecture-1280`, `office-768`, `office-1280` e `logo-180`, em `public/assets/`. São derivados de entrega responsiva, sem geração de novas cenas ou alteração da identidade. O script `scripts/responsive-assets.mjs` regenera essas versões.

No showcase, Multi Split utiliza o diagrama próprio de conexão entre unidades; Inverter recebe um diagrama exclusivo de controle variável do compressor. Não são fotografias nem representam um modelo comercial específico. Todas as representações estão identificadas como ilustrativas.

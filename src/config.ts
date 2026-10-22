export const company = {
  name: "W Souza Elétrica e Refrigeração",
  whatsapp: "5522998317590",
  phoneDisplay: "(22) 99831-7590",
  address: "R. Mal. Deodoro - Centro, Macaé - RJ, 27910-310",
  instagram: "https://www.instagram.com/wsouzaeletrica/",
  region: "Macaé e região",
  googleReviews:
    "https://www.google.com/search?q=W+Souza+el%C3%A9trica+e+refrigera%C3%A7%C3%A3o",
  logo: "/assets/logo.webp",
  images: {
    hero: "/assets/hero.webp",
    electrical: "/assets/electrical.webp",
    architecture: "/assets/architecture.webp",
    office: "/assets/office.webp",
    maintenance: "/assets/maintenance.webp",
    owner: "/assets/proprietario.webp",
  },
  // Marcas atendidas confirmadas pelo cliente. Não implica assistência autorizada.
  brands: [
    {
      name: "Daikin",
      logo: "/assets/daikin.webp",
      source: "https://www.daikin.com/",
    },
    { name: "LG", logo: "/assets/lg.svg", source: "https://www.lg.com/" },
    {
      name: "Samsung",
      logo: "/assets/samsung.png",
      source: "https://www.samsung.com/",
    },
    { name: "Gree", logo: "/assets/gree.webp", source: "https://gree.com.br/" },
    {
      name: "Midea",
      logo: "/assets/midea.webp",
      source:
        "https://brandbook.midea.com/guidelines/visual-identity/brand-elements/logo",
    },
  ],
  testimonials: [] as {
    name: string;
    text: string;
    service: string;
    rating?: number;
  }[],
};

export type ClimateSystem = {
  name: string;
  tag: string;
  text: string;
  image?: string;
  alt: string;
  diagram?: "multi" | "inverter";
  product?: boolean;
};

// Smaller delivery sizes; original files and editable image paths remain unchanged.
export const responsiveImages: Record<string, string> = Object.fromEntries(
  ["hero", "maintenance", "electrical", "architecture", "office"].map(
    (name) => [
      `/assets/${name}.webp`,
      `/assets/${name}-768.webp 768w, /assets/${name}-1280.webp 1280w, /assets/${name}.webp ${name === "architecture" || name === "office" ? 1400 : 1536}w`,
    ],
  ),
);
// Sistemas confirmados pelo cliente no pedido de redesign.
export const climateSystems: ClimateSystem[] = [
  {
    name: "Split Hi-Wall",
    tag: "CONFORTO NA PAREDE",
    text: "Para quartos, salas e pequenos comércios. O cuidado começa na escolha do local e na instalação.",
    image: company.images.hero,
    alt: "Split Hi-Wall branco instalado na parede de uma sala residencial",
  },
  {
    name: "Cassete",
    tag: "INTEGRADO AO FORRO",
    text: "Distribuição de ar em diferentes direções. Uma opção para ambientes com estrutura e forro adequados.",
    image: "/assets/cassette.webp",
    product: true,
    alt: "Ar-condicionado Cassete de quatro vias, em imagem ilustrativa de produto",
  },
  {
    name: "Piso-Teto",
    tag: "PARA OUTROS FORMATOS DE ESPAÇO",
    text: "Instalado junto ao piso ou sob o teto, conforme o modelo e as condições do ambiente.",
    image: "/assets/floor.webp",
    product: true,
    alt: "Unidade de ar-condicionado Piso-Teto, com gabinete profundo e saída frontal",
  },
  {
    name: "Multi Split",
    tag: "MAIS DE UM AMBIENTE",
    text: "Unidades internas conectadas a uma unidade externa compatível. Converse sobre a aplicação no seu espaço.",
    diagram: "multi",
    alt: "Diagrama de três unidades internas conectadas a uma unidade externa",
  },
  {
    name: "Sistemas Inverter",
    tag: "TECNOLOGIA QUE AJUSTA A OPERAÇÃO",
    text: "O controle do compressor se adapta à necessidade do ambiente. É uma tecnologia presente em diferentes equipamentos.",
    diagram: "inverter",
    alt: "Esquema ilustrativo do controle variável de operação de um compressor Inverter",
  },
  {
    name: "Instalação e manutenção",
    tag: "CUIDADO DO COMEÇO À ROTINA",
    text: "Instalação, limpeza e diagnóstico. Conte o que está acontecendo com seu aparelho para orientar o atendimento.",
    image: company.images.maintenance,
    alt: "Técnico removendo filtro de ar-condicionado Split para manutenção",
  },
];

export const coolingServices = [
  {
    icon: "air",
    title: "Instalação de ar-condicionado",
    description:
      "Do posicionamento às conexões, cuidado em cada etapa da instalação.",
  },
  {
    icon: "shield",
    title: "Manutenção preventiva",
    description:
      "Cuidado periódico para preservar o desempenho do seu equipamento.",
  },
  {
    icon: "wrench",
    title: "Manutenção corretiva",
    description: "Diagnóstico do problema e orientação clara sobre o reparo.",
  },
  {
    icon: "sparkles",
    title: "Higienização e limpeza",
    description: "Limpeza dos componentes para um ambiente mais agradável.",
  },
  {
    icon: "ruler",
    title: "Infraestrutura para climatização",
    description:
      "Preparação organizada para receber o sistema do seu ambiente.",
  },
  {
    icon: "wind",
    title: "Sistemas Split e Inverter",
    description:
      "Instalação e cuidado de equipamentos para diferentes necessidades.",
  },
  {
    icon: "building",
    title: "Climatização comercial",
    description:
      "Conforto para quem trabalha, recebe e faz o negócio acontecer.",
  },
];
export const electricalServices = [
  {
    icon: "zap",
    title: "Instalações elétricas",
    description: "Pontos e circuitos adequados à necessidade do ambiente.",
  },
  {
    icon: "wrench",
    title: "Manutenção elétrica",
    description: "Verificação e correção de falhas com atenção aos detalhes.",
  },
  {
    icon: "panel",
    title: "Quadros de distribuição",
    description: "Organização e adequação dos circuitos elétricos.",
  },
  {
    icon: "plug",
    title: "Tomadas e interruptores",
    description: "Instalação e substituição para a rotina funcionar melhor.",
  },
  {
    icon: "bulb",
    title: "Iluminação e ventiladores",
    description: "Luminárias e ventiladores de teto bem instalados.",
  },
  {
    icon: "shield",
    title: "Adequações elétricas",
    description: "Melhorias planejadas a partir de uma avaliação do local.",
  },
  {
    icon: "circuit",
    title: "Elétrica para climatização",
    description: "Infraestrutura elétrica compatível com o equipamento.",
  },
];
export const formServices = [
  "Instalação de ar-condicionado",
  "Manutenção de ar-condicionado",
  "Higienização",
  "Serviço elétrico",
  "Instalação elétrica",
  "Outro serviço",
];
export const projects = [
  {
    title: "Split Samsung instalado e em funcionamento.",
    category: "Ambiente interno",
    image: "/assets/instalacao-01.webp",
    alt: "Ar-condicionado Split Samsung instalado pela W Souza",
  },
  {
    title: "Unidade externa com acabamento cuidadoso.",
    category: "Unidade externa",
    image: "/assets/instalacao-02.webp",
    alt: "Unidade externa Midea instalada pela W Souza",
  },
  {
    title: "Condensadora Samsung instalada com suporte.",
    category: "Unidade externa",
    image: "/assets/instalacao-03.webp",
    alt: "Condensadora Samsung instalada em suporte pela W Souza",
  },
  {
    title: "Climatização integrada ao ambiente.",
    category: "Ambiente interno",
    image: "/assets/instalacao-04.webp",
    alt: "Ar-condicionado Split instalado em quarto pela W Souza",
  },
  {
    title: "Instalação residencial de Split Midea.",
    category: "Ambiente interno",
    image: "/assets/instalacao-05.webp",
    alt: "Ar-condicionado Split Midea instalado pela W Souza",
  },
  {
    title: "Unidade externa Midea com tubulação protegida.",
    category: "Unidade externa",
    image: "/assets/instalacao-06.webp",
    alt: "Unidade externa Midea com tubulação protegida instalada pela W Souza",
  },
];

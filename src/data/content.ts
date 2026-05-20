import type {
  Differentiator,
  MethodStep,
  NavLink,
  Objection,
  ServiceCard,
  Stat,
} from "@/types/content";

// TODO: troque pelo WhatsApp real da Platinuss Design.
export const WHATSAPP_URL =
  "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20um%20site%20profissional%20que%20venda%20pra%20minha%20empresa.";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Clientes", href: "#logos" },
  { label: "Orçamento", href: "#form" },
  { label: "Contato", href: "#footer" },
];

export const LOGOS: string[] = [
  "vida.svg",
  "ilza.svg",
  "san.svg",
  "clinica.svg",
  "3-vectorized.svg",
  "3.svg",
  "Group 1000001113.svg",
  "jbs.svg",
  "Group 1000001128.webp",
  "Mask group.webp",
  "Group 1000001129.webp",
  "Group 1000001130.webp",
  "ALC.svg",
  "beegames.svg",
  "bew.svg",
  "blox.svg",
  "bonapp.svg",
  "brasil.svg",
  "clip.svg",
  "dou.svg",
  "focus.svg",
  "GOMD.svg",
  "grow.svg",
  "influ.svg",
  "jexs.svg",
  "maximeta.svg",
  "milano.svg",
  "oq.svg",
  "resaltar.svg",
  "seilf.svg",
  "slove.svg",
  "thar.svg",
  "veex.svg",
  "zou.svg",
].map((f) => `/pages/home/logos/${f}`);

export const STATS: Stat[] = [
  { value: "+150", label: "Sites no ar" },
  { value: "200", label: "Projetos entregues" },
  { value: "3x", label: "mais conversão" },
  { value: "+90%", label: "no topo do Google" },
  { value: "98%", label: "clientes satisfeitos" },
];

export const SERVICES: ServiceCard[] = [
  {
    code: "PLT 0.1",
    title: "Sites & Landing Pages de Alta Conversão",
    description:
      "Pra empresas que precisam de uma presença profissional e querem transformar visitante em cliente. Sites rápidos, modernos e construídos do zero pra vender por você 24 horas por dia.",
    video: "/pages/home/video/Timelineredred.mp4",
  },
  {
    code: "PLT 0.2",
    title: "Lojas Virtuais & Sistemas Sob Medida",
    description:
      "Pra quem quer vender online de verdade. E-commerce e sistemas personalizados, integrados à sua operação e prontos pra escalar o seu faturamento sem limite de template.",
    video: "/pages/home/video/Timelinered.mp4",
  },
];

export const METHOD_STEPS: MethodStep[] = [
  {
    number: "1",
    title: "Briefing",
    heading: "1. Briefing",
    description:
      "Antes de desenhar qualquer tela, entendemos seu negócio, seu público e seu objetivo. Saímos sabendo exatamente o que vai gerar venda pra você.",
    image: "/pages/home/metodologia/diagnostico.webp",
  },
  {
    number: "2",
    title: "Design",
    heading: "2. Design",
    description:
      "Criamos um visual profissional e único, alinhado à sua marca. Cada detalhe pensado pra passar autoridade e transformar visitante em cliente.",
    image: "/pages/home/metodologia/priorizacao.webp",
  },
  {
    number: "3",
    title: "Desenvolvimento",
    heading: "3. Desenvolvimento",
    description:
      "Transformamos o design em um site rápido, responsivo e otimizado pro Google. Tecnologia de verdade, sem template genérico travando o seu negócio.",
    image: "/pages/home/metodologia/construcao.webp",
  },
  {
    number: "4",
    title: "Entrega",
    heading: "4. Entrega & Otimização",
    description:
      "Colocamos seu site no ar e acompanhamos os resultados, ajustando o que for preciso pra ele vender cada vez mais, mês após mês.",
    image: "/pages/home/metodologia/medicao.webp",
  },
];

export const OBJECTIONS: Objection[] = [
  {
    index: "Objeção 1",
    quote: "“Meu negócio já funciona no Instagram, não preciso de site.”",
    answer:
      "Funciona até a conta cair, ser hackeada ou o alcance despencar do nada. Rede social é alugada, site é seu. Quem depende só do Instagram entrega o futuro do negócio na mão de um algoritmo que muda as regras quando quiser.",
  },
  {
    index: "Objeção 2",
    quote: "“Site é caro e não traz retorno.”",
    answer:
      "Caro é perder cliente todo dia pra quem aparece no Google enquanto você não aparece. Um site profissional se paga em vendas: trabalha 24h, passa autoridade e transforma quem te procura em cliente pagante.",
  },
  {
    index: "Objeção 3",
    quote: "“Não tenho tempo pra cuidar de um site.”",
    answer:
      "Por isso a Platinuss cuida de tudo: design, textos, otimização e publicação. Você foca no seu negócio e recebe o site pronto pra vender. Sem dor de cabeça, sem termo técnico, sem complicação.",
  },
];

export const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: "/pages/home/diferenciais/search.svg",
    title: "Design focado em vendas",
    description:
      "Na Platinuss, cada site é pensado estrategicamente pra transformar visitante em cliente não só pra ser bonito.",
  },
  {
    icon: "/pages/home/diferenciais/atom.svg",
    title: "Presença no\nGoogle",
    description:
      "Sites otimizados pra SEO, pra você ser encontrado exatamente por quem já está procurando o que você vende.",
  },
  {
    icon: "/pages/home/diferenciais/hard-hat.svg",
    title: "Tecnologia de verdade",
    description:
      "Nada de template genérico. Sites rápidos, seguros e construídos sob medida pro seu negócio crescer sem travas.",
  },
  {
    icon: "/pages/home/diferenciais/chart-bars.svg",
    title: "Entrega rápida e sem enrolação",
    description:
      "Seu site no ar em poucas semanas, com acompanhamento transparente em cada etapa do projeto.",
  },
  {
    icon: "/pages/home/diferenciais/settings.svg",
    title: "Suporte contínuo",
    description:
      "A Platinuss cuida do seu site depois da entrega e garante que ele continue rápido, atualizado e vendendo todo dia.",
  },
];

import type { SiteSettings, PageData, ServiceItem, FaqItem } from '../types';

export const defaultSettings: SiteSettings = {
  site_name: 'Pressurize Prime — Aquecedores e Pressurizadores',
  logo_url: '/logo.jpeg',
  logo_vertical_url: '/logo-vertical.png',
  primary_color: '#004b93',
  secondary_color: '#cfa349',
  whatsapp_number: '(11) 99390-2319',
  whatsapp_raw: '5511993902319',
  phone_number: '(11) 99390-2319',
  phone_raw: '5511993902319',
  business_hours: 'Segunda a sexta, das 8h às 19h (Conserto e instalação em até 24h)',
  address_coverage: [
    'Brooklin',
    'Vila Olímpia',
    'Vila Clementino',
    'Chácara Santo Antônio',
    'Morumbi',
    'Alphaville',
    'Barueri',
    'Santana de Parnaíba',
    'Grande São Paulo'
  ]
};

export const defaultServices: ServiceItem[] = [
  {
    id: 'pressurizador',
    slug: 'pressurizador',
    title: 'Pressurizador de Água',
    short_description: 'Chuveiro fraco, pressurizador que liga e desliga sozinho ou barulho na casa de máquinas. Resolvemos a pressão da sua casa.',
    icon_name: 'Gauge',
    image_url: '/images/pressurizador.jpg',
    order: 1,
    is_active: true,
    features: ['Mais de 10 anos de experiência', 'Conserto e instalação em até 24h', 'Até 10x sem juros no cartão', 'Garantia de 3 meses em peças']
  },
  {
    id: 'aquecedor-a-gas',
    slug: 'aquecedor-a-gas',
    title: 'Aquecedor a Gás',
    short_description: 'Aquecedor que não acende, desliga no meio do banho ou esquenta pouco. Conserto, manutenção e instalação conforme as normas NBR.',
    icon_name: 'Flame',
    image_url: '/images/aquecedor-a-gas.jpg',
    order: 2,
    is_active: true,
    features: ['Gás Natural (GN) e GLP', 'Técnicos especializados', 'Atendimento com segurança máxima', 'Garantia comprovada']
  },
  {
    id: 'aquecedor-solar',
    slug: 'aquecedor-solar',
    title: 'Aquecedor Solar e Boiler',
    short_description: 'Água morna mesmo com sol, boiler vazando ou placas sem manutenção. Devolvemos a economia que você pagou para ter.',
    icon_name: 'Sun',
    image_url: '/images/aquecedor-solar.jpg',
    order: 3,
    is_active: true,
    features: ['Recuperamos antes de trocar', 'Sistema completo: placa, boiler e apoio', 'Limpeza e troca de ânodo', 'Economia na conta de luz']
  },
  {
    id: 'aquecedor-eletrico',
    slug: 'aquecedor-eletrico',
    title: 'Aquecedor Elétrico e Boiler',
    short_description: 'Boiler que não esquenta, disjuntor desarmando ou resistência queimada. Diagnóstico e troca no mesmo atendimento.',
    icon_name: 'Zap',
    image_url: '/images/aquecedor-eletrico.jpg',
    order: 4,
    is_active: true,
    features: ['Hidráulica e elétrica no mesmo técnico', 'Troca de resistência e termostato', 'Instalação sem gambiarras', 'Até 10x sem juros']
  }
];

export const defaultPages: Record<string, PageData> = {
  home: {
    id: 'home',
    slug: 'home',
    title: 'Página Inicial',
    hero_title: 'Banho forte e água quente, sem esperar dias por um técnico.',
    hero_subtitle: 'Venda, instalação e manutenção de pressurizadores e aquecedores a gás, solar e elétricos em São Paulo. Atendimento imediato, técnicos experientes e conserto em até 24 horas.',
    hero_cta_primary: 'Chamar no WhatsApp',
    hero_cta_secondary: 'Ligar agora',
    microcopy: 'Atendimento humano desde a primeira mensagem. Sem robô, sem fila.',
    seo: {
      page_slug: 'home',
      meta_title: 'Pressurize Prime | Pressurizador e Aquecedores em São Paulo',
      meta_description: 'Venda, instalação e manutenção de pressurizador, aquecedor a gás, solar e elétrico em SP. Técnicos experientes e conserto em até 24h. Chame no WhatsApp.'
    }
  },
  pressurizador: {
    id: 'pressurizador',
    slug: 'pressurizador',
    title: 'Pressurizador de Água',
    hero_title: 'Chuveiro fraco? Instalação e conserto de pressurizador em até 24h.',
    hero_subtitle: 'Pressurizador é a nossa especialidade. Diagnóstico, dimensionamento correto e instalação feita por quem trabalha com isso há mais de 10 anos. Banho forte em todos os pontos da casa.',
    hero_cta_primary: 'Chamar no WhatsApp agora',
    hero_cta_secondary: 'Ligar agora',
    microcopy: 'Mande uma foto do seu pressurizador e receba uma orientação em minutos.',
    seo: {
      page_slug: 'pressurizador',
      meta_title: 'Pressurizador de Água em SP | Instalação e Conserto em 24h',
      meta_description: 'Chuveiro fraco? Venda, instalação e conserto de pressurizador residencial em São Paulo. Técnicos experientes, atendimento imediato. Chame no WhatsApp.'
    }
  },
  'aquecedor-a-gas': {
    id: 'aquecedor-a-gas',
    slug: 'aquecedor-a-gas',
    title: 'Aquecedor a Gás',
    hero_title: 'Aquecedor a gás com problema? Conserto em até 24h, com segurança.',
    hero_subtitle: 'Aquecedor a gás exige técnico que entende de gás, água e exaustão. Diagnóstico preciso, peças adequadas e instalação dentro das normas de segurança.',
    hero_cta_primary: 'Chamar no WhatsApp agora',
    hero_cta_secondary: 'Ligar agora',
    microcopy: 'Mande o modelo ou o código de erro do display e agilizamos o diagnóstico.',
    seo: {
      page_slug: 'aquecedor-a-gas',
      meta_title: 'Conserto e Instalação de Aquecedor a Gás em SP | Em até 24h',
      meta_description: 'Aquecedor a gás não acende ou desliga no banho? Conserto, manutenção e instalação conforme as normas em São Paulo. Técnicos experientes. Chame agora.'
    }
  },
  'aquecedor-solar': {
    id: 'aquecedor-solar',
    slug: 'aquecedor-solar',
    title: 'Aquecedor Solar e Boiler',
    hero_title: 'Seu aquecedor solar deveria gerar economia, não dor de cabeça.',
    hero_subtitle: 'Instalação, manutenção e conserto de placas, boiler e sistema de apoio. Seu sistema solar funcionando como deveria, com água quente de verdade e conta de luz mais baixa.',
    hero_cta_primary: 'Chamar no WhatsApp agora',
    hero_cta_secondary: 'Ligar agora',
    microcopy: 'Mande uma foto das placas e do boiler e já adiantamos o diagnóstico.',
    seo: {
      page_slug: 'aquecedor-solar',
      meta_title: 'Aquecedor Solar em SP | Instalação, Manutenção e Conserto',
      meta_description: 'Água morna mesmo com sol? Instalação, manutenção e conserto de aquecedor solar e boiler em São Paulo. Técnicos experientes, atendimento imediato.'
    }
  },
  'aquecedor-eletrico': {
    id: 'aquecedor-eletrico',
    slug: 'aquecedor-eletrico',
    title: 'Aquecedor Elétrico e Boiler',
    hero_title: 'Aquecedor elétrico parou de esquentar? Conserto em até 24h.',
    hero_subtitle: 'Boiler e aquecedores elétricos com diagnóstico preciso, troca de resistência e termostato no mesmo atendimento e instalação com a parte elétrica dimensionada para não desarmar.',
    hero_cta_primary: 'Chamar no WhatsApp agora',
    hero_cta_secondary: 'Ligar agora',
    microcopy: 'Mande a foto da etiqueta do equipamento e agilizamos o atendimento.',
    seo: {
      page_slug: 'aquecedor-eletrico',
      meta_title: 'Aquecedor Elétrico e Boiler em SP | Conserto em até 24h',
      meta_description: 'Boiler elétrico não esquenta ou desarma o disjuntor? Venda, instalação e conserto de aquecedor elétrico em São Paulo. Técnicos experientes. Chame agora.'
    }
  },
  sobre: {
    id: 'sobre',
    slug: 'sobre',
    title: 'Página Sobre',
    hero_title: 'Técnicos de verdade, com nome e responsabilidade pelo serviço.',
    hero_subtitle: 'A Pressurize Prime nasceu de mais de uma década de experiência prática com pressurizadores e aquecedores. Uma equipe que aprendeu o ofício em campo, instalação por instalação, e conhece por dentro os equipamentos que você tem em casa.',
    hero_cta_primary: 'Falar com um consultor',
    hero_cta_secondary: 'Ligar agora',
    seo: {
      page_slug: 'sobre',
      meta_title: 'Sobre Nós | Pressurize Prime',
      meta_description: 'Especialistas em pressurização de água e aquecimento a gás e elétrico em São Paulo. Conheça nossa história e compromisso.'
    }
  },
  'diferenciais': {
    id: 'diferenciais',
    slug: 'diferenciais',
    title: 'Diferenciais',
    hero_title: 'Por que escolher a nossa solução?',
    hero_subtitle: 'Não somos apenas instaladores. Somos uma engenharia de conforto focada em resolver o seu problema hídrico ou térmico de forma definitiva.',
    hero_cta_primary: 'Ver Diferenciais',
    hero_cta_secondary: 'Contato',
    seo: {
      page_slug: 'diferenciais',
      meta_title: 'Nossos Diferenciais | Pressurize Prime',
      meta_description: 'Descubra por que a Pressurize Prime é a escolha certa para a instalação e manutenção do seu equipamento.'
    }
  },
  'como-funciona': {
    id: 'como-funciona',
    slug: 'como-funciona',
    title: 'Como Funciona',
    hero_title: 'Como funciona?',
    hero_subtitle: 'Um processo simples, rápido e transparente. Desenhado para poupar seu tempo e garantir sua tranquilidade.',
    hero_cta_primary: 'Entenda o Processo',
    hero_cta_secondary: 'Agendar Visita',
    seo: {
      page_slug: 'como-funciona',
      meta_title: 'Como Funciona | Pressurize Prime',
      meta_description: 'Entenda o nosso processo de atendimento, do primeiro contato até a resolução do problema e emissão da garantia.'
    }
  },
  duvidas: {
    id: 'duvidas',
    slug: 'duvidas',
    title: 'Dúvidas Frequentes',
    hero_title: 'Perguntas frequentes',
    hero_subtitle: 'Tire suas dúvidas rapidamente. Encontre respostas para as perguntas mais comuns dos nossos clientes.',
    hero_cta_primary: 'Falar no WhatsApp',
    hero_cta_secondary: 'Ligar para a equipe',
    seo: {
      page_slug: 'duvidas',
      meta_title: 'Dúvidas Frequentes | Pressurize Prime',
      meta_description: 'Tire suas dúvidas sobre instalação, conserto, garantia e funcionamento de pressurizadores e aquecedores a gás.'
    }
  }
};

export const defaultFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Qual é o horário de atendimento?',
    answer: 'De segunda a sexta, das 8h às 19h. Conserto e instalação são feitos de imediato ou em até 24 horas úteis.'
  },
  {
    id: 'faq-2',
    question: 'Vocês vendem o equipamento ou só instalam?',
    answer: 'Os dois. Vendemos, instalamos e fazemos a manutenção, ou instalamos o equipamento que você já comprou.'
  },
  {
    id: 'faq-3',
    question: 'Com quais marcas vocês trabalham?',
    answer: 'Atendemos equipamentos Rowa, Komeco, Fluxonn, Syllent, Grundfos, Rinnai, Rheem, Cumulus e Heliotek, entre outras.'
  },
  {
    id: 'faq-4',
    question: 'A visita é cobrada?',
    answer: 'Cobramos uma taxa de vistoria e locomoção. Se você aprovar o serviço com o técnico, esse valor não é cobrado (sai de graça).'
  },
  {
    id: 'faq-5',
    question: 'Os serviços têm garantia?',
    answer: 'Sim! Peças têm garantia de 3 meses e a mão de obra possui garantia de 30 dias com retorno assegurado.'
  },
  {
    id: 'faq-6',
    question: 'Quais as formas de pagamento?',
    answer: 'Pix, débito ou cartão de crédito em até 10x sem juros.'
  }
];

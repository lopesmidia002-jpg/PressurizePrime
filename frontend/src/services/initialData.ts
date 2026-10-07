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
  sobre: {
    id: 'sobre',
    slug: 'sobre',
    title: 'Sobre a Pressurize Prime',
    hero_title: 'Especialistas em água quente e pressurização em São Paulo.',
    hero_subtitle: 'Conserto, venda e instalação de pressurizadores e aquecedores a gás, solar e elétricos.',
    hero_badge: 'Especialistas em Aquecedores e Pressurizadores',
    hero_cta_primary: 'Agendar Visita Técnica',
    hero_cta_secondary: 'Falar com Especialista',
    microcopy: 'Mais de 10 anos de experiência resolvendo de primeira.',
    sections: {
      historia: {
        badge: 'Nossa História',
        title: 'Técnicos de verdade, com nome e responsabilidade pelo serviço.',
        content1: 'A Pressurize Prime nasceu de mais de uma década de experiência prática com pressurizadores e aquecedores. Uma equipe que aprendeu o ofício em campo, instalação por instalação, e conhece por dentro os equipamentos que você tem em casa.',
        content2: 'Aqui, quem atende você é gente de verdade, do primeiro contato ao pós-serviço. E se algo não ficar certo, a gente volta.',
        items: [
          { title: 'Resolvemos de primeira', desc: 'Diagnóstico técnico antes de trocar qualquer peça. Você paga pelo que precisa, não por tentativa e erro.' },
          { title: 'Se voltar, a gente volta', desc: 'Nosso pós-atendimento existe para resolver qualquer retorno. Técnico com nome, empresa com endereço, serviço com garantia.' },
          { title: 'Rápido de verdade', desc: 'Atendimento imediato, conserto em até 24h e instalação de equipamentos novos sem semanas de espera.' },
          { title: 'Gente, não robô', desc: 'Do WhatsApp à visita, você fala com pessoas que entendem do assunto.' }
        ]
      },
      proposito: {
        title: 'Nosso Propósito',
        subtitle: 'O que nos move e orienta cada atendimento que realizamos.',
        items: [
          { title: 'Missão', desc: 'Garantir segurança hídrica e conforto térmico excepcional, oferecendo soluções técnicas precisas e atendimento ágil e resolutivo para cada cliente.' },
          { title: 'Visão', desc: 'Ser reconhecida como a maior e mais confiável autoridade em pressurização e aquecimento da Grande São Paulo até 2028.' },
          { title: 'Valores', desc: 'Transparência absoluta, excelência técnica, pontualidade britânica, respeito ao cliente e utilização de peças 100% originais.' }
        ]
      },
      numeros: {
        title: 'Nosso Impacto em Números',
        items: [
          { title: '10+', desc: 'Anos de Experiência' },
          { title: '5.000+', desc: 'Clientes Atendidos' },
          { title: '100%', desc: 'Comprometimento' },
          { title: '24h', desc: 'Agilidade na Resposta' }
        ]
      },
      finalCta: {
        title: 'Pronto para ter o banho perfeito?',
        subtitle: 'Nossa equipe técnica altamente capacitada está aguardando o seu chamado para resolver seu problema hídrico de forma definitiva.',
        button1: 'Falar com um Especialista',
        button2: 'Ligar Agora',
        cta: 'Chamar no WhatsApp'
      },
      images: {
        hero1: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1920&q=80',
        hero2: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1920&q=80',
        hero3: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
        cta: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
        historia: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80'
      }
    },
    seo: {
      page_slug: 'sobre',
      meta_title: 'Sobre Nós | Pressurize Prime',
      meta_description: 'Conheça a história e os valores da Pressurize Prime, especialistas em aquecedores e pressurizadores em São Paulo.'
    }
  },
  home: {
    id: 'home',
    slug: 'home',
    title: 'Página Inicial',
    hero_title: 'Banho forte e água quente, sem esperar dias por um técnico.',
    hero_subtitle: 'Venda, instalação e manutenção de pressurizadores e aquecedores a gás, solar e elétricos em São Paulo. Atendimento imediato, técnicos experientes e conserto em até 24 horas.',
    hero_cta_primary: 'Chamar no WhatsApp',
    hero_cta_secondary: 'Ligar agora',
    microcopy: 'Atendimento humano desde a primeira mensagem. Sem robô, sem fila.',
    sections: {
      about: {
        title: 'Quem Somos',
        content: 'A Pressurize Prime é especialista em soluções de aquecimento e pressurização. Há mais de 10 anos entregando conforto e segurança para residências e condomínios em São Paulo.',
        quote: '"Acreditamos que o conforto da sua família não pode esperar."',
        items: [
          { title: 'Técnicos identificados e qualificados' },
          { title: 'Empresa com endereço e CNPJ ativo' },
          { title: 'Instalações em conformidade com as normas ABNT' },
          { title: 'Pós-atendimento com suporte prioritário' }
        ],
        card: {
          title: 'Padrão Operacional',
          badge: 'Garantia Ativa',
          footer_text: 'Grande São Paulo e Capital • Atendimento Rápido',
          items: [
            { title: 'Ofício de Campo Especializado', desc: 'Conhecimento profundo das principais marcas: Rowa, Komeco, Grundfos, Rheem e Rinnai.' },
            { title: 'Resolução no Primeiro Atendimento', desc: 'Diagnóstico exato e troca de componentes no mesmo local sempre que possível.' },
            { title: 'Compromisso de Pós-Venda', desc: 'Não sumimos após o pagamento. Qualquer retorno é tratado com máxima prioridade.' }
          ]
        }
      },
      whyUs: {
        title: 'Por que escolher a Pressurize Prime?',
        subtitle: 'Diferenciais que fazem a diferença na hora de contratar um especialista.',
        items: [
          { title: 'Atendimento Rápido', desc: 'Técnicos disponíveis para resolver o seu problema em até 24 horas.' },
          { title: 'Técnicos Especializados', desc: 'Profissionais altamente capacitados e atualizados com as normas técnicas.' },
          { title: 'Garantia Comprovada', desc: 'Oferecemos garantia de 3 meses em todas as peças instaladas.' },
          { title: 'Preço Justo e Transparente', desc: 'Orçamento claro antes do início do serviço, sem surpresas no final.' }
        ]
      },
      howItWorks: {
        title: 'Como Funciona',
        subtitle: 'Nosso processo é simples e transparente, desenhado para resolver seu problema rápido.',
        cta: 'Solicitar Orçamento',
        items: [
          { title: 'Contato Inicial', desc: 'Fale conosco via WhatsApp ou ligação para detalhar o problema.' },
          { title: 'Avaliação Técnica', desc: 'Nossa equipe analisa as fotos/vídeos ou envia um técnico ao local.' },
          { title: 'Execução', desc: 'Serviço realizado com peças originais e garantia.' }
        ]
      },
      commitments: {
        title: 'Nossos Compromissos e Garantias',
        subtitle: 'O que o cliente pode cobrar da gente. Regras claras e garantia por escrito a respeito do seu investimento.',
        items: [
          { title: 'Pontualidade', desc: 'Chegamos no horário combinado.' },
          { title: 'Limpeza', desc: 'Deixamos o local exatamente como encontramos.' },
          { title: 'Segurança', desc: 'Serviço realizado dentro de todas as normas técnicas vigentes (NBR).' },
          { title: 'Transparência', desc: 'Você acompanha cada etapa do conserto ou instalação.' }
        ]
      },
      coverage: {
        title: 'Regiões Atendidas',
        subtitle: 'Chegamos rápido onde você precisa.',
        badge: 'Cobertura em toda São Paulo e Grande SP',
        locations: [
          'São Paulo', 'Barueri (Alphaville)', 'Santana de Parnaíba',
          'Cotia (Granja Viana)', 'Santo André', 'São Bernardo do Campo', 'São Caetano do Sul'
        ]
      },
      faq: {
        title: 'Dúvidas Frequentes',
        subtitle: 'Respostas rápidas para as perguntas mais comuns.',
        items: [
          { title: 'Qual é o horário de atendimento?', desc: 'De segunda a sexta, das 8h às 19h. Conserto e instalação são feitos de imediato ou em até 24 horas úteis.' },
          { title: 'Vocês vendem o equipamento ou só instalam?', desc: 'Os dois. Vendemos, instalamos e fazemos a manutenção, ou instalamos o equipamento que você já comprou.' },
          { title: 'Com quais marcas vocês trabalham?', desc: 'Atendemos equipamentos Rowa, Komeco, Fluxonn, Syllent, Grundfos, Rinnai, Rheem, Cumulus e Heliotek, entre outras.' },
          { title: 'A visita é cobrada?', desc: 'Cobramos uma taxa de vistoria e locomoção. Se você aprovar o serviço com o técnico, esse valor não é cobrado (sai de graça).' },
          { title: 'Os serviços têm garantia?', desc: 'Sim! Peças têm garantia de 3 meses e a mão de obra possui garantia de 30 dias com retorno assegurado.' },
          { title: 'Quais as formas de pagamento?', desc: 'Pix, débito ou cartão de crédito em até 10x sem juros.' }
        ]
      },
      homeLead: {
        title: 'Problema no pressurizador ou aquecedor? Fale com quem entende.',
        subtitle: 'Evite técnicos amadores ou soluções provisórias. Agende uma visita técnica especializada e resolva seu problema de forma definitiva.'
      },
      finalCta: {
        title: 'Chuveiro fraco ou água fria não esperam. Nem a gente.',
        subtitle: 'Fale agora com um técnico. Atendimento de segunda a sexta, das 8h às 19h. Conserto e instalação de imediato ou em até 24 horas.',
        cta: 'Chamar no WhatsApp',
        bgImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80'
      }
    },
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
    },
    sections: {
      image_url: '/images/pressurizador.jpg',
      bg_image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
      heroOverlay: {
        title: 'Instalação e Reparo Oficial',
        subtitle: 'Peças com garantia de 3 meses',
        badge: 'Até 24h'
      },
      trustBadges: {
        title: 'Faixa de Confiança',
        items: [
          { title: 'Especialistas em pressurizador', desc: 'Mais de 10 anos de vivência' },
          { title: 'Instalação e conserto em 24h', desc: 'Atendimento prioritário em SP' },
          { title: 'Até 10x sem juros no cartão', desc: 'Ou desconto especial via Pix' },
          { title: 'Garantia de 3 meses em peças', desc: 'Com 30 dias na mão de obra' }
        ]
      }
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
    },
    sections: {
      image_url: '/images/aquecedor-a-gas.jpg',
      bg_image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
      heroOverlay: {
        title: 'Instalação e Reparo Oficial',
        subtitle: 'Peças com garantia de 3 meses',
        badge: 'Até 24h'
      },
      trustBadges: {
        title: 'Faixa de Confiança',
        items: [
          { title: 'Técnicos com mais de 10 anos', desc: 'Experiência em aquecimento a gás' },
          { title: 'Conserto e instalação em até 24h', desc: 'Água quente restabelecida rápido' },
          { title: 'Gás Natural (GN) e GLP', desc: 'Casas e apartamentos' },
          { title: 'Até 10x sem juros no cartão', desc: 'Facilidade no pagamento' }
        ]
      }
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
    },
    sections: {
      image_url: '/images/aquecedor-solar.jpg',
      bg_image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
      heroOverlay: {
        title: 'Instalação e Reparo Oficial',
        subtitle: 'Peças com garantia de 3 meses',
        badge: 'Até 24h'
      },
      trustBadges: {
        title: 'Faixa de Confiança',
        items: [
          { title: 'Técnicos com mais de 10 anos', desc: 'Experiência em energia solar térmica' },
          { title: 'Placas, boiler e apoio elétrico/gás', desc: 'Visão integral do sistema' },
          { title: 'Conserto e instalação em até 24h', desc: 'Atendimento rápido em SP' },
          { title: 'Até 10x sem juros no cartão', desc: 'Pagamento facilitado' }
        ]
      }
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
    },
    sections: {
      image_url: '/images/aquecedor-eletrico.jpg',
      bg_image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
      heroOverlay: {
        title: 'Instalação e Reparo Oficial',
        subtitle: 'Peças com garantia de 3 meses',
        badge: 'Até 24h'
      },
      trustBadges: {
        title: 'Faixa de Confiança',
        items: [
          { title: 'Técnicos com mais de 10 anos', desc: 'Especialistas em boilers elétricos' },
          { title: 'Conserto e instalação em até 24h', desc: 'Atendimento ágil em SP' },
          { title: 'Boiler e aquecedor de passagem', desc: 'Diagnóstico e reparo elétrico' },
          { title: 'Até 10x sem juros no cartão', desc: 'Pagamento facilitado' }
        ]
      }
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
    sections: {
      diferenciais: {
        title: 'Nossos Diferenciais',
        subtitle: 'O que nos torna a melhor escolha',
        items: [
          { title: 'Experiência Comprovada', desc: 'Mais de 10 anos de mercado.' },
          { title: 'Técnicos Certificados', desc: 'Profissionais altamente capacitados.' },
          { title: 'Atendimento Rápido', desc: 'Chegamos até você rapidamente.' },
          { title: 'Garantia', desc: 'Tranquilidade e segurança para você.' },
          { title: 'Tecnologia de Ponta', desc: 'Equipamentos de diagnóstico avançado para localizar o problema sem quebra-quebra.' },
          { title: 'Pontualidade Britânica', desc: 'Chegamos no horário combinado. Valorizamos o seu tempo tanto quanto você.' }
        ]
      },
      comparativo: {
        title: 'Comparativo do Mercado',
        subtitle: 'Veja por que a Pressurize Prime se destaca.',
        items: [
          { bad: "Orçamentos surpresa após iniciar", good: "Diagnóstico claro e orçamento fixo" },
          { bad: "Peças paralelas sem procedência", good: "100% Peças Originais de fábrica" },
          { bad: "Garantia apenas 'de boca'", good: "Garantia documentada em Nota Fiscal" },
          { bad: "Atrasos e desmarcações", good: "Pontualidade e respeito à agenda" },
          { bad: "Sujeira após o serviço", good: "Limpeza completa do local de trabalho" }
        ]
      },
      depoimentos: {
        title: 'O que dizem sobre nós',
        subtitle: 'A satisfação dos nossos clientes é nossa melhor propaganda.',
        items: [
          { title: 'Carlos M.', desc: 'Resolveram em 1 hora o que outros 2 técnicos não conseguiram em dias. Excelente atendimento!' },
          { title: 'Mariana R.', desc: 'Muito limpos e organizados. Chegaram no horário e deixaram tudo funcionando perfeitamente.' },
          { title: 'Roberto F.', desc: 'Preço justo pelo nível de profissionalismo. Nota fiscal e garantia entregues na hora.' }
        ]
      },
      finalCta: {
        title: 'Não arrisque sua segurança com amadores.',
        cta: 'Agendar Atendimento Seguro'
      },
      images: {
        hero1: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1920&q=80',
        hero2: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1920&q=80',
        hero3: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1920&q=80',
        cta: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80'
      }
    },
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
    sections: {
      processo: {
        title: 'O Processo',
        subtitle: 'Passo a passo do nosso atendimento',
        items: [
          { title: 'Passo 1', desc: 'Agendamento rápido.' },
          { title: 'Passo 2', desc: 'Visita técnica.' },
          { title: 'Passo 3', desc: 'Solução do problema.' }
        ]
      },
      regioes: {
        title: 'Regiões Atendidas',
        subtitle: 'Onde estamos',
        badge: 'Atendemos toda SP e região metropolitana',
        items: [
          { title: 'São Paulo' },
          { title: 'Barueri (Alphaville)' },
          { title: 'Santana de Parnaíba' },
          { title: 'Cotia (Granja Viana)' },
          { title: 'Santo André' },
          { title: 'São Bernardo do Campo' },
          { title: 'São Caetano do Sul' }
        ]
      },
      compromissos: {
        title: 'Nossos Compromissos',
        subtitle: 'Nossas garantias para você',
        items: [
          { title: 'Pontualidade', desc: 'Sempre no horário.' },
          { title: 'Qualidade', desc: 'Peças originais.' },
          { title: 'Segurança', desc: 'Técnicos certificados e normas rigorosamente seguidas.' },
          { title: 'Transparência', desc: 'Orçamento claro e sem surpresas.' }
        ]
      },
      finalCta: {
        title: 'Pronto para começar?',
        subtitle: 'Nossa equipe de atendimento está a um clique de distância para resolver seu problema.',
        cta: 'Iniciar Atendimento'
      },
      images: {
        hero1: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1920&q=80',
        hero2: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1920&q=80',
        hero3: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1920&q=80',
        cta: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80'
      }
    },
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
    sections: {
      duvidas: {
        title: 'Dúvidas Frequentes',
        subtitle: 'As perguntas que mais recebemos.',
        items: [
          { title: "De quanto em quanto tempo devo fazer manutenção?", desc: "O recomendado pelos fabricantes é uma revisão por ano, ou conforme o manual do seu modelo." },
          { title: "Meu aquecedor desliga no meio do banho. O que pode ser?", desc: "Pode ser sensor, exaustão obstruída, baixa pressão de água ou gás. Só o diagnóstico no local confirma." },
          { title: "Vocês trabalham com quais marcas?", desc: "Atendemos aquecedores Rinnai, Rheem e Komeco, entre outras." },
          { title: "Atendem gás natural e GLP?", desc: "Sim, os dois. Só não executamos tubulação de gás: o ponto precisa estar pronto no local." },
          { title: "Qual a garantia?", desc: "3 meses em peças e 30 dias na mão de obra." }
        ]
      },
      finalCta: {
        title: 'Ainda tem alguma dúvida?',
        subtitle: 'Nossa equipe de atendimento humano está pronta para responder qualquer pergunta que não esteja na lista.',
        cta: 'Perguntar no WhatsApp'
      },
      images: {
        hero1: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1920&q=80',
        hero2: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1920&q=80',
        hero3: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1920&q=80',
        cta: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80'
      }
    },
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

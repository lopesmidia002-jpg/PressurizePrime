export interface LPSymptomItem {
  text: string;
}

export interface LPWhatWeDoItem {
  title: string;
  desc: string;
  badge: string;
}

export interface LPWhyUsItem {
  title: string;
  desc: string;
}

export interface LPObjectionItem {
  question: string;
  answer: string;
}

export interface LPFaqItem {
  question: string;
  answer: string;
}

export interface LPPageDetail {
  slug: string;
  serviceCategory: string;
  name: string;
  badge: string;
  image_url: string;
  defaultH1: string;
  h1Variants: {
    conserto?: string;
    instalacao?: string;
    venda?: string;
    manutencao?: string;
  };
  subtitle: string;
  microcopy: string;
  safetyAlert?: string;
  trustBadges: { title: string; subtitle: string }[];
  symptomsTitle: string;
  symptomsIntro: string;
  symptoms: { title: string }[];
  symptomsClosing: string;
  whatWeDoTitle?: string;
  whatWeDoIntro?: string;
  whatWeDo: LPWhatWeDoItem[];
  whyUsTitle?: string;
  whyUsIntro?: string;
  whyUs: LPWhyUsItem[];
  objectionsTitle?: string;
  objectionsIntro?: string;
  objections: LPObjectionItem[];
  faqsTitle?: string;
  faqsIntro?: string;
  faqs: LPFaqItem[];
  leadSectionTitle?: string;
  leadSectionSubtitle?: string;
  leadSectionIntro?: string;
  leadSectionBadge?: string;
  leadSection?: { title: string; desc?: string }[];
  ctaTitle: string;
  ctaText: string;
  brands: string[];
  seo: {
    meta_title: string;
    meta_description: string;
  };
}

export const landingPagesData: Record<string, LPPageDetail> = {
  pressurizador: {
    slug: 'pressurizador',
    serviceCategory: 'pressurizador',
    name: 'Pressurizador de Água',
    badge: 'Especialista em Pressurizador Residencial',
    image_url: '/images/pressurizador.jpg',
    defaultH1: 'Chuveiro fraco? Instalação e conserto de pressurizador em até 24h.',
    h1Variants: {
      conserto: 'Pressurizador ligando e desligando sozinho? Conserto em até 24h.',
      instalacao: 'Instalação de pressurizador residencial com técnico especializado.',
      venda: 'Pressurizador instalado em até 24h, em até 10x sem juros.'
    },
    subtitle: 'Pressurizador é a nossa especialidade. Diagnóstico, dimensionamento correto e instalação feita por quem trabalha com isso há mais de 10 anos. Banho forte em todos os pontos da casa.',
    microcopy: 'Mande uma foto do seu pressurizador e receba uma orientação em minutos.',
    trustBadges: [
      { title: 'Especialistas em pressurizador', subtitle: 'Mais de 10 anos de vivência' },
      { title: 'Instalação e conserto em 24h', subtitle: 'Atendimento prioritário em SP' },
      { title: 'Até 10x sem juros no cartão', subtitle: 'Ou desconto especial via Pix' },
      { title: 'Garantia de 3 meses em peças', subtitle: 'Com 30 dias na mão de obra' }
    ],
    symptomsTitle: 'Algum desses está acontecendo na sua casa?',
    symptomsIntro: 'Identifique os sinais de falha do seu equipamento antes que ocorra uma pane completa.',
    symptoms: [
      { title: 'Chuveiro fraco, principalmente nos andares de cima' },
      { title: 'Pressurizador ligando e desligando sozinho, mesmo com as torneiras fechadas' },
      { title: 'Barulho alto ou vibração na casa de máquinas' },
      { title: 'Vazamento no equipamento ou nas conexões hidráulicas' },
      { title: 'Pressurizador que não liga ou não desliga' },
      { title: 'Pressão que cai repentinamente quando duas pessoas usam água ao mesmo tempo' }
    ],
    symptomsClosing: 'Cada um desses sinais tem uma causa diferente. Trocar peça no chute sai caro. Nosso técnico identifica a causa exata antes de mexer em qualquer coisa.',
    whatWeDo: [
      {
        title: 'Venda de pressurizador',
        desc: 'Indicamos o modelo certo para o tamanho da sua casa, o número de banheiros e a sua caixa d\'água. Nem mais potente do que precisa, nem fraco demais.',
        badge: 'Dimensionamento Preciso'
      },
      {
        title: 'Instalação Completa',
        desc: 'Instalação completa, com as conexões e a elétrica feitas do jeito certo, para o equipamento durar e não voltar a dar problema.',
        badge: 'Sem Gambiarras'
      },
      {
        title: 'Conserto e manutenção',
        desc: 'Troca de pressostato, fluxostato, selo mecânico e reparo de vazamentos. Conserto em até 24h e manutenção preventiva para evitar a pane total.',
        badge: 'Peças de Reposição'
      }
    ],
    whyUs: [
      {
        title: 'Pressurizador é o nosso carro-chefe',
        desc: 'É o serviço que mais fazemos diariamente. Você não está chamando um técnico generalista que tenta consertar de tudo.'
      },
      {
        title: 'Dimensionamento certo, equipamento que dura',
        desc: 'A principal causa de pressurizador que quebra cedo é modelo inadequado ou instalação mal dimensionada. É isso que evitamos.'
      },
      {
        title: 'Instalação rápida',
        desc: 'Equipamento novo instalado de imediato ou em até 24 horas, sem semanas de espera.'
      },
      {
        title: 'Se der retorno, a gente resolve',
        desc: 'Pós-atendimento de verdade, com técnico identificado e garantia real emitida.'
      }
    ],
    objections: [
      {
        question: '"Não é caro?"',
        answer: 'Caro é trocar o pressurizador duas vezes por má instalação. Com o modelo certo e a instalação correta, você investe uma vez e esquece o problema. E paga em até 10x sem juros no cartão, ou no Pix e débito.'
      },
      {
        question: '"Vai durar?"',
        answer: 'Durabilidade depende de três coisas: equipamento adequado, instalação correta e manutenção. Cuidamos das três.'
      },
      {
        question: '"Quanto tempo leva?"',
        answer: 'A instalação ou conserto é feita de imediato ou em até 24 horas após a aprovação do orçamento.'
      }
    ],
    faqs: [
      {
        question: 'Meu pressurizador liga e desliga sozinho. É grave?',
        answer: 'Geralmente indica vazamento na tubulação, problema na válvula de retenção ou no pressostato. Não é emergência, mas desgasta o motor e aumenta a conta de luz. Vale verificar logo.'
      },
      {
        question: 'Vocês instalam pressurizador que eu já comprei?',
        answer: 'Sim! Antes da montagem, conferimos se o modelo adquirido é adequado para a hidráulica da sua residência.'
      },
      {
        question: 'Qual pressurizador é o melhor para minha casa?',
        answer: 'Depende do número de banheiros, da altura da caixa d\'água e dos pontos de uso simultâneo. Indicamos com exatidão na visita técnica ou pelas fotos enviadas no WhatsApp.'
      },
      {
        question: 'Atendem prédio ou só casa?',
        answer: 'Atendemos tanto casas e coberturas quanto apartamentos em condomínios.'
      },
      {
        question: 'Com quais marcas vocês trabalham?',
        answer: 'Atendemos equipamentos Rowa, Komeco, Fluxonn, Syllent e Grundfos, entre outras marcas líderes.'
      },
      {
        question: 'Qual a garantia oferecida?',
        answer: 'Oferecemos 3 meses de garantia em peças e 30 dias na mão de obra.'
      }
    ],
    ctaTitle: 'Hoje ainda dá tempo de tomar um banho forte.',
    ctaText: 'Fale com um especialista em pressurizador agora. Atendimento ágil em São Paulo.',
    brands: ['Rowa', 'Komeco', 'Fluxonn', 'Syllent', 'Grundfos'],
    seo: {
      meta_title: 'Pressurizador de Água em SP | Instalação e Conserto em 24h',
      meta_description: 'Chuveiro fraco? Venda, instalação e conserto de pressurizador residencial em São Paulo. Técnicos experientes, atendimento imediato. Chame no WhatsApp.'
    }
  },

  'aquecedor-a-gas': {
    slug: 'aquecedor-a-gas',
    serviceCategory: 'aquecedor-a-gas',
    name: 'Aquecedor a Gás',
    badge: 'Normas de Segurança NBR 13103',
    image_url: '/images/aquecedor-a-gas.jpg',
    defaultH1: 'Aquecedor a gás com problema? Conserto em até 24h, com segurança.',
    h1Variants: {
      conserto: 'Aquecedor a gás não acende? Conserto em até 24h.',
      manutencao: 'Manutenção de aquecedor a gás: mais segurança e economia no banho.',
      instalacao: 'Instalação de aquecedor a gás conforme as normas, sem semanas de espera.'
    },
    subtitle: 'Aquecedor a gás exige técnico que entende de gás, água e exaustão. Diagnóstico preciso, peças adequadas e instalação dentro das normas de segurança. Água quente estável em todos os banhos.',
    microcopy: 'Mande o modelo ou o código de erro do display e agilizamos o diagnóstico.',
    safetyAlert: 'Sentiu cheiro de gás? Feche o registro imediatamente, abra as janelas, não acione interruptores elétricos e chame a concessionária. Depois, nosso técnico faz a verificação completa e os testes de estanqueidade.',
    trustBadges: [
      { title: 'Técnicos com mais de 10 anos', subtitle: 'Experiência em aquecimento a gás' },
      { title: 'Conserto e instalação em até 24h', subtitle: 'Água quente restabelecida rápido' },
      { title: 'Gás Natural (GN) e GLP', subtitle: 'Casas e apartamentos' },
      { title: 'Até 10x sem juros no cartão', subtitle: 'Facilidade no pagamento' }
    ],
    symptomsTitle: 'Seu aquecedor está dando algum desses sinais?',
    symptomsIntro: 'Identifique os sinais de falha do seu equipamento antes que ocorra uma pane completa.',
    symptoms: [
      { title: 'Não acende ou demora muito para acender' },
      { title: 'Desliga sozinho repentinamente no meio do banho' },
      { title: 'Água que esquenta pouco ou oscila drasticamente entre quente e fria' },
      { title: 'Código de erro piscando no display digital' },
      { title: 'Chama amarelada ou fuligem preta no equipamento' },
      { title: 'Barulho de estalo alto ou pequena explosão ao ligar' }
    ],
    symptomsClosing: 'Com aquecedor a gás, improviso é risco. Chame quem faz o diagnóstico certo e atua dentro das normas técnicas antes de mexer.',
    whatWeDo: [
      {
        title: 'Venda de aquecedor a gás',
        desc: 'Indicamos a vazão exata em litros/minuto para a sua casa, conforme o número de duchas e torneiras usadas ao mesmo tempo.',
        badge: 'Vazão Adequada'
      },
      {
        title: 'Instalação conforme NBR 13103',
        desc: 'Instalação do aquecedor com conexão de água, gás e duto de exaustão seguindo rigorosamente as normas de segurança. (O ponto de gás precisa estar pronto no local).',
        badge: 'Segurança Máxima'
      },
      {
        title: 'Conserto e manutenção preventiva',
        desc: 'Limpeza do queimador, revisão da exaustão, troca de sensores de temperatura, ventoinhas e placas eletrônicas para manter o consumo de gás baixo.',
        badge: 'Eficiência e Economia'
      }
    ],
    whyUs: [
      {
        title: 'Segurança em primeiro lugar',
        desc: 'Gás não é lugar para técnico improvisado. Trabalhamos estritamente dentro das normas e explicamos detalhadamente tudo o que foi feito.'
      },
      {
        title: 'Diagnóstico antes da peça',
        desc: 'Muitos defeitos se resolvem com limpeza, descarbonização ou regulagem da válvula. Você não paga por troca desnecessária.'
      },
      {
        title: 'Rapidez real',
        desc: 'Atendimento imediato e conserto em até 24h, porque ninguém quer passar dias encarando banho frio.'
      },
      {
        title: 'Pós-atendimento que resolve',
        desc: 'Se houver qualquer retorno, nós voltamos imediatamente para garantir a sua tranquilidade.'
      }
    ],
    objections: [
      {
        question: '"Não é caro?"',
        answer: 'Um aquecedor desregulado gasta muito mais gás todo mês. A manutenção se paga rapidamente na conta e evita a queima prematura do trocador de calor. E você parcela em até 10x sem juros.'
      },
      {
        question: '"Vai durar?"',
        answer: 'Aquecedor a gás bem instalado e revisado periodicamente dura muitos anos. A pane precoce quase sempre decorre de instalação inadequada ou exaustão obstruída.'
      },
      {
        question: '"Quanto tempo leva?"',
        answer: 'Conserto e instalação são concluídos de imediato ou em até 24 horas úteis após a aprovação do orçamento.'
      }
    ],
    faqs: [
      {
        question: 'De quanto em quanto tempo devo fazer manutenção?',
        answer: 'O recomendado pelos fabricantes é uma revisão preventiva a cada 1 ano, ou conforme o manual do seu modelo.'
      },
      {
        question: 'Meu aquecedor desliga no meio do banho. O que pode ser?',
        answer: 'Pode ser sensor de chama defeituoso, exaustão obstruída, superaquecimento ou oscilação na pressão de água ou gás. O teste local confirma.'
      },
      {
        question: 'Vocês trabalham com quais marcas de aquecedor?',
        answer: 'Atendemos aquecedores Rinnai, Rheem, Komeco e Bosch, entre outras.'
      },
      {
        question: 'Atendem gás natural (encanado) e GLP (botijão)?',
        answer: 'Sim, atendemos ambos os gases. Lembramos apenas que o ponto de alimentação de gás precisa estar pronto no local.'
      },
      {
        question: 'Qual a garantia dos serviços?',
        answer: 'Garantia de 3 meses em peças substituídas e 30 dias na mão de obra.'
      }
    ],
    ctaTitle: 'Banho frio não precisa durar até a semana que vem.',
    ctaText: 'Fale agora com um técnico especialista em aquecedor a gás.',
    brands: ['Rinnai', 'Rheem', 'Komeco', 'Bosch'],
    seo: {
      meta_title: 'Conserto e Instalação de Aquecedor a Gás em SP | Em até 24h',
      meta_description: 'Aquecedor a gás não acende ou desliga no banho? Conserto, manutenção e instalação conforme as normas em São Paulo. Técnicos experientes. Chame agora.'
    }
  },

  'aquecedor-solar': {
    slug: 'aquecedor-solar',
    serviceCategory: 'aquecedor-solar',
    name: 'Aquecedor Solar e Boiler',
    badge: 'Recuperação de Placas e Apoio Térmico',
    image_url: '/images/aquecedor-solar.jpg',
    defaultH1: 'Seu aquecedor solar deveria gerar economia, não dor de cabeça.',
    h1Variants: {
      manutencao: 'Manutenção de aquecedor solar: água quente e economia de volta.',
      conserto: 'Aquecedor solar não esquenta? Conserto em até 24h.',
      instalacao: 'Instalação de aquecedor solar dimensionado para a sua casa.'
    },
    subtitle: 'Instalação, manutenção e conserto de placas, boiler e sistema de apoio. Seu sistema solar funcionando como deveria, com água quente de verdade e conta de luz mais baixa.',
    microcopy: 'Mande uma foto das placas e do boiler e já adiantamos o diagnóstico.',
    trustBadges: [
      { title: 'Técnicos com mais de 10 anos', subtitle: 'Experiência em energia solar térmica' },
      { title: 'Placas, boiler e apoio elétrico/gás', subtitle: 'Visão integral do sistema' },
      { title: 'Conserto e instalação em até 24h', subtitle: 'Atendimento rápido em SP' },
      { title: 'Até 10x sem juros no cartão', subtitle: 'Pagamento facilitado' }
    ],
    symptomsTitle: 'O seu sistema solar está apresentando esses sintomas?',
    symptomsIntro: 'Identifique os sinais de falha do seu equipamento antes que ocorra uma pane completa.',
    symptoms: [
      { title: 'Água morna ou fria mesmo em dias ensolarados' },
      { title: 'Água quente que acaba muito rápido no primeiro banho' },
      { title: 'Boiler pingando, vazando ou com sinais visíveis de ferrugem' },
      { title: 'Placas solares com vidros embaçados, quebradas ou sem limpeza há anos' },
      { title: 'Conta de luz disparando porque a resistência elétrica de apoio não desliga' },
      { title: 'Água saindo com cor escura ou cheiro alterado nas torneiras' }
    ],
    symptomsClosing: 'Um sistema solar inoperante é dinheiro investido que não volta. Na grande maioria das vezes, é perfeitamente viável recuperar o sistema sem ter que trocá-lo por completo.',
    whatWeDo: [
      {
        title: 'Venda de aquecedor solar',
        desc: 'Dimensionamos placas e boiler conforme o número de moradores e o perfil de consumo. Nem subdimensionado (banho frio), nem superdimensionado (desperdício).',
        badge: 'Cálculo Sob Medida'
      },
      {
        title: 'Instalação completa e apoio',
        desc: 'Instalação das placas coletoras, boiler térmico, tubulação de cobre/CPVC e integração ao sistema de apoio elétrico ou a gás, com inclinação solar ideal.',
        badge: 'Eficiência Solar'
      },
      {
        title: 'Conserto, drenagem e limpeza',
        desc: 'Lavagem das placas de vidro, drenagem de lodo do boiler, substituição periódica do ânodo de magnésio e troca de termostatos e resistências.',
        badge: 'Recuperação Térmica'
      }
    ],
    whyUs: [
      {
        title: 'Recuperamos antes de trocar',
        desc: 'Muitos sistemas dados como perdidos por outros profissionais voltam a funcionar perfeitamente com a higienização e troca dos sensores corretos.'
      },
      {
        title: 'Sistema inteiro, não só a placa',
        desc: 'Placas, boiler, resistência de apoio e pressurização: analisamos o ecossistema completo que garante o banho quente da sua família.'
      },
      {
        title: 'Rapidez na execução',
        desc: 'Atendimento imediato e equipe pronta para conserto em até 24 horas úteis.'
      },
      {
        title: 'Pós-atendimento com garantia',
        desc: 'Técnico registrado, com endereço fixo e compromisso de retorno imediato se necessário.'
      }
    ],
    objections: [
      {
        question: '"Não é caro consertar?"',
        answer: 'O aquecedor solar existe exatamente para economizar. Um sistema com defeito força o apoio elétrico o dia todo, multiplicando sua conta de luz. A manutenção devolve a economia instantaneamente, em até 10x sem juros.'
      },
      {
        question: '"Vai durar mais tempo?"',
        answer: 'Com limpeza, troca periódica do ânodo de magnésio e revisão das válvulas, placas e boiler duram facilmente mais de 15 anos. Sem isso, a corrosão destrói o tanque.'
      },
      {
        question: '"Quanto tempo leva o reparo?"',
        answer: 'A manutenção preventiva ou troca de peças ocorre de imediato ou em até 24 horas após aprovação do orçamento.'
      }
    ],
    faqs: [
      {
        question: 'Com que frequência devo fazer manutenção no aquecedor solar?',
        answer: 'O padrão recomendado é uma revisão anual para limpeza das placas e troca do ânodo de magnésio (que impede a corrosão interna do boiler).'
      },
      {
        question: 'Dá para instalar aquecedor solar em casa que já tem aquecedor a gás?',
        answer: 'Sim! O aquecedor a gás atua perfeitamente como apoio inteligente nos dias chuvosos ou de inverno rigoroso.'
      },
      {
        question: 'Vocês atendem sistemas instalados por outras empresas?',
        answer: 'Sim, consertamos e realizamos a manutenção em instalações de terceiros de marcas como Heliotek, Cumulus, Komeco e Rinnai.'
      },
      {
        question: 'Fazem manutenção de aquecimento solar para piscinas?',
        answer: 'Sim, instalamos e consertamos sistemas de placas solares para piscinas residenciais.'
      },
      {
        question: 'Qual a garantia do conserto solar?',
        answer: 'Garantia legal e estendida de 3 meses em peças e 30 dias na mão de obra.'
      }
    ],
    ctaTitle: 'O sol continua saindo. Sua água quente também deveria.',
    ctaText: 'Fale agora com um técnico especialista em aquecimento solar e boiler.',
    brands: ['Heliotek', 'Cumulus', 'Komeco', 'Rinnai'],
    seo: {
      meta_title: 'Aquecedor Solar em SP | Instalação, Manutenção e Conserto',
      meta_description: 'Água morna mesmo com sol? Instalação, manutenção e conserto de aquecedor solar e boiler em São Paulo. Técnicos experientes, atendimento imediato.'
    }
  },

  'aquecedor-eletrico': {
    slug: 'aquecedor-eletrico',
    serviceCategory: 'aquecedor-eletrico',
    name: 'Aquecedor Elétrico e Boiler',
    badge: 'Hidráulica e Elétrica no Mesmo Técnico',
    image_url: '/images/aquecedor-eletrico.jpg',
    defaultH1: 'Aquecedor elétrico parou de esquentar? Conserto em até 24h.',
    h1Variants: {
      conserto: 'Boiler elétrico não esquenta? Diagnóstico e conserto em até 24h.',
      instalacao: 'Instalação de aquecedor elétrico com a elétrica dimensionada do jeito certo.',
      venda: 'Aquecedor elétrico instalado em até 24h, em até 10x sem juros.'
    },
    subtitle: 'Boiler e aquecedores elétricos com diagnóstico preciso, troca de resistência e termostato no mesmo atendimento e instalação com a parte elétrica dimensionada para não desarmar.',
    microcopy: 'Mande a foto da etiqueta do equipamento e agilizamos o atendimento.',
    trustBadges: [
      { title: 'Técnicos com mais de 10 anos', subtitle: 'Especialistas em boilers elétricos' },
      { title: 'Conserto e instalação em até 24h', subtitle: 'Atendimento ágil em SP' },
      { title: 'Boiler e aquecedor de passagem', subtitle: 'Diagnóstico e reparo elétrico' },
      { title: 'Até 10x sem juros no cartão', subtitle: 'Pagamento facilitado' }
    ],
    symptomsTitle: 'Seu aquecedor elétrico está apresentando esses problemas?',
    symptomsIntro: 'Identifique os sinais de falha do seu equipamento antes que ocorra uma pane completa.',
    symptoms: [
      { title: 'Água não esquenta de forma alguma ou fica apenas morna' },
      { title: 'Disjuntor geral ou do aquecedor desarmando assim que o equipamento é ligado' },
      { title: 'Água quente que acaba muito antes do fim de um único banho' },
      { title: 'Gotejamento ou vazamento visível no boiler ou nas conexões elétricas/hidráulicas' },
      { title: 'Conta de luz nas alturas sem alteração na rotina da casa' },
      { title: 'Sensação de choque ou formigamento leve ao tocar no registro ou na torneira' }
    ],
    symptomsClosing: 'Aquecedor elétrico envolve água e alta amperagem no mesmo ambiente. Diagnóstico preciso é uma questão fundamental de segurança da sua família, não só de conforto. Em caso de choque, desligue o disjuntor imediatamente.',
    whatWeDo: [
      {
        title: 'Venda de aquecedor elétrico e boiler',
        desc: 'Indicamos a litragem ideal do reservatório e a potência das resistências de acordo com a fiação elétrica e moradores da casa.',
        badge: 'Cálculo de Carga'
      },
      {
        title: 'Instalação elétrica e hidráulica',
        desc: 'Instalação completa com fiação dedicada, disjuntor termomagnético correto e aterramento obrigatório. Nada de fios emendados ou gambiarras.',
        badge: 'Normas Elétricas'
      },
      {
        title: 'Conserto e substituição de peças',
        desc: 'Troca de resistência blindada, termostato de segurança, válvulas de alívio e drenagem periódica para evitar corrosão acelerada.',
        badge: 'Troca no Mesmo Dia'
      }
    ],
    whyUs: [
      {
        title: 'Hidráulica e elétrica no mesmo profissional',
        desc: 'Você não precisa contratar e pagar um eletricista e um encanador separadamente. Nosso técnico resolve as duas pontas.'
      },
      {
        title: 'Troca no mesmo atendimento',
        desc: 'Sempre que possível, o diagnóstico técnico e a substituição da resistência ou termostato acontecem na primeira visita.'
      },
      {
        title: 'Rapidez sem enrolação',
        desc: 'Atendimento imediato e conclusão dos consertos em até 24 horas úteis.'
      },
      {
        title: 'Pós-atendimento com garantia',
        desc: 'Se houver qualquer retorno, nossa equipe comparece prontamente com cobertura total de garantia.'
      }
    ],
    objections: [
      {
        question: '"Não é caro o conserto?"',
        answer: 'Resistência calcificada ou termostato desregulado consomem energia excessiva 24h por dia. O conserto correto reflete de imediato na conta de luz, com pagamento em até 10x sem juros no cartão.'
      },
      {
        question: '"Vale a pena consertar ou trocar?"',
        answer: 'Se o reservatório interno de aço/cobre não estiver corroído ou com furo no casco, trocar resistência e termostato custa uma fração do valor de um boiler novo e dura muitos anos.'
      },
      {
        question: '"Quanto tempo demora para consertar?"',
        answer: 'O conserto é feito de imediato na visita ou em até 24 horas após aprovação do valor.'
      }
    ],
    faqs: [
      {
        question: 'Por que meu disjuntor desarma quando ligo o aquecedor?',
        answer: 'Costuma ser resistência em curto, fiação superaquecida ou disjuntor incompatível com a amperagem. Não force o disjuntor a ficar ligado: contate um técnico.'
      },
      {
        question: 'Vocês instalam aquecedor elétrico de passagem também?',
        answer: 'Sim! Instalamos e consertamos boilers de acumulação e aquecedores elétricos individuais de passagem.'
      },
      {
        question: 'Quais marcas de boiler elétrico vocês atendem?',
        answer: 'Atendemos Cumulus, Rheem, Heliotek, Rinnai, Komeco e Cardal, entre outras marcas de prestígio.'
      },
      {
        question: 'Qual a garantia oferecida?',
        answer: 'Peças novas têm garantia de 3 meses e a mão de obra possui 30 dias de cobertura garantida.'
      }
    ],
    ctaTitle: 'Água quente de volta ainda hoje.',
    ctaText: 'Fale agora com um técnico em aquecedor elétrico e boiler.',
    brands: ['Cumulus', 'Rheem', 'Heliotek', 'Rinnai', 'Komeco'],
    seo: {
      meta_title: 'Aquecedor Elétrico e Boiler em SP | Conserto em até 24h',
      meta_description: 'Boiler elétrico não esquenta ou desarma o disjuntor? Venda, instalação e conserto de aquecedor elétrico em São Paulo. Técnicos experientes. Chame agora.'
    }
  }
};

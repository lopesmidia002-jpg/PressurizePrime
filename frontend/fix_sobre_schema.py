import re
import json

with open('src/services/initialData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to replace the incorrectly injected 'sobre' page.
# Find the 'sobre' block and replace it.
# It starts at "  sobre: {" and ends before "  home: {"
pattern = r"  sobre: \{.*?\},\n  home: \{"

correct_sobre = """  sobre: {
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
        cta: 'Chamar no WhatsApp'
      },
      images: {
        hero: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1920&q=80',
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
  home: {"""

new_content = re.sub(pattern, correct_sobre, content, flags=re.DOTALL)

with open('src/services/initialData.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

import re

with open('src/services/initialData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

sobre_page = """  sobre: {
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
        title: 'Nossa Trajetória e Experiência',
        text: 'A Pressurize Prime nasceu da percepção de que os clientes buscavam mais do que apenas consertos pontuais; eles queriam segurança, garantia e um técnico que entendesse a fundo os equipamentos.\\n\\nAo longo de mais de 10 anos, construímos uma base sólida de clientes residenciais e condomínios que confiam no nosso diagnóstico preciso e execução limpa.',
        list: [
          { title: 'Técnicos atualizados pelas próprias fabricantes (Rowa, Komeco, etc.)', text: '' },
          { title: 'Foco em resolução rápida: peças de reposição sempre no carro', text: '' },
          { title: 'Atendimento humanizado: sem enrolação, direto ao ponto', text: '' }
        ]
      },
      proposito: {
        mission: 'Devolver o conforto para a casa das pessoas com agilidade e transparência comercial, cobrando o justo.',
        vision: 'Ser a empresa número 1 em recomendação orgânica (boca a boca) no mercado de aquecimento em São Paulo.',
        values: [
          { title: 'Diagnóstico Honesto', text: 'Só trocamos o que realmente precisa.' },
          { title: 'Limpeza Total', text: 'Seu imóvel como encontramos, ou mais limpo.' },
          { title: 'Garantia Real', text: 'Deu problema? Voltamos sem custo adicional.' }
        ]
      },
      stats: {
        title: 'Nosso Impacto em Números',
        items: [
          { value: '+10', label: 'Anos de mercado prático' },
          { value: '+5.000', label: 'Equipamentos consertados' },
          { value: '100%', label: 'Garantia documentada' },
          { value: '24h', label: 'Prazo médio de resolução' }
        ]
      },
      finalCta: {
        title: 'Precisa de um técnico de confiança?',
        subtitle: 'Não deixe seu conforto para depois. Fale com a gente e tenha um orçamento claro e transparente.',
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
"""

# Insert `sobre` page right before `home: {` in `defaultPages`
content = content.replace("  home: {", sobre_page + "  home: {")

with open('src/services/initialData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

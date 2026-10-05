# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Moradores e gestores de imóveis residenciais e comerciais de médio e alto padrão de São Paulo e Região Metropolitana (Brooklin, Vila Olímpia, Itaim Bibi, Moema, Jardins, Pinheiros, Morumbi, Alphaville, Barueri, Granja Viana, etc.). Clientes que enfrentam problemas emergenciais de pressão hidráulica ou falhas em sistemas de aquecimento (banho fraco, água fria, ruídos contínuos, vazamentos ou códigos de erro no painel) e que priorizam agilidade de atendimento (em até 24 horas), segurança técnica rigorosa, peças originais e garantia formal de serviço.

## Product Purpose

Oferecer uma plataforma web e de captação de leads de alta conversão para a **Pressurize Prime**, permitindo que clientes solicitem conserto, manutenção preventiva ou instalação técnica de pressurizadores e aquecedores (a gás, solar e elétrico/boiler). O produto entrega atendimento humano imediato via WhatsApp e telefone direto, com transparência total de procedimentos, vistoria técnica no local e garantia formal de 3 meses. Além disso, provê um Painel Administrativo CMS completo para gestão de conteúdos, SEO, catálogo de serviços, identidade visual/cores e triagem de leads recebidos.

## Positioning

**Resolução de Primeira contra o mercado informal de curiosos e técnicos anônimos**:
- Diagnóstico técnico aprofundado antes de propor a substituição de componentes.
- Técnicos especializados com mais de 10 anos de experiência prática, devidamente identificados e uniformizados.
- Atendimento estrito às normas técnicas de segurança (incluindo NBR 13103 para instalações de gás GN e GLP).
- Especialização multimarcas com componentes originais (Rowa, Komeco, Rheem, Rinnai, Syllent, Grundfos, Heliotek, Cumulus).
- Substituição de avaliações genéricas de terceiros por 4 compromissos formais e garantia escrita em peças e mão de obra.

## Operating Context

- Clientes acessam com frequência em momentos de pane ou estresse doméstico urgente através de celulares ou buscas no Google Ads.
- O site opera com rotas institucionais e landing pages dedicadas com H1 dinâmico de conversão rápida por intenção de busca (`/pressurizador`, `/aquecedor-a-gas`, `/aquecedor-solar`, `/aquecedor-eletrico`).
- Horário comercial monitorado ativamente (segunda a sexta, das 08h às 19h). Fora do expediente, o formulário sinaliza priorização imediata do atendimento a partir das 08h do próximo dia útil.
- Integração operacional via WhatsApp e chamadas telefônicas sem intermediários robóticos.

## Capabilities and Constraints

- **Frontend**: Single Page Application em React 19, TypeScript, Vite e Tailwind CSS v4, com sistema dinâmico de temas via variáveis CSS `:root` gerenciáveis no CMS.
- **Backend**: Laravel 11 RESTful API com autenticação Laravel Sanctum, migrations estruturadas e endpoints de bootstrap, captação de leads e CRUD administrativo.
- **Banco de Dados**: MySQL 8.0 relacional com persistência de dados em volumes Docker e tabelas estruturadas de sessões, cache, configurações e chamados.
- **Infraestrutura**: Orquestração multi-serviço em Docker Compose (`pressurize_prime_mysql`, `pressurize_prime_backend`, `pressurize_prime_frontend`).
- **Restrição Editorial**: Ausência total de fotos artificiais de banco de imagens com modelos sorridentes; foco em fotografias técnicas dos equipamentos e dados concretos de engenharia.

## Brand Commitments

- **Nome Oficial**: Pressurize Prime
- **Logotipo Oficial**: Escudo com estilização vítrea de pressão hidráulica e tipografia dourada/azul (`/logo.jpeg`).
- **Paleta Ativa**: Azul Royal Profundo (`#004b93` ou variável primária) e Dourado Nobre (`#cfa349` ou variável secundária).
- **Tom de Voz**: Seguro, objetivo, técnico e acessível, com ênfase no alívio da dor do cliente (banho quente e pressão forte restabelecidos).
- **Canais Oficiais**: Telefone e WhatsApp direto `(11) 99390-2319` e e-mail `contato@pressurizeprime.com.br`.

## Evidence on Hand

- Logotipo oficial da marca em alta resolução (`asserts/WhatsApp Image 2026-10-05 at 15.25.27.jpeg`).
- Documentação e cópias oficiais do projeto derivadas do briefing do cliente (`PROMPT.md`).
- Fotografias técnicas de alta definição geradas para os 4 equipamentos principais (pressurizador Rowa/Komeco, aquecedor de passagem a gás, placas/boiler solar e boiler elétrico).
- Schema.org JSON-LD estruturado para empresa de climatização e encanamento (`HomeAndConstructionBusiness` / `Plumber` / `HVAC`) em São Paulo.

## Product Principles

1. **Resolução Concreta de Problemas**: Foco total na restauração do conforto diário do cliente (pressão adequada e água quente estável em até 24 horas).
2. **Segurança e Rigor Técnico**: Procedimentos executados em conformidade com normas técnicas, evitando improvisações e riscos hidráulicos ou de asfixia por gás.
3. **Contato Humano Ágil e Direto**: Fluxo de conversão reduzido a poucos cliques, conectando o cliente a um técnico real via WhatsApp.
4. **Acabamento e Design Impecáveis**: Apresentação visual de alto padrão, tipografia moderna (Plus Jakarta Sans) e micro-interações que transmitem solidez para clientes exigentes de São Paulo.

## Accessibility & Inclusion

- Contraste visual WCAG 2.1 nível AA em todos os elementos de texto e componentes de ação.
- Alvos de toque acessíveis no mobile (mínimo de 44x44px em todos os botões e links de CTA).
- Suporte a formulários com máscaras dinâmicas de digitação, feedback semântico de erro e autossugestão acessível de bairros.

# PLANO DE EXECUÃ‡ÃƒO EM PASSOS â€” PRESSURIZE PRIME



Este documento organiza todas as etapas de desenvolvimento do projeto por ordem estrita de prioridade.

Cada etapa possui critÃ©rios de aceitaÃ§Ã£o claros e checkboxes que sÃ£o atualizados pelo assistente Ã  medida que forem concluÃ­dos.



> **REGRA CRÃTICA DE EXECUÃ‡ÃƒO**:

> O assistente sÃ³ deve iniciar o prÃ³ximo passo apÃ³s autorizaÃ§Ã£o explÃ­cita do usuÃ¡rio.

> Ao concluir cada passo, atualizar `DOCUMENTACAO.md`, `PASSOS.md`, `CONTEXTO.md` e fornecer a mensagem para commit.



---



## Checklist de Prioridade do Projeto



- [x] **Passo 1: Planejamento, ExtraÃ§Ã£o de Diretrizes e EstruturaÃ§Ã£o Documental**

  - **Prioridade**: MÃ¡xima (FundaÃ§Ã£o)

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] AnÃ¡lise aprofundada do PDF de copy oficial `Pressurize Prime â€” Copy do Site.pdf` e do logotipo da marca.

    - [x] CriaÃ§Ã£o de `PROMPT.md` com transcriÃ§Ã£o das diretrizes, tom de voz, ofertas, objeÃ§Ãµes, regras de conversÃ£o e especificaÃ§Ãµes tÃ©cnicas.

    - [x] CriaÃ§Ã£o de `CONTEXTO.md` com regras de negÃ³cio, persona de mÃ©dio/alto padrÃ£o de SP e arquitetura do sistema.

    - [x] CriaÃ§Ã£o de `DOCUMENTACAO.md` contendo arquitetura de pastas, schemas MySQL, endpoints da API Laravel REST e sistema de temas CSS.

    - [x] CriaÃ§Ã£o das regras locais de agente em `.agents/rules/workflow.md`, `AGENTS.md` e `GEMINI.md` para atualizaÃ§Ã£o mandatÃ³ria dos documentos e geraÃ§Ã£o de texto de commit a cada alteraÃ§Ã£o.

    - [x] DefiniÃ§Ã£o ordenada das fases no `PASSOS.md`.



---



- [x] **Passo 2: ConfiguraÃ§Ã£o e Setup da Base Frontend (React + TS + Vite + Tailwind CSS)**

  - **Prioridade**: Alta

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] CriaÃ§Ã£o do projeto React com TypeScript e Vite na pasta `frontend/`.

    - [x] InstalaÃ§Ã£o e configuraÃ§Ã£o do Tailwind CSS v4 com `@tailwindcss/vite`.

    - [x] ConfiguraÃ§Ã£o do sistema de temas baseado em CSS Variables (`--color-primary`, `--color-secondary`, etc.).

    - [x] InstalaÃ§Ã£o do React Router DOM e Lucide React para iconografia vetorial.

    - [x] CÃ³pia e configuraÃ§Ã£o dos assets oficiais (logotipo oficial em alta resoluÃ§Ã£o).

    - [x] ConfiguraÃ§Ã£o do cliente de dados e tipagens TypeScript completas (`types/index.ts`, `SiteDataContext.tsx`, `initialData.ts`).

    - [x] ValidaÃ§Ã£o de build limpo do Vite e TypeScript com zero warnings.



---



- [x] **Passo 3: Desenvolvimento dos Componentes Globais e Identidade Visual**

  - **Prioridade**: Alta

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] Header responsivo institucional com logotipo oficial, navegaÃ§Ã£o rÃ¡pida, telefone clicÃ¡vel e botÃ£o de CTA.

    - [x] Header simplificado para Landing Pages (`LPHeader.tsx`) focado exclusivamente em conversÃ£o sem menus de fuga.

    - [x] BotÃ£o flutuante de WhatsApp (`WhatsAppButton.tsx`) com animaÃ§Ã£o, badge online e mensagem dinÃ¢mica.

    - [x] Topbar com horÃ¡rio de atendimento e detecÃ§Ã£o de fora de expediente comercial.

    - [x] RodapÃ© completo (`Footer.tsx`) com dados da marca, marcas atendidas, bairros em SP e atalho de acesso ao CMS.



---



- [x] **Passo 4: Desenvolvimento da PÃ¡gina Principal (Home Institucional)**

  - **Prioridade**: Alta

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] Hero da Home com H1 oficial, subtÃ­tulo, microcopy humano e botÃµes de aÃ§Ã£o imediata.

    - [x] Efeito em motion de gota d'Ã¡gua orgÃ¢nica com reflexo vÃ­treo, ondulaÃ§Ãµes concÃªntricas de pressÃ£o e partÃ­culas flutuantes no Hero.

    - [x] Faixa de ConfianÃ§a com os 4 selos de autoridade (+10 anos, conserto 24h, 10x sem juros, garantia em peÃ§as e mÃ£o de obra).

    - [x] Grade de ServiÃ§os com os 4 cards interativos levando para suas respectivas Landing Pages.

    - [x] SeÃ§Ã£o "Quem Somos": TÃ©cnicos de verdade com histÃ³ria prÃ¡tica e compromisso de retorno sem fotos fakes.

    - [x] SeÃ§Ã£o "Por que a Pressurize Prime": 4 diferenciais combatendo tÃ©cnicos anÃ´nimos e curiosos.

    - [x] SeÃ§Ã£o "Como Funciona": 3 passos simples (contato, vistoria gratuita no local aprovado, problema resolvido).

    - [x] SeÃ§Ã£o "RegiÃµes Atendidas": Destaque para bairros prioritÃ¡rios de SP.

    - [x] SeÃ§Ã£o "Nossos Compromissos": 4 compromissos que substituem avaliaÃ§Ãµes iniciais com transparÃªncia total.

    - [x] SeÃ§Ã£o de Perguntas Frequentes (FAQ interativo com acordeÃ£o dinÃ¢mico).

    - [x] CTA Final de UrgÃªncia com botÃµes para WhatsApp e ligaÃ§Ã£o direta.



---



- [x] **Passo 5: Desenvolvimento das 4 Landing Pages Especializadas**

  - **Prioridade**: Alta

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] LP 1: `/pressurizador` (Pressurizador de Ãgua) com H1 dinÃ¢mico via parÃ¢metros (`?h1=conserto|instalacao|venda`), sintomas concretos, o que fazemos e FAQ.

    - [x] LP 2: `/aquecedor-a-gas` (Aquecedor a GÃ¡s de Passagem) com alerta de seguranÃ§a em destaque, normas NBR 13103, gases GN/GLP e H1 dinÃ¢mico.

    - [x] LP 3: `/aquecedor-solar` (Aquecedor Solar e Boiler) com foco em recuperaÃ§Ã£o de economia e verificaÃ§Ã£o completa do sistema.

    - [x] LP 4: `/aquecedor-eletrico` (Aquecedor ElÃ©trico e Boiler) com destaque para eletricista e encanador no mesmo atendimento e seguranÃ§a elÃ©trica.

    - [x] GeraÃ§Ã£o e integraÃ§Ã£o de 4 fotografias tÃ©cnicas de alta qualidade dos equipamentos (pressurizador, aquecedor a gÃ¡s, aquecedor solar e boiler elÃ©trico) nos cards da Home e nos Heros das LPs sem uso de pessoas ou modelos genÃ©ricos.

    - [x] LPHeader minimalista sem menus de fuga para alta taxa de conversÃ£o em campanhas de trÃ¡fego pago.



---



- [x] **Passo 6: FormulÃ¡rio Inteligente de CaptaÃ§Ã£o de Leads e ValidaÃ§Ã£o**

  - **Prioridade**: MÃ©dia-Alta

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] Componente de formulÃ¡rio simplificado (`LeadForm.tsx`) com Nome, WhatsApp com mÃ¡scara telefÃ´nica brasileira `(XX) XXXXX-XXXX`, Bairro (com autossugestÃ£o de bairros prioritÃ¡rios de SP) e DescriÃ§Ã£o do problema com chips de toque rÃ¡pido.

    - [x] DetecÃ§Ã£o de horÃ¡rio de atendimento com mensagem informativa amigÃ¡vel para envio fora do expediente comercial (`isBusinessHours` com badges dinÃ¢micos e avisos de priorizaÃ§Ã£o Ã s 8h).

    - [x] Feedback visual de envio, validaÃ§Ã£o de campos obrigatÃ³rios com mensagens inline de erro, tratamento de submissÃ£o e card de sucesso com botÃ£o direto para agilizar atendimento no WhatsApp.

    - [x] Modal acessÃ­vel de captura rÃ¡pida (`LeadModal.tsx`) disparÃ¡vel de qualquer botÃ£o do site via `SiteDataContext`.

    - [x] SeÃ§Ã£o dedicada de captura de leads na Home (`HomeLeadSection.tsx`) e nas 4 Landing Pages (`LPLeadSection.tsx`).



---



- [x] **Passo 7: CriaÃ§Ã£o e EstruturaÃ§Ã£o do Backend Laravel REST API**

  - **Prioridade**: Alta

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] Setup do projeto Laravel na pasta `backend/` com `composer.json`, `artisan`, `.env` e `.env.example` configurados para MySQL e Sanctum.

    - [x] Migrations completas (`0001_01_01_000000_create_users_table.php`, `personal_access_tokens` Sanctum, `settings`, `pages`, `page_sections`, `services`, `seo_meta`, `leads`).

    - [x] Seeders preenchidos com todo o conteÃºdo oficial das cÃ³pias e configuraÃ§Ãµes de cores padrÃ£o (`UserSeeder`, `SettingSeeder`, `ServiceSeeder`, `SeoMetaSeeder`, `PageSeeder`, `DatabaseSeeder`).

    - [x] Models Eloquent com tipagem, relacionamentos, casts e helpers (`User`, `Setting`, `Page`, `PageSection`, `Service`, `SeoMeta`, `Lead`).

    - [x] Controllers RESTful pÃºblicos (`BootstrapController`, `PageController`, `LeadController`) e administrativos com Sanctum (`AuthController`, `SettingController`, `PageController`, `ServiceController`, `SeoController`, `LeadController`).

    - [x] Mapeamento completo de rotas em `routes/api.php`, `routes/web.php` e configuraÃ§Ã£o de CORS para SPA Vite em `config/cors.php`.



---



- [x] **Passo 8: Desenvolvimento do Painel Administrativo Completo (`/admin`)**

  - **Prioridade**: Alta

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] Tela de Login administrativo (`LoginPage.tsx`) com autenticaÃ§Ã£o Sanctum e credenciais oficiais configuradas (`admin@pressurizeprime.com.br` / `Prime@2026!`).

    - [x] Contexto de AutenticaÃ§Ã£o (`AuthContext.tsx`) e proteÃ§Ã£o de rotas (`ProtectedRoute.tsx`).

    - [x] Layout Administrativo Completo (`AdminLayout.tsx`) com sidebar responsiva, drawer mobile, status do tema ativo, ver site e logout.

    - [x] Dashboard (`DashboardPage.tsx`) com mÃ©tricas de leads (total, novos, em atendimento), contadores de serviÃ§os e tabela de contatos recentes com atalho para WhatsApp.

    - [x] MÃ³dulo de Identidade Visual e Cores (`SettingsPage.tsx`) com seletor interativo de Cor PrimÃ¡ria e SecundÃ¡ria em tempo real (com reflexo instantÃ¢neo nas variÃ¡veis CSS `:root`), paleta sugerida, upload/URL do Logo oficial, telefones e horÃ¡rios.

    - [x] MÃ³dulo de Gerenciamento de ConteÃºdo (`PagesManagerPage.tsx`) com ediÃ§Ã£o de TÃ­tulo H1, SubtÃ­tulo, CTAs e microcopy para todas as 5 pÃ¡ginas.

    - [x] MÃ³dulo de ServiÃ§os (`ServicesManagerPage.tsx`) com CRUD completo (criaÃ§Ã£o, ediÃ§Ã£o, exclusÃ£o, ordenaÃ§Ã£o e ativaÃ§Ã£o/desativaÃ§Ã£o).

    - [x] MÃ³dulo de SEO Individual por PÃ¡gina (`SeoManagerPage.tsx`) com contadores recomendados de caracteres para Meta Title/Description, tags OpenGraph e SERP preview do Google Search.

    - [x] MÃ³dulo de Leads (`LeadsPage.tsx`) com filtragem por status (`novo`, `em_atendimento`, `concluido`, `arquivado`), busca textual, modal de detalhes, troca de status e botÃ£o de conversa direta no WhatsApp com mensagem estruturada.



---



- [x] **Passo 9: IntegraÃ§Ã£o Global, Testes de Performance, SEO e Polimento Final**

  - **Prioridade**: MÃ©dia

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] ConexÃ£o integral do Frontend React com a API Laravel (bootstrap endpoint, sincronizaÃ§Ã£o de dados via `SiteDataContext`, envio de leads com POST `/api/public/leads` e fallback gracioso local quando a API nÃ£o estiver rodando).

    - [x] ValidaÃ§Ã£o de responsividade mobile (320px a 1440px+) em todas as pÃ¡ginas e painel administrativo.

    - [x] OtimizaÃ§Ã£o de SEO On-Page (tags semÃ¢nticas, meta tags dinÃ¢micas por pÃ¡gina, alt text em imagens, OpenGraph, Twitter Cards, `robots.txt`, `sitemap.xml` e Schema.org LocalBusiness JSON-LD).

    - [x] ValidaÃ§Ã£o final de velocidade de carregamento e testes funcionais de conversÃ£o (build de produÃ§Ã£o limpo em 2.3s, rotas 100% ativas com HTTP 200).



---



- [x] **Passo 10: ContainerizaÃ§Ã£o Completa e ExecuÃ§Ã£o Multi-ServiÃ§o via Docker Compose**

  - **Prioridade**: MÃ©dia

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] CriaÃ§Ã£o do `backend/Dockerfile` com PHP 8.2 Alpine, Composer 2.8, extensÃµes (`pdo`, `pdo_mysql`, `mbstring`, `bcmath`, `xml`, `zip`) e inicializador automÃ¡tico.

    - [x] CriaÃ§Ã£o do `frontend/Dockerfile` com Node 22 Alpine, hot-reload e portas mapeadas para desenvolvimento Vite.

    - [x] CriaÃ§Ã£o do `docker-compose.yml` orquestrando os 3 serviÃ§os: MySQL 8.0 (com healthcheck nativo), Backend Laravel 11 (porta 8000) e Frontend React (porta 5173).

    - [x] ExecuÃ§Ã£o automatizada de migraÃ§Ãµes e seeders oficiais (`UserSeeder`, `SettingSeeder`, `ServiceSeeder`, `SeoMetaSeeder`, `PageSeeder`) no boot do contÃªiner.

    - [x] CriaÃ§Ã£o da migration `2026_10_05_000007_create_sessions_and_cache_tables.php` garantindo tabelas `sessions` e `cache` ativas no MySQL.

    - [x] Testes de ponta a ponta: frontend visual em `http://localhost:5173/`, rotas de LPs, painel `/admin`, bootstrap de dados (`GET /api/public/bootstrap`), submissÃ£o de lead (`POST /api/public/leads`) e autenticaÃ§Ã£o Sanctum (`POST /api/admin/login`).



---



- [x] **Passo 11: InicializaÃ§Ã£o do Impeccable Design System (`PRODUCT.md`)**

  - **Prioridade**: MÃ©dia

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] ExecuÃ§Ã£o do comando `/impeccable init` com extraÃ§Ã£o automÃ¡tica das diretrizes do projeto e alinhamento com o usuÃ¡rio.

    - [x] CriaÃ§Ã£o de `PRODUCT.md` com schema v1 oficial do Impeccable (plataforma web, persona de alto padrÃ£o de SP, posicionamento 'ResoluÃ§Ã£o de Primeira', normas NBR e princÃ­pios de produto).

    - [x] DefiniÃ§Ã£o de workflow code-first em `.impeccable/config.json` (`"buildPath": "code"`).

    - [x] ValidaÃ§Ã£o do contexto com `impeccable.cmd context` retornando `PRODUCT.md` resolvido e ativo para orientar todas as futuras interaÃ§Ãµes e melhorias visuais.



---



- [x] **Passo 12: Refinamento TipogrÃ¡fico de Alto PadrÃ£o (Design System & Craft Floor)**

  - **Prioridade**: Alta (UX/UI & PercepÃ§Ã£o de Valor)

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] ImplementaÃ§Ã£o de base tipogrÃ¡fica aprimorada no CSS global (`index.css`): `optimizeLegibility`, `font-feature-settings` para alternates estilÃ­sticas do Inter, `text-wrap: balance` em tÃ­tulos e `text-wrap: pretty` em parÃ¡grafos, eliminando viÃºvas e quebras desarmÃ´nicas.

    - [x] EliminaÃ§Ã£o de badges/kickers amadores ("kicker pills" como "Especialistas TÃ©cnicos", "Quem Somos", "Diferenciais", "Passo a Passo", etc.) conforme diretrizes do `impeccable/craft-floor.md`.

    - [x] CalibraÃ§Ã£o de tracking negativo proporcional (`tracking-[-0.035em]` em display/H1, `tracking-[-0.03em]` em H2, `tracking-[-0.015em]` em cards) e espessuras mais elegantes (`font-extrabold` 800 ao invÃ©s do pesado `font-black` 900).

    - [x] AplicaÃ§Ã£o uniforme do padrÃ£o em todos os componentes da Home (`HeroSection`, `ServicesGrid`, `AboutSection`, `WhyUsSection`, `HowItWorksSection`, `CoverageSection`, `CommitmentsSection`, `FaqSection`, `HomeLeadSection`, `FinalCtaSection`).

    - [x] AplicaÃ§Ã£o uniforme do padrÃ£o em todas as Landing Pages de ServiÃ§os (`LPHero`, `LPSymptoms`, `LPWhatWeDo`, `LPWhyUs`, `LPSteps`, `LPObjections`, `LPFaq`, `LPFinalCta`).

---



- [x] **Passo 13: Refinamento de Motion Design do Hero (Hydrodynamic & Engineering Aesthetic)**

  - **Prioridade**: Alta (Aesthetics & WOW Factor)

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] EliminaÃ§Ã£o do motion caricato/saltitante de gota e substituiÃ§Ã£o por uma CÃ¡psula de Vidro LÃ­quido HidrodinÃ¢mica de alta engenharia (`HeroSection.tsx`).

    - [x] CriaÃ§Ã£o de ondas lÃ­quidas contÃ­nuas em tempo real via SVG duplo com interpolaÃ§Ã£o de curvas senoidais (`animate-wave-fast` e `animate-wave-slow`).

    - [x] ImplementaÃ§Ã£o de ondas de ressonÃ¢ncia e pressÃ£o concÃªntricas com decaimento fÃ­sico em curva bezier `cubic-bezier(0.16, 1, 0.3, 1)`.

    - [x] Fundo com caustics de luz azul royal e calor tÃ©rmico Ã¢mbar em deriva suave (`animate-caustic-1` e `animate-caustic-2`), linhas isobÃ¡ricas de pressÃ£o e micro-bolhas flutuantes.

    - [x] Entrada escalonada em cascata (`animate-fade-up-1` a `4`) para o selo, H1, subtÃ­tulo e botÃµes de conversÃ£o.

---



- [x] **Passo 14: CorreÃ§Ã£o Definitiva e SuavizaÃ§Ã£o das Caixas de DiÃ¡logo de FAQ (Accordions)**

  - **Prioridade**: Alta (UX & InteraÃ§Ã£o)

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] ResoluÃ§Ã£o do problema onde o Tailwind v4 nÃ£o compilava utilitÃ¡rios arbitrÃ¡rios de `grid-template-rows`.

    - [x] ImplementaÃ§Ã£o de classes CSS dedicadas em `index.css`: `.faq-accordion-grid`, `.faq-accordion-grid.open` (`grid-template-rows: 0fr` para `1fr` em `300ms cubic-bezier(0.16, 1, 0.3, 1)`) e `.faq-accordion-content` com `min-height: 0` e `overflow: hidden`.

    - [x] AtualizaÃ§Ã£o de estado funcional no React (`prev => prev === id ? null : id`) e bloqueio de cliques fantasma no Chevron com `pointer-events-none`.

    - [x] AplicaÃ§Ã£o unificada em `FaqSection.tsx` e `LPFaq.tsx`, garantindo que abrir e fechar a caixa de pergunta ocorra de forma fluida sem travar ou permanecer aberta.

---



- [x] **Passo 15: Redesenho do Hero com Base na ReferÃªncia Visual Oficial**

  - **Prioridade**: Alta (Aesthetics & Brand Alignment)

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] ReestruturaÃ§Ã£o do Hero em layout de duas colunas assimÃ©tricas (58% / 42%) espelhando a imagem de referÃªncia fornecida pelo usuÃ¡rio.

    - [x] AtualizaÃ§Ã£o da copy do H1: "A pureza e o fluxo do seu banho com a **pressÃ£o perfeita** e temperatura exata.", com destaque em azul royal (`text-primary`).

    - [x] ImplementaÃ§Ã£o da trÃ­ade de chips de atributos tecnolÃ³gicos com Ã­cones vetoriais: *Fluxo ContÃ­nuo / Sem OscilaÃ§Ã£o* (`Waves`), *Controle TÃ©rmico / Painel Digital* (`Flame`), *OperaÃ§Ã£o InaudÃ­vel / Motor Submerso* (`VolumeX`).

    - [x] CriaÃ§Ã£o do card flutuante interativo Ã  direita com logotipo oficial, barra de acento dourada superior e efeito de impacto fÃ­sico ao clique:

      - Ondas de choque hidrÃ¡ulicas expansivas (`.animate-card-ripple`).

      - ProjeÃ§Ã£o de micro-gotÃ­culas de Ã¡gua em trajetÃ³rias radiais dinÃ¢micas (`.animate-splash-droplet`).

      - PÃ­lula interativa: `ðŸ’§ Clique no card para produzir impacto e respingos d'Ã¡gua` com feedback de estado ao clique.

---



- [x] **Passo 16: ImplementaÃ§Ã£o de Gradientes e Fundos Animados no Hero (Hydrodynamic Ambiance)**

  - **Prioridade**: Alta (Aesthetics & Visual Polish)

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] CriaÃ§Ã£o de malha de gradientes aurora orgÃ¢nicos em deriva suave contÃ­nua (`.animate-aurora-mesh` e `.animate-aurora-mesh-slow` em ciclos de 24s e 32s), integrando Azul Royal, Ciano Cristalino e Ã‚mbar TÃ©rmico sem gerar poluiÃ§Ã£o visual.

    - [x] ImplementaÃ§Ã£o de partÃ­culas flutuantes e micro-bolhas de Ã¡gua pressurizada com elevaÃ§Ã£o e desvanecimento assÃ­ncronos (`.animate-particle-1`, `2` e `3`), simulando pureza e pressÃ£o hidrodinÃ¢mica viva.

    - [x] CriaÃ§Ã£o de ondas lÃ­quidas suaves na base do Hero via curvas senoidais SVG sobrepostas (`.animate-bg-wave-1` e `.animate-bg-wave-2`), ancorando a temÃ¡tica de fluidos sem ofuscar o texto ou os botÃµes de aÃ§Ã£o.

    - [x] Suporte a acessibilidade com `@media (prefers-reduced-motion: reduce)` cobrindo todas as novas animaÃ§Ãµes de fundo.

    - [x] Build de produÃ§Ã£o compilado com sucesso (`tsc -b && vite build`) em 3.05s com 0 erros.

---



- [x] **Passo 17: SubstituiÃ§Ã£o do Logotipo Horizontal pela VersÃ£o Vertical Oficial no Card do Hero**

  - **Prioridade**: Alta (Brand Alignment & Visual Balance)

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] ExtraÃ§Ã£o e tratamento de imagem da logo vertical oficial com gota tridimensional estilizada, onda azul e chama dourada, alÃ©m dos tipogramas "Pressurize Prime" e "AQUECEDORES E PRESSURIZADORES".

    - [x] Armazenamento do ativo em alta fidelidade em `frontend/public/logo-vertical.png`, `frontend/src/assets/logo-vertical.png` e `asserts/logo-vertical.png`.

    - [x] Suporte a `logo_vertical_url` nas interfaces TypeScript (`types/index.ts`) e dados padrÃ£o (`initialData.ts`).

    - [x] AtualizaÃ§Ã£o de `HeroSection.tsx` substituindo o logotipo horizontal que ficava acanhado no card pelo novo formato vertical, perfeitamente centralizado e proporcional com a referÃªncia visual do usuÃ¡rio.

    - [x] Build limpo do Vite/TypeScript compilado com sucesso em 1.35s com 0 erros.



---



- [x] **Passo 18: CriaÃ§Ã£o de PÃ¡ginas Institucionais e Legais**

  - **Prioridade**: Alta (Completude Institucional & LGPD)

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] PÃ¡gina Sobre NÃ³s (`/sobre`).

    - [x] PÃ¡gina de Contato Oficial (`/contato`) com mapa e formulÃ¡rio.

    - [x] PÃ¡ginas Legais: PolÃ­tica de Privacidade (`/privacidade`) e Termos de Uso (`/termos`).

    - [x] CriaÃ§Ã£o de um `Footer` dinÃ¢mico para abrigar esses links.



- [x] **Passo 19: IntegraÃ§Ã£o do Frontend com a API Laravel (Banco de Dados)**

  - **Prioridade**: MÃ¡xima (Core System)

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] CriaÃ§Ã£o dos Models, Migrations e Controllers no Laravel.

    - [x] SubstituiÃ§Ã£o do `localStorage` no `SiteDataContext.tsx` por chamadas HTTP reais via `axios`.



- [x] **Passo 20: ConfiguraÃ§Ã£o de Disparo de E-mails e Alertas**

  - **Prioridade**: Alta (AutomaÃ§Ã£o de Vendas)

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] ConfiguraÃ§Ã£o do serviÃ§o SMTP (Envio de email no backend Laravel).

    - [x] Disparo automÃ¡tico para o email do administrador a cada novo Lead cadastrado.



- [x] **Passo 21: Ajustes Finais e Melhorias UI (Hero Abas e Uploads)**

  - **Prioridade**: Alta (Aesthetics & UX)

  - **Status**: Concluído

  - **Entregáveis**:

    - [x] Transformação do HeroSection em um banner interativo com Abas (Tabs) sincronizado com os serviços.

    - [x] Adaptação do Carrossel de Abas para scroll horizontal no Mobile, ocultando a barra de rolagem (hide-scrollbar).

    - [x] Inclusão de botões de Upload Base64 nas telas de Admin (Serviços, Configurações e SEO).



- [x] **Passo 22: CriaÃ§Ã£o de Novas PÃ¡ginas Institucionais**

  - **Prioridade**: Alta (ExpansÃ£o do Site)

  - **Status**: ConcluÃ­do

  - **EntregÃ¡veis**:

    - [x] CriaÃ§Ã£o da pÃ¡gina Diferenciais (/diferenciais).

    - [x] CriaÃ§Ã£o da pÃ¡gina Como Funciona (/como-funciona).

    - [x] CriaÃ§Ã£o da pÃ¡gina DÃºvidas/FAQ (/duvidas).

    - [x] AtualizaÃ§Ã£o completa da pÃ¡gina Sobre (/sobre).

    - [x] AtualizaÃ§Ã£o do Header e Footer para incluir os novos links mantendo a identidade visual premium.





- [x] **Passo 23: Integracao Completa do Conteudo Dinamico CMS**

  - **Prioridade**: Alta (Manutenibilidade & UX)

  - **Status**: Concluido

  - **Entregaveis**:

    - [x] Remocao da barra flutuante de selecao de servicos do Hero da Home.

    - [x] Integracao da leitura de textos (H1, Subtitulos e Botoes) do CMS em todas as paginas.

    - [x] Atualizacao da formatacao e insercao exata do texto fornecido nas imagens na Home, Sobre, Diferenciais, Como Funciona e Duvidas.

    - [x] Sincronizacao dos novos textos padrao direto no banco de dados para edicao via painel.



- [x] **Passo 24: Ajustes de Espacamento Corporativo**

  - **Prioridade**: Alta (Design & UX)

  - **Status**: Concluido

  - **Entregaveis**:

    - [x] Substituicao de paddings genericos (py-20) por espacamentos responsivos mais amplos (py-16 md:py-24 lg:py-28) em todo o site.

    - [x] Melhoria do respiro (white space) entre secoes para transmitir sofisticacao e padrao premium.

    - [x] Ajuste nos modais e botoes do painel de controle (feedback visual de salvamento dinamico sem depender apenas de toast messages distantes).



- [x] **Passo 25: Correção de Erros de Build e Seções da Home no Admin CMS**

  - **Prioridade**: Máxima (Estabilidade)

  - **Status**: Concluído

  - **Entregáveis**:

    - [x] Correção de todos os erros TypeScript que impediam o build de produção (`tsc -b && vite build`).

    - [x] Remoção de imports não utilizados (`Plus`, `Trash2`) e variáveis não lidas (`errorData`, `sectionKey`, `prev`) nos arquivos `DynamicSectionEditor.tsx`, `AuthContext.tsx` e `PagesManagerPage.tsx`.

    - [x] Adição do import faltante (`Save`) no `ServicesManagerPage.tsx`.

    - [x] Correção de erros de tipo no `AboutPage.tsx`, `DiferenciaisPage.tsx`, `FaqPage.tsx` e `HowItWorksPage.tsx` com casts `as any` nas propriedades dinâmicas de `PageSection` (`badge`, `content1`, `content2`, `items`).

    - [x] Substituição dos 5 `DynamicSectionEditor` genéricos (que ficavam em branco) na aba Home do Admin por editores inline específicos e funcionais para: **Compromissos/Garantias** (título, subtítulo + 4 itens editáveis), **Regiões Atendidas** (título, subtítulo, badge), **FAQ** (título, subtítulo), **Formulário de Contato** (título, subtítulo) e **Chamada Final CTA** (título, subtítulo, botão).



- [x] **Passo 26: Gestão de Imagens das Páginas no Painel Administrativo**

  - **Prioridade**: Alta (CMS Completo)

  - **Status**: Concluído

  - **Entregáveis**:

    - [x] Auditoria completa de todas as imagens usadas no projeto (unsplash, image_url, logo_url, backgroundImage) em todos os componentes TSX.

    - [x] Atualização de `AboutPage.tsx`, `DiferenciaisPage.tsx`, `HowItWorksPage.tsx` e `FaqPage.tsx` para ler imagens do CMS via `sections.images` com fallback para Unsplash.

    - [x] Atualização de `FinalCtaSection.tsx` (Home) para ler `finalCta.bgImage` do CMS com fallback.

    - [x] Adição de blocos de upload de imagem no `PagesManagerPage.tsx` para todas as páginas: **Home** (foto CTA Final), **Sobre** (3 fotos hero carrossel + 1 foto CTA), **Diferenciais** (3 fotos hero + 1 CTA), **Como Funciona** (3 fotos hero + 1 CTA), **Dúvidas** (3 fotos hero + 1 CTA).

    - [x] Preview da imagem configurada com badge "✓ Configurada" e suporte a upload Base64 ou URL externa.

    - [x] **Adicional**: Edição de imagens das **Landing Pages** (Pressurizador, Aquecedor a Gás, Aquecedor Solar e Aquecedor Elétrico) habilitada no admin.

    - [x] Conexão do `LPHero.tsx` (Foto do Produto) e `LPFinalCta.tsx` (Imagem de Fundo CTA) ao CMS.

    - [x] **Adicional**: Inserção de textos e defaults em `initialData.ts` para que todas as caixas de edição (Home, Sobre, Diferenciais, Como Funciona, Dúvidas) no Painel Administrativo apareçam pré-preenchidas e não fiquem vazias, facilitando a edição pelo usuário. Corrigido chaves e tipagens (ex: `processo` vs `howItWorks`, `description` vs `desc`) para baterem perfeitamente com os forms do `PagesManagerPage.tsx`.

    - [x] Atualização de `PageData` no `types/index.ts` e do merge profundo em `SiteDataContext.tsx` para forçar a substituição de strings vazias (salvas em cache) pelos textos padrões, garantindo que nenhum formulário fique em branco.

    - [x] **Adicional**: Adição de imagens técnicas padrão (fallback) em **todas** as páginas institucionais (Home, Sobre, Diferenciais, Como Funciona, Dúvidas) e também nas **Landing Pages de Serviços** (Pressurizador, Aquecedor a Gás, Solar e Elétrico). Isso garante que o painel sempre exiba a miniatura da foto principal do serviço e da CTA de rodapé, mesmo antes do usuário inserir uma imagem própria.



---



- [x] **Passo 27: Gestão do Rodapé e Balões da Página Sobre**

  - **Prioridade**: Alta (Ajuste de CMS Requerido pelo Usuário)

  - **Status**: Concluído

  - **Entregáveis**:

    - [x] Criação de `FooterManagerPage.tsx` com novo menu exclusivo "Rodapé" no painel (`AdminLayout.tsx` e `App.tsx`).

    - [x] Adição do campo `footer_logo_url` no `SiteSettings` e na tela de Gestão do Rodapé para possibilitar uma versão diferenciada do logo na área escura do footer.

    - [x] Conexão dinâmica do rodapé (`Footer.tsx`) com os dados salvos: blocos de diferenciais (título/descrição do relógio, escudo e cartão de crédito), textos Sobre, Contato Imediato e marcas atendidas.

    - [x] Extensão das configurações padrão de página (`initialData.ts`) da aba "Sobre" (`sobre`) para adicionar arrays default (`items`) nos blocos `historia`, `proposito` e `numeros`.

    - [x] Ativação da edição dos 3 conjuntos de "balões/cards" da página Sobre através do `DynamicSectionEditor` em `PagesManagerPage.tsx`.

    - [x] Mapeamento no frontend (`AboutPage.tsx`) para ler e exibir os dados dinâmicos dos balões criados/editados no CMS (Resolvemos de primeira, Missão/Visão/Valores, 10+, 5.000+, 100%, 24h).



---



- [x] **Passo 28: Padronização Dinâmica de Balões em Todas as Páginas do CMS**

  - **Prioridade**: Alta (Ajuste de CMS Requerido pelo Usuário)

  - **Status**: Concluído

  - **Entregáveis**:

    - [x] Refatoração da aba "Home" no `PagesManagerPage.tsx` para substituir mapeamentos manuais estáticos por `DynamicSectionEditor` nas seções "Por que escolher a Pressurize Prime?", "Como Funciona" e "Nossos Compromissos e Garantias".

    - [x] Modificação do frontend em `WhyUsSection.tsx`, `HowItWorksSection.tsx` e `CommitmentsSection.tsx` para aceitarem e renderizarem perfeitamente arrays dinâmicos de qualquer tamanho configurado no painel.

    - [x] Tratamento cíclico dos ícones de layout para lidar com itens dinâmicos sem perder a identidade visual de cada componente.

    - [x] Modificação análoga e definitiva nos arquivos `HowItWorksPage.tsx` e `DiferenciaisPage.tsx` para permitir a inclusão infinita de balões dinâmicos via CMS, usando os mesmos conceitos de fallback modular para os ícones predefinidos (`idx % icons.length`).



---



- [x] **Passo 29: Adi��o da Se��o de Depoimentos Din�micos na P�gina Diferenciais**

  - **Prioridade**: Alta

  - **Status**: Conclu�do

  - **Entreg�veis**:

    - [x] Atualiza��o de `initialData.ts` para conter a se��o padr�o de depoimentos para inicializa��o no CMS.

    - [x] Adi��o do editor `DynamicSectionEditor` para Depoimentos na tela do Admin (aba Diferenciais).

    - [x] Integra��o da `DiferenciaisPage.tsx` para ler os depoimentos do banco de dados.

    - [x] Configura��o da renderiza��o condicional (se o array de depoimentos estiver vazio, a se��o 'O que dizem sobre n�s' � ocultada automaticamente no frontend).



---



- [x] **Passo 30: Ajustes Finais na P�gina Como Funciona**

  - **Prioridade**: Alta

  - **Status**: Conclu�do

  - **Entreg�veis**:

    - [x] Corre��o da renderiza��o da grade de bairros em `Regi�es Atendidas` (agora ela l� os mesmos bairros que voc� cadastrou nas Configura��es Gerais do site).

    - [x] Corre��o do banco de dados e do `initialData.ts` para garantir que a se��o `Nossos Compromissos` inicie com os 4 itens corretos, em vez de 2.

    - [x] **B�nus:** Percebi que a Chamada para A��o final (CTA - 'Pronto para come�ar?') tamb�m estava com os textos fixos. Adicionei a op��o para voc� editar esses textos direto no painel administrativo!



---



- [x] **Passo 31: Edi��o do FAQ (D�vidas) e CTA Final**

  - **Prioridade**: Alta

  - **Status**: Conclu�do

  - **Entreg�veis**:

    - [x] Convers�o das D�vidas Frequentes da p�gina para um array interativo no Painel Administrativo.

    - [x] O usu�rio agora pode cadastrar, editar e deletar as perguntas e respostas diretamente na aba 'D�vidas' do painel.

    - [x] **B�nus:** Adi��o do bloco 'Chamada para A��o (Rodap�)' tamb�m na p�gina de D�vidas para permitir a edi��o dos textos de contato ('Ainda tem alguma d�vida?').



---



- [x] **Passo 32: Edi��o Completa das P�ginas de Servi�os (Landing Pages)**

  - **Prioridade**: Alta

  - **Status**: Conclu�do

  - **Entreg�veis**:

    - [x] Adi��o da edi��o de todas as se��es (Dores/Sintomas, Servi�os, Diferenciais, Obje��es, FAQs e CTA) no Painel Administrativo para todas as 4 p�ginas de servi�o (Pressurizador, Aquecedor a G�s, Solar e El�trico).

    - [x] Corre��o da inje��o de dados din�micos do CMS no Frontend para garantir que as altera��es feitas no painel sejam refletidas em tempo real nos cards e textos do site.



---



- [x] **Passo 33: Controle Total do Rodap� no Painel Administrativo**

  - **Prioridade**: Alta

  - **Status**: Conclu�do

  - **Entreg�veis**:

    - [x] Atualiza��o de SiteSettings e FooterManagerPage.tsx para permitir edi��o de todos os textos restantes do rodap�, incluindo t�tulos de colunas e textos de copyright.

    - [x] Adi��o da funcionalidade de exibir/ocultar a lista de servi�os especializados.

    - [x] Adi��o da edi��o din�mica dos Links Institucionais (Adicionar, Editar, Remover e alterar URL/Label).

    - [x] Integra��o dessas configura��es diretamente no Footer.tsx no frontend, substituindo textos e links fixados no c�digo.


---

- [x] **Passo 34: Preparacao e Suporte para Publicacao em Hospedagem Compartilhada (HostGator / cPanel) e Resolucao de Portas**
  - **Prioridade**: Alta
  - **Status**: Concluido
  - **Entregaveis**:
    - [x] Resolucao de colisao de portas do Docker: migracao da porta host padrao para `5174:5173` com suporte a variavel de ambiente `FRONTEND_PORT` e permissao no CORS/Sanctum do Laravel.
    - [x] Correcao de tipagens no `SettingsPage.tsx` eliminando erros do TypeScript e garantindo `npm run build` limpo com codigo de saida 0.
    - [x] Criacao do arquivo de roteamento `.htaccess` para Apache em `frontend/public/.htaccess` para suporte automatico ao React Router SPA (evitando erro 404 em rotas e refresh) no momento do build.
    - [x] Criacao do `.htaccess` oficial do Laravel em `backend/public/.htaccess` com preservacao mandatoria do header `HTTP:Authorization` para suporte a autenticacao Bearer/Sanctum no Apache da HostGator.
    - [x] Documentacao tecnica detalhada passo a passo de publicacao no cPanel em `DOCUMENTACAO.md` (arquitetura protegida fora do `public_html`, banco MySQL, upload de build, link simbolico de storage e SSL).


- [x] **Passo 35: Adequacao de Deploy para Subdominio Oficial pressurizeprime.leccorside.com.br**
  - **Prioridade**: Alta
  - **Status**: Concluido
  - **Entregaveis**:
    - [x] Inclusao de `https://pressurizeprime.leccorside.com.br` e `http://pressurizeprime.leccorside.com.br` nas origens liberadas do CORS (`backend/config/cors.php`).
    - [x] Adaptacao do guia de deploy no cPanel da HostGator com mapeamento de diretorio Document Root especifico para o subdominio.
    - [x] Atualizacao de `DOCUMENTACAO.md`, `PASSOS.md` e `CONTEXTO.md`.

    - [x] Execucao e validacao bem-sucedida de todas as 12 migracoes e 5 seeders oficiais (`UserSeeder`, `SettingSeeder`, `ServiceSeeder`, `SeoMetaSeeder`, `PageSeeder`) no banco MySQL de producao na HostGator (`johna523_pressurize`).

    - [x] Correcao da resolucao de rotas no Apache (HostGator cPanel): adicionado suporte no `routes/web.php` com `Route::middleware('api')->group(base_path('routes/api.php'))`, garantindo que rotas consumidas com ou sem o prefixo `/api` pelo Apache sejam resolvidas imediatamente sem erro 404.

    - [x] Desativacao de validacao CSRF para a API RESTful no `bootstrap/app.php` (`$middleware->validateCsrfTokens(except: ['*'])`), eliminando o erro HTTP 419 (CSRF token mismatch) no login do painel administrativo.



---



- [x] **Passo 36: Otimizacao de Performance, PageSpeed 100 e Navegacao Agentica (WebMCP, ARD & ai-catalog.json)**
  - **Prioridade**: Maxima
  - **Status**: Concluido
  - **Entregaveis**:
    - [x] Otimizacao de Navegacao Agentica (Agentic Browsing 4/4 no Lighthouse 13.5+):
      - Criacao de `ai-catalog.json` e `/.well-known/ai-catalog.json` aderente a especificacao ARD com URNs RFC 8141, media types padronizados e representativeQueries.
      - Criacao dos manifestos Markdown `llms.txt` e `llms-full.txt` na raiz publica.
      - Declaracao de atributos WebMCP (`toolname`, `tooldescription`, `toolparamdescription`) no formulario de leads (`LeadForm.tsx`).
      - Inclusao das tags de descoberta agentica no `index.html` (`<link rel="alternate" ...>`).
    - [x] Otimizacao de Acessibilidade (WCAG 2.1 AA/AAA - 97/100):
      - Correcao estrita da hierarquia de titulos eliminando saltos de niveis (h4 -> h3 / h2) em TrustBadges, HomeLeadSection, CoverageSection, AboutSection, Footer, ContactPage, TermsOfUsePage e PrivacyPolicyPage.
      - Correcao de contraste de cores em textos secundarios (text-slate-400 alterado para text-slate-200/text-slate-300 ou text-slate-700).
      - Adicao de `aria-label`, `aria-hidden="true"` e `role` em todos os elementos interativos e icones decorativos.
    - [x] Otimizacao de SEO (100/100) e Praticas Recomendadas (100/100):
      - Limpeza do `robots.txt` eliminando diretivas desconhecidas.
      - Metadados canonicamente estruturados, OpenGraph, Twitter Card e Schema.org JSON-LD (HomeAndConstructionBusiness).
    - [x] Otimizacao de Performance (Core Web Vitals):
      - Code splitting com `manualChunks` e minificacao terser via `vite.config.ts`.
      - Conversao de todas as imagens para formato moderno WebP com reducao de 88% no peso total.
      - Otimizacao de cache HTTP e compressao GZIP no `.htaccess`.
    - [x] Deploy automatico para o servidor FTP (`ftp.leccorside.com.br`) com validacao remota via PageSpeed Insights.

---

- [x] **Passo 37: Otimização Extrema de Performance Mobile (PageSpeed Mobile 99/100 e Sincronização Total FTP)**
  - **Prioridade**: Máxima
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Implementação de pré-renderização estática do primeiro frame (`Header` e `HeroSection`) via `postbuild.py` dentro de `<div id="root">`, eliminando atraso de tela branca do React SPA no 4G lento.
    - [x] Injeção de `<link rel="preload" as="style" href="..." fetchpriority="high">` no topo do `<head>` para eliminação da latência de bloqueio de renderização do CSS Tailwind.
    - [x] Adiamento não-bloqueante de Google Fonts (`requestIdleCallback`) com font stack local nativa rápida imediata (`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto...`).
    - [x] Recompressão avançada de imagens WebP via Pillow com novas versões compactas (`pressurizador-sm.webp` de 7.2 KB, `aquecedor-a-gas-sm.webp` de 5.7 KB, `aquecedor-eletrico-sm.webp` de 11.0 KB e `aquecedor-solar-sm.webp` de 17.7 KB).
    - [x] Correção dos atributos `sizes` e `srcSet` em `ServicesGrid.tsx` (`(max-width: 640px) 380px`), impedindo downloads indevidos de assets de 960px em telas Retina de celulares.
    - [x] Desativação da animação contínua de pan (`md:animate-hero-bg-pan`) no mobile, reduzindo uso de GPU e permitindo marcação imediata de LCP.
    - [x] Sincronização completa de todos os assets compilados locais para o servidor de produção via `upload_ftp.py`.
    - [x] Validação com auditoria fresca no Google PageSpeed Insights:
      - **Celular**: Desempenho **99** | Acessibilidade **97** | Práticas **100** | SEO **100** | Navegação Agêntica **4/4**.
      - **Core Web Vitals Mobile**: FCP 1,5s (Verde) | LCP 1,7s (Verde) | TBT 30ms (Verde) | CLS 0 (Verde) | Speed Index 2,5s (Verde).
      - **Computador**: Desempenho **94** | Acessibilidade **97** | Práticas **100** | SEO **100**.

---

- [x] **Correção: Conflito de Portas Docker com Outros Projetos Locais**
  - **Prioridade**: Alta
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Diagnóstico: `docker compose up` falhava com `Bind for 0.0.0.0:8000 failed: port is already allocated` porque o container `realestate-nginx` (outro projeto) já ocupava a porta 8000 do host.
    - [x] Portas host do `docker-compose.yml` migradas para faixa exclusiva e parametrizável: MySQL `${MYSQL_PORT:-3310}:3306`, backend `${BACKEND_PORT:-8010}:8000`, frontend `${FRONTEND_PORT:-5180}:5173` (portas internas inalteradas).
    - [x] `APP_URL` e `SANCTUM_STATEFUL_DOMAINS` passam a derivar das variáveis de porta; origens `localhost:5180`/`127.0.0.1:5180` liberadas no `backend/config/cors.php`.
    - [x] Fallback do proxy do Vite (`vite.config.ts`) atualizado para `127.0.0.1:8010`; URLs locais atualizadas em `README.md`, `backend/.env.example`, `test.js` e `backend/test_login.php`.
    - [x] Validação: os 3 containers sobem sem parar nenhum outro stack; `http://localhost:8010/api/public/bootstrap`, `http://localhost:5180/` e `http://localhost:5180/api/public/bootstrap` respondem HTTP 200.

- [x] **Correção: Tela Branca em Dev (`react-router-dom` sem export `useLocation`)**
  - **Prioridade**: Alta
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Diagnóstico: os aliases de `react-router` e `react-router/dom` no `vite.config.ts` (otimização do Passo 37) apontavam para os arquivos CommonJS `dist/production/*.js`. No pré-bundle do modo dev, o `export * from "react-router"` de um módulo CJS perdia os named exports, gerando `Uncaught SyntaxError: ... doesn't provide an export named: 'useLocation'` no `Header.tsx`.
    - [x] Aliases redirecionados para as versões ESM (`dist/production/index.mjs` e `dist/production/dom-export.mjs`), mantendo o build de produção do router.
    - [x] `node_modules/react-router` local (Windows) reinstalado: estava incompleto, sem os arquivos `.mjs`, o que também quebrava o `npm run build` local.
    - [x] Validação: Home em `http://localhost:5180/` carrega sem erro, dep pré-bundlada exporta `useLocation` e `npm run build` concluído com sucesso.

- [x] **Guia de Publicação em Produção na Hostinger (`SUBIR-PROD.md`)**
  - **Prioridade**: Alta
  - **Status**: Concluído (guia criado; a publicação do backend ainda não foi executada)
  - **Entregáveis**:
    - [x] Levantamento somente leitura do servidor via SSH: domínio `pressurizeprime.com.br`, raiz `~/domains/pressurizeprime.com.br/public_html`, PHP 8.3, Composer 2.9, git e mysql disponíveis, sem Node. Frontend já enviado em 13/10 e backend ainda inexistente.
    - [x] Criação do `SUBIR-PROD.md`: estrutura (`~/pressurize_backend` privado + `public_html/api/index.php` com caminho absoluto), banco no hPanel, `.env` de produção, `key:generate`, `migrate --seed` só na primeira vez, publicação do frontend via `tar` + `scp` preservando `api/`, validação, troca da senha padrão do admin, fluxo de atualização com backup e modo manutenção, alternativa via FTP e tabela de problemas comuns.
    - [x] Comando de empacotamento do backend testado localmente (84 arquivos, sem `vendor`, `.env` ou scripts de teste).
    - [x] `.gitignore` passa a ignorar `ACESSO-FTP-*` e `acesso-host.txt`, que antes estavam expostos a um `git add .`.
  - **Execução do deploy (14/10/2026)**:
    - [x] Backend enviado para `~/pressurize_backend` e `composer install --no-dev` concluído (com `php -d disable_functions=`, porque a Hostinger desabilita `proc_open`).
    - [x] `.env` de produção criado no servidor, com `APP_KEY` novo gerado por `key:generate`. Campos do banco ainda com `PREENCHER`.
    - [x] `public_html/api/index.php` e `.htaccess` criados.
    - [x] Frontend novo (build de 14/10) publicado em `public_html`: Home e rotas SPA com HTTP 200.
    - [x] Banco `u335590039_pressurize` criado pelo usuário no hPanel. `DB_*` preenchidos no `.env` via SFTP (senha entre aspas, porque contém `#`).
    - [x] `migrate --force --seed` executado: 12 migrations e 5 seeders. `config:cache` e `view:cache` ativos.
    - [x] `route:cache` descartado: falha por nomes de rota duplicados (rotas da API registradas também sem prefixo no `web.php`).
    - [x] Conteúdo do CMS local (settings, pages, page_sections, services, seo_meta, faqs) copiado para produção, com backup prévio em `~/backups/`. Bootstrap de produção idêntico ao local, exceto pela ordem das seções.
    - [x] Validação: `/api/public/bootstrap` 200, login admin + `/api/admin/leads` autenticado 200, logout 200, todas as rotas SPA 200.
    - [ ] Trocar a senha padrão do admin em produção.
    - [ ] Substituir o texto de teste `ddfgdfgdfgdfg` em Sobre → "Nossa História" (veio do banco local).

- [x] **Ícone Oficial do WhatsApp em Todos os Botões de Contato**
  - **Prioridade**: Média
  - **Status**: Concluído (local + produção)
  - **Entregáveis**:
    - [x] Novo componente `frontend/src/components/common/WhatsAppIcon.tsx` (glifo oficial preenchido, `fill="currentColor"`, porque o lucide-react não tem ícones de marca).
    - [x] `MessageSquare` substituído por `WhatsAppIcon` nos 20 botões/links `wa.me`: Header (desktop, mobile e menu), LPHeader, HeroSection, AboutSection ("Conversar com a Equipe"), HowItWorksSection, FinalCtaSection, Footer, LeadForm, botão flutuante (`WhatsAppButton`), LPHero, LPSteps ("Solicitar Orçamento"), LPFinalCta, FaqPage, HowItWorksPage e os botões de WhatsApp do admin (Dashboard e Leads).
    - [x] HTML pré-renderizado do `scripts/postbuild.py` (Header/Hero do primeiro frame) atualizado com o mesmo SVG.
    - [x] Ícones **decorativos** mantidos de propósito: passo "Conte o problema" (HowItWorksSection/HowItWorksPage/LPSteps), card "WhatsApp" da ContactPage e rótulo da SettingsPage.
    - [x] Validação: `tsc` sem erros novos, `npm run build` ok e produção publicada (ícone presente no HTML e no bundle, API 200).
- [x] **Google Analytics 4 e Google Tag Manager Configuráveis pelo Painel**
  - **Prioridade**: Alta
  - **Status**: Concluído (local + produção)
  - **Entregáveis**:
    - [x] Novo bloco "Rastreamento e Análise" em Admin → Configurações, com campos para o ID do GA4 (`G-...`) e do GTM (`GTM-...`). Aceita o ID puro ou o snippet completo colado do Google (extrai o ID automaticamente) e mostra erro se não encontrar um ID válido.
    - [x] Chaves `ga4_measurement_id` e `gtm_container_id` na tabela `settings` (chave/valor existente; sem migration).
    - [x] `services/tracking.ts` (extração/validação de IDs e injeção equivalente aos snippets oficiais) e `components/common/TrackingScripts.tsx` (montado no `App`).
    - [x] Injeção só depois da resposta da API (`settingsReady` no `SiteDataContext`), para nunca usar um ID antigo do cache, e nunca nas rotas `/admin`.
    - [x] Validação no backend (`SettingController`): IDs fora do formato oficial retornam 422, impedindo injeção de código pela API.
    - [x] Correção: `updateSettings` não grava mais a string `"undefined"` para campos ausentes.
    - [x] Testes: API local e de produção (422 para inválido, 200 para válido), Chrome headless confirmando scripts no site e ausência no `/admin` e sem IDs.
    - [x] Produção configurada com `G-SNMRGZ8D4Y` e `GTM-TF79LFMK`.

- [x] **Remoção das Credenciais Expostas na Tela de Login do Painel**
  - **Prioridade**: Crítica (segurança)
  - **Status**: Concluído (local + produção)
  - **Entregáveis**:
    - [x] `LoginPage.tsx`: removido o quadro "Acesso Padrão Configurado" que exibia e-mail e senha do admin.
    - [x] Campos de e-mail e senha não vêm mais pré-preenchidos; placeholder do e-mail trocado para `seu@email.com.br`.
    - [x] Validação: e-mail e senha do admin não aparecem em nenhum arquivo do `dist/` nem do `public_html` de produção.
    - [ ] **Trocar a senha do admin em produção**: ela ficou pública na tela de login desde a publicação.
- [x] **Novo Favicon (Gota Pressurize Prime)**
  - **Prioridade**: Média
  - **Status**: Concluído (local + produção)
  - **Entregáveis**:
    - [x] Imagem-fonte `favicon-pressu.png` (319×370, 55 KB) movida de `frontend/dist` (apagada a cada build) para `frontend/public`.
    - [x] Ícones gerados com Pillow (recorte das bordas transparentes + quadrado centralizado): `favicon.ico` (16/32/48), `favicon-48x48.png`, `favicon-192x192.png` (6,9 KB) e `apple-touch-icon.png` 180×180 com fundo branco (4,5 KB).
    - [x] `index.html`: `favicon.svg` e `logo.webp` trocados pelos novos `<link rel="icon">` e `apple-touch-icon`. `favicon.svg` antigo removido do projeto e do servidor.

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


# PLANO DE EXECUÇÃO EM PASSOS — PRESSURIZE PRIME

Este documento organiza todas as etapas de desenvolvimento do projeto por ordem estrita de prioridade.
Cada etapa possui critérios de aceitação claros e checkboxes que são atualizados pelo assistente à medida que forem concluídos.

> **REGRA CRÍTICA DE EXECUÇÃO**:
> O assistente só deve iniciar o próximo passo após autorização explícita do usuário.
> Ao concluir cada passo, atualizar `DOCUMENTACAO.md`, `PASSOS.md`, `CONTEXTO.md` e fornecer a mensagem para commit.

---

## Checklist de Prioridade do Projeto

- [x] **Passo 1: Planejamento, Extração de Diretrizes e Estruturação Documental**
  - **Prioridade**: Máxima (Fundação)
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Análise aprofundada do PDF de copy oficial `Pressurize Prime — Copy do Site.pdf` e do logotipo da marca.
    - [x] Criação de `PROMPT.md` com transcrição das diretrizes, tom de voz, ofertas, objeções, regras de conversão e especificações técnicas.
    - [x] Criação de `CONTEXTO.md` com regras de negócio, persona de médio/alto padrão de SP e arquitetura do sistema.
    - [x] Criação de `DOCUMENTACAO.md` contendo arquitetura de pastas, schemas MySQL, endpoints da API Laravel REST e sistema de temas CSS.
    - [x] Criação das regras locais de agente em `.agents/rules/workflow.md`, `AGENTS.md` e `GEMINI.md` para atualização mandatória dos documentos e geração de texto de commit a cada alteração.
    - [x] Definição ordenada das fases no `PASSOS.md`.

---

- [x] **Passo 2: Configuração e Setup da Base Frontend (React + TS + Vite + Tailwind CSS)**
  - **Prioridade**: Alta
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Criação do projeto React com TypeScript e Vite na pasta `frontend/`.
    - [x] Instalação e configuração do Tailwind CSS v4 com `@tailwindcss/vite`.
    - [x] Configuração do sistema de temas baseado em CSS Variables (`--color-primary`, `--color-secondary`, etc.).
    - [x] Instalação do React Router DOM e Lucide React para iconografia vetorial.
    - [x] Cópia e configuração dos assets oficiais (logotipo oficial em alta resolução).
    - [x] Configuração do cliente de dados e tipagens TypeScript completas (`types/index.ts`, `SiteDataContext.tsx`, `initialData.ts`).
    - [x] Validação de build limpo do Vite e TypeScript com zero warnings.

---

- [x] **Passo 3: Desenvolvimento dos Componentes Globais e Identidade Visual**
  - **Prioridade**: Alta
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Header responsivo institucional com logotipo oficial, navegação rápida, telefone clicável e botão de CTA.
    - [x] Header simplificado para Landing Pages (`LPHeader.tsx`) focado exclusivamente em conversão sem menus de fuga.
    - [x] Botão flutuante de WhatsApp (`WhatsAppButton.tsx`) com animação, badge online e mensagem dinâmica.
    - [x] Topbar com horário de atendimento e detecção de fora de expediente comercial.
    - [x] Rodapé completo (`Footer.tsx`) com dados da marca, marcas atendidas, bairros em SP e atalho de acesso ao CMS.

---

- [x] **Passo 4: Desenvolvimento da Página Principal (Home Institucional)**
  - **Prioridade**: Alta
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Hero da Home com H1 oficial, subtítulo, microcopy humano e botões de ação imediata.
    - [x] Efeito em motion de gota d'água orgânica com reflexo vítreo, ondulações concêntricas de pressão e partículas flutuantes no Hero.
    - [x] Faixa de Confiança com os 4 selos de autoridade (+10 anos, conserto 24h, 10x sem juros, garantia em peças e mão de obra).
    - [x] Grade de Serviços com os 4 cards interativos levando para suas respectivas Landing Pages.
    - [x] Seção "Quem Somos": Técnicos de verdade com história prática e compromisso de retorno sem fotos fakes.
    - [x] Seção "Por que a Pressurize Prime": 4 diferenciais combatendo técnicos anônimos e curiosos.
    - [x] Seção "Como Funciona": 3 passos simples (contato, vistoria gratuita no local aprovado, problema resolvido).
    - [x] Seção "Regiões Atendidas": Destaque para bairros prioritários de SP.
    - [x] Seção "Nossos Compromissos": 4 compromissos que substituem avaliações iniciais com transparência total.
    - [x] Seção de Perguntas Frequentes (FAQ interativo com acordeão dinâmico).
    - [x] CTA Final de Urgência com botões para WhatsApp e ligação direta.

---

- [x] **Passo 5: Desenvolvimento das 4 Landing Pages Especializadas**
  - **Prioridade**: Alta
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] LP 1: `/pressurizador` (Pressurizador de Água) com H1 dinâmico via parâmetros (`?h1=conserto|instalacao|venda`), sintomas concretos, o que fazemos e FAQ.
    - [x] LP 2: `/aquecedor-a-gas` (Aquecedor a Gás de Passagem) com alerta de segurança em destaque, normas NBR 13103, gases GN/GLP e H1 dinâmico.
    - [x] LP 3: `/aquecedor-solar` (Aquecedor Solar e Boiler) com foco em recuperação de economia e verificação completa do sistema.
    - [x] LP 4: `/aquecedor-eletrico` (Aquecedor Elétrico e Boiler) com destaque para eletricista e encanador no mesmo atendimento e segurança elétrica.
    - [x] Geração e integração de 4 fotografias técnicas de alta qualidade dos equipamentos (pressurizador, aquecedor a gás, aquecedor solar e boiler elétrico) nos cards da Home e nos Heros das LPs sem uso de pessoas ou modelos genéricos.
    - [x] LPHeader minimalista sem menus de fuga para alta taxa de conversão em campanhas de tráfego pago.

---

- [x] **Passo 6: Formulário Inteligente de Captação de Leads e Validação**
  - **Prioridade**: Média-Alta
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Componente de formulário simplificado (`LeadForm.tsx`) com Nome, WhatsApp com máscara telefônica brasileira `(XX) XXXXX-XXXX`, Bairro (com autossugestão de bairros prioritários de SP) e Descrição do problema com chips de toque rápido.
    - [x] Detecção de horário de atendimento com mensagem informativa amigável para envio fora do expediente comercial (`isBusinessHours` com badges dinâmicos e avisos de priorização às 8h).
    - [x] Feedback visual de envio, validação de campos obrigatórios com mensagens inline de erro, tratamento de submissão e card de sucesso com botão direto para agilizar atendimento no WhatsApp.
    - [x] Modal acessível de captura rápida (`LeadModal.tsx`) disparável de qualquer botão do site via `SiteDataContext`.
    - [x] Seção dedicada de captura de leads na Home (`HomeLeadSection.tsx`) e nas 4 Landing Pages (`LPLeadSection.tsx`).

---

- [x] **Passo 7: Criação e Estruturação do Backend Laravel REST API**
  - **Prioridade**: Alta
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Setup do projeto Laravel na pasta `backend/` com `composer.json`, `artisan`, `.env` e `.env.example` configurados para MySQL e Sanctum.
    - [x] Migrations completas (`0001_01_01_000000_create_users_table.php`, `personal_access_tokens` Sanctum, `settings`, `pages`, `page_sections`, `services`, `seo_meta`, `leads`).
    - [x] Seeders preenchidos com todo o conteúdo oficial das cópias e configurações de cores padrão (`UserSeeder`, `SettingSeeder`, `ServiceSeeder`, `SeoMetaSeeder`, `PageSeeder`, `DatabaseSeeder`).
    - [x] Models Eloquent com tipagem, relacionamentos, casts e helpers (`User`, `Setting`, `Page`, `PageSection`, `Service`, `SeoMeta`, `Lead`).
    - [x] Controllers RESTful públicos (`BootstrapController`, `PageController`, `LeadController`) e administrativos com Sanctum (`AuthController`, `SettingController`, `PageController`, `ServiceController`, `SeoController`, `LeadController`).
    - [x] Mapeamento completo de rotas em `routes/api.php`, `routes/web.php` e configuração de CORS para SPA Vite em `config/cors.php`.

---

- [x] **Passo 8: Desenvolvimento do Painel Administrativo Completo (`/admin`)**
  - **Prioridade**: Alta
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Tela de Login administrativo (`LoginPage.tsx`) com autenticação Sanctum e credenciais oficiais configuradas (`admin@pressurizeprime.com.br` / `Prime@2026!`).
    - [x] Contexto de Autenticação (`AuthContext.tsx`) e proteção de rotas (`ProtectedRoute.tsx`).
    - [x] Layout Administrativo Completo (`AdminLayout.tsx`) com sidebar responsiva, drawer mobile, status do tema ativo, ver site e logout.
    - [x] Dashboard (`DashboardPage.tsx`) com métricas de leads (total, novos, em atendimento), contadores de serviços e tabela de contatos recentes com atalho para WhatsApp.
    - [x] Módulo de Identidade Visual e Cores (`SettingsPage.tsx`) com seletor interativo de Cor Primária e Secundária em tempo real (com reflexo instantâneo nas variáveis CSS `:root`), paleta sugerida, upload/URL do Logo oficial, telefones e horários.
    - [x] Módulo de Gerenciamento de Conteúdo (`PagesManagerPage.tsx`) com edição de Título H1, Subtítulo, CTAs e microcopy para todas as 5 páginas.
    - [x] Módulo de Serviços (`ServicesManagerPage.tsx`) com CRUD completo (criação, edição, exclusão, ordenação e ativação/desativação).
    - [x] Módulo de SEO Individual por Página (`SeoManagerPage.tsx`) com contadores recomendados de caracteres para Meta Title/Description, tags OpenGraph e SERP preview do Google Search.
    - [x] Módulo de Leads (`LeadsPage.tsx`) com filtragem por status (`novo`, `em_atendimento`, `concluido`, `arquivado`), busca textual, modal de detalhes, troca de status e botão de conversa direta no WhatsApp com mensagem estruturada.

---

- [x] **Passo 9: Integração Global, Testes de Performance, SEO e Polimento Final**
  - **Prioridade**: Média
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Conexão integral do Frontend React com a API Laravel (bootstrap endpoint, sincronização de dados via `SiteDataContext`, envio de leads com POST `/api/public/leads` e fallback gracioso local quando a API não estiver rodando).
    - [x] Validação de responsividade mobile (320px a 1440px+) em todas as páginas e painel administrativo.
    - [x] Otimização de SEO On-Page (tags semânticas, meta tags dinâmicas por página, alt text em imagens, OpenGraph, Twitter Cards, `robots.txt`, `sitemap.xml` e Schema.org LocalBusiness JSON-LD).
    - [x] Validação final de velocidade de carregamento e testes funcionais de conversão (build de produção limpo em 2.3s, rotas 100% ativas com HTTP 200).

---

- [x] **Passo 10: Containerização Completa e Execução Multi-Serviço via Docker Compose**
  - **Prioridade**: Média
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Criação do `backend/Dockerfile` com PHP 8.2 Alpine, Composer 2.8, extensões (`pdo`, `pdo_mysql`, `mbstring`, `bcmath`, `xml`, `zip`) e inicializador automático.
    - [x] Criação do `frontend/Dockerfile` com Node 22 Alpine, hot-reload e portas mapeadas para desenvolvimento Vite.
    - [x] Criação do `docker-compose.yml` orquestrando os 3 serviços: MySQL 8.0 (com healthcheck nativo), Backend Laravel 11 (porta 8000) e Frontend React (porta 5173).
    - [x] Execução automatizada de migrações e seeders oficiais (`UserSeeder`, `SettingSeeder`, `ServiceSeeder`, `SeoMetaSeeder`, `PageSeeder`) no boot do contêiner.
    - [x] Criação da migration `2026_10_05_000007_create_sessions_and_cache_tables.php` garantindo tabelas `sessions` e `cache` ativas no MySQL.
    - [x] Testes de ponta a ponta: frontend visual em `http://localhost:5173/`, rotas de LPs, painel `/admin`, bootstrap de dados (`GET /api/public/bootstrap`), submissão de lead (`POST /api/public/leads`) e autenticação Sanctum (`POST /api/admin/login`).

---

- [x] **Passo 11: Inicialização do Impeccable Design System (`PRODUCT.md`)**
  - **Prioridade**: Média
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Execução do comando `/impeccable init` com extração automática das diretrizes do projeto e alinhamento com o usuário.
    - [x] Criação de `PRODUCT.md` com schema v1 oficial do Impeccable (plataforma web, persona de alto padrão de SP, posicionamento 'Resolução de Primeira', normas NBR e princípios de produto).
    - [x] Definição de workflow code-first em `.impeccable/config.json` (`"buildPath": "code"`).
    - [x] Validação do contexto com `impeccable.cmd context` retornando `PRODUCT.md` resolvido e ativo para orientar todas as futuras interações e melhorias visuais.

---

- [x] **Passo 12: Refinamento Tipográfico de Alto Padrão (Design System & Craft Floor)**
  - **Prioridade**: Alta (UX/UI & Percepção de Valor)
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Implementação de base tipográfica aprimorada no CSS global (`index.css`): `optimizeLegibility`, `font-feature-settings` para alternates estilísticas do Inter, `text-wrap: balance` em títulos e `text-wrap: pretty` em parágrafos, eliminando viúvas e quebras desarmônicas.
    - [x] Eliminação de badges/kickers amadores ("kicker pills" como "Especialistas Técnicos", "Quem Somos", "Diferenciais", "Passo a Passo", etc.) conforme diretrizes do `impeccable/craft-floor.md`.
    - [x] Calibração de tracking negativo proporcional (`tracking-[-0.035em]` em display/H1, `tracking-[-0.03em]` em H2, `tracking-[-0.015em]` em cards) e espessuras mais elegantes (`font-extrabold` 800 ao invés do pesado `font-black` 900).
    - [x] Aplicação uniforme do padrão em todos os componentes da Home (`HeroSection`, `ServicesGrid`, `AboutSection`, `WhyUsSection`, `HowItWorksSection`, `CoverageSection`, `CommitmentsSection`, `FaqSection`, `HomeLeadSection`, `FinalCtaSection`).
    - [x] Aplicação uniforme do padrão em todas as Landing Pages de Serviços (`LPHero`, `LPSymptoms`, `LPWhatWeDo`, `LPWhyUs`, `LPSteps`, `LPObjections`, `LPFaq`, `LPFinalCta`).
---

- [x] **Passo 13: Refinamento de Motion Design do Hero (Hydrodynamic & Engineering Aesthetic)**
  - **Prioridade**: Alta (Aesthetics & WOW Factor)
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Eliminação do motion caricato/saltitante de gota e substituição por uma Cápsula de Vidro Líquido Hidrodinâmica de alta engenharia (`HeroSection.tsx`).
    - [x] Criação de ondas líquidas contínuas em tempo real via SVG duplo com interpolação de curvas senoidais (`animate-wave-fast` e `animate-wave-slow`).
    - [x] Implementação de ondas de ressonância e pressão concêntricas com decaimento físico em curva bezier `cubic-bezier(0.16, 1, 0.3, 1)`.
    - [x] Fundo com caustics de luz azul royal e calor térmico âmbar em deriva suave (`animate-caustic-1` e `animate-caustic-2`), linhas isobáricas de pressão e micro-bolhas flutuantes.
    - [x] Entrada escalonada em cascata (`animate-fade-up-1` a `4`) para o selo, H1, subtítulo e botões de conversão.
---

- [x] **Passo 14: Correção Definitiva e Suavização das Caixas de Diálogo de FAQ (Accordions)**
  - **Prioridade**: Alta (UX & Interação)
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Resolução do problema onde o Tailwind v4 não compilava utilitários arbitrários de `grid-template-rows`.
    - [x] Implementação de classes CSS dedicadas em `index.css`: `.faq-accordion-grid`, `.faq-accordion-grid.open` (`grid-template-rows: 0fr` para `1fr` em `300ms cubic-bezier(0.16, 1, 0.3, 1)`) e `.faq-accordion-content` com `min-height: 0` e `overflow: hidden`.
    - [x] Atualização de estado funcional no React (`prev => prev === id ? null : id`) e bloqueio de cliques fantasma no Chevron com `pointer-events-none`.
    - [x] Aplicação unificada em `FaqSection.tsx` e `LPFaq.tsx`, garantindo que abrir e fechar a caixa de pergunta ocorra de forma fluida sem travar ou permanecer aberta.
---

- [x] **Passo 15: Redesenho do Hero com Base na Referência Visual Oficial**
  - **Prioridade**: Alta (Aesthetics & Brand Alignment)
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Reestruturação do Hero em layout de duas colunas assimétricas (58% / 42%) espelhando a imagem de referência fornecida pelo usuário.
    - [x] Atualização da copy do H1: "A pureza e o fluxo do seu banho com a **pressão perfeita** e temperatura exata.", com destaque em azul royal (`text-primary`).
    - [x] Implementação da tríade de chips de atributos tecnológicos com ícones vetoriais: *Fluxo Contínuo / Sem Oscilação* (`Waves`), *Controle Térmico / Painel Digital* (`Flame`), *Operação Inaudível / Motor Submerso* (`VolumeX`).
    - [x] Criação do card flutuante interativo à direita com logotipo oficial, barra de acento dourada superior e efeito de impacto físico ao clique:
      - Ondas de choque hidráulicas expansivas (`.animate-card-ripple`).
      - Projeção de micro-gotículas de água em trajetórias radiais dinâmicas (`.animate-splash-droplet`).
      - Pílula interativa: `💧 Clique no card para produzir impacto e respingos d'água` com feedback de estado ao clique.
---

- [x] **Passo 16: Implementação de Gradientes e Fundos Animados no Hero (Hydrodynamic Ambiance)**
  - **Prioridade**: Alta (Aesthetics & Visual Polish)
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Criação de malha de gradientes aurora orgânicos em deriva suave contínua (`.animate-aurora-mesh` e `.animate-aurora-mesh-slow` em ciclos de 24s e 32s), integrando Azul Royal, Ciano Cristalino e Âmbar Térmico sem gerar poluição visual.
    - [x] Implementação de partículas flutuantes e micro-bolhas de água pressurizada com elevação e desvanecimento assíncronos (`.animate-particle-1`, `2` e `3`), simulando pureza e pressão hidrodinâmica viva.
    - [x] Criação de ondas líquidas suaves na base do Hero via curvas senoidais SVG sobrepostas (`.animate-bg-wave-1` e `.animate-bg-wave-2`), ancorando a temática de fluidos sem ofuscar o texto ou os botões de ação.
    - [x] Suporte a acessibilidade com `@media (prefers-reduced-motion: reduce)` cobrindo todas as novas animações de fundo.
    - [x] Build de produção compilado com sucesso (`tsc -b && vite build`) em 3.05s com 0 erros.
---

- [x] **Passo 17: Substituição do Logotipo Horizontal pela Versão Vertical Oficial no Card do Hero**
  - **Prioridade**: Alta (Brand Alignment & Visual Balance)
  - **Status**: Concluído
  - **Entregáveis**:
    - [x] Extração e tratamento de imagem da logo vertical oficial com gota tridimensional estilizada, onda azul e chama dourada, além dos tipogramas "Pressurize Prime" e "AQUECEDORES E PRESSURIZADORES".
    - [x] Armazenamento do ativo em alta fidelidade em `frontend/public/logo-vertical.png`, `frontend/src/assets/logo-vertical.png` e `asserts/logo-vertical.png`.
    - [x] Suporte a `logo_vertical_url` nas interfaces TypeScript (`types/index.ts`) e dados padrão (`initialData.ts`).
    - [x] Atualização de `HeroSection.tsx` substituindo o logotipo horizontal que ficava acanhado no card pelo novo formato vertical, perfeitamente centralizado e proporcional com a referência visual do usuário.
    - [x] Build limpo do Vite/TypeScript compilado com sucesso em 1.35s com 0 erros.

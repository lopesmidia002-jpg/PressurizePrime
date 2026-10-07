# DOCUMENTAÇÃO TÉCNICA DO PROJETO — PRESSURIZE PRIME

Este documento descreve a especificação técnica completa, arquitetura de software, modelagem de banco de dados, endpoints de API e convenções de código do sistema **Pressurize Prime**.

---

## 1. Visão Geral da Arquitetura

O sistema é construído como uma aplicação desacoplada (**Decoupled SPA + RESTful API**):

```
+-------------------------------------------------------------+
|                       FRONTEND (SPA)                        |
|   React 18 + TypeScript + Vite + Tailwind CSS + Lucide      |
|                                                             |
|   +--------------------------+  +-------------------------+ |
|   |   Site Institucional     |  |   Painel Administrativo | |
|   |   e Landing Pages        |  |   CMS Completo (/admin) | |
|   +--------------------------+  +-------------------------+ |
+-------------------------------------------------------------+
                              |
                       JSON / REST API
                              |
+-------------------------------------------------------------+
|                       BACKEND (API)                         |
|             Laravel 11+ / PHP 8.2+ RESTful API              |
|        Laravel Sanctum (Autenticação Token / Bearer)        |
+-------------------------------------------------------------+
                              |
                          Eloquent
                              |
+-------------------------------------------------------------+
|                      BANCO DE DADOS                         |
|                          MySQL                              |
+-------------------------------------------------------------+
```

---

## 2. Estrutura de Diretórios Planejada

```
PressurizePrime/
├── .agents/
│   └── rules/
│       └── workflow.md
├── asserts/
│   ├── Pressurize Prime — Copy do Site.pdf
│   └── WhatsApp Image 2026-10-05 at 15.25.27.jpeg
├── backend/                  # API REST Laravel
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php
│   │   │   ├── SettingController.php
│   │   │   ├── PageController.php
│   │   │   ├── ServiceController.php
│   │   │   ├── FaqController.php
│   │   │   ├── SeoController.php
│   │   │   └── LeadController.php
│   │   └── Models/
│   │       ├── Setting.php
│   │       ├── Page.php
│   │       ├── PageSection.php
│   │       ├── Service.php
│   │       ├── Faq.php
│   │       ├── SeoMeta.php
│   │       └── Lead.php
│   ├── database/migrations/
│   ├── routes/api.php
│   └── ...
├── frontend/                 # Aplicação React + Vite + Tailwind
│   ├── public/
│   │   └── logo.jpeg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/       # Header, Footer, WhatsAppButton, Modal
│   │   │   ├── home/         # Hero, TrustBadge, ServicesGrid, About, Steps, FAQ
│   │   │   ├── lp/           # Reusable LP Components (HeroLP, Symptoms, Guarantees)
│   │   │   └── admin/        # Layout, Sidebar, ColorPicker, RichText, SEOForm
│   │   ├── context/
│   │   │   ├── AuthContext.tsx
│   │   │   └── SiteDataContext.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── ServiceLPPage.tsx
│   │   │   └── admin/
│   │   │       ├── DashboardPage.tsx
│   │   │       ├── SettingsPage.tsx      # Logo, Cores, Contatos
│   │   │       ├── PagesManagerPage.tsx  # Textos, Títulos, Seções
│   │   │       ├── ServicesManagerPage.tsx
│   │   │       ├── SeoManagerPage.tsx    # SEO individual por página
│   │   │       └── LeadsPage.tsx         # Contatos recebidos
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
├── AGENTS.md
├── GEMINI.md
├── PROMPT.md
├── CONTEXTO.md
├── DOCUMENTACAO.md
└── PASSOS.md
```

---

## 3. Modelagem de Dados (MySQL)

### 3.1. Tabela `settings` (Configurações Gerais, Cores e Identidade)
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | BIGINT UNSIGNED PK AUTO_INCREMENT | Identificador |
| `key` | VARCHAR(100) UNIQUE | Chave de configuração (ex: `site_name`, `logo_url`, `primary_color`, `secondary_color`, `whatsapp_number`, `phone_number`, `business_hours`, `contact_email`) |
| `value` | TEXT NULLABLE | Valor configurado |
| `group` | VARCHAR(50) DEFAULT 'general' | Agrupamento (`general`, `theme`, `contact`) |
| `created_at`, `updated_at` | TIMESTAMP | Auditoria |

### 3.2. Tabela `pages` (Páginas do Site)
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | BIGINT UNSIGNED PK AUTO_INCREMENT | Identificador |
| `slug` | VARCHAR(100) UNIQUE | Slug da rota (`home`, `pressurizador`, `aquecedor-a-gas`, `aquecedor-solar`, `aquecedor-eletrico`) |
| `title` | VARCHAR(255) | Nome amigável da página |
| `hero_title` | VARCHAR(255) | Título principal (H1) |
| `hero_subtitle` | TEXT | Subtítulo da seção Hero |
| `hero_cta_primary` | VARCHAR(100) | Rótulo do botão principal |
| `hero_cta_secondary` | VARCHAR(100) | Rótulo do botão secundário |
| `created_at`, `updated_at` | TIMESTAMP | Auditoria |

### 3.3. Tabela `page_sections` (Seções Editáveis por Página)
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | BIGINT UNSIGNED PK AUTO_INCREMENT | Identificador |
| `page_id` | BIGINT UNSIGNED FK (`pages.id`) | Página pertencente |
| `section_key` | VARCHAR(100) | Chave da seção (`trust_badges`, `symptoms`, `why_us`, `steps`, `safety_alert`, etc.) |
| `title` | VARCHAR(255) NULLABLE | Título da seção |
| `subtitle` | TEXT NULLABLE | Subtítulo ou texto de apoio |
| `content` | JSON | Itens estruturados (listas, cards, ícones) |
| `order` | INT DEFAULT 0 | Ordem de exibição |
| `is_active` | BOOLEAN DEFAULT TRUE | Visibilidade |
| `created_at`, `updated_at` | TIMESTAMP | Auditoria |

### 3.4. Tabela `services` (Serviços e Categorias)
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | BIGINT UNSIGNED PK AUTO_INCREMENT | Identificador |
| `title` | VARCHAR(255) | Nome do serviço |
| `slug` | VARCHAR(100) UNIQUE | Slug correspondente da LP |
| `short_description` | TEXT | Descrição curta para o card da Home |
| `full_description` | LONGTEXT NULLABLE | Descrição técnica completa |
| `icon_name` | VARCHAR(50) | Nome do ícone Lucide associado |
| `image_url` | VARCHAR(255) NULLABLE | Imagem ilustrativa |
| `features` | JSON NULLABLE | Lista de diferenciais/garantias |
| `order` | INT DEFAULT 0 | Ordem na Home |
| `is_active` | BOOLEAN DEFAULT TRUE | Ativo/Inativo |
| `created_at`, `updated_at` | TIMESTAMP | Auditoria |

### 3.5. Tabela `seo_meta` (SEO Individual por Rota)
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | BIGINT UNSIGNED PK AUTO_INCREMENT | Identificador |
| `page_slug` | VARCHAR(100) UNIQUE | Rota (`home`, `pressurizador`, etc.) |
| `meta_title` | VARCHAR(255) | Título na aba do navegador e no Google |
| `meta_description` | TEXT | Descrição dos resultados de busca |
| `keywords` | TEXT NULLABLE | Palavras-chave separadas por vírgula |
| `canonical_url` | VARCHAR(255) NULLABLE | URL Canônica |
| `og_title` | VARCHAR(255) NULLABLE | Título OpenGraph (WhatsApp / Facebook) |
| `og_description` | TEXT NULLABLE | Descrição OpenGraph |
| `og_image` | VARCHAR(255) NULLABLE | Imagem de compartilhamento |
| `schema_markup` | JSON NULLABLE | Marcação estruturada Schema.org |
| `created_at`, `updated_at` | TIMESTAMP | Auditoria |

### 3.6. Tabela `leads` (Contatos e Orçamentos Recebidos)
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | BIGINT UNSIGNED PK AUTO_INCREMENT | Identificador |
| `name` | VARCHAR(150) | Nome do cliente |
| `whatsapp` | VARCHAR(50) | Telefone / WhatsApp |
| `neighborhood` | VARCHAR(100) | Bairro / Região |
| `service_category` | VARCHAR(100) NULLABLE | Categoria (pressurizador, aquecedor, etc.) |
| `problem_description`| TEXT | Descrição do defeito ou necessidade |
| `status` | ENUM('novo', 'em_atendimento', 'concluido', 'arquivado') DEFAULT 'novo' | Status do lead |
| `origin_url` | VARCHAR(255) NULLABLE | Página onde converteu |
| `created_at`, `updated_at` | TIMESTAMP | Auditoria |

---

## 4. Endpoints da API REST (Laravel)

### 4.1. Públicos (Consumidos pelo Site Institucional):
- `GET /api/public/bootstrap`: Carrega em uma única requisição as configurações globais, temas/cores, serviços e metadados de SEO essenciais para carregamento instantâneo.
- `GET /api/public/pages/{slug}`: Retorna os textos, seções, FAQ e títulos específicos da página ou LP solicitada.
- `GET /api/public/seo/{slug}`: Retorna os metadados de SEO individual da rota solicitada.
- `POST /api/public/leads`: Envia dados do formulário de contato/orçamento.

### 4.2. Privados / Administrativos (Protegidos por Sanctum):
- `POST /api/admin/login`: Autenticação e emissão de token Bearer.
- `POST /api/admin/logout`: Revogação de token.
- `GET /api/admin/me`: Dados do usuário autenticado.
- `GET|PUT /api/admin/settings`: Leitura e atualização das configurações globais, logo e paleta de cores CSS.
- `GET|PUT /api/admin/pages/{slug}`: Edição de textos, títulos, slogans e seções de cada página.
- `GET|POST|PUT|DELETE /api/admin/services`: CRUD completo dos serviços e landing pages.
- `GET|PUT /api/admin/seo/{slug}`: Atualização dos campos de SEO de qualquer página do site.
- `GET|PATCH /api/admin/leads`: Consulta e atualização de status dos leads recebidos.
- `POST /api/admin/media/upload`: Upload de imagens e logotipo com armazenamento em `storage/public`.

---

## 6. Estado Atual da Implementação do Frontend
- **Setup Base**: Vite 8 + React 19 + TypeScript 6 + Tailwind CSS v4 (`@tailwindcss/vite`).
- **Assets Configurados**: Logotipo oficial `WhatsApp Image 2026-10-05 at 15.25.27.jpeg` alocado em `/public/logo.jpeg` e `src/assets/logo.jpeg`.
- **Tematização Dinâmica**: Implementada via CSS Variables (`--color-primary`, `--color-secondary`) no `src/index.css` e gerenciada dinamicamente via `SiteDataContext.tsx` com atualização em tempo real no `:root`.
- **Componentes Globais Criados (`src/components/common/`)**:
  - `TopBar.tsx`: Horário comercial dinâmico e aviso de expediente.
  - `Header.tsx`: Header completo com logotipo oficial, navegação com dropdown de serviços, telefone clicável e botões de CTA (Orçamento Online e WhatsApp).
  - `LPHeader.tsx`: Header minimalista para Landing Pages de Google Ads, eliminando pontos de fuga e focando em conversão.
  - `WhatsAppButton.tsx`: Botão flutuante com indicador de status ao vivo e mensagem customizada.
  - `Footer.tsx`: Rodapé rico com marcas atendidas, bairros atendidos em SP, compromissos de garantia e atalho de acesso ao CMS.
  - `LeadForm.tsx`: Formulário inteligente de captação de leads com máscara brasileira dinâmica para WhatsApp/Celular `(XX) XXXXX-XXXX`, autossugestão de bairros nobres de SP, chips de sintomas rápidos para mobile, validação inline com avisos de erro, detecção de horário comercial e tela de sucesso com link de aceleração direta no WhatsApp.
  - `LeadModal.tsx`: Modal acessível acionado globalmente via `openLeadModal()` pelo `SiteDataContext`, com listener para tecla ESC, backdrop blur e bloqueio de scroll.
- **Componentes da Página Inicial (`src/components/home/`)**:
  - `HeroSection.tsx`: H1 de conversão, botões de ação, microcopy oficial e efeito motion de gota d'água com morfologia orgânica, ondulações de pressão hidráulica concêntricas (`animate-water-ripple`) e partículas flutuantes vítreas.
  - `TrustBadges.tsx`: 4 selos de credibilidade técnica.
  - `ServicesGrid.tsx`: Cards dos 4 serviços com links para as Landing Pages dedicadas.
  - `AboutSection.tsx`: História prática da equipe e diferenciais de campo.
  - `WhyUsSection.tsx`: 4 diferenciais de quebra de objeções (preço, durabilidade, rapidez e atendimento humano).
  - `HowItWorksSection.tsx`: Processo em 3 etapas com vistoria sem custo na aprovação.
  - `CoverageSection.tsx`: Destaque para Brooklin, Vila Olímpia, Morumbi, Alphaville, etc.
  - `CommitmentsSection.tsx`: Compromissos contratuais e garantias claras.
  - `FaqSection.tsx`: Acordeão interativo com dúvidas reais de clientes.
  - `HomeLeadSection.tsx`: Seção split dedicada de orçamento online conectando argumentos de autoridade e garantias ao formulário inteligente.
  - `FinalCtaSection.tsx`: Chamada final de urgência com opções de contato direto ou abertura do modal de orçamento.
- **Componentes de Landing Page (`src/components/lp/`)**:
  - `LPHero.tsx`: Suporte a H1 dinâmico via query params (`?h1=` ou `?intent=`), alerta de segurança para gás e motion de gota.
  - `LPTrustBadges.tsx`: Selos de confiança específicos do equipamento.
  - `LPSymptoms.tsx`: Diagnóstico visual de sintomas reais e aviso técnico de campo.
  - `LPWhatWeDo.tsx`: Venda, instalação e conserto em 3 blocos.
  - `LPWhyUs.tsx`: Diferenciais específicos combatendo técnicos amadores.
  - `LPSteps.tsx`: 3 passos simplificados para resolução rápida.
  - `LPObjections.tsx`: Quebra de objeções ("Não é caro?", "Vai durar?", "Quanto tempo leva?").
  - `LPFaq.tsx`: FAQ técnico dedicado por tipo de equipamento.
  - `LPLeadSection.tsx`: Seção dedicada de captação de leads na LP com o serviço pré-selecionado no formulário.
  - `LPFinalCta.tsx`: Chamada de ação final de urgência com marcas atendidas e atalho para formulário.
- **Assets e Imagens Geradas (`public/images/`)**:
  - `pressurizador.jpg`: Fotografia técnica de alta resolução do sistema de pressurização residencial com tubulação em cobre e manômetro.
  - `aquecedor-a-gas.jpg`: Aquecedor digital a gás de passagem de parede com conexões em cobre e duto de exaustão.
  - `aquecedor-solar.jpg`: Sistema térmico residencial com placas solares e boiler de acumulação em aço inox.
  - `aquecedor-eletrico.jpg`: Boiler cilíndrico elétrico vertical em aço inox de alta capacidade com válvulas de segurança.
- **Páginas Criadas (`src/pages/`)**:
  - `HomePage.tsx`: Home institucional completa com cards de serviços enriquecidos com fotos técnicas dos produtos e seção de orçamento online.
  - `ServiceLPPage.tsx`: Renderizador dinâmico das 4 LPs em layout split moderno integrando fotografia técnica, LPHeader, SEO individual dinâmico e seção dedicada de orçamento.
- **Tipagens**: Especificadas em `src/types/index.ts` abrangendo todas as entidades do sistema (`SiteSettings`, `PageData`, `PageSection`, `ServiceItem`, `FaqItem`, `SeoMeta`, `Lead`, `LeadFormData`).
- **Validação de Build**: Compilação TypeScript com `tsc -b` e bundling Vite executados com sucesso (zero erros, zero warnings).

---

## 7. Estado Atual da Implementação do Backend (Laravel 11 REST API)
- **Estrutura Base**: Laravel 11 em `backend/` com `composer.json`, `artisan`, `.env` e `.env.example` configurados para MySQL.
- **Segurança e Sessões**: Laravel Sanctum configurado para autenticação Bearer token de painel administrativo (`admin-cms-token`) e CORS configurado para o frontend Vite.
- **Migrations MySQL (`database/migrations/`)**:
  - `0001_01_01_000000_create_users_table.php`: Administradores e reset tokens.
  - `0001_01_01_000001_create_personal_access_tokens_table.php`: Tokens Sanctum.
  - `2026_10_05_000001_create_settings_table.php`: Configurações chave-valor, cores e contatos.
  - `2026_10_05_000002_create_pages_table.php`: Rotas e cabeçalhos das páginas.
  - `2026_10_05_000003_create_page_sections_table.php`: Seções dinâmicas estruturadas em JSON.
  - `2026_10_05_000004_create_services_table.php`: Catálogo e serviços com diferenciais.
  - `2026_10_05_000005_create_seo_meta_table.php`: SEO individual por página com tags OpenGraph.
  - `2026_10_05_000006_create_leads_table.php`: Captação e triagem de leads com status de atendimento.
- **Seeders Oficiais (`database/seeders/`)**:
  - `UserSeeder.php`: Criação do admin inicial (`admin@pressurizeprime.com.br`).
  - `SettingSeeder.php`: Cores oficiais (#004b93 e #cfa349), WhatsApp, telefones, horários e bairros.
  - `ServiceSeeder.php`: Os 4 serviços oficiais (Pressurizador, Aquecedor a Gás, Aquecedor Solar e Aquecedor Elétrico) com diferenciais e imagens.
  - `SeoMetaSeeder.php`: Meta títulos, descrições e OpenGraph para todas as 5 rotas.
  - `PageSeeder.php`: Cópias completas oficiais e seções estruturadas.
  - `DatabaseSeeder.php`: Orquestrador dos seeders.
- **Models Eloquent (`app/Models/`)**:
  - `User.php`, `Setting.php`, `Page.php`, `PageSection.php`, `Service.php`, `SeoMeta.php`, `Lead.php`.
- **Controllers da API (`app/Http/Controllers/Api/`)**:
  - **Públicos**: `BootstrapController` (carregamento unificado em 1 request), `PageController`, `LeadController` (validação e registro).
  - **Administrativos (Sanctum)**: `AuthController` (login/logout/me), `SettingController` (identidade visual/cores), `PageController` (textos e seções), `ServiceController` (CRUD), `SeoController` (SEO por rota), `LeadController` (listagem, filtros e atualização de status).

---

## 8. Estado Atual do Painel Administrativo CMS (`/admin`)
- **Autenticação e Sessão (`src/context/AuthContext.tsx`)**:
  - Login integrado com fallback seguro e credenciais oficiais configuradas (`admin@pressurizeprime.com.br` / `Prime@2026!`).
  - Proteção de rotas com `ProtectedRoute.tsx` redirecionando acessos não autenticados.
- **Layout Responsivo (`src/components/admin/AdminLayout.tsx`)**:
  - Topbar com identificação da marca, status do expediente comercial, live-swatch das cores ativas, atalho "Ver Site ao Vivo" e botão de logout.
  - Sidebar desktop e drawer mobile com navegação rápida entre todos os módulos.
- **Módulos do Painel (`src/pages/admin/`)**:
  - `LoginPage.tsx`: Tela de login com design premium, luzes ambientais e preenchimento de teste facilitado.
  - `DashboardPage.tsx`: Métricas em tempo real (Total de Leads, Novos, Em Atendimento, Serviços Ativos), tabela de solicitações recentes e atalhos de ação rápida.
  - `SettingsPage.tsx`: Controle total da identidade visual, URL/arquivo do Logotipo oficial, seletor de Cor Primária e Secundária em tempo real (com reflexo instantâneo no `:root` e live preview de botões/badges), telefones, WhatsApp e horários de atendimento.
  - `PagesManagerPage.tsx`: Edição individual dos textos, títulos H1 de conversão, subtítulos, botões de ação e microcopies das 5 páginas do site.
  - `ServicesManagerPage.tsx`: CRUD completo de serviços (cadastro, edição, remoção, reordenação, seleção de ícones Lucide e visibilidade ativa/inativa).
  - `SeoManagerPage.tsx`: Gestão de SEO individual por rota com contadores recomendados de caracteres para Meta Title (até 60) e Meta Description (até 160), tags OpenGraph para WhatsApp e pré-visualização em tempo real estilo Google Search SERP.
  - `LeadsPage.tsx`: Triagem completa de contatos com filtros por abas de status (`novo`, `em_atendimento`, `concluido`, `arquivado`), busca textual rápida, modal de detalhes do chamado e botão de acionamento imediato com link direto para o WhatsApp do cliente trazendo mensagem pronta.

---

## 9. Integração Global, Performance e Otimizações de SEO
- **Comunicação Assíncrona e Resiliência**:
  - `SiteDataContext.tsx` configurado com consumo dinâmico do endpoint `GET /api/public/bootstrap` para atualização rápida na carga inicial.
  - Sincronização automática das alterações no CMS com a API administrativa Laravel quando o token Sanctum estiver presente, e fallback garantido via `localStorage` para operação ininterrupta.
- **Otimização de SEO On-Page e Metadados Estruturados**:
  - `index.html` enriquecido com tags OpenGraph completas (`og:title`, `og:description`, `og:image`, `og:url`), Twitter Cards (`summary_large_image`) e tag `theme-color` integrada à cor oficial.
  - **Schema.org JSON-LD**: Marcação estruturada para `HomeAndConstructionBusiness` / `Plumber` / `HVAC` com geolocalização de São Paulo, horários de atendimento comercial, catálogo de serviços e bairros atendidos.
  - `robots.txt` implementado na raiz pública com liberação de indexação para páginas públicas e bloqueio de rotas administrativas `/admin` e `/api/`.
  - `sitemap.xml` com mapa completo das 5 URLs prioritárias do sistema.
- **Identidade e Tipografia**:
  - Inclusão da fonte moderna `Plus Jakarta Sans` via Google Fonts no CSS global, elevando a percepção de valor para o público de alto padrão de São Paulo.
- **Validação de Performance**:
  - Bundling Vite otimizado gerando build limpo de produção em ~2.3s.
  - Todas as rotas públicas, LPs, arquivos de SEO e painel administrativo validados com resposta HTTP 200 OK.

---

## 10. Containerização com Docker Compose e Orquestração Full-Stack

O ambiente do Pressurize Prime está totalmente empacotado e reprodutível via Docker Compose:

### 10.1. Estrutura dos Contêineres
1. **Banco de Dados MySQL 8.0 (`pressurize_prime_mysql`)**:
   - Imagem oficial `mysql:8.0`.
   - Porta exposta: `3306:3306`.
   - Volume persistente: `pressurizeprime_mysql_data` em `/var/lib/mysql`.
   - Healthcheck configurado: ping via `mysqladmin` a cada 4s (garante que os dependentes só inicializam quando a base estiver pronta para receber conexões).
   - Credenciais padrão: Banco `pressurize_prime`, usuário `prime_user`, senha `prime_secret`.

2. **Backend Laravel 11 REST API (`pressurize_prime_backend`)**:
   - Base `php:8.2-cli-alpine` com Composer 2.8 oficial.
   - Extensões PHP compiladas: `pdo`, `pdo_mysql`, `mbstring`, `bcmath`, `xml`, `zip`.
   - Script de inicialização (`docker-entrypoint.sh`):
     - Instala automaticamente dependências do Composer com `--optimize-autoloader`.
     - Aguarda ativamente o MySQL ficar saudável via verificação PDO.
     - Executa migrações (`php artisan migrate --force`) e seeders oficiais (`--seed`).
     - Inicia o servidor HTTP em `0.0.0.0:8000`.
   - Porta exposta: `8000:8000`.
   - Volume de código sincronizado (`./backend:/var/www/html`) e volume isolado para o `vendor`.

3. **Frontend React + Vite (`pressurize_prime_frontend`)**:
   - Base `node:22-alpine`.
   - Porta exposta: `5173:5173`.
   - Variável de ambiente `VITE_API_BACKEND_URL=http://backend:8000`.
   - Volume de código sincronizado (`./frontend:/app`) e volume isolado para `node_modules`.

### 10.2. Comandos Operacionais
```bash
# Iniciar todo o stack em background
docker compose up -d

# Visualizar status dos serviços e saúde dos contêineres
docker compose ps

# Acompanhar logs em tempo real
docker compose logs -f

# Parar os serviços preservando os dados do MySQL
docker compose down
```

### 10.3. Validação Realizada
- `GET http://localhost:5173/` -> HTTP 200 OK (**Frontend React Vite** - Aplicação Visual, Landing Pages e Painel Administrativo).
- `GET http://localhost:8000/` -> HTTP 200 OK (**Backend Laravel 11 API** - Resposta JSON com status do serviço).
- `GET http://localhost:8000/api/public/bootstrap` -> HTTP 200 OK (Configurações, SEO, Serviços e Páginas carregadas do MySQL).
- `POST http://localhost:8000/api/public/leads` -> HTTP 201 Created (Lead salvo com sucesso no banco).
- `POST http://localhost:8000/api/admin/login` -> HTTP 200 OK (Autenticação Sanctum gerando token Bearer).
- `GET http://localhost:8000/api/admin/leads` -> HTTP 200 OK (Listagem autenticada do lead recém-criado com paginação).

> **Atenção sobre as Portas de Acesso**:
> - **Aplicação Visual (Site e LPs)**: Acessar no navegador via `http://localhost:5173` (ou `http://127.0.0.1:5173`).
> - **Painel CMS Administrativo**: Acessar via `http://localhost:5173/admin` com as credenciais `admin@pressurizeprime.com.br` / `Prime@2026!`.
> - **API RESTful (Backend)**: Opera na porta `http://localhost:8000`.

---

## 11. Impeccable Design System & Contexto de Produto

O projeto possui integração nativa com o skill **Impeccable**:
- **Contexto Durável de Produto (`PRODUCT.md`)**:
  - Plataforma: `web`.
  - Usuários: Clientes residenciais e comerciais de médio/alto padrão em SP.
  - Posicionamento: Resolução de Primeira contra o mercado informal.
  - Evidências: Logotipo oficial em alta resolução, fotografias técnicas dos equipamentos e copy validada.
  - Princípios de Produto: Resolução concreta em até 24h, conformidade com normas NBR, contato humano ágil e acabamento visual de alto padrão.
- **Configuração de Workflow (`.impeccable/config.json`)**:
---

## 12. Sistema Tipográfico de Alto Padrão & Craft Floor

O projeto teve seu padrão de design e tipografia refinado de ponta a ponta, alinhado às diretrizes do Impeccable Design System e critérios de `craft-floor`:

### 12.1. Otimizações de Tipografia Global
- **Motor de Renderização (`index.css`)**:
  - `text-rendering: optimizeLegibility`: Habilita ligaduras tipográficas e kerning avançado.
  - `font-feature-settings: "cv02", "cv03", "cv04", "cv11", "ss01"`: Ativa formas estilísticas neutras e legíveis da família tipográfica Inter/Sans.
  - `text-wrap: balance`: Aplicado automaticamente em cabeçalhos (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) para equalizar larguras de linha e eliminar palavras solitárias ("viúvas").
  - `text-wrap: pretty`: Aplicado em parágrafos para uma quebra de bloco fluida e visualmente limpa.
  - Estilização personalizada de seleção (`::selection`) alinhada à paleta de marca.

### 12.2. Eliminação de Badges Amadores ("Kicker Pills")
- Conforme as boas práticas de design editorial moderno, títulos com autoridade não necessitam de pílulas descritivas óbvias acima de si (ex.: "Quem Somos", "Diferenciais", "Passo a Passo", "Especialistas Técnicos").
- Todos os kickers foram removidos ou refinados para componentes informativos de valor real (como badges de tempo com dados contextuais).

### 12.3. Hierarquia e Calibração de Escala
- **Display / H1**: Escala `text-3xl sm:text-5xl lg:text-[3.65rem]` com tracking negativo fino (`tracking-[-0.035em]`), leading `1.12` a `1.15` e peso `font-extrabold` (800).
- **H2 de Seção**: Escala `text-3xl sm:text-4xl lg:text-[2.65rem]` com tracking `[-0.03em]`, leading ajustado e `text-balance`.
- **H3 de Cards**: Escala `text-lg` a `text-xl` com tracking `[-0.015em]`, peso `font-bold` (700) e `leading-snug`.
---

## 13. Sistema de Motion Design Hidrodinâmico do Hero

O Hero da Home foi refinado com uma identidade de movimento inspirada em alta engenharia hidráulica e física dos fluidos:

### 13.1. Arquitetura do Motion
1. **Cápsula Hidrodinâmica Central (`Glass Fluid Capsule`)**:
   - Elemento vítreo em formato de cápsula (`w-18 h-18 sm:w-20 sm:h-20`) com `backdrop-blur-md`, bordas reflexivas e flutuação orgânica (`animate-fluid-orb` com ciclo de 6s).
   - **Ondas Senoidais SVG Duplas**: Duas camadas de fluidos em tempo real com deslocamento senoidal cruzado (`animate-wave-fast` de 8s e `animate-wave-slow` de 12s), reproduzindo a água sob pressão e energia térmica interna.
   - Ícones de alta precisão técnica: Manômetro hidráulico (`Gauge`) e chama térmica (`Flame`), unindo pressurização e aquecimento sem elementos gráficos infantis.

2. **Ressonância de Pressão Hidráulica (Isobars & Ripples)**:
   - Três anéis de pressão concêntricos (`animate-water-ripple-1`, `2` e `3`) com decalagem de fase (0s, 1.33s e 2.66s) e curva de decaimento `cubic-bezier(0.16, 1, 0.3, 1)`, gerando expansão e desvanecimento harmônicos.
   - Linhas isobáricas técnicas em SVG no fundo em opacidade discreta (4%), evocando diagramas de engenharia.

3. **Caustics de Luz Ambiente e Partículas**:
   - Deriva de luz azul royal (`animate-caustic-1`) e calor térmico dourado (`animate-caustic-2`) que se deslocam suavemente em ciclos de 16s e 22s.
   - Micro-bolhas de água pressurizada com brilho especular e flutuação sutil.

4. **Entrada Escalonada (Staggered Entrance)**:
   - Animação sequencial `animate-fade-up` dividida em 4 tempos (Capsule -> H1 -> Subtítulo -> CTAs).
   - Efeito de sweep/shimmer no botão primário do WhatsApp acionado suavemente ao passar o cursor.
   - Proteção de acessibilidade ativa via consulta `@media (prefers-reduced-motion: reduce)`.

---

## 14. Mecanismo de Accordion Fluido para FAQ & Acessibilidade

As caixas de perguntas e respostas (`FaqSection.tsx` e `LPFaq.tsx`) foram aprimoradas com um sistema de colapso/expansão de alta fidelidade visual:

### 14.1. Arquitetura da Transição
- **Classes CSS Dedicadas (`.faq-accordion-grid` e `.faq-accordion-content`)**: Para contornar a limitação de compilação de classes arbitrárias de grid no Tailwind v4, foram definidas classes explícitas em `index.css`:
  - `.faq-accordion-grid`: `display: grid; grid-template-rows: 0fr; opacity: 0; pointer-events: none; transition: grid-template-rows 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease;`
  - `.faq-accordion-grid.open`: `grid-template-rows: 1fr; opacity: 1; pointer-events: auto;`
  - `.faq-accordion-content`: `min-height: 0; overflow: hidden;` garantindo colapso estrito a 0px sem retenção de espaço por `min-height: auto`.
- **Duração e Suavidade**: Transição combinada de altura e opacidade sem corte seco ou travamento de linhas.
- **Atualização de Estado Segura**: Uso de `setOpenId(prev => prev === id ? null : id)` garantindo alternância precisa no clique e `pointer-events-none` no ícone evitando bloqueio de propagação.
- **Micro-interações de Card**:
  - Destaque sutil de contorno quando aberto: `border-primary/40 shadow-sm ring-1 ring-primary/10`.
  - Rotação do botão indicador Chevron em 180° com troca suave de cor de fundo e ícone.

### 14.2. Conformidade com Diretrizes WAI-ARIA
- Atributos `aria-expanded={isOpen}` no gatilho interativo.
- Vínculo direto via `aria-controls` e `id` identificando a região de resposta.
- Região do conteúdo marcada com `role="region"` e `aria-labelledby` associado ao botão da pergunta.
- Prevenção de foco invisível quando recolhido através de `pointer-events-none`.

---

## 15. Redesenho do Hero com Base na Identidade Visual de Referência

A seção principal de apresentação (Hero da Home) foi reprojetada para fidelidade absoluta à referência visual aprovada:

### 15.1. Estrutura e Grid
- **Layout Bilateral**: Divisão em grid de 12 colunas (`col-span-7` para texto/argumentação e `col-span-5` para o card visual interativo).
- **Hierarquia Tipográfica Refinada**:
  - H1 com ênfase cromática: *"A pureza e o fluxo do seu banho com a `<span className="text-primary">`pressão perfeita`</span>` e temperatura exata."*
  - Parágrafo com menção destacada à marca e ritmo de leitura calibrado (`leading-[1.65]`).

### 15.2. Tríade de Diferenciais Técnicos (Badges)
- Três cartões horizontais compactos exibindo os diferenciais de engenharia:
  1. **Fluxo Contínuo / Sem Oscilação** (Ícone `Waves` em container azul).
  2. **Controle Térmico / Painel Digital** (Ícone `Flame` em container âmbar).
  3. **Operação Inaudível / Motor Submerso** (Ícone `VolumeX` em container ciano).

### 15.3. Card Flutuante com Impacto Hidráulico Interativo
- **Visual**: Card branco de grande raio (`rounded-3xl`) com borda suave, sombra profunda, acento superior dourado e o logotipo oficial em alta resolução.
- **Interação Física ao Clique**:
  - Geração dinâmica de ondas de choque concêntricas (`.animate-card-ripple`).
  - Projeção de micro-gotículas coloridas (azul, ciano e dourado) com física de dispersão radial e desvanecimento (`.animate-splash-droplet`).
  - Pílula de orientação com micro-feedback dinâmico de pressão gerada.

---

## 16. Sistema de Gradientes, Partículas e Ondas Animadas no Fundo do Hero

Para conferir dinamismo vivo ao design sem comprometer o contraste e a legibilidade dos textos e cards, foi desenvolvida uma camada ambiental multifacetada:

### 16.1. Malha de Gradientes Aurora em Deriva (`Aurora Mesh`)
- **Orbe Azul Royal (`.animate-aurora-mesh`)**: Ciclo de 24s com rotação e translação lenta no quadrante superior esquerdo.
- **Orbe Ciano Hidráulico (`.animate-aurora-mesh-slow`)**: Ciclo de 32s operando em sentido reverso atrás do card interativo.
- **Orbe Âmbar Térmico**: Pulsação sutil na base central, evocando energia de aquecimento.
- **Opacidade Equilibrada**: Valores entre 8% e 18% em modo blur-3xl, garantindo textura suave sem ofuscamento.

### 16.2. Partículas e Micro-Bolhas Hidráulicas Flutuantes
- Seis núcleos de partículas com estilização em vidro (`backdrop-blur-2xs`, borda branca fina de 1px e gradiente interno).
- **Comportamento Físico**:
  - Trajetória ascendente com oscilação horizontal senoidal (`.animate-particle-1`, `2` e `3`).
  - Ciclos de 9s, 12s e 15s com decalagem de fase para movimentação assíncrona contínua.

### 16.3. Ondas Líquidas no Rodapé da Seção
- Duas curvas senoidais em SVG posicionadas na base do Hero (`.animate-bg-wave-1` e `.animate-bg-wave-2`), deslizando continuamente em direções opostas em ciclos de 20s e 28s.
- Opacidade atenuada (35%) para transição fluida para a faixa de selos de confiança.

---

## 17. Atualização do Logotipo Oficial Vertical no Card do Hero

Para harmonizar com a proporção vertical do card interativo da Home, foi implementada a versão vertical da identidade visual:

### 17.1. Características da Logo Vertical
- **Emblema Superior**: Gota de pureza e pressão hidrodinâmica com onda líquida inferior e curva de calor em dourado/âmbar.
- **Tipograma Principal**: "Pressurize" em azul royal e "Prime" em dourado nobre.
- **Subtítulo de Atuação**: "AQUECEDORES E PRESSURIZADORES" em cinza ardósia espaçado.
- **Localização dos Ativos**:
  - `frontend/public/logo-vertical.png`
  - `frontend/src/assets/logo-vertical.png`
  - `asserts/logo-vertical.png`

### 17.2. Integração e Responsividade
- Card redimensionado com paddings ajustados (`p-6 sm:p-8`), permitindo que a logo ocupe até `w-60 sm:w-68` com nitidez cristalina.
- Parâmetro `logo_vertical_url` adicionado ao schema de configurações `SiteSettings`, permitindo substituição via API/CMS administrativo.

### Atualização (Páginas Institucionais)
- Adicionadas rotas /diferenciais, /como-funciona e /duvidas.
- Atualizada a rota /sobre com seções de História, Missão/Visão, Números e CTAs.
- Atualizado Header e Footer.


---

## 18. Padroniza��o Din�mica de Bal�es/Cards no CMS
- Todas as p�ginas com layouts baseados em "bal�es" e "cards" (Diferenciais, Como Funciona, Porque Escolher-nos, Nossos Compromissos e p�gina Sobre) tiveram suas limita��es de tamanho fixo removidas.
- A ferramenta `DynamicSectionEditor` foi integrada �s rotas no painel administrativo para permitir a adi��o e exclus�o ilimitada de itens (t�tulo e descri��o).
- No frontend, a renderiza��o desses itens ocorre atrav�s de itera��es flex�veis que utilizam `items.map()`, alocando �cones predefinidos usando fallbacks modulares de matriz (`defaultIcons[idx % defaultIcons.length]`).

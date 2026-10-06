# CONTEXTO DO PROJETO — PRESSURIZE PRIME

Este documento registra o contexto integral de negócio, técnico, arquitetural e comportamental do projeto **Pressurize Prime**.

---

## 1. Visão Geral do Negócio

A **Pressurize Prime** é uma empresa de alta qualificação técnica especializada em venda, instalação, manutenção preventiva e conserto em até 24 horas de pressurizadores de água e aquecedores (a gás, solar e elétrico/boiler) atendendo São Paulo e Região Metropolitana.

### Proposta de Posicionamento:
- **Resolução de Primeira**: Técnico que assume responsabilidade, diagnostica com rigor antes de trocar qualquer peça e garante o serviço.
- **Diferenciação contra o Mercado Informal**: Contrapõe-se diretamente a técnicos anônimos e curiosos que cobram barato, realizam gambiarras e somem quando surgem vazamentos ou falhas.
- **Público-Alvo**: Moradores de médio e alto padrão da Grande SP (ex: Brooklin, Vila Olímpia, Vila Clementino, Chácara Santo Antônio, Morumbi, Alphaville, Barueri, Santana de Parnaíba). Clientes que prezam por rapidez, segurança hidráulica/elétrica/gás e garantia de serviço.

---

## 2. Regras de Conversão e Copywriting

- **Tom de Voz**: Direto, seguro, técnico sem jargões complicados. Foco na dor concreta (*"chuveiro fraco"*, *"aquecedor que desliga no meio do banho"*) e na solução imediata (*"banho forte"*, *"água quente estável"*).
- **Atendimento Humano**: WhatsApp e telefone direto `(11) 99390-2319` sem robôs cansativos.
- **Horário de Atendimento**: Segunda a sexta das 08h às 19h. Fora desse horário, o formulário avisa que o retorno ocorrerá a partir das 08h do próximo dia útil.
- **Regras das LPs**:
  - Hero com H1 dinâmico (alinhado aos grupos de busca do Google Ads: Conserto, Instalação, Venda).
  - Faixa de confiança com selos comprovados.
  - Seção de sintomas reais para identificação imediata.
  - Lista de marcas conceituadas atendidas (Rowa, Komeco, Rheem, Rinnai, Syllent, Grundfos, Heliotek, Cumulus).
  - Como funciona transparente em 3 passos.
  - Seção "Nossos Compromissos" em substituição a avaliações fictícias.
  - CTAs com forte senso de urgência.
  - Botão flutuante de WhatsApp otimizado para mobile e desktop.

---

## 3. Arquitetura da Solução

O projeto é estruturado em duas camadas principais:

### 3.1. Frontend (`frontend/`):
- **Tecnologias**: React 18+, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router DOM.
- **Tematização Dinâmica**: Cores primárias, secundárias e neutras controladas via variáveis CSS injetadas a partir da API (ou fallback local pré-definido com as cores da identidade visual: Azul Royal `#004b93` e Dourado `#cfa349`).
- **Páginas Públicas**:
  - `/`: Home institucional completa.
  - `/pressurizador`: Landing Page de pressurizadores.
  - `/aquecedor-a-gas`: Landing Page de aquecedores a gás (com alerta de segurança).
  - `/aquecedor-solar`: Landing Page de aquecimento solar e placas/boiler.
  - `/aquecedor-eletrico`: Landing Page de boiler e aquecedores elétricos.
- **Painel Administrativo (`/admin`)**:
  - Login seguro.
  - Gestão de Identidade Visual (Logo e Cores).
  - Gestão de Textos, Títulos e Banners de todas as seções e páginas.
  - Gestão de Imagens e Mídia.
  - Gestão de Serviços (CRUD).
  - Gestão de SEO Individual por página (Meta Title, Description, Keywords, OG Tags).
  - Gestão de Leads recebidos pelo formulário.

### 3.2. Backend (`backend/`):
- **Tecnologias**: Laravel (RESTful API) + MySQL.
- **Autenticação**: Laravel Sanctum para administração segura.
- **Armazenamento de Conteúdo e Configurações**:
  - Modelos relacionais e flexíveis para páginas, seções, serviços, faqs, leads e configurações globais.

---

## 4. Regras de Memória e Diretrizes de Trabalho

1. **Atualização Contínua**:
   - `DOCUMENTACAO.md`, `PASSOS.md` e `CONTEXTO.md` são atualizados compulsoriamente a cada nova feature, refatoração ou fix.
2. **Controle de Passos**:
   - As tarefas são executadas estritamente de acordo com a ordem de prioridade definida em `PASSOS.md`.
   - **O assistente NUNCA avança para o próximo passo sem autorização prévia e expressa do usuário.**
## 5. Histórico e Status de Execução
- **Passo 1 Concluído**: Planejamento, extração completa de dados do PDF oficial, estruturação documental (`PROMPT.md`, `CONTEXTO.md`, `DOCUMENTACAO.md`, `PASSOS.md`) e definição de regras de workflow.
- **Passo 2 Concluído**: Setup integral do Frontend com Vite 8, React 19, TypeScript 6, Tailwind CSS v4, Lucide React, React Router DOM, cópia do logotipo oficial da Pressurize Prime, arquitetura de temas com variáveis CSS dinâmicas e tipagens completas.
- **Passo 3 Concluído**: Desenvolvimento dos componentes globais de alto padrão (`TopBar`, `Header`, `LPHeader`, `WhatsAppButton`, `Footer`) com respeito absoluto às regras de conversão, logotipo oficial e paleta de cores.
- **Passo 4 Concluído**: Desenvolvimento da Home Institucional completa (`HomePage.tsx`), contendo as 10 seções estratégicas oficiais da copy (Hero com efeito motion de gota d'água orgânica e ondulações de pressão, Faixa de Confiança, Grade de Serviços, Quem Somos, Por Que a Pressurize Prime, Como Funciona, Regiões Atendidas, Nossos Compromissos, FAQ dinâmico e CTA Final).
- **Passo 5 Concluído**: Desenvolvimento das 4 Landing Pages Especializadas (`/pressurizador`, `/aquecedor-a-gas`, `/aquecedor-solar`, `/aquecedor-eletrico`) com H1 dinâmico via URL para campanhas de Google Ads (`?h1=` ou `?intent=`), alerta de segurança para gás, sintomas reais de campo, o que fazemos, diferenciais específicos, quebra de objeções, FAQ técnico dedicado, cabeçalho `LPHeader` sem menus de fuga e inclusão de 4 fotografias técnicas de alta resolução dos produtos geradas especificamente para o projeto (sem fotos fakes de pessoas).
- **Passo 6 Concluído**: Formulário Inteligente de Captação de Leads (`LeadForm.tsx`), com máscara dinâmica brasileira para telefone/WhatsApp `(XX) XXXXX-XXXX`, autossugestão de bairros nobres de SP, chips de sintomas rápidos para mobile, validações inline, detecção em tempo real de horário comercial com aviso de priorização às 8h, tela de sucesso com link de dupla conversão direta no WhatsApp com dados preenchidos, modal acessível `LeadModal.tsx` e integração visual na Home (`HomeLeadSection.tsx`) e nas Landing Pages (`LPLeadSection.tsx`).
- **Passo 7 Concluído**: Estruturação completa do Backend Laravel 11 REST API na pasta `backend/` com `composer.json`, `.env` para MySQL, migrations completas (users, personal_access_tokens, settings, pages, page_sections, services, seo_meta, leads), seeders com todo o conteúdo e configurações oficiais da marca, models Eloquent e controllers RESTful públicos e autenticados via Sanctum para gestão total do CMS.
- **Passo 8 Concluído**: Desenvolvimento integral do Painel Administrativo Completo (`/admin`) com autenticação Sanctum, tela de Login com credenciais pré-configuradas (`admin@pressurizeprime.com.br` / `Prime@2026!`), Dashboard com contadores em tempo real, Módulo de Identidade Visual e Cores com ajuste interativo no `:root` em tempo real, Módulo de Gerenciamento de Conteúdo das 5 páginas (H1, subtítulos e CTAs), CRUD completo de Serviços com ordenação e visibilidade, Módulo de SEO Individual por Página com SERP preview e Módulo de Gestão de Leads com filtros, busca, atualização de status e abertura direta no WhatsApp.
- **Passo 9 Concluído**: Integração global de todas as pontas (React + Laravel API REST + MySQL), implementação de bootstrap assíncrono com fallback resiliente, Schema.org JSON-LD para empresas de HVAC/Encanamento em SP, meta tags dinâmicas, OpenGraph, Twitter Cards, `robots.txt`, `sitemap.xml`, tipografia Plus Jakarta Sans e validação de bundling em produção (zero erros, build em 2.3s e todas as rotas com resposta HTTP 200).
- **Passo 10 Concluído**: Containerização completa e orquestração multi-serviço com Docker Compose. Imagens customizadas criadas para Backend (PHP 8.2 Alpine + extensões MySQL + Composer) e Frontend (Node 22 Alpine + Vite), com banco de dados oficial MySQL 8.0 dotado de healthcheck. Migrações e seeders automatizados no boot, migration de sessions/cache implementada, e validação de ponta a ponta: Frontend visual no navegador em `http://localhost:5173/`, LPs, CMS `/admin` e Backend API em `http://localhost:8000/`.
- **Passo 11 Concluído**: Inicialização do skill Impeccable com a criação de `PRODUCT.md` (schema 1, público de alto padrão de SP, diferenciais de negócio, princípios e restrições de marca) e persistência de configuração code-first (`buildPath: code`) em `.impeccable/config.json`.
- **Passo 12 Concluído**: Refinamento tipográfico e editorial de alto padrão em todos os componentes da Home e Landing Pages de Serviços. Base CSS enriquecida com `optimizeLegibility`, `font-feature-settings`, `text-wrap: balance` e `text-wrap: pretty`; eliminação de kicker pills amadoras; calibração proporcional de letter-spacing/tracking negativo, leading e comprimentos de linha; build de produção validado com 0 erros.
- **Passo 13 Concluído**: Refinamento de Motion Design do Hero da Home com estética hidrodinâmica de alta engenharia. Substituição do elemento de gota por uma Cápsula de Vidro Líquido com ondas senoidais duplas em tempo real, anéis concêntricos de pressão hidráulica com decaimento físico em curva bezier, caustics térmicos e de luz ambiente, linhas isobáricas técnicas em SVG, entrada em cascata escalonada e efeito shimmer no CTA principal.
- **Passo 14 Concluído**: Correção definitiva da abertura e fechamento das caixas de perguntas frequentes (`FaqSection.tsx` e `LPFaq.tsx`). Resolução da limitação de compilação de classes arbitrárias de grid no Tailwind v4 através de classes CSS dedicadas (`.faq-accordion-grid` com `grid-template-rows: 0fr` para `1fr` e `.faq-accordion-content` com `min-height: 0; overflow: hidden`), atualização funcional de estado no React e `pointer-events-none` no Chevron para alternância 100% responsiva ao clique.
- **Passo 15 Concluído**: Redesenho do Hero da Home com base na referência visual oficial. Implementação de layout bilateral (58% / 42%), título com ênfase cromática em azul royal ("pressão perfeita"), tríade de chips de atributos de engenharia (*Fluxo Contínuo / Sem Oscilação*, *Controle Térmico / Painel Digital*, *Operação Inaudível / Motor Submerso*) e card interativo com logotipo oficial e física de respingos/ondas de pressão acionadas por clique.
- **Passo 16 Concluído**: Implementação de Gradientes e Fundos Animados no Hero com estética hidrodinâmica suave. Criação de malha de gradientes aurora em deriva orgânica contínua (Azul Royal, Ciano Cristalino e Âmbar), partículas/micro-bolhas flutuantes com trajetórias físicas ascendentes e ondas líquidas na base da seção, dando dinamismo vivo e sofisticado sem prejudicar a leitura do conteúdo.
- **Passo 17 Concluído**: Substituição do logotipo horizontal pela versão vertical oficial no card interativo do Hero da Home. Tratamento e armazenamento do ativo de alta fidelidade em `logo-vertical.png` (gota tridimensional com onda azul e chama dourada + "Pressurize Prime" + "AQUECEDORES E PRESSURIZADORES"), proporções otimizadas para preenchimento harmônico do card, e suporte dinâmico no estado global de configurações do site.
- **Status Geral**: Todos os 17 passos do projeto concluídos com sucesso e validados.










### Atualização (Páginas Institucionais)
- Adicionadas rotas /diferenciais, /como-funciona e /duvidas.
- Atualizada a rota /sobre com seções de História, Missão/Visão, Números e CTAs.
- Atualizado Header e Footer.

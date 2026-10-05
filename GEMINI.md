# Instruções e Regras Permanentes de Workflow - Pressurize Prime

## Diretrizes Mandatórias do Projeto

1. **Atualização de Documentos**:
   - Ao final de toda e qualquer alteração (feature, correção, ajuste de layout ou backend), atualizar obrigatoriamente os seguintes arquivos na raiz do projeto:
     - `DOCUMENTACAO.md`
     - `PASSOS.md`
     - `CONTEXTO.md`
     - `PROMPT.md` (se houver mudanças nos requisitos ou dados de negócio)

2. **Geração de Texto para Commit**:
   - Ao final de cada implementação ou correção, SEMPRE gerar uma sugestão de texto para commit no padrão Conventional Commits (título e corpo detalhado).

3. **Execução de Passos por Demanda**:
   - O projeto é executado estritamente conforme o checklist de prioridades em `PASSOS.md`.
   - **NÃO iniciar o próximo passo até que o usuário solicite explicitamente.**
   - Sempre marcar com `[x]` os passos concluídos e relatar o status final do passo corrente.

4. **Stack Tecnológica e Arquitetura**:
   - **Frontend**: React + TypeScript + Vite + Tailwind CSS.
   - **Backend**: Laravel API RESTful.
   - **Banco de Dados**: MySQL.
   - **Painel Administrativo CMS Completo**: Controle absoluto de:
     - Textos e Títulos de todas as seções e landing pages.
     - Imagens e Logotipo oficial (`asserts/WhatsApp Image 2026-10-05 at 15.25.27.jpeg`).
     - Cores do site (variáveis de estilo customizáveis).
     - Gestão de Serviços (adição, edição, exclusão, ordenação).
     - Gestão de SEO individual por página (Meta Title, Meta Description, Keywords, OpenGraph).
     - Formulário e captação de leads.

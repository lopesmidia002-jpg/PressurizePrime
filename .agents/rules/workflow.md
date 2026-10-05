# Regras de Workflow e Desenvolvimento - Pressurize Prime

Estas regras são de execução obrigatória para o assistente em todas as interações e turnos deste projeto:

1. **Atualização Contínua de Arquivos de Contexto e Documentação**:
   - Ao final de cada **feature**, **correção (fix)**, **refatoração** ou qualquer alteração no projeto, é OBRIGATÓRIO atualizar imediatamente os seguintes arquivos:
     - `DOCUMENTACAO.md`: refletindo novidades técnicas, rotas, schemas de banco ou arquitetura.
     - `PASSOS.md`: atualizando o progresso, marcando os checkboxes `[x]` das etapas finalizadas e mantendo o status em sincronia.
     - `CONTEXTO.md`: adicionando novos contextos, decisões tomadas ou novos recursos integrados.

2. **Mensagem / Texto para Commit Obrigatório**:
   - Sempre, ao final de qualquer implementação ou correção, gerar e exibir ao usuário uma sugestão clara de texto para commit seguindo a convenção **Conventional Commits** (ex: `feat(admin): ...`, `fix(hero): ...`, `chore(docs): ...`), com título conciso e descrição detalhada das mudanças.

3. **Controle Estrito de Execução de Passos**:
   - Seguir rigorosamente a ordem de passos definida em `PASSOS.md`.
   - **NUNCA iniciar o próximo passo sem a autorização expressa do usuário**.
   - Conclua o passo atual, atualize os arquivos, apresente o commit e aguarde o comando do usuário para avançar.

4. **Diretrizes de Qualidade e Stack**:
   - Frontend: React + TypeScript + Vite + Tailwind CSS (com suporte a variáveis de cores personalizáveis e painel administrativo dinâmico).
   - Backend: Laravel API REST + MySQL.
   - Padrão visual de alta performance, sem clichês, design moderno e focado em conversão de alto padrão (São Paulo).
   - Administrador completo: textos, títulos, imagens, logo, paleta de cores, serviços e SEO individual de cada página gerenciáveis via painel admin.

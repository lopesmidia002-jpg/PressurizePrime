# Pressurize Prime

Bem-vindo ao repositório oficial da **Pressurize Prime**!

A **Pressurize Prime** é uma aplicação completa (Frontend e Painel Administrativo) projetada para oferecer uma experiência de alta performance e usabilidade na gestão e conversão de serviços de pressurizadores e aquecedores de água na Grande São Paulo.

## 🚀 Tecnologias Utilizadas

- **Frontend:** React + TypeScript + Vite
- **Estilização:** Tailwind CSS (Mobile-First, Design Premium)
- **Gerenciamento de Estado:** Context API
- **Arquitetura Visual:** Layouts baseados em Cartões Responsivos (Cards)
- **Backend:** Laravel API RESTful
- **Banco de Dados:** MySQL

## 📱 Funcionalidades do Painel Administrativo

O painel de controle (CMS) permite total autonomia operacional para a empresa:
- **Gestão de Leads:** Interface responsiva estilo Kanban/Card para gerenciar clientes captados pelo site, com botão direto para chamar no WhatsApp.
- **Configurações Gerais:** Gerenciamento do logotipo oficial, contatos comerciais e e-mail. Upload de arquivos facilitado.
- **Gestão de SEO:** Total controle das Meta Tags (Título, Descrição, Palavras-chave) e OpenGraph (Imagem e Título de compartilhamento no WhatsApp).
- **Gerenciamento de Serviços:** Adição, edição e controle visual dos cards de serviço exibidos na página inicial, incluindo upload direto das imagens ilustrativas.

## 🛠️ Como Executar Localmente (Docker)

Todo o ecossistema do projeto está configurado para rodar de forma isolada e automatizada usando contêineres Docker, o que significa que você não precisa instalar Node, PHP ou MySQL no seu computador.

### 1. Requisitos
- **Docker Desktop** instalado e rodando.

### 2. Rodando o Projeto Completo
Abra o terminal na pasta raiz do projeto (`PressurizePrime`) e execute:

```bash
docker compose up -d --build
```
*Na primeira vez, o Docker vai baixar as imagens e construir o ambiente.*

### 3. Acessos e Links (Localhost)

Após iniciar os contêineres, os seguintes links estarão disponíveis no seu navegador:

- 🌍 **Página Inicial (Landing Page):** [http://localhost:5173](http://localhost:5173)
- ⚙️ **Painel Administrativo (Login):** [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
  - *Email:* `admin@pressurizeprime.com.br`
  - *Senha:* `password`
- 🗄️ **API Backend (Laravel):** [http://localhost:8000/api/public/bootstrap](http://localhost:8000/api/public/bootstrap)

*Nota: Para ver as mudanças no código em tempo real, basta editar os arquivos na sua máquina; o Docker com Hot Reload atualiza o navegador automaticamente!*

## ⚙️ Layout Responsivo

Todos os painéis e tabelas foram adaptados do desktop para uma experiência nativa de aplicativos no celular, removendo limites horizontais e usando colunas e quebras de texto automáticas.

---
*Pressurize Prime - Ofício Especializado e Padrão Operacional em São Paulo.*

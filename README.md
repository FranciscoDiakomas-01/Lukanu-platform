# 📚 Lukanu — Plataforma Inteligente de Aprendizado e Vendas Digitais

> **Lukanu** é um ecossistema digital que conecta **professores, alunos e afiliados** em um ambiente completo de aprendizado, leitura e monetização.

---

## 🚀 Visão Geral

A **Lukanu** é uma plataforma SaaS que integra:

- 📖 **E-books e Livros Digitais**
- 🎓 **Cursos e Aulas Online**
- 💬 **Chat Interativo entre Alunos e Professores**
- 💰 **Sistema de Vendas e Afiliações**
- 🧠 **Painel Administrativo Inteligente**

Ela foi projetada para **professores, instituições e criadores de conteúdo** que desejam vender conhecimento e materiais digitais de forma automatizada.

---

## 🧩 Módulos Principais

### 🏫 1. Módulo de Aulas

- Criação de cursos e módulos com vídeos, PDFs e anexos.
- Progresso e desempenho do aluno em tempo real.
- Emissão automática de certificados.
- Sistema de avaliações e feedbacks.

### 📚 2. Módulo de E-books

- Upload e distribuição de eBooks em PDF.
- Controle de acesso baseado em turmas ou assinaturas.
- Visualização integrada de PDFs sem necessidade de download.

### 💬 3. Módulo de Chat

- Comunicação direta entre professores e alunos.
- Suporte a canais por curso ou grupo de estudo.
- Notificações em tempo real (WebSocket).

### 💰 4. Módulo de Vendas

- Sistema completo de **checkout e pagamento online**.
- Suporte a múltiplos métodos de pagamento.
- Faturamento automático e relatórios financeiros.
- Integração com gateways de pagamento.

### 🤝 5. Módulo de Afiliados

- Venda de cursos e produtos por comissão.
- Link de afiliado exclusivo para cada usuário.
- Painel de controle de ganhos e histórico de vendas.

### ⚙️ 6. Painel Administrativo

- Controle total de usuários, cursos, vendas e afiliados.
- Estatísticas em tempo real com gráficos dinâmicos.
- Configurações avançadas de permissões e acessos.

---

## 🧱 Arquitetura

| Camada              | Tecnologia                         |
| ------------------- | ---------------------------------- |
| **Frontend Web**    | Next.js + TailwindCSS + TypeScript |
| **Backend**         | NestJS + Prisma + GraphQL/REST     |
| **Banco de Dados**  | PostgreSQL                         |
| **Cache & Sessões** | Redis                              |
| **Armazenamento**   | AWS S3 / Cloudinary                |
| **Autenticação**    | JWT + Refresh Token                |
| **Infraestrutura**  | Docker + Nginx + CI/CD             |

---

## 🔐 Autenticação e Segurança

- Tokens de acesso (`access_token`) e atualização (`refresh_token`).
- Revalidação automática de sessão via refresh.
- Criptografia de senhas com bcrypt.
- Rate limiting e proteção contra brute force.

---

## 🧠 Funcionalidades Futuras

- 👥 Comunidades e fóruns internos.
- 🔎 Sistema de recomendação de cursos com IA.
- 🧩 Integração com marketplaces externos.
- 🪙 Pagamentos via criptomoeda.

---

## 💡 Missão

Empoderar educadores e estudantes africanos através da tecnologia, promovendo **acesso igualitário ao conhecimento digital**.

---

## 👨‍💻 Desenvolvido por

**Francisco Lombo Diakomas**  
Criando o futuro da educação digital com código, design e propósito.

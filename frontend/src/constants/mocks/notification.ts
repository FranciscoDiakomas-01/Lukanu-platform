import Notification from "@/types/notifications";

const notificationsMock: Notification[] = [
  {
    id: 1,
    title: "Pagamento Recebido",
    message: "Seu pagamento foi processado com sucesso.",
    deeplink: "/notificacoes/1",
    createdAt: new Date("2025-07-30T09:30:00"),
  },
  {
    id: 2,
    title: "Nova Mensagem",
    message: "Você recebeu uma nova mensagem do suporte.",
    createdAt: new Date("2025-07-29T14:45:00"),
  },
  {
    id: 3,
    title: "Erro de Processamento",
    message: "Ocorreu um erro ao processar sua solicitação.",
    deeplink: "/notificacoes/3",
    createdAt: new Date("2025-07-28T16:12:00"),
  },
  {
    id: 4,
    title: "Atualização de Sistema",
    message: "O sistema foi atualizado com melhorias de desempenho.",
    createdAt: new Date("2025-07-27T08:55:00"),
  },
  {
    id: 5,
    title: "Ebook Aprovado",
    message: "Seu ebook foi aprovado e publicado com sucesso.",
    deeplink: "/notificacoes/5",
    createdAt: new Date("2025-07-26T13:20:00"),
  },
  {
    id: 6,
    title: "Conta Atualizada",
    message: "As informações da sua conta foram atualizadas.",
    createdAt: new Date("2025-07-25T18:03:00"),
  },
  {
    id: 7,
    title: "Alerta de Segurança",
    message: "Detectamos uma tentativa de login suspeita.",
    deeplink: "/notificacoes/7",
    createdAt: new Date("2025-07-24T11:45:00"),
  },
  {
    id: 8,
    title: "Reembolso Efetuado",
    message: "Seu reembolso foi processado com sucesso.",
    createdAt: new Date("2025-07-23T10:40:00"),
  },
  {
    id: 9,
    title: "Nova Funcionalidade",
    message: "Uma nova funcionalidade foi adicionada ao painel.",
    deeplink: "/notificacoes/9",
    createdAt: new Date("2025-07-22T17:15:00"),
  },
  {
    id: 10,
    title: "Confirmação de Email",
    message: "Seu email foi confirmado com sucesso.",
    createdAt: new Date("2025-07-21T08:20:00"),
  },
  {
    id: 11,
    title: "Ebook Rejeitado",
    message: "Seu ebook foi rejeitado. Revise as informações.",
    deeplink: "/notificacoes/11",
    createdAt: new Date("2025-07-20T10:45:00"),
  },
  {
    id: 12,
    title: "Assinatura Renovada",
    message: "Sua assinatura foi renovada com sucesso.",
    createdAt: new Date("2025-07-19T14:12:00"),
  },
  {
    id: 13,
    title: "Promoção Ativada",
    message: "Uma nova promoção está ativa para sua conta.",
    createdAt: new Date("2025-07-18T09:55:00"),
  },
  {
    id: 14,
    title: "Troca de Senha",
    message: "Sua senha foi alterada com sucesso.",
    createdAt: new Date("2025-07-17T22:20:00"),
  },
  {
    id: 15,
    title: "Download Realizado",
    message: "O download do ebook foi concluído.",
    createdAt: new Date("2025-07-16T07:45:00"),
  },
  {
    id: 16,
    title: "Nova Avaliação",
    message: "Seu ebook recebeu uma nova avaliação.",
    createdAt: new Date("2025-07-15T15:30:00"),
  },
  {
    id: 17,
    title: "Nova Venda",
    message: "Parabéns! Você fez uma nova venda.",
    deeplink: "/notificacoes/17",
    createdAt: new Date("2025-07-14T12:10:00"),
  },
  {
    id: 18,
    title: "Erro ao Enviar Ebook",
    message: "Falha ao enviar o ebook. Tente novamente.",
    createdAt: new Date("2025-07-13T18:00:00"),
  },
  {
    id: 19,
    title: "Limite de Armazenamento",
    message: "Você está perto do limite de armazenamento.",
    createdAt: new Date("2025-07-12T08:40:00"),
  },
  {
    id: 20,
    title: "Sessão Expirada",
    message: "Sua sessão expirou. Faça login novamente.",
    createdAt: new Date("2025-07-11T20:30:00"),
  },
];

export default notificationsMock;

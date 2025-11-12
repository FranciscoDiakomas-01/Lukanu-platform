import { z } from "zod";

export const ebookSchema = z.object({
  title: z.string().min(5, "Título deve conter pelo menos 5 caracteres."),
  subtitle: z.string().min(5, "Subtítulo deve conter pelo menos 5 caracteres."),
  description: z
    .string()
    .min(10, "Descrição deve conter pelo menos 10 caracteres."),
  category: z.string().min(4).nonempty(),
  currentPrice: z.number().min(100, "Preço inválido"),
  pages: z.number().min(1),
  edition: z.number().min(1),
  isShared: z.boolean(),
  isDigital: z.boolean(),
  sharePercent: z.number().min(1).max(100),
  coverUrl: z.instanceof(File, { message: "Selecione uma imagem válida" }),
  fileURl: z.instanceof(File, { message: "Selecione um arquivo PDF válido" }),
});

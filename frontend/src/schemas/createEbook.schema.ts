import { z } from "zod";

export const ebookSchema = z.object({
  title: z
    .string()
    .min(2, { message: "O título deve ter no mínimo 2 caracteres." }),
  description: z
    .string()
    .min(10, { message: "A descrição deve ter no mínimo 10 caracteres." }),
  author: z.string().min(2, { message: "Autor é obrigatório." }),
  category: z.string().min(2, { message: "Categoria inválida." }),
  price: z
    .number({ error: "Preço deve ser um número." })
    .nonnegative({ message: "Preço não pode ser negativo." })
    .refine((val) => !isNaN(val), { message: "Preço inválido." }),
  cover: z.any().refine((file) => file instanceof File || file?.name, {
    message: "Imagem da capa é obrigatória.",
  }),
  pdfFile: z.any().refine((file) => file instanceof File || file?.name, {
    message: "Arquivo PDF é obrigatório.",
  }),
  allowAffiliates: z.boolean(),
  comition: z.number().min(0, "Preço não pode ser negativo").optional(),
});

export const physicalBookSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  category: z.string().min(1, "Selecione ao menos uma categoria"),
  language: z.string().min(1, "O idioma é obrigatório"),
  author: z.string().min(1, "O nome do autor é obrigatório"),
  publisher: z.string().min(1, "A editora é obrigatória"),
  publicationYear: z
    .number()
    .min(1000, "Ano inválido")
    .max(new Date().getFullYear(), "Ano no futuro não permitido"),
  edition: z.string().optional(),
  pages: z.number().min(1, "Número de páginas inválido"),
  format: z.string().min(1, "Informe o formato das folhas (ex: A5, 21x14cm)"),
  price: z.number().min(0, "Preço não pode ser negativo"),

  comition: z.number().min(0, "Preço não pode ser negativo").optional(),
  cover: z
    .custom<File>()
    .refine((file) => file instanceof File, "A capa é obrigatória"),
  allowAffiliates: z.boolean(),
});

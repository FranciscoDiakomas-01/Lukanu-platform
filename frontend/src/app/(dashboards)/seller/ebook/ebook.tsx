"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ebookSchema } from "@/schemas/createEbook.schema";
import { formatBytes } from "@/lib/utils";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, FileText, ImageIcon, Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { uploadAction } from "@/actions/upload";
import EBookClientService from "@/service/Ebook";

type EbookFormValues = z.infer<typeof ebookSchema>;

export default function CreateEbookForm({ token }: { token: string }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<EbookFormValues>({
    resolver: zodResolver(ebookSchema),
    defaultValues: {
      title: "",
      description: "",
      subtitle: "",
      category: "",
      currentPrice: 100,
      edition: 1,
      isShared: false,
      isDigital: true,
      sharePercent: 1,
      pages: 1,
      coverUrl: undefined as any,
      fileURl: undefined as any,
    },
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isAlowedComition, setisAllowedComitons] = useState(false);
  const service = new EBookClientService(token);
  function onSubmit(data: EbookFormValues) {
    startTransition(async () => {
      const fd = new FormData();
      fd.append("coverUrl", data.coverUrl);
      fd.append("fileURl", data.fileURl);
      const res = await uploadAction(fd);
      if (res.success) {
        const response = await service.create({
          coverUrl: res.coverUrl as string,
          fileURl: res.pdfUrl as string,
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          pages: data.pages,
          edition: data.edition,
          category: data.category,
          currentPrice: data.currentPrice,
          isDigital: data.isDigital,
          isShared: data.isShared,
          metaData: {},
          sharePercent: data.sharePercent,
        });
        const serverMessage = Array.isArray(response?.message)
          ? response?.message[0]
          : response.message;
        if (serverMessage == "message" && !response?.hasError) {
          toast.info("Livro criado com sucesso");
        } else {
          toast.error(serverMessage);
        }
      } else {
        toast.error(res.message);
      }
    });
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "coverUrl" | "fileURl"
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1_000_000_000) {
      toast.error("O arquivo deve ter no máximo 1GB.");
      return;
    }

    if (type === "coverUrl") {
      setCoverFile(file);
    } else {
      setPdfFile(file);
    }

    form.setValue(type, file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  const router = useRouter();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Nome do ebook" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitulo</FormLabel>
              <FormControl>
                <Input placeholder="subtitulod dolivro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Resumo do conteúdo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="programacao">Programação</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="negocios">Negócios</SelectItem>
                  <SelectItem value="financas">Finanças</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço (KZ)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ex: 2000"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Páginas</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="edition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edição</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Capa */}
        <FormField
          control={form.control}
          name="coverUrl"
          render={() => (
            <FormItem>
              <FormLabel>Imagem da Capa</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "coverUrl")}
                />
              </FormControl>
              {coverFile && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <ImageIcon className="w-4 h-4 text-blue-500" />
                  <span className="truncate">{coverFile.name}</span>
                  <span className="text-muted-foreground text-xs">
                    ({formatBytes(coverFile.size)})
                  </span>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fileURl"
          render={() => (
            <FormItem>
              <FormLabel>Arquivo PDF</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(e, "fileURl")}
                />
              </FormControl>
              {pdfFile && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <FileText className="w-4 h-4 text-green-500" />
                  <span className="truncate">{pdfFile.name}</span>
                  <span className="text-muted-foreground text-xs">
                    ({formatBytes(pdfFile.size)})
                  </span>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="isShared"
            render={({ field }) => (
              <FormItem className="flex  border dark:border-white/10 rounded-sm justify-between items-center gap-4 dark:bg-white/3 p-2">
                <span className="flex flex-col gap-2">
                  <FormLabel>Pambaleiros</FormLabel>
                  <div className="text-sm  opacity-80 w-[90%]">
                    Permita que usuários promovam seu conteúdo e ganhem
                    comissões por vendas geradas por seus links.
                  </div>
                </span>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(e) => {
                      field.onChange(e);
                      setisAllowedComitons((prev) => !prev);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {isAlowedComition && (
            <FormField
              control={form.control}
              name="sharePercent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comissão (%)</FormLabel>
                  <FormControl>
                    <Input
                      min={1}
                      max={100}
                      type="number"
                      placeholder="Ex: 2000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <footer className="grid grid-cols-2 gap-4">
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <FileText /> Publicar
              </>
            )}
          </Button>

          <Button
            onClick={() => {
              router.back();
            }}
            type="button"
            variant={"outline"}
            className="w-full"
          >
            <ChevronLeft /> Voltar
          </Button>
        </footer>
      </form>
    </Form>
  );
}

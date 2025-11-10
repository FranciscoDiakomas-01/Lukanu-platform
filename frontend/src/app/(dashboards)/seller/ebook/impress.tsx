"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { physicalBookSchema } from "@/schemas/createEbook.schema";
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
import { ChevronLeft, FileText, ImageIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type BookFormValues = z.infer<typeof physicalBookSchema>;

export default function CreateBook() {

  
  const [isAlowedComition, setisAllowedComitons] = useState(false);
  const form = useForm<BookFormValues>({
    resolver: zodResolver(physicalBookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      category: "",
      price: 1000,
      allowAffiliates: false,
      cover: undefined,
      edition: "",
      format: "A4",
      language: "",
      pages: 1,
      publicationYear: new Date().getFullYear(),
      publisher: "",
      comition: 1000,
    },
  });
  function onSubmit(data: BookFormValues) {
    console.log("Form submitted", data);
  }

  const router = useRouter();
  const [coverFile, setCoverFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1_000_000_000) {
      toast.error("O arquivo deve ter no máximo 1GB.");
      return;
    }

    setCoverFile(file);
    form.setValue("cover", file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }
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
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Autor</FormLabel>
              <FormControl>
                <Input placeholder="Nome do autor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publisher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Editora</FormLabel>
              <FormControl>
                <Input placeholder="Nome da editora" {...field} />
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
          name="format"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Formato</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um formato" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A1">A1</SelectItem>
                  <SelectItem value="A2">A2</SelectItem>
                  <SelectItem value="A3">A3</SelectItem>
                  <SelectItem value="A4">A4</SelectItem>
                  <SelectItem value="outros">outros</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
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
          name="edition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edição</FormLabel>
              <FormControl>
                <Input type="text" placeholder="VOLL II" {...field} />
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
          name="publicationYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano de lançamento</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="2025"
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
          name="cover"
          render={() => (
            <FormItem>
              <FormLabel>Imagem da Capa</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e)}
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

        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="allowAffiliates"
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
     
        </div>
        {isAlowedComition && (
          <FormField
            control={form.control}
            name="comition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comissão (KZ)</FormLabel>
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
        )}
        <footer className="grid grid-cols-2 gap-4">
          <Button type="submit" className="w-full">
            <FileText /> Publicar
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

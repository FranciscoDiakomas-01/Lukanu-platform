"use client";

import { ebooksMock } from "@/constants/mocks/ebook.mock";
import Ebook from "@/types/ebook";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  FileImage,
  LayoutGrid,
  BookOpen,
  Layers,
  Cat,
  BookAIcon,
  Rocket,
  Languages,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";
export default function CheckoutProduct() {
  const { id } = useParams<{ id: string }>();
  const [ebook, setEbook] = useState<Ebook | undefined>(undefined);

  const [wantsPrint, setWantsPrint] = useState(false);
  const [total, setTotal] = useState(0);

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentEbook = ebooksMock.find((item) => item.id == +id);
    if (currentEbook) {
      setEbook(currentEbook);
      const printed = currentEbook.type === "1" && wantsPrint;
      setTotal(currentEbook.currentPrice + (printed ? 2000 : 0));
    }
  }, [id, wantsPrint]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
    } else {
      toast.error("Arquivo inválido", {
        description: "O arquivo deve ser uma imagem",
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
    } else {
      toast.error("Arquivo inválido", {
        description: "O arquivo deve ser uma imagem",
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-background p-4">
      {ebook && (
        <Card className="w-full max-w-2xl p-5">
          <CardContent className="space-y-4">
            <div className="flex justify-between lg:flex-row gap-8 flex-col">
              <Image
                src={ebook.cover}
                alt={ebook.title}
                width={100}
                height={140}
                className="max-h-[200px] object-contain"
              />

              <span className="flex flex-col gap-4">
                <CardTitle>{ebook.title}</CardTitle>
                <CardDescription>{ebook.description}</CardDescription>

                <div className="text-amber-500 flex text-sm gap-1 items-center">
                  <Star size={14} />
                  {ebook.rate}
                </div>
                <div className="flex flex-wrap gap-3">
                  {ebook.type == "2" && (
                    <Badge variant={"outline"}>
                      <BookAIcon className="text-green-500" />
                      Formato {ebook.format}
                    </Badge>
                  )}
                  <Badge variant={"outline"}>
                    <LayoutGrid />
                    {ebook.category}
                  </Badge>
                  <Badge variant={"outline"}>
                    <BookOpen className="text-blue-500" />
                    {ebook.pages} Páginas
                  </Badge>
                  <Badge variant={"outline"}>
                    <Layers className="text-green-500" />
                    {ebook.type == "1" ? "Digital" : "Impresso"}
                  </Badge>
                  <Badge variant={"outline"}>
                    <Cat className="text-amber-500" />
                    {ebook.type == "1" ? "Digital" : "Impresso"}
                  </Badge>
                  <Badge variant={"outline"}>
                    <Rocket className="text-blue-500" />
                    {ebook.edition}
                  </Badge>
                  <Badge variant={"outline"}>
                    <Languages className="text-green-500" />
                    {ebook.language}
                  </Badge>
                </div>
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <div>
                <p className="line-through text-muted-foreground">
                  {ebook.oldPrice.toFixed(2)} Kz
                </p>
                <p className="text-xl font-bold">{total.toFixed(2)} Kz</p>
              </div>
            </div>

            {ebook.type === "1" && (
              <div className="flex items-center justify-between mt-4">
                <Label>Deseja versão impressa? ( + 2000 Kz)</Label>
                <Switch checked={wantsPrint} onCheckedChange={setWantsPrint} />
              </div>
            )}

            <div className="space-y-4 mt-8">
              <Label>Comprovante de pagamento (imagem)</Label>
              <div
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className={cn(
                  "border-2 border-dashed rounded-lg cursor-pointer relative transition-all p-6 text-center"
                )}
              >
                {!file ? (
                  <div className="flex flex-col items-center gap-2">
                    <UploadCloud className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Escolha ou arraste uma imagem aqui
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPEG, PNG – até 5MB
                    </p>
                    <div className="mt-2">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm rounded-md border border-input bg-background hover:bg-accent"
                      >
                        Procurar imagem
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-black/50 p-2 rounded-md text-white text-left w-full max-w-[80%] mx-auto">
                    <div className="flex items-center gap-2">
                      <FileImage className="w-5 h-5" />
                      <div className="text-sm">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-xs">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-3 ">
              <Button className="w-full mt-4">Finalizar Pedido</Button>
              <Button className="w-full mt-4">Voltar</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}

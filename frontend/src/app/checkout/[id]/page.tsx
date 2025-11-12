"use client";

import { ebooksMock } from "@/constants/mocks/ebook.mock";
import Ebook from "@/types/ebook";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
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
  BadgeCheckIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { cn, toRoman } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import { Toaster, toast } from "sonner";
import EBookClientService from "@/service/Ebook";
import { CreateEbookDto } from "@/types/CreateEbook";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PurchaserviceClient } from "@/service/Payments";
import { uploadSingleFile } from "@/actions/upload";
import { useTheme } from "next-themes";
export default function CheckoutProduct() {
  const { id } = useParams<{ id: string }>();
  const search = useSearchParams();
  const [ebook, setEbook] = useState<CreateEbookDto | undefined>(undefined);
  const [wantsPrint, setWantsPrint] = useState(true);
  const [total, setTotal] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [isPendig, starttransition] = useTransition();
  const router = useRouter();

  const { theme } = useTheme();
  useEffect(() => {
    const token = localStorage.getItem("acess");
    if (!token) {
      router.push("/enter");
      return;
    }

    async function getProductData() {
      const product = await new EBookClientService(
        String(token)
      ).getEbookDetails(id);

      console.log(product);
      if (product.hasError) {
        toast.error(product.message);
      } else {
        setEbook(product.data);
        setTotal(product.data?.currentPrice ?? 0);
      }
    }
    getProductData()
      .then()
      .catch()
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [id]);

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

  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();
    starttransition(async () => {
      const token = localStorage.getItem("acess");
      if (!token) {
        router.push("/enter");
        return;
      }


      if (!file) {
        toast.error("Envie um arquivo");
        return;
      }
      const uploadedFile = await uploadSingleFile(file);

      if (uploadedFile?.success && uploadedFile.url) {
        const service = await new PurchaserviceClient(token).createPayment({
          digital: false,
          ebookId: Number(id),
          fileUrl: uploadedFile.url,
          ownerId: Number(ebook?.author?.id),
          affCode: search.get("aff") ?? "",
        });

        toast.info(service.message);
      } else {
        toast.info(uploadedFile.message);
      }
    });
  }

  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-background p-4">
      <Toaster
        className="z-[9999999999999999]"
        theme={theme == "dark" ? "dark" : "light"}
      />
      {loading ? (
        <div>
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          {ebook ? (
            <Card className="w-full max-w-2xl p-0">
              <CardContent className="space-y-4 py-4">
                <div className="flex flex-col gap-8 ">
                  <img
                    src={ebook.coverUrl}
                    alt={ebook.title}
                    width={100}
                    height={140}
                    className="max-h-[300px] w-full  rounded-sm"
                  />

                  <span className="flex flex-col gap-4">
                    <CardTitle>{ebook.title}</CardTitle>
                    <CardTitle>{ebook.subtitle}</CardTitle>
                    <CardDescription>{ebook.description}</CardDescription>

                    <h1>IBAN : </h1>
                    <Separator />
                    {ebook.author && (
                      <span className="flex flex-col gap-3">
                        <span className="flex gap-3">
                          <Avatar className=" rounded-full">
                            <AvatarImage
                              src={ebook.author?.profileUrl}
                              alt={
                                ebook.author.firstName + ebook.author.lastName
                              }
                            />
                            <AvatarFallback className="dark:bg-white bg-[#080808] text-white dark:text-black justify-center flex items-center w-10 uppercase font-semibold rounded-full ">
                              {ebook.author.firstName?.charAt(0) +
                                ebook.author.lastName?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="flex">
                              <h1>
                                {ebook.author.firstName +
                                  " " +
                                  ebook.author.lastName}
                              </h1>
                              <BadgeCheckIcon
                                size={20}
                                className=" ml-1 text-white"
                                fill="blue"
                              />
                            </span>
                            <small>{ebook.author.email}</small>
                          </div>
                        </span>

                        <Separator />
                      </span>
                    )}

                    <div className="flex flex-wrap gap-3">
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
                        {ebook.isDigital ? "Digital" : "Impresso"}
                      </Badge>
                      <Badge variant={"outline"}>
                        <Rocket className="text-blue-500" />
                        {toRoman(ebook.edition)} Edição
                      </Badge>
                    </div>
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <div>
                    <del className="opacity-50 text-xl">
                      {Number(ebook.oldProce).toLocaleString("pt")}
                      kz
                    </del>
                    <p className="text-xl font-bold">{total.toFixed(2)} Kz</p>
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <Label>Comprovante de pagamento (imagem)</Label>
                  <div
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className={cn(
                      "border-2 border-dashed rounded-lg cursor-pointer relative transition-all p-6 text-center "
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
                  <Button
                    disabled={isPendig}
                    onClick={handleOnSubmit}
                    className="w-full mt-4"
                  >
                    {!isPendig ? (
                      "Finalizar Pedido"
                    ) : (
                      <Loader2 className="animate-spin" />
                    )}
                  </Button>
                  <Button
                    variant={"outline"}
                    className="w-full mt-4"
                    onClick={() => {
                      router.back();
                    }}
                  >
                    Voltar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <span>
              <h1>Producto não encotrado</h1>
              <Button
                onClick={() => {
                  router.back();
                }}
              >
                Voltar
              </Button>
            </span>
          )}
        </>
      )}
    </main>
  );
}

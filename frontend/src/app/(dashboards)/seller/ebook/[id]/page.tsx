"use client";

import ShinyText from "@/components/animated/ShineText/indext";
import TextType from "@/components/animated/Typing";
import DashordHeader from "@/components/DashordHeader";
import EbookTestMonial from "@/components/EbookTestmonial";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ebooksMock } from "@/constants/mocks/ebook.mock";
import Ebook, { EbookOwner } from "@/types/ebook";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  ArrowLeft,
  BookAIcon,
  BookOpen,
  Copy,
  DollarSign,
  FileText,
  Languages,
  Layers,
  LucideLayoutGrid,
  Rocket,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { EbookCard, EbookCardSkeleton } from "@/components/Ebook";

export default function Buy() {
  const { id } = useParams();
  const [ebook, setEbook] = useState<Ebook | null>();
  const router = useRouter();
  const [isDigital, setIsDigital] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [ebooks, setEboks] = useState<Ebook[]>([]);
  const User: EbookOwner = {
    name: "Francisco",
    lastname: "Diakomas",
    ebooks: 100,
    sells: 90,
    profile: "https://github.com/shadcn.png",
    bio: "Autor digital com uma vasta coleção de eBooks publicados nas áreas de tecnologia, negócios e desenvolvimento pessoal. Compartilhando conhecimento com leitores em todo o mundo.",
    email: "francisco.diakomas@email.com",
    id: 1,
  };

  useEffect(() => {
    setIsLoading(true);
    const EbookId = Number(id);
    const EbookInList = ebooksMock.find((item) => {
      return item.id == EbookId;
    });
    const similiarEbooks = ebooksMock.filter((item) => {
      return item.category == EbookInList?.category;
    });
    setEboks(similiarEbooks);
    setEbook(EbookInList);
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);
  return (
    <main className="w-full  flex-col min-h-screen flex gap-4">
      <DashordHeader 
        whoIs="seller" showInput={false} />

      {isLoading ? (
        <div className="flex lg:flex-row flex-col w-full px-4 gap-4">
          <span className="lg:w-[50%] h-[400px] w-full ">
            <Skeleton className="w-full h-full" />
          </span>
          <span className="lg:w-[50%] w-full flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-[30%] h-4 mb-4" />{" "}
              <Skeleton className="w-full h-2" />{" "}
              <Skeleton className="w-full h-2" />{" "}
              <Skeleton className="w-full h-2" />{" "}
              <Skeleton className="w-full h-2" />
              <Skeleton className="w-full h-2" />{" "}
              <Skeleton className="w-full h-2" />{" "}
              <Skeleton className="w-full h-2" />{" "}
              <Skeleton className="w-full h-2" />
            </div>
            <div className="flex gap-4 mt-4">
              <Skeleton className="h-[50px] w-full" />
              <Skeleton className="h-[50px] w-full" />
            </div>
          </span>
        </div>
      ) : (
        <>
          {!ebook ? (
            <div className="h-[80dvh] flex justify-center items-center flex-col gap-8">
              <ShinyText text="Livro não encontrado" className="lg:text-5xl" />
              <Button
                className="lg:w-[150px]"
                onClick={() => {
                  router.push("/seller");
                }}
              >
                Voltar
                <ArrowLeft />
              </Button>
            </div>
          ) : (
            <div className="px-4 flex flex-col gap-4">
              {" "}
              <div className="flex lg:flex-row flex-col w-full  gap-4 mb-15">
                <span className="lg:w-[50%] h-[400px] w-full justify-center items-centerflex relative border rounded-md bg-radial ">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <radialGradient
                        id="light-mode-gradient"
                        cx="30%"
                        cy="30%"
                        r="80%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                        <stop
                          offset="100%"
                          stopColor="#ffffff"
                          stopOpacity="1"
                        />
                      </radialGradient>
                      <radialGradient
                        id="dark-mode-gradient"
                        cx="70%"
                        cy="70%"
                        r="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity="0.1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#000000"
                          stopOpacity="0.6"
                        />
                      </radialGradient>
                    </defs>

                    <rect
                      className="hidden dark:block"
                      width="100%"
                      height="100%"
                      fill="url(#dark-mode-gradient)"
                    />
                  </svg>
                  <div className="w-full h-full absolute flex justify-center items-center z-10">
                    <Image src={ebook.cover} alt={""} />
                  </div>
                </span>
                <span className="lg:w-[50%] w-full flex flex-col gap-4 ">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold dark:hidden">{ebook.title}</h1>
                    <div className="dark:flex hidden">
                      <ShinyText text={ebook.title} className="font-bold" />
                    </div>
                    <small>{ebook.description}</small>
                    <div className="flex text-xl items-center gap-4">
                      <del className="opacity-55">
                        {Number(ebook.oldPrice).toLocaleString("pt")} kz
                      </del>
                      <h1>
                        {Number(ebook.currentPrice).toLocaleString("pt")} kz
                      </h1>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant={"secondary"}>
                      <LucideLayoutGrid />
                      {ebook.category}
                    </Badge>
                    {ebook.canShare && (
                      <Badge variant={"outline"}>
                        <DollarSign className="text-green-500" />
                        Pambalável
                      </Badge>
                    )}
                    <Badge variant={"secondary"}>
                      <Copy />
                      Copiar Link
                    </Badge>
                    <Badge variant={"outline"}>
                      <FileText className="text-blue-500" />
                      {ebook.type == "1" ? "Digital" : "Impresso"}
                    </Badge>
                    {ebook.type == "2" && (
                      <Badge variant={"outline"}>
                        <BookAIcon className="text-green-500" />
                        Formato {ebook.format}
                      </Badge>
                    )}

                    <Badge variant={"outline"}>
                      <BookOpen className="text-blue-500" />
                      {ebook.pages} Páginas
                    </Badge>
                    <Badge variant={"outline"}>
                      <Layers className="text-green-500" />
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
                  <div className="mt-4 flex flex-col gap-4 ">
                    <h1 className="font-bold dark:hidden">
                      {"Informações sobre o criador do produto"}
                    </h1>
                    <div className="dark:flex hidden">
                      <ShinyText
                        text={"Informações sobre o criador do produto"}
                        className="font-bold"
                      />
                    </div>
                    <span className="flex gap-3 ">
                      <Avatar>
                        <AvatarImage src={User.profile} alt={User.name} />
                        <AvatarFallback className="dark:bg-white bg-[#080808] text-white dark:text-black justify-center flex items-center w-10 uppercase font-semibold">
                          {User.name?.charAt(0) + User.lastname?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{User.name + " " + User.lastname}</p>
                        <small className="text-[11px] ">{User.email}</small>
                      </div>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button asChild className="h-[45px]">
                      <Link href={`/checkout/${ebook.id}`}>
                        <ShoppingCart />
                        Comprar
                      </Link>
                    </Button>

                    <Button
                      className="h-[45px]"
                      onClick={() => {
                        router.back();
                      }}
                      variant={"outline"}
                    >
                      {" "}
                      <ArrowLeft /> Voltar{" "}
                    </Button>
                  </div>
                </span>
              </div>
              <>
                {isLoading ? (
                  <aside className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mt-8">
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                      <EbookCardSkeleton key={index} />
                    ))}
                  </aside>
                ) : (
                  <>
                    <ShinyText
                      text={"Produtos relacionados"}
                      className="lg:text-4xl md:text-3xl text-2xl text-center my-5"
                    />
                    {Array.isArray(ebooks) && ebooks.length > 0 ? (
                      <aside className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mt-8">
                        {ebooks.map((item, index) => (
                          <EbookCard ebook={item} key={index} />
                        ))}
                      </aside>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
              <TextType
                text={[
                  "Avaliações de outros clientes",
                  "Reviews dos leitores",
                  "Opiniões de quem já leu",
                  "Feedbacks sobre os eBooks",
                  "O que estão dizendo sobre os livros",
                  "Leitores recomendam",
                  "Depoimentos de quem comprou",
                  "Descubra os livros mais elogiados",
                  "Reações dos nossos leitores",
                  "Resenhas reais de eBooks incríveis",
                ]}
                className="lg:text-4xl md:text-3xl text-2xl text-center my-5"
              />
              <EbookTestMonial />
            </div>
          )}
        </>
      )}
    </main>
  );
}

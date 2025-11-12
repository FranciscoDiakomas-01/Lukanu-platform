"use client";
import Ebook from "@/types/ebook";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import ShinyText from "../animated/ShineText/indext";
import {
  Coins,
  DollarSign,
  Ellipsis,
  EllipsisVertical,
  FileText,
  Forward,
  Loader2,
  LucideLayoutGrid,
  Menu,
  Share,
  ShoppingCart,
  View,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { CreateEbookDto } from "@/types/CreateEbook";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { toRoman } from "@/lib/utils";
import EBookClientService from "@/service/Ebook";
import { toast } from "sonner";
export function EbookCard({ ebook }: { ebook: CreateEbookDto }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [show, setSthow] = useState(true);
  useEffect(() => {
    router.prefetch(`/seller/ebook?ebook=${ebook.id}`);
    setToken(localStorage.getItem("acess") as string);
  }, [router]);

  const [isPending, startTrantition] = useTransition();
  return (
    <>
      {show ? (
        <figure className="flex flex-col border dark:border-white/10 p-2 gap-4 rounded-sm transition-all hover:shadow-2xl shadow-black/10 dark:shadow-white/10 cursor-pointer relative">
          <img
            className=" hover:scale-95  transition-all lg:h-50 rounded-md  lg:object-contain "
            src={ebook.coverUrl}
            alt={ebook.title}
          />

          {ebook.belongeMe && (
            <span className="absolute top-0 right-0">
              <Menubar className="border-none">
                <MenubarMenu>
                  <MenubarTrigger className="gap-3">
                    <EllipsisVertical className="text-sm w-5" />
                  </MenubarTrigger>
                  <MenubarContent className="bg-transparent dark:text-black border-white/10  backdrop-blur-2xl flex flex-col gap-3  w-20 min-w-23">
                    <Button
                      size="sm"
                      variant={"outline"}
                      className="border w-20 bg-red-500/10 border-red-900 text-red-500 "
                      onClick={async () => {
                        const service = await new EBookClientService(
                          token
                        ).deleteEbook(String(ebook.id));
                        if (service.message) {
                          toast.warning(service.message);
                        } else {
                          toast.info("Livro removido");
                        }
                        setSthow(false);
                      }}
                    >
                      Remover
                    </Button>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </span>
          )}
          <Separator />
          {ebook.author && (
            <span className="flex flex-col gap-3">
              <span className="flex gap-3">
                <Avatar className=" rounded-full">
                  <AvatarImage
                    src={ebook.author?.profileUrl}
                    alt={ebook.author.firstName + ebook.author.lastName}
                    className="h-12 rounded-full"
                  />
                  <AvatarFallback className="dark:bg-white bg-[#080808] text-white dark:text-black justify-center flex items-center w-10 uppercase font-semibold rounded-full h-10">
                    {ebook.author.firstName?.charAt(0) +
                      ebook.author.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1>
                    {ebook.author.firstName + " " + ebook.author.lastName}
                  </h1>
                  <small>{ebook.author.email}</small>
                </div>
              </span>

              <Separator />
            </span>
          )}
          <span className="flex justify-between w-full flex-col gap-2">
            <div className="flex  flex-col gap-2">
              <h1 className="font-bold dark:hidden">{ebook.title}</h1>
              <div className="dark:flex hidden">
                <ShinyText text={ebook.title} className="font-bold" />
              </div>
              <div>{ebook.subtitle}</div>
              <small className="dark:opacity-70 text-[12px]">
                {ebook.description}
              </small>
              <div className="flex gap-2 flex-wrap">
                <Badge variant={"outline"}>
                  <LucideLayoutGrid className="text-amber-500" />
                  {ebook.category}
                </Badge>
                {ebook.isShared && (
                  <Badge variant={"outline"} className="text-green-500">
                    % {Number(ebook.sharePercent)} %
                  </Badge>
                )}
                <Badge variant={"outline"}>
                  <Coins className="text-amber-500" />
                  {ebook.isDigital ? "Digital" : "Impresso"}
                </Badge>

                <Badge variant={"outline"}>
                  <FileText className="text-blue-500" />
                  {ebook.pages} página
                </Badge>

                <Badge variant={"outline"}>
                  <FileText className="text-green-500" />
                  {toRoman(ebook.edition)} Edição
                </Badge>
              </div>
              <div className="flex my-2 justify-end gap-3">
                {ebook.oldProce != 0 || ebook.currentPrice == ebook.oldProce ? (
                  <del className="opacity-50 text-xl">
                    {Number(Number(ebook.oldProce) * 2).toLocaleString("pt")}
                    kz
                  </del>
                ) : (
                  <del className="opacity-50 text-xl">
                    {Number(ebook.oldProce).toLocaleString("pt")}
                    kz
                  </del>
                )}
              </div>
            </div>

            {!ebook.belongeMe && (
              <div className="grid grid-cols-2 gap-3  w-full ">
                <Button className="w-full" asChild>
                  <Link href={`/checkout/${ebook.id}`} prefetch>
                    <ShoppingCart />
                    {Number(ebook.currentPrice).toLocaleString("pt")} kz
                  </Link>
                </Button>
                {ebook.isShared && (
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      startTrantition(async () => {
                        const message = await new EBookClientService(
                          token
                        ).createAfiliation(Number(ebook?.id));
                        toast.info(message);
                      });
                    }}
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        <Forward />
                        Pambalar
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </span>
        </figure>
      ) : null}
    </>
  );
}

export function EbookCardSkeleton() {
  return (
    <figure className="flexf flex-col border dark:border-white/10 p-2 gap-4 rounded-sm t">
      <Skeleton className=" h-40 rounded-md   w-full " />
      <span className="flex justify-between w-full flex-col gap-2">
        <div className="flex w-full  flex-col gap-2">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2" />
        </div>
      </span>
    </figure>
  );
}

"use client";
import Ebook from "@/types/ebook";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect } from "react";
import ShinyText from "../animated/ShineText/indext";
import {
  DollarSign,
  FileText,
  LucideLayoutGrid,
  ShoppingCart,
  View,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "../ui/badge";
export function EbookCard({ ebook }: { ebook: Ebook }) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch(`/seller/ebook?ebook=${ebook.id}`);
  }, [router]);
  return (
    <figure className="flex border dark:border-white/10 p-2 gap-4 rounded-sm transition-all hover:shadow-2xl shadow-black/10 dark:shadow-white/10 cursor-pointer">
      <Image
        className=" hover:-rotate-16 transition-all   w-[100px] object-contain"
        src={ebook.cover}
        alt={ebook.title}
      />
      <span className="flex justify-between flex-col gap-2">
        <div className="flex  flex-col gap-2">
          <h1 className="font-bold dark:hidden">{ebook.title}</h1>
          <div className="dark:flex hidden">
            <ShinyText text={ebook.title} className="font-bold" />
          </div>

          <small className="dark:opacity-70 text-[12px]">
            {ebook.description?.slice(0, 52)} ...
          </small>
          <div className="flex gap-2 flex-wrap">
            <Badge variant={"outline"}>
              <LucideLayoutGrid className="text-amber-500" />
              {ebook.category}
            </Badge>
            {ebook.canShare && (
              <Badge variant={"outline"}>
                <DollarSign className="text-green-500" />
                Pambalável
              </Badge>
            )}
            <Badge variant={"outline"}>
              <FileText className="text-blue-500" />
              {ebook.type == "1" ? "Digital" : "Impresso"}
            </Badge>
          </div>
          <div className="flex my-2 justify-end gap-3">
            <del className="opacity-50">
              {Number(ebook.oldPrice).toLocaleString("pt")}
              kz
            </del>
            <h1>{Number(ebook.oldPrice).toLocaleString("pt")} kz</h1>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full ">
          <Button variant={"outline"}>
            <ShoppingCart />
            Comprar
          </Button>
          <Button asChild>
            <Link href={`/seller/ebook/${ebook.id}`}>
              <View />
              Detalhes
            </Link>
          </Button>
        </div>
      </span>
    </figure>
  );
}

export function EbookCardSkeleton() {
  return (
    <figure className="flex border dark:border-white/10 p-2 gap-4 rounded-sm t">
      <Skeleton className="h-[160px]  w-[150px]" />
      <span className="flex justify-between w-full flex-col gap-2">
        <div className="flex w-full  flex-col gap-2">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2" />
        </div>
      </span>
    </figure>
  );
}

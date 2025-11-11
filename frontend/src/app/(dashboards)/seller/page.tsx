"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import DashordHeader from "@/components/DashordHeader";
import { useEffect, useRef, useState } from "react";
import card1 from "@/assets/carousel1.png";
import card2 from "@/assets/carousel2.png";
import card3 from "@/assets/carousel3.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EbookCard, EbookCardSkeleton } from "@/components/Ebook";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EBookClientService from "@/service/Ebook";
import { toast } from "sonner";
import { CreateEbookDto } from "@/types/CreateEbook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    })
  );

  const cards = [
    {
      text: "Descobre ebooks incríveis de autores angolanos",
      bg: "bg-[radial-gradient(circle_at_top_left,_#93c5fd,_#3b82f6)]",
      img: card3,
    },
    {
      text: "Aprende com os melhores cursos online da nossa terra",
      bg: "bg-[radial-gradient(circle_at_top_right,_#fcd34d,_#f59e0b)]",
      img: card2,
    },
    {
      text: "Compra fácil, recebe na hora. Tudo digital!",
      bg: "bg-[radial-gradient(circle,_#6ee7b7,_#3b82f6)]",
      img: card1,
    },
    {
      text: "Cria e vende teus próprios cursos e ebooks",
      bg: "bg-[radial-gradient(circle_at_center,_#ddd6fe,_#8b5cf6)]",
      img: card3,
    },
    {
      text: "Conteúdos pensados para o mercado angolano",
      bg: "bg-[radial-gradient(circle_at_bottom,_#a5f3fc,_#06b6d4)]",
      img: card2,
    },
    {
      text: "Segurança garantida nas tuas compras digitais",
      bg: "bg-[radial-gradient(circle_at_bottom_left,_#fde68a,_#f97316)]",
      img: card1,
    },
  ];

  const router = useRouter();

  const [ebooks, setEbooks] = useState<CreateEbookDto[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "meus" | "pambalaveis">(
    "all"
  );

  const filtered = ebooks.filter((ebook) => {
    const term = search.toLowerCase();
    const isNumber = !isNaN(Number(term));
    if (filterType === "meus" && !ebook.belongeMe) return false;
    if (
      filterType === "pambalaveis" &&
      !(ebook.isShared && Number(ebook.sharePercent) > 0)
    )
      return false;
    if (!term) return true;

    return (
      ebook.title.toLowerCase().includes(term) ||
      ebook.subtitle.toLowerCase().includes(term) ||
      ebook.description.toLowerCase().includes(term) ||
      (isNumber && Number(ebook.currentPrice) === Number(term))
    );
  });

  useEffect(() => {
    async function getEbooks() {
      const token = localStorage.getItem("acess") as string;
      const service = new EBookClientService(token);
      const data = await service.getMyEbooks(page);

      if (data?.hasError) {
        setEbooks([]);
        setLastPage(1);
        toast.warning("Erro ao consultar os livros");
        return;
      }

      if (page === 1) {
        setEbooks(data.data);
      } else {
        setEbooks((prev) => [...prev, ...data.data]);
      }

      setLastPage(data.lastPage);
    }

    getEbooks()
      .catch(() => {})
      .finally(() => {
        setTimeout(() => setIsLoad(false), 1000);
      });
  }, [page]);

  return (
    <section className="w-full pb-20 flex-col min-h-screen flex gap-4">
      <DashordHeader whoIs="seller" showInput={false} />

      <article className="flex justify-between gap-6 px-2 w-full">
        <Carousel
          plugins={[plugin.current]}
          className="w-full relative rounded-md"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="md:h-[350px] h-[200px] rounded-md">
            {cards.map((item, index) => (
              <CarouselItem key={index}>
                <div
                  className={`px-4 flex relative rounded-md h-full border dark:border-white/10 dark:bg-transparent bg-blue-600`}
                >
                  <svg
                    className="absolute inset-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
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
                      className="dark:hidden"
                      width="100%"
                      height="100%"
                      fill="url(#light-mode-gradient)"
                    />
                    <rect
                      className="hidden dark:block"
                      width="100%"
                      height="100%"
                      fill="url(#dark-mode-gradient)"
                    />
                  </svg>

                  <div className="relative z-10 flex justify-between h-full">
                    <h1 className="max-w-[50%] text-white dark:text-white lg:pt-12 pt-4 lg:text-5xl md:text-4xl font-bold leading-[1.4] text-2xl">
                      {item.text}
                    </h1>
                    <div className="flex lg:items-end lg:justify-end h-full justify-start items-start">
                      <Image
                        className="object-contain md:h-full h-[200px]"
                        src={item.img}
                        alt={item.text}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute bg-red-50 bottom-0 right-[50%] z-2 lg:h-20">
            <CarouselPrevious className="dark:bg-transparent dark:border-white dark:text-white" />
            <CarouselNext className="dark:bg-transparent dark:border-white dark:text-white" />
          </div>
        </Carousel>
      </article>

      <aside className="flex pt-10 w-full flex-col gap-8 min-h-screen px-4">
        <div className="flex justify-center w-full gap-4">
          <form className="lg:w-[30%] w-full relative">
            <Input
              className="w-full h-11"
              placeholder="Buscar por livro"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <span className="absolute top-1 right-0">
              <Select
                onValueChange={(value) => {
                  setFilterType(value as any);
                  setSearch("");
                }}
              >
                <SelectTrigger className="md:w-[130px] w-[100px] border-none">
                  <SelectValue placeholder="Filtrar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="meus">Meus</SelectItem>
                  <SelectItem value="pambalaveis">Pambaláveis</SelectItem>
                </SelectContent>
              </Select>
            </span>
          </form>
          <Button asChild>
            <Link href="/seller/ebook">Novo</Link>
          </Button>
        </div>

        {isLoad ? (
          <aside className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mt-8">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <EbookCardSkeleton key={index} />
            ))}
          </aside>
        ) : (
          <>
            {filtered.length > 0 ? (
              <>
                <aside className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mt-8">
                  {filtered.map((item) => (
                    <EbookCard ebook={item} key={item.id} />
                  ))}
                </aside>

                <span className="flex items-center justify-between">
                  <span>{page + " de " + lastPage}</span>
                  <Button
                    variant="outline"
                    disabled={page === lastPage}
                    onClick={() => setPage(page + 1)}
                  >
                    Ver Mais <ChevronRight />
                  </Button>
                </span>
              </>
            ) : (
              <p className="text-center mt-8">
                Nenhum livro foi publicado <br /> Seja o primeiro a publicar
              </p>
            )}
          </>
        )}
      </aside>
    </section>
  );
}

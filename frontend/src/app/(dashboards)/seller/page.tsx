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
import { Loader, Loader2Icon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextType from "@/components/animated/Typing";
import Ebook from "@/types/ebook";
import { ebooksMock } from "@/constants/mocks/ebook.mock";
import { EbookCard, EbookCardSkeleton } from "@/components/Ebook";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MyEbooks from "./myEbooks.table";
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
  const [ebooks, setEboks] = useState<Ebook[]>([]);
  const [isLoad, setIsLoad] = useState(true);
  const [showMyEbooks, setShowMyEbooks] = useState(false);
  useEffect(() => {
    setIsLoad(true);
    setEboks(ebooksMock);
    setTimeout(() => {
      setIsLoad(false);
    }, 2500);
  }, [showMyEbooks]);

  return (
    <section className="w-full pb-20  flex-col min-h-screen flex gap-4">
      <DashordHeader whoIs="seller" showInput={false} />
      <article className="flex justify-between gap-6 px-2  w-full ">
        <Carousel
          plugins={[plugin.current]}
          className="w-full relative  rounded-md "
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="md:h-[350px] h-[200px] rounded-md ">
            {cards.map((item, index) => (
              <CarouselItem key={index}>
                <div
                  className={` px-4 flex  relative   rounded-md h-full border dark:border-white/10 dark:bg-transparent bg-blue-600`}
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
                    <div className="flex lg:items-end lg:justify-end h-full  justify-start items-start ">
                      <Image
                        className="object-contain md:h-full  h-[200px] "
                        src={item.img}
                        alt={item.text}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute  bg-red-50 bottom-0 right-[50%] z-2  lg:h-20">
            <CarouselPrevious className="dark:bg-transparent dark:border-white dark:text-white" />
            <CarouselNext className="dark:bg-transparent dark:border-white dark:text-white" />
          </div>
        </Carousel>
      </article>
      <aside className="flex pt-10 w-full flex-col gap-8 min-h-screen px-4">
        <div className="justify-center items-center md:flex hidden dark:lg:flex">
          <TextType
            text={[
              "Encontre o próximo livro que vai transformar sua mente.",
              "Descubra seu próximo livro favorito.",
              "Cada livro é uma porta para um novo universo.",
            ]}
            className="lg:text-4xl  text-2xl text-center"
          />
        </div>
        <div className="flex md:flex-row flex-col-reverse justify-center w-full gap-4 ">
          <form action="" className="lg:w-[30%] w-full relative">
            <Input className="w-full" placeholder="Buscar por livro" />
            <Search size={18} className="absolute right-2 top-2" />
          </form>

          <Button asChild>
            <Link href="/seller/ebook">
              <span>Publicar livro</span>
            </Link>
          </Button>
          <Button
            onClick={() => {
              setEboks([]);
              setShowMyEbooks((prev) => !prev);
            }}
            variant={"outline"}
          >
            {!showMyEbooks ? "Meus livros" : "Ver todos"}
          </Button>
        </div>

        {showMyEbooks ? (
          <MyEbooks />
        ) : (
          <>
            {isLoad ? (
              <aside className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 mt-8">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <EbookCardSkeleton key={index} />
                ))}
              </aside>
            ) : (
              <>
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
        )}
      </aside>
    </section>
  );
}
